import * as z from "zod";

// --- COMPREHENSIVE JOB SCHEMA ---
export const jobSchema = z.object({
  jobId: z.string().min(1, "Job ID is required"),
  title: z.string().min(5, "Title must be at least 5 characters"),
  slug: z.string().optional(),
  postDate: z.string().min(1, "Post date is required"),
  organization: z.string().min(3, "Organization name is required"),
  advertisementNo: z.string().optional(),
  category: z.enum(["State Govt", "Central Govt", "Defence", "Police", "Other"]),
  jobType: z.string().optional(),
  location: z.string().min(2, "Location required"),
  totalPosts: z.coerce.number().optional().or(z.literal('')),
  
  postDetails: z.array(z.object({
    postName: z.string().min(1, "Post name is required"),
    numberOfPosts: z.coerce.number().optional().or(z.literal('')),
    eligibility: z.string().optional(),
  })).optional(),

  eligibilityCriteria: z.object({
    education: z.string().min(3, "Education qualification is required"),
    ageLimit: z.object({
      min: z.coerce.number().optional().or(z.literal('')),
      max: z.coerce.number().optional().or(z.literal('')),
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
    minMarks: z.coerce.number().optional().or(z.literal('')),
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
    general: z.coerce.number().optional().or(z.literal('')),
    obc: z.coerce.number().optional().or(z.literal('')),
    sc: z.coerce.number().optional().or(z.literal('')),
    st: z.coerce.number().optional().or(z.literal('')),
    ews: z.coerce.number().optional().or(z.literal('')),
    female: z.coerce.number().optional().or(z.literal('')),
    correctionCharge: z.coerce.number().optional().or(z.literal('')),
    paymentModes: z.array(z.object({
      value: z.string().min(1, "Payment mode cannot be empty")
    })).optional(),
  }),

  selectionProcess: z.array(z.object({
    value: z.string().min(1, "Selection step cannot be empty")
  })).optional(),

  links: z.object({
    officialWebsite: z.string().url().optional().or(z.literal('')),
    applyOnline: z.string().url().optional().or(z.literal('')),
    notificationPDF: z.string().url().optional().or(z.literal('')),
    admitCard: z.string().url().optional().or(z.literal('')),
    result: z.string().url().optional().or(z.literal('')),
    answerKey: z.string().url().optional().or(z.literal('')),
    scoreCard: z.string().url().optional().or(z.literal('')),
    cutoff: z.string().url().optional().or(z.literal('')),
    correctionLink: z.string().url().optional().or(z.literal('')),
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
    twitter: z.string().url().optional().or(z.literal('')),
    telegram: z.string().url().optional().or(z.literal('')),
    facebook: z.string().url().optional().or(z.literal('')),
  }).optional(),
});

export type ComprehensiveJobData = z.infer<typeof jobSchema> & { customFields?: Record<string, any>, id?: string, _id?: string };

// --- COMPREHENSIVE ADMISSION SCHEMA ---
export const admissionSchema = z.object({
  admissionId: z.string().min(1, "Admission ID is required"),
  title: z.string().min(5, "Title must be at least 5 characters"),
  postDate: z.string().min(1, "Post date is required"),
  organization: z.string().min(3, "Organization name is required"),
  examName: z.string().optional(),
  session: z.string().optional(),
  category: z.enum(["Engineering Entrance", "Teaching Entrance", "Polytechnic Entrance", "Medical Entrance", "Other"]),
  admissionType: z.enum(["Online Form", "Admit Card", "Result", "Answer Key", "Counselling"]),
  totalSeats: z.coerce.number().optional().or(z.literal('')),
  courseDetails: z.array(z.object({
    courseName: z.string().optional(),
    duration: z.string().optional(),
    eligibility: z.string().optional(),
    groupCode: z.string().optional(),
    qualificationRequired: z.string().optional(),
  })).optional(),
  eligibilityCriteria: z.object({
    education: z.string().min(5, "Educational eligibility required"),
    ageLimit: z.object({
      min: z.coerce.number().optional().or(z.literal('')),
      max: z.coerce.number().optional().or(z.literal('')),
      referenceDate: z.string().optional(),
      relaxationDetails: z.string().optional(),
    }).optional(),
    additionalRequirements: z.string().optional(),
  }),
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
  applicationFee: z.object({
    general: z.coerce.number().optional().or(z.literal('')),
    obc: z.coerce.number().optional().or(z.literal('')),
    ews: z.coerce.number().optional().or(z.literal('')),
    sc: z.coerce.number().optional().or(z.literal('')),
    st: z.coerce.number().optional().or(z.literal('')),
    pwd: z.coerce.number().optional().or(z.literal('')),
    female: z.coerce.number().optional().or(z.literal('')),
    bothPapers: z.coerce.number().optional().or(z.literal('')),
    paymentModes: z.string().optional(),
  }),
  process: z.object({
    mode: z.string().optional(),
    selectionSteps: z.string().optional(),
  }).optional(),
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
  status: z.object({
    isApplicationOpen: z.boolean().default(false),
    isCorrectionWindowOpen: z.boolean().default(false),
    isAdmitCardAvailable: z.boolean().default(false),
    isAnswerKeyReleased: z.boolean().default(false),
    isResultDeclared: z.boolean().default(false),
    isCounsellingActive: z.boolean().default(false),
  }),
  extraInfo: z.object({
    documentsRequired: z.string().optional(),
    syllabusTopics: z.string().optional(),
    examPattern: z.string().optional(),
    helpdesk: z.object({
      phone: z.string().optional(),
      email: z.string().email("Must be a valid email").optional().or(z.literal('')),
    }).optional(),
    counselingDetails: z.object({
      registrationFee: z.coerce.number().optional().or(z.literal('')),
      seatAcceptanceFee: z.coerce.number().optional().or(z.literal('')),
      steps: z.string().optional(),
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

export type ComprehensiveAdmissionData = z.infer<typeof admissionSchema> & { customFields?: Record<string, any>, id?: string, _id?: string };

// --- HELPER FUNCTIONS ---
export const formatDateForInput = (dateString?: string | Date) => {
  if (!dateString) return "";
  try {
    return new Date(dateString).toISOString().split('T')[0];
  } catch (e) {
    return "";
  }
};

export const splitCsv = (input?: string | number | string[] | number[]): string[] => {
  if (!input) return [];
  if (Array.isArray(input)) {
    return input.map(item => String(item).trim()).filter(Boolean);
  }
  const str = String(input);
  if (str.trim() === "") return [];
  return str.split(',').map(s => s.trim()).filter(Boolean);
};

export const toNumberOrUndefined = (val: string | number | undefined) => {
  if (val === "" || val === undefined) return undefined;
  const num = Number(val);
  return isNaN(num) ? undefined : num;
};

export const toCsv = (arr?: string[] | number[]) => {
  if (!arr || arr.length === 0) return "";
  return arr.join(', ');
};

export const toStringOrEmpty = (val: any) => {
  return val === null || val === undefined ? "" : String(val);
};

export const toFormNumber = (val: any): number | "" | undefined => {
  if (val === null || val === undefined) return "";
  if (val === "") return "";
  const num = Number(val);
  return isNaN(num) ? "" : num;
};

// --- NORMALIZE JOB (for form) ---
export const get = (obj: any, path: string) => {
  return path.split('.').reduce((acc, part) => acc && acc[part], obj);
};

export const set = (obj: any, path: string, value: any) => {
  const parts = path.split('.');
  const last = parts.pop()!;
  const target = parts.reduce((acc, part) => {
    if (!acc[part]) acc[part] = {};
    return acc[part];
  }, obj);
  target[last] = value;
};

export const normalizeJob = (job: any): ComprehensiveJobData => {
  const dbId = job.id || job._id;
  const { _id, ...rest } = job;

  const data: ComprehensiveJobData = {
    ...rest,
    id: String(dbId),
    eligibilityCriteria: { ...job.eligibilityCriteria },
    importantDates: { ...job.importantDates },
    applicationFee: { ...job.applicationFee },
    links: { ...job.links },
    status: { ...job.status },
    extraInfo: { ...job.extraInfo,
      totalCandidates: job.extraInfo?.totalCandidates || "",
      qualified: job.extraInfo?.qualified || "", },
    socialLinks: { ...job.socialLinks },
  };

  // Transform array-of-strings to array-of-objects for the form
  if (job.eligibilityCriteria?.ageLimit?.additionalAgeRules) {
    data.eligibilityCriteria.ageLimit.additionalAgeRules = 
      job.eligibilityCriteria.ageLimit.additionalAgeRules.map((value: string) => ({ value }));
  }
  
  if (job.eligibilityCriteria?.additionalCertifications) {
    data.eligibilityCriteria.additionalCertifications = 
      job.eligibilityCriteria.additionalCertifications.map((value: string) => ({ value }));
  }
  
  if (job.applicationFee?.paymentModes) {
    data.applicationFee.paymentModes = 
      job.applicationFee.paymentModes.map((value: string) => ({ value }));
  }
  
  if (job.selectionProcess) {
    data.selectionProcess = 
      job.selectionProcess.map((value: string) => ({ value }));
  }
  
  if (job.extraInfo?.documentsRequired) {
    data.extraInfo.documentsRequired = 
      job.extraInfo.documentsRequired.map((value: string) => ({ value }));
  }
  
  if (job.extraInfo?.examPattern) {
    data.extraInfo.examPattern = 
      job.extraInfo.examPattern.map((value: string) => ({ value }));
  }

  // Date formatting for form inputs
  data.postDate = formatDateForInput(data.postDate);
  if (data.eligibilityCriteria?.ageLimit) {
    data.eligibilityCriteria.ageLimit.referenceDate = formatDateForInput(data.eligibilityCriteria.ageLimit.referenceDate);
  }
  data.importantDates.notificationDate = formatDateForInput(data.importantDates.notificationDate);
  data.importantDates.applicationStart = formatDateForInput(data.importantDates.applicationStart);
  data.importantDates.applicationEnd = formatDateForInput(data.importantDates.applicationEnd);
  data.importantDates.feePaymentLastDate = formatDateForInput(data.importantDates.feePaymentLastDate);
  data.importantDates.admitCardDate = formatDateForInput(data.importantDates.admitCardDate);
  data.importantDates.answerKeyDate = formatDateForInput(data.importantDates.answerKeyDate);
  data.importantDates.resultDate = formatDateForInput(data.importantDates.resultDate);
  data.importantDates.scoreCardDate = formatDateForInput(data.importantDates.scoreCardDate);
  if (data.importantDates.correctionWindow) {
    data.importantDates.correctionWindow.start = formatDateForInput(data.importantDates.correctionWindow.start);
    data.importantDates.correctionWindow.end = formatDateForInput(data.importantDates.correctionWindow.end);
  }

  // Number field conversions
  data.totalPosts = toFormNumber(job.totalPosts);
  if (data.applicationFee) {
    data.applicationFee.general = toFormNumber(job.applicationFee.general);
    data.applicationFee.obc = toFormNumber(job.applicationFee.obc);
    data.applicationFee.sc = toFormNumber(job.applicationFee.sc);
    data.applicationFee.st = toFormNumber(job.applicationFee.st);
    data.applicationFee.ews = toFormNumber(job.applicationFee.ews);
    data.applicationFee.female = toFormNumber(job.applicationFee.female);
    data.applicationFee.correctionCharge = toFormNumber(job.applicationFee.correctionCharge);
  }
  if (data.eligibilityCriteria?.ageLimit) {
    data.eligibilityCriteria.ageLimit.min = toFormNumber(job.eligibilityCriteria.ageLimit.min);
    data.eligibilityCriteria.ageLimit.max = toFormNumber(job.eligibilityCriteria.ageLimit.max);
  }

  data.location = toStringOrEmpty(job.location);

  return data as ComprehensiveJobData;
};

// --- NORMALIZE ADMISSION (for form) ---
export const normalizeAdmission = (admission: any): ComprehensiveAdmissionData => {
  const dbId = admission.id || admission._id;
  const { _id, ...rest } = admission;

  const data: ComprehensiveAdmissionData = {
    ...rest,
    id: String(dbId),
    eligibilityCriteria: { ...admission.eligibilityCriteria },
    importantDates: { ...admission.importantDates },
    applicationFee: { ...admission.applicationFee },
    process: { ...admission.process },
    links: { ...admission.links },
    status: { ...admission.status },
    extraInfo: { ...admission.extraInfo,
      totalCandidates: admission.extraInfo?.totalCandidates || "",
      qualified: admission.extraInfo?.qualified || "",
    },
  };

  // Convert array fields to comma-separated strings
  if (data.eligibilityCriteria) {
    data.eligibilityCriteria.additionalRequirements = toCsv(admission.eligibilityCriteria.additionalRequirements as string[]);
  }
  if (data.applicationFee) {
    data.applicationFee.paymentModes = toCsv(admission.applicationFee.paymentModes as string[]);
  }
  if (data.process) {
    data.process.selectionSteps = toCsv(admission.process.selectionSteps as string[]);
  }
  if (data.extraInfo) {
    data.extraInfo.documentsRequired = toCsv(admission.extraInfo.documentsRequired as string[]);
    data.extraInfo.syllabusTopics = toCsv(admission.extraInfo.syllabusTopics as string[]);
    data.extraInfo.examPattern = toCsv(admission.extraInfo.examPattern as string[]);
    if (data.extraInfo.counselingDetails) {
      data.extraInfo.counselingDetails.steps = toCsv(admission.extraInfo.counselingDetails.steps as string[]);
    }
  }

  // Format dates for input fields
  data.postDate = formatDateForInput(data.postDate);
  if (data.eligibilityCriteria?.ageLimit) {
    data.eligibilityCriteria.ageLimit.referenceDate = formatDateForInput(data.eligibilityCriteria.ageLimit.referenceDate);
  }
  if (data.importantDates) {
    data.importantDates.notificationDate = formatDateForInput(data.importantDates.notificationDate);
    data.importantDates.applicationStart = formatDateForInput(data.importantDates.applicationStart);
    data.importantDates.applicationEnd = formatDateForInput(data.importantDates.applicationEnd);
    data.importantDates.feePaymentLastDate = formatDateForInput(data.importantDates.feePaymentLastDate);
    data.importantDates.examCityDate = formatDateForInput(data.importantDates.examCityDate);
    data.importantDates.admitCardDate = formatDateForInput(data.importantDates.admitCardDate);
    data.importantDates.answerKeyDate = formatDateForInput(data.importantDates.answerKeyDate);
    data.importantDates.resultDate = formatDateForInput(data.importantDates.resultDate);
    if (data.importantDates.correctionWindow) {
      data.importantDates.correctionWindow.start = formatDateForInput(data.importantDates.correctionWindow.start);
      data.importantDates.correctionWindow.end = formatDateForInput(data.importantDates.correctionWindow.end);
    }
  }

  // Use toFormNumber for fields that are (number | "" | undefined)
  data.totalSeats = toFormNumber(admission.totalSeats);
  if (data.applicationFee) {
    data.applicationFee.general = toFormNumber(admission.applicationFee.general);
    data.applicationFee.obc = toFormNumber(admission.applicationFee.obc);
    data.applicationFee.ews = toFormNumber(admission.applicationFee.ews);
    data.applicationFee.sc = toFormNumber(admission.applicationFee.sc);
    data.applicationFee.st = toFormNumber(admission.applicationFee.st);
    data.applicationFee.pwd = toFormNumber(admission.applicationFee.pwd);
    data.applicationFee.female = toFormNumber(admission.applicationFee.female);
    data.applicationFee.bothPapers = toFormNumber(admission.applicationFee.bothPapers);
  }
  if (data.eligibilityCriteria?.ageLimit) {
    data.eligibilityCriteria.ageLimit.min = toFormNumber(admission.eligibilityCriteria.ageLimit.min);
    data.eligibilityCriteria.ageLimit.max = toFormNumber(admission.eligibilityCriteria.ageLimit.max);
  }
  if (data.extraInfo?.counselingDetails) {
    data.extraInfo.counselingDetails.registrationFee = toFormNumber(admission.extraInfo.counselingDetails.registrationFee);
    data.extraInfo.counselingDetails.seatAcceptanceFee = toFormNumber(admission.extraInfo.counselingDetails.seatAcceptanceFee);
  }
  if (data.courseDetails) data.courseDetails = data.courseDetails || [];
  if (data.extraInfo) {
    data.extraInfo.cutoffMarks = data.extraInfo.cutoffMarks || [];
    data.extraInfo.faqs = data.extraInfo.faqs || [];
  }

  return data as ComprehensiveAdmissionData;
};

// Add to your existing schemas.js

// Normalize Scheme function
// --- NORMALIZE SCHEME (for form) ---
// In your schemas.js, update the normalizeScheme function:

export const normalizeScheme = (scheme: any): GovtSchemeData => {
  const dbId = scheme.id || scheme._id;
  const { _id, ...rest } = scheme;

  const data: GovtSchemeData = {
    ...rest,
    id: String(dbId),
    financialInfo: { ...scheme.financialInfo },
    links: { ...scheme.links },
    status: { ...scheme.status },
    extraInfo: { ...scheme.extraInfo },
    socialLinks: { ...scheme.socialLinks },
  };

  // Transform array-of-strings to array-of-objects for the form
  if (scheme.eligibilityDetails) {
    data.eligibilityDetails = scheme.eligibilityDetails.map((value: string) => ({ value }));
  }
  
  // FIX: benefits is now a string, not an array
  // Remove this transformation for benefits
  // if (scheme.benefits) {
  //   data.benefits = scheme.benefits.map((value: string) => ({ value }));
  // }
  
  if (scheme.benefitsDetails) {
    data.benefitsDetails = scheme.benefitsDetails.map((value: string) => ({ value }));
  }
  
  if (scheme.objectives) {
    data.objectives = scheme.objectives.map((value: string) => ({ value }));
  }
  
  if (scheme.howToApply) {
    data.howToApply = scheme.howToApply.map((value: string) => ({ value }));
  }
  
  if (scheme.documents) {
    data.documents = scheme.documents.map((value: string) => ({ value }));
  }
  
  if (scheme.targetAudience) {
    data.targetAudience = scheme.targetAudience.map((value: string) => ({ value }));
  }

  if (scheme.extraInfo?.successStories) {
    data.extraInfo.successStories = scheme.extraInfo.successStories.map((value: string) => ({ value }));
  }
  
  if (scheme.extraInfo?.coverageAreas) {
    data.extraInfo.coverageAreas = scheme.extraInfo.coverageAreas.map((value: string) => ({ value }));
  }

  // Date formatting for form inputs
  data.launchDate = formatDateForInput(data.launchDate);
  data.lastDate = formatDateForInput(data.lastDate);

  // Ensure optional arrays exist
  if (!data.eligibilityDetails) data.eligibilityDetails = [];
  if (!data.benefitsDetails) data.benefitsDetails = [];
  if (!data.objectives) data.objectives = [];
  if (!data.howToApply) data.howToApply = [];
  if (!data.documents) data.documents = [];
  if (!data.targetAudience) data.targetAudience = [];
  if (!data.extraInfo) data.extraInfo = {};
  if (!data.extraInfo.faqs) data.extraInfo.faqs = [];
  if (!data.extraInfo.successStories) data.extraInfo.successStories = [];
  if (!data.extraInfo.coverageAreas) data.extraInfo.coverageAreas = [];
  if (!data.extraInfo.attachments) data.extraInfo.attachments = [];

  return data as GovtSchemeData;
};

// --- GOVERNMENT SCHEME SCHEMA (Updated to match form and MongoDB) ---
export const govtSchemeSchema = z.object({
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
  department: z.string().min(2, "Department name is required"), // Changed from 'ministry'
  launchDate: z.string().min(1, "Launch date is required"),
  lastDate: z.string().optional(), // Changed from 'validTill'
  
  // Eligibility & Benefits
  eligibility: z.string().min(1, "Eligibility is required"),
  eligibilityDetails: z.array(z.object({
    value: z.string().min(1, "Eligibility detail cannot be empty")
  })).optional(),
  benefits: z.string().min(1, "Benefits description is required"), // CHANGED FROM ARRAY TO STRING
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

export type GovtSchemeData = z.infer<typeof govtSchemeSchema> & { 
  customFields?: Record<string, any>, 
  id?: string, 
  _id?: string,
  meta?: {
    views: number;
    shares: number;
    applications: number;
  };
  createdAt?: string;
  updatedAt?: string;
};