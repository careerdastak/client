import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { ComprehensiveJobForm } from "@/components/ComprehensiveJobForm";
import { CRUDList } from "@/components/CRUDList";
import { authService } from "../authService";
import { normalizeJob, jobSchema, type ComprehensiveJobData } from "../schemas";

interface JobsSectionProps {
  onLogout: () => void;
}

export const JobsSection = ({ onLogout }: JobsSectionProps) => {
  const { toast } = useToast();
  const [jobs, setJobs] = useState<ComprehensiveJobData[]>([]);
  const [editingJobId, setEditingJobId] = useState<string | null>(null);

  // Fetch jobs on component mount
  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;
    if (!API_BASE_URL) {
      console.error("Backend URL is not defined. Set VITE_BACKEND_URL in .env");
      toast({ title: "Configuration Error", description: "Backend URL is not set.", variant: "destructive" });
      return;
    }
    
    try {
      const response = await fetch(`${API_BASE_URL}/api/jobs`, {
        headers: authService.getAuthHeaders(),
      });

      if (!response.ok) {
        if (response.status === 401) {
          onLogout();
          throw new Error('Session expired');
        }
        throw new Error('Failed to fetch jobs');
      }

      const data: any[] = await response.json();
      if (Array.isArray(data)) {
        setJobs(data.map(normalizeJob));
      } else {
        setJobs([]);
        console.warn("Expected array but got:", data);
      }
    } catch (error: any) {
      console.error("Failed to fetch jobs:", error);
      toast({
        title: "Error",
        description: error.message || "Could not fetch jobs from server.",
        variant: "destructive"
      });
    }
  };

  const onJobSubmit = async (data: ComprehensiveJobData) => {
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
    if (apiPayload.eligibilityCriteria?.ageLimit?.additionalAgeRules) {
      apiPayload.eligibilityCriteria.ageLimit.additionalAgeRules = 
        apiPayload.eligibilityCriteria.ageLimit.additionalAgeRules.map((item: { value: string }) => item.value);
    }
    
    if (apiPayload.eligibilityCriteria?.additionalCertifications) {
      apiPayload.eligibilityCriteria.additionalCertifications = 
        apiPayload.eligibilityCriteria.additionalCertifications.map((item: { value: string }) => item.value);
    }
    
    if (apiPayload.applicationFee?.paymentModes) {
      apiPayload.applicationFee.paymentModes = 
        apiPayload.applicationFee.paymentModes.map((item: { value: string }) => item.value);
    }
    
    if (apiPayload.selectionProcess) {
      apiPayload.selectionProcess = 
        apiPayload.selectionProcess.map((item: { value: string }) => item.value);
    }
    
    if (apiPayload.extraInfo?.documentsRequired) {
      apiPayload.extraInfo.documentsRequired = 
        apiPayload.extraInfo.documentsRequired.map((item: { value: string }) => item.value);
    }
    
    if (apiPayload.extraInfo?.examPattern) {
      apiPayload.extraInfo.examPattern = 
        apiPayload.extraInfo.examPattern.map((item: { value: string }) => item.value);
    }

    const method = editingJobId ? 'PUT' : 'POST';
    const url = editingJobId
      ? `${API_BASE_URL}/api/jobs/${editingJobId}`
      : `${API_BASE_URL}/api/jobs`;

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
        throw new Error(errorData.message || 'Failed to save job');
      }

      const savedJob: any = await response.json();
      const normalizedJob = normalizeJob(savedJob);

      if (editingJobId) {
        setJobs(jobs.map(job =>
          job.id === editingJobId ? normalizedJob : job
        ));
        setEditingJobId(null);
        toast({ title: "Job Updated Successfully" });
      } else {
        setJobs([...jobs, normalizedJob]);
        toast({ title: "Job Posted Successfully" });
      }
    } catch (error: any) {
      console.error("Failed to save job:", error);
      toast({
        title: "Error",
        description: error.message || "Could not save job to server.",
        variant: "destructive",
      });
    }
  };

  const handleDeleteJob = async (job: ComprehensiveJobData) => {
    const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;
    const dbId = job.id;
    if (!dbId) {
      toast({ title: "Error", description: "Job has no valid ID to delete.", variant: "destructive" });
      return;
    }
    if (!authService.isAuthenticated()) {
      toast({ title: "Auth Error", description: "Please log in to delete.", variant: "destructive" });
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/jobs/${dbId}`, {
        method: 'DELETE',
        headers: authService.getAuthHeaders(),
      });

      if (!response.ok) {
        if (response.status === 401) {
          onLogout();
          throw new Error('Session expired');
        }
        throw new Error('Failed to delete job');
      }

      setJobs(jobs.filter(j => j.id !== dbId));
      toast({ title: "Job Deleted", description: "The job has been removed." });

    } catch (error: any) {
      console.error("Failed to delete job:", error);
      toast({
        title: "Error",
        description: error.message || "Could not delete job.",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <ComprehensiveJobForm
        key={editingJobId || 'new-job'}
        onSubmit={onJobSubmit}
        defaultValues={editingJobId
          ? jobs.find(job => job.id === editingJobId)
          : undefined}
      />

      <CRUDList
        title="Posted Jobs"
        description="Manage all posted job listings"
        items={jobs}
        idKey="id"
        onEdit={(job) => {
          setEditingJobId(job.id!);
        }}
        onDelete={handleDeleteJob}
        renderItem={(job) => (
          <div>
            <h4 className="font-semibold">{job.title}</h4>
            <p className="text-sm text-muted-foreground">{job.organization}</p>
            <p className="text-xs text-muted-foreground mt-1">
              Posts: {String(job.totalPosts || 'N/A')} | Last Date: {job.importantDates?.applicationEnd}
            </p>
          </div>
        )}
      />
    </>
  );
};