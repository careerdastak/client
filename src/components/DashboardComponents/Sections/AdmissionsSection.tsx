import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { ComprehensiveAdmissionForm } from "@/components/ComprehensiveAdmissionForm";
import { CRUDList } from "@/components/CRUDList";
import { authService } from "../authService";
import { normalizeAdmission, type ComprehensiveAdmissionData } from "../schemas";

interface AdmissionsSectionProps {
  onLogout: () => void;
}

export const AdmissionsSection = ({ onLogout }: AdmissionsSectionProps) => {
  const { toast } = useToast();
  const [admissions, setAdmissions] = useState<ComprehensiveAdmissionData[]>([]);
  const [editingAdmissionId, setEditingAdmissionId] = useState<string | null>(null);

  // Fetch admissions on component mount
  useEffect(() => {
    fetchAdmissions();
  }, []);

  const fetchAdmissions = async () => {
    const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;
    if (!API_BASE_URL) return;
    
    try {
      const response = await fetch(`${API_BASE_URL}/api/admissions`, {
        headers: authService.getAuthHeaders(),
      });

      if (!response.ok) {
        if (response.status === 401) {
          onLogout();
          throw new Error('Session expired');
        }
        throw new Error('Failed to fetch admissions');
      }

      const data: any[] = await response.json();
      setAdmissions(data.map(normalizeAdmission));
    } catch (error: any) {
      console.error("Failed to fetch admissions:", error);
      toast({
        title: "Error",
        description: error.message || "Could not fetch admissions from server.",
        variant: "destructive"
      });
    }
  };

  const onAdmissionSubmit = async (data: ComprehensiveAdmissionData) => {
    if (!authService.isAuthenticated()) {
      toast({
        title: "Authentication Required",
        description: "Please log in to perform this action.",
        variant: "destructive"
      });
      return;
    }

    const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;
    const { id, _id, ...formData } = data;
    const apiPayload: any = JSON.parse(JSON.stringify(formData));

    // Convert comma-separated strings to arrays
    if (apiPayload.eligibilityCriteria) {
      apiPayload.eligibilityCriteria.additionalRequirements = splitCsv(formData.eligibilityCriteria?.additionalRequirements);
    }
    if (apiPayload.applicationFee) {
      apiPayload.applicationFee.paymentModes = splitCsv(formData.applicationFee?.paymentModes);
    }
    if (apiPayload.process) {
      apiPayload.process.selectionSteps = splitCsv(formData.process?.selectionSteps);
    }
    if (apiPayload.extraInfo) {
      apiPayload.extraInfo.documentsRequired = splitCsv(formData.extraInfo?.documentsRequired);
      apiPayload.extraInfo.syllabusTopics = splitCsv(formData.extraInfo?.syllabusTopics);
      apiPayload.extraInfo.examPattern = splitCsv(formData.extraInfo?.examPattern);
      if (apiPayload.extraInfo.counselingDetails) {
        apiPayload.extraInfo.counselingDetails.steps = splitCsv(formData.extraInfo?.counselingDetails?.steps);
      }
    }

    const method = editingAdmissionId ? 'PUT' : 'POST';
    const url = editingAdmissionId
      ? `${API_BASE_URL}/api/admissions/${editingAdmissionId}`
      : `${API_BASE_URL}/api/admissions`;

    try {
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
        throw new Error(errorData.message || 'Failed to save admission');
      }

      const savedAdmission: any = await response.json();
      const normalizedAdmission = normalizeAdmission(savedAdmission);

      if (editingAdmissionId) {
        setAdmissions(admissions.map(ad =>
          ad.id === editingAdmissionId ? normalizedAdmission : ad
        ));
        setEditingAdmissionId(null);
        toast({ title: "Admission Updated Successfully" });
      } else {
        setAdmissions([...admissions, normalizedAdmission]);
        toast({ title: "Admission Posted Successfully" });
      }
    } catch (error: any) {
      console.error("Failed to save admission:", error);
      toast({
        title: "Error",
        description: error.message || "Could not save admission to server.",
        variant: "destructive",
      });
    }
  };

  const handleDeleteAdmission = async (admission: ComprehensiveAdmissionData) => {
    const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;
    const dbId = admission.id;
    if (!dbId) {
      toast({ title: "Error", description: "Admission has no valid ID to delete.", variant: "destructive" });
      return;
    }
    if (!authService.isAuthenticated()) {
      toast({ title: "Auth Error", description: "Please log in to delete.", variant: "destructive" });
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/admissions/${dbId}`, {
        method: 'DELETE',
        headers: authService.getAuthHeaders(),
      });

      if (!response.ok) {
        if (response.status === 401) {
          onLogout();
          throw new Error('Session expired');
        }
        throw new Error('Failed to delete admission');
      }

      setAdmissions(admissions.filter(ad => ad.id !== dbId));
      toast({ title: "Admission Deleted", description: "The admission has been removed." });

    } catch (error: any) {
      console.error("Failed to delete admission:", error);
      toast({
        title: "Error",
        description: error.message || "Could not delete admission.",
        variant: "destructive",
      });
    }
  };

  // Helper function
  const splitCsv = (input?: string | number | string[] | number[]): string[] => {
    if (!input) return [];
    if (Array.isArray(input)) {
      return input.map(item => String(item).trim()).filter(Boolean);
    }
    const str = String(input);
    if (str.trim() === "") return [];
    return str.split(',').map(s => s.trim()).filter(Boolean);
  };

  return (
    <>
      <ComprehensiveAdmissionForm
        key={editingAdmissionId || 'new-admission'}
        onSubmit={onAdmissionSubmit}
        defaultValues={editingAdmissionId
          ? admissions.find(ad => ad.id === editingAdmissionId)
          : undefined}
      />

      <CRUDList
        title="Posted Admissions"
        description="Manage all posted admission listings"
        items={admissions}
        idKey="id"
        onEdit={(admission) => {
          setEditingAdmissionId(admission.id!);
        }}
        onDelete={handleDeleteAdmission}
        renderItem={(admission) => (
          <div>
            <h4 className="font-semibold">{admission.title}</h4>
            <p className="text-sm text-muted-foreground">{admission.organization}</p>
            <p className="text-xs text-muted-foreground mt-1">
              Type: {admission.admissionType} | Last Date: {admission.importantDates?.applicationEnd}
            </p>
          </div>
        )}
      />
    </>
  );
};