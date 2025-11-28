import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { ComprehensiveSchemeForm } from "@/components/ComprehensiveSchemeForm";
import { CRUDList } from "@/components/CRUDList";
import { authService } from "../authService";
import { normalizeScheme, govtSchemeSchema, type GovtSchemeData } from "../schemas";

interface SchemesSectionProps {
  onLogout: () => void;
}

export const SchemesSection = ({ onLogout }: SchemesSectionProps) => {
  const { toast } = useToast();
  const [schemes, setSchemes] = useState<GovtSchemeData[]>([]);
  const [editingSchemeId, setEditingSchemeId] = useState<string | null>(null);

  // Fetch schemes on component mount
  useEffect(() => {
    fetchSchemes();
  }, []);

  const fetchSchemes = async () => {
    const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;
    if (!API_BASE_URL) {
      console.error("Backend URL is not defined. Set VITE_BACKEND_URL in .env");
      toast({ title: "Configuration Error", description: "Backend URL is not set.", variant: "destructive" });
      return;
    }
    
    try {
      const response = await fetch(`${API_BASE_URL}/api/schemes`, {
        headers: authService.getAuthHeaders(),
      });

      if (!response.ok) {
        if (response.status === 401) {
          onLogout();
          throw new Error('Session expired');
        }
        throw new Error('Failed to fetch schemes');
      }

      const data: any[] = await response.json();
      if (Array.isArray(data)) {
        setSchemes(data.map(normalizeScheme));
      } else {
        setSchemes([]);
        console.warn("Expected array but got:", data);
      }
    } catch (error: any) {
      console.error("Failed to fetch schemes:", error);
      toast({
        title: "Error",
        description: error.message || "Could not fetch schemes from server.",
        variant: "destructive"
      });
    }
  };

  const onSchemeSubmit = async (data: GovtSchemeData) => {
    if (!authService.isAuthenticated()) {
      toast({
        title: "Authentication Required",
        description: "Please log in to perform this action.",
        variant: "destructive"
      });
      return;
    }

    const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;
    const { id, _id, customFields, ...formData } = data;
    const apiPayload: any = { ...formData };

    // Transform array-of-objects to array-of-strings for MongoDB schema
    if (apiPayload.eligibilityDetails) {
      apiPayload.eligibilityDetails = 
        apiPayload.eligibilityDetails.map((item: { value: string }) => item.value);
    }
    
    // FIX: benefits is now a string, not an array
    // Remove this transformation for benefits since it's now a string
    // if (apiPayload.benefits) {
    //   apiPayload.benefits = 
    //     apiPayload.benefits.map((item: { value: string }) => item.value);
    // }
    
    if (apiPayload.benefitsDetails) {
      apiPayload.benefitsDetails = 
        apiPayload.benefitsDetails.map((item: { value: string }) => item.value);
    }
    
    if (apiPayload.objectives) {
      apiPayload.objectives = 
        apiPayload.objectives.map((item: { value: string }) => item.value);
    }
    
    if (apiPayload.howToApply) {
      apiPayload.howToApply = 
        apiPayload.howToApply.map((item: { value: string }) => item.value);
    }
    
    if (apiPayload.documents) {
      apiPayload.documents = 
        apiPayload.documents.map((item: { value: string }) => item.value);
    }
    
    if (apiPayload.targetAudience) {
      apiPayload.targetAudience = 
        apiPayload.targetAudience.map((item: { value: string }) => item.value);
    }

    if (apiPayload.extraInfo?.successStories) {
      apiPayload.extraInfo.successStories = 
        apiPayload.extraInfo.successStories.map((item: { value: string }) => item.value);
    }
    
    if (apiPayload.extraInfo?.coverageAreas) {
      apiPayload.extraInfo.coverageAreas = 
        apiPayload.extraInfo.coverageAreas.map((item: { value: string }) => item.value);
    }

    const method = editingSchemeId ? 'PUT' : 'POST';
    const url = editingSchemeId
      ? `${API_BASE_URL}/api/schemes/${editingSchemeId}`
      : `${API_BASE_URL}/api/schemes`;

    try {
      console.log('Submitting scheme data:', apiPayload); // Debug log
      
      const response = await fetch(url, {
        method: method,
        headers: authService.getAuthHeaders(),
        body: JSON.stringify(apiPayload),
      });

      if (!response.ok) {
        if (response.status === 401) {
          onLogout();
          throw new Error('Session expired');
        }
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to save scheme');
      }

      const savedScheme: any = await response.json();
      const normalizedScheme = normalizeScheme(savedScheme);

      if (editingSchemeId) {
        setSchemes(schemes.map(scheme =>
          scheme.id === editingSchemeId ? normalizedScheme : scheme
        ));
        setEditingSchemeId(null);
        toast({ title: "Scheme Updated Successfully" });
      } else {
        setSchemes([...schemes, normalizedScheme]);
        toast({ title: "Scheme Created Successfully" });
      }
    } catch (error: any) {
      console.error("Failed to save scheme:", error);
      toast({
        title: "Error",
        description: error.message || "Could not save scheme to server.",
        variant: "destructive",
      });
    }
  };

  const handleDeleteScheme = async (scheme: GovtSchemeData) => {
    const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;
    const dbId = scheme.id;
    if (!dbId) {
      toast({ title: "Error", description: "Scheme has no valid ID to delete.", variant: "destructive" });
      return;
    }
    if (!authService.isAuthenticated()) {
      toast({ title: "Auth Error", description: "Please log in to delete.", variant: "destructive" });
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/schemes/${dbId}`, {
        method: 'DELETE',
        headers: authService.getAuthHeaders(),
      });

      if (!response.ok) {
        if (response.status === 401) {
          onLogout();
          throw new Error('Session expired');
        }
        throw new Error('Failed to delete scheme');
      }

      setSchemes(schemes.filter(s => s.id !== dbId));
      toast({ title: "Scheme Deleted", description: "The scheme has been removed." });

    } catch (error: any) {
      console.error("Failed to delete scheme:", error);
      toast({
        title: "Error",
        description: error.message || "Could not delete scheme.",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <ComprehensiveSchemeForm
        key={editingSchemeId || 'new-scheme'}
        onSubmit={onSchemeSubmit}
        defaultValues={editingSchemeId
          ? schemes.find(scheme => scheme.id === editingSchemeId)
          : undefined}
      />

      <CRUDList
        title="Government Schemes"
        description="Manage all government schemes"
        items={schemes}
        idKey="id"
        onEdit={(scheme) => {
          setEditingSchemeId(scheme.id!);
        }}
        onDelete={handleDeleteScheme}
        renderItem={(scheme) => (
          <div>
            <h4 className="font-semibold">{scheme.title}</h4>
            <p className="text-sm text-muted-foreground">{scheme.department}</p>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs bg-secondary px-2 py-1 rounded">{scheme.category}</span>
              <span className="text-xs text-muted-foreground">
                {scheme.status?.isActive ? 'Active' : 'Inactive'}
              </span>
            </div>
          </div>
        )}
      />
    </>
  );
};