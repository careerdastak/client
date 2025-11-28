import { useParams, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, ExternalLink, ArrowLeft, Trophy, FileText } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

const ResultDetail = () => {
  const { slug } = useParams();
  const { toast } = useToast();
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);

  const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const fetchResult = async () => {
      if (!slug) return;

      try {
        setLoading(true);
        
        // Try to fetch from jobs first
        let resultData = null;
        try {
          const response = await fetch(`${API_BASE_URL}/api/jobs/slug/${slug}`);
          if (response.ok) {
            resultData = await response.json();
            resultData.type = 'job';
          }
        } catch (error) {
          // Continue to try admissions
        }

        // If not found in jobs, try admissions
        if (!resultData) {
          try {
            const response = await fetch(`${API_BASE_URL}/api/admissions/slug/${slug}`);
            if (response.ok) {
              resultData = await response.json();
              resultData.type = 'admission';
            }
          } catch (error) {
            // Handle error below
          }
        }

        if (resultData) {
          setResult(resultData);
        } else {
          toast({
            title: "Error",
            description: "Result not found",
            variant: "destructive",
          });
        }
      } catch (error) {
        console.error("Failed to fetch result:", error);
        toast({
          title: "Error",
          description: "Could not load result details",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchResult();
  }, [slug, API_BASE_URL, toast]);

  // Helper function to format dates
  const formatDate = (dateString) => {
    if (!dateString) return "Not announced";
    
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

  if (!result) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl font-bold mb-4">Result Not Found</h1>
          <Link to="/results">
            <Button>Back to Results</Button>
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  // Prepare links based on result data
  const resultLinks = [
    { label: "Check Result", url: result.links?.result || "#" },
    { label: "Download Score Card", url: result.links?.scoreCard || "#" },
    { label: "View Cut Off", url: result.links?.cutoff || "#" },
  ].filter(link => link.url !== "#");

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="bg-gradient-to-br from-primary via-primary/90 to-accent text-primary-foreground py-6 md:py-8">
          <div className="container mx-auto px-4 max-w-5xl">
            <Link to="/results" className="inline-flex items-center gap-2 text-primary-foreground/90 hover:text-primary-foreground mb-4 transition-colors">
              <ArrowLeft className="h-4 w-4" />
              Back to Results
            </Link>
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
              <div className="flex-1">
                <Badge className="mb-2 bg-success text-white border-0">Latest</Badge>
                <h1 className="text-2xl md:text-3xl font-bold mb-2">{result.title}</h1>
                <p className="text-primary-foreground/90 text-lg">{result.organization}</p>
              </div>
              {resultLinks.length > 0 && (
                <Button size="lg" className="bg-white text-primary hover:bg-white/90 font-semibold shadow-lg" asChild>
                  <a href={resultLinks[0].url} target="_blank" rel="noopener noreferrer">
                    Check Result
                    <ExternalLink className="h-4 w-4 ml-2" />
                  </a>
                </Button>
              )}
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-6 md:py-8 max-w-5xl">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-6">
              <Card>
                <CardHeader className="bg-accent/5">
                  <CardTitle className="flex items-center gap-2">
                    <Trophy className="h-5 w-5 text-primary" />
                    Result Statistics
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <Alert className="mb-4 border-success bg-success/10">
                    <AlertDescription className="text-success font-semibold">
                      ✅ Result Declared on {formatDate(result.importantDates?.resultDate)}
                    </AlertDescription>
                  </Alert>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-lg bg-muted/50">
                      <p className="text-sm text-muted-foreground mb-1">Total Appeared</p>
                      <p className="text-2xl font-bold text-foreground">
                        {result.extraInfo?.totalCandidates || "Not specified"}
                      </p>
                    </div>
                    <div className="p-4 rounded-lg bg-muted/50">
                      <p className="text-sm text-muted-foreground mb-1">Qualified</p>
                      <p className="text-2xl font-bold text-foreground">
                        {result.extraInfo?.qualified || "Not specified"}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {result.extraInfo?.cutoffMarks && result.extraInfo.cutoffMarks.length > 0 && (
                <Card>
                  <CardHeader className="bg-accent/5">
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5 text-primary" />
                      Category-wise Cut Off Marks
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="space-y-2">
                      {result.extraInfo.cutoffMarks.map((item, index) => (
                        <div key={index} className="flex justify-between items-center py-3 px-4 rounded-lg bg-muted/50">
                          <span className="font-medium text-foreground">{item.category}</span>
                          <Badge variant="default" className="font-semibold">
                            {item.expected || item.marks} Marks
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              <Card>
                <CardHeader className="bg-accent/5">
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-primary" />
                    Important Dates
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center py-3 px-4 rounded-lg bg-muted/50">
                      <span className="font-medium text-foreground">Exam Held</span>
                      <Badge variant="outline">
                        {result.importantDates?.examDate || "Not specified"}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center py-3 px-4 rounded-lg bg-muted/50">
                      <span className="font-medium text-foreground">Result Declared</span>
                      <Badge variant="outline">
                        {formatDate(result.importantDates?.resultDate)}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card className=" top-4 border-primary/20">
                <CardHeader className="bg-primary/5">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <ExternalLink className="h-5 w-5 text-primary" />
                    Quick Links
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6 space-y-3">
                  {resultLinks.map((link, index) => (
                    <Button 
                      key={index} 
                      variant={index === 0 ? "default" : "outline"} 
                      className="w-full justify-between font-semibold" 
                      size="lg" 
                      asChild
                    >
                      <a href={link.url} target="_blank" rel="noopener noreferrer">
                        {link.label}
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </Button>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="bg-primary/5">
                  <CardTitle className="text-lg">Result Type</CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <Badge variant="outline" className="text-sm">
                    {result.type === 'job' ? 'Job Result' : 'Admission Result'}
                  </Badge>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ResultDetail;