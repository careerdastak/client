// import { useParams, Link } from "react-router-dom";
// import { useQuery } from "@tanstack/react-query";
// import axios from "axios";
// import Header from "@/components/Header";
// import Footer from "@/components/Footer";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import {
//   Calendar,
//   MapPin,
//   GraduationCap,
//   Users,
//   IndianRupee,
//   FileText,
//   ExternalLink,
//   CheckCircle,
//   ArrowLeft,
//   Briefcase,
//   ListChecks,
//   HeartPulse,
//   Target,
//   FileCheck,
//   Download,
//   Share2,
//   Twitter,
//   Facebook,
//   Send, // For Telegram
//   CircleDollarSign,
//   ShieldCheck,
//   Plus,
// } from "lucide-react";

// // ---- Updated Job interface (matches schema) ----
// interface Job {
//   _id: string;
//   jobId: string;
//   title: string;
//   slug: string;
//   postDate: string;
//   organization: string;
//   advertisementNo?: string;
//   category?: string;
//   jobType?: string;
//   totalPosts?: number;
//   location?: string;

//   postDetails?: {
//     postName: string;
//     numberOfPosts: number;
//     eligibility?: string;
//   }[];

//   eligibilityCriteria?: {
//     education?: string;
//     ageLimit?: {
//       min?: number;
//       max?: number;
//       referenceDate?: string;
//       additionalAgeRules?: string[];
//       ageRelaxationRules?: string;
//     };
//     additionalCertifications?: string[];
//   };

//   eligibilityDetails?: {
//     qualification: string;
//     minMarks?: number;
//     remark?: string;
//   }[];

//   importantDates?: {
//     notificationDate?: string;
//     applicationStart?: string;
//     applicationEnd?: string;
//     feePaymentLastDate?: string;
//     correctionWindow?: { start?: string; end?: string };
//     examDate?: string;
//     admitCardDate?: string;
//     answerKeyDate?: string;
//     resultDate?: string;
//     scoreCardDate?: string;
//     physicalTestDate?: string;
//     documentVerificationDate?: string;
//   };

//   applicationFee?: {
//     general?: number;
//     obc?: number;
//     sc?: number;
//     st?: number;
//     ews?: number;
//     female?: number;
//     correctionCharge?: number;
//     paymentModes?: string[];
//   };

//   selectionProcess?: string[];

//   links?: {
//     officialWebsite?: string;
//     applyOnline?: string;
//     notificationPDF?: string;
//     admitCard?: string;
//     result?: string;
//     answerKey?: string;
//     scoreCard?: string;
//     cutoff?: string;
//     correctionLink?: string;
//   };

//   status?: {
//     isApplicationOpen?: boolean;
//     isAdmitCardAvailable?: boolean;
//     isAnswerKeyReleased?: boolean;
//     isResultDeclared?: boolean;
//     isCorrectionWindowOpen?: boolean;
//     isPublished?: boolean;
//     isArchived?: boolean;
//   };

//   extraInfo?: {
//     documentsRequired?: string[];
//     examPattern?: string[];
//     physicalStandards?: {
//       height?: { male?: string; female?: string };
//       chest?: { male?: string };
//       running?: { male?: string; female?: string };
//     };
//     cutoffMarks?: {
//       category: string;
//       expected: string;
//     }[];
//     faqs?: { question: string; answer: string }[];
//     attachments?: { name: string; url: string; type: string }[];
//   };

//   socialLinks?: {
//     twitter?: string;
//     telegram?: string;
//     facebook?: string;
//   };

//   viewCount?: number;
//   applicationCount?: number;
//   createdAt?: string;
//   updatedAt?: string;
// }

// // ---- Helper functions ----
// const formatDate = (dateStr?: string) => {
//   if (!dateStr) return "To be announced";
//   const d = new Date(dateStr);
//   // Check if date is valid
//   if (isNaN(d.getTime())) {
//     // If it's not a valid date, it might be a string like "JAN 2026"
//     return dateStr;
//   }
//   return d.toLocaleDateString("en-IN", {
//     day: "2-digit",
//     month: "short",
//     year: "numeric",
//   });
// };

// const formatFee = (fee?: number) => {
//   if (fee === 0) return "Free";
//   if (fee == undefined || fee == -1) return "-";
//   if (fee) return `₹${fee}`;
//   return "N/A";
// };

// // Helper component for Important Dates
// const DateEntry = ({
//   label,
//   value,
// }: {
//   label: string;
//   value?: string | { start?: string; end?: string };
// }) => {
//   if (!value) return null;

//   let displayValue = "To be announced";
//   if (typeof value === "string") {
//     displayValue = formatDate(value);
//   } else if (typeof value === "object" && (value.start || value.end)) {
//     displayValue = `${formatDate(value.start)} - ${formatDate(value.end)}`;
//   }

//   if (displayValue === "To be announced") return null;

//   return (
//     <div className="flex justify-between items-center py-2 px-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
//       <span className="capitalize font-medium text-foreground">{label}</span>
//       <Badge variant="outline" className="font-semibold text-right">
//         {displayValue}
//       </Badge>
//     </div>
//   );
// };

// // Helper component for Additional Age Rules
// const AdditionalAgeRules = ({ rules }: { rules?: string[] }) => {
//   if (!rules || rules.length === 0) return null;

//   return (
//     <div className="mt-4 space-y-2">
//       <p className="font-semibold text-foreground mb-2">Additional Age Rules:</p>
//       <div className="space-y-2">
//         {rules.map((rule, index) => (
//           <div
//             key={index}
//             className="flex items-start gap-2 p-3 rounded-lg bg-blue-50 border border-blue-200"
//           >
//             <Plus className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
//             <span className="text-sm text-blue-800">{rule}</span>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// // ---- JobDetail component ----
// const JobDetail = () => {
//   const { slug } = useParams();

//   const {
//     data: job,
//     isLoading,
//     error,
//   } = useQuery<Job>({
//     queryKey: ["job", slug],
//     queryFn: async () => {
//       // Use the slug (id) to fetch
//       const res = await axios.get(
//         `${import.meta.env.VITE_BACKEND_URL}/api/jobs/slug/${slug}`
//       );
//       return res.data;
//     },
//     enabled: !!slug,
//   });

//   if (isLoading)
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         Loading...
//       </div>
//     );

//   if (error || !job) {
//     return (
//       <div className="min-h-screen bg-background flex flex-col">
//         <Header />
//         <main className="flex-1 container mx-auto px-4 py-12 text-center">
//           <h1 className="text-2xl font-bold mb-4">Job Not Found</h1>
//           <Link to="/latest-jobs">
//             <Button>Back to Latest Jobs</Button>
//           </Link>
//         </main>
//         <Footer />
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-background flex flex-col">
//       <Header />

