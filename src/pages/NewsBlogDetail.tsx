// import { useParams, Link } from "react-router-dom";
// import Header from "@/components/Header";
// import Footer from "@/components/Footer";
// import { Card, CardContent } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import { Separator } from "@/components/ui/separator";
// import { ArrowLeft, Calendar, User, Clock, Share2 } from "lucide-react";

// const NewsBlogDetail = () => {
//   const { id } = useParams();

//   const newsArticles = [
//     {
//       id: 1,
//       title: "UPSC 2025 Notification Released: Key Changes You Need to Know",
//       excerpt: "Union Public Service Commission has released the official notification for Civil Services Examination 2025 with significant changes in the pattern...",
//       category: "UPSC",
//       author: "Editorial Team",
//       date: "15 Nov 2024",
//       readTime: "5 min read",
//       image: "https://images.unsplash.com/photo-1554224311-beee2c91c77b?w=1200&h=600&fit=crop",
//       content: `
//         <p>The Union Public Service Commission (UPSC) has officially released the notification for the Civil Services Examination 2025, bringing with it several important changes that aspirants need to be aware of. This comprehensive guide will help you understand all the key modifications and prepare accordingly.</p>

//         <h2>Key Changes in UPSC CSE 2025</h2>
//         <p>The most significant change is the introduction of a new optional paper pattern. The commission has restructured the optional subjects to provide more flexibility to candidates. Additionally, there are changes in the age relaxation criteria for certain categories.</p>

//         <h3>Important Dates</h3>
//         <ul>
//           <li>Notification Release: 15th November 2024</li>
//           <li>Application Start Date: 1st December 2024</li>
//           <li>Application Last Date: 31st December 2024</li>
//           <li>Preliminary Examination: May 2025</li>
//           <li>Mains Examination: September 2025</li>
//         </ul>

//         <h3>Eligibility Criteria Updates</h3>
//         <p>The age limit remains 21-32 years for general category candidates, with relaxations for reserved categories as per government norms. However, the educational qualification requirements have been clarified with additional specifications for professional degrees.</p>

//         <h3>Examination Pattern Changes</h3>
//         <p>The Preliminary examination will continue to have two papers - General Studies (GS) Paper I and Civil Services Aptitude Test (CSAT) Paper II. However, the syllabus has been slightly modified with more emphasis on current affairs and analytical ability.</p>

//         <h3>Application Process</h3>
//         <p>Candidates can apply online through the official UPSC website. The application fee remains ₹100 for general and OBC candidates, while SC/ST/PwD and women candidates are exempted from paying the fee.</p>

//         <h2>Preparation Strategy</h2>
//         <p>With these changes, aspirants need to modify their preparation strategy. Focus should be on:</p>
//         <ul>
//           <li>Understanding the new pattern thoroughly</li>
//           <li>Strengthening current affairs knowledge</li>
//           <li>Regular practice of answer writing</li>
//           <li>Taking mock tests as per the new pattern</li>
//         </ul>

//         <h3>Resources and Study Material</h3>
//         <p>UPSC has also updated its recommended reading list. Candidates should refer to standard textbooks and NCERT books for basic concepts, along with current affairs magazines and newspapers for staying updated.</p>

//         <h2>Conclusion</h2>
//         <p>The UPSC CSE 2025 notification brings important changes that require careful attention from aspirants. Early preparation and understanding of the new pattern will give candidates a competitive edge. Stay updated with the official UPSC website for any further announcements or clarifications.</p>
//       `
//     },
//     {
//       id: 2,
//       title: "SSC CGL 2024: Strategy to Crack Tier-I in First Attempt",
//       excerpt: "Complete preparation strategy for SSC CGL Tier-I examination including time management, important topics, and mock test analysis...",
//       category: "SSC",
//       author: "Priya Sharma",
//       date: "14 Nov 2024",
//       readTime: "8 min read",
//       image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1200&h=600&fit=crop",
//       content: `
//         <p>Cracking SSC CGL Tier-I examination in the first attempt is a dream for many aspirants. With the right strategy, dedication, and smart preparation, this goal is definitely achievable. This comprehensive guide will walk you through a proven strategy to succeed.</p>

//         <h2>Understanding the Exam Pattern</h2>
//         <p>SSC CGL Tier-I consists of four sections: General Intelligence and Reasoning, General Awareness, Quantitative Aptitude, and English Comprehension. Each section carries 25 questions worth 50 marks, totaling 100 questions for 200 marks.</p>

//         <h3>Section-wise Strategy</h3>

//         <h4>General Intelligence and Reasoning</h4>
//         <p>This section tests your logical and analytical abilities. Focus on:</p>
//         <ul>
//           <li>Classification and Series</li>
//           <li>Analogy and Coding-Decoding</li>
//           <li>Blood Relations and Direction Sense</li>
//           <li>Puzzles and Seating Arrangement</li>
//         </ul>

//         <h4>General Awareness</h4>
//         <p>Stay updated with current affairs for the last 6 months. Important areas include:</p>
//         <ul>
//           <li>Current Affairs (National and International)</li>
//           <li>Static GK (Indian History, Geography, Polity)</li>
//           <li>Economics and Science</li>
//           <li>Important Books and Authors</li>
//         </ul>

//         <h4>Quantitative Aptitude</h4>
//         <p>Mathematics section requires regular practice. Key topics:</p>
//         <ul>
//           <li>Number System and Simplification</li>
//           <li>Percentage, Ratio and Proportion</li>
//           <li>Time and Work, Speed and Distance</li>
//           <li>Geometry and Mensuration</li>
//         </ul>

//         <h4>English Comprehension</h4>
//         <p>Improve your vocabulary and grammar. Focus areas:</p>
//         <ul>
//           <li>Reading Comprehension</li>
//           <li>Fill in the Blanks and Error Detection</li>
//           <li>Synonyms and Antonyms</li>
//           <li>Idioms and Phrases</li>
//         </ul>

//         <h2>Time Management Tips</h2>
//         <p>Allocate 15 minutes to each section during practice. Attempt easier questions first and mark difficult ones for review. Don't spend more than 45 seconds on any question.</p>

//         <h3>Mock Test Strategy</h3>
//         <p>Take at least 2-3 full-length mock tests every week. Analyze your performance thoroughly, identify weak areas, and work on them. This will help you manage time effectively during the actual exam.</p>

//         <h2>Important Resources</h2>
//         <ul>
//           <li>Previous year question papers (last 5 years)</li>
//           <li>Standard preparation books for each section</li>
//           <li>Online test series and video lectures</li>
//           <li>Daily current affairs PDFs</li>
//         </ul>

//         <h2>Final Tips</h2>
//         <p>Maintain consistency in your preparation. Create a study schedule and stick to it. Stay healthy, get adequate sleep, and stay motivated. Remember, success in SSC CGL is not just about hard work but also about smart work.</p>
//       `
//     },
//     {
//       id: 3,
//       title: "Railway Recruitment 2024: Over 1 Lakh Vacancies Expected",
//       excerpt: "Railway Recruitment Boards are expected to announce massive recruitment drive for various posts including NTPC, Group D, and technical positions...",
//       category: "Railway",
//       author: "Rajesh Kumar",
//       date: "13 Nov 2024",
//       readTime: "6 min read",
//       image: "https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=1200&h=600&fit=crop",
//       content: `
//         <p>The Railway Recruitment Boards (RRBs) are gearing up for one of the largest recruitment drives in recent years, with over 1 lakh vacancies expected to be announced across various categories. This massive recruitment will provide opportunities for aspirants across the country.</p>

