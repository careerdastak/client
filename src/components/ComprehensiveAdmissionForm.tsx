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
import { Trash2 } from "lucide-react";

// --- NEW ZOD SCHEMA ---
// This schema matches the structure of your Mongoose backend
const admissionSchema = z.object({
  // Basic Identity
  admissionId: z.string().min(1, "Admission ID is required"),
  title: z.string().min(5, "Title must be at least 5 characters"),
  postDate: z.string().min(1, "Post date is required"),
  organization: z.string().min(3, "Organization name is required"),
  examName: z.string().optional(),
  session: z.string().optional(),
  category: z.enum(["Engineering Entrance", "Teaching Entrance", "Polytechnic Entrance", "Medical Entrance", "Other"]),
  admissionType: z.enum(["Online Form", "Admit Card", "Result", "Answer Key", "Counselling"]),

  // Program / Course Details
  totalSeats: z.coerce.number().optional().or(z.literal('')),
  courseDetails: z.array(z.object({
    courseName: z.string().optional(),
    duration: z.string().optional(),
    eligibility: z.string().optional(),
    groupCode: z.string().optional(),
    qualificationRequired: z.string().optional(),
  })).optional(),

  // Eligibility & Qualification
  eligibilityCriteria: z.object({
    education: z.string().min(5, "Educational eligibility required"),
    ageLimit: z.object({
      min: z.coerce.number().optional().or(z.literal('')),
      max: z.coerce.number().optional().or(z.literal('')),
      referenceDate: z.string().optional(),
      relaxationDetails: z.string().optional(),
    }).optional(),
    additionalRequirements: z.string().optional(), // Comma-separated
  }),

  // Important Dates
  importantDates: z.object({
    notificationDate: z.string().optional(),
    applicationStart: z.string().min(1, "Application start date required"),
    applicationEnd: z.string().min(1, "Application end date required"),
    feePaymentLastDate: z.string().optional(),
    correctionWindow: z.object({
      start: z.string().optional(),
      end: z.string().optional(),
    }).optional(),
    examCityDate: z.string().optional(),
    examDate: z.string().optional(),
    admitCardDate: z.string().optional(),
    answerKeyDate: z.string().optional(),
    resultDate: z.string().optional(),
    counsellingDate: z.string().optional(),
  }),

  // Application Fee
  applicationFee: z.object({
    general: z.coerce.number().optional().or(z.literal('')),
    obc: z.coerce.number().optional().or(z.literal('')),
    ews: z.coerce.number().optional().or(z.literal('')),
    sc: z.coerce.number().optional().or(z.literal('')),
    st: z.coerce.number().optional().or(z.literal('')),
    pwd: z.coerce.number().optional().or(z.literal('')),
    female: z.coerce.number().optional().or(z.literal('')),
    bothPapers: z.coerce.number().optional().or(z.literal('')),
    paymentModes: z.string().optional(), // Comma-separated
  }),

  // Admission / Exam Process
  process: z.object({
    mode: z.string().optional(),
    selectionSteps: z.string().optional(), // Comma-separated
  }).optional(),

  // Links
  links: z.object({
    officialWebsite: z.string().url("Must be a valid URL").optional().or(z.literal('')),
    applyOnline: z.string().url("Must be a valid URL").optional().or(z.literal('')),
    notificationPDF: z.string().url("Must be a valid URL").optional().or(z.literal('')),
    informationBulletin: z.string().url("Must be a valid URL").optional().or(z.literal('')),
    admitCard: z.string().url("Must be a valid URL").optional().or(z.literal('')),
    answerKey: z.string().url("Must be a valid URL").optional().or(z.literal('')),
    result: z.string().url("Must be a valid URL").optional().or(z.literal('')),
    scoreCard: z.string().url("Must be a valid URL").optional().or(z.literal('')),
    counsellingPortal: z.string().url("Must be a valid URL").optional().or(z.literal('')),
    correctionLink: z.string().url("Must be a valid URL").optional().or(z.literal('')),
  }),

  // Status Flags
  status: z.object({
    isApplicationOpen: z.boolean().default(false),
    isCorrectionWindowOpen: z.boolean().default(false),
    isAdmitCardAvailable: z.boolean().default(false),
    isAnswerKeyReleased: z.boolean().default(false),
    isResultDeclared: z.boolean().default(false),
    isCounsellingActive: z.boolean().default(false),
    isPublished: z.boolean().default(false),
  }),

  // Extended Info
  extraInfo: z.object({
    documentsRequired: z.string().optional(), // Comma-separated
    syllabusTopics: z.string().optional(), // Comma-separated
    examPattern: z.string().optional(), // Comma-separated
    helpdesk: z.object({
      phone: z.string().optional(),
      email: z.string().email("Must be a valid email").optional().or(z.literal('')),
    }).optional(),
    counselingDetails: z.object({
      registrationFee: z.coerce.number().optional().or(z.literal('')),
      seatAcceptanceFee: z.coerce.number().optional().or(z.literal('')),
      steps: z.string().optional(), // Comma-separated
    }).optional(),
    cutoffMarks: z.array(z.object({
      category: z.string().optional(),
      expected: z.string().optional(),
    })).optional(),
    faqs: z.array(z.object({
      question: z.string().min(1, "Question is required"),
      answer: z.string().min(1, "Answer is required"),
    })).optional(),
    totalCandidates: z.string().optional(),
    qualified: z.string().optional(),
  }).optional(),
});