//       <main className="flex-1">
//         {/* Hero */}
//         <div className="bg-gradient-to-br from-primary via-primary/90 to-accent text-primary-foreground py-6 md:py-8">
//           <div className="container mx-auto px-4 max-w-5xl">
//             <Link
//               to="/latest-jobs"
//               className="inline-flex items-center gap-2 text-primary-foreground/90 hover:text-primary-foreground mb-4 transition-colors"
//             >
//               <ArrowLeft className="h-4 w-4" />
//               Back to Jobs
//             </Link>
//             <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
//               <div className="flex-1">
//                 {job.status?.isApplicationOpen && (
//                   <Badge className="bg-green-500 text-white border-0 mb-2">
//                     Application Open
//                   </Badge>
//                 )}
//                 <h1 className="text-2xl md:text-3xl font-bold mb-2">
//                   {job.title}
//                 </h1>
//                 <p className="text-primary-foreground/90 text-lg">
//                   {job.organization}
//                 </p>
//                 {job.advertisementNo && (
//                   <p className="text-primary-foreground/80 text-sm mt-1">
//                     Advertisement No: {job.advertisementNo}
//                   </p>
//                 )}

//                 <div className="flex flex-wrap gap-2 mt-3">
//                   {job.category && (
//                     <Badge variant="secondary" className="text-xs">
//                       {job.category}
//                     </Badge>
//                   )}
//                   {job.location && (
//                     <Badge
//                       variant="secondary"
//                       className="flex items-center gap-1 text-xs"
//                     >
//                       <MapPin className="h-3 w-3" /> {job.location}
//                     </Badge>
//                   )}
//                   {job.jobType && (
//                     <Badge
//                       variant="secondary"
//                       className="flex items-center gap-1 text-xs"
//                     >
//                       <Briefcase className="h-3 w-3" /> {job.jobType}
//                     </Badge>
//                   )}
//                 </div>
//               </div>

//               {job.links?.applyOnline && (
//                 <Button
//                   size="lg"
//                   className="bg-white text-primary hover:bg-white/90 font-semibold shadow-lg flex-shrink-0"
//                   asChild
//                 >
//                   <a
//                     href={job.links.applyOnline}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                   >
//                     Apply Now <ExternalLink className="h-4 w-4 ml-2" />
//                   </a>
//                 </Button>
//               )}
//             </div>
//           </div>
//         </div>

//         <div className="container mx-auto px-4 py-6 md:py-8 max-w-5xl">
//           {/* Quick Stats */}
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
//             <Card className="text-center">
//               <CardContent className="pt-6">
//                 <Users className="h-8 w-8 mx-auto mb-2 text-primary" />
//                 <p className="text-2xl font-bold text-foreground">
//                   {job.totalPosts ?? 0}
//                 </p>
//                 <p className="text-sm text-muted-foreground">Total Posts</p>
//               </CardContent>
//             </Card>
//             <Card className="text-center">
//               <CardContent className="pt-6">
//                 <Calendar className="h-8 w-8 mx-auto mb-2 text-destructive" />
//                 <p className="text-lg font-bold text-foreground">
//                   {formatDate(job.importantDates?.applicationEnd)}
//                 </p>
//                 <p className="text-sm text-muted-foreground">Last Date</p>
//               </CardContent>
//             </Card>
//             <Card className="text-center">
//               <CardContent className="pt-6">
//                 <FileText className="h-8 w-8 mx-auto mb-2 text-blue-500" />
//                 <p className="text-lg font-bold text-foreground">
//                   {formatDate(job.importantDates?.examDate)}
//                 </p>
//                 <p className="text-sm text-muted-foreground">Exam Date</p>
//               </CardContent>
//             </Card>
//             <Card className="text-center">
//               <CardContent className="pt-6">
//                 <IndianRupee className="h-8 w-8 mx-auto mb-2 text-green-500" />
//                 <p className="text-lg font-bold text-foreground">
//                   {formatFee(job.applicationFee?.general)}
//                 </p>
//                 <p className="text-sm text-muted-foreground">Fee (General)</p>
//               </CardContent>
//             </Card>
//           </div>

//           <div className="grid md:grid-cols-3 gap-6">
//             {/* Left content */}
//             <div className="md:col-span-2 space-y-6">
//               {/* Important Dates */}
//               {job.importantDates && (
//                 <Card>
//                   <CardHeader className="bg-accent/5">
//                     <CardTitle className="flex items-center gap-2">
//                       <Calendar className="h-5 w-5 text-primary" />
//                       Important Dates
//                     </CardTitle>
//                   </CardHeader>
//                   <CardContent className="pt-6 space-y-2">
//                     <DateEntry
//                       label="Notification Date"
//                       value={job.importantDates.notificationDate}
//                     />
//                     <DateEntry
//                       label="Application Start"
//                       value={job.importantDates.applicationStart}
//                     />
//                     <DateEntry
//                       label="Application End"
//                       value={job.importantDates.applicationEnd}
//                     />
//                     <DateEntry
//                       label="Fee Payment Last Date"
//                       value={job.importantDates.feePaymentLastDate}
//                     />
//                     <DateEntry
//                       label="Correction Window"
//                       value={job.importantDates.correctionWindow}
//                     />
//                     <DateEntry
//                       label="Exam Date"
//                       value={job.importantDates.examDate}
//                     />
//                     <DateEntry
//                       label="Admit Card Available"
//                       value={job.importantDates.admitCardDate}
//                     />
//                     <DateEntry
//                       label="Answer Key Released"
//                       value={job.importantDates.answerKeyDate}
//                     />
//                     <DateEntry
//                       label="Result Declared"
//                       value={job.importantDates.resultDate}
//                     />
//                     <DateEntry
//                       label="Score Card Available"
//                       value={job.importantDates.scoreCardDate}
//                     />
//                     <DateEntry
//                       label="Physical Test Date"
//                       value={job.importantDates.physicalTestDate}
//                     />
//                     <DateEntry
//                       label="Document Verification"
//                       value={job.importantDates.documentVerificationDate}
//                     />
//                   </CardContent>
//                 </Card>
//               )}

