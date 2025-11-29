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
import { useEffect, useState } from "react";
import DocumentsServices from "@/components/DocumentsServices";
import LatestNewsBlogs from "@/components/LatestNewsBlogs";
import Schemes from "@/components/Schemes";
import Highlight from "@/components/Highlight";



const Index = () => {
  const [latestJobs, setLatestJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");
  const [admissions, setAdmissions] = useState<any[]>([]);
  const [loadingAdmission, setLoadingAdmission] = useState(true);
  const [errorAdmission, setErrorAdmission] = useState<any>(null);
  const [admitCards, setAdmitCards] = useState<any[]>([]);
  const [loadingAdmitCards, setLoadingAdmitCards] = useState(true);
  const [errorAdmitCards, setErrorAdmitCards] = useState<any>(null);
  const [results, setResults] = useState<any[]>([]);
  const [loadingResults, setLoadingResults] = useState(true);
  const [errorResults, setErrorResults] = useState<any>(null);
  const [answerKeys, setAnswerKeys] = useState<any[]>([]);
  const [loadingAnswerKeys, setLoadingAnswerKeys] = useState(true);
  const [errorAnswerKeys, setErrorAnswerKeys] = useState<any>(null);
  const [syllabus, setSyllabus] = useState<any[]>([]);
  const [loadingSyllabus, setLoadingSyllabus] = useState(true);
  const [errorSyllabus, setErrorSyllabus] = useState<any>(null);

  // stable key resolver for lists
  const keyFor = (item: any, index: number) => item?._id ?? item?.id ?? index;

  // format date helper
  const formatDate = (dateString: any) => {
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

  // Fetch Admissions
  useEffect(() => {
    const fetchAdmissions = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/admissions`);
        if (!res.ok) throw new Error("Failed to load admissions");
        const data = await res.json();

        const filteredAdmissions = data.filter(
          (admission: any) => admission.status?.isPublished && admission.status?.isApplicationOpen
        );

        const sorted = filteredAdmissions
          .filter((a: any) => a?.importantDates?.applicationStart)
          .sort(
            (a: any, b: any) =>
              new Date(b.importantDates.applicationStart).getTime() -
              new Date(a.importantDates.applicationStart).getTime()
          );

        setAdmissions(sorted.slice(0, 12));
      } catch (err: any) {
        setErrorAdmission(err?.message ?? String(err));
      } finally {
        setLoadingAdmission(false);
      }
    };

    fetchAdmissions();
  }, []);

  // Fetch Latest Jobs
  useEffect(() => {
    const fetchLatestJobs = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/jobs/home`);
        if (!res.ok) throw new Error("Failed to fetch jobs");
        const data = await res.json();

        const filteredJobs = data.filter((job: any) => job.status?.isPublished && job.status?.isApplicationOpen);
        setLatestJobs(filteredJobs.slice(0, 12));
      } catch (err: any) {
        setError(err?.message ?? "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchLatestJobs();
  }, []);

  // Fetch Admit Cards
  useEffect(() => {
    const fetchAdmitCards = async () => {
      try {
        setLoadingAdmitCards(true);

        const jobsResp = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/jobs/home?tag=admitCards`);
        if (!jobsResp.ok) throw new Error("Failed to fetch jobs for admit cards");
        const jobsData = await jobsResp.json();

        const admissionsResp = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/admissions/home?tag=admitCards`);
        if (!admissionsResp.ok) throw new Error("Failed to fetch admissions for admit cards");
        const admissionsData = await admissionsResp.json();

        const transformed = [
          ...jobsData
            .filter((j: any) => j.status?.isPublished && j.status?.isAdmitCardAvailable)
            .map((j: any) => ({
              id: j._id ?? j.id,
              slug: j.slug,
              title: j.title,
              organization: j.organization,
              date: formatDate(j.importantDates?.admitCardDate),
              postDate: j.postDate,
            })),
          ...admissionsData
            .filter((a: any) => a.status?.isPublished && a.status?.isAdmitCardAvailable)
            .map((a: any) => ({
              id: a._id ?? a.id,
              slug: a.slug,
              title: a.title,
              organization: a.organization,
              date: formatDate(a.importantDates?.admitCardDate),
              postDate: a.postDate,
            })),
        ];

        transformed.sort((a: any, b: any) => new Date(b.postDate).getTime() - new Date(a.postDate).getTime());
        setAdmitCards(transformed.slice(0, 12));
      } catch (err: any) {
        setErrorAdmitCards(err?.message ?? String(err));
      } finally {
        setLoadingAdmitCards(false);
      }
    };

    fetchAdmitCards();
  }, []);

  // Fetch Results
  useEffect(() => {
    const fetchResults = async () => {
      try {
        setLoadingResults(true);

        const jobsResp = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/jobs/home?tag=results`);
        if (!jobsResp.ok) throw new Error("Failed to fetch jobs for results");
        const jobsData = await jobsResp.json();

        const admissionsResp = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/admissions/home?tag=results`);
        if (!admissionsResp.ok) throw new Error("Failed to fetch admissions for results");
        const admissionsData = await admissionsResp.json();

        const transformed = [
          ...jobsData
            .filter((j: any) => j.status?.isPublished && j.status?.isResultDeclared)
            .map((j: any) => ({
              id: j._id ?? j.id,
              slug: j.slug,
              title: j.title,
              organization: j.organization,
              date: formatDate(j.importantDates?.resultDate),
              postDate: j.postDate,
            })),
          ...admissionsData
            .filter((a: any) => a.status?.isPublished && a.status?.isResultDeclared)
            .map((a: any) => ({
              id: a._id ?? a.id,
              slug: a.slug,
              title: a.title,
              organization: a.organization,
              date: formatDate(a.importantDates?.resultDate),
              postDate: a.postDate,
            })),
        ];

        transformed.sort((a: any, b: any) => new Date(b.postDate).getTime() - new Date(a.postDate).getTime());
        setResults(transformed.slice(0, 12));
      } catch (err: any) {
        setErrorResults(err?.message ?? String(err));
      } finally {
        setLoadingResults(false);
      }
    };

    fetchResults();
  }, []);

  // Fetch Answer Keys
  useEffect(() => {
    const fetchAnswerKeys = async () => {
      try {
        setLoadingAnswerKeys(true);

        const jobsResp = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/jobs/home?tag=answerKeys`);
        if (!jobsResp.ok) throw new Error("Failed to fetch jobs for answer keys");
        const jobsData = await jobsResp.json();

        const admissionsResp = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/admissions/home?tag=answerKeys`);
        if (!admissionsResp.ok) throw new Error("Failed to fetch admissions for answer keys");
        const admissionsData = await admissionsResp.json();

        const transformed = [
          ...jobsData
            .filter((j: any) => j.status?.isPublished && j.status?.isAnswerKeyReleased)
            .map((j: any) => ({
              id: j._id ?? j.id,
              slug: j.slug,
              title: j.title,
              organization: j.organization,
              date: formatDate(j.importantDates?.answerKeyDate),
              postDate: j.postDate,
            })),
          ...admissionsData
            .filter((a: any) => a.status?.isPublished && a.status?.isAnswerKeyReleased)
            .map((a: any) => ({
              id: a._id ?? a.id,
              slug: a.slug,
              title: a.title,
              organization: a.organization,
              date: formatDate(a.importantDates?.answerKeyDate),
              postDate: a.postDate,
            })),
        ];

        transformed.sort((a: any, b: any) => new Date(b.postDate).getTime() - new Date(a.postDate).getTime());
        setAnswerKeys(transformed.slice(0, 12));
      } catch (err: any) {
        setErrorAnswerKeys(err?.message ?? String(err));
      } finally {
        setLoadingAnswerKeys(false);
      }
    };

    fetchAnswerKeys();
  }, []);

 // Fetch Syllabus
