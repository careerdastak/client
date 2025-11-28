import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { authService } from "../authService";

const documentSchema = z.object({
  category: z.string().min(1, "Category is required"),
  title: z.string().min(5, "Title must be at least 5 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  url: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  services: z.string().optional(),
  // New fields for the updated schema
  importantDatesFees: z.array(z.object({
    key: z.string(),
    value: z.string(),
    category: z.enum(["date", "fee", "general"]).default("general")
  })).optional(),
  documentsRequired: z.array(z.string()).optional(),
  howToApply: z.array(z.object({
    stepNumber: z.number(),
    description: z.string(),
    action: z.string().optional()
  })).optional(),
  usefulLinks: z.array(z.object({
    title: z.string().min(1, "Title is required"),
    url: z.string().url("Must be a valid URL"),
  })).optional(),
  imageLink: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  serviceProvider: z.string().optional(),
  tags: z.string().optional(),
  metaDescription: z.string().optional(),
  metaKeywords: z.string().optional(),
  isActive: z.boolean().default(true),
});

type DocumentData = z.infer<typeof documentSchema> & { 
  id?: string, 
  _id?: string,
  slug?: string
};

interface DocumentsSectionProps {
  onLogout: () => void;
}

export const DocumentsSection = ({ onLogout }: DocumentsSectionProps) => {
  const { toast } = useToast();
  const [documents, setDocuments] = useState<DocumentData[]>([]);
  const [isEditingDocument, setIsEditingDocument] = useState(false);
  const [editDocumentId, setEditDocumentId] = useState<string | null>(null);
  const [showAdvancedFields, setShowAdvancedFields] = useState(false);

  const documentForm = useForm<z.infer<typeof documentSchema>>({
    resolver: zodResolver(documentSchema),
    defaultValues: { 
      category: "", 
      title: "", 
      description: "", 
      url: "", 
      services: "",
      importantDatesFees: [],
      documentsRequired: [],
      howToApply: [],
      usefulLinks: [],
      imageLink: "",
      serviceProvider: "Government of India",
      tags: "",
      metaDescription: "",
      metaKeywords: "",
      isActive: true,
    },
  });

  // Fetch documents on component mount
  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;
    if (!API_BASE_URL) {
      toast({ title: "Configuration Error", description: "Backend URL is not set.", variant: "destructive" });
      return;
    }
    
    try {
      const res = await fetch(`${API_BASE_URL}/api/documents`, {
        headers: authService.getAuthHeaders(),
      });

      if (!res.ok) {
        if (res.status === 401) {
          onLogout();
          throw new Error("Session expired");
        }
        throw new Error("Failed to fetch documents");
      }

      const payload = await res.json();
      const docs = Array.isArray(payload) ? payload : (payload.data || []);
      setDocuments(docs);
    } catch (error: any) {
      console.error("fetchDocuments error:", error);
      toast({
        title: "Error",
        description: error.message || "Could not load documents",
        variant: "destructive"
      });
    }
  };

  const onDocumentSubmit = async (data: z.infer<typeof documentSchema>) => {
    if (!authService.isAuthenticated()) {
      toast({ title: "Authentication Required", description: "Please log in to perform this action.", variant: "destructive" });
      return;
    }

    const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

    try {
      // Prepare payload with new schema fields
      const payload = {
        category: data.category,
        title: data.title,
        description: data.description,
        url: data.url || undefined,
        services: data.services || undefined,
        importantDatesFees: data.importantDatesFees || [],
        documentsRequired: data.documentsRequired || [],
        howToApply: data.howToApply || [],
        usefulLinks: data.usefulLinks || [],
        imageLink: data.imageLink || undefined,
        serviceProvider: data.serviceProvider || "Government of India",
        tags: data.tags ? data.tags.split(',').map(tag => tag.trim()) : [],
        metaDescription: data.metaDescription || undefined,
        metaKeywords: data.metaKeywords ? data.metaKeywords.split(',').map(keyword => keyword.trim()) : [],
        isActive: data.isActive,
      };

      const res = await fetch(`${API_BASE_URL}/api/documents`, {
        method: "POST",
        headers: authService.getAuthHeaders(),
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        if (res.status === 401) {
          onLogout();
          throw new Error("Session expired");
        }
        const err = await res.json();
        throw new Error(err.message || "Failed to add document");
      }

      const saved = await res.json();
      toast({ title: "Document added successfully" });
      documentForm.reset();
      setShowAdvancedFields(false);
      fetchDocuments();
    } catch (error: any) {
      console.error("onDocumentSubmit error:", error);
      toast({
        title: "Error",
        description: error.message || "Could not add document",
        variant: "destructive"
      });
    }
  };

  const onEditDocument = (doc: DocumentData) => {
    setIsEditingDocument(true);
    setEditDocumentId(doc._id || doc.id || null);

    // Set all form values including new fields
    documentForm.setValue("category", doc.category || "");
    documentForm.setValue("title", doc.title || "");
    documentForm.setValue("description", doc.description || "");
    documentForm.setValue("url", doc.url || "");
    documentForm.setValue("services", doc.services || "");
    documentForm.setValue("importantDatesFees", doc.importantDatesFees || []);
    documentForm.setValue("documentsRequired", doc.documentsRequired || []);
    documentForm.setValue("howToApply", doc.howToApply || []);
    documentForm.setValue("usefulLinks", doc.usefulLinks || []);
    documentForm.setValue("imageLink", doc.imageLink || "");
    documentForm.setValue("serviceProvider", doc.serviceProvider || "Government of India");
    documentForm.setValue("tags", Array.isArray(doc.tags) ? doc.tags.join(", ") : doc.tags || "");
    documentForm.setValue("metaDescription", doc.metaDescription || "");
    documentForm.setValue("metaKeywords", Array.isArray(doc.metaKeywords) ? doc.metaKeywords.join(", ") : doc.metaKeywords || "");
    documentForm.setValue("isActive", doc.isActive !== undefined ? doc.isActive : true);
    
    setShowAdvancedFields(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const onUpdateDocument = async (data: z.infer<typeof documentSchema>) => {
    if (!authService.isAuthenticated()) {
      toast({ title: "Authentication Required", description: "Please log in to perform this action.", variant: "destructive" });
      return;
    }
    if (!editDocumentId) {
      toast({ title: "Error", description: "No document selected for update.", variant: "destructive" });
      return;
    }

    const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

    try {
      const payload = {
        category: data.category,
        title: data.title,
        description: data.description,
        url: data.url || undefined,
        services: data.services || undefined,
        importantDatesFees: data.importantDatesFees || [],
        documentsRequired: data.documentsRequired || [],
        howToApply: data.howToApply || [],
        usefulLinks: data.usefulLinks || [],
        imageLink: data.imageLink || undefined,
        serviceProvider: data.serviceProvider || "Government of India",
        tags: data.tags ? data.tags.split(',').map(tag => tag.trim()) : [],
        metaDescription: data.metaDescription || undefined,
        metaKeywords: data.metaKeywords ? data.metaKeywords.split(',').map(keyword => keyword.trim()) : [],
        isActive: data.isActive,
      };

      const res = await fetch(`${API_BASE_URL}/api/documents/${editDocumentId}`, {
        method: "PUT",
        headers: authService.getAuthHeaders(),
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        if (res.status === 401) {
          onLogout();
          throw new Error("Session expired");
        }
        const err = await res.json();
        throw new Error(err.message || "Failed to update document");
      }

      const updated = await res.json();
      toast({ title: "Document updated successfully" });
      setIsEditingDocument(false);
      setEditDocumentId(null);
      setShowAdvancedFields(false);
      documentForm.reset();
      fetchDocuments();
    } catch (error: any) {
      console.error("onUpdateDocument error:", error);
      toast({
        title: "Error",
        description: error.message || "Could not update document",
        variant: "destructive"
      });
    }
  };

  const onDeleteDocument = async (id?: string) => {
    if (!id) {
      toast({ title: "Error", description: "Invalid document id", variant: "destructive" });
      return;
    }
    if (!authService.isAuthenticated()) {
      toast({ title: "Authentication Required", description: "Please log in to perform this action.", variant: "destructive" });
      return;
    }

    const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

    try {
      const res = await fetch(`${API_BASE_URL}/api/documents/${id}`, {
        method: "DELETE",
        headers: authService.getAuthHeaders(),
      });

      if (!res.ok) {
        if (res.status === 401) {
          onLogout();
          throw new Error("Session expired");
        }
        const err = await res.json();
        throw new Error(err.message || "Failed to delete document");
      }

      toast({ title: "Document deleted" });
      fetchDocuments();
    } catch (error: any) {
      console.error("onDeleteDocument error:", error);
      toast({
        title: "Error",
        description: error.message || "Could not delete document",
        variant: "destructive"
      });
    }
  };

  const toggleDocumentStatus = async (id: string, currentStatus: boolean) => {
    if (!authService.isAuthenticated()) {
      toast({ title: "Authentication Required", description: "Please log in to perform this action.", variant: "destructive" });
      return;
    }

    const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

    try {
      const res = await fetch(`${API_BASE_URL}/api/documents/${id}`, {
        method: "PATCH",
        headers: authService.getAuthHeaders(),
        body: JSON.stringify({ isActive: !currentStatus }),
      });

      if (!res.ok) {
        if (res.status === 401) {
          onLogout();
          throw new Error("Session expired");
        }
        const err = await res.json();
        throw new Error(err.message || "Failed to update document status");
      }

      toast({ 
        title: `Document ${!currentStatus ? 'activated' : 'deactivated'} successfully` 
      });
      fetchDocuments();
    } catch (error: any) {
      console.error("toggleDocumentStatus error:", error);
      toast({
        title: "Error",
        description: error.message || "Could not update document status",
        variant: "destructive"
      });
    }
  };

  // Helper functions for array fields
  const addDateFee = () => {
    const current = documentForm.getValues("importantDatesFees") || [];
    documentForm.setValue("importantDatesFees", [...current, { key: "", value: "", category: "general" }]);
  };

  const removeDateFee = (index: number) => {
    const current = documentForm.getValues("importantDatesFees") || [];
    documentForm.setValue("importantDatesFees", current.filter((_, i) => i !== index));
  };

  const addDocumentRequired = () => {
    const current = documentForm.getValues("documentsRequired") || [];
    documentForm.setValue("documentsRequired", [...current, ""]);
  };

  const removeDocumentRequired = (index: number) => {
    const current = documentForm.getValues("documentsRequired") || [];
    documentForm.setValue("documentsRequired", current.filter((_, i) => i !== index));
  };

  const addHowToStep = () => {
    const current = documentForm.getValues("howToApply") || [];
    documentForm.setValue("howToApply", [...current, { stepNumber: current.length + 1, description: "", action: "" }]);
  };

  const removeHowToStep = (index: number) => {
    const current = documentForm.getValues("howToApply") || [];
    documentForm.setValue("howToApply", current.filter((_, i) => i !== index));
  };

  // Simple useful links functions
  const addUsefulLink = () => {
    const current = documentForm.getValues("usefulLinks") || [];
    documentForm.setValue("usefulLinks", [...current, { title: "", url: "" }]);
  };

  const removeUsefulLink = (index: number) => {
    const current = documentForm.getValues("usefulLinks") || [];
    documentForm.setValue("usefulLinks", current.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6">
      {/* ADD / EDIT DOCUMENT FORM */}
      <Card>
        <CardHeader>
          <CardTitle>
            {isEditingDocument ? "Update Document Service" : "Post New Document Service"}
          </CardTitle>
          <CardDescription>
            {isEditingDocument
              ? "Modify the existing document service information."
              : "Add a new document service with comprehensive details."}
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Form {...documentForm}>
            <form
              onSubmit={documentForm.handleSubmit(
                isEditingDocument ? onUpdateDocument : onDocumentSubmit
              )}
              className="space-y-4"
            >
              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Category */}
                <FormField
                  control={documentForm.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category *</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="identity">Identity</SelectItem>
                          <SelectItem value="education">Education</SelectItem>
                          <SelectItem value="employment">Employment</SelectItem>
                          <SelectItem value="transport">Transport</SelectItem>
                          <SelectItem value="property">Property</SelectItem>
                          <SelectItem value="health">Health</SelectItem>
                          <SelectItem value="other">Other Services</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Service Provider */}
                <FormField
                  control={documentForm.control}
                  name="serviceProvider"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Service Provider</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Government of India" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Title */}
              <FormField
                control={documentForm.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Document Title *</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g., PAN Card Services - Registration, Correction & Other Services 2025"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Description */}
              <FormField
                control={documentForm.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description *</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., Complete guide for PAN card services including new registration, status check, correction, and linking with Aadhaar"
                        className="min-h-[80px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* URL and Image Link */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={documentForm.control}
                  name="url"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Official URL</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g., https://www.onlineservices.nsdl.com/"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={documentForm.control}
                  name="imageLink"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Image/Banner URL</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g., https://example.com/pan-card-banner.jpg"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Services (Legacy field) */}
              <FormField
                control={documentForm.control}
                name="services"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Services (Legacy)</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., New Registration, Status Check, Correction, Aadhaar Linking"
                        className="min-h-[60px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Status Section */}
              {/* <Card> */}
                {/* <CardHeader>
                  <CardTitle>Document Status</CardTitle>
                  <CardDescription>Control the visibility of this document service</CardDescription>
                </CardHeader> */}
                {/* <CardContent> */}
                  <FormField
                    control={documentForm.control}
                    name="isActive"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">Active Status</FormLabel>
                          <FormDescription>
                            {field.value ? "This document service is active and visible to users." : "This document service is inactive and hidden from users."}
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                {/* </CardContent> */}
              {/* </Card> */}

              {/* Advanced Fields Toggle */}
              <div className="border-t pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowAdvancedFields(!showAdvancedFields)}
                  className="w-full"
                >
                  {showAdvancedFields ? "Hide Advanced Fields" : "Show Advanced Fields"}
                </Button>
              </div>

              {/* Advanced Fields */}
              {showAdvancedFields && (
                <div className="space-y-6 border rounded-lg p-4 bg-muted/50">
                  {/* Important Dates & Fees */}
                  <div>
                    <div className="flex justify-between items-center mb-3">
                      <FormLabel>Important Dates & Fees</FormLabel>
                      <Button type="button" size="sm" onClick={addDateFee}>
                        Add Date/Fee
                      </Button>
                    </div>
                    {documentForm.watch("importantDatesFees")?.map((_, index) => (
                      <div key={index} className="flex gap-2 mb-2">
                        <Input
                          placeholder="Key (e.g., Application Start)"
                          value={documentForm.watch(`importantDatesFees.${index}.key`)}
                          onChange={(e) => documentForm.setValue(`importantDatesFees.${index}.key`, e.target.value)}
                        />
                        <Input
                          placeholder="Value (e.g., Already Started)"
                          value={documentForm.watch(`importantDatesFees.${index}.value`)}
                          onChange={(e) => documentForm.setValue(`importantDatesFees.${index}.value`, e.target.value)}
                        />
                        <Select
                          value={documentForm.watch(`importantDatesFees.${index}.category`)}
                          onValueChange={(value: any) => documentForm.setValue(`importantDatesFees.${index}.category`, value)}
                        >
                          <SelectTrigger className="w-[120px]">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="date">Date</SelectItem>
                            <SelectItem value="fee">Fee</SelectItem>
                            <SelectItem value="general">General</SelectItem>
                          </SelectContent>
                        </Select>
                        <Button type="button" variant="destructive" size="sm" onClick={() => removeDateFee(index)}>
                          Remove
                        </Button>
                      </div>
                    ))}
                  </div>

                  {/* Documents Required */}
                  <div>
                    <div className="flex justify-between items-center mb-3">
                      <FormLabel>Documents Required</FormLabel>
                      <Button type="button" size="sm" onClick={addDocumentRequired}>
                        Add Document
                      </Button>
                    </div>
                    {documentForm.watch("documentsRequired")?.map((_, index) => (
                      <div key={index} className="flex gap-2 mb-2">
                        <Input
                          placeholder="e.g., Aadhaar Card, Passport, Voter ID"
                          value={documentForm.watch(`documentsRequired.${index}`)}
                          onChange={(e) => documentForm.setValue(`documentsRequired.${index}`, e.target.value)}
                          className="flex-1"
                        />
                        <Button type="button" variant="destructive" size="sm" onClick={() => removeDocumentRequired(index)}>
                          Remove
                        </Button>
                      </div>
                    ))}
                  </div>

                  {/* How to Apply Steps */}
                  <div>
                    <div className="flex justify-between items-center mb-3">
                      <FormLabel>How to Apply Steps</FormLabel>
                      <Button type="button" size="sm" onClick={addHowToStep}>
                        Add Step
                      </Button>
                    </div>
                    {documentForm.watch("howToApply")?.map((_, index) => (
                      <div key={index} className="border rounded p-3 mb-3">
                        <div className="flex gap-2 mb-2">
                          <Input
                            placeholder="Step Number"
                            type="number"
                            value={documentForm.watch(`howToApply.${index}.stepNumber`)}
                            onChange={(e) => documentForm.setValue(`howToApply.${index}.stepNumber`, parseInt(e.target.value))}
                            className="w-20"
                          />
                          <Input
                            placeholder="Action (optional)"
                            value={documentForm.watch(`howToApply.${index}.action`)}
                            onChange={(e) => documentForm.setValue(`howToApply.${index}.action`, e.target.value)}
                            className="flex-1"
                          />
                        </div>
                        <Textarea
                          placeholder="Step description"
                          value={documentForm.watch(`howToApply.${index}.description`)}
                          onChange={(e) => documentForm.setValue(`howToApply.${index}.description`, e.target.value)}
                        />
                        <Button type="button" variant="destructive" size="sm" onClick={() => removeHowToStep(index)} className="mt-2">
                          Remove Step
                        </Button>
                      </div>
                    ))}
                  </div>

                  {/* Useful Links - Simplified */}
                  <div>
                    <div className="flex justify-between items-center mb-3">
                      <FormLabel>Useful Links</FormLabel>
                      <Button type="button" size="sm" onClick={addUsefulLink}>
                        Add Link
                      </Button>
                    </div>
                    {documentForm.watch("usefulLinks")?.map((_, index) => (
                      <div key={index} className="border rounded p-3 mb-3">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-2">
                          <Input
                            placeholder="Link Title (e.g., Apply Online, Check Status)"
                            value={documentForm.watch(`usefulLinks.${index}.title`)}
                            onChange={(e) => documentForm.setValue(`usefulLinks.${index}.title`, e.target.value)}
                          />
                          <Input
                            placeholder="URL"
                            value={documentForm.watch(`usefulLinks.${index}.url`)}
                            onChange={(e) => documentForm.setValue(`usefulLinks.${index}.url`, e.target.value)}
                          />
                        </div>
                        <Button type="button" variant="destructive" size="sm" onClick={() => removeUsefulLink(index)}>
                          Remove Link
                        </Button>
                      </div>
                    ))}
                  </div>

                  {/* SEO Fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={documentForm.control}
                      name="tags"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Tags (comma-separated)</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., pan card, income tax, registration" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={documentForm.control}
                      name="metaKeywords"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Meta Keywords (comma-separated)</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., pan card, apply online, status check" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={documentForm.control}
                    name="metaDescription"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Meta Description</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Brief description for SEO (150-160 characters)"
                            className="min-h-[60px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}

              <Button type="submit" className="w-full">
                {isEditingDocument ? "Update Document" : "Post Document Service"}
              </Button>
              
              {isEditingDocument && (
                <Button 
                  type="button" 
                  variant="outline" 
                  className="w-full mt-2"
                  onClick={() => {
                    setIsEditingDocument(false);
                    setEditDocumentId(null);
                    setShowAdvancedFields(false);
                    documentForm.reset();
                  }}
                >
                  Cancel Edit
                </Button>
              )}
            </form>
          </Form>
        </CardContent>
      </Card>

      {/* DOCUMENT LIST */}
      <Card>
        <CardHeader>
          <CardTitle>All Document Services</CardTitle>
          <CardDescription>Manage, edit or delete documents</CardDescription>
        </CardHeader>

        <CardContent>
          <div className="space-y-4">
            {documents.length === 0 ? (
              <p className="text-sm text-gray-500">No documents added yet.</p>
            ) : (
              documents.map((doc) => (
                <div
                  key={doc._id || doc.id}
                  className="p-4 border rounded-lg flex justify-between items-start"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-bold text-lg">{doc.title}</h3>
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${doc.isActive ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                        <span className={`text-xs ${doc.isActive ? 'text-green-600' : 'text-gray-500'}`}>
                          {doc.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{doc.description}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-3 text-sm">
                      <p><strong>Category:</strong> <span className="capitalize">{doc.category}</span></p>
                      <p><strong>Service Provider:</strong> {doc.serviceProvider || "Government of India"}</p>
                      {doc.url && (
                        <p className="md:col-span-2">
                          <strong>URL:</strong>{" "}
                          <a href={doc.url} target="_blank" rel="noreferrer" className="text-primary underline break-all">
                            {doc.url}
                          </a>
                        </p>
                      )}
                    </div>

                    {/* Display array data if available */}
                    {(doc.documentsRequired && doc.documentsRequired.length > 0) && (
                      <div className="mt-2">
                        <strong>Documents Required:</strong> {doc.documentsRequired.join(", ")}
                      </div>
                    )}

                    {(doc.importantDatesFees && doc.importantDatesFees.length > 0) && (
                      <div className="mt-2">
                        <strong>Important Info:</strong>{" "}
                        {doc.importantDatesFees.map((item, idx) => (
                          <span key={idx} className="mr-3">
                            {item.key}: {item.value}
                          </span>
                        ))}
                      </div>
                    )}

                    {(doc.usefulLinks && doc.usefulLinks.length > 0) && (
                      <div className="mt-2">
                        <strong>Useful Links:</strong>{" "}
                        {doc.usefulLinks.map((link, idx) => (
                          <span key={idx} className="mr-3">
                            <a href={link.url} target="_blank" rel="noreferrer" className="text-primary underline">
                              {link.title}
                            </a>
                          </span>
                        ))}
                      </div>
                    )}

                    {doc.slug && (
                      <p className="text-xs text-gray-500 mt-2">
                        <strong>Slug:</strong> {doc.slug}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col gap-2 ml-4">
                    {/* <Button 
                      size="sm" 
                      variant={doc.isActive ? "outline" : "default"}
                      onClick={() => toggleDocumentStatus(doc._id || doc.id!, doc.isActive !== undefined ? doc.isActive : true)}
                    >
                      {doc.isActive ? 'Deactivate' : 'Activate'}
                    </Button> */}
                    <Button size="sm" onClick={() => onEditDocument(doc)}>
                      Edit
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => onDeleteDocument(doc._id || doc.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};