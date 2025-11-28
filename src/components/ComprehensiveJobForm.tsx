import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
// Assuming the following components are available from a shadcn/ui setup or similar library
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
// This component is external and assumed to exist, so we keep the import
import { CustomFieldDialog } from "./CustomFieldDialog";
import { Trash2, Plus, X } from "lucide-react";

// Helper schema for optional numbers (coerces string/empty string to number/undefined)
const optionalNumberSchema = z.preprocess(
  (val) => (val === "" ? undefined : val),
  z.coerce.number().optional()
);

// --- Updated ZOD SCHEMA to match MongoDB schema ---
const jobSchema = z.object({
  jobId: z.string().min(1, "Job ID is required"),
  title: z.string().min(5, "Title must be at least 5 characters"),
  slug: z.string().optional(), // Will be auto-generated
  postDate: z.string().min(1, "Post date is required"),
  organization: z.string().min(3, "Organization name is required"),
  advertisementNo: z.string().optional(),
  category: z.enum(["State Govt", "Central Govt", "Defence", "Police", "Other"]),
  jobType: z.string().optional(),
  location: z.string().min(2, "Location required"),
  totalPosts: optionalNumberSchema,
  
  postDetails: z.array(z.object({
    postName: z.string().min(1, "Post name is required"),
    numberOfPosts: optionalNumberSchema,
    eligibility: z.string().optional(),
  })).optional(),

  eligibilityCriteria: z.object({
    education: z.string().min(3, "Education qualification is required"),
    ageLimit: z.object({
      min: optionalNumberSchema,
      max: optionalNumberSchema,
      referenceDate: z.string().optional(),
      additionalAgeRules: z.array(z.object({
        value: z.string().min(1, "Age rule cannot be empty")
      })).optional(),
      ageRelaxationRules: z.string().optional(),
    }).optional(),
    additionalCertifications: z.array(z.object({
      value: z.string().min(1, "Certification cannot be empty")
    })).optional(),
  }),

  eligibilityDetails: z.array(z.object({
    qualification: z.string().min(1, "Qualification is required"),
    minMarks: optionalNumberSchema,
    remark: z.string().optional(),
  })).optional(),

  importantDates: z.object({
    notificationDate: z.string().optional(),
    applicationStart: z.string().min(1, "Application start date required"),
    applicationEnd: z.string().min(1, "Application end date required"),
    feePaymentLastDate: z.string().optional(),
    correctionWindow: z.object({
      start: z.string().optional(),
      end: z.string().optional(),
    }).optional(),
    examDate: z.string().optional(),
    admitCardDate: z.string().optional(),
    answerKeyDate: z.string().optional(),
    resultDate: z.string().optional(),
    scoreCardDate: z.string().optional(),
    physicalTestDate: z.string().optional(),
    documentVerificationDate: z.string().optional(),
  }),

  applicationFee: z.object({
    general: optionalNumberSchema,
    obc: optionalNumberSchema,
    sc: optionalNumberSchema,
    st: optionalNumberSchema,
    ews: optionalNumberSchema,
    female: optionalNumberSchema,
    correctionCharge: optionalNumberSchema,
    paymentModes: z.array(z.object({
      value: z.string().min(1, "Payment mode cannot be empty")
    })).optional(),
  }),

  selectionProcess: z.array(z.object({
    value: z.string().min(1, "Selection step cannot be empty")
  })).optional(),

  links: z.object({
    // Using .or(z.literal('')) to allow empty string in the form but enforce URL validation if not empty
    officialWebsite: z.string().url("Must be a valid URL").optional().or(z.literal('')),
    applyOnline: z.string().url("Must be a valid URL").optional().or(z.literal('')),
    notificationPDF: z.string().url("Must be a valid URL").optional().or(z.literal('')),
    admitCard: z.string().url("Must be a valid URL").optional().or(z.literal('')),
    result: z.string().url("Must be a valid URL").optional().or(z.literal('')),
    answerKey: z.string().url("Must be a valid URL").optional().or(z.literal('')),
    scoreCard: z.string().url("Must be a valid URL").optional().or(z.literal('')),
    cutoff: z.string().url("Must be a valid URL").optional().or(z.literal('')),
    correctionLink: z.string().url("Must be a valid URL").optional().or(z.literal('')),
  }),

  status: z.object({
    isApplicationOpen: z.boolean().default(false),
    isAdmitCardAvailable: z.boolean().default(false),
    isAnswerKeyReleased: z.boolean().default(false),
    isResultDeclared: z.boolean().default(false),
    isCorrectionWindowOpen: z.boolean().default(false),
    isPublished: z.boolean().default(true),
    isArchived: z.boolean().default(false),
  }),

  extraInfo: z.object({
    documentsRequired: z.array(z.object({
      value: z.string().min(1, "Document cannot be empty")
    })).optional(),
    examPattern: z.array(z.object({
      value: z.string().min(1, "Exam pattern step cannot be empty")
    })).optional(),
    physicalStandards: z.object({
      height: z.object({ male: z.string().optional(), female: z.string().optional() }).optional(),
      chest: z.object({ male: z.string().optional() }).optional(),
      running: z.object({ male: z.string().optional(), female: z.string().optional() }).optional(),
    }).optional(),
    cutoffMarks: z.array(
      z.object({
        category: z.string().min(1, "Category required"),
        expected: z.string().min(1, "Expected marks required"),
      })
    ).optional(),
    faqs: z.array(
      z.object({
        question: z.string().min(1, "Question required"),
        answer: z.string().min(1, "Answer required"),
      })
    ).optional(),
    attachments: z.array(
      z.object({
        name: z.string().min(1, "Name required"),
        url: z.string().url("Must be a valid URL"),
        type: z.string().min(1, "Type required"),
      })
    ).optional(),
    totalCandidates: z.string().optional(),
    qualified: z.string().optional(),
  }).optional(),

  socialLinks: z.object({
    twitter: z.string().url("Must be a valid URL").optional().or(z.literal('')),
    telegram: z.string().url("Must be a valid URL").optional().or(z.literal('')),
    facebook: z.string().url("Must be a valid URL").optional().or(z.literal('')),
  }).optional(),
});