//         <h2>Expected Vacancy Distribution</h2>
//         <p>The recruitment is expected to cover multiple categories:</p>
//         <ul>
//           <li>Non-Technical Popular Categories (NTPC): 35,000+ posts</li>
//           <li>Group D (Level 1): 50,000+ posts</li>
//           <li>Paramedical Staff: 3,000+ posts</li>
//           <li>Junior Engineer (JE): 10,000+ posts</li>
//           <li>Assistant Loco Pilot (ALP): 5,000+ posts</li>
//         </ul>

//         <h3>RRB NTPC Recruitment</h3>
//         <p>The NTPC category includes various posts such as:</p>
//         <ul>
//           <li>Junior Account Assistant cum Typist</li>
//           <li>Commercial cum Ticket Clerk</li>
//           <li>Traffic Assistant</li>
//           <li>Goods Guard</li>
//           <li>Senior Commercial cum Ticket Clerk</li>
//         </ul>

//         <h3>RRB Group D Recruitment</h3>
//         <p>Group D posts include:</p>
//         <ul>
//           <li>Track Maintainer</li>
//           <li>Helper</li>
//           <li>Assistant Pointsman</li>
//           <li>Porter</li>
//         </ul>

//         <h2>Eligibility Criteria</h2>
//         <p>The eligibility varies by post:</p>
//         <ul>
//           <li>NTPC: Graduate for most posts</li>
//           <li>Group D: 10th pass</li>
//           <li>JE: Diploma/Engineering degree in relevant discipline</li>
//           <li>ALP: ITI or equivalent</li>
//         </ul>

//         <h3>Age Limit</h3>
//         <p>Generally, the age limit ranges from 18-33 years, with relaxations for reserved categories as per government norms.</p>

//         <h2>Selection Process</h2>
//         <p>The selection process typically involves:</p>
//         <ol>
//           <li>Computer Based Test (CBT) - Stage 1</li>
//           <li>Computer Based Test (CBT) - Stage 2</li>
//           <li>Skill Test/Physical Test (wherever applicable)</li>
//           <li>Document Verification</li>
//           <li>Medical Examination</li>
//         </ol>

//         <h3>Preparation Strategy</h3>
//         <p>Start your preparation early. Focus on:</p>
//         <ul>
//           <li>Mathematics and Reasoning</li>
//           <li>General Science and Current Affairs</li>
//           <li>Previous year question papers</li>
//           <li>Regular mock tests</li>
//         </ul>

//         <h2>Salary and Benefits</h2>
//         <p>Railway jobs offer attractive salary packages along with benefits like:</p>
//         <ul>
//           <li>7th Pay Commission salary structure</li>
//           <li>Medical facilities for self and family</li>
//           <li>Railway quarters/HRA</li>
//           <li>Pension benefits</li>
//           <li>Concessional railway passes</li>
//         </ul>

//         <h2>Important Dates (Expected)</h2>
//         <ul>
//           <li>Notification Release: December 2024</li>
//           <li>Application Period: January 2025</li>
//           <li>Examination: March-April 2025</li>
//         </ul>

//         <h2>How to Apply</h2>
//         <p>Applications will be available online through the respective RRB websites. Candidates need to:</p>
//         <ol>
//           <li>Register on the RRB website</li>
//           <li>Fill the application form</li>
//           <li>Upload required documents</li>
//           <li>Pay application fee</li>
//           <li>Submit and take printout</li>
//         </ol>

//         <p>Stay tuned for official notifications and start preparing now to make the most of this opportunity!</p>
//       `
//     },
//     {
//       id: 4,
//       title: "Banking Exams 2025 Calendar: All Important Dates",
//       excerpt: "Comprehensive calendar of all major banking examinations including IBPS, SBI, RBI for the year 2025 with notification and exam dates...",
//       category: "Banking",
//       author: "Amit Singh",
//       date: "12 Nov 2024",
//       readTime: "4 min read",
//       image: "https://images.unsplash.com/photo-1501167786227-4cba60f6d58f?w=1200&h=600&fit=crop",
//       content: `
//         <p>Planning your banking exam preparation requires a clear understanding of the examination schedule. Here's a comprehensive calendar of all major banking examinations scheduled for 2025, helping you plan your preparation strategy effectively.</p>

//         <h2>IBPS Examinations 2025</h2>

//         <h3>IBPS PO (Probationary Officer)</h3>
//         <ul>
//           <li>Notification: August 2025</li>
//           <li>Preliminary Exam: September 2025</li>
//           <li>Mains Exam: November 2025</li>
//           <li>Interview: January 2026</li>
//         </ul>

//         <h3>IBPS Clerk</h3>
//         <ul>
//           <li>Notification: July 2025</li>
//           <li>Preliminary Exam: August 2025</li>
//           <li>Mains Exam: October 2025</li>
//         </ul>

//         <h3>IBPS SO (Specialist Officer)</h3>
//         <ul>
//           <li>Notification: November 2025</li>
//           <li>Preliminary Exam: December 2025</li>
//           <li>Mains Exam: January 2026</li>
//           <li>Interview: March 2026</li>
//         </ul>

//         <h3>IBPS RRB</h3>
//         <ul>
//           <li>Notification: June 2025</li>
//           <li>Preliminary Exam: August 2025</li>
//           <li>Mains Exam: September 2025</li>
//           <li>Interview: November 2025</li>
//         </ul>

//         <h2>SBI Examinations 2025</h2>

//         <h3>SBI PO (Probationary Officer)</h3>
//         <ul>
//           <li>Notification: January 2025</li>
//           <li>Preliminary Exam: April 2025</li>
//           <li>Mains Exam: June 2025</li>
//           <li>Interview: August 2025</li>
//         </ul>

//         <h3>SBI Clerk</h3>
//         <ul>
//           <li>Notification: February 2025</li>
//           <li>Preliminary Exam: May 2025</li>
//           <li>Mains Exam: July 2025</li>
//         </ul>

//         <h3>SBI SO (Specialist Officer)</h3>
//         <ul>
//           <li>Notification: December 2024</li>
//           <li>Examination: January 2025</li>
//           <li>Interview: March 2025</li>
//         </ul>

//         <h2>RBI Examinations 2025</h2>

//         <h3>RBI Grade B</h3>
//         <ul>
//           <li>Notification: March 2025</li>
//           <li>Phase I Exam: June 2025</li>
//           <li>Phase II Exam: July 2025</li>
//           <li>Interview: September 2025</li>
//         </ul>

//         <h3>RBI Assistant</h3>
//         <ul>
//           <li>Notification: October 2025</li>
//           <li>Preliminary Exam: December 2025</li>
//           <li>Mains Exam: January 2026</li>
//           <li>Interview: March 2026</li>
//         </ul>

//         <h2>Other Important Banking Exams</h2>

//         <h3>NABARD</h3>
//         <ul>
//           <li>Notification: April 2025</li>
//           <li>Preliminary Exam: June 2025</li>
//           <li>Mains Exam: July 2025</li>
//           <li>Interview: September 2025</li>
//         </ul>

//         <h3>SIDBI</h3>
//         <ul>
//           <li>Notification: May 2025</li>
//           <li>Examination: July 2025</li>
//           <li>Interview: September 2025</li>
//         </ul>

