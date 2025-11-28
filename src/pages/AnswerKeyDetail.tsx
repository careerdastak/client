import { useParams, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, ExternalLink, ArrowLeft, Key, FileText } from "lucide-react";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

const AnswerKeyDetail = () => {
  const { slug } = useParams();
  const { toast } = useToast();
  const [answerKey, setAnswerKey] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const fetchAnswerKeyDetail = async () => {
      if (!slug) {
        setError("Invalid answer key Slug");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        // Try to fetch from jobs first
        let response = await fetch(`${API_BASE_URL}/api/jobs/slug/${slug}`);
        let data;
        let type = 'job';

        if (response.ok) {
          data = await response.json();
        } else {
          // If not found in jobs, try admissions
          response = await fetch(`${API_BASE_URL}/api/admissions/slug/${slug}`);
          if (response.ok) {
            data = await response.json();
            type = 'admission';
          } else {
            throw new Error('Answer key not found');
          }
        }

        // Transform the data to match component structure
        const transformedData = transformAnswerKeyData(data, type);
        setAnswerKey(transformedData);

      } catch (error) {
        console.error("Failed to fetch answer key details:", error);
        setError(error instanceof Error ? error.message : "Failed to load answer key");
        toast({
          title: "Error",
          description: "Could not load answer key details",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchAnswerKeyDetail();
  }, [slug, API_BASE_URL, toast]);

  const transformAnswerKeyData = (data: any, type: string) => {
    const importantDates = data.importantDates || {};
    const links = data.links || {};
    const status = data.status || {};
    const extraInfo = data.extraInfo || {};

    // Format dates
    const formatDate = (dateString: string) => {
      if (!dateString) return "Not announced";
      try {
        const date = new Date(dateString);
        if (isNaN(date.getTime())) return dateString; // Return as is if invalid
        return date.toLocaleDateString('en-IN', {
          day: 'numeric',
          month: 'short',
          year: 'numeric'
        });
      } catch {
        return dateString;
      }
    };

    // Generate instructions based on type
    const generateInstructions = () => {
      const baseInstructions = [
        "Visit the official website mentioned above",
        "Navigate to the Answer Key section",
        "Find your exam/recruitment notification",
        "Download the answer key PDF",
      ];

      if (status.isAnswerKeyReleased && importantDates.answerKeyDate) {
        baseInstructions.push("Review the answers carefully");
        baseInstructions.push("Calculate your expected score");
        
        // Check if objection window might be open
        const answerKeyDate = new Date(importantDates.answerKeyDate);
        const today = new Date();
        const daysDiff = Math.floor((today.getTime() - answerKeyDate.getTime()) / (1000 * 60 * 60 * 24));
        
        if (daysDiff <= 7) { // Assuming objection window is ~7 days
          baseInstructions.push("Raise objections if any within the deadline");
        }
      }

      return baseInstructions;
    };

    // Generate links array
    const generateLinks = () => {
      const linksArray = [];
      
      if (links.answerKey) {
        linksArray.push({ label: "View Answer Key", url: links.answerKey });
      }
      if (links.officialWebsite) {
        linksArray.push({ label: "Official Website", url: links.officialWebsite });
      }
      if (links.notificationPDF) {
        linksArray.push({ label: "Download Notification", url: links.notificationPDF });
      }
      if (links.correctionLink && status.isCorrectionWindowOpen) {
        linksArray.push({ label: "Raise Objections", url: links.correctionLink });
      }

      // If no answer key link but other links exist, use the first available link
      if (linksArray.length === 0 && links.applyOnline) {
        linksArray.push({ label: "Apply Online", url: links.applyOnline });
      }

      return linksArray;
    };

    return {
      id: data._id || data.id,
      title: data.title,
      organization: data.organization,
      date: formatDate(importantDates.answerKeyDate),
      examDate: importantDates.examDate || 'Not specified',
      status: status.isAnswerKeyReleased ? "Latest" : "Expected Soon",
      type: type,
      objectionDeadline: importantDates.correctionWindow?.end 
        ? formatDate(importantDates.correctionWindow.end)
        : "Not specified",
      objectionFee: extraInfo.objectionFee || "₹100 per question",
      instructions: generateInstructions(),
      links: generateLinks(),
      importantDates: importantDates,
      extraInfo: extraInfo,
      selectionProcess: data.selectionProcess || data.process?.selectionSteps || [],
      applicationFee: data.applicationFee,
      totalPosts: data.totalPosts,
      totalSeats: data.totalSeats,
      eligibilityCriteria: data.eligibilityCriteria,
    };
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

  if (error || !answerKey) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl font-bold mb-4 text-destructive">Answer Key Not Found</h1>
          <p className="text-muted-foreground mb-4">{error || "The requested answer key could not be found."}</p>
          <Link to="/answer-key">
            <Button>Back to Answer Keys</Button>
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
        <div className="bg-gradient-to-br from-primary via-primary/90 to-accent text-primary-foreground py-6 md:py-8">
          <div className="container mx-auto px-4 max-w-5xl">
            <Link to="/answer-key" className="inline-flex items-center gap-2 text-primary-foreground/90 hover:text-primary-foreground mb-4 transition-colors">
              <ArrowLeft className="h-4 w-4" />
              Back to Answer Keys
            </Link>
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
              <div className="flex-1">
                {answerKey.status && (
                  <Badge className={`mb-2 ${answerKey.status === "Latest" ? "bg-green-500" : "bg-yellow-500"} text-white border-0`}>
                    {answerKey.status}
                  </Badge>
                )}
                <Badge variant="outline" className="mb-2 ml-2 text-primary-foreground/80">
                  {answerKey.type === 'job' ? 'Job' : 'Admission'}
                </Badge>
                <h1 className="text-2xl md:text-3xl font-bold mb-2">{answerKey.title}</h1>
                <p className="text-primary-foreground/90 text-lg">{answerKey.organization}</p>
              </div>
              {answerKey.links.length > 0 && (
                <Button size="lg" className="bg-white text-primary hover:bg-white/90 font-semibold shadow-lg" asChild>
                  <a href={answerKey.links[0].url} target="_blank" rel="noopener noreferrer">
                    {answerKey.links[0].label}
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
                    <Key className="h-5 w-5 text-primary" />
                    How to Access Answer Key
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-3">
                    {answerKey.instructions.map((step: string, index: number) => (
                      <div key={index} className="flex items-start gap-3 p-4 rounded-lg bg-muted/50">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-foreground">{step}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {answerKey.importantDates.correctionWindow && (
                <Card className="border-destructive/20">
                  <CardHeader className="bg-destructive/5">
                    <CardTitle className="flex items-center gap-2 text-destructive">
                      <FileText className="h-5 w-5" />
                      Objection Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div className="p-4 rounded-lg bg-muted/50">
                        <p className="font-semibold text-foreground mb-1">Objection Deadline</p>
                        <p className="text-destructive font-bold">{answerKey.objectionDeadline}</p>
                      </div>
                      <div className="p-4 rounded-lg bg-muted/50">
                        <p className="font-semibold text-foreground mb-1">Objection Fee</p>
                        <p className="text-foreground">{answerKey.objectionFee}</p>
                      </div>
                      <div className="p-4 rounded-lg bg-muted/50">
                        <p className="font-semibold text-foreground mb-1">Important Note</p>
                        <p className="text-sm text-muted-foreground">
                          Fee will be refunded if your objection is found correct. Make sure to attach supporting documents/references.
                        </p>
                      </div>
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
                      <Badge variant="outline">{answerKey.examDate}</Badge>
                    </div>
                    <div className="flex justify-between items-center py-3 px-4 rounded-lg bg-muted/50">
                      <span className="font-medium text-foreground">Answer Key Released</span>
                      <Badge variant="outline">{answerKey.date}</Badge>
                    </div>
                    {answerKey.importantDates.correctionWindow && (
                      <div className="flex justify-between items-center py-3 px-4 rounded-lg bg-muted/50">
                        <span className="font-medium text-foreground">Objection Deadline</span>
                        <Badge variant="outline">{answerKey.objectionDeadline}</Badge>
                      </div>
                    )}
                    {answerKey.importantDates.resultDate && (
                      <div className="flex justify-between items-center py-3 px-4 rounded-lg bg-muted/50">
                        <span className="font-medium text-foreground">Expected Result</span>
                        <Badge variant="outline">
                          {new Date(answerKey.importantDates.resultDate).toLocaleDateString('en-IN', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric'
                          })}
                        </Badge>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Additional Information */}
              {(answerKey.totalPosts || answerKey.totalSeats || answerKey.selectionProcess.length > 0) && (
                <Card>
                  <CardHeader className="bg-accent/5">
                    <CardTitle>Additional Information</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      {answerKey.totalPosts && (
                        <div className="flex justify-between items-center py-2">
                          <span className="font-medium text-foreground">Total Posts</span>
                          <span className="text-muted-foreground">{answerKey.totalPosts}</span>
                        </div>
                      )}
                      {answerKey.totalSeats && (
                        <div className="flex justify-between items-center py-2">
                          <span className="font-medium text-foreground">Total Seats</span>
                          <span className="text-muted-foreground">{answerKey.totalSeats}</span>
                        </div>
                      )}
                      {answerKey.selectionProcess.length > 0 && (
                        <div>
                          <p className="font-medium text-foreground mb-2">Selection Process</p>
                          <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                            {answerKey.selectionProcess.map((step: string, index: number) => (
                              <li key={index}>{step}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}
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
                  {answerKey.links.map((link: any, index: number) => (
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

              {/* Status Card */}
              <Card>
                <CardHeader className="bg-accent/5">
                  <CardTitle>Current Status</CardTitle>
                </CardHeader>
                <CardContent className="pt-6 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Answer Key</span>
                    <Badge variant={answerKey.status === "Latest" ? "default" : "secondary"}>
                      {answerKey.status}
                    </Badge>
                  </div>
                  {answerKey.importantDates.correctionWindow && (
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Objection Window</span>
                      <Badge variant={answerKey.status === "Latest" ? "default" : "secondary"}>
                        {new Date() <= new Date(answerKey.importantDates.correctionWindow.end) ? "Open" : "Closed"}
                      </Badge>
                    </div>
                  )}
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

export default AnswerKeyDetail;