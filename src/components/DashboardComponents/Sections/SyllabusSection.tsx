import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { CRUDList } from "@/components/CRUDList";
import { authService } from "../authService";

const syllabusSchema = z.object({
  id: z.string().optional(),
  _id: z.string().optional(),
  category: z.string().min(1, "Category is required"),
  title: z.string().min(5, "Title must be at least 5 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  url: z.string().url("Must be a valid URL").optional().or(z.literal('')),
  organization: z.string().min(3, "Organization name is required"),
  subjects: z.string().min(5, "Subjects information is required (comma-separated)"),
});

type SyllabusData = z.infer<typeof syllabusSchema> & { id?: string, _id?: string };

interface SyllabusSectionProps {
  onLogout: () => void;
}

export const SyllabusSection = ({ onLogout }: SyllabusSectionProps) => {
  const { toast } = useToast();
  const [syllabusItems, setSyllabusItems] = useState<SyllabusData[]>([]);
  const [editingSyllabusId, setEditingSyllabusId] = useState<string | null>(null);

  const syllabusForm = useForm<z.infer<typeof syllabusSchema>>({
    resolver: zodResolver(syllabusSchema),
    defaultValues: { 
      category: "",
      title: "", 
      description: "", 
      organization: "", 
      url: "",
      subjects: "", 
    },
  });

  // Fetch syllabi on component mount
  useEffect(() => {
    fetchSyllabi();
  }, []);

  const fetchSyllabi = async () => {
    const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;
    if (!API_BASE_URL) return;
    
    try {
      const response = await fetch(`${API_BASE_URL}/api/syllabus`, {
        headers: authService.getAuthHeaders(),
      });

      if (!response.ok) {
        if (response.status === 401) {
          onLogout();
          throw new Error('Session expired');
        }
        throw new Error('Failed to fetch syllabi');
      }

      const data: any = await response.json();
      const syllabiArray = Array.isArray(data.data) ? data.data : (Array.isArray(data) ? data : []);

      // Normalize: convert subjects array to comma-separated string for form state
      const normalizedSyllabi = syllabiArray.map((s: any) => ({
          ...s,
          id: s._id || s.id,
          url: s.url || "",
          subjects: toCsv(s.subjects), // Convert array to string
      }));

      setSyllabusItems(normalizedSyllabi);
    } catch (error: any) {
      console.error("Failed to fetch syllabi:", error);
      toast({
        title: "Error",
        description: error.message || "Could not fetch syllabi from server.",
        variant: "destructive"
      });
    }
  };

  const handleSyllabusSubmit = async (data: z.infer<typeof syllabusSchema>) => {
    if (!authService.isAuthenticated()) {
      toast({ title: "Authentication Required", description: "Please log in to perform this action.", variant: "destructive" });
      return;
    }

    const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;
    const { id, _id, ...formData } = data;
    const dbId = id || _id || editingSyllabusId;
    
    // API Payload: Convert subjects string to array
    const apiPayload = {
      ...formData,
      subjects: splitCsv(formData.subjects), // Convert string back to array
    };

    const method = dbId ? 'PUT' : 'POST';
    const url = dbId
      ? `${API_BASE_URL}/api/syllabus/${dbId}`
      : `${API_BASE_URL}/api/syllabus`;

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
        throw new Error(errorData.message || `Failed to ${dbId ? 'update' : 'create'} syllabus`);
      }

      // Refresh the list and reset form
      await fetchSyllabi(); 
      setEditingSyllabusId(null);
      syllabusForm.reset();
      toast({ title: "Syllabus Saved", description: `Syllabus successfully ${dbId ? 'updated' : 'posted'}.` });

    } catch (error: any) {
      console.error("Syllabus submit failed:", error);
      toast({
        title: "Error",
        description: error.message || `Could not save syllabus to server.`,
        variant: "destructive",
      });
    }
  };

  const handleDeleteSyllabus = async (syllabus: SyllabusData) => {
    const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;
    const dbId = syllabus.id || syllabus._id;
    if (!dbId) {
        toast({ title: "Error", description: "Syllabus has no valid ID to delete.", variant: "destructive" });
        return;
    }
    if (!authService.isAuthenticated()) {
        toast({ title: "Auth Error", description: "Please log in to delete.", variant: "destructive" });
        return;
    }

    try {
        const response = await fetch(`${API_BASE_URL}/api/syllabus/${dbId}`, {
            method: 'DELETE',
            headers: authService.getAuthHeaders(),
        });

        if (!response.ok) {
            if (response.status === 401) {
                onLogout();
                throw new Error('Session expired');
            }
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to delete syllabus');
        }

        // Optimistic update: filter out the deleted item
        setSyllabusItems(syllabusItems.filter(s => s.id !== dbId));
        toast({ title: "Syllabus Deleted", description: "The syllabus entry has been removed." });

    } catch (error: any) {
        console.error("Failed to delete syllabus:", error);
        toast({
            title: "Error",
            description: error.message || "Could not delete syllabus.",
            variant: "destructive",
        });
    }
  };

  // Helper functions
  const splitCsv = (input?: string | number | string[] | number[]): string[] => {
    if (!input) return [];
    if (Array.isArray(input)) {
      return input.map(item => String(item).trim()).filter(Boolean);
    }
    const str = String(input);
    if (str.trim() === "") return [];
    return str.split(',').map(s => s.trim()).filter(Boolean);
  };

  const toCsv = (arr?: string[] | number[]) => {
    if (!arr || arr.length === 0) return "";
    return arr.join(', ');
  };

  return (
    <>
      {/* Syllabus Form (Create/Edit) */}
      <Card key={editingSyllabusId || 'new-syllabus'}>
        <CardHeader>
          <CardTitle>{editingSyllabusId ? "Edit Syllabus" : "Post New Syllabus"}</CardTitle>
          <CardDescription>
            {editingSyllabusId ? "Modify the existing syllabus." : "Add a new exam syllabus."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...syllabusForm}>
            <form onSubmit={syllabusForm.handleSubmit(handleSyllabusSubmit)} className="space-y-4">
              
              {/* Category */}
              <FormField control={syllabusForm.control} name="category" render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., upsc, ssc, jee" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              {/* Title */}
              <FormField control={syllabusForm.control} name="title" render={({ field }) => (
                <FormItem><FormLabel>Syllabus Title</FormLabel><FormControl><Input placeholder="e.g., UPSC Civil Services 2025 Syllabus" {...field} /></FormControl><FormMessage /></FormItem>
              )} />

              {/* Organization */}
              <FormField control={syllabusForm.control} name="organization" render={({ field }) => (
                <FormItem><FormLabel>Organization</FormLabel><FormControl><Input placeholder="e.g., Union Public Service Commission" {...field} /></FormControl><FormMessage /></FormItem>
              )} />

              {/* Description */}
              <FormField control={syllabusForm.control} name="description" render={({ field }) => (
                <FormItem><FormLabel>Description</FormLabel><FormControl><Textarea placeholder="e.g., Prelims (GS + CSAT), Mains (9 Papers) & Interview" className="min-h-[80px]" {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              
              {/* Subjects (CSV string) */}
              <FormField control={syllabusForm.control} name="subjects" render={({ field }) => (
                <FormItem><FormLabel>Subjects/Topics (comma-separated)</FormLabel><FormControl><Textarea placeholder="e.g., General Studies (History, Polity, Geography), Essay, Optional Subject" className="min-h-[80px]" {...field} /></FormControl><FormMessage /></FormItem>
              )} />

              {/* URL */}
              <FormField control={syllabusForm.control} name="url" render={({ field }) => (
                <FormItem><FormLabel>PDF URL (Download Link)</FormLabel><FormControl><Input placeholder="e.g., https://example.com/syllabus.pdf" {...field} /></FormControl><FormMessage /></FormItem>
              )} />

              <Button type="submit" className="w-full">
                {editingSyllabusId ? "Update Syllabus" : "Post Syllabus"}
              </Button>
              {editingSyllabusId && (
                <Button type="button" variant="outline" className="w-full mt-2" onClick={() => {
                  setEditingSyllabusId(null);
                  syllabusForm.reset();
                }}>
                  Cancel Edit
                </Button>
              )}
            </form>
          </Form>
        </CardContent>
      </Card>

      <div className="mt-8">
        <CRUDList
          title="Posted Syllabi"
          description="Manage all posted syllabus documents"
          items={syllabusItems}
          idKey="id"
          onEdit={(syllabus) => {
            setEditingSyllabusId(syllabus.id!);
            // Populate the form fields directly
            syllabusForm.reset({
              id: syllabus.id,
              _id: syllabus._id,
              category: syllabus.category,
              title: syllabus.title,
              description: syllabus.description,
              organization: syllabus.organization,
              subjects: syllabus.subjects, // already in CSV string format from fetchSyllabi
              url: syllabus.url
            });
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          onDelete={handleDeleteSyllabus}
          renderItem={(syllabus) => (
            <div>
              <h4 className="font-semibold">{syllabus.title}</h4>
              <p className="text-sm text-muted-foreground">{syllabus.organization}</p>
              <p className="text-xs text-muted-foreground mt-1">
                Category: {syllabus.category} | Subjects: {syllabus.subjects}
              </p>
            </div>
          )}
        />
      </div>
    </>
  );
};