useEffect(() => {
  const fetchSyllabus = async () => {
    try {
      setLoadingSyllabus(true);
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/syllabus/home`);
      if (!res.ok) throw new Error("Failed to fetch syllabus");
      const data = await res.json();

      const syllabusData = data.data || data;

      if (Array.isArray(syllabusData)) {
        // Sort by creation date descending (latest first)
        const sortedSyllabus = syllabusData
          .sort((a: any, b: any) => {
            const dateA = new Date(a.createdAt || 0).getTime();
            const dateB = new Date(b.createdAt || 0).getTime();
            return dateB - dateA; // descending order
          })
          .slice(0, 15); // take top 15 latest
        setSyllabus(sortedSyllabus);
      } else {
        setSyllabus([]);
      }
    } catch (err: any) {
      setErrorSyllabus(err?.message ?? String(err));
    } finally {
      setLoadingSyllabus(false);
    }
  };

  fetchSyllabus();
}, []);


  // Important Documents static data
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

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Header />
      {/* <Highlight /> */}


      <div className="container mx-auto px-4 py-2 lg:py-6">
        <div className="mb-6"> <HeroSection />
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

        {/* Top three columns */}
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
              {loading ? (
                <div className="py-4">
                  <div className="animate-pulse space-y-2">
                    <div className="h-3 bg-slate-200 rounded w-3/4" />
                    <div className="h-3 bg-slate-200 rounded w-2/3" />
                  </div>
                </div>
              ) : latestJobs.length === 0 ? (
                <p className="text-sm text-slate-500">No recent jobs found.</p>
              ) : (
                latestJobs.slice(0, 15).map((job: any, idx: number) => {
                  const k = keyFor(job, idx);
                  return (
                    <div key={k} className="pb-3 border-b last:border-0 border-slate-100">
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
                  );
                })
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
              {loadingResults ? (
                <div className="py-4">
                  <div className="animate-pulse space-y-2">
                    <div className="h-3 bg-slate-200 rounded w-3/4" />
                  </div>
                </div>
              ) : errorResults ? (
                <p className="text-sm text-red-500">Unable to load results.</p>
              ) : results.length === 0 ? (
                <p className="text-sm text-slate-500">No results available.</p>
              ) : (
                results.slice(0, 15).map((res: any, idx: number) => {
                  const k = keyFor(res, idx);
                  return (
                    <div key={k} className="pb-3 border-b last:border-0 border-slate-100">
                      <Link to={`/result/${res.slug}`} className="block text-sm font-medium text-slate-800 hover:text-blue-700">
                        {res.title}
                      </Link>
                      <div className="text-xs text-slate-500 mt-1">
                        <div>{res.organization}</div>
                        <div className="text-blue-700 font-bold">Declared: {res.date}</div>
                      </div>
                    </div>
                  );
                })
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
              {loadingAdmitCards ? (
                <div className="py-4">
                  <div className="animate-pulse space-y-2">
                    <div className="h-3 bg-slate-200 rounded w-3/4" />
                  </div>
                </div>
              ) : errorAdmitCards ? (
                <p className="text-sm text-red-500">Unable to load admit cards.</p>
              ) : admitCards.length === 0 ? (
                <p className="text-sm text-slate-500">No admit cards available.</p>
              ) : (
                admitCards.slice(0, 15).map((card: any, idx: number) => {
                  const k = keyFor(card, idx);
                  return (
                    <div key={k} className="pb-3 border-b last:border-0 border-slate-100">
                      <Link to={`/admit-card/${card.slug}`} className="block text-sm font-medium text-slate-800 hover:text-blue-700">
                        {card.title}
                      </Link>
                      <div className="text-xs text-slate-500 mt-1">
                        <div>{card.organization}</div>
                        <div className="text-blue-700 font-bold">Released: {card.date}</div>
                      </div>
                    </div>
                  );
                })
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
                  {loadingAdmission ? (
                    <p className="text-sm text-slate-500">Loading admissions...</p>
                  ) : errorAdmission ? (
                    <p className="text-sm text-red-500">{String(errorAdmission)}</p>
                  ) : admissions.length === 0 ? (
                    <p className="text-sm text-slate-500">No recent admissions.</p>
                  ) : (
                    admissions.slice(0, 15).map((a: any, idx: number) => {
                      const k = keyFor(a, idx);
                      return (
                        <div key={k} className="pb-3 border-b last:border-0 border-slate-100">
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
                      );
                    })
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
                  {loadingAnswerKeys ? (
                    <p className="text-sm text-slate-500">Loading answer keys...</p>
                  ) : errorAnswerKeys ? (
                    <p className="text-sm text-red-500">{String(errorAnswerKeys)}</p>
                  ) : answerKeys.length === 0 ? (
                    <p className="text-sm text-slate-500">No answer keys available.</p>
                  ) : (
                    answerKeys.slice(0, 15).map((ak: any, idx: number) => {
                      const k = keyFor(ak, idx);
                      return (
                        <div key={k} className="pb-3 border-b last:border-0 border-slate-100">
                          <Link to={`/answer-key/${ak.slug}`} className="block text-sm font-medium text-slate-800 hover:text-blue-700">
                            {ak.title}
                          </Link>
                          <div className="text-xs text-slate-500 mt-1">
                            <div>{ak.organization}</div>
                            <div className="text-blue-700 font-bold">Released: {ak.date}</div>
                          </div>
                        </div>
                      );
                    })
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Syllabus & Documents */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Syllabus Card - Now with real data */}
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
                  {loadingSyllabus ? (
                    <div className="space-y-3">
                      {[...Array(3)].map((_, idx) => (
                        <div key={idx} className="pb-3 border-b last:border-0 border-slate-100">
                          <div className="h-4 bg-slate-200 rounded w-3/4 mb-2 animate-pulse"></div>
                          <div className="h-3 bg-slate-200 rounded w-1/2 animate-pulse"></div>
                        </div>
                      ))}
                    </div>
                  ) : errorSyllabus ? (
                    <p className="text-sm text-red-500 py-2">Unable to load syllabus</p>
                  ) : syllabus.length === 0 ? (
                    <p className="text-sm text-slate-500 py-2">No syllabus available</p>
                  ) : (
                    syllabus.slice(0, 15).map((syl: any, idx: number) => {
                      const k = keyFor(syl, idx);
                      return (
                        <div key={k} className="pb-3 border-b last:border-0 border-slate-100 last:pb-0">
                          <a
                            href={syl.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block text-sm font-medium text-slate-800 hover:text-blue-700 leading-tight mb-1"
                          >
                            {syl.title}
                          </a>
                          <div className="text-xs text-slate-500 space-y-1">
                            {syl.organization && (
                              <div className="font-medium">{syl.organization}</div>
                            )}
                          </div>
                        </div>
                      );
                    }).reverse()
                  )}
                </CardContent>
              </Card>

              {/* Documents Card */}
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

            <div className="block lg:hidden">
              <div className="w-full max-w-sm md:max-w-md"> 
                <Schemes />
              </div>
            </div>

            {/* Documents services & Latest news/blogs */}
            <div className="space-y-5 mt-2">
              <DocumentsServices />
              <LatestNewsBlogs />
            </div>
          </div>

          {/* Right Sidebar */}
          <aside className="space-y-5 md:max-w-md">
            <div className="hidden lg:block">
              <Schemes />
            </div>
            
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

            {/* More Suggestions */}
            {/* <Card className="rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all border border-border/40">
              <h3 className="font-semibold text-lg mb-4">More like this</h3>
              <div className="space-y-4 text-sm">
                <Link className="block hover:text-primary" to={""}>UPSC Books You Must Read</Link>
                <Link to={""} className="block hover:text-primary">How to Prepare Current Affairs</Link>
                <Link to={""} className="block hover:text-primary">SSC vs Banking – Which to Choose?</Link>
              </div>
            </Card> */}



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
