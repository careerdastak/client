// // import { useState, useEffect } from "react";
// // import { useForm } from "react-hook-form";
// // import { zodResolver } from "@hookform/resolvers/zod";
// // import * as z from "zod";
// // import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// // import { Button } from "@/components/ui/button";
// // import { Input } from "@/components/ui/input";
// // import { Textarea } from "@/components/ui/textarea";
// // import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
// // import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// // import { useToast } from "@/hooks/use-toast";
// // import {
// //   Sidebar,
// //   SidebarContent,
// //   SidebarGroup,
// //   SidebarGroupContent,
// //   SidebarMenu,
// //   SidebarMenuButton,
// //   SidebarMenuItem,
// //   SidebarProvider,
// //   SidebarInset,
// // } from "@/components/ui/sidebar";
// // import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
// // import {
// //   Briefcase,
// //   Trophy,
// //   CreditCard,
// //   Key,
// //   BookOpen,
// //   GraduationCap,
// //   FileText,
// //   Library,
// //   LogOut,
// //   Menu,
// //   ClipboardList,
// //   User
// // } from "lucide-react";
// // import { QuizManagement } from "@/components/QuizManagement";
// // import { CRUDList } from "@/components/CRUDList";
// // import { ComprehensiveJobForm } from "@/components/ComprehensiveJobForm";
// // import { ComprehensiveAdmissionForm } from "@/components/ComprehensiveAdmissionForm";

// // // --- Environment Variables ---
// // const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

// // // --- Auth Service ---
// // const authService = {
// //   setToken: (token: string) => {
// //     localStorage.setItem('admin_token', token);
// //   },
  
// //   getToken: () => {
// //     return localStorage.getItem('admin_token');
// //   },
  
// //   removeToken: () => {
// //     localStorage.removeItem('admin_token');
// //   },
  
// //   getAuthHeaders: () => {
// //     const token = authService.getToken();
// //     return token ? { 
// //       'Authorization': `Bearer ${token}`,
// //       'Content-Type': 'application/json'
// //     } : { 'Content-Type': 'application/json' };
// //   },
  
// //   isAuthenticated: () => {
// //     return !!authService.getToken();
// //   },
  
// //   async login(credentials: { username: string; password: string }) {
// //     const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
// //       method: 'POST',
// //       headers: {
// //         'Content-Type': 'application/json',
// //       },
// //       body: JSON.stringify(credentials),
// //     });

// //     if (!response.ok) {
// //       const error = await response.json();
// //       throw new Error(error.message || 'Login failed');
// //     }

// //     const data = await response.json();
    
// //     if (data.success && data.token) {
// //       authService.setToken(data.token);
// //     }
    
// //     return data;
// //   },

// //   async logout() {
// //     const token = authService.getToken();
// //     if (token) {
// //       try {
// //         await fetch(`${API_BASE_URL}/api/auth/logout`, {
// //           method: 'POST',
// //           headers: {
// //             'Authorization': `Bearer ${token}`,
// //           },
// //         });
// //       } catch (error) {
// //         console.error('Logout API call failed:', error);
// //       }
// //     }
// //     authService.removeToken();
// //   },

// //   async getProfile() {
// //     const token = authService.getToken();
// //     if (!token) throw new Error('No token found');

// //     const response = await fetch(`${API_BASE_URL}/api/auth/me`, {
// //       headers: {
// //         'Authorization': `Bearer ${token}`,
// //       },
// //     });

// //     if (!response.ok) {
// //       if (response.status === 401) {
// //         authService.removeToken();
// //       }
// //       const error = await response.json();
// //       throw new Error(error.message || 'Failed to get profile');
// //     }

// //     return response.json();
// //   },
// // };

// // // Login Schema
// // const loginSchema = z.object({
// //   username: z.string().min(1, "Username is required"),
// //   password: z.string().min(1, "Password is required"),
// // });

// // // --- COMPREHENSIVE JOB SCHEMA (Matches Form) ---
// // const jobSchema = z.object({
// //   // Basic Job Identity
// //   jobId: z.string().min(1, "Job ID is required"),
// //   title: z.string().min(5, "Title must be at least 5 characters"),
// //   postDate: z.string().min(1, "Post date is required"),
// //   organization: z.string().min(3, "Organization name is required"),
// //   advertisementNo: z.string().optional(),
// //   category: z.enum(["State Govt", "Central Govt", "Defence", "Police", "Other"]),
// //   jobType: z.string().optional(),
// //   location: z.string().min(2, "Location required"),

// //   // Core Information
// //   totalPosts: z.coerce.number().optional().or(z.literal('')),
// //   postDetails: z.array(z.object({
// //     postName: z.string().min(1, "Post name is required"),
// //     numberOfPosts: z.coerce.number().optional().or(z.literal('')),
// //     eligibility: z.string().optional(),
// //   })).optional(),

// //   // Eligibility Criteria
// //   eligibilityCriteria: z.object({
// //     education: z.string().min(3, "Education qualification is required"),
// //     ageLimit: z.object({
// //       min: z.coerce.number().optional().or(z.literal('')),
// //       max: z.coerce.number().optional().or(z.literal('')),
// //       referenceDate: z.string().optional(),
// //       ageRelaxationRules: z.string().optional(),
// //     }).optional(),
// //     additionalCertifications: z.string().optional(), // Comma-separated
// //   }),

// //   eligibilityDetails: z.array(z.object({
// //     qualification: z.string().min(1, "Qualification is required"),
// //     minMarks: z.coerce.number().optional().or(z.literal('')),
// //     remark: z.string().optional(),
// //   })).optional(),

// //   // Important Dates
// //   importantDates: z.object({
// //     notificationDate: z.string().optional(),
// //     applicationStart: z.string().min(1, "Application start date required"),
// //     applicationEnd: z.string().min(1, "Application end date required"),
// //     feePaymentLastDate: z.string().optional(),
// //     correctionWindow: z.object({
// //       start: z.string().optional(),
// //       end: z.string().optional(),
// //     }).optional(),
// //     examDate: z.string().optional(),
// //     admitCardDate: z.string().optional(),
// //     answerKeyDate: z.string().optional(),
// //     resultDate: z.string().optional(),
// //     scoreCardDate: z.string().optional(),
// //     physicalTestDate: z.string().optional(),
// //     documentVerificationDate: z.string().optional(),
// //   }),

// //   // Fee Details
// //   applicationFee: z.object({
// //     general: z.coerce.number().optional().or(z.literal('')),
// //     obc: z.coerce.number().optional().or(z.literal('')),
// //     sc: z.coerce.number().optional().or(z.literal('')),
// //     st: z.coerce.number().optional().or(z.literal('')),
// //     ews: z.coerce.number().optional().or(z.literal('')),
// //     female: z.coerce.number().optional().or(z.literal('')),
// //     correctionCharge: z.coerce.number().optional().or(z.literal('')),
// //     paymentModes: z.string().optional(), // Comma-separated
// //   }),

// //   // Selection Process
// //   selectionProcess: z.string().optional(), // Comma-separated

// //   // Links
// //   links: z.object({
// //     officialWebsite: z.string().url("Must be a valid URL").optional().or(z.literal('')),
// //     applyOnline: z.string().url("Must be a valid URL").optional().or(z.literal('')),
// //     notificationPDF: z.string().url("Must be a valid URL").optional().or(z.literal('')),
// //     admitCard: z.string().url("Must be a valid URL").optional().or(z.literal('')),
// //     result: z.string().url("Must be a valid URL").optional().or(z.literal('')),
// //     answerKey: z.string().url("Must be a valid URL").optional().or(z.literal('')),
// //     scoreCard: z.string().url("Must be a valid URL").optional().or(z.literal('')),
// //     cutoff: z.string().url("Must be a valid URL").optional().or(z.literal('')),
// //     correctionLink: z.string().url("Must be a valid URL").optional().or(z.literal('')),
// //   }),

// //   // Status/Display
// //   status: z.object({
// //     isApplicationOpen: z.boolean().default(false),
// //     isAdmitCardAvailable: z.boolean().default(false),
// //     isAnswerKeyReleased: z.boolean().default(false),
// //     isResultDeclared: z.boolean().default(false),
// //     isCorrectionWindowOpen: z.boolean().default(false),
// //     isPublished: z.boolean().default(true),
// //     isArchived: z.boolean().default(false),
// //   }),

// //   // Extensible Meta-Info
// //   extraInfo: z.object({
// //     documentsRequired: z.string().optional(), // Comma-separated
// //     faqs: z.array(z.object({
// //       question: z.string().min(1, "Question is required"),
// //       answer: z.string().min(1, "Answer is required"),
// //     })).optional(),
// //   }).optional(),

// //   socialLinks: z.object({
// //     twitter: z.string().url("Must be a valid URL").optional().or(z.literal('')),
// //     telegram: z.string().url("Must be a valid URL").optional().or(z.literal('')),
// //     facebook: z.string().url("Must be a valid URL").optional().or(z.literal('')),
// //   }).optional(),
// // });

// // type ComprehensiveJobData = z.infer<typeof jobSchema> & { customFields?: Record<string, any>, id?: string, _id?: string };

// // // --- COMPREHENSIVE ADMISSION SCHEMA ---
// // const admissionSchema = z.object({
// //   // Basic Identity
// //   admissionId: z.string().min(1, "Admission ID is required"),
// //   title: z.string().min(5, "Title must be at least 5 characters"),
// //   postDate: z.string().min(1, "Post date is required"),
// //   organization: z.string().min(3, "Organization name is required"),
// //   examName: z.string().optional(),
// //   session: z.string().optional(),
// //   category: z.enum(["Engineering Entrance", "Teaching Entrance", "Polytechnic Entrance", "Medical Entrance", "Other"]),
// //   admissionType: z.enum(["Online Form", "Admit Card", "Result", "Answer Key", "Counselling"]),

// //   // Program / Course Details
// //   totalSeats: z.coerce.number().optional().or(z.literal('')),
// //   courseDetails: z.array(z.object({
// //     courseName: z.string().optional(),
// //     duration: z.string().optional(),
// //     eligibility: z.string().optional(),
// //     groupCode: z.string().optional(),
// //     qualificationRequired: z.string().optional(),
// //   })).optional(),

// //   // Eligibility & Qualification
// //   eligibilityCriteria: z.object({
// //     education: z.string().min(5, "Educational eligibility required"),
// //     ageLimit: z.object({
// //       min: z.coerce.number().optional().or(z.literal('')),
// //       max: z.coerce.number().optional().or(z.literal('')),
// //       referenceDate: z.string().optional(),
// //       relaxationDetails: z.string().optional(),
// //     }).optional(),
// //     additionalRequirements: z.string().optional(), // Comma-separated
// //   }),

// //   // Important Dates
// //   importantDates: z.object({
// //     notificationDate: z.string().optional(),
// //     applicationStart: z.string().min(1, "Application start date required"),
// //     applicationEnd: z.string().min(1, "Application end date required"),
// //     feePaymentLastDate: z.string().optional(),
// //     correctionWindow: z.object({
// //       start: z.string().optional(),
// //       end: z.string().optional(),
// //     }).optional(),
// //     examCityDate: z.string().optional(),
// //     examDate: z.string().optional(),
// //     admitCardDate: z.string().optional(),
// //     answerKeyDate: z.string().optional(),
// //     resultDate: z.string().optional(),
// //     counsellingDate: z.string().optional(),
// //   }),

// //   // Application Fee
// //   applicationFee: z.object({
// //     general: z.coerce.number().optional().or(z.literal('')),
// //     obc: z.coerce.number().optional().or(z.literal('')),
// //     ews: z.coerce.number().optional().or(z.literal('')),
// //     sc: z.coerce.number().optional().or(z.literal('')),
// //     st: z.coerce.number().optional().or(z.literal('')),
// //     pwd: z.coerce.number().optional().or(z.literal('')),
// //     female: z.coerce.number().optional().or(z.literal('')),
// //     bothPapers: z.coerce.number().optional().or(z.literal('')),
// //     paymentModes: z.string().optional(), // Comma-separated
// //   }),

// //   // Admission / Exam Process
// //   process: z.object({
// //     mode: z.string().optional(),
// //     selectionSteps: z.string().optional(), // Comma-separated
// //   }).optional(),

// //   // Links
// //   links: z.object({
// //     officialWebsite: z.string().url("Must be a valid URL").optional().or(z.literal('')),
// //     applyOnline: z.string().url("Must be a valid URL").optional().or(z.literal('')),
// //     notificationPDF: z.string().url("Must be a valid URL").optional().or(z.literal('')),
// //     informationBulletin: z.string().url("Must be a valid URL").optional().or(z.literal('')),
// //     admitCard: z.string().url("Must be a valid URL").optional().or(z.literal('')),
// //     answerKey: z.string().url("Must be a valid URL").optional().or(z.literal('')),
// //     result: z.string().url("Must be a valid URL").optional().or(z.literal('')),
// //     scoreCard: z.string().url("Must be a valid URL").optional().or(z.literal('')),
// //     counsellingPortal: z.string().url("Must be a valid URL").optional().or(z.literal('')),
// //     correctionLink: z.string().url("Must be a valid URL").optional().or(z.literal('')),
// //   }),

// //   // Status Flags
// //   status: z.object({
// //     isApplicationOpen: z.boolean().default(false),
// //     isCorrectionWindowOpen: z.boolean().default(false),
// //     isAdmitCardAvailable: z.boolean().default(false),
// //     isAnswerKeyReleased: z.boolean().default(false),
// //     isResultDeclared: z.boolean().default(false),
// //     isCounsellingActive: z.boolean().default(false),
// //   }),

// //   // Extended Info
// //   extraInfo: z.object({
// //     documentsRequired: z.string().optional(), // Comma-separated
// //     syllabusTopics: z.string().optional(), // Comma-separated
// //     examPattern: z.string().optional(), // Comma-separated
// //     helpdesk: z.object({
// //       phone: z.string().optional(),
// //       email: z.string().email("Must be a valid email").optional().or(z.literal('')),
// //     }).optional(),
// //     counselingDetails: z.object({
// //       registrationFee: z.coerce.number().optional().or(z.literal('')),
// //       seatAcceptanceFee: z.coerce.number().optional().or(z.literal('')),
// //       steps: z.string().optional(), // Comma-separated
// //     }).optional(),
// //     cutoffMarks: z.array(z.object({
// //       category: z.string().optional(),
// //       expected: z.string().optional(),
// //     })).optional(),
// //     faqs: z.array(z.object({
// //       question: z.string().min(1, "Question is required"),
// //       answer: z.string().min(1, "Answer is required"),
// //     })).optional(),
// //   }).optional(),
// // });

// // type ComprehensiveAdmissionData = z.infer<typeof admissionSchema> & { customFields?: Record<string, any>, id?: string, _id?: string };

// // // --- OTHER SCHEMAS (LOCAL STATE) ---
// // const resultSchema = z.object({
// //   title: z.string().min(5, "Title must be at least 5 characters"),
// //   organization: z.string().min(3, "Organization name is required"),
// //   date: z.string().min(1, "Date is required"),
// //   status: z.string().optional(),
// // });

// // const admitCardSchema = z.object({
// //   title: z.string().min(5, "Title must be at least 5 characters"),
// //   organization: z.string().min(3, "Organization name is required"),
// //   date: z.string().min(1, "Release date is required"),
// //   examDate: z.string().min(1, "Exam date is required"),
// //   status: z.string().min(1, "Status is required"),
// // });

// // const answerKeySchema = z.object({
// //   title: z.string().min(5, "Title must be at least 5 characters"),
// //   organization: z.string().min(3, "Organization name is required"),
// //   date: z.string().min(1, "Release date is required"),
// //   examDate: z.string().min(1, "Exam date is required"),
// //   status: z.string().optional(),
// // });

// // const syllabusSchema = z.object({
// //   title: z.string().min(5, "Title must be at least 5 characters"),
// //   description: z.string().min(10, "Description must be at least 10 characters"),
// //   organization: z.string().min(3, "Organization name is required"),
// //   subjects: z.string().min(5, "Subjects information is required"),
// // });

// // const documentSchema = z.object({
// //   category: z.string().min(1, "Category is required"),
// //   title: z.string().min(5, "Title must be at least 5 characters"),
// //   description: z.string().min(10, "Description must be at least 10 characters"),
// //   url: z.string().url("Must be a valid URL"),
// //   services: z.string().min(5, "Services information is required (comma-separated)"),
// // });

// // const resourceSchema = z.object({
// //   category: z.string().min(1, "Category is required"),
// //   title: z.string().min(5, "Title must be at least 5 characters"),
// //   description: z.string().min(10, "Description must be at least 10 characters"),
// //   link: z.string().url("Must be a valid URL"),
// //   institute: z.string().min(2, "Institute name is required"),
// //   badge: z.string().optional(),
// // });

// // // --- HELPER FUNCTIONS ---
// // const formatDateForInput = (dateString?: string | Date) => {
// //   if (!dateString) return "";
// //   try {
// //     return new Date(dateString).toISOString().split('T')[0];
// //   } catch (e) {
// //     return "";
// //   }
// // };

// // const splitCsv = (input?: string | number | string[] | number[]): string[] => {
// //   if (!input) return [];
// //   if (Array.isArray(input)) {
// //     return input.map(item => String(item).trim()).filter(Boolean);
// //   }
// //   const str = String(input);
// //   if (str.trim() === "") return [];
// //   return str.split(',').map(s => s.trim()).filter(Boolean);
// // };

// // const toNumberOrUndefined = (val: string | number | undefined) => {
// //   if (val === "" || val === undefined) return undefined;
// //   const num = Number(val);
// //   return isNaN(num) ? undefined : num;
// // };

// // const toCsv = (arr?: string[] | number[]) => {
// //   if (!arr || arr.length === 0) return "";
// //   return arr.join(', ');
// // };

// // const toStringOrEmpty = (val: any) => {
// //   return val === null || val === undefined ? "" : String(val);
// // };

// // const toFormNumber = (val: any): number | "" | undefined => {
// //   if (val === null || val === undefined) return "";
// //   if (val === "") return "";
// //   const num = Number(val);
// //   return isNaN(num) ? "" : num;
// // };

// // // --- NORMALIZE JOB (for form) ---
// // const normalizeJob = (job: any): ComprehensiveJobData => {
// //   const dbId = job.id || job._id;
// //   const { _id, ...rest } = job;

// //   const data: ComprehensiveJobData = {
// //     ...rest,
// //     id: String(dbId),
// //     eligibilityCriteria: { ...job.eligibilityCriteria },
// //     importantDates: { ...job.importantDates },
// //     applicationFee: { ...job.applicationFee },
// //     links: { ...job.links },
// //     status: { ...job.status },
// //     extraInfo: { ...job.extraInfo },
// //     socialLinks: { ...job.socialLinks },
// //   };

// //   // Convert array fields to comma-separated strings
// //   data.selectionProcess = toCsv(job.selectionProcess as string[]);
// //   if (data.eligibilityCriteria) {
// //     data.eligibilityCriteria.additionalCertifications = toCsv(job.eligibilityCriteria.additionalCertifications as string[]);
// //   }
// //   if (data.applicationFee) {
// //     data.applicationFee.paymentModes = toCsv(job.applicationFee.paymentModes as string[]);
// //   }
// //   if (data.extraInfo) {
// //     data.extraInfo.documentsRequired = toCsv(job.extraInfo.documentsRequired as string[]);
// //   }

