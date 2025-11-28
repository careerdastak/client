import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { CustomFieldDialog } from "./CustomFieldDialog";
import { Trash2, Plus, X } from "lucide-react";

// Updated ZOD Schema to match MongoDB schema
const schemeSchema = z.object({
  schemeId: z.string().min(1, "Scheme ID is required"),
  title: z.string().min(5, "Title must be at least 5 characters"),
  slug: z.string().optional(),
  description: z.string().min(50, "Description must be at least 50 characters"),
  fullDescription: z.string().optional(),
  category: z.enum([
    "Agriculture", 
    "Housing", 
    "Education", 
    "Healthcare", 
    "Business", 
    "Women", 
    "Senior Citizen", 
    "Other"
  ]),
  department: z.string().min(2, "Department name is required"),
  launchDate: z.string().min(1, "Launch date is required"),
  lastDate: z.string().optional(),
  
  // Eligibility & Benefits
  eligibility: z.string().min(1, "Eligibility is required"),
  eligibilityDetails: z.array(z.object({
    value: z.string().min(1, "Eligibility detail cannot be empty")
  })).optional(),
  benefits: z.string().min(1, "Benefits description is required"),
  benefitsDetails: z.array(z.object({
    value: z.string().min(1, "Benefit detail cannot be empty")
  })).optional(),
  
  // Financial Information
  financialInfo: z.object({
    amount: z.string().optional(),
    subsidy: z.string().optional(),
    coverage: z.string().optional(),
    installmentDetails: z.string().optional(),
  }).optional(),

  // Objectives
  objectives: z.array(z.object({
    value: z.string().min(1, "Objective cannot be empty")
  })).optional(),

  // Application Process
  howToApply: z.array(z.object({
    value: z.string().min(1, "Application step cannot be empty")
  })).optional(),
  applicationMode: z.enum(["Online", "Offline", "Both"]).default("Online"),
  applicationLink: z.string().url().optional().or(z.literal('')),

  // Required Documents
  documents: z.array(z.object({
    value: z.string().min(1, "Document cannot be empty")
  })).optional(),

  // Important Links
  links: z.object({
    officialWebsite: z.string().url("Must be a valid URL").optional().or(z.literal('')),
    applicationPortal: z.string().url("Must be a valid URL").optional().or(z.literal('')),
    guidelinesPDF: z.string().url("Must be a valid URL").optional().or(z.literal('')),
    helpline: z.string().optional(),
    mobileApp: z.string().optional(),
  }).optional(),

  // Status & Display
  status: z.object({
    isActive: z.boolean().default(true),
    isApplicationOpen: z.boolean().default(false),
    isPublished: z.boolean().default(true),
    isArchived: z.boolean().default(false)
  }),

  // Visual & UI
  icon: z.string().default("Gift"),
  color: z.string().default("text-primary"),
  imageUrl: z.string().url().optional().or(z.literal('')),

  // Target Audience
  targetAudience: z.array(z.object({
    value: z.string().min(1, "Target audience cannot be empty")
  })).optional(),
  beneficiaries: z.string().optional(),

  // Extensible Meta-Info
  extraInfo: z.object({
    faqs: z.array(z.object({
      question: z.string().min(1, "Question is required"),
      answer: z.string().min(1, "Answer is required"),
    })).optional(),
    successStories: z.array(z.object({
      value: z.string().min(1, "Success story cannot be empty")
    })).optional(),
    coverageAreas: z.array(z.object({
      value: z.string().min(1, "Coverage area cannot be empty")
    })).optional(),
    implementationAgency: z.string().optional(),
    attachments: z.array(z.object({
      name: z.string().min(1, "Name is required"),
      url: z.string().url("Must be a valid URL"),
      type: z.string().min(1, "Type is required"),
    })).optional(),
  }).optional(),

  // Social Links
  socialLinks: z.object({
    twitter: z.string().url().optional().or(z.literal('')),
    telegram: z.string().url().optional().or(z.literal('')),
    facebook: z.string().url().optional().or(z.literal('')),
  }).optional(),
});

interface ComprehensiveSchemeFormProps {
  onSubmit: (data: z.infer<typeof schemeSchema> & { customFields?: Record<string, any> }) => void;
  defaultValues?: Partial<z.infer<typeof schemeSchema>>;
}

