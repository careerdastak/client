import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import QuickLinks from "@/components/QuickLinks";
import LatestUpdates from "@/components/LatestUpdates";
import CategoryFilter from "@/components/CategoryFilter";
import TrendingJobs from "@/components/TrendingJobs";
import Footer from "@/components/Footer";
import { FeedbackSection } from "@/components/FeedbackSection";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import DocumentsServices from "@/components/DocumentsServices";
import LatestNewsBlogs from "@/components/LatestNewsBlogs";
import Schemes from "@/components/Schemes";
import Highlight from "@/components/Highlight";

// Define the structure for job/admission items for better type safety
interface JobOrAdmissionItem {
  _id?: string;
  id?: string;
  slug: string;
  title: string;
  organization: string;
  postDate: string;
  importantDates?: {
    applicationEnd?: string;
    applicationStart?: string;
    admitCardDate?: string;
    resultDate?: string;
    answerKeyDate?: string;
  };
  status?: {
    isPublished: boolean;
    isApplicationOpen: boolean;
    isAdmitCardAvailable: boolean;
    isResultDeclared: boolean;
    isAnswerKeyReleased: boolean;
  };
  totalPosts?: string | number;
  location?: string;
}

interface CommonItem {
  id?: string | number;
  slug: string;
  title: string;
  organization: string;
  date: string;
  postDate: string;
}

interface SyllabusItem {
  _id?: string;
  id?: string;
  slug: string;
  title: string;
  organization?: string;
  description?: string;
  subjects?: string[];
  createdAt: string;
}

// --- Helper Functions (moved out of component for stability) ---

// stable key resolver for lists
const keyFor = (item: any, index: number) => item?._id ?? item?.id ?? index;

// format date helper
const formatDate = (dateString: any): string => {
  if (!dateString) return "Not Mentioned";
  if (typeof dateString === "string" && dateString.includes(" ")) return dateString;
  try {
    const d = new Date(dateString);
    if (isNaN(d.getTime())) return "Invalid date";
    return d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
  } catch {
    return "Invalid date";
  }
};

// --- API Fetchers ---
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const fetchLatestJobs = async (): Promise<JobOrAdmissionItem[]> => {
  const res = await fetch(`${BACKEND_URL}/api/jobs/home`);
  if (!res.ok) throw new Error("Failed to fetch jobs");
  const data: JobOrAdmissionItem[] = await res.json();
  const filteredJobs = data.filter((job) => job.status?.isPublished && job.status?.isApplicationOpen);
  return filteredJobs.slice(0, 12);
};

const fetchAdmissions = async (): Promise<JobOrAdmissionItem[]> => {
  const res = await fetch(`${BACKEND_URL}/api/admissions`);
  if (!res.ok) throw new Error("Failed to load admissions");
  const data: JobOrAdmissionItem[] = await res.json();

  const filteredAdmissions = data.filter(
    (admission) => admission.status?.isPublished && admission.status?.isApplicationOpen
  );

  const sorted = filteredAdmissions
    .filter((a) => a?.importantDates?.applicationStart)
    .sort(
      (a, b) =>
        new Date(b.importantDates!.applicationStart!).getTime() -
        new Date(a.importantDates!.applicationStart!).getTime()
    );

  return sorted.slice(0, 12);
};