//         <h2>Preparation Timeline</h2>
//         <p>Based on the above schedule, plan your preparation:</p>
//         <ul>
//           <li>Start preparing 6 months before the exam</li>
//           <li>Focus on basics in the first 2 months</li>
//           <li>Practice mock tests in months 3-5</li>
//           <li>Revision and final preparation in the last month</li>
//         </ul>

//         <h3>Important Tips</h3>
//         <ul>
//           <li>Cover the entire syllabus systematically</li>
//           <li>Stay updated with current affairs daily</li>
//           <li>Solve previous year papers</li>
//           <li>Take regular mock tests</li>
//           <li>Work on speed and accuracy</li>
//         </ul>

//         <h2>Common Syllabus Areas</h2>
//         <p>All banking exams generally cover:</p>
//         <ul>
//           <li>Quantitative Aptitude</li>
//           <li>Reasoning Ability</li>
//           <li>English Language</li>
//           <li>General Awareness (Banking)</li>
//           <li>Computer Knowledge</li>
//         </ul>

//         <p>Mark these dates in your calendar and start your preparation journey. All the best!</p>
//       `
//     }
//   ];

//   const article = newsArticles.find(a => a.id === parseInt(id || "1"));

//   if (!article) {
//     return (
//       <div className="min-h-screen bg-background">
//         <Header />
//         <div className="container mx-auto px-4 py-8">
//           <Card>
//             <CardContent className="py-8 text-center">
//               <p className="text-muted-foreground">Article not found</p>
//               <Link to="/news-blogs">
//                 <Button className="mt-4">Back to News & Blogs</Button>
//               </Link>
//             </CardContent>
//           </Card>
//         </div>
//         <Footer />
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-background">
//       <Header />

//       <div className="container mx-auto px-4 py-8">
//         <Link to="/news-blogs">
//           <Button variant="ghost" className="mb-4">
//             <ArrowLeft className="mr-2 h-4 w-4" />
//             Back to News & Blogs
//           </Button>
//         </Link>

//         <Card>
//           {/* Hero Image */}
//           <div className="aspect-video w-full overflow-hidden rounded-t-lg">
//             <img 
//               src={article.image} 
//               alt={article.title}
//               className="w-full h-full object-cover"
//             />
//           </div>

//           <CardContent className="p-6 md:p-8">
//             {/* Article Header */}
//             <div className="mb-6">
//               <div className="flex items-center gap-2 mb-3">
//                 <Badge variant="secondary">{article.category}</Badge>
//                 <span className="text-sm text-muted-foreground flex items-center gap-1">
//                   <Clock className="h-4 w-4" />
//                   {article.readTime}
//                 </span>
//               </div>
//               <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
//                 {article.title}
//               </h1>
//               <div className="flex items-center justify-between flex-wrap gap-4">
//                 <div className="flex items-center gap-4 text-sm text-muted-foreground">
//                   <div className="flex items-center gap-1">
//                     <User className="h-4 w-4" />
//                     <span>{article.author}</span>
//                   </div>
//                   <div className="flex items-center gap-1">
//                     <Calendar className="h-4 w-4" />
//                     <span>{article.date}</span>
//                   </div>
//                 </div>
//                 <Button variant="outline" size="sm">
//                   <Share2 className="h-4 w-4 mr-2" />
//                   Share
//                 </Button>
//               </div>
//             </div>

//             <Separator className="my-6" />

//             {/* Article Content */}
//             <div 
//               className="prose prose-slate max-w-none"
//               dangerouslySetInnerHTML={{ __html: article.content }}
//               style={{
//                 lineHeight: '1.8',
//               }}
//             />

//             <Separator className="my-8" />

