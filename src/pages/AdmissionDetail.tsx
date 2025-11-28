import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  ExternalLink,
  ArrowLeft,
  GraduationCap,
  IndianRupee,
  AlertCircle,
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

// ----------- DATE FORMATTER -------------
const formatDateOrSoon = (dateString: string) => {
  if (!dateString) return "Notified Soon";

  // If string contains letters and not a valid date (like "21–30 Jan 2026")
  if (isNaN(Date.parse(dateString))) return "Notified Soon";

  const dateObj = new Date(dateString);

  if (isNaN(dateObj.getTime())) return "Notified Soon";

  return dateObj.toLocaleDateString();
};

const AdmissionDetail = () => {
  const { slug } = useParams();
  const [admission, setAdmission] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ---------- FETCH ADMISSION ----------
  useEffect(() => {
    const fetchAdmission = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/admissions/slug/${slug}`);

        if (!res.ok) {
          setError("Failed to load admission details.");
          setLoading(false);
          return;
        }

        const data = await res.json();
        setAdmission(data);
      } catch (err) {
        setError("Unable to connect to the server.");
      } finally {
        setLoading(false);
      }
    };

    fetchAdmission();
  }, [slug]);

  // ---------- LOADING ----------
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-lg">
        Loading admission details...
      </div>
    );
  }

  // ---------- ERROR ----------
  if (error || !admission) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl font-bold mb-4">{error || "Admission Not Found"}</h1>
          <Link to="/admission">
            <Button>Back to Admissions</Button>
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  // SHORT VARIABLES FROM BACKEND SCHEMA
  const imp = admission.importantDates || {};
  const fee = admission.applicationFee || {};
  const elig = admission.eligibilityCriteria || {};
  const links = admission.links || {};

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      {/* HERO SECTION */}
      <main className="flex-1">
        <div className="bg-gradient-to-br from-primary via-primary/90 to-accent text-primary-foreground py-6 md:py-8">
          <div className="container mx-auto px-4 max-w-5xl">
            <Link
              to="/admission"
              className="inline-flex items-center gap-2 text-primary-foreground/90 hover:text-primary-foreground mb-4 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Admissions
            </Link>

            <div className="flex flex-col md:flex-row md:justify-between gap-4">
              <div>
                <Badge className="mb-2 bg-success text-white border-0">
                  {admission.status?.isApplicationOpen ? "Open" : "Closed"}
                </Badge>
                <h1 className="text-2xl md:text-3xl font-bold mb-2">{admission.title}</h1>
                <p className="text-primary-foreground/90 text-lg">{admission.organization}</p>
              </div>

              {links.applyOnline && (
                <Button size="lg" className="bg-white text-primary font-semibold shadow-lg" asChild>
                  <a href={links.applyOnline} target="_blank" rel="noopener noreferrer">
                    Apply Now <ExternalLink className="h-4 w-4 ml-2" />
                  </a>
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* CONTENT */}
        <div className="container mx-auto px-4 py-6 md:py-8 max-w-5xl">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-6">
              
              {/* Last Date */}
              <Alert className="border-destructive bg-destructive/10">
                <AlertCircle className="h-4 w-4 text-destructive" />
                <AlertDescription className="text-destructive font-semibold">
                  ⏰ Last Date to Apply: {formatDateOrSoon(imp.applicationEnd)}
                </AlertDescription>
              </Alert>

              {/* Eligibility */}
              <Card>
                <CardHeader className="bg-accent/5">
                  <CardTitle className="flex items-center gap-2">
                    <GraduationCap className="h-5 w-5 text-primary" />
                    Eligibility Criteria
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6 space-y-3">
                  <p><b>Education:</b> {elig.education}</p>

                  {elig.ageLimit && (
                    <p>
                      <b>Age Limit:</b> {elig.ageLimit.min}–{elig.ageLimit.max}
                    </p>
                  )}

                  {elig.additionalRequirements?.length > 0 && (
                    <ul className="list-disc ml-5 text-sm mt-3">
                      {elig.additionalRequirements.map((req: string, i: number) => (
                        <li key={i}>{req}</li>
                      ))}
                    </ul>
                  )}
                </CardContent>
              </Card>

              {/* Application Fee */}
              <Card>
                <CardHeader className="bg-accent/5">
                  <CardTitle className="flex items-center gap-2">
                    <IndianRupee className="h-5 w-5 text-primary" />
                    Application Fee
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6 space-y-2">
                  {Object.entries(fee).map(([key, value], i) => (
                    typeof value === "number" && (
                      <div key={i} className="flex justify-between p-3 rounded bg-muted/50">
                        <span className="font-medium capitalize">{key}</span>
                        <Badge>₹{value}</Badge>
                      </div>
                    )
                  ))}
                </CardContent>
              </Card>

              {/* Important Dates */}
              <Card>
                <CardHeader className="bg-accent/5">
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-primary" />
                    Important Dates
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6 space-y-2">
                  {Object.entries(imp).map(([label, value], i) => {
                    if (!value || typeof value !== "string") return null;
                    return (
                      <div key={i} className="flex justify-between p-3 rounded bg-muted/50">
                        <span className="font-medium capitalize">
                          {label.replace(/([A-Z])/g, " $1")}
                        </span>
                        <Badge variant="outline">
                          {formatDateOrSoon(value)}
                        </Badge>
                      </div>
                    );
                  })}
                </CardContent>
              </Card>

              {/* Exam Pattern */}
              <Card>
                <CardHeader className="bg-accent/5">
                  <CardTitle className="flex items-center gap-2">
                    <GraduationCap className="h-5 w-5 text-primary" />
                    Exam Pattern
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6 space-y-2">
                  {(admission.extraInfo?.examPattern || []).map(
                    (pattern: string, index: number) => (
                      <div key={index} className="p-3 rounded bg-muted/50 flex gap-3">
                        <span className="text-primary font-bold">•</span>
                        <span>{pattern}</span>
                      </div>
                    )
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Right Sidebar - Links */}
            <div className="space-y-6">
              <Card className=" top-4 border-primary/20">
                <CardHeader className="bg-primary/5">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <ExternalLink className="h-5 w-5 text-primary" />
                    Quick Links
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6 space-y-3">
                  {Object.entries(links).map(([label, url], i) => {
                    if (!url) return null;
                    return (
                      <Button
                        key={i}
                        variant={i === 0 ? "default" : "outline"}
                        className="w-full justify-between"
                        size="lg"
                        asChild
                      >
                        <a href={url as string} target="_blank" rel="noopener noreferrer">
                          {label.replace(/([A-Z])/g, " $1")}
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      </Button>
                    );
                  })}
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

export default AdmissionDetail;