//               {/* Application Fee */}
//               {job.applicationFee && (
//                 <Card>
//                   <CardHeader className="bg-accent/5">
//                     <CardTitle className="flex items-center gap-2">
//                       <CircleDollarSign className="h-5 w-5 text-primary" />
//                       Application Fee
//                     </CardTitle>
//                   </CardHeader>
//                   <CardContent className="pt-6">
//                     <div className="grid grid-cols-2 gap-4">
//                       {job.applicationFee.general !== undefined && (
//                         <div className="flex justify-between p-2 rounded bg-muted/50">
//                           <span className="text-muted-foreground">General</span>{" "}
//                           <span className="font-semibold">
//                             {formatFee(job.applicationFee.general)}
//                           </span>
//                         </div>
//                       )}
//                       {job.applicationFee.obc !== undefined && (
//                         <div className="flex justify-between p-2 rounded bg-muted/50">
//                           <span className="text-muted-foreground">OBC</span>{" "}
//                           <span className="font-semibold">
//                             {formatFee(job.applicationFee.obc)}
//                           </span>
//                         </div>
//                       )}
//                       {job.applicationFee.ews !== undefined && (
//                         <div className="flex justify-between p-2 rounded bg-muted/50">
//                           <span className="text-muted-foreground">EWS</span>{" "}
//                           <span className="font-semibold">
//                             {formatFee(job.applicationFee.ews)}
//                           </span>
//                         </div>
//                       )}
//                       {job.applicationFee.sc !== undefined && (
//                         <div className="flex justify-between p-2 rounded bg-muted/50">
//                           <span className="text-muted-foreground">SC</span>{" "}
//                           <span className="font-semibold">
//                             {formatFee(job.applicationFee.sc)}
//                           </span>
//                         </div>
//                       )}
//                       {job.applicationFee.st !== undefined && (
//                         <div className="flex justify-between p-2 rounded bg-muted/50">
//                           <span className="text-muted-foreground">ST</span>{" "}
//                           <span className="font-semibold">
//                             {formatFee(job.applicationFee.st)}
//                           </span>
//                         </div>
//                       )}
//                       {job.applicationFee.female !== undefined && (
//                         <div className="flex justify-between p-2 rounded bg-muted/50">
//                           <span className="text-muted-foreground">Female</span>{" "}
//                           <span className="font-semibold">
//                             {formatFee(job.applicationFee.female)}
//                           </span>
//                         </div>
//                       )}
//                       {job.applicationFee.correctionCharge !== undefined || job.applicationFee.correctionCharge !== -1 && (
//                         <div className="flex justify-between p-2 rounded bg-muted/50">
//                           <span className="text-muted-foreground">
//                             Correction Charge
//                           </span>{" "}
//                           <span className="font-semibold">
//                             {formatFee(job.applicationFee.correctionCharge)}
//                           </span>
//                         </div>
//                       )}
//                     </div>
//                     {job.applicationFee.paymentModes?.length > 0 && (
//                       <p className="text-sm text-muted-foreground mt-4">
//                         Payment Modes:{" "}
//                         {job.applicationFee.paymentModes.join(", ")}
//                       </p>
//                     )}
//                   </CardContent>
//                 </Card>
//               )}

//               {/* Post Details */}
//               {job.postDetails?.length > 0 && (
//                 <Card>
//                   <CardHeader className="bg-accent/5">
//                     <CardTitle className="flex items-center gap-2">
//                       <FileText className="h-5 w-5 text-primary" />
//                       Post-wise Vacancy Breakup
//                     </CardTitle>
//                   </CardHeader>
//                   <CardContent className="pt-6 space-y-3">
//                     {job.postDetails.map((post, idx) => (
//                       <div key={idx} className="p-4 rounded-lg bg-muted/50">
//                         <div className="flex justify-between items-center">
//                           <span className="font-medium text-foreground">
//                             {post.postName}
//                           </span>
//                           <Badge variant="default" className="font-semibold">
//                             {post.numberOfPosts} Posts
//                           </Badge>
//                         </div>
//                         {post.eligibility && (
//                           <p className="text-sm text-muted-foreground mt-2">
//                             <strong>Eligibility:</strong> {post.eligibility}
//                           </p>
//                         )}
//                       </div>
//                     ))}
//                     <div className="mt-4 pt-4 border-t border-border flex justify-between items-center">
//                       <span className="font-bold text-foreground">
//                         Total Vacancies
//                       </span>
//                       <Badge
//                         variant="default"
//                         className="text-base px-4 py-1"
//                       >
//                         {job.totalPosts}
//                       </Badge>
//                     </div>
//                   </CardContent>
//                 </Card>
//               )}

//               {/* Eligibility Criteria */}
//               {job.eligibilityCriteria && (
//                 <Card>
//                   <CardHeader className="bg-accent/5">
//                     <CardTitle className="flex items-center gap-2">
//                       <CheckCircle className="h-5 w-5 text-primary" />
//                       Eligibility Criteria
//                     </CardTitle>
//                   </CardHeader>
//                   <CardContent className="pt-6 space-y-4">
//                     {job.eligibilityCriteria.education && (
//                       <div className="flex items-start gap-4">
//                         <GraduationCap className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
//                         <div className="flex-1">
//                           <p className="font-semibold text-foreground mb-1">
//                             Educational Qualification
//                           </p>
//                           <p className="text-muted-foreground whitespace-pre-line">
//                             {job.eligibilityCriteria.education}
//                           </p>
//                         </div>
//                       </div>
//                     )}
//                     {job.eligibilityCriteria.ageLimit && (
//                       <div className="flex items-start gap-4">
//                         <Users className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
//                         <div className="flex-1">
//                           <p className="font-semibold text-foreground mb-1">
//                             Age Limit
//                           </p>
//                           <p className="text-muted-foreground">
//                             {job.eligibilityCriteria.ageLimit.min ?? ""} -{" "}
//                             {job.eligibilityCriteria.ageLimit.max != -1 ? job.eligibilityCriteria.ageLimit.max : " "} years
//                             (as on{" "}
//                             {formatDate(
//                               job.eligibilityCriteria.ageLimit.referenceDate
//                             )}
//                             )
//                           </p>
                          
//                           {/* Additional Age Rules */}
//                           <AdditionalAgeRules 
//                             rules={job.eligibilityCriteria.ageLimit.additionalAgeRules} 
//                           />

//                           {job.eligibilityCriteria.ageLimit
//                             .ageRelaxationRules && (
//                             <p className="text-sm text-muted-foreground mt-3">
//                               <strong>Age Relaxation Rules:</strong>{" "}
//                               {
//                                 job.eligibilityCriteria.ageLimit
//                                   .ageRelaxationRules
//                               }
//                             </p>
//                           )}
//                         </div>
//                       </div>
//                     )}
//                     {job.eligibilityCriteria.additionalCertifications
//                       ?.length > 0 && (
//                       <div className="flex items-start gap-4">
//                         <ShieldCheck className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
//                         <div className="flex-1">
//                           <p className="font-semibold text-foreground mb-1">
//                             Additional Certifications
//                           </p>
//                           <div className="flex flex-wrap gap-2">
//                             {job.eligibilityCriteria.additionalCertifications.map(
//                               (cert, idx) => (
//                                 <Badge key={idx} variant="outline">
//                                   {cert}
//                                 </Badge>
//                               )
//                             )}
//                           </div>
//                         </div>
//                       </div>
//                     )}
//                   </CardContent>
//                 </Card>
//               )}