const fetchCombinedItems = async (tag: string, statusKey: keyof NonNullable<JobOrAdmissionItem['status']>, dateKey: keyof NonNullable<JobOrAdmissionItem['importantDates']>): Promise<CommonItem[]> => {
    const [jobsResp, admissionsResp] = await Promise.all([
        fetch(`${BACKEND_URL}/api/jobs/home?tag=${tag}`),
        fetch(`${BACKEND_URL}/api/admissions/home?tag=${tag}`),
    ]);

    if (!jobsResp.ok) throw new Error(`Failed to fetch jobs for ${tag}`);
    if (!admissionsResp.ok) throw new Error(`Failed to fetch admissions for ${tag}`);

    const jobsData: JobOrAdmissionItem[] = await jobsResp.json();
    const admissionsData: JobOrAdmissionItem[] = await admissionsResp.json();

    const transformed = [
        ...jobsData
            .filter((j) => j.status?.isPublished && j.status?.[statusKey])
            .map((j) => ({
                id: j._id ?? j.id,
                slug: j.slug,
                title: j.title,
                organization: j.organization,
                date: formatDate(j.importantDates?.[dateKey]),
                postDate: j.postDate,
            })),
        ...admissionsData
            .filter((a) => a.status?.isPublished && a.status?.[statusKey])
            .map((a) => ({
                id: a._id ?? a.id,
                slug: a.slug,
                title: a.title,
                organization: a.organization,
                date: formatDate(a.importantDates?.[dateKey]),
                postDate: a.postDate,
            })),
    ];

    transformed.sort((a, b) => new Date(b.postDate).getTime() - new Date(a.postDate).getTime());
    return transformed.slice(0, 12);
};

const fetchSyllabus = async (): Promise<SyllabusItem[]> => {
  const res = await fetch(`${BACKEND_URL}/api/syllabus/home`);
  if (!res.ok) throw new Error("Failed to fetch syllabus");
  const data: { data?: SyllabusItem[] } | SyllabusItem[] = await res.json();

  const syllabusData = Array.isArray(data) ? data : data.data;

  if (Array.isArray(syllabusData)) {
    const sortedSyllabus = syllabusData
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 3);
    return sortedSyllabus;
  }
  return [];
};


// --- Component ---