// //   // Format dates for input fields
// //   data.postDate = formatDateForInput(data.postDate);
// //   if (data.eligibilityCriteria?.ageLimit) {
// //     data.eligibilityCriteria.ageLimit.referenceDate = formatDateForInput(data.eligibilityCriteria.ageLimit.referenceDate);
// //   }
// //   data.importantDates.notificationDate = formatDateForInput(data.importantDates.notificationDate);
// //   data.importantDates.applicationStart = formatDateForInput(data.importantDates.applicationStart);
// //   data.importantDates.applicationEnd = formatDateForInput(data.importantDates.applicationEnd);
// //   data.importantDates.feePaymentLastDate = formatDateForInput(data.importantDates.feePaymentLastDate);
// //   data.importantDates.admitCardDate = formatDateForInput(data.importantDates.admitCardDate);
// //   data.importantDates.answerKeyDate = formatDateForInput(data.importantDates.answerKeyDate);
// //   data.importantDates.resultDate = formatDateForInput(data.importantDates.resultDate);
// //   data.importantDates.scoreCardDate = formatDateForInput(data.importantDates.scoreCardDate);
// //   if (data.importantDates.correctionWindow) {
// //     data.importantDates.correctionWindow.start = formatDateForInput(data.importantDates.correctionWindow.start);
// //     data.importantDates.correctionWindow.end = formatDateForInput(data.importantDates.correctionWindow.end);
// //   }

// //   data.location = toStringOrEmpty(job.location);

// //   // Use toFormNumber for fields that are (number | "" | undefined)
// //   data.totalPosts = toFormNumber(job.totalPosts);
// //   if (data.applicationFee) {
// //     data.applicationFee.general = toFormNumber(job.applicationFee.general);
// //     data.applicationFee.obc = toFormNumber(job.applicationFee.obc);
// //     data.applicationFee.sc = toFormNumber(job.applicationFee.sc);
// //     data.applicationFee.st = toFormNumber(job.applicationFee.st);
// //     data.applicationFee.ews = toFormNumber(job.applicationFee.ews);
// //     data.applicationFee.female = toFormNumber(job.applicationFee.female);
// //     data.applicationFee.correctionCharge = toFormNumber(job.applicationFee.correctionCharge);
// //   }
// //   if (data.eligibilityCriteria?.ageLimit) {
// //     data.eligibilityCriteria.ageLimit.min = toFormNumber(job.eligibilityCriteria.ageLimit.min);
// //     data.eligibilityCriteria.ageLimit.max = toFormNumber(job.eligibilityCriteria.ageLimit.max);
// //   }

// //   return data as ComprehensiveJobData;
// // };

// // // --- NORMALIZE ADMISSION (for form) ---
// // const normalizeAdmission = (admission: any): ComprehensiveAdmissionData => {
// //   const dbId = admission.id || admission._id;
// //   const { _id, ...rest } = admission;

// //   const data: ComprehensiveAdmissionData = {
// //     ...rest,
// //     id: String(dbId),
// //     eligibilityCriteria: { ...admission.eligibilityCriteria },
// //     importantDates: { ...admission.importantDates },
// //     applicationFee: { ...admission.applicationFee },
// //     process: { ...admission.process },
// //     links: { ...admission.links },
// //     status: { ...admission.status },
// //     extraInfo: { ...admission.extraInfo },
// //   };

// //   // Convert array fields to comma-separated strings
// //   if (data.eligibilityCriteria) {
// //     data.eligibilityCriteria.additionalRequirements = toCsv(admission.eligibilityCriteria.additionalRequirements as string[]);
// //   }
// //   if (data.applicationFee) {
// //     data.applicationFee.paymentModes = toCsv(admission.applicationFee.paymentModes as string[]);
// //   }
// //   if (data.process) {
// //     data.process.selectionSteps = toCsv(admission.process.selectionSteps as string[]);
// //   }
// //   if (data.extraInfo) {
// //     data.extraInfo.documentsRequired = toCsv(admission.extraInfo.documentsRequired as string[]);
// //     data.extraInfo.syllabusTopics = toCsv(admission.extraInfo.syllabusTopics as string[]);
// //     data.extraInfo.examPattern = toCsv(admission.extraInfo.examPattern as string[]);
// //     if (data.extraInfo.counselingDetails) {
// //       data.extraInfo.counselingDetails.steps = toCsv(admission.extraInfo.counselingDetails.steps as string[]);
// //     }
// //   }

// //   // Format dates for input fields
// //   data.postDate = formatDateForInput(data.postDate);
// //   if (data.eligibilityCriteria?.ageLimit) {
// //     data.eligibilityCriteria.ageLimit.referenceDate = formatDateForInput(data.eligibilityCriteria.ageLimit.referenceDate);
// //   }
// //   if (data.importantDates) {
// //     data.importantDates.notificationDate = formatDateForInput(data.importantDates.notificationDate);
// //     data.importantDates.applicationStart = formatDateForInput(data.importantDates.applicationStart);
// //     data.importantDates.applicationEnd = formatDateForInput(data.importantDates.applicationEnd);
// //     data.importantDates.feePaymentLastDate = formatDateForInput(data.importantDates.feePaymentLastDate);
// //     data.importantDates.examCityDate = formatDateForInput(data.importantDates.examCityDate);
// //     data.importantDates.admitCardDate = formatDateForInput(data.importantDates.admitCardDate);
// //     data.importantDates.answerKeyDate = formatDateForInput(data.importantDates.answerKeyDate);
// //     data.importantDates.resultDate = formatDateForInput(data.importantDates.resultDate);
// //     if (data.importantDates.correctionWindow) {
// //       data.importantDates.correctionWindow.start = formatDateForInput(data.importantDates.correctionWindow.start);
// //       data.importantDates.correctionWindow.end = formatDateForInput(data.importantDates.correctionWindow.end);
// //     }
// //   }

// //   // Use toFormNumber for fields that are (number | "" | undefined)
// //   data.totalSeats = toFormNumber(admission.totalSeats);
// //   if (data.applicationFee) {
// //     data.applicationFee.general = toFormNumber(admission.applicationFee.general);
// //     data.applicationFee.obc = toFormNumber(admission.applicationFee.obc);
// //     data.applicationFee.ews = toFormNumber(admission.applicationFee.ews);
// //     data.applicationFee.sc = toFormNumber(admission.applicationFee.sc);
// //     data.applicationFee.st = toFormNumber(admission.applicationFee.st);
// //     data.applicationFee.pwd = toFormNumber(admission.applicationFee.pwd);
// //     data.applicationFee.female = toFormNumber(admission.applicationFee.female);
// //     data.applicationFee.bothPapers = toFormNumber(admission.applicationFee.bothPapers);
// //   }
// //   if (data.eligibilityCriteria?.ageLimit) {
// //     data.eligibilityCriteria.ageLimit.min = toFormNumber(admission.eligibilityCriteria.ageLimit.min);
// //     data.eligibilityCriteria.ageLimit.max = toFormNumber(admission.eligibilityCriteria.ageLimit.max);
// //   }
// //   if (data.extraInfo?.counselingDetails) {
// //     data.extraInfo.counselingDetails.registrationFee = toFormNumber(admission.extraInfo.counselingDetails.registrationFee);
// //     data.extraInfo.counselingDetails.seatAcceptanceFee = toFormNumber(admission.extraInfo.counselingDetails.seatAcceptanceFee);
// //   }
// //   // Ensure arrays are initialized
// //   data.courseDetails = data.courseDetails || [];
// //   if (data.extraInfo) {
// //     data.extraInfo.cutoffMarks = data.extraInfo.cutoffMarks || [];
// //     data.extraInfo.faqs = data.extraInfo.faqs || [];
// //   }

// //   return data as ComprehensiveAdmissionData;
// // };

// // const Dashboard = () => {
// //   const { toast } = useToast();
// //   const [isAuthenticated, setIsAuthenticated] = useState(false);
// //   const [activeSection, setActiveSection] = useState("jobs");
// //   const [adminProfile, setAdminProfile] = useState<any>(null);
// //   const [isLoading, setIsLoading] = useState(false);

// //   // Storage for created items
// //   const [jobs, setJobs] = useState<ComprehensiveJobData[]>([]);
// //   const [results, setResults] = useState<Array<z.infer<typeof resultSchema> & { id: string }>>([]);
// //   const [admitCards, setAdmitCards] = useState<Array<z.infer<typeof admitCardSchema> & { id: string }>>([]);
// //   const [answerKeys, setAnswerKeys] = useState<Array<z.infer<typeof answerKeySchema> & { id: string }>>([]);
// //   const [syllabusItems, setSyllabusItems] = useState<Array<z.infer<typeof syllabusSchema> & { id: string }>>([]);
// //   const [admissions, setAdmissions] = useState<ComprehensiveAdmissionData[]>([]);
// //   const [documents, setDocuments] = useState<Array<z.infer<typeof documentSchema> & { id: string }>>([]);
// //   const [resources, setResources] = useState<Array<z.infer<typeof resourceSchema> & { id: string }>>([]);

// //   // Editing states
// //   const [editingJobId, setEditingJobId] = useState<string | null>(null);
// //   const [editingResultId, setEditingResultId] = useState<string | null>(null);
// //   const [editingAdmissionId, setEditingAdmissionId] = useState<string | null>(null);

// //   // Login Form
// //   const loginForm = useForm<z.infer<typeof loginSchema>>({
// //     resolver: zodResolver(loginSchema),
// //     defaultValues: { username: "", password: "" },
// //   });

// //   // Other Forms
// //   const resultForm = useForm<z.infer<typeof resultSchema>>({
// //     resolver: zodResolver(resultSchema),
// //     defaultValues: { title: "", organization: "", date: "", status: "" },
// //   });

// //   const admitCardForm = useForm<z.infer<typeof admitCardSchema>>({
// //     resolver: zodResolver(admitCardSchema),
// //     defaultValues: { title: "", organization: "", date: "", examDate: "", status: "" },
// //   });

// //   const answerKeyForm = useForm<z.infer<typeof answerKeySchema>>({
// //     resolver: zodResolver(answerKeySchema),
// //     defaultValues: { title: "", organization: "", date: "", examDate: "", status: "" },
// //   });

// //   const syllabusForm = useForm<z.infer<typeof syllabusSchema>>({
// //     resolver: zodResolver(syllabusSchema),
// //     defaultValues: { title: "", description: "", organization: "", subjects: "" },
// //   });

// //   const documentForm = useForm<z.infer<typeof documentSchema>>({
// //     resolver: zodResolver(documentSchema),
// //     defaultValues: { category: "", title: "", description: "", url: "", services: "" },
// //   });

// //   const resourceForm = useForm<z.infer<typeof resourceSchema>>({
// //     resolver: zodResolver(resourceSchema),
// //     defaultValues: { category: "", title: "", description: "", link: "", institute: "", badge: "" },
// //   });

// //   // Check authentication status on component mount
// //   useEffect(() => {
// //     const checkAuthStatus = async () => {
// //       if (authService.isAuthenticated()) {
// //         try {
// //           const profile = await authService.getProfile();
// //           setAdminProfile(profile.admin);
// //           setIsAuthenticated(true);
// //         } catch (error) {
// //           console.error('Auth check failed:', error);
// //           await authService.logout();
// //           setIsAuthenticated(false);
// //         }
// //       }
// //     };

// //     checkAuthStatus();
// //   }, []);

// //   // --- API: FETCH ALL DATA ---
// //   useEffect(() => {
// //     const fetchJobs = async () => {
// //       if (!API_BASE_URL) {
// //         console.error("Backend URL is not defined. Set VITE_BACKEND_URL in .env");
// //         toast({ title: "Configuration Error", description: "Backend URL is not set.", variant: "destructive" });
// //         return;
// //       }
// //       try {
// //         const response = await fetch(`${API_BASE_URL}/api/jobs`, {
// //           headers: authService.getAuthHeaders(),
// //         });
        
// //         if (!response.ok) {
// //           if (response.status === 401) {
// //             handleLogout();
// //             throw new Error('Session expired');
// //           }
// //           throw new Error('Failed to fetch jobs');
// //         }

// //         const data: any[] = await response.json();
// //         setJobs(data.map(normalizeJob));
// //       } catch (error: any) {
// //         console.error("Failed to fetch jobs:", error);
// //         toast({ 
// //           title: "Error", 
// //           description: error.message || "Could not fetch jobs from server.", 
// //           variant: "destructive" 
// //         });
// //       }
// //     };

// //     const fetchAdmissions = async () => {
// //       if (!API_BASE_URL) return;
// //       try {
// //         const response = await fetch(`${API_BASE_URL}/api/admissions`, {
// //           headers: authService.getAuthHeaders(),
// //         });
        
// //         if (!response.ok) {
// //           if (response.status === 401) {
// //             handleLogout();
// //             throw new Error('Session expired');
// //           }
// //           throw new Error('Failed to fetch admissions');
// //         }

// //         const data: any[] = await response.json();
// //         setAdmissions(data.map(normalizeAdmission));
// //       } catch (error: any) {
// //         console.error("Failed to fetch admissions:", error);
// //         toast({ 
// //           title: "Error", 
// //           description: error.message || "Could not fetch admissions from server.", 
// //           variant: "destructive" 
// //         });
// //       }
// //     };

// //     if (isAuthenticated) {
// //       fetchJobs();
// //       fetchAdmissions();
// //     }
// //   }, [isAuthenticated, toast]);

// //   // Login Handler
// //   const onLoginSubmit = async (data: z.infer<typeof loginSchema>) => {
// //     setIsLoading(true);
// //     try {
// //       const result = await authService.login({
// //         username: data.username,
// //         password: data.password
// //       });

// //       if (result.success) {
// //         const profile = await authService.getProfile();
// //         setAdminProfile(profile.admin);
// //         setIsAuthenticated(true);
// //         toast({ 
// //           title: "Login Successful", 
// //           description: `Welcome ${profile.admin?.username || 'Admin'}!` 
// //         });
// //       } else {
// //         throw new Error(result.message || 'Login failed');
// //       }
// //     } catch (error: any) {
// //       console.error('Login error:', error);
// //       toast({ 
// //         title: "Login Failed", 
// //         description: error.message || "Invalid credentials", 
// //         variant: "destructive" 
// //       });
// //     } finally {
// //       setIsLoading(false);
// //     }
// //   };

// //   // Logout Handler
// //   const handleLogout = async () => {
// //     try {
// //       await authService.logout();
// //     } catch (error) {
// //       console.error('Logout error:', error);
// //     } finally {
// //       setIsAuthenticated(false);
// //       setAdminProfile(null);
// //       loginForm.reset();
// //       toast({ title: "Logged Out", description: "You have been logged out successfully" });
// //     }
// //   };

// //   // --- API: CREATE/UPDATE JOB HANDLER ---
// //   const onJobSubmit = async (data: ComprehensiveJobData) => {
// //     if (!authService.isAuthenticated()) {
// //       toast({ 
// //         title: "Authentication Required", 
// //         description: "Please log in to perform this action.", 
// //         variant: "destructive" 
// //       });
// //       return;
// //     }

// //     const { id, _id, ...formData } = data;
// //     const apiPayload: any = JSON.parse(JSON.stringify(formData));

// //     // Convert comma-separated strings to arrays
// //     apiPayload.selectionProcess = splitCsv(formData.selectionProcess);
// //     apiPayload.eligibilityCriteria.additionalCertifications = splitCsv(formData.eligibilityCriteria.additionalCertifications);
// //     apiPayload.applicationFee.paymentModes = splitCsv(formData.applicationFee.paymentModes);
// //     if (apiPayload.extraInfo) {
// //       apiPayload.extraInfo.documentsRequired = splitCsv(formData.extraInfo?.documentsRequired);
// //     }

// //     // Convert form numbers to Numbers or undefined
// //     apiPayload.totalPosts = toNumberOrUndefined(formData.totalPosts);
// //     if (apiPayload.applicationFee) {
// //       apiPayload.applicationFee.general = toNumberOrUndefined(formData.applicationFee.general);
// //       apiPayload.applicationFee.obc = toNumberOrUndefined(formData.applicationFee.obc);
// //       apiPayload.applicationFee.sc = toNumberOrUndefined(formData.applicationFee.sc);
// //       apiPayload.applicationFee.st = toNumberOrUndefined(formData.applicationFee.st);
// //       apiPayload.applicationFee.ews = toNumberOrUndefined(formData.applicationFee.ews);
// //       apiPayload.applicationFee.female = toNumberOrUndefined(formData.applicationFee.female);
// //       apiPayload.applicationFee.correctionCharge = toNumberOrUndefined(formData.applicationFee.correctionCharge);
// //     }
// //     if (apiPayload.eligibilityCriteria?.ageLimit) {
// //       apiPayload.eligibilityCriteria.ageLimit.min = toNumberOrUndefined(formData.eligibilityCriteria.ageLimit?.min);
// //       apiPayload.eligibilityCriteria.ageLimit.max = toNumberOrUndefined(formData.eligibilityCriteria.ageLimit?.max);
// //     }
// //     if (apiPayload.postDetails) {
// //       apiPayload.postDetails.forEach((p: any) => {
// //         p.numberOfPosts = toNumberOrUndefined(p.numberOfPosts);
// //       });
// //     }
// //     if (apiPayload.eligibilityDetails) {
// //       apiPayload.eligibilityDetails.forEach((e: any) => {
// //         e.minMarks = toNumberOrUndefined(e.minMarks);
// //       });
// //     }

// //     // Convert date strings to Dates
// //     const toDateOrNull = (dateStr?: string) => dateStr || null;
// //     apiPayload.postDate = toDateOrNull(formData.postDate);
// //     if (apiPayload.eligibilityCriteria.ageLimit) {
// //       apiPayload.eligibilityCriteria.ageLimit.referenceDate = toDateOrNull(formData.eligibilityCriteria.ageLimit?.referenceDate);
// //     }
// //     if (apiPayload.importantDates) {
// //       apiPayload.importantDates.notificationDate = toDateOrNull(formData.importantDates.notificationDate);
// //       apiPayload.importantDates.applicationStart = toDateOrNull(formData.importantDates.applicationStart);
// //       apiPayload.importantDates.applicationEnd = toDateOrNull(formData.importantDates.applicationEnd);
// //       apiPayload.importantDates.feePaymentLastDate = toDateOrNull(formData.importantDates.feePaymentLastDate);
// //       apiPayload.importantDates.admitCardDate = toDateOrNull(formData.importantDates.admitCardDate);
// //       apiPayload.importantDates.answerKeyDate = toDateOrNull(formData.importantDates.answerKeyDate);
// //       apiPayload.importantDates.resultDate = toDateOrNull(formData.importantDates.resultDate);
// //       apiPayload.importantDates.scoreCardDate = toDateOrNull(formData.importantDates.scoreCardDate);
// //       if (apiPayload.importantDates.correctionWindow) {
// //         apiPayload.importantDates.correctionWindow.start = toDateOrNull(formData.importantDates.correctionWindow?.start);
// //         apiPayload.importantDates.correctionWindow.end = toDateOrNull(formData.importantDates.correctionWindow?.end);
// //       }
// //     }

// //     const method = editingJobId ? 'PUT' : 'POST';
// //     const url = editingJobId
// //       ? `${API_BASE_URL}/api/jobs/${editingJobId}`
// //       : `${API_BASE_URL}/api/jobs`;

// //     try {
// //       const response = await fetch(url, {
// //         method: method,
// //         headers: authService.getAuthHeaders(),
// //         body: JSON.stringify(apiPayload),
// //       });

// //       if (!response.ok) {
// //         if (response.status === 401) {
// //           handleLogout();
// //           throw new Error('Session expired');
// //         }
// //         const errorData = await response.json();
// //         throw new Error(errorData.message || 'Failed to save job');
// //       }

// //       const savedJob: any = await response.json();
// //       const normalizedJob = normalizeJob(savedJob);

// //       if (editingJobId) {
// //         setJobs(jobs.map(job =>
// //           job.id === editingJobId ? normalizedJob : job
// //         ));
// //         setEditingJobId(null);
// //         toast({ title: "Job Updated Successfully" });
// //       } else {
// //         setJobs([...jobs, normalizedJob]);
// //         toast({ title: "Job Posted Successfully" });
// //       }
// //     } catch (error: any) {
// //       console.error("Failed to save job:", error);
// //       toast({
// //         title: "Error",
// //         description: error.message || "Could not save job to server.",
// //         variant: "destructive",
// //       });
// //     }
// //   };