//               {/* Eligibility Details Table */}
//               {job.eligibilityDetails?.length > 0 && (
//                 <Card>
//                   <CardHeader className="bg-accent/5">
//                     <CardTitle className="flex items-center gap-2">
//                       <ShieldCheck className="h-5 w-5 text-primary" />
//                       Post-wise Eligibility Details
//                     </CardTitle>
//                   </CardHeader>
//                   <CardContent className="pt-6">
//                     <Table>
//                       <TableHeader>
//                         <TableRow>
//                           <TableHead>Qualification</TableHead>
//                           <TableHead>Min. Marks</TableHead>
//                           <TableHead>Remarks</TableHead>
//                         </TableRow>
//                       </TableHeader>
//                       <TableBody>
//                         {job.eligibilityDetails.map((detail, idx) => (
//                           <TableRow key={idx}>
//                             <TableCell className="font-medium">
//                               {detail.qualification}
//                             </TableCell>
//                             <TableCell>
//                               {detail.minMarks ? `${detail.minMarks}%` : "N/A"}
//                             </TableCell>
//                             <TableCell>{detail.remark || "N/A"}</TableCell>
//                           </TableRow>
//                         ))}
//                       </TableBody>
//                     </Table>
//                   </CardContent>
//                 </Card>
//               )}

//               {/* Selection Process */}
//               {job.selectionProcess?.length > 0 && (
//                 <Card>
//                   <CardHeader className="bg-accent/5">
//                     <CardTitle className="flex items-center gap-2">
//                       <ListChecks className="h-5 w-5 text-primary" />
//                       Selection Process
//                     </CardTitle>
//                   </CardHeader>
//                   <CardContent className="pt-6 space-y-3">
//                     {job.selectionProcess.map((step, idx) => (
//                       <div
//                         key={idx}
//                         className="flex items-start gap-3 p-4 rounded-lg bg-muted/50"
//                       >
//                         <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
//                           {idx + 1}
//                         </div>
//                         <p className="font-medium text-foreground mt-1">
//                           {step}
//                         </p>
//                       </div>
//                     ))}
//                   </CardContent>
//                 </Card>
//               )}

//               {/* Exam Pattern */}
//               {job.extraInfo?.examPattern?.length > 0 && (
//                 <Card>
//                   <CardHeader className="bg-accent/5">
//                     <CardTitle className="flex items-center gap-2">
//                       <ListChecks className="h-5 w-5 text-primary" />
//                       Exam Pattern
//                     </CardTitle>
//                   </CardHeader>
//                   <CardContent className="pt-6 space-y-3">
//                     {job.extraInfo.examPattern.map((step, idx) => (
//                       <div
//                         key={idx}
//                         className="flex items-start gap-3 p-4 rounded-lg bg-muted/50"
//                       >
//                         <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
//                           {idx + 1}
//                         </div>
//                         <p className="font-medium text-foreground mt-1">
//                           {step}
//                         </p>
//                       </div>
//                     ))}
//                   </CardContent>
//                 </Card>
//               )}

//               {/* Physical Standards */}
//               {job.extraInfo?.physicalStandards && 
//   (job.extraInfo.physicalStandards.height?.male || 
//    job.extraInfo.physicalStandards.chest?.male || 
//    job.extraInfo.physicalStandards.running?.male) && (
//                 <Card>
//                   <CardHeader className="bg-accent/5">
//                     <CardTitle className="flex items-center gap-2">
//                       <HeartPulse className="h-5 w-5 text-primary" />
//                       Physical Standards
//                     </CardTitle>
//                   </CardHeader>
//                   <CardContent className="pt-6">
//                     <Table>
//                       <TableHeader>
//                         <TableRow>
//                           <TableHead>Standard</TableHead>
//                           <TableHead>Male</TableHead>
//                           <TableHead>Female</TableHead>
//                         </TableRow>
//                       </TableHeader>
//                       <TableBody>
//                         {job.extraInfo.physicalStandards.height && (
//                           <TableRow>
//                             <TableCell className="font-medium">Height</TableCell>
//                             <TableCell>
//                               {job.extraInfo.physicalStandards.height.male ||
//                                 "N/A"}
//                             </TableCell>
//                             <TableCell>
//                               {job.extraInfo.physicalStandards.height.female ||
//                                 "N/A"}
//                             </TableCell>
//                           </TableRow>
//                         )}
//                         {job.extraInfo.physicalStandards.chest && (
//                           <TableRow>
//                             <TableCell className="font-medium">Chest</TableCell>
//                             <TableCell>
//                               {job.extraInfo.physicalStandards.chest.male ||
//                                 "N/A"}
//                             </TableCell>
//                             <TableCell>N/A</TableCell>
//                           </TableRow>
//                         )}
//                         {job.extraInfo.physicalStandards.running && (
//                           <TableRow>
//                             <TableCell className="font-medium">
//                               Running
//                             </TableCell>
//                             <TableCell>
//                               {job.extraInfo.physicalStandards.running.male ||
//                                 "N/A"}
//                             </TableCell>
//                             <TableCell>
//                               {job.extraInfo.physicalStandards.running.female ||
//                                 "N/A"}
//                             </TableCell>
//                           </TableRow>
//                         )}
//                       </TableBody>
//                     </Table>
//                   </CardContent>
//                 </Card>
//               )}

//               {/* Cutoff Marks */}
//               {job.extraInfo?.cutoffMarks?.length > 0 && (
//                 <Card>
//                   <CardHeader className="bg-accent/5">
//                     <CardTitle className="flex items-center gap-2">
//                       <Target className="h-5 w-5 text-primary" />
//                       Expected Cutoff Marks
//                     </CardTitle>
//                   </CardHeader>
//                   <CardContent className="pt-6">
//                     <Table>
//                       <TableHeader>
//                         <TableRow>
//                           <TableHead>Category</TableHead>
//                           <TableHead>Expected Marks</TableHead>
//                         </TableRow>
//                       </TableHeader>
//                       <TableBody>
//                         {job.extraInfo.cutoffMarks.map((cutoff, idx) => (
//                           <TableRow key={idx}>
//                             <TableCell className="font-medium">
//                               {cutoff.category}
//                             </TableCell>
//                             <TableCell>{cutoff.expected}</TableCell>
//                           </TableRow>
//                         ))}
//                       </TableBody>
//                     </Table>
//                   </CardContent>
//                 </Card>
//               )}

//               {/* Documents Required (MOVED HERE) */}
//               {job.extraInfo?.documentsRequired?.length > 0 && (
//                 <Card>
//                   <CardHeader className="bg-accent/5">
//                     <CardTitle className="text-lg flex items-center gap-2">
//                       <FileCheck className="h-5 w-5 text-primary" />
//                       Documents Required
//                     </CardTitle>
//                   </CardHeader>
//                   <CardContent className="pt-6 space-y-2">
//                     <ul className="list-disc list-inside text-muted-foreground">
//                       {job.extraInfo.documentsRequired.map((doc, idx) => (
//                         <li key={idx} className="mb-1">
//                           {doc}
//                         </li>
//                       ))}
//                     </ul>
//                   </CardContent>
//                 </Card>
//               )}

