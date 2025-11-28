import { useParams, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, ExternalLink, ArrowLeft, CreditCard, AlertCircle, Building2, Download } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

const AdmitCardDetail = () => {
  const { slug } = useParams();
  const { toast } = useToast();
  const [admitCard, setAdmitCard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [type, setType] = useState(''); // 'job' or 'admission'

  const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const fetchAdmitCard = async () => {
      try {
        setLoading(true);
        
        // Try to fetch as job first
        let response = await fetch(`${API_BASE_URL}/api/jobs/slug/${slug}`);
        
        if (response.ok) {
          const jobData = await response.json();
          setAdmitCard(jobData);
          setType('job');
        } else {
          // If not found as job, try as admission
          response = await fetch(`${API_BASE_URL}/api/admissions/slug/${slug}`);
          if (response.ok) {
            const admissionData = await response.json();
            setAdmitCard(admissionData);
            setType('admission');
          } else {
            throw new Error('Admit card not found');
          }
        }
      } catch (error) {
        console.error("Failed to fetch admit card:", error);
        toast({
          title: "Error",
          description: "Could not load admit card details",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchAdmitCard();
    }
  }, [slug, API_BASE_URL, toast]);

  // Format date for display
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

  // Generate download steps based on type
  const getDownloadSteps = () => {
    const commonSteps = [
      "Visit the official website mentioned above",
      "Click on 'Admit Card' or 'Download Hall Ticket' section",
      "Enter your Registration Number/Roll Number and Date of Birth",
      "Download and take a printout of your Admit Card",
    ];

    if (type === 'job') {
      return [
        ...commonSteps,
        "Verify all details mentioned on the admit card",
        "Carry the admit card to the examination center",
      ];
    } else {
      return [
        ...commonSteps,
        "Check the exam center details and reporting time",
        "Follow all instructions mentioned on the admit card",
      ];
    }
  };

  // Generate important instructions
  const getImportantInstructions = () => {
    return [
      "Carry original photo ID proof (Aadhaar, PAN, Driving License, etc.) along with admit card",
      "Reach exam center at least 1 hour before reporting time",
      "Mobile phones, smart watches, and electronic devices are strictly prohibited",
      "Carry admit card printout (black & white or color - both accepted)",
      "Follow all COVID-19 guidelines as per exam instructions",
      "Do not carry any study material or notes to the exam center",
    ];
  };

  // Generate quick links based on available data
  const getQuickLinks = () => {
    const links = [];
    
    if (admitCard?.links?.admitCard) {
      links.push({
        label: "Download Admit Card",
        url: admitCard.links.admitCard
      });
    }
    
    if (admitCard?.links?.officialWebsite) {
      links.push({
        label: "Official Website",
        url: admitCard.links.officialWebsite
      });
    }
    
    if (admitCard?.links?.notificationPDF) {
      links.push({
        label: "Official Notification",
        url: admitCard.links.notificationPDF
      });
    }

    // Add default links if no specific links available
    if (links.length === 0) {
      links.push(
        { label: "Download Admit Card", url: "#" },
        { label: "Official Website", url: "#" },
        { label: "Exam Instructions", url: "#" }
      );
    }

    return links;
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

  if (!admitCard) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl font-bold mb-4">Admit Card Not Found</h1>
          <p className="text-muted-foreground mb-6">The admit card you're looking for doesn't exist or has been removed.</p>
          <Link to="/admit-card">
            <Button>Back to Admit Cards</Button>
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  const downloadLink = admitCard.links?.admitCard;
  const isAvailable = admitCard.status?.isAdmitCardAvailable;
  const examDate = admitCard.importantDates?.examDate;
  const admitCardDate = admitCard.importantDates?.admitCardDate;

  const quickLinks = getQuickLinks();
  const downloadSteps = getDownloadSteps();
  const importantInstructions = getImportantInstructions();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="bg-gradient-to-br from-primary via-primary/90 to-accent text-primary-foreground py-6 md:py-8">
          <div className="container mx-auto px-4 max-w-5xl">
            <Link to="/admit-card" className="inline-flex items-center gap-2 text-primary-foreground/90 hover:text-primary-foreground mb-4 transition-colors">
              <ArrowLeft className="h-4 w-4" />
              Back to Admit Cards
            </Link>
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <Badge className={isAvailable ? "bg-green-500 text-white border-0" : "bg-yellow-500 text-white border-0"}>
                    {isAvailable ? "Available" : "Coming Soon"}
                  </Badge>
                  <Badge variant="outline" className="text-primary-foreground/80">
                    {type === 'job' ? 'Job' : 'Admission'}
                  </Badge>
                </div>
                <h1 className="text-2xl md:text-3xl font-bold mb-2">{admitCard.title}</h1>
                <div className="flex items-center gap-2 text-primary-foreground/90">
                  <Building2 className="h-4 w-4" />
                  <span className="text-lg">{admitCard.organization}</span>
                </div>
              </div>
              {isAvailable && downloadLink ? (
                <Button size="lg" className="bg-white text-primary hover:bg-white/90 font-semibold shadow-lg" asChild>
                  <a href={downloadLink} target="_blank" rel="noopener noreferrer">
                    <Download className="h-4 w-4 mr-2" />
                    Download Now
                    <ExternalLink className="h-4 w-4 ml-2" />
                  </a>
                </Button>
              ) : (
                <Button size="lg" variant="secondary" disabled>
                  <Download className="h-4 w-4 mr-2" />
                  Coming Soon
                </Button>
              )}
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-6 md:py-8 max-w-5xl">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-6">
              {examDate && (
                <Alert className={isAvailable ? "border-green-500 bg-green-50" : "border-yellow-500 bg-yellow-50"}>
                  <AlertCircle className={isAvailable ? "h-4 w-4 text-green-600" : "h-4 w-4 text-yellow-600"} />
                  <AlertDescription className={isAvailable ? "text-green-700 font-semibold" : "text-yellow-700 font-semibold"}>
                    {isAvailable ? "✅" : "⏰"} Exam Date: {examDate}
                  </AlertDescription>
                </Alert>
              )}

              <Card>
                <CardHeader className="bg-accent/5">
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5 text-primary" />
                    How to Download Admit Card
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-3">
                    {downloadSteps.map((step, index) => (
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

              <Card>
                <CardHeader className="bg-accent/5">
                  <CardTitle className="flex items-center gap-2">
                    <AlertCircle className="h-5 w-5 text-primary" />
                    Important Instructions
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <ul className="space-y-3">
                    {importantInstructions.map((instruction, index) => (
                      <li key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                        <span className="text-primary font-bold">•</span>
                        <span className="text-foreground">{instruction}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

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
                      <span className="font-medium text-foreground">Admit Card Release</span>
                      <Badge variant="outline">{formatDate(admitCardDate)}</Badge>
                    </div>
                    <div className="flex justify-between items-center py-3 px-4 rounded-lg bg-muted/50">
                      <span className="font-medium text-foreground">Exam Date</span>
                      <Badge variant="outline">{examDate || 'Not specified'}</Badge>
                    </div>
                    {admitCard.importantDates?.applicationEnd && (
                      <div className="flex justify-between items-center py-3 px-4 rounded-lg bg-muted/50">
                        <span className="font-medium text-foreground">Application End Date</span>
                        <Badge variant="outline">{formatDate(admitCard.importantDates.applicationEnd)}</Badge>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card className="top-4 border-primary/20">
                <CardHeader className="bg-primary/5">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <ExternalLink className="h-5 w-5 text-primary" />
                    Quick Links
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6 space-y-3">
                  {quickLinks.map((link, index) => (
                    <Button 
                      key={index} 
                      variant={index === 0 && isAvailable ? "default" : "outline"} 
                      className="w-full justify-between font-semibold" 
                      size="lg" 
                      asChild
                      disabled={index === 0 && !isAvailable}
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
                <CardHeader className="bg-accent/5">
                  <CardTitle className="text-lg">Exam Summary</CardTitle>
                </CardHeader>
                <CardContent className="pt-6 space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Type:</span>
                    <span className="font-medium">{type === 'job' ? 'Government Job' : 'Admission'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Organization:</span>
                    <span className="font-medium text-right">{admitCard.organization}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Status:</span>
                    <Badge variant={isAvailable ? "default" : "secondary"}>
                      {isAvailable ? "Available" : "Coming Soon"}
                    </Badge>
                  </div>
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

export default AdmitCardDetail;