const Index = () => {
  // --- React Query Hooks ---

  const { data: latestJobs, isLoading: loadingJobs, error: errorJobs } = useQuery({
    queryKey: ['latestJobs'],
    queryFn: fetchLatestJobs,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const { data: admissions, isLoading: loadingAdmissions, error: errorAdmissions } = useQuery({
    queryKey: ['admissions'],
    queryFn: fetchAdmissions,
    staleTime: 5 * 60 * 1000,
  });

  const { data: admitCards, isLoading: loadingAdmitCards, error: errorAdmitCards } = useQuery({
    queryKey: ['admitCards'],
    queryFn: () => fetchCombinedItems('admitCards', 'isAdmitCardAvailable', 'admitCardDate'),
    staleTime: 5 * 60 * 1000,
  });

  const { data: results, isLoading: loadingResults, error: errorResults } = useQuery({
    queryKey: ['results'],
    queryFn: () => fetchCombinedItems('results', 'isResultDeclared', 'resultDate'),
    staleTime: 5 * 60 * 1000,
  });

  const { data: answerKeys, isLoading: loadingAnswerKeys, error: errorAnswerKeys } = useQuery({
    queryKey: ['answerKeys'],
    queryFn: () => fetchCombinedItems('answerKeys', 'isAnswerKeyReleased', 'answerKeyDate'),
    staleTime: 5 * 60 * 1000,
  });

  const { data: syllabus, isLoading: loadingSyllabus, error: errorSyllabus } = useQuery({
    queryKey: ['syllabus'],
    queryFn: fetchSyllabus,
    staleTime: 60 * 60 * 1000, // 1 hour for syllabus
  });
  
  // Important Documents static data (remains the same)
  const importantDocuments = [
    { title: "Aadhaar Card Services", description: "Update, download, check status" },
    { title: "PAN Card Services", description: "Apply, correct, or reprint PAN" },
    { title: "Passport Seva", description: "Apply for new or renewal" },
    { title: "Driving License Services", description: "Apply for DL, renewal, changes" },
    { title: "Voter ID Card", description: "Apply, correct, or download e-EPIC" },
    { title: "DigiLocker", description: "Access digital certificates" },
    { title: "EPF Passbook", description: "Check EPF balance and passbook" },
    { title: "Ayushman Bharat (PMJAY)", description: "Check eligibility, download card" },
    { title: "Income Certificate", description: "Apply online, track status" },
    { title: "Caste Certificate", description: "Apply online, track status" },
    { title: "Domicile Certificate", description: "Apply online, track status" },
    { title: "Ration Card Services", description: "Add member, new card" },
  ];

  // Utility function to render loading/error/no data states in the cards
  const renderListContent = (
    data: any[] | undefined,
    isLoading: boolean,
    error: Error | null,
    noDataMessage: string,
    renderItem: (item: any, idx: number) => JSX.Element,
    skeletonCount: number = 2
  ) => {
    if (isLoading) {
      return (
        <div className="py-4">
          <div className="animate-pulse space-y-3">
            {[...Array(skeletonCount)].map((_, idx) => (
              <div key={idx} className="pb-3 border-b last:border-0 border-slate-100">
                <div className="h-4 bg-slate-200 rounded w-3/4 mb-2" />
                <div className="h-3 bg-slate-200 rounded w-1/2" />
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (error) {
      return <p className="text-sm text-red-500">Error: {error.message}</p>;
    }

    if (!data || data.length === 0) {
      return <p className="text-sm text-slate-500">{noDataMessage}</p>;
    }

    return data.slice(0, 15).map(renderItem);
  };


  // --- Render ---

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Header />
      <Highlight />


      <div className="container mx-auto px-4 py-2 lg:py-6">
        <div className="mb-6">
          <HeroSection />
        </div>
        {/* Hero */}
        <div className="flex flex-col lg:flex-row gap-4 mb-2">
          {/* Left Side - Category Filter & Trending Jobs */}
          <div className="flex-1">
            <CategoryFilter />
            <div className="mt-4">
              <TrendingJobs />
            </div>
          </div>

          {/* Right Side - Feedback Section */}
          <div className="lg:w-72 shrink-0">
            <FeedbackSection />
          </div>
        </div>

        {/* Top three columns: Latest Jobs, Results, Admit Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* Latest Jobs */}
          <Card className="bg-white border border-slate-200 rounded-lg shadow-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-semibold">Latest Jobs</CardTitle>
                <Link to="/latest-jobs">
                  <Button variant="link" size="sm" className="text-blue-700">View All</Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {renderListContent(
                latestJobs,
                loadingJobs,
                errorJobs,
                "No recent jobs found.",
                (job: JobOrAdmissionItem, idx) => (
                  <div key={keyFor(job, idx)} className="pb-3 border-b last:border-0 border-slate-100">
                    <Link to={`/jobs/${job.slug}`} className="block text-sm font-medium text-slate-800 hover:text-blue-700">
                      {job.title}
                    </Link>
                    <div className="text-xs text-slate-500">
                      <div>{job.organization}</div>
                      <div>
                        <span className="text-blue-700 font-bold">Posts: {job.totalPosts ?? "—"}</span>
                        <span className="mx-2">|</span>
                        <span className="text-red-600 font-bold">Last: {job.importantDates?.applicationEnd ? formatDate(job.importantDates.applicationEnd) : "-"}</span>
                        <span className="mx-2">|</span>
                        <span className="font-bold">{job.location ?? "-"}</span>
                      </div>
                    </div>
                  </div>
                ),
                3
              )}
            </CardContent>
          </Card>

          {/* Results */}
          <Card className="bg-white border border-slate-200 rounded-lg shadow-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-semibold">Latest Results</CardTitle>
                <Link to="/results">
                  <Button variant="link" size="sm" className="text-blue-700">View All</Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {renderListContent(
                results,
                loadingResults,
                errorResults,
                "No results available.",
                (res: CommonItem, idx) => (
                  <div key={keyFor(res, idx)} className="pb-3 border-b last:border-0 border-slate-100">
                    <Link to={`/result/${res.slug}`} className="block text-sm font-medium text-slate-800 hover:text-blue-700">
                      {res.title}
                    </Link>
                    <div className="text-xs text-slate-500 mt-1">
                      <div>{res.organization}</div>
                      <div className="text-blue-700 font-bold">Declared: {res.date}</div>
                    </div>
                  </div>
                ),
                3
              )}
            </CardContent>
          </Card>

          {/* Admit Cards */}
          <Card className="bg-white border border-slate-200 rounded-lg shadow-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-semibold">Admit Cards</CardTitle>
                <Link to="/admit-card">
                  <Button variant="link" size="sm" className="text-blue-700">View All</Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {renderListContent(
                admitCards,
                loadingAdmitCards,
                errorAdmitCards,
                "No admit cards available.",
                (card: CommonItem, idx) => (
                  <div key={keyFor(card, idx)} className="pb-3 border-b last:border-0 border-slate-100">
                    <Link to={`/admit-card/${card.slug}`} className="block text-sm font-medium text-slate-800 hover:text-blue-700">
                      {card.title}
                    </Link>
                    <div className="text-xs text-slate-500 mt-1">
                      <div>{card.organization}</div>
                      <div className="text-blue-700 font-bold">Released: {card.date}</div>
                    </div>
                  </div>
                ),
                3
              )}
            </CardContent>
          </Card>
        </div>

        {/* Middle section: Admission, Answer Keys, Syllabus, Documents */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          {/* Main two-column area (spans 2 cols on large screens) */}
          <div className="lg:col-span-2 space-y-5">
            {/* Admission + Answer keys */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <Card className="bg-white border border-slate-200 rounded-lg shadow-sm">
                <CardHeader>
                  <div className="flex items-center justify-between w-full">
                    <CardTitle className="text-lg font-semibold">Admission</CardTitle>
                    <Link to="/admission"><Button variant="link" size="sm" className="text-blue-700">View All</Button></Link>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  {renderListContent(
                    admissions,
                    loadingAdmissions,
                    errorAdmissions,
                    "No recent admissions.",
                    (a: JobOrAdmissionItem, idx) => (
                      <div key={keyFor(a, idx)} className="pb-3 border-b last:border-0 border-slate-100">
                        <Link to={`/admission/${a.slug}`} className="block text-sm font-medium text-slate-800 hover:text-blue-700">
                          {a.title}
                        </Link>
                        <div className="text-xs text-slate-500">
                          <div>{a.organization}</div>
                          <div>
                            <span className="text-xs text-blue-700 font-bold">
                              Start: {a.importantDates?.applicationStart ? formatDate(a.importantDates.applicationStart) + " " : "-"}
                            </span>
                            <span className="mx-2">|</span>
                            <span className="text-xs text-red-600 font-bold">
                              Last: {a.importantDates?.applicationEnd ? formatDate(a.importantDates.applicationEnd) : "-"}
                            </span>
                          </div>
                        </div>
                      </div>
                    ),
                    3
                  )}
                </CardContent>
              </Card>

              <Card className="bg-white border border-slate-200 rounded-lg shadow-sm">
                <CardHeader>
                  <div className="flex items-center justify-between w-full">
                    <CardTitle className="text-lg font-semibold">Answer Keys</CardTitle>
                    <Link to="/answer-key"><Button variant="link" size="sm" className="text-blue-700">View All</Button></Link>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  {renderListContent(
                    answerKeys,
                    loadingAnswerKeys,
                    errorAnswerKeys,
                    "No answer keys available.",
                    (ak: CommonItem, idx) => (
                      <div key={keyFor(ak, idx)} className="pb-3 border-b last:border-0 border-slate-100">
                        <Link to={`/answer-key/${ak.slug}`} className="block text-sm font-medium text-slate-800 hover:text-blue-700">
                          {ak.title}
                        </Link>
                        <div className="text-xs text-slate-500 mt-1">
                          <div>{ak.organization}</div>
                          <div className="text-blue-700 font-bold">Released: {ak.date}</div>
                        </div>
                      </div>
                    ),
                    3
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Syllabus & Documents */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Syllabus Card */}
              <Card className="bg-white border border-slate-200 rounded-lg shadow-sm">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base font-semibold">Syllabus</CardTitle>
                    <Link to="/syllabus">
                      <Button variant="link" size="sm" className="text-blue-700 text-xs font-medium">View All</Button>
                    </Link>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3 pt-0">
                  {renderListContent(
                    syllabus,
                    loadingSyllabus,
                    errorSyllabus,
                    "No syllabus available",
                    (syl: SyllabusItem, idx) => (
                      <div key={keyFor(syl, idx)} className="pb-3 border-b last:border-0 border-slate-100 last:pb-0">
                        <Link
                          to={`/syllabus/${syl.slug}`}
                          className="block text-sm font-medium text-slate-800 hover:text-blue-700 leading-tight mb-1"
                        >
                          {syl.title}
                        </Link>
                        <div className="text-xs text-slate-500 space-y-1">
                          {syl.organization && (
                            <div className="font-medium">{syl.organization}</div>
                          )}
                          {syl.description && (
                            <div className="line-clamp-1">{syl.description}</div>
                          )}
                          {syl.subjects && syl.subjects.length > 0 && (
                            <div className="text-blue-700 font-semibold">
                              Subjects: {syl.subjects.slice(0, 2).join(", ")}
                              {syl.subjects.length > 2 && "..."}
                            </div>
                          )}
                        </div>
                      </div>
                    ),
                    3
                  )}
                </CardContent>
              </Card>

              {/* Documents Card (Static Data) */}
              <Card className="bg-white border border-slate-200 rounded-lg shadow-sm">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base font-semibold">Important Documents</CardTitle>
                    <Link to="/documents">
                      <Button variant="link" size="sm" className="text-blue-700 text-xs font-medium">View All</Button>
                    </Link>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3 pt-0">
                  {importantDocuments.slice(0, 15).map((doc, idx) => {
                    const k = keyFor(doc, idx);
                    return (
                      <div key={k} className="pb-3 border-b last:border-0 border-slate-100 last:pb-0">
                        <Link to="/documents" className="block text-sm font-medium text-slate-800 hover:text-blue-700 leading-tight mb-1">
                          {doc.title}
                        </Link>
                        <div className="text-xs text-slate-500">{doc.description}</div>
                      </div>
                    );
                  })}
                </CardContent>
              </Card>
            </div>

            {/* Documents services & Latest news/blogs */}
            <div className="space-y-5 mt-2">
              <DocumentsServices />
              <LatestNewsBlogs />
            </div>
          </div>

          {/* Right Sidebar */}
          <aside className="space-y-5">
            <Schemes />
            <QuickLinks />
            <LatestUpdates />


            <Card className="m-8 p-4 bg-white rounded-lg shadow text-sm max-w-80">
              <p className="text-sm text-muted-foreground mb-3">Sponsored</p>
              <img className="rounded-md max-h-40 w-full object-cover" src="https://images.unsplash.com/photo-1560264418-c4445382edbc?q=80&w=400" alt="ZCROM Software Solutions" />
              <p className="text-gray-900 text-xl font-semibold ml-2 mt-2">Elevate Your Business with ZCROM</p>
              <p className="text-gray-500 mt-3 ml-2">Premium web development and software solutions tailored for your growth ...</p>
              <a href="https://zcrom.com" target="_blank" rel="noopener noreferrer">
                <Button className="mt-4 w-full rounded-xl" style={{
                  background:
                    "linear-gradient(135deg, hsl(211 100% 50%) 0%, hsl(271 76% 53%) 100%)",
                }}>
                  Visit Website
                </Button>
              </a>
            </Card>

          </aside>
        </div>

        {/* Feedback + Footer */}
        <div className="mt-8">
          <FeedbackSection />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Index;