//             {/* Related Articles */}
//             <div>
//               <h3 className="font-semibold text-xl mb-4">Related Articles</h3>
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                 {newsArticles
//                   .filter(a => a.id !== article.id && a.category === article.category)
//                   .slice(0, 3)
//                   .map(related => (
//                     <Link key={related.id} to={`/news-blogs/${related.id}`}>
//                       <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
//                         <div className="aspect-video overflow-hidden">
//                           <img 
//                             src={related.image} 
//                             alt={related.title}
//                             className="w-full h-full object-cover"
//                           />
//                         </div>
//                         <CardContent className="p-4">
//                           <Badge variant="secondary" className="mb-2">{related.category}</Badge>
//                           <h4 className="font-semibold line-clamp-2 text-sm">{related.title}</h4>
//                         </CardContent>
//                       </Card>
//                     </Link>
//                   ))}
//               </div>
//             </div>
//           </CardContent>
//         </Card>
//       </div>

//       <Footer />
//     </div>
//   );
// };

// export default NewsBlogDetail;


// import { useParams, Link } from "react-router-dom";
// import Header from "@/components/Header";
// import Footer from "@/components/Footer";
// import { Card, CardContent } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import { Separator } from "@/components/ui/separator";
// import { ArrowLeft, Calendar, User, Clock, Share2 } from "lucide-react";

// const NewsBlogDetail = () => {
//   const { id } = useParams();

//   // --- Your original data kept exactly as it is ---
//   const newsArticles = [
//     {
//       id: 1,
//       title: "UPSC 2025 Notification Released: Key Changes You Need to Know",
//       excerpt: "Union Public Service Commission has released the official notification for Civil Services Examination 2025 with significant changes in the pattern...",
//       category: "UPSC",
//       author: "Editorial Team",
//       date: "15 Nov 2024",
//       readTime: "5 min read",
//       image: "https://images.unsplash.com/photo-1554224311-beee2c91c77b?w=1200&h=600&fit=crop",
//       content: `
//         <p>The Union Public Service Commission (UPSC) has officially released the notification for the Civil Services Examination 2025, bringing with it several important changes that aspirants need to be aware of. This comprehensive guide will help you understand all the key modifications and prepare accordingly.</p>

//         <h2>Key Changes in UPSC CSE 2025</h2>
//         <p>The most significant change is the introduction of a new optional paper pattern. The commission has restructured the optional subjects to provide more flexibility to candidates. Additionally, there are changes in the age relaxation criteria for certain categories.</p>

//         <h3>Important Dates</h3>
//         <ul>
//           <li>Notification Release: 15th November 2024</li>
//           <li>Application Start Date: 1st December 2024</li>
//           <li>Application Last Date: 31st December 2024</li>
//           <li>Preliminary Examination: May 2025</li>
//           <li>Mains Examination: September 2025</li>
//         </ul>

//         <h3>Eligibility Criteria Updates</h3>
//         <p>The age limit remains 21-32 years for general category candidates, with relaxations for reserved categories as per government norms. However, the educational qualification requirements have been clarified with additional specifications for professional degrees.</p>

//         <h3>Examination Pattern Changes</h3>
//         <p>The Preliminary examination will continue to have two papers - General Studies (GS) Paper I and Civil Services Aptitude Test (CSAT) Paper II. However, the syllabus has been slightly modified with more emphasis on current affairs and analytical ability.</p>

//         <h3>Application Process</h3>
//         <p>Candidates can apply online through the official UPSC website. The application fee remains ₹100 for general and OBC candidates, while SC/ST/PwD and women candidates are exempted from paying the fee.</p>

//         <h2>Preparation Strategy</h2>
//         <p>With these changes, aspirants need to modify their preparation strategy. Focus should be on:</p>
//         <ul>
//           <li>Understanding the new pattern thoroughly</li>
//           <li>Strengthening current affairs knowledge</li>
//           <li>Regular practice of answer writing</li>
//           <li>Taking mock tests as per the new pattern</li>
//         </ul>

//         <h3>Resources and Study Material</h3>
//         <p>UPSC has also updated its recommended reading list. Candidates should refer to standard textbooks and NCERT books for basic concepts, along with current affairs magazines and newspapers for staying updated.</p>

//         <h2>Conclusion</h2>
//         <p>The UPSC CSE 2025 notification brings important changes that require careful attention from aspirants. Early preparation and understanding of the new pattern will give candidates a competitive edge. Stay updated with the official UPSC website for any further announcements or clarifications.</p>
//       `
//     },
//     {
//       id: 2,
//       title: "SSC CGL 2024: Strategy to Crack Tier-I in First Attempt",
//       excerpt: "Complete preparation strategy for SSC CGL Tier-I examination including time management, important topics, and mock test analysis...",
//       category: "SSC",
//       author: "Priya Sharma",
//       date: "14 Nov 2024",
//       readTime: "8 min read",
//       image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1200&h=600&fit=crop",
//       content: `
//         <p>Cracking SSC CGL Tier-I examination in the first attempt is a dream for many aspirants. With the right strategy, dedication, and smart preparation, this goal is definitely achievable. This comprehensive guide will walk you through a proven strategy to succeed.</p>

//         <h2>Understanding the Exam Pattern</h2>
//         <p>SSC CGL Tier-I consists of four sections: General Intelligence and Reasoning, General Awareness, Quantitative Aptitude, and English Comprehension. Each section carries 25 questions worth 50 marks, totaling 100 questions for 200 marks.</p>

//         <h3>Section-wise Strategy</h3>

//         <h4>General Intelligence and Reasoning</h4>
//         <p>This section tests your logical and analytical abilities. Focus on:</p>
//         <ul>
//           <li>Classification and Series</li>
//           <li>Analogy and Coding-Decoding</li>
//           <li>Blood Relations and Direction Sense</li>
//           <li>Puzzles and Seating Arrangement</li>
//         </ul>

//         <h4>General Awareness</h4>
//         <p>Stay updated with current affairs for the last 6 months. Important areas include:</p>
//         <ul>
//           <li>Current Affairs (National and International)</li>
//           <li>Static GK (Indian History, Geography, Polity)</li>
//           <li>Economics and Science</li>
//           <li>Important Books and Authors</li>
//         </ul>

//         <h4>Quantitative Aptitude</h4>
//         <p>Mathematics section requires regular practice. Key topics:</p>
//         <ul>
//           <li>Number System and Simplification</li>
//           <li>Percentage, Ratio and Proportion</li>
//           <li>Time and Work, Speed and Distance</li>
//           <li>Geometry and Mensuration</li>
//         </ul>

//         <h4>English Comprehension</h4>
//         <p>Improve your vocabulary and grammar. Focus areas:</p>
//         <ul>
//           <li>Reading Comprehension</li>
//           <li>Fill in the Blanks and Error Detection</li>
//           <li>Synonyms and Antonyms</li>
//           <li>Idioms and Phrases</li>
//         </ul>

//         <h2>Time Management Tips</h2>
//         <p>Allocate 15 minutes to each section during practice. Attempt easier questions first and mark difficult ones for review. Don't spend more than 45 seconds on any question.</p>

//         <h3>Mock Test Strategy</h3>
//         <p>Take at least 2-3 full-length mock tests every week. Analyze your performance thoroughly, identify weak areas, and work on them. This will help you manage time effectively during the actual exam.</p>

//         <h2>Important Resources</h2>
//         <ul>
//           <li>Previous year question papers (last 5 years)</li>
//           <li>Standard preparation books for each section</li>
//           <li>Online test series and video lectures</li>
//           <li>Daily current affairs PDFs</li>
//         </ul>

//         <h2>Final Tips</h2>
//         <p>Maintain consistency in your preparation. Create a study schedule and stick to it. Stay healthy, get adequate sleep, and stay motivated. Remember, success in SSC CGL is not just about hard work but also about smart work.</p>
//       `
//     },
//     {
//       id: 3,
//       title: "Railway Recruitment 2024: Over 1 Lakh Vacancies Expected",
//       excerpt: "Railway Recruitment Boards are expected to announce massive recruitment drive for various posts including NTPC, Group D, and technical positions...",
//       category: "Railway",
//       author: "Rajesh Kumar",
//       date: "13 Nov 2024",
//       readTime: "6 min read",
//       image: "https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=1200&h=600&fit=crop",
//       content: `
//         <p>The Railway Recruitment Boards (RRBs) are gearing up for one of the largest recruitment drives in recent years, with over 1 lakh vacancies expected to be announced across various categories. This massive recruitment will provide opportunities for aspirants across the country.</p>

//         <h2>Expected Vacancy Distribution</h2>
//         <p>The recruitment is expected to cover multiple categories:</p>
//         <ul>
//           <li>Non-Technical Popular Categories (NTPC): 35,000+ posts</li>
//           <li>Group D (Level 1): 50,000+ posts</li>
//           <li>Paramedical Staff: 3,000+ posts</li>
//           <li>Junior Engineer (JE): 10,000+ posts</li>
//           <li>Assistant Loco Pilot (ALP): 5,000+ posts</li>
//         </ul>

//         <h3>RRB NTPC Recruitment</h3>
//         <p>The NTPC category includes various posts such as:</p>
//         <ul>
//           <li>Junior Account Assistant cum Typist</li>
//           <li>Commercial cum Ticket Clerk</li>
//           <li>Traffic Assistant</li>
//           <li>Goods Guard</li>
//           <li>Senior Commercial cum Ticket Clerk</li>
//         </ul>

//         <h3>RRB Group D Recruitment</h3>
//         <p>Group D posts include:</p>
//         <ul>
//           <li>Track Maintainer</li>
//           <li>Helper</li>
//           <li>Assistant Pointsman</li>
//           <li>Porter</li>
//         </ul>

//         <h2>Eligibility Criteria</h2>
//         <p>The eligibility varies by post:</p>
//         <ul>
//           <li>NTPC: Graduate for most posts</li>
//           <li>Group D: 10th pass</li>
//           <li>JE: Diploma/Engineering degree in relevant discipline</li>
//           <li>ALP: ITI or equivalent</li>
//         </ul>

//         <h3>Age Limit</h3>
//         <p>Generally, the age limit ranges from 18-33 years, with relaxations for reserved categories as per government norms.</p>

//         <h2>Selection Process</h2>
//         <p>The selection process typically involves:</p>
//         <ol>
//           <li>Computer Based Test (CBT) - Stage 1</li>
//           <li>Computer Based Test (CBT) - Stage 2</li>
//           <li>Skill Test/Physical Test (wherever applicable)</li>
//           <li>Document Verification</li>
//           <li>Medical Examination</li>
//         </ol>

//         <h3>Preparation Strategy</h3>
//         <p>Start your preparation early. Focus on:</p>
//         <ul>
//           <li>Mathematics and Reasoning</li>
//           <li>General Science and Current Affairs</li>
//           <li>Previous year question papers</li>
//           <li>Regular mock tests</li>
//         </ul>

//         <h2>Salary and Benefits</h2>
//         <p>Railway jobs offer attractive salary packages along with benefits like:</p>
//         <ul>
//           <li>7th Pay Commission salary structure</li>
//           <li>Medical facilities for self and family</li>
//           <li>Railway quarters/HRA</li>
//           <li>Pension benefits</li>
//           <li>Concessional railway passes</li>
//         </ul>

//         <h2>Important Dates (Expected)</h2>
//         <ul>
//           <li>Notification Release: December 2024</li>
//           <li>Application Period: January 2025</li>
//           <li>Examination: March-April 2025</li>
//         </ul>

//         <h2>How to Apply</h2>
//         <p>Applications will be available online through the respective RRB websites. Candidates need to:</p>
//         <ol>
//           <li>Register on the RRB website</li>
//           <li>Fill the application form</li>
//           <li>Upload required documents</li>
//           <li>Pay application fee</li>
//           <li>Submit and take printout</li>
//         </ol>

//         <p>Stay tuned for official notifications and start preparing now to make the most of this opportunity!</p>
//       `
//     },
//     {
//       id: 4,
//       title: "Banking Exams 2025 Calendar: All Important Dates",
//       excerpt: "Comprehensive calendar of all major banking examinations including IBPS, SBI, RBI for the year 2025 with notification and exam dates...",
//       category: "Banking",
//       author: "Amit Singh",
//       date: "12 Nov 2024",
//       readTime: "4 min read",
//       image: "https://images.unsplash.com/photo-1501167786227-4cba60f6d58f?w=1200&h=600&fit=crop",
//       content: `
//         <p>Planning your banking exam preparation requires a clear understanding of the examination schedule. Here's a comprehensive calendar of all major banking examinations scheduled for 2025, helping you plan your preparation strategy effectively.</p>

//         <h2>IBPS Examinations 2025</h2>

//         <h3>IBPS PO (Probationary Officer)</h3>
//         <ul>
//           <li>Notification: August 2025</li>
//           <li>Preliminary Exam: September 2025</li>
//           <li>Mains Exam: November 2025</li>
//           <li>Interview: January 2026</li>
//         </ul>

//         <h3>IBPS Clerk</h3>
//         <ul>
//           <li>Notification: July 2025</li>
//           <li>Preliminary Exam: August 2025</li>
//           <li>Mains Exam: October 2025</li>
//         </ul>

//         <h3>IBPS SO (Specialist Officer)</h3>
//         <ul>
//           <li>Notification: November 2025</li>
//           <li>Preliminary Exam: December 2025</li>
//           <li>Mains Exam: January 2026</li>
//           <li>Interview: March 2026</li>
//         </ul>

//         <h3>IBPS RRB</h3>
//         <ul>
//           <li>Notification: June 2025</li>
//           <li>Preliminary Exam: August 2025</li>
//           <li>Mains Exam: September 2025</li>
//           <li>Interview: November 2025</li>
//         </ul>

//         <h2>SBI Examinations 2025</h2>

//         <h3>SBI PO (Probationary Officer)</h3>
//         <ul>
//           <li>Notification: January 2025</li>
//           <li>Preliminary Exam: April 2025</li>
//           <li>Mains Exam: June 2025</li>
//           <li>Interview: August 2025</li>
//         </ul>

//         <h3>SBI Clerk</h3>
//         <ul>
//           <li>Notification: February 2025</li>
//           <li>Preliminary Exam: May 2025</li>
//           <li>Mains Exam: July 2025</li>
//         </ul>

//         <h3>SBI SO (Specialist Officer)</h3>
//         <ul>
//           <li>Notification: December 2024</li>
//           <li>Examination: January 2025</li>
//           <li>Interview: March 2025</li>
//         </ul>

//         <h2>RBI Examinations 2025</h2>

//         <h3>RBI Grade B</h3>
//         <ul>
//           <li>Notification: March 2025</li>
//           <li>Phase I Exam: June 2025</li>
//           <li>Phase II Exam: July 2025</li>
//           <li>Interview: September 2025</li>
//         </ul>

//         <h3>RBI Assistant</h3>
//         <ul>
//           <li>Notification: October 2025</li>
//           <li>Preliminary Exam: December 2025</li>
//           <li>Mains Exam: January 2026</li>
//           <li>Interview: March 2026</li>
//         </ul>

//         <h2>Other Important Banking Exams</h2>

//         <h3>NABARD</h3>
//         <ul>
//           <li>Notification: April 2025</li>
//           <li>Preliminary Exam: June 2025</li>
//           <li>Mains Exam: July 2025</li>
//           <li>Interview: September 2025</li>
//         </ul>

//         <h3>SIDBI</h3>
//         <ul>
//           <li>Notification: May 2025</li>
//           <li>Examination: July 2025</li>
//           <li>Interview: September 2025</li>
//         </ul>

//         <h2>Preparation Timeline</h2>
//         <p>Based on the above schedule, plan your preparation:</p>
//         <ul>
//           <li>Start preparing 6 months before the exam</li>
//           <li>Focus on basics in the first 2 months</li>
//           <li>Practice mock tests in months 3-5</li>
//           <li>Revision and final preparation in the last month</li>
//         </ul>

//         <h3>Important Tips</h3>
//         <ul>
//           <li>Cover the entire syllabus systematically</li>
//           <li>Stay updated with current affairs daily</li>
//           <li>Solve previous year papers</li>
//           <li>Take regular mock tests</li>
//           <li>Work on speed and accuracy</li>
//         </ul>

//         <h2>Common Syllabus Areas</h2>
//         <p>All banking exams generally cover:</p>
//         <ul>
//           <li>Quantitative Aptitude</li>
//           <li>Reasoning Ability</li>
//           <li>English Language</li>
//           <li>General Awareness (Banking)</li>
//           <li>Computer Knowledge</li>
//         </ul>

//         <p>Mark these dates in your calendar and start your preparation journey. All the best!</p>
//       `
//     }
//   ];
//   const article = newsArticles.find(a => a.id === parseInt(id || "1"));

//   if (!article) {
//     return (
//       <div className="min-h-screen bg-background">
//         <Header />
//         <div className="container mx-auto px-4 py-8">
//           <Card className="shadow-md">
//             <CardContent className="py-8 text-center">
//               <p className="text-muted-foreground text-lg">Article not found</p>
//               <Link to="/news-blogs">
//                 <Button className="mt-4 px-6">Back to News & Blogs</Button>
//               </Link>
//             </CardContent>
//           </Card>
//         </div>
//         <Footer />
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-background">
//       <Header />

//       <div className="container mx-auto px-4 py-8">

//         {/* Back button */}
//         <Link to="/news-blogs">
//           <Button 
//             variant="ghost" 
//             className="mb-6 flex items-center gap-2 text-base hover:bg-accent/60 transition-all"
//           >
//             <ArrowLeft className="h-4 w-4" />
//             Back to News & Blogs
//           </Button>
//         </Link>

//         {/* --- MAIN LAYOUT: ARTICLE LEFT + ADS RIGHT --- */}
//         <div className="grid grid-cols-1 lg:grid-cols-[3fr_1fr] gap-8">

//           {/* ------------------ ARTICLE SECTION ------------------ */}
//           <Card className="shadow-lg rounded-2xl overflow-hidden">

//             {/* Hero Image */}
//             <div className="aspect-video w-full overflow-hidden">
//               <img 
//                 src={article.image}
//                 alt={article.title}
//                 className="w-full h-full object-cover hover:scale-105 transition-all duration-500"
//               />
//             </div>

//             <CardContent className="p-6 md:p-10">

//               {/* Header */}
//               <div className="mb-8">
//                 <div className="flex items-center gap-3 mb-4">
//                   <Badge className="px-3 py-1 text-sm rounded-full">
//                     {article.category}
//                   </Badge>

//                   <span className="text-sm text-muted-foreground flex items-center gap-1">
//                     <Clock className="h-4 w-4" />
//                     {article.readTime}
//                   </span>
//                 </div>

//                 <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-5">
//                   {article.title}
//                 </h1>

//                 <div className="flex items-center justify-between flex-wrap gap-4">
//                   <div className="flex items-center gap-5 text-sm text-muted-foreground">
//                     <div className="flex items-center gap-1">
//                       <User className="h-4 w-4" />
//                       <span>{article.author}</span>
//                     </div>
//                     <div className="flex items-center gap-1">
//                       <Calendar className="h-4 w-4" />
//                       <span>{article.date}</span>
//                     </div>
//                   </div>

//                   <Button 
//                     variant="outline" 
//                     size="sm"
//                     className="rounded-full"
//                   >
//                     <Share2 className="h-4 w-4 mr-2" />
//                     Share
//                   </Button>
//                 </div>
//               </div>

//               <Separator className="my-8" />

//               {/* Article Content */}
//               <div 
//                 className="prose prose-slate max-w-none prose-headings:text-foreground prose-h2:text-3xl prose-h3:text-xl prose-p:text-[17px] prose-li:text-[17px]"
//                 dangerouslySetInnerHTML={{ __html: article.content }}
//                 style={{ lineHeight: "1.9" }}
//               />

//               <Separator className="my-10" />

//             </CardContent>
//           </Card>

//           {/* ------------------ AD SPACE SECTION ------------------ */}
//           <div className="w-full">
//             <div className="sticky top-24">

//               <div className="border rounded-xl bg-muted/40 h-[400px] flex items-center justify-center text-center text-muted-foreground p-4">
//                 <p className="text-sm">Ad Space<br/> (300×600px recommended)</p>
//               </div>

//               <div className="border rounded-xl bg-muted/40 h-[250px] mt-6 flex items-center justify-center text-muted-foreground text-sm">
//                 Ad Space
//               </div>

//             </div>
//           </div>

//         </div>

//         {/* Related Articles */}
//         <div className="mt-16">
//           <h3 className="font-semibold text-2xl mb-6">Related Articles</h3>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             {newsArticles
//               .filter(a => a.id !== article.id && a.category === article.category)
//               .slice(0, 3)
//               .map(related => (
//                 <Link key={related.id} to={`/news-blogs/${related.id}`}>
//                   <Card className="h-full hover:shadow-xl transition-all duration-300 cursor-pointer rounded-xl overflow-hidden">
//                     <div className="aspect-video">
//                       <img 
//                         src={related.image}
//                         alt={related.title}
//                         className="w-full h-full object-cover hover:scale-105 transition-all duration-500"
//                       />
//                     </div>
//                     <CardContent className="p-5">
//                       <h4 className="font-semibold text-lg mb-2 leading-tight">
//                         {related.title}
//                       </h4>
//                       <p className="text-muted-foreground text-sm">
//                         {related.excerpt.slice(0, 80)}...
//                       </p>
//                     </CardContent>
//                   </Card>
//                 </Link>
//               ))}
//           </div>

//         </div>

//       </div>

//       <Footer />
//     </div>
//   );
// };

// export default NewsBlogDetail;



import { useParams, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import { ArrowLeft, Calendar, User, Clock, Share2 } from "lucide-react";
import ShareButton from "@/components/ShareButton";

const NewsBlogDetail = () => {
  const { id } = useParams();

  // --- Your Articles (unchanged) ---

  const newsArticles = [
    {
      id: 1,
      title: "UPSC 2025 Notification Released: Key Changes You Need to Know",
      excerpt: "Union Public Service Commission has released the official notification for Civil Services Examination 2025 with significant changes in the pattern...",
      category: "UPSC",
      author: "Editorial Team",
      date: "15 Nov 2024",
      readTime: "5 min read",
      image: "https://images.unsplash.com/photo-1554224311-beee2c91c77b?w=1200&h=600&fit=crop",
      content: `
        <p>The Union Public Service Commission (UPSC) has officially released the notification for the Civil Services Examination 2025, bringing with it several important changes that aspirants need to be aware of. This comprehensive guide will help you understand all the key modifications and prepare accordingly.</p>

        <h2>Key Changes in UPSC CSE 2025</h2>
        <p>The most significant change is the introduction of a new optional paper pattern. The commission has restructured the optional subjects to provide more flexibility to candidates. Additionally, there are changes in the age relaxation criteria for certain categories.</p>

        <h3>Important Dates</h3>
        <ul>
          <li>Notification Release: 15th November 2024</li>
          <li>Application Start Date: 1st December 2024</li>
          <li>Application Last Date: 31st December 2024</li>
          <li>Preliminary Examination: May 2025</li>
          <li>Mains Examination: September 2025</li>
        </ul>

        <h3>Eligibility Criteria Updates</h3>
        <p>The age limit remains 21-32 years for general category candidates, with relaxations for reserved categories as per government norms. However, the educational qualification requirements have been clarified with additional specifications for professional degrees.</p>

        <h3>Examination Pattern Changes</h3>
        <p>The Preliminary examination will continue to have two papers - General Studies (GS) Paper I and Civil Services Aptitude Test (CSAT) Paper II. However, the syllabus has been slightly modified with more emphasis on current affairs and analytical ability.</p>

        <h3>Application Process</h3>
        <p>Candidates can apply online through the official UPSC website. The application fee remains ₹100 for general and OBC candidates, while SC/ST/PwD and women candidates are exempted from paying the fee.</p>

        <h2>Preparation Strategy</h2>
        <p>With these changes, aspirants need to modify their preparation strategy. Focus should be on:</p>
        <ul>
          <li>Understanding the new pattern thoroughly</li>
          <li>Strengthening current affairs knowledge</li>
          <li>Regular practice of answer writing</li>
          <li>Taking mock tests as per the new pattern</li>
        </ul>

        <h3>Resources and Study Material</h3>
        <p>UPSC has also updated its recommended reading list. Candidates should refer to standard textbooks and NCERT books for basic concepts, along with current affairs magazines and newspapers for staying updated.</p>

        <h2>Conclusion</h2>
        <p>The UPSC CSE 2025 notification brings important changes that require careful attention from aspirants. Early preparation and understanding of the new pattern will give candidates a competitive edge. Stay updated with the official UPSC website for any further announcements or clarifications.</p>
      `
    },
    {
      id: 2,
      title: "SSC CGL 2024: Strategy to Crack Tier-I in First Attempt",
      excerpt: "Complete preparation strategy for SSC CGL Tier-I examination including time management, important topics, and mock test analysis...",
      category: "SSC",
      author: "Priya Sharma",
      date: "14 Nov 2024",
      readTime: "8 min read",
      image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1200&h=600&fit=crop",
      content: `
        <p>Cracking SSC CGL Tier-I examination in the first attempt is a dream for many aspirants. With the right strategy, dedication, and smart preparation, this goal is definitely achievable. This comprehensive guide will walk you through a proven strategy to succeed.</p>

        <h2>Understanding the Exam Pattern</h2>
        <p>SSC CGL Tier-I consists of four sections: General Intelligence and Reasoning, General Awareness, Quantitative Aptitude, and English Comprehension. Each section carries 25 questions worth 50 marks, totaling 100 questions for 200 marks.</p>

        <h3>Section-wise Strategy</h3>
        
        <h4>General Intelligence and Reasoning</h4>
        <p>This section tests your logical and analytical abilities. Focus on:</p>
        <ul>
          <li>Classification and Series</li>
          <li>Analogy and Coding-Decoding</li>
          <li>Blood Relations and Direction Sense</li>
          <li>Puzzles and Seating Arrangement</li>
        </ul>

        <h4>General Awareness</h4>
        <p>Stay updated with current affairs for the last 6 months. Important areas include:</p>
        <ul>
          <li>Current Affairs (National and International)</li>
          <li>Static GK (Indian History, Geography, Polity)</li>
          <li>Economics and Science</li>
          <li>Important Books and Authors</li>
        </ul>

        <h4>Quantitative Aptitude</h4>
        <p>Mathematics section requires regular practice. Key topics:</p>
        <ul>
          <li>Number System and Simplification</li>
          <li>Percentage, Ratio and Proportion</li>
          <li>Time and Work, Speed and Distance</li>
          <li>Geometry and Mensuration</li>
        </ul>

        <h4>English Comprehension</h4>
        <p>Improve your vocabulary and grammar. Focus areas:</p>
        <ul>
          <li>Reading Comprehension</li>
          <li>Fill in the Blanks and Error Detection</li>
          <li>Synonyms and Antonyms</li>
          <li>Idioms and Phrases</li>
        </ul>

        <h2>Time Management Tips</h2>
        <p>Allocate 15 minutes to each section during practice. Attempt easier questions first and mark difficult ones for review. Don't spend more than 45 seconds on any question.</p>

        <h3>Mock Test Strategy</h3>
        <p>Take at least 2-3 full-length mock tests every week. Analyze your performance thoroughly, identify weak areas, and work on them. This will help you manage time effectively during the actual exam.</p>

        <h2>Important Resources</h2>
        <ul>
          <li>Previous year question papers (last 5 years)</li>
          <li>Standard preparation books for each section</li>
          <li>Online test series and video lectures</li>
          <li>Daily current affairs PDFs</li>
        </ul>

        <h2>Final Tips</h2>
        <p>Maintain consistency in your preparation. Create a study schedule and stick to it. Stay healthy, get adequate sleep, and stay motivated. Remember, success in SSC CGL is not just about hard work but also about smart work.</p>
      `
    },
    {
      id: 3,
      title: "Railway Recruitment 2024: Over 1 Lakh Vacancies Expected",
      excerpt: "Railway Recruitment Boards are expected to announce massive recruitment drive for various posts including NTPC, Group D, and technical positions...",
      category: "Railway",
      author: "Rajesh Kumar",
      date: "13 Nov 2024",
      readTime: "6 min read",
      image: "https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=1200&h=600&fit=crop",
      content: `
        <p>The Railway Recruitment Boards (RRBs) are gearing up for one of the largest recruitment drives in recent years, with over 1 lakh vacancies expected to be announced across various categories. This massive recruitment will provide opportunities for aspirants across the country.</p>

        <h2>Expected Vacancy Distribution</h2>
        <p>The recruitment is expected to cover multiple categories:</p>
        <ul>
          <li>Non-Technical Popular Categories (NTPC): 35,000+ posts</li>
          <li>Group D (Level 1): 50,000+ posts</li>
          <li>Paramedical Staff: 3,000+ posts</li>
          <li>Junior Engineer (JE): 10,000+ posts</li>
          <li>Assistant Loco Pilot (ALP): 5,000+ posts</li>
        </ul>

        <h3>RRB NTPC Recruitment</h3>
        <p>The NTPC category includes various posts such as:</p>
        <ul>
          <li>Junior Account Assistant cum Typist</li>
          <li>Commercial cum Ticket Clerk</li>
          <li>Traffic Assistant</li>
          <li>Goods Guard</li>
          <li>Senior Commercial cum Ticket Clerk</li>
        </ul>

        <h3>RRB Group D Recruitment</h3>
        <p>Group D posts include:</p>
        <ul>
          <li>Track Maintainer</li>
          <li>Helper</li>
          <li>Assistant Pointsman</li>
          <li>Porter</li>
        </ul>

        <h2>Eligibility Criteria</h2>
        <p>The eligibility varies by post:</p>
        <ul>
          <li>NTPC: Graduate for most posts</li>
          <li>Group D: 10th pass</li>
          <li>JE: Diploma/Engineering degree in relevant discipline</li>
          <li>ALP: ITI or equivalent</li>
        </ul>

        <h3>Age Limit</h3>
        <p>Generally, the age limit ranges from 18-33 years, with relaxations for reserved categories as per government norms.</p>

        <h2>Selection Process</h2>
        <p>The selection process typically involves:</p>
        <ol>
          <li>Computer Based Test (CBT) - Stage 1</li>
          <li>Computer Based Test (CBT) - Stage 2</li>
          <li>Skill Test/Physical Test (wherever applicable)</li>
          <li>Document Verification</li>
          <li>Medical Examination</li>
        </ol>

        <h3>Preparation Strategy</h3>
        <p>Start your preparation early. Focus on:</p>
        <ul>
          <li>Mathematics and Reasoning</li>
          <li>General Science and Current Affairs</li>
          <li>Previous year question papers</li>
          <li>Regular mock tests</li>
        </ul>

        <h2>Salary and Benefits</h2>
        <p>Railway jobs offer attractive salary packages along with benefits like:</p>
        <ul>
          <li>7th Pay Commission salary structure</li>
          <li>Medical facilities for self and family</li>
          <li>Railway quarters/HRA</li>
          <li>Pension benefits</li>
          <li>Concessional railway passes</li>
        </ul>

        <h2>Important Dates (Expected)</h2>
        <ul>
          <li>Notification Release: December 2024</li>
          <li>Application Period: January 2025</li>
          <li>Examination: March-April 2025</li>
        </ul>

        <h2>How to Apply</h2>
        <p>Applications will be available online through the respective RRB websites. Candidates need to:</p>
        <ol>
          <li>Register on the RRB website</li>
          <li>Fill the application form</li>
          <li>Upload required documents</li>
          <li>Pay application fee</li>
          <li>Submit and take printout</li>
        </ol>

        <p>Stay tuned for official notifications and start preparing now to make the most of this opportunity!</p>
      `
    },
    {
      id: 4,
      title: "Banking Exams 2025 Calendar: All Important Dates",
      excerpt: "Comprehensive calendar of all major banking examinations including IBPS, SBI, RBI for the year 2025 with notification and exam dates...",
      category: "Banking",
      author: "Amit Singh",
      date: "12 Nov 2024",
      readTime: "4 min read",
      image: "https://images.unsplash.com/photo-1501167786227-4cba60f6d58f?w=1200&h=600&fit=crop",
      content: `
        <p>Planning your banking exam preparation requires a clear understanding of the examination schedule. Here's a comprehensive calendar of all major banking examinations scheduled for 2025, helping you plan your preparation strategy effectively.</p>

        <h2>IBPS Examinations 2025</h2>
        
        <h3>IBPS PO (Probationary Officer)</h3>
        <ul>
          <li>Notification: August 2025</li>
          <li>Preliminary Exam: September 2025</li>
          <li>Mains Exam: November 2025</li>
          <li>Interview: January 2026</li>
        </ul>

        <h3>IBPS Clerk</h3>
        <ul>
          <li>Notification: July 2025</li>
          <li>Preliminary Exam: August 2025</li>
          <li>Mains Exam: October 2025</li>
        </ul>

        <h3>IBPS SO (Specialist Officer)</h3>
        <ul>
          <li>Notification: November 2025</li>
          <li>Preliminary Exam: December 2025</li>
          <li>Mains Exam: January 2026</li>
          <li>Interview: March 2026</li>
        </ul>

        <h3>IBPS RRB</h3>
        <ul>
          <li>Notification: June 2025</li>
          <li>Preliminary Exam: August 2025</li>
          <li>Mains Exam: September 2025</li>
          <li>Interview: November 2025</li>
        </ul>

        <h2>SBI Examinations 2025</h2>

        <h3>SBI PO (Probationary Officer)</h3>
        <ul>
          <li>Notification: January 2025</li>
          <li>Preliminary Exam: April 2025</li>
          <li>Mains Exam: June 2025</li>
          <li>Interview: August 2025</li>
        </ul>

        <h3>SBI Clerk</h3>
        <ul>
          <li>Notification: February 2025</li>
          <li>Preliminary Exam: May 2025</li>
          <li>Mains Exam: July 2025</li>
        </ul>

        <h3>SBI SO (Specialist Officer)</h3>
        <ul>
          <li>Notification: December 2024</li>
          <li>Examination: January 2025</li>
          <li>Interview: March 2025</li>
        </ul>

        <h2>RBI Examinations 2025</h2>

        <h3>RBI Grade B</h3>
        <ul>
          <li>Notification: March 2025</li>
          <li>Phase I Exam: June 2025</li>
          <li>Phase II Exam: July 2025</li>
          <li>Interview: September 2025</li>
        </ul>

        <h3>RBI Assistant</h3>
        <ul>
          <li>Notification: October 2025</li>
          <li>Preliminary Exam: December 2025</li>
          <li>Mains Exam: January 2026</li>
          <li>Interview: March 2026</li>
        </ul>

        <h2>Other Important Banking Exams</h2>

        <h3>NABARD</h3>
        <ul>
          <li>Notification: April 2025</li>
          <li>Preliminary Exam: June 2025</li>
          <li>Mains Exam: July 2025</li>
          <li>Interview: September 2025</li>
        </ul>

        <h3>SIDBI</h3>
        <ul>
          <li>Notification: May 2025</li>
          <li>Examination: July 2025</li>
          <li>Interview: September 2025</li>
        </ul>

        <h2>Preparation Timeline</h2>
        <p>Based on the above schedule, plan your preparation:</p>
        <ul>
          <li>Start preparing 6 months before the exam</li>
          <li>Focus on basics in the first 2 months</li>
          <li>Practice mock tests in months 3-5</li>
          <li>Revision and final preparation in the last month</li>
        </ul>

        <h3>Important Tips</h3>
        <ul>
          <li>Cover the entire syllabus systematically</li>
          <li>Stay updated with current affairs daily</li>
          <li>Solve previous year papers</li>
          <li>Take regular mock tests</li>
          <li>Work on speed and accuracy</li>
        </ul>

        <h2>Common Syllabus Areas</h2>
        <p>All banking exams generally cover:</p>
        <ul>
          <li>Quantitative Aptitude</li>
          <li>Reasoning Ability</li>
          <li>English Language</li>
          <li>General Awareness (Banking)</li>
          <li>Computer Knowledge</li>
        </ul>

        <p>Mark these dates in your calendar and start your preparation journey. All the best!</p>
      `
    }
  ];
  // find article
  const article = newsArticles.find(a => a.id === parseInt(id || "1"));



  if (!article) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <Card className="shadow-md">
            <CardContent className="py-8 text-center">
              <p className="text-muted-foreground text-lg">Article not found</p>
              <Link to="/news-blogs">
                <Button className="mt-4 px-6">Back to News & Blogs</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-muted/40 dark:from-background dark:to-muted/10">
      <Header />

      <div className="container mx-auto px-4 py-10 animate-fadeIn">

        {/* BACK BUTTON */}
        <Link to="/news-blogs">
          <Button
            variant="ghost"
            className="mb-6 flex items-center gap-2 text-base hover:bg-accent/30 transition-all rounded-xl"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to News & Blogs
          </Button>
        </Link>

        {/* GRID LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-[3fr_1fr] gap-10">

          {/* ARTICLE */}
          <Card className="shadow-xl rounded-3xl overflow-hidden border border-border/40 backdrop-blur-sm">

            {/* HERO IMAGE */}
            <div className="relative aspect-video overflow-hidden">
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-full object-cover transition-all duration-700 hover:scale-105"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>

            <CardContent className="p-8 md:p-12">

              {/* CATEGORY + READ TIME */}
              <div className="flex items-center gap-4 mb-6">
                <Badge className="px-4 py-1 text-sm rounded-full bg-primary/10 text-primary font-medium">
                  {article.category}
                </Badge>

                <span className="text-sm text-muted-foreground flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  {article.readTime}
                </span>
              </div>

              {/* TITLE */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.15] mb-8 text-slate-900 tracking-tight">
                {article.title}
              </h1>

              <div className="flex items-center justify-between flex-wrap gap-6">
                <div className="flex items-center gap-6 text-sm text-slate-600">
                  <div className="flex items-center gap-2">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-semibold shadow-md">
                      {article.author.charAt(0)}
                    </div>
                    <span className="font-medium">{article.author}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-slate-500" />
                    <span className="font-medium">{article.date}</span>
                  </div>
                </div>

                <ShareButton
                  title={article?.title}
                  text={article?.excerpt}
                />

              </div>


              <Separator className="my-10" />

              {/* ARTICLE CONTENT */}
              <div
                className="
                  prose 
                  prose-slate
                  max-w-none 
                  dark:prose-invert 
                  prose-h2:text-3xl 
                  prose-h3:text-2xl
                  prose-p:text-[18px]
                  prose-li:text-[18px]
                  prose-img:rounded-xl
                  leading-8
                "
                dangerouslySetInnerHTML={{ __html: article.content }}
              />

              <Separator className="my-10" />

            </CardContent>
          </Card>

          {/* RIGHT SIDE ADS / MORE ARTICLES */}
          <div className="w-full">
            <div className="sticky top-28 space-y-6">


                {/* AD BOX - ZCROM.COM */}
                <Card className="rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all border border-border/40">
                  <p className="text-sm text-muted-foreground mb-3">Sponsored</p>
  
              {/* Updated Image to a Tech/Business visual */}
         <img
            src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800"
             alt="ZCROM Software Solutions"
            className="rounded-xl w-full mb-4 h-48 object-cover" 
          />
  
            <h3 className="font-semibold text-lg">
               Elevate Your Business with ZCROM
             </h3>
  
                   <p className="text-sm text-muted-foreground mt-1">
                     Premium web development and software solutions tailored for your growth.
                    </p>
  
             {/* Added Link to ZCROM */}
            <a href="https://zcrom.com" target="_blank" rel="noopener noreferrer">
             <Button className="mt-4 w-full rounded-xl">
              Visit Website
            </Button>
            </a>
           </Card>


              {/* More Suggestions */}
              <Card className="rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all border border-border/40">
                <h3 className="font-semibold text-lg mb-4">More like this</h3>
                <div className="space-y-4 text-sm">
                  <Link className="block hover:text-primary" to={""}>UPSC Books You Must Read</Link>
                  <Link to={""} className="block hover:text-primary">How to Prepare Current Affairs</Link>
                  <Link to={""} className="block hover:text-primary">SSC vs Banking – Which to Choose?</Link>
                </div>
              </Card>

            </div>
          </div>

        </div>
      </div>

      <Footer />
    </div>
  );
};

export default NewsBlogDetail;