export function ComprehensiveSchemeForm({ onSubmit, defaultValues }: ComprehensiveSchemeFormProps) {
  const [customFields, setCustomFields] = useState<Record<string, any>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof schemeSchema>>({
    resolver: zodResolver(schemeSchema),
    defaultValues: defaultValues || {
      schemeId: "",
      title: "",
      slug: "",
      description: "",
      fullDescription: "",
      category: "Other",
      department: "",
      launchDate: "",
      lastDate: "",
      eligibility: "",
      eligibilityDetails: [],
      benefits: "",
      benefitsDetails: [],
      financialInfo: {
        amount: "",
        subsidy: "",
        coverage: "",
        installmentDetails: "",
      },
      objectives: [],
      howToApply: [],
      applicationMode: "Online",
      applicationLink: "",
      documents: [],
      links: {
        officialWebsite: "",
        applicationPortal: "",
        guidelinesPDF: "",
        helpline: "",
        mobileApp: "",
      },
      status: {
        isActive: true,
        isApplicationOpen: false,
        isPublished: true,
        isArchived: false
      },
      icon: "Gift",
      color: "text-primary",
      imageUrl: "",
      targetAudience: [],
      beneficiaries: "",
      extraInfo: {
        faqs: [],
        successStories: [],
        coverageAreas: [],
        implementationAgency: "",
        attachments: [],
      },
      socialLinks: {
        twitter: "",
        telegram: "",
        facebook: "",
      },
    },
  });

  // Field Arrays
  const { fields: eligDetailFields, append: appendEligDetail, remove: removeEligDetail } = useFieldArray({ control: form.control, name: "eligibilityDetails" });
  const { fields: benefitDetailFields, append: appendBenefitDetail, remove: removeBenefitDetail } = useFieldArray({ control: form.control, name: "benefitsDetails" });
  const { fields: objectiveFields, append: appendObjective, remove: removeObjective } = useFieldArray({ control: form.control, name: "objectives" });
  const { fields: applicationFields, append: appendApplication, remove: removeApplication } = useFieldArray({ control: form.control, name: "howToApply" });
  const { fields: documentFields, append: appendDocument, remove: removeDocument } = useFieldArray({ control: form.control, name: "documents" });
  const { fields: targetFields, append: appendTarget, remove: removeTarget } = useFieldArray({ control: form.control, name: "targetAudience" });
  const { fields: faqFields, append: appendFaq, remove: removeFaq } = useFieldArray({ control: form.control, name: "extraInfo.faqs" });
  const { fields: storyFields, append: appendStory, remove: removeStory } = useFieldArray({ control: form.control, name: "extraInfo.successStories" });
  const { fields: coverageFields, append: appendCoverage, remove: removeCoverage } = useFieldArray({ control: form.control, name: "extraInfo.coverageAreas" });
  const { fields: attachmentFields, append: appendAttachment, remove: removeAttachment } = useFieldArray({ control: form.control, name: "extraInfo.attachments" });

  const handleAddCustomField = (field: { name: string; type: string; value: string }) => {
    setCustomFields({ ...customFields, [field.name]: field.value });
  };

  const handleSubmit = async (data: z.infer<typeof schemeSchema>) => {
    setIsSubmitting(true);
    try {
      await onSubmit({ ...data, customFields });
    } catch (error) {
      console.error("Form submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Create Government Scheme</CardTitle>
            <CardDescription>Add a comprehensive government scheme with all details</CardDescription>
          </div>
          <CustomFieldDialog onAddField={handleAddCustomField} />
        </div>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            
            {/* Basic Scheme Information */}
            <Card>
              <CardHeader><CardTitle>Basic Information</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <FormField control={form.control} name="schemeId" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Scheme ID *</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., PM-KISAN-2024" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="title" render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel>Scheme Title *</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., PM Kisan Samman Nidhi Yojana" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                </div>

                <FormField control={form.control} name="description" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Short Description *</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Brief description of the scheme (min 50 characters)" 
                        className="min-h-[80px]"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />

                <FormField control={form.control} name="fullDescription" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Description</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Detailed description of the scheme" 
                        className="min-h-[120px]"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <FormField control={form.control} name="category" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Agriculture">Agriculture</SelectItem>
                          <SelectItem value="Housing">Housing</SelectItem>
                          <SelectItem value="Education">Education</SelectItem>
                          <SelectItem value="Healthcare">Healthcare</SelectItem>
                          <SelectItem value="Business">Business</SelectItem>
                          <SelectItem value="Women">Women</SelectItem>
                          <SelectItem value="Senior Citizen">Senior Citizen</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )} />

                  <FormField control={form.control} name="department" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Department/Ministry *</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Ministry of Agriculture" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />

                  <FormField control={form.control} name="applicationMode" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Application Mode</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select mode" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Online">Online</SelectItem>
                          <SelectItem value="Offline">Offline</SelectItem>
                          <SelectItem value="Both">Both</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <FormField control={form.control} name="launchDate" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Launch Date *</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />

                  <FormField control={form.control} name="lastDate" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Date (if applicable)</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />

                  <FormField control={form.control} name="beneficiaries" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Beneficiaries</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Over 10 crore farmers" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                </div>
              </CardContent>
            </Card>

            {/* Eligibility & Benefits */}
            <Card>
              <CardHeader><CardTitle>Eligibility & Benefits</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <FormField control={form.control} name="eligibility" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Eligibility Criteria *</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Main eligibility criteria for the scheme" 
                        className="min-h-[80px]"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />

                {/* Eligibility Details */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <FormLabel>Detailed Eligibility Points</FormLabel>
                    <Button type="button" variant="outline" size="sm" onClick={() => appendEligDetail({ value: "" })}>
                      Add Detail
                    </Button>
                  </div>
                  {eligDetailFields.map((field, index) => (
                    <div key={field.id} className="flex gap-2 items-center mb-2">
                      <FormField control={form.control} name={`eligibilityDetails.${index}.value`} render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormControl>
                            <Input placeholder="e.g., Small and marginal farmer families" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                      <Button type="button" variant="destructive" size="icon" onClick={() => removeEligDetail(index)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>

                <FormField control={form.control} name="benefits" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Benefits Description *</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Main benefits provided by the scheme" 
                        className="min-h-[80px]"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />

                {/* Benefits Details */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <FormLabel>Detailed Benefits</FormLabel>
                    <Button type="button" variant="outline" size="sm" onClick={() => appendBenefitDetail({ value: "" })}>
                      Add Benefit
                    </Button>
                  </div>
                  {benefitDetailFields.map((field, index) => (
                    <div key={field.id} className="flex gap-2 items-center mb-2">
                      <FormField control={form.control} name={`benefitsDetails.${index}.value`} render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormControl>
                            <Input placeholder="e.g., ₹6000 per year in three installments" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                      <Button type="button" variant="destructive" size="icon" onClick={() => removeBenefitDetail(index)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Financial Information */}
            <Card>
              <CardHeader><CardTitle>Financial Information</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField control={form.control} name="financialInfo.amount" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Amount</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., ₹6000 per year" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />

                  <FormField control={form.control} name="financialInfo.subsidy" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Subsidy</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Up to ₹2.67 Lakhs" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField control={form.control} name="financialInfo.coverage" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Coverage</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., ₹5 Lakh health cover" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />

                  <FormField control={form.control} name="financialInfo.installmentDetails" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Installment Details</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Three installments of ₹2000 each" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                </div>
              </CardContent>
            </Card>

            {/* Objectives */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Objectives</CardTitle>
                <Button type="button" variant="outline" size="sm" onClick={() => appendObjective({ value: "" })}>
                  Add Objective
                </Button>
              </CardHeader>
              <CardContent className="space-y-3">
                {objectiveFields.map((field, index) => (
                  <div key={field.id} className="flex gap-2 items-center">
                    <FormField control={form.control} name={`objectives.${index}.value`} render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormControl>
                          <Input placeholder="e.g., Provide income support to farmers" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <Button type="button" variant="destructive" size="icon" onClick={() => removeObjective(index)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Application Process */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Application Process</CardTitle>
                <Button type="button" variant="outline" size="sm" onClick={() => appendApplication({ value: "" })}>
                  Add Step
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                {applicationFields.map((field, index) => (
                  <div key={field.id} className="flex gap-2 items-center">
                    <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm font-semibold flex-shrink-0">
                      {index + 1}
                    </div>
                    <FormField control={form.control} name={`howToApply.${index}.value`} render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormControl>
                          <Input placeholder="e.g., Visit the official portal and register" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <Button type="button" variant="destructive" size="icon" onClick={() => removeApplication(index)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}

                <FormField control={form.control} name="applicationLink" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Application Link</FormLabel>
                    <FormControl>
                      <Input placeholder="https://example.com/apply" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              </CardContent>
            </Card>

            {/* Required Documents */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Required Documents</CardTitle>
                <Button type="button" variant="outline" size="sm" onClick={() => appendDocument({ value: "" })}>
                  Add Document
                </Button>
              </CardHeader>
              <CardContent className="space-y-3">
                {documentFields.map((field, index) => (
                  <div key={field.id} className="flex gap-2 items-center">
                    <FormField control={form.control} name={`documents.${index}.value`} render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormControl>
                          <Input placeholder="e.g., Aadhaar Card" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <Button type="button" variant="destructive" size="icon" onClick={() => removeDocument(index)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Target Audience */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Target Audience</CardTitle>
                <Button type="button" variant="outline" size="sm" onClick={() => appendTarget({ value: "" })}>
                  Add Audience
                </Button>
              </CardHeader>
              <CardContent className="space-y-3">
                {targetFields.map((field, index) => (
                  <div key={field.id} className="flex gap-2 items-center">
                    <FormField control={form.control} name={`targetAudience.${index}.value`} render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormControl>
                          <Input placeholder="e.g., Small and marginal farmers" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <Button type="button" variant="destructive" size="icon" onClick={() => removeTarget(index)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Important Links */}
            <Card>
              <CardHeader><CardTitle>Important Links</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField control={form.control} name="links.officialWebsite" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Official Website</FormLabel>
                      <FormControl>
                        <Input placeholder="https://example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />

                  <FormField control={form.control} name="links.applicationPortal" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Application Portal</FormLabel>
                      <FormControl>
                        <Input placeholder="https://example.com/apply" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField control={form.control} name="links.guidelinesPDF" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Guidelines PDF</FormLabel>
                      <FormControl>
                        <Input placeholder="https://example.com/guidelines.pdf" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />

                  <FormField control={form.control} name="links.mobileApp" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mobile App</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Available on Play Store" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                </div>

                <FormField control={form.control} name="links.helpline" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Helpline Number</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., 155261" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              </CardContent>
            </Card>

            {/* Status Flags */}
            <Card>
              <CardHeader><CardTitle>Status Flags</CardTitle></CardHeader>
              <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <FormField control={form.control} name="status.isActive" render={({ field }) => (
                  <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                    <FormLabel>Active Scheme (Home Page Display)</FormLabel>
                  </FormItem>
                )} />
                <FormField control={form.control} name="status.isApplicationOpen" render={({ field }) => (
                  <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                    <FormLabel>Application Open</FormLabel>
                  </FormItem>
                )} />
                <FormField control={form.control} name="status.isPublished" render={({ field }) => (
                  <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                    <FormLabel>Published</FormLabel>
                  </FormItem>
                )} />
                <FormField control={form.control} name="status.isArchived" render={({ field }) => (
                  <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                    <FormLabel>Archived</FormLabel>
                  </FormItem>
                )} />
              </CardContent>
            </Card>

            {/* Extra Info - FAQs */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Frequently Asked Questions</CardTitle>
                <Button type="button" variant="outline" size="sm" onClick={() => appendFaq({ question: "", answer: "" })}>
                  Add FAQ
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                {faqFields.map((field, index) => (
                  <div key={field.id} className="p-4 border rounded-lg space-y-3">
                    <FormField control={form.control} name={`extraInfo.faqs.${index}.question`} render={({ field }) => (
                      <FormItem>
                        <FormLabel>Question</FormLabel>
                        <FormControl>
                          <Input placeholder="What is the eligibility criteria?" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={form.control} name={`extraInfo.faqs.${index}.answer`} render={({ field }) => (
                      <FormItem>
                        <FormLabel>Answer</FormLabel>
                        <FormControl>
                          <Textarea placeholder="The eligibility criteria includes..." className="min-h-[80px]" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <Button type="button" variant="destructive" size="sm" onClick={() => removeFaq(index)}>
                      Remove FAQ
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Social Links */}
            <Card>
              <CardHeader><CardTitle>Social Links</CardTitle></CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField control={form.control} name="socialLinks.twitter" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Twitter</FormLabel>
                    <FormControl>
                      <Input placeholder="https://x.com/..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="socialLinks.telegram" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Telegram</FormLabel>
                    <FormControl>
                      <Input placeholder="https://t.me/..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="socialLinks.facebook" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Facebook</FormLabel>
                    <FormControl>
                      <Input placeholder="https://facebook.com/..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              </CardContent>
            </Card>

            {/* Custom Fields */}
            {Object.keys(customFields).length > 0 && (
              <div className="p-4 border rounded-lg">
                <h4 className="font-semibold mb-2">Custom Fields</h4>
                <div className="space-y-2 text-sm">
                  {Object.entries(customFields).map(([key, value]) => (
                    <div key={key} className="flex justify-between">
                      <span className="font-medium">{key}:</span>
                      <span className="text-muted-foreground">{String(value)}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Processing..." : (defaultValues?.schemeId ? "Update Scheme" : "Create Scheme")}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}