// //   // --- API: CREATE/UPDATE ADMISSION HANDLER ---
// //   const onAdmissionSubmit = async (data: ComprehensiveAdmissionData) => {
// //     if (!authService.isAuthenticated()) {
// //       toast({ 
// //         title: "Authentication Required", 
// //         description: "Please log in to perform this action.", 
// //         variant: "destructive" 
// //       });
// //       return;
// //     }

// //     const { id, _id, ...formData } = data;
// //     const apiPayload: any = JSON.parse(JSON.stringify(formData));

// //     // Convert comma-separated strings to arrays
// //     if (apiPayload.eligibilityCriteria) {
// //       apiPayload.eligibilityCriteria.additionalRequirements = splitCsv(formData.eligibilityCriteria?.additionalRequirements);
// //     }
// //     if (apiPayload.applicationFee) {
// //       apiPayload.applicationFee.paymentModes = splitCsv(formData.applicationFee?.paymentModes);
// //     }
// //     if (apiPayload.process) {
// //       apiPayload.process.selectionSteps = splitCsv(formData.process?.selectionSteps);
// //     }
// //     if (apiPayload.extraInfo) {
// //       apiPayload.extraInfo.documentsRequired = splitCsv(formData.extraInfo?.documentsRequired);
// //       apiPayload.extraInfo.syllabusTopics = splitCsv(formData.extraInfo?.syllabusTopics);
// //       apiPayload.extraInfo.examPattern = splitCsv(formData.extraInfo?.examPattern);
// //       if (apiPayload.extraInfo.counselingDetails) {
// //         apiPayload.extraInfo.counselingDetails.steps = splitCsv(formData.extraInfo?.counselingDetails?.steps);
// //       }
// //     }

// //     // Convert form numbers to Numbers or undefined
// //     apiPayload.totalSeats = toNumberOrUndefined(formData.totalSeats);
// //     if (apiPayload.applicationFee) {
// //       apiPayload.applicationFee.general = toNumberOrUndefined(formData.applicationFee.general);
// //       apiPayload.applicationFee.obc = toNumberOrUndefined(formData.applicationFee.obc);
// //       apiPayload.applicationFee.ews = toNumberOrUndefined(formData.applicationFee.ews);
// //       apiPayload.applicationFee.sc = toNumberOrUndefined(formData.applicationFee.sc);
// //       apiPayload.applicationFee.st = toNumberOrUndefined(formData.applicationFee.st);
// //       apiPayload.applicationFee.pwd = toNumberOrUndefined(formData.applicationFee.pwd);
// //       apiPayload.applicationFee.female = toNumberOrUndefined(formData.applicationFee.female);
// //       apiPayload.applicationFee.bothPapers = toNumberOrUndefined(formData.applicationFee.bothPapers);
// //     }
// //     if (apiPayload.eligibilityCriteria?.ageLimit) {
// //       apiPayload.eligibilityCriteria.ageLimit.min = toNumberOrUndefined(formData.eligibilityCriteria.ageLimit?.min);
// //       apiPayload.eligibilityCriteria.ageLimit.max = toNumberOrUndefined(formData.eligibilityCriteria.ageLimit?.max);
// //     }
// //     if (apiPayload.extraInfo?.counselingDetails) {
// //       apiPayload.extraInfo.counselingDetails.registrationFee = toNumberOrUndefined(formData.extraInfo.counselingDetails?.registrationFee);
// //       apiPayload.extraInfo.counselingDetails.seatAcceptanceFee = toNumberOrUndefined(formData.extraInfo.counselingDetails?.seatAcceptanceFee);
// //     }

// //     // Convert date strings to Dates
// //     const toDateOrNull = (dateStr?: string) => dateStr || null;
// //     apiPayload.postDate = toDateOrNull(formData.postDate);
// //     if (apiPayload.eligibilityCriteria?.ageLimit) {
// //       apiPayload.eligibilityCriteria.ageLimit.referenceDate = toDateOrNull(formData.eligibilityCriteria.ageLimit?.referenceDate);
// //     }
// //     if (apiPayload.importantDates) {
// //       apiPayload.importantDates.notificationDate = toDateOrNull(formData.importantDates.notificationDate);
// //       apiPayload.importantDates.applicationStart = toDateOrNull(formData.importantDates.applicationStart);
// //       apiPayload.importantDates.applicationEnd = toDateOrNull(formData.importantDates.applicationEnd);
// //       apiPayload.importantDates.feePaymentLastDate = toDateOrNull(formData.importantDates.feePaymentLastDate);
// //       apiPayload.importantDates.examCityDate = toDateOrNull(formData.importantDates.examCityDate);
// //       apiPayload.importantDates.admitCardDate = toDateOrNull(formData.importantDates.admitCardDate);
// //       apiPayload.importantDates.answerKeyDate = toDateOrNull(formData.importantDates.answerKeyDate);
// //       apiPayload.importantDates.resultDate = toDateOrNull(formData.importantDates.resultDate);
// //       if (apiPayload.importantDates.correctionWindow) {
// //         apiPayload.importantDates.correctionWindow.start = toDateOrNull(formData.importantDates.correctionWindow?.start);
// //         apiPayload.importantDates.correctionWindow.end = toDateOrNull(formData.importantDates.correctionWindow?.end);
// //       }
// //     }

// //     const method = editingAdmissionId ? 'PUT' : 'POST';
// //     const url = editingAdmissionId
// //       ? `${API_BASE_URL}/api/admissions/${editingAdmissionId}`
// //       : `${API_BASE_URL}/api/admissions`;

// //     try {
// //       const response = await fetch(url, {
// //         method: method,
// //         headers: authService.getAuthHeaders(),
// //         body: JSON.stringify(apiPayload),
// //       });

// //       if (!response.ok) {
// //         if (response.status === 401) {
// //           handleLogout();
// //           throw new Error('Session expired');
// //         }
// //         const errorData = await response.json();
// //         throw new Error(errorData.message || 'Failed to save admission');
// //       }

// //       const savedAdmission: any = await response.json();
// //       const normalizedAdmission = normalizeAdmission(savedAdmission);

// //       if (editingAdmissionId) {
// //         setAdmissions(admissions.map(ad =>
// //           ad.id === editingAdmissionId ? normalizedAdmission : ad
// //         ));
// //         setEditingAdmissionId(null);
// //         toast({ title: "Admission Updated Successfully" });
// //       } else {
// //         setAdmissions([...admissions, normalizedAdmission]);
// //         toast({ title: "Admission Posted Successfully" });
// //       }
// //     } catch (error: any) {
// //       console.error("Failed to save admission:", error);
// //       toast({
// //         title: "Error",
// //         description: error.message || "Could not save admission to server.",
// //         variant: "destructive",
// //       });
// //     }
// //   };

// //   // --- LOCAL: OTHER SUBMIT HANDLERS ---
// //   const onResultSubmit = (data: z.infer<typeof resultSchema>) => {
// //     if (editingResultId) {
// //       setResults(results.map(result => result.id === editingResultId ? { ...data, id: editingResultId } : result));
// //       setEditingResultId(null);
// //       toast({ title: "Result Updated Successfully" });
// //     } else {
// //       const newResult = { ...data, id: Date.now().toString() };
// //       setResults([...results, newResult]);
// //       toast({ title: "Result Posted Successfully" });
// //     }
// //     resultForm.reset();
// //   };

// //   const onAdmitCardSubmit = (data: z.infer<typeof admitCardSchema>) => {
// //     console.log("Admit Card Data:", data);
// //     toast({ title: "Admit Card Posted Successfully" });
// //     admitCardForm.reset();
// //   };

// //   const onAnswerKeySubmit = (data: z.infer<typeof answerKeySchema>) => {
// //     console.log("Answer Key Data:", data);
// //     toast({ title: "Answer Key Posted Successfully" });
// //     answerKeyForm.reset();
// //   };

// //   const onSyllabusSubmit = (data: z.infer<typeof syllabusSchema>) => {
// //     console.log("Syllabus Data:", data);
// //     toast({ title: "Syllabus Posted Successfully" });
// //     syllabusForm.reset();
// //   };

// //   const onDocumentSubmit = (data: z.infer<typeof documentSchema>) => {
// //     console.log("Document Data:", {
// //       ...data,
// //       services: data.services.split(",").map(s => s.trim())
// //     });
// //     toast({ title: "Document Posted Successfully" });
// //     documentForm.reset();
// //   };

// //   const onResourceSubmit = (data: z.infer<typeof resourceSchema>) => {
// //     console.log("Resource Data:", data);
// //     toast({ title: "Resource Posted Successfully" });
// //     resourceForm.reset();
// //   };

// //   // Delete Handlers with JWT Auth
// //   const handleDeleteJob = async (job: ComprehensiveJobData) => {
// //     const dbId = job.id;
// //     if (!dbId) {
// //       toast({ title: "Error", description: "Job has no valid ID to delete.", variant: "destructive" });
// //       return;
// //     }
// //     if (!authService.isAuthenticated()) {
// //       toast({ title: "Auth Error", description: "Please log in to delete.", variant: "destructive" });
// //       return;
// //     }

// //     try {
// //       const response = await fetch(`${API_BASE_URL}/api/jobs/${dbId}`, {
// //         method: 'DELETE',
// //         headers: authService.getAuthHeaders(),
// //       });

// //       if (!response.ok) {
// //         if (response.status === 401) {
// //           handleLogout();
// //           throw new Error('Session expired');
// //         }
// //         throw new Error('Failed to delete job');
// //       }

// //       setJobs(jobs.filter(j => j.id !== dbId));
// //       toast({ title: "Job Deleted", description: "The job has been removed." });

// //     } catch (error: any) {
// //       console.error("Failed to delete job:", error);
// //       toast({
// //         title: "Error",
// //         description: error.message || "Could not delete job.",
// //         variant: "destructive",
// //       });
// //     }
// //   };

// //   const handleDeleteAdmission = async (admission: ComprehensiveAdmissionData) => {
// //     const dbId = admission.id;
// //     if (!dbId) {
// //       toast({ title: "Error", description: "Admission has no valid ID to delete.", variant: "destructive" });
// //       return;
// //     }
// //     if (!authService.isAuthenticated()) {
// //       toast({ title: "Auth Error", description: "Please log in to delete.", variant: "destructive" });
// //       return;
// //     }

// //     try {
// //       const response = await fetch(`${API_BASE_URL}/api/admissions/${dbId}`, {
// //         method: 'DELETE',
// //         headers: authService.getAuthHeaders(),
// //       });

// //       if (!response.ok) {
// //         if (response.status === 401) {
// //           handleLogout();
// //           throw new Error('Session expired');
// //         }
// //         throw new Error('Failed to delete admission');
// //       }

// //       setAdmissions(admissions.filter(ad => ad.id !== dbId));
// //       toast({ title: "Admission Deleted", description: "The admission has been removed." });

// //     } catch (error: any) {
// //       console.error("Failed to delete admission:", error);
// //       toast({
// //         title: "Error",
// //         description: error.message || "Could not delete admission.",
// //         variant: "destructive",
// //       });
// //     }
// //   };

// //   // Login UI
// //   if (!isAuthenticated) {
// //     return (
// //       <div className="min-h-screen bg-gradient-to-br from-primary via-primary/90 to-accent flex items-center justify-center p-4">
// //         <Card className="w-full max-w-md">
// //           <CardHeader className="space-y-1">
// //             <CardTitle className="text-2xl font-bold text-center">Admin Login</CardTitle>
// //             <CardDescription className="text-center">
// //               Sign in to access the dashboard
// //             </CardDescription>
// //           </CardHeader>
// //           <CardContent>
// //             <Form {...loginForm}>
// //               <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-4">
// //                 <FormField 
// //                   control={loginForm.control} 
// //                   name="username" 
// //                   render={({ field }) => (
// //                     <FormItem>
// //                       <FormLabel>Username</FormLabel>
// //                       <FormControl>
// //                         <Input 
// //                           placeholder="Enter admin username" 
// //                           {...field} 
// //                         />
// //                       </FormControl>
// //                       <FormMessage />
// //                     </FormItem>
// //                   )} 
// //                 />
// //                 <FormField 
// //                   control={loginForm.control} 
// //                   name="password" 
// //                   render={({ field }) => (
// //                     <FormItem>
// //                       <FormLabel>Password</FormLabel>
// //                       <FormControl>
// //                         <Input 
// //                           placeholder="Enter password" 
// //                           type="password" 
// //                           {...field} 
// //                         />
// //                       </FormControl>
// //                       <FormMessage />
// //                     </FormItem>
// //                   )} 
// //                 />
// //                 <Button 
// //                   type="submit" 
// //                   className="w-full" 
// //                   disabled={isLoading}
// //                 >
// //                   {isLoading ? "Signing In..." : "Sign In"}
// //                 </Button>
// //                 {/* <div className="text-center text-sm text-muted-foreground">
// //                   <p>Default credentials: admin / your_password</p>
// //                 </div> */}
// //               </form>
// //             </Form>
// //           </CardContent>
// //         </Card>
// //       </div>
// //     );
// //   }

// //   const menuItems = [
// //     { id: "jobs", label: "Jobs", icon: Briefcase },
// //     { id: "admissions", label: "Admissions", icon: GraduationCap },
// //     { id: "results", label: "Results", icon: Trophy },
// //     { id: "admit-cards", label: "Admit Cards", icon: CreditCard },
// //     { id: "answer-keys", label: "Answer Keys", icon: Key },
// //     { id: "syllabus", label: "Syllabus", icon: BookOpen },
// //     { id: "documents", label: "Documents", icon: FileText },
// //     { id: "resources", label: "Resources", icon: Library },
// //     { id: "quiz", label: "Quiz Management", icon: ClipboardList },
// //   ];

// //   const SidebarMenuContent = () => (
// //     <>
// //       <div className="p-4 border-b">
// //         <div className="flex items-center gap-3 mb-2">
// //           <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
// //             <User className="h-5 w-5 text-primary" />
// //           </div>
// //           <div>
// //             <h2 className="text-lg font-semibold">Admin Dashboard</h2>
// //             <p className="text-sm text-muted-foreground">
// //               {adminProfile?.username || 'Admin'}
// //             </p>
// //           </div>
// //         </div>
// //       </div>
// //       <SidebarGroup>
// //         <SidebarGroupContent>
// //           <SidebarMenu>
// //             {menuItems.map((item) => (
// //               <SidebarMenuItem key={item.id}>
// //                 <SidebarMenuButton
// //                   isActive={activeSection === item.id}
// //                   onClick={() => setActiveSection(item.id)}
// //                 >
// //                   <item.icon className="h-4 w-4" />
// //                   <span>{item.label}</span>
// //                 </SidebarMenuButton>
// //               </SidebarMenuItem>
// //             ))}
// //           </SidebarMenu>
// //         </SidebarGroupContent>
// //       </SidebarGroup>
// //       <div className="mt-auto p-4 border-t">
// //         <Button variant="outline" className="w-full" onClick={handleLogout}>
// //           <LogOut className="h-4 w-4 mr-2" />
// //           Logout
// //         </Button>
// //       </div>
// //     </>
// //   );

// //   return (
// //     <SidebarProvider defaultOpen>
// //       <div className="min-h-screen flex w-full">
// //         {/* Desktop Sidebar */}
// //         <Sidebar className="hidden md:flex border-r">
// //           <SidebarContent>
// //             <SidebarMenuContent />
// //           </SidebarContent>
// //         </Sidebar>

// //         <SidebarInset className="flex-1">
// //           <div className="flex flex-col h-full">
// //             {/* Header with Mobile Menu */}
// //             <div className="bg-gradient-to-br from-primary via-primary/90 to-accent text-primary-foreground py-4 px-4 md:py-6 md:px-6">
// //               <div className="flex items-center gap-3">
// //                 {/* Mobile Hamburger Menu */}
// //                 <Sheet>
// //                   <SheetTrigger asChild>
// //                     <Button variant="ghost" size="icon" className="md:hidden text-primary-foreground hover:bg-primary-foreground/20">
// //                       <Menu className="h-5 w-5" />
// //                     </Button>
// //                   </SheetTrigger>
// //                   <SheetContent side="left" className="p-0 w-64">
// //                     <SidebarContent>
// //                       <SidebarMenuContent />
// //                     </SidebarContent>
// //                   </SheetContent>
// //                 </Sheet>
// //                 <div>
// //                   <h1 className="text-xl md:text-2xl font-bold">Content Management</h1>
// //                   <p className="text-sm text-primary-foreground/90">
// //                     Welcome back, {adminProfile?.username || 'Admin'}!
// //                   </p>
// //                 </div>
// //               </div>
// //             </div>

// //             <div className="flex-1 p-6 overflow-auto">
// //               {/* --- JOBS SECTION (API Connected) --- */}
// //               {activeSection === "jobs" && (
// //                 <>
// //                   <ComprehensiveJobForm
// //                     key={editingJobId || 'new-job'}
// //                     onSubmit={onJobSubmit}
// //                     defaultValues={editingJobId
// //                       ? jobs.find(job => job.id === editingJobId)
// //                       : undefined}
// //                   />

// //                   <CRUDList
// //                     title="Posted Jobs"
// //                     description="Manage all posted job listings"
// //                     items={jobs}
// //                     idKey="id"
// //                     onEdit={(job) => {
// //                       setEditingJobId(job.id!);
// //                     }}
// //                     onDelete={handleDeleteJob}
// //                     renderItem={(job) => (
// //                       <div>
// //                         <h4 className="font-semibold">{job.title}</h4>
// //                         <p className="text-sm text-muted-foreground">{job.organization}</p>
// //                         <p className="text-xs text-muted-foreground mt-1">
// //                           Posts: {String(job.totalPosts || 'N/A')} | Last Date: {job.importantDates?.applicationEnd}
// //                         </p>
// //                       </div>
// //                     )}
// //                   />
// //                 </>
// //               )}

// //               {/* --- RESULTS SECTION (Local State) --- */}
// //               {activeSection === "results" && (
// //                 <Card>
// //                   <CardHeader>
// //                     <CardTitle>Post New Result</CardTitle>
// //                     <CardDescription>Add a new exam result to the Results section</CardDescription>
// //                   </CardHeader>
// //                   <CardContent>
// //                     <Form {...resultForm}>
// //                       <form onSubmit={resultForm.handleSubmit(onResultSubmit)} className="space-y-4">
// //                         <FormField control={resultForm.control} name="title" render={({ field }) => (
// //                           <FormItem><FormLabel>Result Title</FormLabel><FormControl><Input placeholder="e.g., SSC CHSL Tier-1 Exam Result 2024" {...field} /></FormControl><FormMessage /></FormItem>
// //                         )} />
// //                         <FormField control={resultForm.control} name="organization" render={({ field }) => (
// //                           <FormItem><FormLabel>Organization</FormLabel><FormControl><Input placeholder="e.g., Staff Selection Commission" {...field} /></FormControl><FormMessage /></FormItem>
// //                         )} />
// //                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //                           <FormField control={resultForm.control} name="date" render={({ field }) => (
// //                             <FormItem><FormLabel>Release Date</FormLabel><FormControl><Input placeholder="e.g., 10 Nov 2024" {...field} /></FormControl><FormMessage /></FormItem>
// //                           )} />
// //                           <FormField control={resultForm.control} name="status" render={({ field }) => (
// //                             <FormItem><FormLabel>Status (Optional)</FormLabel><FormControl><Input placeholder="e.g., Latest, New" {...field} /></FormControl><FormMessage /></FormItem>
// //                           )} />
// //                         </div>
// //                         <Button type="submit" className="w-full">Post Result</Button>
// //                       </form>
// //                     </Form>
// //                   </CardContent>
// //                 </Card>
// //               )}