interface ComprehensiveJobFormProps {
  onSubmit: (data: z.infer<typeof jobSchema> & { customFields?: Record<string, any> }) => void;
  defaultValues?: Partial<z.infer<typeof jobSchema>>;
}

export function ComprehensiveJobForm({ onSubmit, defaultValues }: ComprehensiveJobFormProps) {
  const [customFields, setCustomFields] = useState<Record<string, any>>({});
  
  const form = useForm<z.infer<typeof jobSchema>>({
    resolver: zodResolver(jobSchema),
    // --- FIX: Changed all optional number fields from "" to undefined to match TypeScript typing (number | undefined) ---
    defaultValues: defaultValues || {
      jobId: "",
      title: "",
      slug: "",
      postDate: "",
      organization: "",
      advertisementNo: "",
      category: "Other",
      jobType: "",
      location: "",
      // FIX
      totalPosts: undefined, 
      postDetails: [],
      eligibilityCriteria: { 
        education: "", 
        ageLimit: { 
          // FIX
          min: undefined, 
          max: undefined, 
          referenceDate: "", 
          additionalAgeRules: [],
          ageRelaxationRules: "" 
        }, 
        additionalCertifications: []
      },
      eligibilityDetails: [],
      importantDates: { 
        notificationDate: "", 
        applicationStart: "", 
        applicationEnd: "", 
        feePaymentLastDate: "", 
        correctionWindow: { start: "", end: "" }, 
        examDate: "", 
        admitCardDate: "", 
        answerKeyDate: "", 
        resultDate: "", 
        scoreCardDate: "", 
        physicalTestDate: "", 
        documentVerificationDate: "" 
      },
      applicationFee: { 
        // FIX
        general: undefined, 
        obc: undefined, 
        sc: undefined, 
        st: undefined, 
        ews: undefined, 
        female: undefined, 
        correctionCharge: undefined, 
        paymentModes: []
      },
      selectionProcess: [],
      links: { 
        officialWebsite: "", 
        applyOnline: "", 
        notificationPDF: "", 
        admitCard: "", 
        result: "", 
        answerKey: "", 
        scoreCard: "", 
        cutoff: "", 
        correctionLink: "" 
      },
      status: { 
        isApplicationOpen: false, 
        isAdmitCardAvailable: false, 
        isAnswerKeyReleased: false, 
        isResultDeclared: false, 
        isCorrectionWindowOpen: false, 
        isPublished: true, 
        isArchived: false 
      },
      extraInfo: { 
        documentsRequired: [],
        examPattern: [],
        physicalStandards: { 
          height: { male: "", female: "" }, 
          chest: { male: "" }, 
          running: { male: "", female: "" } 
        }, 
        cutoffMarks: [], 
        faqs: [], 
        attachments: [],
        totalCandidates: "",
        qualified: "",
      },
      socialLinks: { twitter: "", telegram: "", facebook: "" },
    },
  });

  // --- Field Arrays ---
  const { fields: postFields, append: appendPost, remove: removePost } = useFieldArray({ control: form.control, name: "postDetails" });
  const { fields: eligFields, append: appendElig, remove: removeElig } = useFieldArray({ control: form.control, name: "eligibilityDetails" });
  const { fields: faqFields, append: appendFaq, remove: removeFaq } = useFieldArray({ control: form.control, name: "extraInfo.faqs" });
  const { fields: docFields, append: appendDoc, remove: removeDoc } = useFieldArray({ control: form.control, name: "extraInfo.documentsRequired" });
  const { fields: examFields, append: appendExam, remove: removeExam } = useFieldArray({ control: form.control, name: "extraInfo.examPattern" });
  const { fields: cutoffFields, append: appendCutoff, remove: removeCutoff } = useFieldArray({ control: form.control, name: "extraInfo.cutoffMarks" });
  const { fields: attachmentFields, append: appendAttachment, remove: removeAttachment } = useFieldArray({ control: form.control, name: "extraInfo.attachments" });
  const { fields: certFields, append: appendCert, remove: removeCert } = useFieldArray({ control: form.control, name: "eligibilityCriteria.additionalCertifications" });
  const { fields: selectionFields, append: appendSelection, remove: removeSelection } = useFieldArray({ control: form.control, name: "selectionProcess" });
  const { fields: paymentFields, append: appendPayment, remove: removePayment } = useFieldArray({ control: form.control, name: "applicationFee.paymentModes" });
  
  const { fields: ageRuleFields, append: appendAgeRule, remove: removeAgeRule } = useFieldArray({ 
    control: form.control, 
    name: "eligibilityCriteria.ageLimit.additionalAgeRules" 
  });


  const handleAddCustomField = (field: { name: string; type: string; value: string }) => {
    setCustomFields({ ...customFields, [field.name]: field.value });
  };

const [isSubmitting, setIsSubmitting] = useState(false);

const handleSubmit = async (data: z.infer<typeof jobSchema>) => {
  setIsSubmitting(true);
  try {
    await onSubmit({ ...data, customFields });
  } catch (error) {
    console.error("Form submission error:", error);
    // Error is handled by parent component
  } finally {
    setIsSubmitting(false);
  }
};

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Post New Job (Comprehensive)</CardTitle>
            <CardDescription>Add a job with all detailed fields from the schema</CardDescription>
          </div>
          {/* Note: CustomFieldDialog needs to be defined if you want to use it */}
          <CustomFieldDialog onAddField={handleAddCustomField} /> 
        </div>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            
            {/* --- Basic Job Identity --- */}
            <Card>
              <CardHeader><CardTitle>Basic Job Identity</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <FormField control={form.control} name="jobId" render={({ field }) => (
  <FormItem>
    <FormLabel>Job ID *</FormLabel>
    <FormControl>
      <Input placeholder="e.g., UPSC-CSE-2025" {...field} />
    </FormControl>
    <FormMessage />
  </FormItem>
)} />
                  <FormField control={form.control} name="title" render={({ field }) => (
                    <FormItem className="md:col-span-2"><FormLabel>Job Title *</FormLabel><FormControl><Input placeholder="e.g., UPSC Civil Services Examination 2025" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <FormField control={form.control} name="organization" render={({ field }) => (
                    <FormItem><FormLabel>Organization *</FormLabel><FormControl><Input placeholder="e.g., Union Public Service Commission" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="postDate" render={({ field }) => (
                    <FormItem><FormLabel>Post Date *</FormLabel><FormControl><Input type="date" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="advertisementNo" render={({ field }) => (
                    <FormItem><FormLabel>Advertisement No.</FormLabel><FormControl><Input placeholder="e.g., 11/2025-26" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <FormField control={form.control} name="category" render={({ field }) => (
                    <FormItem><FormLabel>Category *</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger></FormControl><SelectContent><SelectItem value="Central Govt">Central Government</SelectItem><SelectItem value="State Govt">State Government</SelectItem><SelectItem value="Defence">Defence</SelectItem><SelectItem value="Police">Police</SelectItem><SelectItem value="Other">Other</SelectItem></SelectContent></Select><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="jobType" render={({ field }) => (
                    <FormItem><FormLabel>Job Type</FormLabel><FormControl><Input placeholder="e.g., Recruitment, Admit Card" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="location" render={({ field }) => (
                    <FormItem><FormLabel>Location *</FormLabel><FormControl><Input placeholder="e.g., All India" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                </div>
              </CardContent>
            </Card>
            
            {/* --- Post Details --- */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Post & Eligibility Details</CardTitle>
                <Button type="button" variant="outline" size="sm" onClick={() => appendPost({ postName: "", numberOfPosts: undefined, eligibility: "" })}>
                  <Plus className="h-4 w-4 mr-2" /> Add Post
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField control={form.control} name="totalPosts" render={({ field }) => (
                  <FormItem><FormLabel>Total Posts</FormLabel><FormControl><Input type="number" placeholder="e.g., 979" {...field} value={field.value ?? ""} /></FormControl><FormMessage /></FormItem>
                )} />
                
                {postFields.map((field, index) => (
                  <div key={field.id} className="grid grid-cols-1 md:grid-cols-8 gap-2 p-2 border rounded-lg">
                    <FormField control={form.control} name={`postDetails.${index}.postName`} render={({ field }) => (
                      <FormItem className="md:col-span-3"><FormLabel>Post Name</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name={`postDetails.${index}.numberOfPosts`} render={({ field }) => (
                      <FormItem className="md:col-span-1"><FormLabel># Posts</FormLabel><FormControl><Input type="number" {...field} value={field.value ?? ""} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name={`postDetails.${index}.eligibility`} render={({ field }) => (
                      <FormItem className="md:col-span-3"><FormLabel>Eligibility</FormLabel><FormControl><Textarea className="min-h-[40px]" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormItem className="md:col-span-1 flex items-end">
                      <Button type="button" variant="destructive" size="icon" onClick={() => removePost(index)}><Trash2 className="h-4 w-4" /></Button>
                    </FormItem>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* --- Eligibility Criteria --- */}
            <Card>
              <CardHeader><CardTitle>Eligibility Criteria</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <FormField control={form.control} name="eligibilityCriteria.education" render={({ field }) => (
                  <FormItem><FormLabel>Educational Qualification *</FormLabel><FormControl><Textarea placeholder="e.g., Bachelor's Degree in any discipline..." className="min-h-[100px]" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                
                {/* Age Limit Section */}
                <div className="space-y-4 p-4 border rounded-lg">
                  <h3 className="text-lg font-semibold">Age Limit Criteria</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <FormField control={form.control} name="eligibilityCriteria.ageLimit.min" render={({ field }) => (
                      <FormItem><FormLabel>Minimum Age</FormLabel><FormControl><Input type="number" placeholder="e.g., 18" {...field} value={field.value ?? ""} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="eligibilityCriteria.ageLimit.max" render={({ field }) => (
                      <FormItem><FormLabel>Maximum Age</FormLabel><FormControl><Input type="number" placeholder="e.g., 32" {...field} value={field.value ?? ""} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="eligibilityCriteria.ageLimit.referenceDate" render={({ field }) => (
                      <FormItem><FormLabel>Reference Date</FormLabel><FormControl><Input type="date" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                  </div>

                  {/* Additional Age Rules Section now uses useFieldArray */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <FormLabel>Additional Age Rules</FormLabel>
                      <Button 
                        type="button" 
                        onClick={() => appendAgeRule({ value: "" })} 
                        size="sm" 
                        variant="outline"
                        className="flex items-center gap-1"
                      >
                        <Plus className="h-4 w-4" />
                        Add Rule
                      </Button>
                    </div>
                    
                    {ageRuleFields.map((field, index) => (
                      <div key={field.id} className="flex gap-2 items-start">
                        <FormField
                          control={form.control}
                          name={`eligibilityCriteria.ageLimit.additionalAgeRules.${index}.value`}
                          render={({ field }) => (
                            <FormItem className="flex-1">
                              <FormControl>
                                <Input
                                  {...field}
                                  placeholder="e.g., Age relaxation for SC/ST: 5 years"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          onClick={() => removeAgeRule(index)}
                          className="shrink-0 mt-7"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                    
                    {ageRuleFields.length === 0 && (
                      <p className="text-sm text-muted-foreground">No additional age rules added yet.</p>
                    )}
                  </div>

                  <FormField control={form.control} name="eligibilityCriteria.ageLimit.ageRelaxationRules" render={({ field }) => (
                    <FormItem><FormLabel>Age Relaxation Rules</FormLabel><FormControl><Textarea placeholder="e.g., As per government rules for reserved categories" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                </div>

                {/* Additional Certifications */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <FormLabel>Additional Certifications</FormLabel>
                    <Button type="button" variant="outline" size="sm" onClick={() => appendCert({ value: "" })}>Add Certification</Button>
                  </div>
                  {certFields.map((field, index) => (
                    <div key={field.id} className="flex gap-2 items-center mb-2">
                      <FormField control={form.control} name={`eligibilityCriteria.additionalCertifications.${index}.value`} render={({ field }) => (
                        <FormItem className="flex-1"><FormControl><Input placeholder="e.g., CCC, O-Level" {...field} /></FormControl><FormMessage /></FormItem>
                      )} />
                      <Button type="button" variant="destructive" size="icon" onClick={() => removeCert(index)}><Trash2 className="h-4 w-4" /></Button>
                    </div>
                  ))}
                </div>

                {/* Eligibility Details Field Array */}
                <div className="pt-4">
                  <div className="flex items-center justify-between mb-2">
                    <FormLabel>Specific Eligibility Details</FormLabel>
                    <Button type="button" variant="outline" size="sm" onClick={() => appendElig({ qualification: "", minMarks: undefined, remark: "" })}>Add Detail</Button>
                  </div>
                  {eligFields.map((field, index) => (
                    <div key={field.id} className="grid grid-cols-1 md:grid-cols-8 gap-2 p-2 border rounded-lg mb-2">
                      <FormField control={form.control} name={`eligibilityDetails.${index}.qualification`} render={({ field }) => (
                        <FormItem className="md:col-span-3"><FormLabel>Qualification</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                      )} />
                      <FormField control={form.control} name={`eligibilityDetails.${index}.minMarks`} render={({ field }) => (
                        <FormItem className="md:col-span-1"><FormLabel>Min. Marks</FormLabel><FormControl><Input type="number" {...field} value={field.value ?? ""} /></FormControl><FormMessage /></FormItem>
                      )} />
                      <FormField control={form.control} name={`eligibilityDetails.${index}.remark`} render={({ field }) => (
                        <FormItem className="md:col-span-3"><FormLabel>Remark</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                      )} />
                      <FormItem className="md:col-span-1 flex items-end">
                        <Button type="button" variant="destructive" size="icon" onClick={() => removeElig(index)}><Trash2 className="h-4 w-4" /></Button>
                      </FormItem>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* --- Important Dates --- */}
            <Card>
              <CardHeader><CardTitle>Important Dates</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <FormField control={form.control} name="importantDates.notificationDate" render={({ field }) => (
                    <FormItem><FormLabel>Notification Date</FormLabel><FormControl><Input type="date" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="importantDates.applicationStart" render={({ field }) => (
                    <FormItem><FormLabel>Application Start *</FormLabel><FormControl><Input type="date" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="importantDates.applicationEnd" render={({ field }) => (
                    <FormItem><FormLabel>Application End *</FormLabel><FormControl><Input type="date" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <FormField control={form.control} name="importantDates.feePaymentLastDate" render={({ field }) => (
                    <FormItem><FormLabel>Fee Payment Last Date</FormLabel><FormControl><Input type="date" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="importantDates.correctionWindow.start" render={({ field }) => (
                    <FormItem><FormLabel>Correction Start</FormLabel><FormControl><Input type="date" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="importantDates.correctionWindow.end" render={({ field }) => (
                    <FormItem><FormLabel>Correction End</FormLabel><FormControl><Input type="date" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <FormField control={form.control} name="importantDates.examDate" render={({ field }) => (
                    <FormItem><FormLabel>Exam Date</FormLabel><FormControl><Input placeholder="e.g., 25 May 2025 or TBA" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="importantDates.admitCardDate" render={({ field }) => (
                    <FormItem><FormLabel>Admit Card Date</FormLabel><FormControl><Input type="date" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="importantDates.answerKeyDate" render={({ field }) => (
                    <FormItem><FormLabel>Answer Key Date</FormLabel><FormControl><Input type="date" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <FormField control={form.control} name="importantDates.resultDate" render={({ field }) => (
                    <FormItem><FormLabel>Result Date</FormLabel><FormControl><Input type="date" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="importantDates.scoreCardDate" render={({ field }) => (
                    <FormItem><FormLabel>Score Card Date</FormLabel><FormControl><Input type="date" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="importantDates.physicalTestDate" render={({ field }) => (
                    <FormItem><FormLabel>Physical Test Date</FormLabel><FormControl><Input placeholder="e.g., June 2025" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                </div>
                <FormField control={form.control} name="importantDates.documentVerificationDate" render={({ field }) => (
                  <FormItem><FormLabel>DV Date</FormLabel><FormControl><Input placeholder="e.g., July 2025" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
              </CardContent>
            </Card>

            {/* --- Application Fee --- */}
            <Card>
              <CardHeader><CardTitle>Application Fee</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <FormField control={form.control} name="applicationFee.general" render={({ field }) => (
                    // FIX: Use value={field.value ?? ""} to handle undefined and suppress the warning
                    <FormItem><FormLabel>General</FormLabel><FormControl><Input type="number" placeholder="e.g., 100" {...field} value={field.value ?? ""} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="applicationFee.obc" render={({ field }) => (
                    <FormItem><FormLabel>OBC</FormLabel><FormControl><Input type="number" placeholder="e.g., 100" {...field} value={field.value ?? ""} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="applicationFee.ews" render={({ field }) => (
                    <FormItem><FormLabel>EWS</FormLabel><FormControl><Input type="number" placeholder="e.g., 100" {...field} value={field.value ?? ""} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="applicationFee.female" render={({ field }) => (
                    <FormItem><FormLabel>Female</FormLabel><FormControl><Input type="number" placeholder="e.g., 0" {...field} value={field.value ?? ""} /></FormControl><FormMessage /></FormItem>
                  )} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <FormField control={form.control} name="applicationFee.sc" render={({ field }) => (
                    <FormItem><FormLabel>SC</FormLabel><FormControl><Input type="number" placeholder="e.g., 0" {...field} value={field.value ?? ""} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="applicationFee.st" render={({ field }) => (
                    <FormItem><FormLabel>ST</FormLabel><FormControl><Input type="number" placeholder="e.g., 0" {...field} value={field.value ?? ""} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="applicationFee.correctionCharge" render={({ field }) => (
                    <FormItem><FormLabel>Correction Charge</FormLabel><FormControl><Input type="number" placeholder="e.g., 200" {...field} value={field.value ?? ""} /></FormControl><FormMessage /></FormItem>
                  )} />
                </div>

                {/* Payment Modes */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <FormLabel>Payment Modes</FormLabel>
                    <Button type="button" variant="outline" size="sm" onClick={() => appendPayment({ value: "" })}>Add Payment Mode</Button>
                  </div>
                  {paymentFields.map((field, index) => (
                    <div key={field.id} className="flex gap-2 items-center mb-2">
                      <FormField control={form.control} name={`applicationFee.paymentModes.${index}.value`} render={({ field }) => (
                        <FormItem className="flex-1"><FormControl><Input placeholder="e.g., Debit Card, Credit Card" {...field} /></FormControl><FormMessage /></FormItem>
                      )} />
                      <Button type="button" variant="destructive" size="icon" onClick={() => removePayment(index)}><Trash2 className="h-4 w-4" /></Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* --- Selection Process --- */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Selection Process</CardTitle>
                <Button type="button" variant="outline" size="sm" onClick={() => appendSelection({ value: "" })}>Add Step</Button>
              </CardHeader>
              <CardContent className="space-y-3">
                {selectionFields.map((field, index) => (
                  <div key={field.id} className="flex gap-2 items-center">
                    <FormField control={form.control} name={`selectionProcess.${index}.value`} render={({ field }) => (
                      <FormItem className="flex-1"><FormControl><Input placeholder="e.g., Written Exam, Physical Test" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <Button type="button" variant="destructive" size="icon" onClick={() => removeSelection(index)}><Trash2 className="h-4 w-4" /></Button>
                  </div>
                ))}
              </CardContent>
            </Card>
            
            {/* --- Links --- */}
            <Card>
              <CardHeader><CardTitle>Links</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField control={form.control} name="links.officialWebsite" render={({ field }) => (
                    <FormItem><FormLabel>Official Website</FormLabel><FormControl><Input placeholder="https://example.com" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="links.applyOnline" render={({ field }) => (
                    <FormItem><FormLabel>Apply Online</FormLabel><FormControl><Input placeholder="https://example.com/apply" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField control={form.control} name="links.notificationPDF" render={({ field }) => (
                    <FormItem><FormLabel>Notification PDF</FormLabel><FormControl><Input placeholder="https://example.com/notification.pdf" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="links.admitCard" render={({ field }) => (
                    <FormItem><FormLabel>Admit Card Link</FormLabel><FormControl><Input placeholder="https://example.com/admitcard" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField control={form.control} name="links.result" render={({ field }) => (
                    <FormItem><FormLabel>Result Link</FormLabel><FormControl><Input placeholder="https://example.com/result" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="links.answerKey" render={({ field }) => (
                    <FormItem><FormLabel>Answer Key Link</FormLabel><FormControl><Input placeholder="https://example.com/answerkey" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField control={form.control} name="links.scoreCard" render={({ field }) => (
                    <FormItem><FormLabel>Score Card Link</FormLabel><FormControl><Input placeholder="https://example.com/scorecard" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="links.cutoff" render={({ field }) => (
                    <FormItem><FormLabel>Cutoff Link</FormLabel><FormControl><Input placeholder="https://example.com/cutoff" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                </div>
                <FormField control={form.control} name="links.correctionLink" render={({ field }) => (
                  <FormItem><FormLabel>Correction Link</FormLabel><FormControl><Input placeholder="https://example.com/correction" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
              </CardContent>
            </Card>

            {/* --- Status Flags --- */}
            <Card>
              <CardHeader><CardTitle>Status Flags</CardTitle></CardHeader>
              <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <FormField control={form.control} name="status.isApplicationOpen" render={({ field }) => (
                  <FormItem className="flex flex-row items-center space-x-3 space-y-0"><FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} /></FormControl><FormLabel>Application Open</FormLabel></FormItem>
                )} />
                <FormField control={form.control} name="status.isAdmitCardAvailable" render={({ field }) => (
                  <FormItem className="flex flex-row items-center space-x-3 space-y-0"><FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} /></FormControl><FormLabel>Admit Card Out</FormLabel></FormItem>
                )} />
                <FormField control={form.control} name="status.isAnswerKeyReleased" render={({ field }) => (
                  <FormItem className="flex flex-row items-center space-x-3 space-y-0"><FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} /></FormControl><FormLabel>Answer Key Out</FormLabel></FormItem>
                )} />
                <FormField control={form.control} name="status.isResultDeclared" render={({ field }) => (
                  <FormItem className="flex flex-row items-center space-x-3 space-y-0"><FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} /></FormControl><FormLabel>Result Declared</FormLabel></FormItem>
                )} />
                <FormField control={form.control} name="status.isCorrectionWindowOpen" render={({ field }) => (
                  <FormItem className="flex flex-row items-center space-x-3 space-y-0"><FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} /></FormControl><FormLabel>Correction Open</FormLabel></FormItem>
                )} />
                <FormField control={form.control} name="status.isPublished" render={({ field }) => (
                  <FormItem className="flex flex-row items-center space-x-3 space-y-0"><FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} /></FormControl><FormLabel>Published</FormLabel></FormItem>
                )} />
                <FormField control={form.control} name="status.isArchived" render={({ field }) => (
                  <FormItem className="flex flex-row items-center space-x-3 space-y-0"><FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} /></FormControl><FormLabel>Archived</FormLabel></FormItem>
                )} />
              </CardContent>
            </Card>

            {/* --- Extra Info --- */}
            <Card>
              <CardHeader><CardTitle>Extra Info</CardTitle></CardHeader>
              <CardContent className="space-y-4">

                {/* Documents Required */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <FormLabel>Documents Required</FormLabel>
                    <Button type="button" variant="outline" size="sm" onClick={() => appendDoc({ value: "" })}>Add Document</Button>
                  </div>
                  {docFields.map((field, index) => (
                    <div key={field.id} className="flex gap-2 items-center mb-2">
                      <FormField control={form.control} name={`extraInfo.documentsRequired.${index}.value`} render={({ field }) => (
                        <FormItem className="flex-1"><FormControl><Input placeholder="e.g., Photo" {...field} /></FormControl><FormMessage /></FormItem>
                      )} />
                      <Button type="button" variant="destructive" size="icon" onClick={() => removeDoc(index)}><Trash2 className="h-4 w-4" /></Button>
                    </div>
                  ))}
                </div>

                {/* Exam Pattern */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <FormLabel>Exam Pattern</FormLabel>
                    <Button type="button" variant="outline" size="sm" onClick={() => appendExam({ value: "" })}>Add Stage</Button>
                  </div>
                  {examFields.map((field, index) => (
                    <div key={field.id} className="flex gap-2 items-center mb-2">
                      <FormField control={form.control} name={`extraInfo.examPattern.${index}.value`} render={({ field }) => (
                        <FormItem className="flex-1"><FormControl><Input placeholder="e.g., Written Test" {...field} /></FormControl><FormMessage /></FormItem>
                      )} />
                      <Button type="button" variant="destructive" size="icon" onClick={() => removeExam(index)}><Trash2 className="h-4 w-4" /></Button>
                    </div>
                  ))}
                </div>

                {/* Physical Standards */}
                <Card className="p-4 border rounded-lg">
                  <CardTitle className="mb-2 text-sm font-medium">Physical Standards</CardTitle>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <FormField control={form.control} name="extraInfo.physicalStandards.height.male" render={({ field }) => (
                      <FormItem><FormLabel>Height Male</FormLabel><FormControl><Input placeholder="e.g., 170 cm" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="extraInfo.physicalStandards.height.female" render={({ field }) => (
                      <FormItem><FormLabel>Height Female</FormLabel><FormControl><Input placeholder="e.g., 160 cm" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="extraInfo.physicalStandards.chest.male" render={({ field }) => (
                      <FormItem><FormLabel>Chest Male</FormLabel><FormControl><Input placeholder="e.g., 80-85 cm" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="extraInfo.physicalStandards.running.male" render={({ field }) => (
                      <FormItem><FormLabel>Running Male</FormLabel><FormControl><Input placeholder="e.g., 1000m in 5 min" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="extraInfo.physicalStandards.running.female" render={({ field }) => (
                      <FormItem><FormLabel>Running Female</FormLabel><FormControl><Input placeholder="e.g., 800m in 5 min" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                  </div>
                </Card>

                {/* Total Candidates and Qualified Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  <FormField control={form.control} name="extraInfo.totalCandidates" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Total Candidates (for Results)</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="e.g., 17,85,453" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="extraInfo.qualified" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Qualified Candidates (for Results)</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="e.g., 2,35,678" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                </div>

                {/* Cutoff Marks */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <FormLabel>Cutoff Marks</FormLabel>
                    <Button type="button" variant="outline" size="sm" onClick={() => appendCutoff({ category: "", expected: "" })}>Add Cutoff</Button>
                  </div>
                  {cutoffFields.map((field, index) => (
                    <div key={field.id} className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-2">
                      <FormField control={form.control} name={`extraInfo.cutoffMarks.${index}.category`} render={({ field }) => (
                        <FormItem><FormLabel>Category</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                      )} />
                      <FormField control={form.control} name={`extraInfo.cutoffMarks.${index}.expected`} render={({ field }) => (
                        <FormItem><FormLabel>Expected</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                      )} />
                      <Button type="button" variant="destructive" size="icon" className="self-end" onClick={() => removeCutoff(index)}><Trash2 className="h-4 w-4" /></Button>
                    </div>
                  ))}
                </div>

                {/* FAQs */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <FormLabel>FAQs</FormLabel>
                    <Button type="button" variant="outline" size="sm" onClick={() => appendFaq({ question: "", answer: "" })}>Add FAQ</Button>
                  </div>
                  {faqFields.map((field, index) => (
                    <div key={field.id} className="p-2 border rounded-lg mb-2 space-y-2">
                      <FormField control={form.control} name={`extraInfo.faqs.${index}.question`} render={({ field }) => (
                        <FormItem><FormLabel>Question</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                      )} />
                      <FormField control={form.control} name={`extraInfo.faqs.${index}.answer`} render={({ field }) => (
                        <FormItem><FormLabel>Answer</FormLabel><FormControl><Textarea className="min-h-[60px]" {...field} /></FormControl><FormMessage /></FormItem>
                      )} />
                      <Button type="button" variant="destructive" size="sm" onClick={() => removeFaq(index)}>Remove FAQ</Button>
                    </div>
                  ))}
                </div>

                {/* Attachments */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <FormLabel>Attachments</FormLabel>
                    <Button type="button" variant="outline" size="sm" onClick={() => appendAttachment({ name: "", url: "", type: "" })}>Add Attachment</Button>
                  </div>
                  {attachmentFields.map((field, index) => (
                    <div key={field.id} className="grid grid-cols-1 md:grid-cols-6 gap-2 mb-2 items-end">
                      <FormField control={form.control} name={`extraInfo.attachments.${index}.name`} render={({ field }) => (
                        <FormItem><FormLabel>Name</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                      )} />
                      <FormField control={form.control} name={`extraInfo.attachments.${index}.url`} render={({ field }) => (
                        <FormItem className="md:col-span-2"><FormLabel>URL</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                      )} />
                      <FormField control={form.control} name={`extraInfo.attachments.${index}.type`} render={({ field }) => (
                        <FormItem className="md:col-span-2"><FormLabel>Type</FormLabel><FormControl><Input placeholder="e.g., Syllabus PDF" {...field} /></FormControl><FormMessage /></FormItem>
                      )} />
                      <Button type="button" variant="destructive" size="icon" className="self-end" onClick={() => removeAttachment(index)}><Trash2 className="h-4 w-4" /></Button>
                    </div>
                  ))}
                </div>

              </CardContent>
            </Card>

            {/* --- Social Links --- */}
            <Card>
              <CardHeader><CardTitle>Social Links</CardTitle></CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField control={form.control} name="socialLinks.twitter" render={({ field }) => (
                  <FormItem><FormLabel>Twitter</FormLabel><FormControl><Input placeholder="https://x.com/..." {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="socialLinks.telegram" render={({ field }) => (
                  <FormItem><FormLabel>Telegram</FormLabel><FormControl><Input placeholder="https://t.me/..." {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="socialLinks.facebook" render={({ field }) => (
                  <FormItem><FormLabel>Facebook</FormLabel><FormControl><Input placeholder="https://facebook.com/..." {...field} /></FormControl><FormMessage /></FormItem>
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
              {isSubmitting ? "Processing..." : (defaultValues?.jobId ? "Update Job" : "Post Job")}
           </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}