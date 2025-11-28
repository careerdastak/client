import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import JobCard from "@/components/JobCard";
import { Button } from "@/components/ui/button";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000";

const LatestJobs = () => {
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "");
  const [allJobs, setAllJobs] = useState<any[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const q = searchParams.get("search");
    if (q) setSearchQuery(q);
  }, [searchParams]);

  useEffect(() => {
    let mounted = true;
    const fetchJobs = async () => {
      setLoading(true);
      setError("");
      try {
        const url = new URL(`${API_BASE}/api/jobs`);
        if (searchQuery) url.searchParams.set("search", searchQuery);

        const res = await fetch(url.toString());
        if (!res.ok) throw new Error(`Failed to load jobs (${res.status})`);
        const data = await res.json();
        if (!mounted) return;
        setAllJobs(Array.isArray(data) ? data : []);
      } catch (err: any) {
        setError(err?.message || "Unable to load jobs");
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchJobs();
    return () => { mounted = false; };
  }, [searchQuery]);

  // Filter jobs based on status
  useEffect(() => {
    if (allJobs.length > 0) {
      const filtered = allJobs.filter(job => 
        job.status?.isPublished === true && 
        job.status?.isApplicationOpen === true
      );
      setFilteredJobs(filtered);
    } else {
      setFilteredJobs([]);
    }
  }, [allJobs]);

  const mappedJobs = filteredJobs.map((j) => {
    const lastDate = j?.importantDates?.applicationEnd || j?.importantDates?.applicationEnd || null;
    const postDate = j?.postDate || j?.createdAt;
    const posts = j.totalPosts ?? (Array.isArray(j.postDetails) ? j.postDetails.reduce((s:any,p:any)=> s + (p.numberOfPosts||0), 0) : j.totalPosts);
    const qualification = j?.eligibilityCriteria?.education || (j.eligibilityDetails && j.eligibilityDetails[0]?.qualification) || "—";
    const location = j?.location || "All India";

    const isNew = (() => {
      const pd = postDate ? new Date(postDate) : null;
      if (!pd || isNaN(pd.getTime())) return false;
      const diff = Date.now() - pd.getTime();
      return diff <= 1000 * 60 * 60 * 24 * 7;
    })();

    return {
      id: j._id,
      title: j.title,
      slug: j.slug,
      organization: j.organization,
      posts,
      qualification,
      location,
      lastDate,
      isNew,
      status: j.status // Pass the entire status object
    };
  });

   if (loading) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1">
        <div className="bg-gradient-to-br from-primary via-primary/90 to-accent text-primary-foreground py-8 md:py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Latest Government Jobs</h1>
            <p className="text-primary-foreground/90">
              {searchQuery ? `Search results for "${searchQuery}"` : "Find the newest career opportunities across India"}
            </p>
            
            {/* Status Summary */}
            {!loading && (
              <div className="mt-4 flex flex-wrap items-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span>Showing {filteredJobs.length} active jobs</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-gray-400"></div>
                  <span>{allJobs.length - filteredJobs.length} closed/archived</span>
                </div>
                {searchQuery && (
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                    <span>Searched: "{searchQuery}"</span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="container mx-auto px-4 py-6 md:py-8">
          <div className="flex items-center justify-between mb-6">
            <p className="text-muted-foreground">
              {loading ? "Loading..." : `${mappedJobs.length} active job${mappedJobs.length !== 1 ? "s" : ""} found`}
            </p>
            <Button variant="outline" size="sm">Filter</Button>
          </div>

          {error ? (
            <div className="text-center py-12 text-destructive">{error}</div>
          ) : loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
              Loading jobs...
            </div>
          ) : mappedJobs.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 max-w-5xl">
              {mappedJobs.map((job, index) => (
                <JobCard key={job.id || index} {...job} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg mb-2">
                {allJobs.length > 0 ? "No active jobs found" : "No jobs found"}
              </p>
              <p className="text-sm text-muted-foreground">
                {allJobs.length > 0 
                  ? "There are no currently open job applications matching your criteria."
                  : searchQuery 
                    ? "Try different keywords or browse all jobs"
                    : "Check back later for new job opportunities"
                }
              </p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default LatestJobs;