// //               {/* --- ADMIT CARDS SECTION (Local State) --- */}
// //               {activeSection === "admit-cards" && (
// //                 <Card>
// //                   <CardHeader>
// //                     <CardTitle>Post New Admit Card</CardTitle>
// //                     <CardDescription>Add a new admit card notification</CardDescription>
// //                   </CardHeader>
// //                   <CardContent>
// //                     <Form {...admitCardForm}>
// //                       <form onSubmit={admitCardForm.handleSubmit(onAdmitCardSubmit)} className="space-y-4">
// //                         <FormField control={admitCardForm.control} name="title" render={({ field }) => (
// //                           <FormItem><FormLabel>Admit Card Title</FormLabel><FormControl><Input placeholder="e.g., SSC MTS Admit Card 2024" {...field} /></FormControl><FormMessage /></FormItem>
// //                         )} />
// //                         <FormField control={admitCardForm.control} name="organization" render={({ field }) => (
// //                           <FormItem><FormLabel>Organization</FormLabel><FormControl><Input placeholder="e.g., Staff Selection Commission" {...field} /></FormControl><FormMessage /></FormItem>
// //                         )} />
// //                         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
// //                           <FormField control={admitCardForm.control} name="date" render={({ field }) => (
// //                             <FormItem><FormLabel>Release Date</FormLabel><FormControl><Input placeholder="e.g., 10 Nov 2024" {...field} /></FormControl><FormMessage /></FormItem>
// //                           )} />
// //                           <FormField control={admitCardForm.control} name="examDate" render={({ field }) => (
// //                             <FormItem><FormLabel>Exam Date</FormLabel><FormControl><Input placeholder="e.g., 30 Nov 2024" {...field} /></FormControl><FormMessage /></FormItem>
// //                           )} />
// //                           <FormField control={admitCardForm.control} name="status" render={({ field }) => (
// //                             <FormItem><FormLabel>Status</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue placeholder="Select status" /></SelectTrigger></FormControl><SelectContent><SelectItem value="Available">Available</SelectItem><SelectItem value="Coming Soon">Coming Soon</SelectItem></SelectContent></Select><FormMessage /></FormItem>
// //                           )} />
// //                         </div>
// //                         <Button type="submit" className="w-full">Post Admit Card</Button>
// //                       </form>
// //                     </Form>
// //                   </CardContent>
// //                 </Card>
// //               )}

// //               {/* --- ANSWER KEYS SECTION (Local State) --- */}
// //               {activeSection === "answer-keys" && (
// //                 <Card>
// //                   <CardHeader>
// //                     <CardTitle>Post New Answer Key</CardTitle>
// //                     <CardDescription>Add a new answer key notification</CardDescription>
// //                   </CardHeader>
// //                   <CardContent>
// //                     <Form {...answerKeyForm}>
// //                       <form onSubmit={answerKeyForm.handleSubmit(onAnswerKeySubmit)} className="space-y-4">
// //                         <FormField control={answerKeyForm.control} name="title" render={({ field }) => (
// //                           <FormItem><FormLabel>Answer Key Title</FormLabel><FormControl><Input placeholder="e.g., SSC CGL Tier-1 2024 Answer Key" {...field} /></FormControl><FormMessage /></FormItem>
// //                         )} />
// //                         <FormField control={answerKeyForm.control} name="organization" render={({ field }) => (
// //                           <FormItem><FormLabel>Organization</FormLabel><FormControl><Input placeholder="e.g., Staff Selection Commission" {...field} /></FormControl><FormMessage /></FormItem>
// //                         )} />
// //                         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
// //                           <FormField control={answerKeyForm.control} name="date" render={({ field }) => (
// //                             <FormItem><FormLabel>Release Date</FormLabel><FormControl><Input placeholder="e.g., 08 Nov 2024" {...field} /></FormControl><FormMessage /></FormItem>
// //                           )} />
// //                           <FormField control={answerKeyForm.control} name="examDate" render={({ field }) => (
// //                             <FormItem><FormLabel>Exam Date</FormLabel><FormControl><Input placeholder="e.g., 16 Sep - 26 Sep 2024" {...field} /></FormControl><FormMessage /></FormItem>
// //                           )} />
// //                           <FormField control={answerKeyForm.control} name="status" render={({ field }) => (
// //                             <FormItem><FormLabel>Status (Optional)</FormLabel><FormControl><Input placeholder="e.g., Latest, New" {...field} /></FormControl><FormMessage /></FormItem>
// //                           )} />
// //                         </div>
// //                         <Button type="submit" className="w-full">Post Answer Key</Button>
// //                       </form>
// //                     </Form>
// //                   </CardContent>
// //                 </Card>
// //               )}

// //               {/* --- SYLLABUS SECTION (Local State) --- */}
// //               {activeSection === "syllabus" && (
// //                 <Card>
// //                   <CardHeader>
// //                     <CardTitle>Post New Syllabus</CardTitle>
// //                     <CardDescription>Add a new exam syllabus</CardDescription>
// //                   </CardHeader>
// //                   <CardContent>
// //                     <Form {...syllabusForm}>
// //                       <form onSubmit={syllabusForm.handleSubmit(onSyllabusSubmit)} className="space-y-4">
// //                         <FormField control={syllabusForm.control} name="title" render={({ field }) => (
// //                           <FormItem><FormLabel>Syllabus Title</FormLabel><FormControl><Input placeholder="e.g., UPSC Civil Services 2025 Complete Syllabus" {...field} /></FormControl><FormMessage /></FormItem>
// //                         )} />
// //                         <FormField control={syllabusForm.control} name="description" render={({ field }) => (
// //                           <FormItem><FormLabel>Description</FormLabel><FormControl><Textarea placeholder="e.g., Prelims (GS + CSAT), Mains (9 Papers) & Interview" className="min-h-[80px]" {...field} /></FormControl><FormMessage /></FormItem>
// //                         )} />
// //                         <FormField control={syllabusForm.control} name="organization" render={({ field }) => (
// //                           <FormItem><FormLabel>Organization</FormLabel><FormControl><Input placeholder="e.g., Union Public Service Commission" {...field} /></FormControl><FormMessage /></FormItem>
// //                         )} />
// //                         <FormField control={syllabusForm.control} name="subjects" render={({ field }) => (
// //                           <FormItem><FormLabel>Subjects/Topics</FormLabel><FormControl><Textarea placeholder="e.g., General Studies (History, Polity, Geography), Essay, Optional Subject" className="min-h-[80px]" {...field} /></FormControl><FormMessage /></FormItem>
// //                         )} />
// //                         <Button type="submit" className="w-full">Post Syllabus</Button>
// //                       </form>
// //                     </Form>
// //                   </CardContent>
// //                 </Card>
// //               )}

// //               {/* --- ADMISSIONS SECTION (API Connected) --- */}
// //               {activeSection === "admissions" && (
// //                 <>
// //                   <ComprehensiveAdmissionForm
// //                     key={editingAdmissionId || 'new-admission'}
// //                     onSubmit={onAdmissionSubmit}
// //                     defaultValues={editingAdmissionId
// //                       ? admissions.find(ad => ad.id === editingAdmissionId)
// //                       : undefined}
// //                   />

// //                   <CRUDList
// //                     title="Posted Admissions"
// //                     description="Manage all posted admission listings"
// //                     items={admissions}
// //                     idKey="id"
// //                     onEdit={(admission) => {
// //                       setEditingAdmissionId(admission.id!);
// //                     }}
// //                     onDelete={handleDeleteAdmission}
// //                     renderItem={(admission) => (
// //                       <div>
// //                         <h4 className="font-semibold">{admission.title}</h4>
// //                         <p className="text-sm text-muted-foreground">{admission.organization}</p>
// //                         <p className="text-xs text-muted-foreground mt-1">
// //                           Type: {admission.admissionType} | Last Date: {admission.importantDates?.applicationEnd}
// //                         </p>
// //                       </div>
// //                     )}
// //                   />
// //                 </>
// //               )}

// //               {/* --- DOCUMENTS SECTION (Local State) --- */}
// //               {activeSection === "documents" && (
// //                 <Card>
// //                   <CardHeader>
// //                     <CardTitle>Post New Document Service</CardTitle>
// //                     <CardDescription>Add a new document service link</CardDescription>
// //                   </CardHeader>
// //                   <CardContent>
// //                     <Form {...documentForm}>
// //                       <form onSubmit={documentForm.handleSubmit(onDocumentSubmit)} className="space-y-4">
// //                         <FormField control={documentForm.control} name="category" render={({ field }) => (
// //                           <FormItem><FormLabel>Category</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger></FormControl><SelectContent><SelectItem value="identity">Identity</SelectItem><SelectItem value="education">Education</SelectItem><SelectItem value="employment">Employment</SelectItem><SelectItem value="transport">Transport</SelectItem><SelectItem value="property">Property</SelectItem><SelectItem value="health">Health</SelectItem><SelectItem value="other">Other Services</SelectItem></SelectContent></Select><FormMessage /></FormItem>
// //                         )} />
// //                         <FormField control={documentForm.control} name="title" render={({ field }) => (
// //                           <FormItem><FormLabel>Document Title</FormLabel><FormControl><Input placeholder="e.g., Aadhaar Card Services" {...field} /></FormControl><FormMessage /></FormItem>
// //                         )} />
// //                         <FormField control={documentForm.control} name="description" render={({ field }) => (
// //                           <FormItem><FormLabel>Description</FormLabel><FormControl><Input placeholder="e.g., Update details, download e-Aadhaar" {...field} /></FormControl><FormMessage /></FormItem>
// //                         )} />
// //                         <FormField control={documentForm.control} name="url" render={({ field }) => (
// //                           <FormItem><FormLabel>URL</FormLabel><FormControl><Input placeholder="e.g., https://uidai.gov.in/" {...field} /></FormControl><FormMessage /></FormItem>
// //                         )} />
// //                         <FormField control={documentForm.control} name="services" render={({ field }) => (
// //                           <FormItem><FormLabel>Services (comma-separated)</FormLabel><FormControl><Textarea placeholder="e.g., Update Aadhaar, Download e-Aadhaar, Check Status" className="min-h-[80px]" {...field} /></FormControl><FormMessage /></FormItem>
// //                         )} />
// //                         <Button type="submit" className="w-full">Post Document Service</Button>
// //                       </form>
// //                     </Form>
// //                   </CardContent>
// //                 </Card>
// //               )}

// //               {/* --- RESOURCES SECTION (Local State) --- */}
// //               {activeSection === "resources" && (
// //                 <Card>
// //                   <CardHeader>
// //                     <CardTitle>Post New Resource</CardTitle>
// //                     <CardDescription>Add a new educational resource</CardDescription>
// //                   </CardHeader>
// //                   <CardContent>
// //                     <Form {...resourceForm}>
// //                       <form onSubmit={resourceForm.handleSubmit(onResourceSubmit)} className="space-y-4">
// //                         <FormField control={resourceForm.control} name="category" render={({ field }) => (
// //                           <FormItem><FormLabel>Category</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger></FormControl><SelectContent><SelectItem value="upsc-coaching">UPSC Resources</SelectItem><SelectItem value="ssc-banking">SSC & Banking</SelectItem><SelectItem value="engineering-medical">JEE & NEET</SelectItem><SelectItem value="state-exams">State PSC & Others</SelectItem></SelectContent></Select><FormMessage /></FormItem>
// //                         )} />
// //                         <FormField control={resourceForm.control} name="title" render={({ field }) => (
// //                           <FormItem><FormLabel>Resource Title</FormLabel><FormControl><Input placeholder="e.g., BYJU'S IAS Coaching" {...field} /></FormControl><FormMessage /></FormItem>
// //                         )} />
// //                         <FormField control={resourceForm.control} name="description" render={({ field }) => (
// //                           <FormItem><FormLabel>Description</FormLabel><FormControl><Textarea placeholder="e.g., Comprehensive UPSC preparation with live classes" className="min-h-[80px]" {...field} /></FormControl><FormMessage /></FormItem>
// //                         )} />
// //                         <FormField control={resourceForm.control} name="link" render={({ field }) => (
// //                           <FormItem><FormLabel>Link</FormLabel><FormControl><Input placeholder="e.g., https://byjus.com/ias/" {...field} /></FormControl><FormMessage /></FormItem>
// //                         )} />
// //                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //                           <FormField control={resourceForm.control} name="institute" render={({ field }) => (
// //                             <FormItem><FormLabel>Institute Name</FormLabel><FormControl><Input placeholder="e.g., BYJU'S" {...field} /></FormControl><FormMessage /></FormItem>
// //                           )} />
// //                           <FormField control={resourceForm.control} name="badge" render={({ field }) => (
// //                             <FormItem><FormLabel>Badge (Optional)</FormLabel><FormControl><Input placeholder="e.g., Popular, New, Updated" {...field} /></FormControl><FormMessage /></FormItem>
// //                           )} />
// //                         </div>
// //                         <Button type="submit" className="w-full">Post Resource</Button>
// //                       </form>
// //                     </Form>
// //                   </CardContent>
// //                 </Card>
// //               )}

// //               {/* --- QUIZ SECTION --- */}
// //               {activeSection === "quiz" && <QuizManagement />}
// //             </div>
// //           </div>
// //         </SidebarInset>
// //       </div>
// //     </SidebarProvider>
// //   );
// // };

// // export default Dashboard;

// import { useState, useEffect } from "react";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import * as z from "zod";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { useToast } from "@/hooks/use-toast";
// import {
//   Sidebar,
//   SidebarContent,
//   SidebarGroup,
//   SidebarGroupContent,
//   SidebarMenu,
//   SidebarMenuButton,
//   SidebarMenuItem,
//   SidebarProvider,
//   SidebarInset,
// } from "@/components/ui/sidebar";
// import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
// import {
//   Briefcase,
//   Trophy,
//   CreditCard,
//   Key,
//   BookOpen,
//   GraduationCap,
//   FileText,
//   Library,
//   LogOut,
//   Menu,
//   ClipboardList,
//   User,
//   Plus,
//   X
// } from "lucide-react";
// import { QuizManagement } from "@/components/QuizManagement";
// import { CRUDList } from "@/components/CRUDList";
// import { ComprehensiveJobForm } from "@/components/ComprehensiveJobForm";
// import { ComprehensiveAdmissionForm } from "@/components/ComprehensiveAdmissionForm";

// // --- Environment Variables ---
// const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

// // --- Auth Service ---
// const authService = {
//   setToken: (token: string) => {
//     localStorage.setItem('admin_token', token);
//   },

//   getToken: () => {
//     return localStorage.getItem('admin_token');
//   },

//   removeToken: () => {
//     localStorage.removeItem('admin_token');
//   },

//   getAuthHeaders: () => {
//     const token = authService.getToken();
//     return token ? {
//       'Authorization': `Bearer ${token}`,
//       'Content-Type': 'application/json'
//     } : { 'Content-Type': 'application/json' };
//   },

//   isAuthenticated: () => {
//     return !!authService.getToken();
//   },

//   async login(credentials: { username: string; password: string }) {
//     const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(credentials),
//     });

//     if (!response.ok) {
//       const error = await response.json();
//       throw new Error(error.message || 'Login failed');
//     }

//     const data = await response.json();

//     if (data.success && data.token) {
//       authService.setToken(data.token);
//     }

//     return data;
//   },

//   async logout() {
//     const token = authService.getToken();
//     if (token) {
//       try {
//         await fetch(`${API_BASE_URL}/api/auth/logout`, {
//           method: 'POST',
//           headers: {
//             'Authorization': `Bearer ${token}`,
//           },
//         });
//       } catch (error) {
//         console.error('Logout API call failed:', error);
//       }
//     }
//     authService.removeToken();
//   },

//   async getProfile() {
//     const token = authService.getToken();
//     if (!token) throw new Error('No token found');

//     const response = await fetch(`${API_BASE_URL}/api/auth/me`, {
//       headers: {
//         'Authorization': `Bearer ${token}`,
//       },
//     });

//     if (!response.ok) {
//       if (response.status === 401) {
//         authService.removeToken();
//       }
//       const error = await response.json();
//       throw new Error(error.message || 'Failed to get profile');
//     }

//     return response.json();
//   },
// };

// // Login Schema
// const loginSchema = z.object({
//   username: z.string().min(1, "Username is required"),
//   password: z.string().min(1, "Password is required"),
// });

// // --- COMPREHENSIVE JOB SCHEMA (Matches Form) ---
// const jobSchema = z.object({
//   jobId: z.string().min(1, "Job ID is required"),
//   title: z.string().min(5, "Title must be at least 5 characters"),
//   postDate: z.string().min(1, "Post date is required"),
//   organization: z.string().min(3, "Organization name is required"),
//   advertisementNo: z.string().optional(),
//   category: z.enum(["State Govt", "Central Govt", "Defence", "Police", "Other"]),
//   jobType: z.string().optional(),
//   location: z.string().min(2, "Location required"),
//   totalPosts: z.coerce.number().optional().or(z.literal('')),
//   postDetails: z.array(z.object({
//     postName: z.string().min(1, "Post name is required"),
//     numberOfPosts: z.coerce.number().optional().or(z.literal('')),
//     eligibility: z.string().optional(),
//   })).optional(),
//   eligibilityCriteria: z.object({
//     education: z.string().min(3, "Education qualification is required"),
//     ageLimit: z.object({
//       min: z.coerce.number().optional().or(z.literal('')),
//       max: z.coerce.number().optional().or(z.literal('')),
//       referenceDate: z.string().optional(),
//       additionalAgeRules: z.array(z.string()).optional(),
//       ageRelaxationRules: z.string().optional(),
//     }).optional(),
//     additionalCertifications: z.string().optional(),
//   }),
//   eligibilityDetails: z.array(z.object({
//     qualification: z.string().min(1, "Qualification is required"),
//     minMarks: z.coerce.number().optional().or(z.literal('')),
//     remark: z.string().optional(),
//   })).optional(),
//   importantDates: z.object({
//     notificationDate: z.string().optional(),
//     applicationStart: z.string().min(1, "Application start date required"),
//     applicationEnd: z.string().min(1, "Application end date required"),
//     feePaymentLastDate: z.string().optional(),
//     correctionWindow: z.object({
//       start: z.string().optional(),
//       end: z.string().optional(),
//     }).optional(),
//     examDate: z.string().optional(),
//     admitCardDate: z.string().optional(),
//     answerKeyDate: z.string().optional(),
//     resultDate: z.string().optional(),
//     scoreCardDate: z.string().optional(),
//     physicalTestDate: z.string().optional(),
//     documentVerificationDate: z.string().optional(),
//   }),
//   applicationFee: z.object({
//     general: z.coerce.number().optional().or(z.literal('')),
//     obc: z.coerce.number().optional().or(z.literal('')),
//     sc: z.coerce.number().optional().or(z.literal('')),
//     st: z.coerce.number().optional().or(z.literal('')),
//     ews: z.coerce.number().optional().or(z.literal('')),
//     female: z.coerce.number().optional().or(z.literal('')),
//     correctionCharge: z.coerce.number().optional().or(z.literal('')),
//     paymentModes: z.string().optional(),
//   }),
//   selectionProcess: z.string().optional(),
//   links: z.object({
//     officialWebsite: z.string().url("Must be a valid URL").optional().or(z.literal('')),
//     applyOnline: z.string().url("Must be a valid URL").optional().or(z.literal('')),
//     notificationPDF: z.string().url("Must be a valid URL").optional().or(z.literal('')),
//     admitCard: z.string().url("Must be a valid URL").optional().or(z.literal('')),
//     result: z.string().url("Must be a valid URL").optional().or(z.literal('')),
//     answerKey: z.string().url("Must be a valid URL").optional().or(z.literal('')),
//     scoreCard: z.string().url("Must be a valid URL").optional().or(z.literal('')),
//     cutoff: z.string().url("Must be a valid URL").optional().or(z.literal('')),
//     correctionLink: z.string().url("Must be a valid URL").optional().or(z.literal('')),
//   }),
//   status: z.object({
//     isApplicationOpen: z.boolean().default(false),
//     isAdmitCardAvailable: z.boolean().default(false),
//     isAnswerKeyReleased: z.boolean().default(false),
//     isResultDeclared: z.boolean().default(false),
//     isCorrectionWindowOpen: z.boolean().default(false),
//     isPublished: z.boolean().default(true),
//     isArchived: z.boolean().default(false),
//   }),
//   extraInfo: z.object({
//     documentsRequired: z.string().optional(),
//     faqs: z.array(z.object({
//       question: z.string().min(1, "Question is required"),
//       answer: z.string().min(1, "Answer is required"),
//     })).optional(),
//   }).optional(),
//   socialLinks: z.object({
//     twitter: z.string().url("Must be a valid URL").optional().or(z.literal('')),
//     telegram: z.string().url("Must be a valid URL").optional().or(z.literal('')),
//     facebook: z.string().url("Must be a valid URL").optional().or(z.literal('')),
//   }).optional(),
// });

