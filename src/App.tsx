import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import LatestJobs from "./pages/LatestJobs";
import JobDetail from "./pages/JobDetail";
import Results from "./pages/Results";
import ResultDetail from "./pages/ResultDetail";
import AdmitCard from "./pages/AdmitCard";
import AdmitCardDetail from "./pages/AdmitCardDetail";
import AnswerKey from "./pages/AnswerKey";
import AnswerKeyDetail from "./pages/AnswerKeyDetail";
import Syllabus from "./pages/Syllabus";
import SyllabusDetail from "./pages/SyllabusDetail";
import Admission from "./pages/Admission";
import AdmissionDetail from "./pages/AdmissionDetail";
import Documents from "./pages/Documents";
import Tools from "./pages/Tools";
import Resources from "./pages/Resources";
import Dashboard from "./pages/Dashboard";
import Test from "./pages/Test";
import GovtSchemes from "./pages/GovtSchemes";
import SchemeDetail from "./pages/SchemeDetail";
import NewsBlogs from "./pages/NewsBlogs";
import NewsBlogDetail from "./pages/NewsBlogDetail";
import NotFound from "./pages/NotFound";
import DocumentDetail from "./pages/DocumentDetail";
import ScrollToTop from "./components/ScrollToTop";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
      <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/latest-jobs" element={<LatestJobs />} />
          <Route path="/jobs/:slug" element={<JobDetail />} />
          <Route path="/results" element={<Results />} />
          <Route path="/result/:slug" element={<ResultDetail />} />
          <Route path="/admit-card" element={<AdmitCard />} />
          <Route path="/admit-card/:slug" element={<AdmitCardDetail />} />
          <Route path="/answer-key" element={<AnswerKey />} />
          <Route path="/answer-key/:slug" element={<AnswerKeyDetail />} />
          <Route path="/syllabus" element={<Syllabus />} />
          <Route path="/syllabus/:slug" element={<SyllabusDetail />} />
          <Route path="/admission" element={<Admission />} />
          <Route path="/admission/:slug" element={<AdmissionDetail />} />
          <Route path="/documents" element={<Documents />} />
          <Route path="/document/:slug" element={<DocumentDetail />} />
          <Route path="/tools" element={<Tools />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/test/:subject" element={<Test />} />
          <Route path="/govt-schemes" element={<GovtSchemes />} />
          <Route path="/scheme/:slug" element={<SchemeDetail />} />
          <Route path="/news-blogs" element={<NewsBlogs />} />
          <Route path="/news-blogs/:slug" element={<NewsBlogDetail />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
