import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

const AnswerKey = () => {
  const { toast } = useToast();
  const [allAnswerKeys, setAllAnswerKeys] = useState([]);
  const [filteredAnswerKeys, setFilteredAnswerKeys] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const fetchAnswerKeys = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Fetch all jobs and admissions first
        const jobsResponse = await fetch(`${API_BASE_URL}/api/jobs`);
        if (!jobsResponse.ok) throw new Error('Failed to fetch jobs');
        const jobsData = await jobsResponse.json();
        
        const admissionsResponse = await fetch(`${API_BASE_URL}/api/admissions`);
        if (!admissionsResponse.ok) throw new Error('Failed to fetch admissions');
        const admissionsData = await admissionsResponse.json();

        // Transform and combine all data
        const transformedAnswerKeys = [
          ...jobsData.map(job => ({
            id: job._id,
            slug: job.slug,
            title: job.title,
            organization: job.organization,
            date: formatDate(job.importantDates?.answerKeyDate),
            examDate: job.importantDates?.examDate || 'Not specified',
            status: job.status?.isAnswerKeyReleased ? "Latest" : "Expected Soon",
            type: 'job',
            postDate: job.postDate,
            // Include status for filtering
            isPublished: job.status?.isPublished === true,
            isAnswerKeyReleased: job.status?.isAnswerKeyReleased === true
          })),
          ...admissionsData.map(admission => ({
            id: admission._id,
            slug: admission.slug,
            title: admission.title,
            organization: admission.organization,
            date: formatDate(admission.importantDates?.answerKeyDate),
            examDate: admission.importantDates?.examDate || 'Not specified',
            status: admission.status?.isAnswerKeyReleased ? "Latest" : "Expected Soon",
            type: 'admission',
            postDate: admission.postDate,
            // Include status for filtering
            isPublished: admission.status?.isPublished === true,
            isAnswerKeyReleased: admission.status?.isAnswerKeyReleased === true
          }))
        ];

        // Sort by post date (newest first)
        transformedAnswerKeys.sort((a, b) => new Date(b.postDate).getTime() - new Date(a.postDate).getTime());
        
        setAllAnswerKeys(transformedAnswerKeys);
      } catch (error) {
        console.error("Failed to fetch answer keys:", error);
        setError(error.message);
        toast({
          title: "Error",
          description: "Could not load answer keys from server",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchAnswerKeys();
  }, [API_BASE_URL, toast]);

  // Filter answer keys based on status
  useEffect(() => {
    if (allAnswerKeys.length > 0) {
      const filtered = allAnswerKeys.filter(key => 
        key.isPublished === true && 
        key.isAnswerKeyReleased === true
      );
      setFilteredAnswerKeys(filtered);
    }
  }, [allAnswerKeys]);

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

  if (error) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl font-bold mb-4 text-destructive">Failed to Load Answer Keys</h1>
          <p className="text-muted-foreground mb-4">{error}</p>
          <Button onClick={() => window.location.reload()}>Try Again</Button>
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
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Answer Keys</h1>
            <p className="text-primary-foreground/90">
              Check answer keys and calculate your expected scores
              {filteredAnswerKeys.length > 0 && ` (${filteredAnswerKeys.length} available)`}
            </p>
            
            {/* Status Summary */}
            <div className="mt-4 flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span>Showing {filteredAnswerKeys.length} released answer keys</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-gray-400"></div>
                <span>{allAnswerKeys.length - filteredAnswerKeys.length} not released</span>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-6 md:py-8">
          {filteredAnswerKeys.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold text-muted-foreground mb-2">
                {allAnswerKeys.length > 0 ? "No Answer Keys Released" : "No Answer Keys Found"}
              </h3>
              <p className="text-muted-foreground">
                {allAnswerKeys.length > 0 
                  ? "There are no answer keys currently released. Check back later for updates."
                  : "No answer key data available right now."
                }
              </p>
            </div>
          ) : (
            <div className="max-w-5xl mx-auto space-y-4">
              {filteredAnswerKeys.map((key, index) => (
                <Card key={key.id} className="shadow-card hover:shadow-lg transition-shadow">
                  <CardContent className="p-4 md:p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                      <div className="flex-1">
                        <div className="flex items-start gap-2 mb-2">
                          <h3 className="font-semibold text-foreground text-base md:text-lg flex-1">
                            {key.title}
                          </h3>
                          <div className="flex gap-2 shrink-0">
                            <Badge 
                              variant="default"
                              className="bg-green-500"
                            >
                              Released
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {key.type === 'job' ? 'Job' : 'Admission'}
                            </Badge>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">{key.organization}</p>
                        <div className="flex flex-col sm:flex-row sm:gap-4 mt-1 text-xs text-muted-foreground">
                          <span>Released: {key.date}</span>
                          <span>Exam Held: {key.examDate}</span>
                        </div>
                      </div>
                      <Link to={`/answer-key/${key.slug}`}>
                        <Button className="w-full md:w-auto">
                          View Answer Key
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

export default AnswerKey;