// type ComprehensiveJobData = z.infer<typeof jobSchema> & { customFields?: Record<string, any>, id?: string, _id?: string };

// // --- COMPREHENSIVE ADMISSION SCHEMA ---
// const admissionSchema = z.object({
//   admissionId: z.string().min(1, "Admission ID is required"),
//   title: z.string().min(5, "Title must be at least 5 characters"),
//   postDate: z.string().min(1, "Post date is required"),
//   organization: z.string().min(3, "Organization name is required"),
//   examName: z.string().optional(),
//   session: z.string().optional(),
//   category: z.enum(["Engineering Entrance", "Teaching Entrance", "Polytechnic Entrance", "Medical Entrance", "Other"]),
//   admissionType: z.enum(["Online Form", "Admit Card", "Result", "Answer Key", "Counselling"]),
//   totalSeats: z.coerce.number().optional().or(z.literal('')),
//   courseDetails: z.array(z.object({
//     courseName: z.string().optional(),
//     duration: z.string().optional(),
//     eligibility: z.string().optional(),
//     groupCode: z.string().optional(),
//     qualificationRequired: z.string().optional(),
//   })).optional(),
//   eligibilityCriteria: z.object({
//     education: z.string().min(5, "Educational eligibility required"),
//     ageLimit: z.object({
//       min: z.coerce.number().optional().or(z.literal('')),
//       max: z.coerce.number().optional().or(z.literal('')),
//       referenceDate: z.string().optional(),
//       relaxationDetails: z.string().optional(),
//     }).optional(),
//     additionalRequirements: z.string().optional(),
//   }),
//   importantDates: z.object({
//     notificationDate: z.string().optional(),
//     applicationStart: z.string().min(1, "Application start date required"),
//     applicationEnd: z.string().min(1, "Application end date required"),
//     feePaymentLastDate: z.string().optional(),
//     correctionWindow: z.object({
//       start: z.string().optional(),
//       end: z.string().optional(),
//     }).optional(),
//     examCityDate: z.string().optional(),
//     examDate: z.string().optional(),
//     admitCardDate: z.string().optional(),
//     answerKeyDate: z.string().optional(),
//     resultDate: z.string().optional(),
//     counsellingDate: z.string().optional(),
//   }),
//   applicationFee: z.object({
//     general: z.coerce.number().optional().or(z.literal('')),
//     obc: z.coerce.number().optional().or(z.literal('')),
//     ews: z.coerce.number().optional().or(z.literal('')),
//     sc: z.coerce.number().optional().or(z.literal('')),
//     st: z.coerce.number().optional().or(z.literal('')),
//     pwd: z.coerce.number().optional().or(z.literal('')),
//     female: z.coerce.number().optional().or(z.literal('')),
//     bothPapers: z.coerce.number().optional().or(z.literal('')),
//     paymentModes: z.string().optional(),
//   }),
//   process: z.object({
//     mode: z.string().optional(),
//     selectionSteps: z.string().optional(),
//   }).optional(),
//   links: z.object({
//     officialWebsite: z.string().url("Must be a valid URL").optional().or(z.literal('')),
//     applyOnline: z.string().url("Must be a valid URL").optional().or(z.literal('')),
//     notificationPDF: z.string().url("Must be a valid URL").optional().or(z.literal('')),
//     informationBulletin: z.string().url("Must be a valid URL").optional().or(z.literal('')),
//     admitCard: z.string().url("Must be a valid URL").optional().or(z.literal('')),
//     answerKey: z.string().url("Must be a valid URL").optional().or(z.literal('')),
//     result: z.string().url("Must be a valid URL").optional().or(z.literal('')),
//     scoreCard: z.string().url("Must be a valid URL").optional().or(z.literal('')),
//     counsellingPortal: z.string().url("Must be a valid URL").optional().or(z.literal('')),
//     correctionLink: z.string().url("Must be a valid URL").optional().or(z.literal('')),
//   }),
//   status: z.object({
//     isApplicationOpen: z.boolean().default(false),
//     isCorrectionWindowOpen: z.boolean().default(false),
//     isAdmitCardAvailable: z.boolean().default(false),
//     isAnswerKeyReleased: z.boolean().default(false),
//     isResultDeclared: z.boolean().default(false),
//     isCounsellingActive: z.boolean().default(false),
//   }),
//   extraInfo: z.object({
//     documentsRequired: z.string().optional(),
//     syllabusTopics: z.string().optional(),
//     examPattern: z.string().optional(),
//     helpdesk: z.object({
//       phone: z.string().optional(),
//       email: z.string().email("Must be a valid email").optional().or(z.literal('')),
//     }).optional(),
//     counselingDetails: z.object({
//       registrationFee: z.coerce.number().optional().or(z.literal('')),
//       seatAcceptanceFee: z.coerce.number().optional().or(z.literal('')),
//       steps: z.string().optional(),
//     }).optional(),
//     cutoffMarks: z.array(z.object({
//       category: z.string().optional(),
//       expected: z.string().optional(),
//     })).optional(),
//     faqs: z.array(z.object({
//       question: z.string().min(1, "Question is required"),
//       answer: z.string().min(1, "Answer is required"),
//     })).optional(),
//   }).optional(),
// });

// type ComprehensiveAdmissionData = z.infer<typeof admissionSchema> & { customFields?: Record<string, any>, id?: string, _id?: string };

// // --- OTHER SCHEMAS (LOCAL STATE) ---
// const resultSchema = z.object({
//   title: z.string().min(5, "Title must be at least 5 characters"),
//   organization: z.string().min(3, "Organization name is required"),
//   date: z.string().min(1, "Date is required"),
//   status: z.string().optional(),
// });

// const admitCardSchema = z.object({
//   title: z.string().min(5, "Title must be at least 5 characters"),
//   organization: z.string().min(3, "Organization name is required"),
//   date: z.string().min(1, "Release date is required"),
//   examDate: z.string().min(1, "Exam date is required"),
//   status: z.string().min(1, "Status is required"),
// });

// const answerKeySchema = z.object({
//   title: z.string().min(5, "Title must be at least 5 characters"),
//   organization: z.string().min(3, "Organization name is required"),
//   date: z.string().min(1, "Release date is required"),
//   examDate: z.string().min(1, "Exam date is required"),
//   status: z.string().optional(),
// });

// const syllabusSchema = z.object({
//   title: z.string().min(5, "Title must be at least 5 characters"),
//   description: z.string().min(10, "Description must be at least 10 characters"),
//   organization: z.string().min(3, "Organization name is required"),
//   subjects: z.string().min(5, "Subjects information is required"),
// });

// const documentSchema = z.object({
//   category: z.string().min(1, "Category is required"),
//   title: z.string().min(5, "Title must be at least 5 characters"),
//   description: z.string().min(10, "Description must be at least 10 characters"),
//   url: z.string().url("Must be a valid URL"),
//   services: z.string().min(5, "Services information is required (comma-separated)"),
// });

// const resourceSchema = z.object({
//   category: z.string().min(1, "Category is required"),
//   title: z.string().min(5, "Title must be at least 5 characters"),
//   description: z.string().min(10, "Description must be at least 10 characters"),
//   link: z.string().url("Must be a valid URL"),
//   institute: z.string().min(2, "Institute name is required"),
//   badge: z.string().optional(),
// });

// // --- HELPER FUNCTIONS ---
// const formatDateForInput = (dateString?: string | Date) => {
//   if (!dateString) return "";
//   try {
//     return new Date(dateString).toISOString().split('T')[0];
//   } catch (e) {
//     return "";
//   }
// };

// const splitCsv = (input?: string | number | string[] | number[]): string[] => {
//   if (!input) return [];
//   if (Array.isArray(input)) {
//     return input.map(item => String(item).trim()).filter(Boolean);
//   }
//   const str = String(input);
//   if (str.trim() === "") return [];
//   return str.split(',').map(s => s.trim()).filter(Boolean);
// };

// const toNumberOrUndefined = (val: string | number | undefined) => {
//   if (val === "" || val === undefined) return undefined;
//   const num = Number(val);
//   return isNaN(num) ? undefined : num;
// };

// const toCsv = (arr?: string[] | number[]) => {
//   if (!arr || arr.length === 0) return "";
//   return arr.join(', ');
// };

// const toStringOrEmpty = (val: any) => {
//   return val === null || val === undefined ? "" : String(val);
// };

// const toFormNumber = (val: any): number | "" | undefined => {
//   if (val === null || val === undefined) return "";
//   if (val === "") return "";
//   const num = Number(val);
//   return isNaN(num) ? "" : num;
// };

// // --- NORMALIZE JOB (for form) ---
// const normalizeJob = (job: any): ComprehensiveJobData => {
//   const dbId = job.id || job._id;
//   const { _id, ...rest } = job;

//   const data: ComprehensiveJobData = {
//     ...rest,
//     id: String(dbId),
//     eligibilityCriteria: { ...job.eligibilityCriteria },
//     importantDates: { ...job.importantDates },
//     applicationFee: { ...job.applicationFee },
//     links: { ...job.links },
//     status: { ...job.status },
//     extraInfo: { ...job.extraInfo },
//     socialLinks: { ...job.socialLinks },
//   };

//   // Convert array fields to comma-separated strings
//   data.selectionProcess = toCsv(job.selectionProcess as string[]);
//   if (data.eligibilityCriteria) {
//     data.eligibilityCriteria.additionalCertifications = toCsv(job.eligibilityCriteria.additionalCertifications as string[]);
//   }
//   if (data.applicationFee) {
//     data.applicationFee.paymentModes = toCsv(job.applicationFee.paymentModes as string[]);
//   }
//   if (data.extraInfo) {
//     data.extraInfo.documentsRequired = toCsv(job.extraInfo.documentsRequired as string[]);
//   }

//   // Format dates for input fields
//   data.postDate = formatDateForInput(data.postDate);
//   if (data.eligibilityCriteria?.ageLimit) {
//     data.eligibilityCriteria.ageLimit.referenceDate = formatDateForInput(data.eligibilityCriteria.ageLimit.referenceDate);
//   }
//   data.importantDates.notificationDate = formatDateForInput(data.importantDates.notificationDate);
//   data.importantDates.applicationStart = formatDateForInput(data.importantDates.applicationStart);
//   data.importantDates.applicationEnd = formatDateForInput(data.importantDates.applicationEnd);
//   data.importantDates.feePaymentLastDate = formatDateForInput(data.importantDates.feePaymentLastDate);
//   data.importantDates.admitCardDate = formatDateForInput(data.importantDates.admitCardDate);
//   data.importantDates.answerKeyDate = formatDateForInput(data.importantDates.answerKeyDate);
//   data.importantDates.resultDate = formatDateForInput(data.importantDates.resultDate);
//   data.importantDates.scoreCardDate = formatDateForInput(data.importantDates.scoreCardDate);
//   if (data.importantDates.correctionWindow) {
//     data.importantDates.correctionWindow.start = formatDateForInput(data.importantDates.correctionWindow.start);
//     data.importantDates.correctionWindow.end = formatDateForInput(data.importantDates.correctionWindow.end);
//   }

//   data.location = toStringOrEmpty(job.location);

//   // Use toFormNumber for fields that are (number | "" | undefined)
//   data.totalPosts = toFormNumber(job.totalPosts);
//   if (data.applicationFee) {
//     data.applicationFee.general = toFormNumber(job.applicationFee.general);
//     data.applicationFee.obc = toFormNumber(job.applicationFee.obc);
//     data.applicationFee.sc = toFormNumber(job.applicationFee.sc);
//     data.applicationFee.st = toFormNumber(job.applicationFee.st);
//     data.applicationFee.ews = toFormNumber(job.applicationFee.ews);
//     data.applicationFee.female = toFormNumber(job.applicationFee.female);
//     data.applicationFee.correctionCharge = toFormNumber(job.applicationFee.correctionCharge);
//   }
//   if (data.eligibilityCriteria?.ageLimit) {
//     data.eligibilityCriteria.ageLimit.min = toFormNumber(job.eligibilityCriteria.ageLimit.min);
//     data.eligibilityCriteria.ageLimit.max = toFormNumber(job.eligibilityCriteria.ageLimit.max);
//   }

//   return data as ComprehensiveJobData;
// };

// // --- NORMALIZE ADMISSION (for form) ---
// const normalizeAdmission = (admission: any): ComprehensiveAdmissionData => {
//   const dbId = admission.id || admission._id;
//   const { _id, ...rest } = admission;

//   const data: ComprehensiveAdmissionData = {
//     ...rest,
//     id: String(dbId),
//     eligibilityCriteria: { ...admission.eligibilityCriteria },
//     importantDates: { ...admission.importantDates },
//     applicationFee: { ...admission.applicationFee },
//     process: { ...admission.process },
//     links: { ...admission.links },
//     status: { ...admission.status },
//     extraInfo: { ...admission.extraInfo },
//   };

//   // Convert array fields to comma-separated strings
//   if (data.eligibilityCriteria) {
//     data.eligibilityCriteria.additionalRequirements = toCsv(admission.eligibilityCriteria.additionalRequirements as string[]);
//   }
//   if (data.applicationFee) {
//     data.applicationFee.paymentModes = toCsv(admission.applicationFee.paymentModes as string[]);
//   }
//   if (data.process) {
//     data.process.selectionSteps = toCsv(admission.process.selectionSteps as string[]);
//   }
//   if (data.extraInfo) {
//     data.extraInfo.documentsRequired = toCsv(admission.extraInfo.documentsRequired as string[]);
//     data.extraInfo.syllabusTopics = toCsv(admission.extraInfo.syllabusTopics as string[]);
//     data.extraInfo.examPattern = toCsv(admission.extraInfo.examPattern as string[]);
//     if (data.extraInfo.counselingDetails) {
//       data.extraInfo.counselingDetails.steps = toCsv(admission.extraInfo.counselingDetails.steps as string[]);
//     }
//   }

//   // Format dates for input fields
//   data.postDate = formatDateForInput(data.postDate);
//   if (data.eligibilityCriteria?.ageLimit) {
//     data.eligibilityCriteria.ageLimit.referenceDate = formatDateForInput(data.eligibilityCriteria.ageLimit.referenceDate);
//   }
//   if (data.importantDates) {
//     data.importantDates.notificationDate = formatDateForInput(data.importantDates.notificationDate);
//     data.importantDates.applicationStart = formatDateForInput(data.importantDates.applicationStart);
//     data.importantDates.applicationEnd = formatDateForInput(data.importantDates.applicationEnd);
//     data.importantDates.feePaymentLastDate = formatDateForInput(data.importantDates.feePaymentLastDate);
//     data.importantDates.examCityDate = formatDateForInput(data.importantDates.examCityDate);
//     data.importantDates.admitCardDate = formatDateForInput(data.importantDates.admitCardDate);
//     data.importantDates.answerKeyDate = formatDateForInput(data.importantDates.answerKeyDate);
//     data.importantDates.resultDate = formatDateForInput(data.importantDates.resultDate);
//     if (data.importantDates.correctionWindow) {
//       data.importantDates.correctionWindow.start = formatDateForInput(data.importantDates.correctionWindow.start);
//       data.importantDates.correctionWindow.end = formatDateForInput(data.importantDates.correctionWindow.end);
//     }
//   }

//   // Use toFormNumber for fields that are (number | "" | undefined)
//   data.totalSeats = toFormNumber(admission.totalSeats);
//   if (data.applicationFee) {
//     data.applicationFee.general = toFormNumber(admission.applicationFee.general);
//     data.applicationFee.obc = toFormNumber(admission.applicationFee.obc);
//     data.applicationFee.ews = toFormNumber(admission.applicationFee.ews);
//     data.applicationFee.sc = toFormNumber(admission.applicationFee.sc);
//     data.applicationFee.st = toFormNumber(admission.applicationFee.st);
//     data.applicationFee.pwd = toFormNumber(admission.applicationFee.pwd);
//     data.applicationFee.female = toFormNumber(admission.applicationFee.female);
//     data.applicationFee.bothPapers = toFormNumber(admission.applicationFee.bothPapers);
//   }
//   if (data.eligibilityCriteria?.ageLimit) {
//     data.eligibilityCriteria.ageLimit.min = toFormNumber(admission.eligibilityCriteria.ageLimit.min);
//     data.eligibilityCriteria.ageLimit.max = toFormNumber(admission.eligibilityCriteria.ageLimit.max);
//   }
//   if (data.extraInfo?.counselingDetails) {
//     data.extraInfo.counselingDetails.registrationFee = toFormNumber(admission.extraInfo.counselingDetails.registrationFee);
//     data.extraInfo.counselingDetails.seatAcceptanceFee = toFormNumber(admission.extraInfo.counselingDetails.seatAcceptanceFee);
//   }
//   if (data.courseDetails) data.courseDetails = data.courseDetails || [];
//   if (data.extraInfo) {
//     data.extraInfo.cutoffMarks = data.extraInfo.cutoffMarks || [];
//     data.extraInfo.faqs = data.extraInfo.faqs || [];
//   }

//   return data as ComprehensiveAdmissionData;
// };

// // --- UPDATED COMPREHENSIVE JOB FORM COMPONENT ---
// const ComprehensiveJobFormWithAgeRules = ({ 
//   onSubmit, 
//   defaultValues 
// }: { 
//   onSubmit: (data: ComprehensiveJobData) => void;
//   defaultValues?: ComprehensiveJobData;
// }) => {
//   const form = useForm<ComprehensiveJobData>({
//     resolver: zodResolver(jobSchema),
//     defaultValues: defaultValues || {
//       jobId: "",
//       title: "",
//       postDate: "",
//       organization: "",
//       advertisementNo: "",
//       category: "Other",
//       jobType: "",
//       location: "",
//       totalPosts: "",
//       postDetails: [],
//       eligibilityCriteria: {
//         education: "",
//         ageLimit: {
//           min: "",
//           max: "",
//           referenceDate: "",
//           additionalAgeRules: [],
//           ageRelaxationRules: ""
//         },
//         additionalCertifications: ""
//       },
//       eligibilityDetails: [],
//       importantDates: {
//         notificationDate: "",
//         applicationStart: "",
//         applicationEnd: "",
//         feePaymentLastDate: "",
//         correctionWindow: { start: "", end: "" },
//         examDate: "",
//         admitCardDate: "",
//         answerKeyDate: "",
//         resultDate: "",
//         scoreCardDate: "",
//         physicalTestDate: "",
//         documentVerificationDate: ""
//       },
//       applicationFee: {
//         general: "",
//         obc: "",
//         sc: "",
//         st: "",
//         ews: "",
//         female: "",
//         correctionCharge: "",
//         paymentModes: ""
//       },
//       selectionProcess: "",
//       links: {
//         officialWebsite: "",
//         applyOnline: "",
//         notificationPDF: "",
//         admitCard: "",
//         result: "",
//         answerKey: "",
//         scoreCard: "",
//         cutoff: "",
//         correctionLink: ""
//       },
//       status: {
//         isApplicationOpen: false,
//         isAdmitCardAvailable: false,
//         isAnswerKeyReleased: false,
//         isResultDeclared: false,
//         isCorrectionWindowOpen: false,
//         isPublished: true,
//         isArchived: false
//       },
//       extraInfo: {
//         documentsRequired: "",
//         faqs: []
//       },
//       socialLinks: {
//         twitter: "",
//         telegram: "",
//         facebook: ""
//       }
//     }
//   });