//               {/* Attachments (MOVED HERE) */}
//               {job.extraInfo?.attachments?.length > 0 && (
//                 <Card>
//                   <CardHeader className="bg-accent/5">
//                     <CardTitle className="text-lg flex items-center gap-2">
//                       <Download className="h-5 w-5 text-primary" />
//                       Attachments
//                     </CardTitle>
//                   </CardHeader>
//                   <CardContent className="pt-6 space-y-2">
//                     {job.extraInfo.attachments.map((file, idx) => (
//                       <Button
//                         key={idx}
//                         variant="outline"
//                         className="w-full justify-between"
//                         asChild
//                       >
//                         <a
//                           href={file.url}
//                           target="_blank"
//                           rel="noopener noreferrer"
//                         >
//                           {file.name}
//                           <Download className="h-4 w-4" />
//                         </a>
//                       </Button>
//                     ))}
//                   </CardContent>
//                 </Card>
//               )}

//               {/* FAQs (MOVED HERE) */}
//               {job.extraInfo?.faqs?.length > 0 && (
//                 <Card className="bg-accent/5">
//                   <CardHeader>
//                     <CardTitle className="text-lg">FAQs</CardTitle>
//                   </CardHeader>
//                   <CardContent className="space-y-4">
//                     {job.extraInfo.faqs.map((faq, idx) => (
//                       <div key={idx}>
//                         <p className="font-semibold text-foreground">
//                           {faq.question}
//                         </p>
//                         <p className="text-muted-foreground text-sm">
//                           {faq.answer}
//                         </p>
//                       </div>
//                     ))}
//                   </CardContent>
//                 </Card>
//               )}
//             </div>

//             {/* Sidebar */}
//             <div className="space-y-6">
//               {/* STICKY CONTAINER WRAPPER */}
//               <div className=" top-4 space-y-6">
//                 {/* Quick Links */}
//                 {job.links && (
//                   <Card className="border-primary/20">
//                     <CardHeader className="bg-primary/5">
//                       <CardTitle className="text-lg flex items-center gap-2">
//                         <ExternalLink className="h-5 w-5 text-primary" />
//                         Quick Links
//                       </CardTitle>
//                     </CardHeader>
//                     <CardContent className="pt-6 space-y-3">
//                       {Object.entries(job.links).map(([key, url]) =>
//                         url ? (
//                           <Button
//                             key={key}
//                             variant={
//                               key === "applyOnline" ? "default" : "outline"
//                             }
//                             className="w-full justify-between font-semibold capitalize"
//                             size="lg"
//                             asChild
//                           >
//                             <a
//                               href={url as string}
//                               target="_blank"
//                               rel="noopener noreferrer"
//                             >
//                               {key.replace(/([A-Z])/g, " $1")}
//                               <ExternalLink className="h-4 w-4" />
//                             </a>
//                           </Button>
//                         ) : null
//                       )}
//                     </CardContent>
//                   </Card>
//                 )}

//                 {/* Social Links */}
//                 {job.socialLinks && (
//                   <Card>
//                     <CardHeader className="bg-accent/5">
//                       <CardTitle className="text-lg flex items-center gap-2">
//                         <Share2 className="h-5 w-5 text-primary" />
//                         Share & Follow
//                       </CardTitle>
//                     </CardHeader>
//                     <CardContent className="pt-6 flex gap-2">
//                       {job.socialLinks.telegram && (
//                         <Button variant="outline" size="icon" asChild>
//                           <a
//                             href={job.socialLinks.telegram}
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             aria-label="Telegram"
//                           >
//                             <Send className="h-4 w-4" />
//                           </a>
//                         </Button>
//                       )}
//                       {job.socialLinks.twitter && (
//                         <Button variant="outline" size="icon" asChild>
//                           <a
//                             href={job.socialLinks.twitter}
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             aria-label="Twitter"
//                           >
//                             <Twitter className="h-4 w-4" />
//                           </a>
//                         </Button>
//                       )}
//                       {job.socialLinks.facebook && (
//                         <Button variant="outline" size="icon" asChild>
//                           <a
//                             href={job.socialLinks.facebook}
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             aria-label="Facebook"
//                           >
//                             <Facebook className="h-4 w-4" />
//                           </a>
//                         </Button>
//                       )}
//                     </CardContent>
//                   </Card>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </main>

//       <Footer />
//     </div>
//   );
// };

// export default JobDetail;


import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Calendar,
  MapPin,
  GraduationCap,
  Users,
  IndianRupee,
  FileText,
  ExternalLink,
  CheckCircle,
  ArrowLeft,
  Briefcase,
  ListChecks,
  HeartPulse,
  Target,
  FileCheck,
  Download,
  Share2,
  Twitter,
  Facebook,
  Send, // For Telegram
  CircleDollarSign,
  ShieldCheck,
  Plus,
} from "lucide-react";

// ---- Updated Job interface (matches schema) ----
interface Job {
  _id: string;
  jobId: string;
  title: string;
  slug: string;
  postDate: string;
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
      additionalAgeRules?: string[];
      ageRelaxationRules?: string;
    };
    additionalCertifications?: string[];
  };

  eligibilityDetails?: {
    qualification: string;
    minMarks?: number;
    remark?: string;
  }[];

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

  applicationFee?: {
    general?: number;
    obc?: number;
    sc?: number;
    st?: number;
    ews?: number;
    female?: number;
    correctionCharge?: number;
    paymentModes?: string[];
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
    documentsRequired?: string[];
    examPattern?: string[];
    physicalStandards?: {
      height?: { male?: string; female?: string };
      chest?: { male?: string };
      running?: { male?: string; female?: string };
    };
    cutoffMarks?: {
      category: string;
      expected: string;
    }[];
    faqs?: { question: string; answer: string }[];
    attachments?: { name: string; url: string; type: string }[];
  };

  socialLinks?: {
    twitter?: string;
    telegram?: string;
    facebook?: string;
  };

  viewCount?: number;
  applicationCount?: number;
  createdAt?: string;
  updatedAt?: string;
}

