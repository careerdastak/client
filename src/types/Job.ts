// src/types/Job.ts
export interface Job {
  id: string;
  title: string;
  organization: string;
  advertisementNo?: string;
  category?: string;
  jobType?: string;
  totalPosts?: number;
  location?: string;
  postDetails?: {
    postName: string;
    numberOfPosts: number;
    eligibility?: string;
  }[];
  eligibilityCriteria?: {
    education?: string;
    ageLimit?: {
      min?: number;
      max?: number;
      referenceDate?: string;
    };
  };
  applicationFee?: {
    general?: number;
    obc?: number;
    sc?: number;
    st?: number;
    female?: number;
    ews?: number;
    correctionCharge?: number;
    paymentModes?: string[];
  };
  importantDates?: {
    notificationDate?: string;
    applicationStart?: string;
    applicationEnd?: string;
    feePaymentLastDate?: string;
    correctionWindow?: { start?: string; end?: string };
    examDate?: string;
    admitCardDate?: string;
    answerKeyDate?: string;
    resultDate?: string;
    scoreCardDate?: string;
    physicalTestDate?: string;
    documentVerificationDate?: string;
  };
  selectionProcess?: string[];
  links?: {
    officialWebsite?: string;
    applyOnline?: string;
    notificationPDF?: string;
    admitCard?: string;
    result?: string;
    answerKey?: string;
    scoreCard?: string;
    cutoff?: string;
    correctionLink?: string;
  };
  status?: {
    isApplicationOpen?: boolean;
    isAdmitCardAvailable?: boolean;
    isAnswerKeyReleased?: boolean;
    isResultDeclared?: boolean;
    isCorrectionWindowOpen?: boolean;
    isPublished?: boolean;
    isArchived?: boolean;
  };
  extraInfo?: {
    faqs?: { question: string; answer: string }[];
    documentsRequired?: string[];
    examPattern?: string[];
    attachments?: { name: string; url: string; type: string }[];
  };
}