interface ComprehensiveAdmissionFormProps {
  onSubmit: (data: z.infer<typeof admissionSchema> & { customFields?: Record<string, any> }) => void;
  defaultValues?: Partial<z.infer<typeof admissionSchema>>;
}

export function ComprehensiveAdmissionForm({ onSubmit, defaultValues }: ComprehensiveAdmissionFormProps) {
  const [customFields, setCustomFields] = useState<Record<string, any>>({});

  const form = useForm<z.infer<typeof admissionSchema>>({
    resolver: zodResolver(admissionSchema),
    defaultValues: defaultValues || {
      admissionId: "",
      title: "",
      postDate: "",
      organization: "",
      examName: "",
      session: "",
      category: "Other",
      admissionType: "Online Form",
      totalSeats: "",
      courseDetails: [],
      eligibilityCriteria: {
        education: "",
        ageLimit: { min: "", max: "", referenceDate: "", relaxationDetails: "" },
        additionalRequirements: "",
      },
      importantDates: {
        notificationDate: "",
        applicationStart: "",
        applicationEnd: "",
        feePaymentLastDate: "",
        correctionWindow: { start: "", end: "" },
        examCityDate: "",
        examDate: "",
        admitCardDate: "",
        answerKeyDate: "",
        resultDate: "",
        counsellingDate: "",
      },
      applicationFee: {
        general: "",
        obc: "",
        ews: "",
        sc: "",
        st: "",
        pwd: "",
        female: "",
        bothPapers: "",
        paymentModes: "",
      },
      process: {
        mode: "",
        selectionSteps: "",
      },
      links: {
        officialWebsite: "",
        applyOnline: "",
        notificationPDF: "",
        informationBulletin: "",
        admitCard: "",
        answerKey: "",
        result: "",
        scoreCard: "",
        counsellingPortal: "",
        correctionLink: "",
      },
      status: {
        isApplicationOpen: false,
        isCorrectionWindowOpen: false,
        isAdmitCardAvailable: false,
        isAnswerKeyReleased: false,
        isResultDeclared: false,
        isCounsellingActive: false,
        isPublished: false,
      },
      extraInfo: {
        documentsRequired: "",
        syllabusTopics: "",
        examPattern: "",
        helpdesk: { phone: "", email: "" },
        counselingDetails: { registrationFee: "", seatAcceptanceFee: "", steps: "" },
        cutoffMarks: [],
        faqs: [],
        totalCandidates: "",
        qualified: "",
      },
    },
  });

  const { fields: courseFields, append: appendCourse, remove: removeCourse } = useFieldArray({
    control: form.control,
    name: "courseDetails",
  });

  const { fields: cutoffFields, append: appendCutoff, remove: removeCutoff } = useFieldArray({
    control: form.control,
    name: "extraInfo.cutoffMarks",
  });

  const { fields: faqFields, append: appendFaq, remove: removeFaq } = useFieldArray({
    control: form.control,
    name: "extraInfo.faqs",
  });

  const handleAddCustomField = (field: { name: string; type: string; value: string }) => {
    setCustomFields({ ...customFields, [field.name]: field.value });
  };

  const handleSubmit = (data: z.infer<typeof admissionSchema>) => {
    onSubmit({ ...data, customFields });
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Post New Admission (Comprehensive)</CardTitle>
            <CardDescription>Add an admission with all detailed fields from the schema</CardDescription>
          </div>
          <CustomFieldDialog onAddField={handleAddCustomField} />
        </div>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            
            {/* --- Basic Admission Identity --- */}
            <Card>
              <CardHeader><CardTitle>Basic Admission Identity</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <FormField control={form.control} name="admissionId" render={({ field }) => (
                    <FormItem><FormLabel>Admission ID *</FormLabel><FormControl><Input placeholder="e.g., NTA_JEE_MAIN_2026_S1" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="title" render={({ field }) => (
                    <FormItem className="md:col-span-2"><FormLabel>Admission Title *</FormLabel><FormControl><Input placeholder="e.g., NTA JEE Main 2026 Session-I Online Form" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <FormField control={form.control} name="organization" render={({ field }) => (
                    <FormItem><FormLabel>Organization *</FormLabel><FormControl><Input placeholder="e.g., NTA" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="examName" render={({ field }) => (
                    <FormItem><FormLabel>Exam Name</FormLabel><FormControl><Input placeholder="e.g., JEE Main" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="postDate" render={({ field }) => (
                    <FormItem><FormLabel>Post Date *</FormLabel><FormControl><Input type="date" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <FormField control={form.control} name="session" render={({ field }) => (
                    <FormItem><FormLabel>Session</FormLabel><FormControl><Input placeholder="e.g., Session-I (Jan 2026)" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="category" render={({ field }) => (
                    <FormItem><FormLabel>Category *</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger></FormControl><SelectContent><SelectItem value="Engineering Entrance">Engineering Entrance</SelectItem><SelectItem value="Medical Entrance">Medical Entrance</SelectItem><SelectItem value="Teaching Entrance">Teaching Entrance</SelectItem><SelectItem value="Polytechnic Entrance">Polytechnic Entrance</SelectItem><SelectItem value="Other">Other</SelectItem></SelectContent></Select><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="admissionType" render={({ field }) => (
                    <FormItem><FormLabel>Admission Type *</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger></FormControl><SelectContent><SelectItem value="Online Form">Online Form</SelectItem><SelectItem value="Admit Card">Admit Card</SelectItem><SelectItem value="Result">Result</SelectItem><SelectItem value="Answer Key">Answer Key</SelectItem><SelectItem value="Counselling">Counselling</SelectItem></SelectContent></Select><FormMessage /></FormItem>
                  )} />
                </div>
              </CardContent>
            </Card>

            {/* --- Program / Course Details --- */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Program / Course Details</CardTitle>
                <Button type="button" variant="outline" size="sm" onClick={() => appendCourse({ courseName: "", duration: "", eligibility: "", groupCode: "", qualificationRequired: "" })}>
                  Add Course
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField control={form.control} name="totalSeats" render={({ field }) => (
                  <FormItem><FormLabel>Total Seats</FormLabel><FormControl><Input type="number" placeholder="e.g., 15000" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                {courseFields.map((field, index) => (
                  <div key={field.id} className="p-2 border rounded-lg space-y-2">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                      <FormField control={form.control} name={`courseDetails.${index}.courseName`} render={({ field }) => (
                        <FormItem><FormLabel>Course Name</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                      )} />
                      <FormField control={form.control} name={`courseDetails.${index}.duration`} render={({ field }) => (
                        <FormItem><FormLabel>Duration</FormLabel><FormControl><Input placeholder="e.g., 4 Years" {...field} /></FormControl><FormMessage /></FormItem>
                      )} />
                      <FormField control={form.control} name={`courseDetails.${index}.groupCode`} render={({ field }) => (
                        <FormItem><FormLabel>Group Code</FormLabel><FormControl><Input placeholder="e.g., Group A" {...field} /></FormControl><FormMessage /></FormItem>
                      )} />
                    </div>
                    <FormField control={form.control} name={`courseDetails.${index}.qualificationRequired`} render={({ field }) => (
                      <FormItem><FormLabel>Qualification</FormLabel><FormControl><Textarea placeholder="e.g., 10+2 with PCM" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <Button type="button" variant="destructive" size="sm" onClick={() => removeCourse(index)}>Remove Course</Button>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* --- Eligibility & Qualification --- */}
            <Card>
              <CardHeader><CardTitle>Eligibility & Qualification</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <FormField control={form.control} name="eligibilityCriteria.education" render={({ field }) => (
                  <FormItem><FormLabel>Educational Eligibility *</FormLabel><FormControl><Textarea placeholder="e.g., Passed / appearing 10+2 examination..." className="min-h-[100px]" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <FormField control={form.control} name="eligibilityCriteria.ageLimit.min" render={({ field }) => (
                    <FormItem><FormLabel>Min Age</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="eligibilityCriteria.ageLimit.max" render={({ field }) => (
                    <FormItem><FormLabel>Max Age</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="eligibilityCriteria.ageLimit.referenceDate" render={({ field }) => (
                    <FormItem><FormLabel>Age Reference Date</FormLabel><FormControl><Input type="date" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="eligibilityCriteria.ageLimit.relaxationDetails" render={({ field }) => (
                    <FormItem><FormLabel>Age Relaxation</FormLabel><FormControl><Input placeholder="e.g., As per rules" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                </div>
                <FormField control={form.control} name="eligibilityCriteria.additionalRequirements" render={({ field }) => (
                  <FormItem><FormLabel>Additional Requirements (comma-separated)</FormLabel><FormControl><Input placeholder="e.g., Physics, Chemistry, Math compulsory" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
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
                  <FormField control={form.control} name="importantDates.examCityDate" render={({ field }) => (
                    <FormItem><FormLabel>Exam City Date</FormLabel><FormControl><Input type="date" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="importantDates.admitCardDate" render={({ field }) => (
                    <FormItem><FormLabel>Admit Card Date</FormLabel><FormControl><Input type="date" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="importantDates.examDate" render={({ field }) => (
                    <FormItem><FormLabel>Exam Date</FormLabel><FormControl><Input placeholder="e.g., 21-30 Jan 2025 or TBA" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <FormField control={form.control} name="importantDates.answerKeyDate" render={({ field }) => (
                    <FormItem><FormLabel>Answer Key Date</FormLabel><FormControl><Input type="date" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="importantDates.resultDate" render={({ field }) => (
                    <FormItem><FormLabel>Result Date</FormLabel><FormControl><Input type="date" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="importantDates.counsellingDate" render={({ field }) => (
                    <FormItem><FormLabel>Counselling Date</FormLabel><FormControl><Input placeholder="e.g., March 2025" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                </div>
              </CardContent>
            </Card>

            {/* --- Application Fee --- */}
            <Card>
              <CardHeader><CardTitle>Application Fee</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <FormField control={form.control} name="applicationFee.general" render={({ field }) => (
                    <FormItem><FormLabel>General</FormLabel><FormControl><Input type="number" placeholder="e.g., 1000" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="applicationFee.obc" render={({ field }) => (
                    <FormItem><FormLabel>OBC</FormLabel><FormControl><Input type="number" placeholder="e.g., 1000" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="applicationFee.ews" render={({ field }) => (
                    <FormItem><FormLabel>EWS</FormLabel><FormControl><Input type="number" placeholder="e.g., 1000" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="applicationFee.female" render={({ field }) => (
                    <FormItem><FormLabel>Female</FormLabel><FormControl><Input type="number" placeholder="e.g., 800" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <FormField control={form.control} name="applicationFee.sc" render={({ field }) => (
                    <FormItem><FormLabel>SC</FormLabel><FormControl><Input type="number" placeholder="e.g., 500" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="applicationFee.st" render={({ field }) => (
                    <FormItem><FormLabel>ST</FormLabel><FormControl><Input type="number" placeholder="e.g., 500" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="applicationFee.pwd" render={({ field }) => (
                    <FormItem><FormLabel>PwD</FormLabel><FormControl><Input type="number" placeholder="e.g., 500" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="applicationFee.bothPapers" render={({ field }) => (
                    <FormItem><FormLabel>Both Papers Fee</FormLabel><FormControl><Input type="number" placeholder="e.g., 1200" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                </div>
                <FormField control={form.control} name="applicationFee.paymentModes" render={({ field }) => (
                  <FormItem><FormLabel>Payment Modes (comma-separated)</FormLabel><FormControl><Input placeholder="e.g., Debit Card, Credit Card, Net Banking" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
              </CardContent>
            </Card>

            {/* --- Process & Links --- */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader><CardTitle>Admission Process</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                  <FormField control={form.control} name="process.mode" render={({ field }) => (
                    <FormItem><FormLabel>Mode</FormLabel><FormControl><Input placeholder="e.g., CBT, Offline" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="process.selectionSteps" render={({ field }) => (
                    <FormItem><FormLabel>Selection Steps (comma-separated)</FormLabel><FormControl><Textarea placeholder="e.g., Written Exam, Counselling" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                </CardContent>
              </Card>
              <Card>
                <CardHeader><CardTitle>Social Links</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                  <FormField control={form.control} name="extraInfo.helpdesk.phone" render={({ field }) => (
                    <FormItem><FormLabel>Helpdesk Phone</FormLabel><FormControl><Input placeholder="e.g., 011-123456" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="extraInfo.helpdesk.email" render={({ field }) => (
                    <FormItem><FormLabel>Helpdesk Email</FormLabel><FormControl><Input placeholder="e.g., help@nta.ac.in" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                </CardContent>
              </Card>
            </div>
            
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
                  <FormField control={form.control} name="links.notificationPDF" render={({ field }) => (
                    <FormItem><FormLabel>Notification PDF</FormLabel><FormControl><Input placeholder="https://example.com/notification.pdf" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="links.informationBulletin" render={({ field }) => (
                    <FormItem><FormLabel>Info Bulletin</FormLabel><FormControl><Input placeholder="https://example.com/bulletin.pdf" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="links.admitCard" render={({ field }) => (
                    <FormItem><FormLabel>Admit Card Link</FormLabel><FormControl><Input placeholder="https://example.com/admitcard" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="links.answerKey" render={({ field }) => (
                    <FormItem><FormLabel>Answer Key Link</FormLabel><FormControl><Input placeholder="https://example.com/answerkey" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="links.result" render={({ field }) => (
                    <FormItem><FormLabel>Result Link</FormLabel><FormControl><Input placeholder="https://example.com/result" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="links.scoreCard" render={({ field }) => (
                    <FormItem><FormLabel>Score Card Link</FormLabel><FormControl><Input placeholder="https://example.com/scorecard" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="links.counsellingPortal" render={({ field }) => (
                    <FormItem><FormLabel>Counselling Portal</FormLabel><FormControl><Input placeholder="https://example.com/counselling" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="links.correctionLink" render={({ field }) => (
                    <FormItem><FormLabel>Correction Link</FormLabel><FormControl><Input placeholder="https://example.com/correction" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                </div>
              </CardContent>
            </Card>

            {/* --- Status Flags --- */}
            <Card>
              <CardHeader><CardTitle>Status Flags</CardTitle></CardHeader>
              <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <FormField control={form.control} name="status.isApplicationOpen" render={({ field }) => (
                  <FormItem className="flex flex-row items-center space-x-3 space-y-0"><FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} /></FormControl><FormLabel>Application Open</FormLabel></FormItem>
                )} />
                <FormField control={form.control} name="status.isCorrectionWindowOpen" render={({ field }) => (
                  <FormItem className="flex flex-row items-center space-x-3 space-y-0"><FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} /></FormControl><FormLabel>Correction Open</FormLabel></FormItem>
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
                <FormField control={form.control} name="status.isCounsellingActive" render={({ field }) => (
                  <FormItem className="flex flex-row items-center space-x-3 space-y-0"><FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} /></FormControl><FormLabel>Counselling Active</FormLabel></FormItem>
                )} />
                <FormField control={form.control} name="status.isPublished" render={({ field }) => (
                  <FormItem className="flex flex-row items-center space-x-3 space-y-0"><FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} /></FormControl><FormLabel>Published</FormLabel></FormItem>
                )} />
              </CardContent>
            </Card>

            {/* --- Extra Info --- */}
            <Card>
              <CardHeader><CardTitle>Extra Info</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <FormField control={form.control} name="extraInfo.documentsRequired" render={({ field }) => (
                  <FormItem><FormLabel>Documents Required (comma-separated)</FormLabel><FormControl><Textarea placeholder="e.g., Photo, Sign, ID Proof" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="extraInfo.syllabusTopics" render={({ field }) => (
                  <FormItem><FormLabel>Syllabus Topics (comma-separated)</FormLabel><FormControl><Textarea placeholder="e.g., Physics, Chemistry, Math" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="extraInfo.examPattern" render={({ field }) => (
                  <FormItem><FormLabel>Exam Pattern (comma-separated)</FormLabel><FormControl><Textarea placeholder="e.g., 3 Sections, +4 for correct, -1 for wrong" {...field} /></FormControl><FormMessage /></FormItem>
                )} />

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
                
                {/* Counseling Details */}
                <div className="pt-2">
                  <FormLabel className="text-lg font-semibold">Counseling Details</FormLabel>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
                    <FormField control={form.control} name="extraInfo.counselingDetails.registrationFee" render={({ field }) => (
                      <FormItem><FormLabel>Registration Fee</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="extraInfo.counselingDetails.seatAcceptanceFee" render={({ field }) => (
                      <FormItem><FormLabel>Seat Acceptance Fee</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="extraInfo.counselingDetails.steps" render={({ field }) => (
                      <FormItem><FormLabel>Steps (comma-separated)</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                  </div>
                </div>

                {/* Cutoff Marks Field Array */}
                <div className="pt-4">
                  <div className="flex items-center justify-between mb-2">
                    <FormLabel>Cutoff Marks</FormLabel>
                    <Button type="button" variant="outline" size="sm" onClick={() => appendCutoff({ category: "", expected: "" })}>Add Cutoff</Button>
                  </div>
                  {cutoffFields.map((field, index) => (
                    <div key={field.id} className="grid grid-cols-1 md:grid-cols-7 gap-2 p-2 border rounded-lg mb-2">
                      <FormField control={form.control} name={`extraInfo.cutoffMarks.${index}.category`} render={({ field }) => (
                        <FormItem className="md:col-span-3"><FormLabel>Category</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                      )} />
                      <FormField control={form.control} name={`extraInfo.cutoffMarks.${index}.expected`} render={({ field }) => (
                        <FormItem className="md:col-span-3"><FormLabel>Expected</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                      )} />
                      <FormItem className="md:col-span-1 flex items-end">
                        <Button type="button" variant="destructive" size="icon" onClick={() => removeCutoff(index)}><Trash2 className="h-4 w-4" /></Button>
                      </FormItem>
                    </div>
                  ))}
                </div>

                {/* FAQs Field Array */}
                <div className="pt-4">
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

            <Button type="submit" className="w-full">
              {defaultValues?.admissionId ? "Update Admission" : "Post Admission"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}