// ---- Helper functions ----
const formatDate = (dateStr?: string) => {
  if (!dateStr) return "To be announced";
  const d = new Date(dateStr);
  // Check if date is valid
  if (isNaN(d.getTime())) {
    // If it's not a valid date, it might be a string like "JAN 2026"
    return dateStr;
  }
  return d.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const formatFee = (fee?: number) => {
  if (fee === 0) return "Free";
  if (fee == undefined || fee == -1) return "-";
  if (fee) return `₹${fee}`;
  return "N/A";
};

// Helper component for Important Dates
const DateEntry = ({
  label,
  value,
}: {
  label: string;
  value?: string | { start?: string; end?: string };
}) => {
  if (!value) return null;

  let displayValue = "To be announced";
  if (typeof value === "string") {
    displayValue = formatDate(value);
  } else if (typeof value === "object" && (value.start || value.end)) {
    displayValue = `${formatDate(value.start)} - ${formatDate(value.end)}`;
  }

  if (displayValue === "To be announced") return null;

  return (
    <div className="flex justify-between items-center py-2 px-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
      <span className="capitalize font-medium text-foreground">{label}</span>
      <Badge variant="outline" className="font-semibold text-right">
        {displayValue}
      </Badge>
    </div>
  );
};

// Helper component for Additional Age Rules
const AdditionalAgeRules = ({ rules }: { rules?: string[] }) => {
  if (!rules || rules.length === 0) return null;

  return (
    <div className="mt-4 space-y-2">
      <p className="font-semibold text-foreground mb-2">Additional Age Rules:</p>
      <div className="space-y-2">
        {rules.map((rule, index) => (
          <div
            key={index}
            className="flex items-start gap-2 p-3 rounded-lg bg-blue-50 border border-blue-200"
          >
            <Plus className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
            <span className="text-sm text-blue-800">{rule}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// ---- JobDetail component ----
const JobDetail = () => {
  const { slug } = useParams();

  const {
    data: job,
    isLoading,
    error,
  } = useQuery<Job>({
    queryKey: ["job", slug],
    queryFn: async () => {
      // Use the slug (id) to fetch
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/jobs/slug/${slug}`
      );
      return res.data;
    },
    enabled: !!slug,
  });

  if (isLoading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );

  if (error || !job) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl font-bold mb-4">Job Not Found</h1>
          <Link to="/latest-jobs">
            <Button>Back to Latest Jobs</Button>
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <div className="bg-gradient-to-br from-primary via-primary/90 to-accent text-primary-foreground py-6 md:py-8">
          <div className="container mx-auto px-3 sm:px-4 max-w-5xl">
            <Link
              to="/latest-jobs"
              className="inline-flex items-center gap-2 text-primary-foreground/90 hover:text-primary-foreground mb-4 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Jobs
            </Link>

            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
              <div className="flex-1 min-w-0">
                {job.status?.isApplicationOpen && (
                  <Badge className="bg-green-500 text-white border-0 mb-2">
                    Application Open
                  </Badge>
                )}
                <h1 className="text-2xl md:text-3xl font-bold mb-2 truncate">
                  {job.title}
                </h1>
                <p className="text-primary-foreground/90 text-lg truncate">
                  {job.organization}
                </p>
                {job.advertisementNo && (
                  <p className="text-primary-foreground/80 text-sm mt-1">
                    Advertisement No: {job.advertisementNo}
                  </p>
                )}

                <div className="flex flex-wrap gap-2 mt-3 w-full">
                  {job.category && (
                    <Badge variant="secondary" className="text-xs">
                      {job.category}
                    </Badge>
                  )}
                  {job.location && (
                    <Badge
                      variant="secondary"
                      className="flex items-center gap-1 text-xs"
                    >
                      <MapPin className="h-3 w-3" /> {job.location}
                    </Badge>
                  )}
                  {job.jobType && (
                    <Badge
                      variant="secondary"
                      className="flex items-center gap-1 text-xs"
                    >
                      <Briefcase className="h-3 w-3" /> {job.jobType}
                    </Badge>
                  )}
                </div>
              </div>

              {job.links?.applyOnline && (
                <div className="mt-4 md:mt-0 md:flex-shrink-0">
                  <Button
                    size="lg"
                    className="bg-white text-primary hover:bg-white/90 font-semibold shadow-lg w-full md:w-auto"
                    asChild
                  >
                    <a
                      href={job.links.applyOnline}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Apply Now <ExternalLink className="h-4 w-4 ml-2" />
                    </a>
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="container mx-auto px-3 sm:px-4 py-6 md:py-8 max-w-5xl">
          {/* Quick Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <Card className="text-center">
              <CardContent className="pt-6">
                <Users className="h-8 w-8 mx-auto mb-2 text-primary" />
                <p className="text-2xl font-bold text-foreground">
                  {job.totalPosts ?? 0}
                </p>
                <p className="text-sm text-muted-foreground">Total Posts</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-6">
                <Calendar className="h-8 w-8 mx-auto mb-2 text-destructive" />
                <p className="text-lg font-bold text-foreground">
                  {formatDate(job.importantDates?.applicationEnd)}
                </p>
                <p className="text-sm text-muted-foreground">Last Date</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-6">
                <FileText className="h-8 w-8 mx-auto mb-2 text-blue-500" />
                <p className="text-lg font-bold text-foreground">
                  {formatDate(job.importantDates?.examDate)}
                </p>
                <p className="text-sm text-muted-foreground">Exam Date</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-6">
                <IndianRupee className="h-8 w-8 mx-auto mb-2 text-green-500" />
                <p className="text-lg font-bold text-foreground">
                  {formatFee(job.applicationFee?.general)}
                </p>
                <p className="text-sm text-muted-foreground">Fee (General)</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Left content */}
            <div className="md:col-span-2 space-y-6 min-w-0">
              {/* Important Dates */}
              {job.importantDates && (
                <Card>
                  <CardHeader className="bg-accent/5">
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-primary" />
                      Important Dates
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6 space-y-2">
                    <DateEntry
                      label="Notification Date"
                      value={job.importantDates.notificationDate}
                    />
                    <DateEntry
                      label="Application Start"
                      value={job.importantDates.applicationStart}
                    />
                    <DateEntry
                      label="Application End"
                      value={job.importantDates.applicationEnd}
                    />
                    <DateEntry
                      label="Fee Payment Last Date"
                      value={job.importantDates.feePaymentLastDate}
                    />
                    <DateEntry
                      label="Correction Window"
                      value={job.importantDates.correctionWindow}
                    />
                    <DateEntry
                      label="Exam Date"
                      value={job.importantDates.examDate}
                    />
                    <DateEntry
                      label="Admit Card Available"
                      value={job.importantDates.admitCardDate}
                    />
                    <DateEntry
                      label="Answer Key Released"
                      value={job.importantDates.answerKeyDate}
                    />
                    <DateEntry
                      label="Result Declared"
                      value={job.importantDates.resultDate}
                    />
                    <DateEntry
                      label="Score Card Available"
                      value={job.importantDates.scoreCardDate}
                    />
                    <DateEntry
                      label="Physical Test Date"
                      value={job.importantDates.physicalTestDate}
                    />
                    <DateEntry
                      label="Document Verification"
                      value={job.importantDates.documentVerificationDate}
                    />
                  </CardContent>
                </Card>
              )}

              {/* Application Fee */}
              {job.applicationFee && (
                <Card>
                  <CardHeader className="bg-accent/5">
                    <CardTitle className="flex items-center gap-2">
                      <CircleDollarSign className="h-5 w-5 text-primary" />
                      Application Fee
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="grid grid-cols-2 gap-4">
                      {job.applicationFee.general !== undefined && (
                        <div className="flex justify-between p-2 rounded bg-muted/50">
                          <span className="text-muted-foreground">General</span>{" "}
                          <span className="font-semibold">
                            {formatFee(job.applicationFee.general)}
                          </span>
                        </div>
                      )}
                      {job.applicationFee.obc !== undefined && (
                        <div className="flex justify-between p-2 rounded bg-muted/50">
                          <span className="text-muted-foreground">OBC</span>{" "}
                          <span className="font-semibold">
                            {formatFee(job.applicationFee.obc)}
                          </span>
                        </div>
                      )}
                      {job.applicationFee.ews !== undefined && (
                        <div className="flex justify-between p-2 rounded bg-muted/50">
                          <span className="text-muted-foreground">EWS</span>{" "}
                          <span className="font-semibold">
                            {formatFee(job.applicationFee.ews)}
                          </span>
                        </div>
                      )}
                      {job.applicationFee.sc !== undefined && (
                        <div className="flex justify-between p-2 rounded bg-muted/50">
                          <span className="text-muted-foreground">SC</span>{" "}
                          <span className="font-semibold">
                            {formatFee(job.applicationFee.sc)}
                          </span>
                        </div>
                      )}
                      {job.applicationFee.st !== undefined && (
                        <div className="flex justify-between p-2 rounded bg-muted/50">
                          <span className="text-muted-foreground">ST</span>{" "}
                          <span className="font-semibold">
                            {formatFee(job.applicationFee.st)}
                          </span>
                        </div>
                      )}
                      {job.applicationFee.female !== undefined && (
                        <div className="flex justify-between p-2 rounded bg-muted/50">
                          <span className="text-muted-foreground">Female</span>{" "}
                          <span className="font-semibold">
                            {formatFee(job.applicationFee.female)}
                          </span>
                        </div>
                      )}
                      {job.applicationFee.correctionCharge !== undefined &&
                        job.applicationFee.correctionCharge !== -1 && (
                          <div className="flex justify-between p-2 rounded bg-muted/50">
                            <span className="text-muted-foreground">
                              Correction Charge
                            </span>{" "}
                            <span className="font-semibold">
                              {formatFee(job.applicationFee.correctionCharge)}
                            </span>
                          </div>
                        )}
                    </div>
                    {job.applicationFee.paymentModes?.length > 0 && (
                      <p className="text-sm text-muted-foreground mt-4">
                        Payment Modes:{" "}
                        {job.applicationFee.paymentModes.join(", ")}
                      </p>
                    )}
                  </CardContent>
                </Card>
              )}

              {/* Post Details */}
              {job.postDetails?.length > 0 && (
                <Card>
                  <CardHeader className="bg-accent/5">
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5 text-primary" />
                      Post-wise Vacancy Breakup
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6 space-y-3">
                    {job.postDetails.map((post, idx) => (
                      <div key={idx} className="p-4 rounded-lg bg-muted/50">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                          <span className="font-medium text-foreground">
                            {post.postName}
                          </span>
                          <Badge variant="default" className="font-semibold">
                            {post.numberOfPosts} Posts
                          </Badge>
                        </div>
                        {post.eligibility && (
                          <p className="text-sm text-muted-foreground mt-2">
                            <strong>Eligibility:</strong> {post.eligibility}
                          </p>
                        )}
                      </div>
                    ))}
                    <div className="mt-4 pt-4 border-t border-border flex justify-between items-center">
                      <span className="font-bold text-foreground">
                        Total Vacancies
                      </span>
                      <Badge
                        variant="default"
                        className="text-base px-4 py-1"
                      >
                        {job.totalPosts}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Eligibility Criteria */}
              {job.eligibilityCriteria && (
                <Card>
                  <CardHeader className="bg-accent/5">
                    <CardTitle className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-primary" />
                      Eligibility Criteria
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6 space-y-4">
                    {job.eligibilityCriteria.education && (
                      <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                        <GraduationCap className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                        <div className="flex-1">
                          <p className="font-semibold text-foreground mb-1">
                            Educational Qualification
                          </p>
                          <p className="text-muted-foreground whitespace-pre-line">
                            {job.eligibilityCriteria.education}
                          </p>
                        </div>
                      </div>
                    )}

                    {job.eligibilityCriteria.ageLimit && (
                      <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                        <Users className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                        <div className="flex-1">
                          <p className="font-semibold text-foreground mb-1">
                            Age Limit
                          </p>
                          <p className="text-muted-foreground">
                            {job.eligibilityCriteria.ageLimit.min ?? ""} -{" "}
                            {job.eligibilityCriteria.ageLimit.max != -1 ? job.eligibilityCriteria.ageLimit.max : " "} years
                            (as on{" "}
                            {formatDate(
                              job.eligibilityCriteria.ageLimit.referenceDate
                            )}
                            )
                          </p>

                          {/* Additional Age Rules */}
                          <AdditionalAgeRules
                            rules={job.eligibilityCriteria.ageLimit.additionalAgeRules}
                          />

                          {job.eligibilityCriteria.ageLimit
                            .ageRelaxationRules && (
                            <p className="text-sm text-muted-foreground mt-3">
                              <strong>Age Relaxation Rules:</strong>{" "}
                              {
                                job.eligibilityCriteria.ageLimit
                                  .ageRelaxationRules
                              }
                            </p>
                          )}
                        </div>
                      </div>
                    )}

                    {job.eligibilityCriteria.additionalCertifications
                      ?.length > 0 && (
                      <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                        <ShieldCheck className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                        <div className="flex-1">
                          <p className="font-semibold text-foreground mb-1">
                            Additional Certifications
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {job.eligibilityCriteria.additionalCertifications.map(
                              (cert, idx) => (
                                <Badge key={idx} variant="outline">
                                  {cert}
                                </Badge>
                              )
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}

              {/* Eligibility Details Table */}
              {job.eligibilityDetails?.length > 0 && (
                <Card>
                  <CardHeader className="bg-accent/5">
                    <CardTitle className="flex items-center gap-2">
                      <ShieldCheck className="h-5 w-5 text-primary" />
                      Post-wise Eligibility Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Qualification</TableHead>
                            <TableHead>Min. Marks</TableHead>
                            <TableHead>Remarks</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {job.eligibilityDetails.map((detail, idx) => (
                            <TableRow key={idx}>
                              <TableCell className="font-medium">
                                {detail.qualification}
                              </TableCell>
                              <TableCell>
                                {detail.minMarks ? `${detail.minMarks}%` : "N/A"}
                              </TableCell>
                              <TableCell>{detail.remark || "N/A"}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Selection Process */}
              {job.selectionProcess?.length > 0 && (
                <Card>
                  <CardHeader className="bg-accent/5">
                    <CardTitle className="flex items-center gap-2">
                      <ListChecks className="h-5 w-5 text-primary" />
                      Selection Process
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6 space-y-3">
                    {job.selectionProcess.map((step, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-3 p-4 rounded-lg bg-muted/50"
                      >
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                          {idx + 1}
                        </div>
                        <p className="font-medium text-foreground mt-1">
                          {step}
                        </p>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              )}

              {/* Exam Pattern */}
              {job.extraInfo?.examPattern?.length > 0 && (
                <Card>
                  <CardHeader className="bg-accent/5">
                    <CardTitle className="flex items-center gap-2">
                      <ListChecks className="h-5 w-5 text-primary" />
                      Exam Pattern
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6 space-y-3">
                    {job.extraInfo.examPattern.map((step, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-3 p-4 rounded-lg bg-muted/50"
                      >
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                          {idx + 1}
                        </div>
                        <p className="font-medium text-foreground mt-1">
                          {step}
                        </p>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              )}

              {/* Physical Standards */}
              {job.extraInfo?.physicalStandards &&
                (job.extraInfo.physicalStandards.height?.male ||
                  job.extraInfo.physicalStandards.chest?.male ||
                  job.extraInfo.physicalStandards.running?.male) && (
                  <Card>
                    <CardHeader className="bg-accent/5">
                      <CardTitle className="flex items-center gap-2">
                        <HeartPulse className="h-5 w-5 text-primary" />
                        Physical Standards
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <div className="overflow-x-auto">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Standard</TableHead>
                              <TableHead>Male</TableHead>
                              <TableHead>Female</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {job.extraInfo.physicalStandards.height && (
                              <TableRow>
                                <TableCell className="font-medium">Height</TableCell>
                                <TableCell>
                                  {job.extraInfo.physicalStandards.height.male ||
                                    "N/A"}
                                </TableCell>
                                <TableCell>
                                  {job.extraInfo.physicalStandards.height.female ||
                                    "N/A"}
                                </TableCell>
                              </TableRow>
                            )}
                            {job.extraInfo.physicalStandards.chest && (
                              <TableRow>
                                <TableCell className="font-medium">Chest</TableCell>
                                <TableCell>
                                  {job.extraInfo.physicalStandards.chest.male ||
                                    "N/A"}
                                </TableCell>
                                <TableCell>N/A</TableCell>
                              </TableRow>
                            )}
                            {job.extraInfo.physicalStandards.running && (
                              <TableRow>
                                <TableCell className="font-medium">
                                  Running
                                </TableCell>
                                <TableCell>
                                  {job.extraInfo.physicalStandards.running.male ||
                                    "N/A"}
                                </TableCell>
                                <TableCell>
                                  {job.extraInfo.physicalStandards.running.female ||
                                    "N/A"}
                                </TableCell>
                              </TableRow>
                            )}
                          </TableBody>
                        </Table>
                      </div>
                    </CardContent>
                  </Card>
                )}

              {/* Cutoff Marks */}
              {job.extraInfo?.cutoffMarks?.length > 0 && (
                <Card>
                  <CardHeader className="bg-accent/5">
                    <CardTitle className="flex items-center gap-2">
                      <Target className="h-5 w-5 text-primary" />
                      Expected Cutoff Marks
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Category</TableHead>
                            <TableHead>Expected Marks</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {job.extraInfo.cutoffMarks.map((cutoff, idx) => (
                            <TableRow key={idx}>
                              <TableCell className="font-medium">
                                {cutoff.category}
                              </TableCell>
                              <TableCell>{cutoff.expected}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Documents Required (MOVED HERE) */}
              {job.extraInfo?.documentsRequired?.length > 0 && (
                <Card>
                  <CardHeader className="bg-accent/5">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <FileCheck className="h-5 w-5 text-primary" />
                      Documents Required
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6 space-y-2">
                    <ul className="list-disc list-inside text-muted-foreground">
                      {job.extraInfo.documentsRequired.map((doc, idx) => (
                        <li key={idx} className="mb-1">
                          {doc}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}

              {/* Attachments (MOVED HERE) */}
              {job.extraInfo?.attachments?.length > 0 && (
                <Card>
                  <CardHeader className="bg-accent/5">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Download className="h-5 w-5 text-primary" />
                      Attachments
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6 space-y-2">
                    {job.extraInfo.attachments.map((file, idx) => (
                      <Button
                        key={idx}
                        variant="outline"
                        className="w-full justify-between"
                        asChild
                      >
                        <a
                          href={file.url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {file.name}
                          <Download className="h-4 w-4" />
                        </a>
                      </Button>
                    ))}
                  </CardContent>
                </Card>
              )}

              {/* FAQs (MOVED HERE) */}
              {job.extraInfo?.faqs?.length > 0 && (
                <Card className="bg-accent/5">
                  <CardHeader>
                    <CardTitle className="text-lg">FAQs</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {job.extraInfo.faqs.map((faq, idx) => (
                      <div key={idx}>
                        <p className="font-semibold text-foreground">
                          {faq.question}
                        </p>
                        <p className="text-muted-foreground text-sm">
                          {faq.answer}
                        </p>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="md:sticky md:top-6 space-y-6">
                {/* Quick Links */}
                {job.links && (
                  <Card className="border-primary/20">
                    <CardHeader className="bg-primary/5">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <ExternalLink className="h-5 w-5 text-primary" />
                        Quick Links
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6 space-y-3">
                      {Object.entries(job.links).map(([key, url]) =>
                        url ? (
                          <Button
                            key={key}
                            variant={
                              key === "applyOnline" ? "default" : "outline"
                            }
                            className="w-full justify-between font-semibold capitalize"
                            size="lg"
                            asChild
                          >
                            <a
                              href={url as string}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {key.replace(/([A-Z])/g, " $1")}
                              <ExternalLink className="h-4 w-4" />
                            </a>
                          </Button>
                        ) : null
                      )}
                    </CardContent>
                  </Card>
                )}

                {/* Social Links */}
                {job.socialLinks && (
                  <Card>
                    <CardHeader className="bg-accent/5">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Share2 className="h-5 w-5 text-primary" />
                        Share & Follow
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6 flex gap-2">
                      {job.socialLinks.telegram && (
                        <Button variant="outline" size="icon" asChild>
                          <a
                            href={job.socialLinks.telegram}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Telegram"
                          >
                            <Send className="h-4 w-4" />
                          </a>
                        </Button>
                      )}
                      {job.socialLinks.twitter && (
                        <Button variant="outline" size="icon" asChild>
                          <a
                            href={job.socialLinks.twitter}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Twitter"
                          >
                            <Twitter className="h-4 w-4" />
                          </a>
                        </Button>
                      )}
                      {job.socialLinks.facebook && (
                        <Button variant="outline" size="icon" asChild>
                          <a
                            href={job.socialLinks.facebook}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Facebook"
                          >
                            <Facebook className="h-4 w-4" />
                          </a>
                        </Button>
                      )}
                    </CardContent>

                  </Card>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default JobDetail;