//   const [additionalAgeRules, setAdditionalAgeRules] = useState<string[]>(
//     defaultValues?.eligibilityCriteria?.ageLimit?.additionalAgeRules || []
//   );

//   const addAgeRule = () => {
//     setAdditionalAgeRules([...additionalAgeRules, ""]);
//   };

//   const updateAgeRule = (index: number, value: string) => {
//     const newRules = [...additionalAgeRules];
//     newRules[index] = value;
//     setAdditionalAgeRules(newRules);
//   };

//   const removeAgeRule = (index: number) => {
//     const newRules = additionalAgeRules.filter((_, i) => i !== index);
//     setAdditionalAgeRules(newRules);
//   };

//   const handleSubmit = (data: ComprehensiveJobData) => {
//     const formData = {
//       ...data,
//       eligibilityCriteria: {
//         ...data.eligibilityCriteria,
//         ageLimit: {
//           ...data.eligibilityCriteria.ageLimit,
//           additionalAgeRules: additionalAgeRules.filter(rule => rule.trim() !== "")
//         }
//       }
//     };
//     onSubmit(formData);
//   };

//   return (
//     <Card>
//       <CardHeader>
//         <CardTitle>
//           {defaultValues?.id ? "Edit Job" : "Post New Job"}
//         </CardTitle>
//         <CardDescription>
//           {defaultValues?.id 
//             ? "Update the job information below" 
//             : "Fill in all the details to post a new job opportunity"
//           }
//         </CardDescription>
//       </CardHeader>
//       <CardContent>
//         <Form {...form}>
//           <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            
//             {/* Basic Information */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <FormField control={form.control} name="jobId" render={({ field }) => (
//                 <FormItem><FormLabel>Job ID *</FormLabel><FormControl><Input placeholder="e.g., SSC001" {...field} /></FormControl><FormMessage /></FormItem>
//               )} />
//               <FormField control={form.control} name="title" render={({ field }) => (
//                 <FormItem><FormLabel>Job Title *</FormLabel><FormControl><Input placeholder="e.g., SSC CGL 2024" {...field} /></FormControl><FormMessage /></FormItem>
//               )} />
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <FormField control={form.control} name="postDate" render={({ field }) => (
//                 <FormItem><FormLabel>Post Date *</FormLabel><FormControl><Input type="date" {...field} /></FormControl><FormMessage /></FormItem>
//               )} />
//               <FormField control={form.control} name="organization" render={({ field }) => (
//                 <FormItem><FormLabel>Organization *</FormLabel><FormControl><Input placeholder="e.g., Staff Selection Commission" {...field} /></FormControl><FormMessage /></FormItem>
//               )} />
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//               <FormField control={form.control} name="advertisementNo" render={({ field }) => (
//                 <FormItem><FormLabel>Advertisement No</FormLabel><FormControl><Input placeholder="e.g., 01/2024" {...field} /></FormControl><FormMessage /></FormItem>
//               )} />
//               <FormField control={form.control} name="category" render={({ field }) => (
//                 <FormItem><FormLabel>Category</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger></FormControl><SelectContent><SelectItem value="State Govt">State Govt</SelectItem><SelectItem value="Central Govt">Central Govt</SelectItem><SelectItem value="Defence">Defence</SelectItem><SelectItem value="Police">Police</SelectItem><SelectItem value="Other">Other</SelectItem></SelectContent></Select><FormMessage /></FormItem>
//               )} />
//               <FormField control={form.control} name="jobType" render={({ field }) => (
//                 <FormItem><FormLabel>Job Type</FormLabel><FormControl><Input placeholder="e.g., Recruitment" {...field} /></FormControl><FormMessage /></FormItem>
//               )} />
//             </div>

//             <FormField control={form.control} name="location" render={({ field }) => (
//               <FormItem><FormLabel>Location *</FormLabel><FormControl><Input placeholder="e.g., All India" {...field} /></FormControl><FormMessage /></FormItem>
//             )} />

//             {/* Eligibility Criteria - Age Limit with Additional Age Rules */}
//             <div className="space-y-4 p-4 border rounded-lg">
//               <h3 className="text-lg font-semibold">Age Limit Criteria</h3>
              
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                 <FormField control={form.control} name="eligibilityCriteria.ageLimit.min" render={({ field }) => (
//                   <FormItem><FormLabel>Minimum Age</FormLabel><FormControl><Input type="number" placeholder="e.g., 18" {...field} /></FormControl><FormMessage /></FormItem>
//                 )} />
//                 <FormField control={form.control} name="eligibilityCriteria.ageLimit.max" render={({ field }) => (
//                   <FormItem><FormLabel>Maximum Age</FormLabel><FormControl><Input type="number" placeholder="e.g., 32" {...field} /></FormControl><FormMessage /></FormItem>
//                 )} />
//                 <FormField control={form.control} name="eligibilityCriteria.ageLimit.referenceDate" render={({ field }) => (
//                   <FormItem><FormLabel>Reference Date</FormLabel><FormControl><Input type="date" {...field} /></FormControl><FormMessage /></FormItem>
//                 )} />
//               </div>

//               {/* Additional Age Rules Section */}
//               <div className="space-y-3">
//                 <div className="flex items-center justify-between">
//                   <FormLabel>Additional Age Rules</FormLabel>
//                   <Button type="button" onClick={addAgeRule} size="sm" className="flex items-center gap-1">
//                     <Plus className="h-4 w-4" />
//                     Add Rule
//                   </Button>
//                 </div>
                
//                 {additionalAgeRules.map((rule, index) => (
//                   <div key={index} className="flex gap-2 items-start">
//                     <Input
//                       value={rule}
//                       onChange={(e) => updateAgeRule(index, e.target.value)}
//                       placeholder="e.g., Age relaxation for SC/ST: 5 years"
//                       className="flex-1"
//                     />
//                     <Button
//                       type="button"
//                       variant="outline"
//                       size="icon"
//                       onClick={() => removeAgeRule(index)}
//                       className="shrink-0"
//                     >
//                       <X className="h-4 w-4" />
//                     </Button>
//                   </div>
//                 ))}
                
//                 {additionalAgeRules.length === 0 && (
//                   <p className="text-sm text-muted-foreground">No additional age rules added yet.</p>
//                 )}
//               </div>

//               <FormField control={form.control} name="eligibilityCriteria.ageLimit.ageRelaxationRules" render={({ field }) => (
//                 <FormItem><FormLabel>Age Relaxation Rules</FormLabel><FormControl><Textarea placeholder="e.g., As per government rules for reserved categories" {...field} /></FormControl><FormMessage /></FormItem>
//               )} />
//             </div>

//             {/* Other form fields remain the same */}
//             <FormField control={form.control} name="eligibilityCriteria.education" render={({ field }) => (
//               <FormItem><FormLabel>Educational Qualification *</FormLabel><FormControl><Input placeholder="e.g., Graduate from recognized university" {...field} /></FormControl><FormMessage /></FormItem>
//             )} />

//             {/* Submit Button */}
//             <Button type="submit" className="w-full">
//               {defaultValues?.id ? "Update Job" : "Post Job"}
//             </Button>
//           </form>
//         </Form>
//       </CardContent>
//     </Card>
//   );
// };

// const Dashboard = () => {
//   const { toast } = useToast();
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [activeSection, setActiveSection] = useState("jobs");
//   const [adminProfile, setAdminProfile] = useState<any>(null);
//   const [isLoading, setIsLoading] = useState(false);

//   // Storage for created items
//   const [jobs, setJobs] = useState<ComprehensiveJobData[]>([]);
//   const [results, setResults] = useState<Array<z.infer<typeof resultSchema> & { id: string }>>([]);
//   const [admitCards, setAdmitCards] = useState<Array<z.infer<typeof admitCardSchema> & { id: string }>>([]);
//   const [answerKeys, setAnswerKeys] = useState<Array<z.infer<typeof answerKeySchema> & { id: string }>>([]);
//   const [syllabusItems, setSyllabusItems] = useState<Array<z.infer<typeof syllabusSchema> & { id: string }>>([]);
//   const [admissions, setAdmissions] = useState<ComprehensiveAdmissionData[]>([]);
//   const [documents, setDocuments] = useState<Array<z.infer<typeof documentSchema> & { id?: string, _id?: string }>>([]);
//   const [resources, setResources] = useState<Array<z.infer<typeof resourceSchema> & { id: string }>>([]);

//   // Document edit state
//   const [isEditingDocument, setIsEditingDocument] = useState(false);
//   const [editDocumentId, setEditDocumentId] = useState<string | null>(null);

//   // Editing states
//   const [editingJobId, setEditingJobId] = useState<string | null>(null);
//   const [editingResultId, setEditingResultId] = useState<string | null>(null);
//   const [editingAdmissionId, setEditingAdmissionId] = useState<string | null>(null);

//   // Login Form
//   const loginForm = useForm<z.infer<typeof loginSchema>>({
//     resolver: zodResolver(loginSchema),
//     defaultValues: { username: "", password: "" },
//   });

//   // Other Forms
//   const resultForm = useForm<z.infer<typeof resultSchema>>({
//     resolver: zodResolver(resultSchema),
//     defaultValues: { title: "", organization: "", date: "", status: "" },
//   });

//   const admitCardForm = useForm<z.infer<typeof admitCardSchema>>({
//     resolver: zodResolver(admitCardSchema),
//     defaultValues: { title: "", organization: "", date: "", examDate: "", status: "" },
//   });

//   const answerKeyForm = useForm<z.infer<typeof answerKeySchema>>({
//     resolver: zodResolver(answerKeySchema),
//     defaultValues: { title: "", organization: "", date: "", examDate: "", status: "" },
//   });

//   const syllabusForm = useForm<z.infer<typeof syllabusSchema>>({
//     resolver: zodResolver(syllabusSchema),
//     defaultValues: { title: "", description: "", organization: "", subjects: "" },
//   });

//   const documentForm = useForm<z.infer<typeof documentSchema>>({
//     resolver: zodResolver(documentSchema),
//     defaultValues: { category: "", title: "", description: "", url: "", services: "" },
//   });

//   const resourceForm = useForm<z.infer<typeof resourceSchema>>({
//     resolver: zodResolver(resourceSchema),
//     defaultValues: { category: "", title: "", description: "", link: "", institute: "", badge: "" },
//   });

//   // Check authentication status on component mount
//   useEffect(() => {
//     const checkAuthStatus = async () => {
//       if (authService.isAuthenticated()) {
//         try {
//           const profile = await authService.getProfile();
//           setAdminProfile(profile.admin);
//           setIsAuthenticated(true);
//         } catch (error) {
//           console.error('Auth check failed:', error);
//           await authService.logout();
//           setIsAuthenticated(false);
//         }
//       }
//     };

//     checkAuthStatus();
//   }, []);

//   // --- API: FETCH ALL DATA ---
//   useEffect(() => {
//     const fetchJobs = async () => {
//       if (!API_BASE_URL) {
//         console.error("Backend URL is not defined. Set VITE_BACKEND_URL in .env");
//         toast({ title: "Configuration Error", description: "Backend URL is not set.", variant: "destructive" });
//         return;
//       }
//       try {
//         const response = await fetch(`${API_BASE_URL}/api/jobs`, {
//           headers: authService.getAuthHeaders(),
//         });

//         if (!response.ok) {
//           if (response.status === 401) {
//             handleLogout();
//             throw new Error('Session expired');
//           }
//           throw new Error('Failed to fetch jobs');
//         }

//         const data: any[] = await response.json();
//         setJobs(data.map(normalizeJob));
//       } catch (error: any) {
//         console.error("Failed to fetch jobs:", error);
//         toast({
//           title: "Error",
//           description: error.message || "Could not fetch jobs from server.",
//           variant: "destructive"
//         });
//       }
//     };

//     const fetchAdmissions = async () => {
//       if (!API_BASE_URL) return;
//       try {
//         const response = await fetch(`${API_BASE_URL}/api/admissions`, {
//           headers: authService.getAuthHeaders(),
//         });

//         if (!response.ok) {
//           if (response.status === 401) {
//             handleLogout();
//             throw new Error('Session expired');
//           }
//           throw new Error('Failed to fetch admissions');
//         }

//         const data: any[] = await response.json();
//         setAdmissions(data.map(normalizeAdmission));
//       } catch (error: any) {
//         console.error("Failed to fetch admissions:", error);
//         toast({
//           title: "Error",
//           description: error.message || "Could not fetch admissions from server.",
//           variant: "destructive"
//         });
//       }
//     };

//     if (isAuthenticated) {
//       fetchJobs();
//       fetchAdmissions();
//     }
//   }, [isAuthenticated, toast]);

//   // Fetch documents when documents section becomes active
//   useEffect(() => {
//     if (activeSection === "documents") {
//       fetchDocuments();
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [activeSection]);

//   // Login Handler
//   const onLoginSubmit = async (data: z.infer<typeof loginSchema>) => {
//     setIsLoading(true);
//     try {
//       const result = await authService.login({
//         username: data.username,
//         password: data.password
//       });

//       if (result.success) {
//         const profile = await authService.getProfile();
//         setAdminProfile(profile.admin);
//         setIsAuthenticated(true);
//         toast({
//           title: "Login Successful",
//           description: `Welcome ${profile.admin?.username || 'Admin'}!`
//         });
//       } else {
//         throw new Error(result.message || 'Login failed');
//       }
//     } catch (error: any) {
//       console.error('Login error:', error);
//       toast({
//         title: "Login Failed",
//         description: error.message || "Invalid credentials",
//         variant: "destructive"
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Logout Handler
//   const handleLogout = async () => {
//     try {
//       await authService.logout();
//     } catch (error) {
//       console.error('Logout error:', error);
//     } finally {
//       setIsAuthenticated(false);
//       setAdminProfile(null);
//       loginForm.reset();
//       toast({ title: "Logged Out", description: "You have been logged out successfully" });
//     }
//   };

//   // --- API: CREATE/UPDATE JOB HANDLER ---
//   const onJobSubmit = async (data: ComprehensiveJobData) => {
//     if (!authService.isAuthenticated()) {
//       toast({
//         title: "Authentication Required",
//         description: "Please log in to perform this action.",
//         variant: "destructive"
//       });
//       return;
//     }

//     const { id, _id, ...formData } = data;
//     const apiPayload: any = JSON.parse(JSON.stringify(formData));

//     // Convert comma-separated strings to arrays
//     apiPayload.selectionProcess = splitCsv(formData.selectionProcess);
//     apiPayload.eligibilityCriteria.additionalCertifications = splitCsv(formData.eligibilityCriteria.additionalCertifications);
//     apiPayload.applicationFee.paymentModes = splitCsv(formData.applicationFee.paymentModes);
//     if (apiPayload.extraInfo) {
//       apiPayload.extraInfo.documentsRequired = splitCsv(formData.extraInfo?.documentsRequired);
//     }

//     // Additional age rules are already handled in the form component

//     // Convert form numbers to Numbers or undefined
//     apiPayload.totalPosts = toNumberOrUndefined(formData.totalPosts);
//     if (apiPayload.applicationFee) {
//       apiPayload.applicationFee.general = toNumberOrUndefined(formData.applicationFee.general);
//       apiPayload.applicationFee.obc = toNumberOrUndefined(formData.applicationFee.obc);
//       apiPayload.applicationFee.sc = toNumberOrUndefined(formData.applicationFee.sc);
//       apiPayload.applicationFee.st = toNumberOrUndefined(formData.applicationFee.st);
//       apiPayload.applicationFee.ews = toNumberOrUndefined(formData.applicationFee.ews);
//       apiPayload.applicationFee.female = toNumberOrUndefined(formData.applicationFee.female);
//       apiPayload.applicationFee.correctionCharge = toNumberOrUndefined(formData.applicationFee.correctionCharge);
//     }
//     if (apiPayload.eligibilityCriteria?.ageLimit) {
//       apiPayload.eligibilityCriteria.ageLimit.min = toNumberOrUndefined(formData.eligibilityCriteria.ageLimit?.min);
//       apiPayload.eligibilityCriteria.ageLimit.max = toNumberOrUndefined(formData.eligibilityCriteria.ageLimit?.max);
//     }
//     if (apiPayload.postDetails) {
//       apiPayload.postDetails.forEach((p: any) => {
//         p.numberOfPosts = toNumberOrUndefined(p.numberOfPosts);
//       });
//     }
//     if (apiPayload.eligibilityDetails) {
//       apiPayload.eligibilityDetails.forEach((e: any) => {
//         e.minMarks = toNumberOrUndefined(e.minMarks);
//       });
//     }

//     // Convert date strings to Dates
//     const toDateOrNull = (dateStr?: string) => dateStr || null;
//     apiPayload.postDate = toDateOrNull(formData.postDate);
//     if (apiPayload.eligibilityCriteria.ageLimit) {
//       apiPayload.eligibilityCriteria.ageLimit.referenceDate = toDateOrNull(formData.eligibilityCriteria.ageLimit?.referenceDate);
//     }
//     if (apiPayload.importantDates) {
//       apiPayload.importantDates.notificationDate = toDateOrNull(formData.importantDates.notificationDate);
//       apiPayload.importantDates.applicationStart = toDateOrNull(formData.importantDates.applicationStart);
//       apiPayload.importantDates.applicationEnd = toDateOrNull(formData.importantDates.applicationEnd);
//       apiPayload.importantDates.feePaymentLastDate = toDateOrNull(formData.importantDates.feePaymentLastDate);
//       apiPayload.importantDates.admitCardDate = toDateOrNull(formData.importantDates.admitCardDate);
//       apiPayload.importantDates.answerKeyDate = toDateOrNull(formData.importantDates.answerKeyDate);
//       apiPayload.importantDates.resultDate = toDateOrNull(formData.importantDates.resultDate);
//       apiPayload.importantDates.scoreCardDate = toDateOrNull(formData.importantDates.scoreCardDate);
//       if (apiPayload.importantDates.correctionWindow) {
//         apiPayload.importantDates.correctionWindow.start = toDateOrNull(formData.importantDates.correctionWindow?.start);
//         apiPayload.importantDates.correctionWindow.end = toDateOrNull(formData.importantDates.correctionWindow?.end);
//       }
//     }

//     const method = editingJobId ? 'PUT' : 'POST';
//     const url = editingJobId
//       ? `${API_BASE_URL}/api/jobs/${editingJobId}`
//       : `${API_BASE_URL}/api/jobs`;

//     try {
//       const response = await fetch(url, {
//         method: method,
//         headers: authService.getAuthHeaders(),
//         body: JSON.stringify(apiPayload),
//       });

//       if (!response.ok) {
//         if (response.status === 401) {
//           handleLogout();
//           throw new Error('Session expired');
//         }
//         const errorData = await response.json();
//         throw new Error(errorData.message || 'Failed to save job');
//       }

//       const savedJob: any = await response.json();
//       const normalizedJob = normalizeJob(savedJob);

//       if (editingJobId) {
//         setJobs(jobs.map(job =>
//           job.id === editingJobId ? normalizedJob : job
//         ));
//         setEditingJobId(null);
//         toast({ title: "Job Updated Successfully" });
//       } else {
//         setJobs([...jobs, normalizedJob]);
//         toast({ title: "Job Posted Successfully" });
//       }
//     } catch (error: any) {
//       console.error("Failed to save job:", error);
//       toast({
//         title: "Error",
//         description: error.message || "Could not save job to server.",
//         variant: "destructive",
//       });
//     }
//   };

//   // --- API: CREATE/UPDATE ADMISSION HANDLER ---
//   const onAdmissionSubmit = async (data: ComprehensiveAdmissionData) => {
//     if (!authService.isAuthenticated()) {
//       toast({
//         title: "Authentication Required",
//         description: "Please log in to perform this action.",
//         variant: "destructive"
//       });
//       return;
//     }

//     const { id, _id, ...formData } = data;
//     const apiPayload: any = JSON.parse(JSON.stringify(formData));

//     // Convert comma-separated strings to arrays
//     if (apiPayload.eligibilityCriteria) {
//       apiPayload.eligibilityCriteria.additionalRequirements = splitCsv(formData.eligibilityCriteria?.additionalRequirements);
//     }
//     if (apiPayload.applicationFee) {
//       apiPayload.applicationFee.paymentModes = splitCsv(formData.applicationFee?.paymentModes);
//     }
//     if (apiPayload.process) {
//       apiPayload.process.selectionSteps = splitCsv(formData.process?.selectionSteps);
//     }
//     if (apiPayload.extraInfo) {
//       apiPayload.extraInfo.documentsRequired = splitCsv(formData.extraInfo?.documentsRequired);
//       apiPayload.extraInfo.syllabusTopics = splitCsv(formData.extraInfo?.syllabusTopics);
//       apiPayload.extraInfo.examPattern = splitCsv(formData.extraInfo?.examPattern);
//       if (apiPayload.extraInfo.counselingDetails) {
//         apiPayload.extraInfo.counselingDetails.steps = splitCsv(formData.extraInfo?.counselingDetails?.steps);
//       }
//     }

//     // Convert form numbers to Numbers or undefined
//     apiPayload.totalSeats = toNumberOrUndefined(formData.totalSeats);
//     if (apiPayload.applicationFee) {
//       apiPayload.applicationFee.general = toNumberOrUndefined(formData.applicationFee.general);
//       apiPayload.applicationFee.obc = toNumberOrUndefined(formData.applicationFee.obc);
//       apiPayload.applicationFee.ews = toNumberOrUndefined(formData.applicationFee.ews);
//       apiPayload.applicationFee.sc = toNumberOrUndefined(formData.applicationFee.sc);
//       apiPayload.applicationFee.st = toNumberOrUndefined(formData.applicationFee.st);
//       apiPayload.applicationFee.pwd = toNumberOrUndefined(formData.applicationFee.pwd);
//       apiPayload.applicationFee.female = toNumberOrUndefined(formData.applicationFee.female);
//       apiPayload.applicationFee.bothPapers = toNumberOrUndefined(formData.applicationFee.bothPapers);
//     }
//     if (apiPayload.eligibilityCriteria?.ageLimit) {
//       apiPayload.eligibilityCriteria.ageLimit.min = toNumberOrUndefined(formData.eligibilityCriteria.ageLimit?.min);
//       apiPayload.eligibilityCriteria.ageLimit.max = toNumberOrUndefined(formData.eligibilityCriteria.ageLimit?.max);
//     }
//     if (apiPayload.extraInfo?.counselingDetails) {
//       apiPayload.extraInfo.counselingDetails.registrationFee = toNumberOrUndefined(formData.extraInfo.counselingDetails?.registrationFee);
//       apiPayload.extraInfo.counselingDetails.seatAcceptanceFee = toNumberOrUndefined(formData.extraInfo.counselingDetails?.seatAcceptanceFee);
//     }

//     // Convert date strings to Dates
//     const toDateOrNull = (dateStr?: string) => dateStr || null;
//     apiPayload.postDate = toDateOrNull(formData.postDate);
//     if (apiPayload.eligibilityCriteria?.ageLimit) {
//       apiPayload.eligibilityCriteria.ageLimit.referenceDate = toDateOrNull(formData.eligibilityCriteria.ageLimit?.referenceDate);
//     }
//     if (apiPayload.importantDates) {
//       apiPayload.importantDates.notificationDate = toDateOrNull(formData.importantDates.notificationDate);
//       apiPayload.importantDates.applicationStart = toDateOrNull(formData.importantDates.applicationStart);
//       apiPayload.importantDates.applicationEnd = toDateOrNull(formData.importantDates.applicationEnd);
//       apiPayload.importantDates.feePaymentLastDate = toDateOrNull(formData.importantDates.feePaymentLastDate);
//       apiPayload.importantDates.examCityDate = toDateOrNull(formData.importantDates.examCityDate);
//       apiPayload.importantDates.admitCardDate = toDateOrNull(formData.importantDates.admitCardDate);
//       apiPayload.importantDates.answerKeyDate = toDateOrNull(formData.importantDates.answerKeyDate);
//       apiPayload.importantDates.resultDate = toDateOrNull(formData.importantDates.resultDate);
//       if (apiPayload.importantDates.correctionWindow) {
//         apiPayload.importantDates.correctionWindow.start = toDateOrNull(formData.importantDates.correctionWindow?.start);
//         apiPayload.importantDates.correctionWindow.end = toDateOrNull(formData.importantDates.correctionWindow?.end);
//       }
//     }

//     const method = editingAdmissionId ? 'PUT' : 'POST';
//     const url = editingAdmissionId
//       ? `${API_BASE_URL}/api/admissions/${editingAdmissionId}`
//       : `${API_BASE_URL}/api/admissions`;

//     try {
//       const response = await fetch(url, {
//         method: method,
//         headers: authService.getAuthHeaders(),
//         body: JSON.stringify(apiPayload),
//       });

//       if (!response.ok) {
//         if (response.status === 401) {
//           handleLogout();
//           throw new Error('Session expired');
//         }
//         const errorData = await response.json();
//         throw new Error(errorData.message || 'Failed to save admission');
//       }

//       const savedAdmission: any = await response.json();
//       const normalizedAdmission = normalizeAdmission(savedAdmission);

//       if (editingAdmissionId) {
//         setAdmissions(admissions.map(ad =>
//           ad.id === editingAdmissionId ? normalizedAdmission : ad
//         ));
//         setEditingAdmissionId(null);
//         toast({ title: "Admission Updated Successfully" });
//       } else {
//         setAdmissions([...admissions, normalizedAdmission]);
//         toast({ title: "Admission Posted Successfully" });
//       }
//     } catch (error: any) {
//       console.error("Failed to save admission:", error);
//       toast({
//         title: "Error",
//         description: error.message || "Could not save admission to server.",
//         variant: "destructive",
//       });
//     }
//   };

//   // --- LOCAL: OTHER SUBMIT HANDLERS ---
//   const onResultSubmit = (data: z.infer<typeof resultSchema>) => {
//     if (editingResultId) {
//       setResults(results.map(result => result.id === editingResultId ? { ...data, id: editingResultId } : result));
//       setEditingResultId(null);
//       toast({ title: "Result Updated Successfully" });
//     } else {
//       const newResult = { ...data, id: Date.now().toString() };
//       setResults([...results, newResult]);
//       toast({ title: "Result Posted Successfully" });
//     }
//     resultForm.reset();
//   };

//   const onAdmitCardSubmit = (data: z.infer<typeof admitCardSchema>) => {
//     console.log("Admit Card Data:", data);
//     toast({ title: "Admit Card Posted Successfully" });
//     admitCardForm.reset();
//   };

//   const onAnswerKeySubmit = (data: z.infer<typeof answerKeySchema>) => {
//     console.log("Answer Key Data:", data);
//     toast({ title: "Answer Key Posted Successfully" });
//     answerKeyForm.reset();
//   };

//   const onSyllabusSubmit = (data: z.infer<typeof syllabusSchema>) => {
//     console.log("Syllabus Data:", data);
//     toast({ title: "Syllabus Posted Successfully" });
//     syllabusForm.reset();
//   };

//   // ---------- DOCUMENTS: CRUD (API CONNECTED) ----------
//   const fetchDocuments = async () => {
//     if (!API_BASE_URL) {
//       toast({ title: "Configuration Error", description: "Backend URL is not set.", variant: "destructive" });
//       return;
//     }
//     try {
//       const res = await fetch(`${API_BASE_URL}/api/documents`, {
//         headers: authService.getAuthHeaders(),
//       });

//       if (!res.ok) {
//         if (res.status === 401) {
//           handleLogout();
//           throw new Error("Session expired");
//         }
//         throw new Error("Failed to fetch documents");
//       }

//       const payload = await res.json();
//       // payload expected shape: { success: true, data: [...] } or just [...]
//       const docs = Array.isArray(payload) ? payload : (payload.data || []);
//       // Normalize documents to include services as array
//       const normalized = docs.map((d: any) => ({
//         ...d,
//         services: Array.isArray(d.services) ? d.services : splitCsv(d.services),
//       }));
//       setDocuments(normalized);
//     } catch (error: any) {
//       console.error("fetchDocuments error:", error);
//       toast({
//         title: "Error",
//         description: error.message || "Could not load documents",
//         variant: "destructive"
//       });
//     }
//   };

  
//   const onDocumentSubmit = async (data: z.infer<typeof documentSchema>) => {
//   if (!authService.isAuthenticated()) {
//     toast({ title: "Authentication Required", description: "Please log in to perform this action.", variant: "destructive" });
//     return;
//   }

//   try {
//     const payload = {
//       category: data.category,
//       title: data.title,
//       description: data.description,
//       url: data.url,
//       services: data.services, // now send as string (comma-separated)
//     };

//     const res = await fetch(`${API_BASE_URL}/api/documents`, {
//       method: "POST",
//       headers: authService.getAuthHeaders(),
//       body: JSON.stringify(payload),
//     });

//     if (!res.ok) {
//       if (res.status === 401) {
//         handleLogout();
//         throw new Error("Session expired");
//       }
//       const err = await res.json();
//       throw new Error(err.message || "Failed to add document");
//     }

//     const saved = await res.json();
//     toast({ title: "Document added successfully" });
//     documentForm.reset();
//     fetchDocuments();
//   } catch (error: any) {
//     console.error("onDocumentSubmit error:", error);
//     toast({
//       title: "Error",
//       description: error.message || "Could not add document",
//       variant: "destructive"
//     });
//   }
// };

// const onEditDocument = (doc: any) => {
//   setIsEditingDocument(true);
//   setEditDocumentId(doc._id || doc.id || null);

//   documentForm.setValue("category", doc.category || "");
//   documentForm.setValue("title", doc.title || "");
//   documentForm.setValue("description", doc.description || "");
//   documentForm.setValue("url", doc.url || "");
//   documentForm.setValue("services", doc.services || ""); // string directly
//   window.scrollTo({ top: 0, behavior: "smooth" });
// };

// const onUpdateDocument = async (data: z.infer<typeof documentSchema>) => {
//   if (!authService.isAuthenticated()) {
//     toast({ title: "Authentication Required", description: "Please log in to perform this action.", variant: "destructive" });
//     return;
//   }
//   if (!editDocumentId) {
//     toast({ title: "Error", description: "No document selected for update.", variant: "destructive" });
//     return;
//   }

//   try {
//     const payload = {
//       category: data.category,
//       title: data.title,
//       description: data.description,
//       url: data.url,
//       services: data.services, // string directly
//     };

//     const res = await fetch(`${API_BASE_URL}/api/documents/${editDocumentId}`, {
//       method: "PUT",
//       headers: authService.getAuthHeaders(),
//       body: JSON.stringify(payload),
//     });

//     if (!res.ok) {
//       if (res.status === 401) {
//         handleLogout();
//         throw new Error("Session expired");
//       }
//       const err = await res.json();
//       throw new Error(err.message || "Failed to update document");
//     }

//     const updated = await res.json();
//     toast({ title: "Document updated successfully" });
//     setIsEditingDocument(false);
//     setEditDocumentId(null);
//     documentForm.reset();
//     fetchDocuments();
//   } catch (error: any) {
//     console.error("onUpdateDocument error:", error);
//     toast({
//       title: "Error",
//       description: error.message || "Could not update document",
//       variant: "destructive"
//     });
//   }
// };

//   const onDeleteDocument = async (id?: string) => {
//     if (!id) {
//       toast({ title: "Error", description: "Invalid document id", variant: "destructive" });
//       return;
//     }
//     if (!authService.isAuthenticated()) {
//       toast({ title: "Authentication Required", description: "Please log in to perform this action.", variant: "destructive" });
//       return;
//     }

//     try {
//       const res = await fetch(`${API_BASE_URL}/api/documents/${id}`, {
//         method: "DELETE",
//         headers: authService.getAuthHeaders(),
//       });

//       if (!res.ok) {
//         if (res.status === 401) {
//           handleLogout();
//           throw new Error("Session expired");
//         }
//         const err = await res.json();
//         throw new Error(err.message || "Failed to delete document");
//       }

//       toast({ title: "Document deleted" });
//       fetchDocuments();
//     } catch (error: any) {
//       console.error("onDeleteDocument error:", error);
//       toast({
//         title: "Error",
//         description: error.message || "Could not delete document",
//         variant: "destructive"
//       });
//     }
//   };

//   const onResourceSubmit = (data: z.infer<typeof resourceSchema>) => {
//     console.log("Resource Data:", data);
//     toast({ title: "Resource Posted Successfully" });
//     resourceForm.reset();
//   };

//   // Delete Handlers with JWT Auth for jobs & admissions (kept as before)
//   const handleDeleteJob = async (job: ComprehensiveJobData) => {
//     const dbId = job.id;
//     if (!dbId) {
//       toast({ title: "Error", description: "Job has no valid ID to delete.", variant: "destructive" });
//       return;
//     }
//     if (!authService.isAuthenticated()) {
//       toast({ title: "Auth Error", description: "Please log in to delete.", variant: "destructive" });
//       return;
//     }

//     try {
//       const response = await fetch(`${API_BASE_URL}/api/jobs/${dbId}`, {
//         method: 'DELETE',
//         headers: authService.getAuthHeaders(),
//       });

//       if (!response.ok) {
//         if (response.status === 401) {
//           handleLogout();
//           throw new Error('Session expired');
//         }
//         throw new Error('Failed to delete job');
//       }

//       setJobs(jobs.filter(j => j.id !== dbId));
//       toast({ title: "Job Deleted", description: "The job has been removed." });

//     } catch (error: any) {
//       console.error("Failed to delete job:", error);
//       toast({
//         title: "Error",
//         description: error.message || "Could not delete job.",
//         variant: "destructive",
//       });
//     }
//   };

//   const handleDeleteAdmission = async (admission: ComprehensiveAdmissionData) => {
//     const dbId = admission.id;
//     if (!dbId) {
//       toast({ title: "Error", description: "Admission has no valid ID to delete.", variant: "destructive" });
//       return;
//     }
//     if (!authService.isAuthenticated()) {
//       toast({ title: "Auth Error", description: "Please log in to delete.", variant: "destructive" });
//       return;
//     }

//     try {
//       const response = await fetch(`${API_BASE_URL}/api/admissions/${dbId}`, {
//         method: 'DELETE',
//         headers: authService.getAuthHeaders(),
//       });

//       if (!response.ok) {
//         if (response.status === 401) {
//           handleLogout();
//           throw new Error('Session expired');
//         }
//         throw new Error('Failed to delete admission');
//       }

//       setAdmissions(admissions.filter(ad => ad.id !== dbId));
//       toast({ title: "Admission Deleted", description: "The admission has been removed." });

//     } catch (error: any) {
//       console.error("Failed to delete admission:", error);
//       toast({
//         title: "Error",
//         description: error.message || "Could not delete admission.",
//         variant: "destructive",
//       });
//     }
//   };

//   // Login UI
//   if (!isAuthenticated) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-primary via-primary/90 to-accent flex items-center justify-center p-4">
//         <Card className="w-full max-w-md">
//           <CardHeader className="space-y-1">
//             <CardTitle className="text-2xl font-bold text-center">Admin Login</CardTitle>
//             <CardDescription className="text-center">
//               Sign in to access the dashboard
//             </CardDescription>
//           </CardHeader>
//           <CardContent>
//             <Form {...loginForm}>
//               <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-4">
//                 <FormField
//                   control={loginForm.control}
//                   name="username"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Username</FormLabel>
//                       <FormControl>
//                         <Input
//                           placeholder="Enter admin username"
//                           {...field}
//                         />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//                 <FormField
//                   control={loginForm.control}
//                   name="password"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Password</FormLabel>
//                       <FormControl>
//                         <Input
//                           placeholder="Enter password"
//                           type="password"
//                           {...field}
//                         />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//                 <Button
//                   type="submit"
//                   className="w-full"
//                   disabled={isLoading}
//                 >
//                   {isLoading ? "Signing In..." : "Sign In"}
//                 </Button>
//               </form>
//             </Form>
//           </CardContent>
//         </Card>
//       </div>
//     );
//   }

//   const menuItems = [
//     { id: "jobs", label: "Jobs", icon: Briefcase },
//     { id: "admissions", label: "Admissions", icon: GraduationCap },
//     { id: "results", label: "Results", icon: Trophy },
//     { id: "admit-cards", label: "Admit Cards", icon: CreditCard },
//     { id: "answer-keys", label: "Answer Keys", icon: Key },
//     { id: "syllabus", label: "Syllabus", icon: BookOpen },
//     { id: "documents", label: "Documents", icon: FileText },
//     { id: "resources", label: "Resources", icon: Library },
//     { id: "quiz", label: "Quiz Management", icon: ClipboardList },
//   ];

//   const SidebarMenuContent = () => (
//     <>
//       <div className="p-4 border-b">
//         <div className="flex items-center gap-3 mb-2">
//           <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
//             <User className="h-5 w-5 text-primary" />
//           </div>
//           <div>
//             <h2 className="text-lg font-semibold">Admin Dashboard</h2>
//             <p className="text-sm text-muted-foreground">
//               {adminProfile?.username || 'Admin'}
//             </p>
//           </div>
//         </div>
//       </div>
//       <SidebarGroup>
//         <SidebarGroupContent>
//           <SidebarMenu>
//             {menuItems.map((item) => (
//               <SidebarMenuItem key={item.id}>
//                 <SidebarMenuButton
//                   isActive={activeSection === item.id}
//                   onClick={() => setActiveSection(item.id)}
//                 >
//                   <item.icon className="h-4 w-4" />
//                   <span>{item.label}</span>
//                 </SidebarMenuButton>
//               </SidebarMenuItem>
//             ))}
//           </SidebarMenu>
//         </SidebarGroupContent>
//       </SidebarGroup>
//       <div className="mt-auto p-4 border-t">
//         <Button variant="outline" className="w-full" onClick={handleLogout}>
//           <LogOut className="h-4 w-4 mr-2" />
//           Logout
//         </Button>
//       </div>
//     </>
//   );

//   return (
//     <SidebarProvider defaultOpen>
//       <div className="min-h-screen flex w-full">
//         {/* Desktop Sidebar */}
//         <Sidebar className="hidden md:flex border-r">
//           <SidebarContent>
//             <SidebarMenuContent />
//           </SidebarContent>
//         </Sidebar>

//         <SidebarInset className="flex-1">
//           <div className="flex flex-col h-full">
//             {/* Header with Mobile Menu */}
//             <div className="bg-gradient-to-br from-primary via-primary/90 to-accent text-primary-foreground py-4 px-4 md:py-6 md:px-6">
//               <div className="flex items-center gap-3">
//                 {/* Mobile Hamburger Menu */}
//                 <Sheet>
//                   <SheetTrigger asChild>
//                     <Button variant="ghost" size="icon" className="md:hidden text-primary-foreground hover:bg-primary-foreground/20">
//                       <Menu className="h-5 w-5" />
//                     </Button>
//                   </SheetTrigger>
//                   <SheetContent side="left" className="p-0 w-64">
//                     <SidebarContent>
//                       <SidebarMenuContent />
//                     </SidebarContent>
//                   </SheetContent>
//                 </Sheet>
//                 <div>
//                   <h1 className="text-xl md:text-2xl font-bold">Content Management</h1>
//                   <p className="text-sm text-primary-foreground/90">
//                     Welcome back, {adminProfile?.username || 'Admin'}!
//                   </p>
//                 </div>
//               </div>
//             </div>

//             <div className="flex-1 p-6 overflow-auto">
//               {/* --- JOBS SECTION (API Connected) --- */}
//               {activeSection === "jobs" && (
//                 <>
//                   <ComprehensiveJobFormWithAgeRules
//                     key={editingJobId || 'new-job'}
//                     onSubmit={onJobSubmit}
//                     defaultValues={editingJobId
//                       ? jobs.find(job => job.id === editingJobId)
//                       : undefined}
//                   />

//                   <CRUDList
//                     title="Posted Jobs"
//                     description="Manage all posted job listings"
//                     items={jobs}
//                     idKey="id"
//                     onEdit={(job) => {
//                       setEditingJobId(job.id!);
//                     }}
//                     onDelete={handleDeleteJob}
//                     renderItem={(job) => (
//                       <div>
//                         <h4 className="font-semibold">{job.title}</h4>
//                         <p className="text-sm text-muted-foreground">{job.organization}</p>
//                         <p className="text-xs text-muted-foreground mt-1">
//                           Posts: {String(job.totalPosts || 'N/A')} | Last Date: {job.importantDates?.applicationEnd}
//                         </p>
//                       </div>
//                     )}
//                   />
//                 </>
//               )}

//               {/* --- RESULTS SECTION (Local State) --- */}
//               {activeSection === "results" && (
//                 <Card>
//                   <CardHeader>
//                     <CardTitle>Post New Result</CardTitle>
//                     <CardDescription>Add a new exam result to the Results section</CardDescription>
//                   </CardHeader>
//                   <CardContent>
//                     <Form {...resultForm}>
//                       <form onSubmit={resultForm.handleSubmit(onResultSubmit)} className="space-y-4">
//                         <FormField control={resultForm.control} name="title" render={({ field }) => (
//                           <FormItem><FormLabel>Result Title</FormLabel><FormControl><Input placeholder="e.g., SSC CHSL Tier-1 Exam Result 2024" {...field} /></FormControl><FormMessage /></FormItem>
//                         )} />
//                         <FormField control={resultForm.control} name="organization" render={({ field }) => (
//                           <FormItem><FormLabel>Organization</FormLabel><FormControl><Input placeholder="e.g., Staff Selection Commission" {...field} /></FormControl><FormMessage /></FormItem>
//                         )} />
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                           <FormField control={resultForm.control} name="date" render={({ field }) => (
//                             <FormItem><FormLabel>Release Date</FormLabel><FormControl><Input placeholder="e.g., 10 Nov 2024" {...field} /></FormControl><FormMessage /></FormItem>
//                           )} />
//                           <FormField control={resultForm.control} name="status" render={({ field }) => (
//                             <FormItem><FormLabel>Status (Optional)</FormLabel><FormControl><Input placeholder="e.g., Latest, New" {...field} /></FormControl><FormMessage /></FormItem>
//                           )} />
//                         </div>
//                         <Button type="submit" className="w-full">Post Result</Button>
//                       </form>
//                     </Form>
//                   </CardContent>
//                 </Card>
//               )}

//               {/* --- ADMIT CARDS SECTION (Local State) --- */}
//               {activeSection === "admit-cards" && (
//                 <Card>
//                   <CardHeader>
//                     <CardTitle>Post New Admit Card</CardTitle>
//                     <CardDescription>Add a new admit card notification</CardDescription>
//                   </CardHeader>
//                   <CardContent>
//                     <Form {...admitCardForm}>
//                       <form onSubmit={admitCardForm.handleSubmit(onAdmitCardSubmit)} className="space-y-4">
//                         <FormField control={admitCardForm.control} name="title" render={({ field }) => (
//                           <FormItem><FormLabel>Admit Card Title</FormLabel><FormControl><Input placeholder="e.g., SSC MTS Admit Card 2024" {...field} /></FormControl><FormMessage /></FormItem>
//                         )} />
//                         <FormField control={admitCardForm.control} name="organization" render={({ field }) => (
//                           <FormItem><FormLabel>Organization</FormLabel><FormControl><Input placeholder="e.g., Staff Selection Commission" {...field} /></FormControl><FormMessage /></FormItem>
//                         )} />
//                         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                           <FormField control={admitCardForm.control} name="date" render={({ field }) => (
//                             <FormItem><FormLabel>Release Date</FormLabel><FormControl><Input placeholder="e.g., 10 Nov 2024" {...field} /></FormControl><FormMessage /></FormItem>
//                           )} />
//                           <FormField control={admitCardForm.control} name="examDate" render={({ field }) => (
//                             <FormItem><FormLabel>Exam Date</FormLabel><FormControl><Input placeholder="e.g., 30 Nov 2024" {...field} /></FormControl><FormMessage /></FormItem>
//                           )} />
//                           <FormField control={admitCardForm.control} name="status" render={({ field }) => (
//                             <FormItem><FormLabel>Status</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue placeholder="Select status" /></SelectTrigger></FormControl><SelectContent><SelectItem value="Available">Available</SelectItem><SelectItem value="Coming Soon">Coming Soon</SelectItem></SelectContent></Select><FormMessage /></FormItem>
//                           )} />
//                         </div>
//                         <Button type="submit" className="w-full">Post Admit Card</Button>
//                       </form>
//                     </Form>
//                   </CardContent>
//                 </Card>
//               )}

//               {/* --- ANSWER KEYS SECTION (Local State) --- */}
//               {activeSection === "answer-keys" && (
//                 <Card>
//                   <CardHeader>
//                     <CardTitle>Post New Answer Key</CardTitle>
//                     <CardDescription>Add a new answer key notification</CardDescription>
//                   </CardHeader>
//                   <CardContent>
//                     <Form {...answerKeyForm}>
//                       <form onSubmit={answerKeyForm.handleSubmit(onAnswerKeySubmit)} className="space-y-4">
//                         <FormField control={answerKeyForm.control} name="title" render={({ field }) => (
//                           <FormItem><FormLabel>Answer Key Title</FormLabel><FormControl><Input placeholder="e.g., SSC CGL Tier-1 2024 Answer Key" {...field} /></FormControl><FormMessage /></FormItem>
//                         )} />
//                         <FormField control={answerKeyForm.control} name="organization" render={({ field }) => (
//                           <FormItem><FormLabel>Organization</FormLabel><FormControl><Input placeholder="e.g., Staff Selection Commission" {...field} /></FormControl><FormMessage /></FormItem>
//                         )} />
//                         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                           <FormField control={answerKeyForm.control} name="date" render={({ field }) => (
//                             <FormItem><FormLabel>Release Date</FormLabel><FormControl><Input placeholder="e.g., 08 Nov 2024" {...field} /></FormControl><FormMessage /></FormItem>
//                           )} />
//                           <FormField control={answerKeyForm.control} name="examDate" render={({ field }) => (
//                             <FormItem><FormLabel>Exam Date</FormLabel><FormControl><Input placeholder="e.g., 16 Sep - 26 Sep 2024" {...field} /></FormControl><FormMessage /></FormItem>
//                           )} />
//                           <FormField control={answerKeyForm.control} name="status" render={({ field }) => (
//                             <FormItem><FormLabel>Status (Optional)</FormLabel><FormControl><Input placeholder="e.g., Latest, New" {...field} /></FormControl><FormMessage /></FormItem>
//                           )} />
//                         </div>
//                         <Button type="submit" className="w-full">Post Answer Key</Button>
//                       </form>
//                     </Form>
//                   </CardContent>
//                 </Card>
//               )}

//               {/* --- SYLLABUS SECTION (Local State) --- */}
//               {activeSection === "syllabus" && (
//                 <Card>
//                   <CardHeader>
//                     <CardTitle>Post New Syllabus</CardTitle>
//                     <CardDescription>Add a new exam syllabus</CardDescription>
//                   </CardHeader>
//                   <CardContent>
//                     <Form {...syllabusForm}>
//                       <form onSubmit={syllabusForm.handleSubmit(onSyllabusSubmit)} className="space-y-4">
//                         <FormField control={syllabusForm.control} name="title" render={({ field }) => (
//                           <FormItem><FormLabel>Syllabus Title</FormLabel><FormControl><Input placeholder="e.g., UPSC Civil Services 2025 Complete Syllabus" {...field} /></FormControl><FormMessage /></FormItem>
//                         )} />
//                         <FormField control={syllabusForm.control} name="description" render={({ field }) => (
//                           <FormItem><FormLabel>Description</FormLabel><FormControl><Textarea placeholder="e.g., Prelims (GS + CSAT), Mains (9 Papers) & Interview" className="min-h-[80px]" {...field} /></FormControl><FormMessage /></FormItem>
//                         )} />
//                         <FormField control={syllabusForm.control} name="organization" render={({ field }) => (
//                           <FormItem><FormLabel>Organization</FormLabel><FormControl><Input placeholder="e.g., Union Public Service Commission" {...field} /></FormControl><FormMessage /></FormItem>
//                         )} />
//                         <FormField control={syllabusForm.control} name="subjects" render={({ field }) => (
//                           <FormItem><FormLabel>Subjects/Topics</FormLabel><FormControl><Textarea placeholder="e.g., General Studies (History, Polity, Geography), Essay, Optional Subject" className="min-h-[80px]" {...field} /></FormControl><FormMessage /></FormItem>
//                         )} />
//                         <Button type="submit" className="w-full">Post Syllabus</Button>
//                       </form>
//                     </Form>
//                   </CardContent>
//                 </Card>
//               )}

//               {/* --- ADMISSIONS SECTION (API Connected) --- */}
//               {activeSection === "admissions" && (
//                 <>
//                   <ComprehensiveAdmissionForm
//                     key={editingAdmissionId || 'new-admission'}
//                     onSubmit={onAdmissionSubmit}
//                     defaultValues={editingAdmissionId
//                       ? admissions.find(ad => ad.id === editingAdmissionId)
//                       : undefined}
//                   />

//                   <CRUDList
//                     title="Posted Admissions"
//                     description="Manage all posted admission listings"
//                     items={admissions}
//                     idKey="id"
//                     onEdit={(admission) => {
//                       setEditingAdmissionId(admission.id!);
//                     }}
//                     onDelete={handleDeleteAdmission}
//                     renderItem={(admission) => (
//                       <div>
//                         <h4 className="font-semibold">{admission.title}</h4>
//                         <p className="text-sm text-muted-foreground">{admission.organization}</p>
//                         <p className="text-xs text-muted-foreground mt-1">
//                           Type: {admission.admissionType} | Last Date: {admission.importantDates?.applicationEnd}
//                         </p>
//                       </div>
//                     )}
//                   />
//                 </>
//               )}

//               {/* --- DOCUMENTS SECTION (UPDATED CRUD) */}
//               {activeSection === "documents" && (
//                 <div className="space-y-6">

//                   {/* ADD / EDIT DOCUMENT FORM */}
//                   <Card>
//                     <CardHeader>
//                       <CardTitle>
//                         {isEditingDocument ? "Update Document Service" : "Post New Document Service"}
//                       </CardTitle>
//                       <CardDescription>
//                         {isEditingDocument
//                           ? "Modify the existing document service information."
//                           : "Add a new document service link."}
//                       </CardDescription>
//                     </CardHeader>

//                     <CardContent>
//                       <Form {...documentForm}>
//                         <form
//                           onSubmit={documentForm.handleSubmit(
//                             isEditingDocument ? onUpdateDocument : onDocumentSubmit
//                           )}
//                           className="space-y-4"
//                         >
//                           {/* Category */}
//                           <FormField
//                             control={documentForm.control}
//                             name="category"
//                             render={({ field }) => (
//                               <FormItem>
//                                 <FormLabel>Category</FormLabel>
//                                 <Select onValueChange={field.onChange} value={field.value}>
//                                   <FormControl>
//                                     <SelectTrigger>
//                                       <SelectValue placeholder="Select category" />
//                                     </SelectTrigger>
//                                   </FormControl>
//                                   <SelectContent>
//                                     <SelectItem value="identity">Identity</SelectItem>
//                                     <SelectItem value="education">Education</SelectItem>
//                                     <SelectItem value="employment">Employment</SelectItem>
//                                     <SelectItem value="transport">Transport</SelectItem>
//                                     <SelectItem value="property">Property</SelectItem>
//                                     <SelectItem value="health">Health</SelectItem>
//                                     <SelectItem value="other">Other Services</SelectItem>
//                                   </SelectContent>
//                                 </Select>
//                                 <FormMessage />
//                               </FormItem>
//                             )}
//                           />

//                           {/* Title */}
//                           <FormField
//                             control={documentForm.control}
//                             name="title"
//                             render={({ field }) => (
//                               <FormItem>
//                                 <FormLabel>Document Title</FormLabel>
//                                 <FormControl>
//                                   <Input
//                                     placeholder="e.g., Aadhaar Card Services"
//                                     {...field}
//                                   />
//                                 </FormControl>
//                                 <FormMessage />
//                               </FormItem>
//                             )}
//                           />

//                           {/* Description */}
//                           <FormField
//                             control={documentForm.control}
//                             name="description"
//                             render={({ field }) => (
//                               <FormItem>
//                                 <FormLabel>Description</FormLabel>
//                                 <FormControl>
//                                   <Input
//                                     placeholder="e.g., Update details, download e-Aadhaar"
//                                     {...field}
//                                   />
//                                 </FormControl>
//                                 <FormMessage />
//                               </FormItem>
//                             )}
//                           />

//                           {/* URL */}
//                           <FormField
//                             control={documentForm.control}
//                             name="url"
//                             render={({ field }) => (
//                               <FormItem>
//                                 <FormLabel>URL</FormLabel>
//                                 <FormControl>
//                                   <Input
//                                     placeholder="e.g., https://uidai.gov.in/"
//                                     {...field}
//                                   />
//                                 </FormControl>
//                                 <FormMessage />
//                               </FormItem>
//                             )}
//                           />

//                           {/* Services */}
//                           <FormField
//                             control={documentForm.control}
//                             name="services"
//                             render={({ field }) => (
//                               <FormItem>
//                                 <FormLabel>Services (comma-separated)</FormLabel>
//                                 <FormControl>
//                                   <Textarea
//                                     placeholder="e.g., Update Aadhaar, Download e-Aadhaar, Check Status"
//                                     className="min-h-[80px]"
//                                     {...field}
//                                   />
//                                 </FormControl>
//                                 <FormMessage />
//                               </FormItem>
//                             )}
//                           />

//                           <Button type="submit" className="w-full">
//                             {isEditingDocument ? "Update Document" : "Post Document Service"}
//                           </Button>
//                         </form>
//                       </Form>
//                     </CardContent>
//                   </Card>

//                   {/* DOCUMENT LIST */}
//                   <Card>
//                     <CardHeader>
//                       <CardTitle>All Document Services</CardTitle>
//                       <CardDescription>Manage, edit or delete documents</CardDescription>
//                     </CardHeader>

//                     <CardContent>
//                       <div className="space-y-4">
//                         {documents.length === 0 ? (
//                           <p className="text-sm text-gray-500">No documents added yet.</p>
//                         ) : (
//                           documents.map((doc) => (
//                             <div
//                               key={doc._id || doc.id}
//                               className="p-4 border rounded-lg flex justify-between items-start"
//                             >
//                               <div>
//                                 <h3 className="font-bold">{doc.title}</h3>
//                                 <p className="text-sm">{doc.description}</p>
//                                 <p className="text-sm mt-1">
//                                   <strong>Category:</strong> {doc.category}
//                                 </p>
//                                 <p className="text-sm mt-1 break-all">
//                                   <strong>URL:</strong>{" "}
//                                   <a href={doc.url} target="_blank" rel="noreferrer" className="text-primary underline">
//                                     {doc.url}
//                                   </a>
//                                 </p>
//                                 <p className="text-sm mt-1">
//                                   <strong>Services:</strong> {(Array.isArray(doc.services) ? doc.services.join(", ") : String(doc.services))}
//                                 </p>
//                               </div>

//                               <div className="flex gap-2">
//                                 <Button size="sm" onClick={() => onEditDocument(doc)}>
//                                   Edit
//                                 </Button>

//                                 <Button
//                                   variant="destructive"
//                                   size="sm"
//                                   onClick={() => onDeleteDocument(doc._id || doc.id)}
//                                 >
//                                   Delete
//                                 </Button>
//                               </div>
//                             </div>
//                           ))
//                         )}
//                       </div>
//                     </CardContent>
//                   </Card>

//                 </div>
//               )}

//               {/* --- RESOURCES SECTION (Local State) --- */}
//               {activeSection === "resources" && (
//                 <Card>
//                   <CardHeader>
//                     <CardTitle>Post New Resource</CardTitle>
//                     <CardDescription>Add a new educational resource</CardDescription>
//                   </CardHeader>
//                   <CardContent>
//                     <Form {...resourceForm}>
//                       <form onSubmit={resourceForm.handleSubmit(onResourceSubmit)} className="space-y-4">
//                         <FormField control={resourceForm.control} name="category" render={({ field }) => (
//                           <FormItem><FormLabel>Category</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger></FormControl><SelectContent><SelectItem value="upsc-coaching">UPSC Resources</SelectItem><SelectItem value="ssc-banking">SSC & Banking</SelectItem><SelectItem value="engineering-medical">JEE & NEET</SelectItem><SelectItem value="state-exams">State PSC & Others</SelectItem></SelectContent></Select><FormMessage /></FormItem>
//                         )} />
//                         <FormField control={resourceForm.control} name="title" render={({ field }) => (
//                           <FormItem><FormLabel>Resource Title</FormLabel><FormControl><Input placeholder="e.g., BYJU'S IAS Coaching" {...field} /></FormControl><FormMessage /></FormItem>
//                         )} />
//                         <FormField control={resourceForm.control} name="description" render={({ field }) => (
//                           <FormItem><FormLabel>Description</FormLabel><FormControl><Textarea placeholder="e.g., Comprehensive UPSC preparation with live classes" className="min-h-[80px]" {...field} /></FormControl><FormMessage /></FormItem>
//                         )} />
//                         <FormField control={resourceForm.control} name="link" render={({ field }) => (
//                           <FormItem><FormLabel>Link</FormLabel><FormControl><Input placeholder="e.g., https://byjus.com/ias/" {...field} /></FormControl><FormMessage /></FormItem>
//                         )} />
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                           <FormField control={resourceForm.control} name="institute" render={({ field }) => (
//                             <FormItem><FormLabel>Institute Name</FormLabel><FormControl><Input placeholder="e.g., BYJU'S" {...field} /></FormControl><FormMessage /></FormItem>
//                           )} />
//                           <FormField control={resourceForm.control} name="badge" render={({ field }) => (
//                             <FormItem><FormLabel>Badge (Optional)</FormLabel><FormControl><Input placeholder="e.g., Popular, New, Updated" {...field} /></FormControl><FormMessage /></FormItem>
//                           )} />
//                         </div>
//                         <Button type="submit" className="w-full">Post Resource</Button>
//                       </form>
//                     </Form>
//                   </CardContent>
//                 </Card>
//               )}

//               {/* --- QUIZ SECTION --- */}
//               {activeSection === "quiz" && <QuizManagement />}
//             </div>
//           </div>
//         </SidebarInset>
//       </div>
//     </SidebarProvider>
//   );
// };

// export default Dashboard;