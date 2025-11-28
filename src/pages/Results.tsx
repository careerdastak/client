import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

const Results = () => {
  const { toast } = useToast();
  const [allResults, setAllResults] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const fetchResults = async () => {
      try {
        setLoading(true);
        
        // Fetch all jobs and admissions first
        const jobsResponse = await fetch(`${API_BASE_URL}/api/jobs`);
        if (!jobsResponse.ok) throw new Error('Failed to fetch jobs');
        const jobsData = await jobsResponse.json();
        
        const admissionsResponse = await fetch(`${API_BASE_URL}/api/admissions`);
        if (!admissionsResponse.ok) throw new Error('Failed to fetch admissions');
        const admissionsData = await admissionsResponse.json();

        // Transform and combine all data
        const transformedResults = [
          ...jobsData.map(job => ({
            id: job._id,
            slug: job.slug,
            title: job.title,
            organization: job.organization,
            date: formatDate(job.importantDates?.resultDate),
            examDate: job.importantDates?.examDate || 'Not specified',
            status: job.status?.isResultDeclared ? "Latest" : "Expected Soon",
            type: 'job',
            postDate: job.postDate,
            totalCandidates: job.extraInfo?.totalCandidates,
            qualified: job.extraInfo?.qualified,
            cutoffMarks: job.extraInfo?.cutoffMarks || [],
            // Include status for filtering
            isPublished: job.status?.isPublished === true,
            isResultDeclared: job.status?.isResultDeclared === true
          })),
          ...admissionsData.map(admission => ({
            id: admission._id,
            slug: admission.slug,
            title: admission.title,
            organization: admission.organization,
            date: formatDate(admission.importantDates?.resultDate),
            examDate: admission.importantDates?.examDate || 'Not specified',
            status: admission.status?.isResultDeclared ? "Latest" : "Expected Soon",
            type: 'admission',
            postDate: admission.postDate,
            totalCandidates: admission.extraInfo?.totalCandidates,
            qualified: admission.extraInfo?.qualified,
            cutoffMarks: admission.extraInfo?.cutoffMarks || [],
            // Include status for filtering
            isPublished: admission.status?.isPublished === true,
            isResultDeclared: admission.status?.isResultDeclared === true
          }))
        ];

        // Sort by post date (newest first)
        transformedResults.sort((a, b) => new Date(b.postDate).getTime() - new Date(a.postDate).getTime());
        
        setAllResults(transformedResults);
      } catch (error) {
        console.error("Failed to fetch results:", error);
        toast({
          title: "Error",
          description: "Could not load results from server",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [API_BASE_URL, toast]);

  // Filter results based on status
  useEffect(() => {
    if (allResults.length > 0) {
      const filtered = allResults.filter(result => 
        result.isPublished === true && 
        result.isResultDeclared === true
      );
      setFilteredResults(filtered);
    }
  }, [allResults]);

  // Helper function to format dates
  const formatDate = (dateString) => {
    if (!dateString) return "Not announced";
    
    // If it's already a formatted string, return as is
    if (typeof dateString === 'string' && dateString.includes(' ')) {
      return dateString;
    }
    
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        return "Invalid date";
      }
      return date.toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      });
    } catch (error) {
      return "Invalid date";
    }
  };

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
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Latest Results</h1>
            <p className="text-primary-foreground/90">
              Check the latest exam results and cutoff marks
              {filteredResults.length > 0 && ` (${filteredResults.length} declared)`}
            </p>
            
            {/* Status Summary */}
            <div className="mt-4 flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span>Showing {filteredResults.length} declared results</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-gray-400"></div>
                <span>{allResults.length - filteredResults.length} not declared</span>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-6 md:py-8">
          {filteredResults.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold text-muted-foreground mb-2">
                {allResults.length > 0 ? "No Results Declared" : "No Results Found"}
              </h3>
              <p className="text-muted-foreground">
                {allResults.length > 0 
                  ? "There are no results currently declared. Check back later for updates."
                  : "No result data available right now."
                }
              </p>
            </div>
          ) : (
            <div className="max-w-5xl mx-auto space-y-4">
              {filteredResults.map((result, index) => (
                <Card key={result.id} className="shadow-card hover:shadow-lg transition-shadow">
                  <CardContent className="p-4 md:p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                      <div className="flex-1">
                        <div className="flex items-start gap-2 mb-2">
                          <h3 className="font-semibold text-foreground text-base md:text-lg flex-1">
                            {result.title}
                          </h3>
                          <div className="flex gap-2 shrink-0">
                            <Badge 
                              variant="default"
                              className="bg-green-500"
                            >
                              Declared
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {result.type === 'job' ? 'Job' : 'Admission'}
                            </Badge>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">{result.organization}</p>
                        <div className="flex flex-col sm:flex-row sm:gap-4 mt-1 text-xs text-muted-foreground">
                          <span>Declared: {result.date}</span>
                          <span>Exam Date: {result.examDate}</span>
                        </div>
                        
                        {/* Additional Result Info */}
                        {(result.totalCandidates || result.qualified) && (
                          <div className="mt-2 flex gap-4 text-xs">
                            {result.totalCandidates && (
                              <span className="text-muted-foreground">
                                Candidates: {result.totalCandidates}
                              </span>
                            )}
                            {result.qualified && (
                              <span className="text-muted-foreground">
                                Qualified: {result.qualified}
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                      <Link to={`/result/${result.slug}`}>
                        <Button className="w-full md:w-auto">
                          Check Result
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Results;