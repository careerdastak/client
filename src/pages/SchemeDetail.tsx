import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, ExternalLink, Users, Building2, GraduationCap, Heart, Gift, AlertCircle, Calendar, Phone, Download, UserCheck, Target } from "lucide-react";
import ShareButton from "@/components/ShareButton";
import { Skeleton } from "@/components/ui/skeleton";

const API_BASE = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

// Icon mapping
const iconMap = {
  Users: Users,
  Building2: Building2,
  GraduationCap: GraduationCap,
  Heart: Heart,
  Gift: Gift,
};

const SchemeDetail = () => {
  const { slug } = useParams();
  const [scheme, setScheme] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!slug) {
      setError("Invalid scheme Slug");
      setLoading(false);
      return;
    }

    let mounted = true;
    const fetchScheme = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await fetch(`${API_BASE}/api/schemes/slug/${slug}`);
        if (!response.ok) throw new Error(`Failed to load scheme (${response.status})`);
        const data = await response.json();
        if (!mounted) return;
        setScheme(data);
      } catch (err) {
        if (mounted) setError(err.message || "Unable to load scheme");
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchScheme();
    return () => { mounted = false; };
  }, [slug]);

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return "Ongoing";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatDateLast = (dateString) => {
    if (!dateString) return "Not Mentioned";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const Icon = scheme?.icon ? iconMap[scheme.icon] || Gift : Gift;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <div className="flex-1 container mx-auto px-4 py-8">
        <Link to="/govt-schemes">
          <Button variant="ghost" className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to All Schemes
          </Button>
        </Link>

        {/* Error State */}
        {error && (
          <Card className="max-w-2xl mx-auto">
            <CardContent className="py-12 text-center">
              <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Scheme Not Found
              </h3>
              <p className="text-muted-foreground mb-4">
                The scheme you're looking for doesn't exist or couldn't be loaded.
              </p>
              <Link to="/govt-schemes">
                <Button variant="outline">
                  Browse All Schemes
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}

        {/* Loading State */}
        {loading && !error && (
          <div className="grid grid-cols-1 lg:grid-cols-[3fr_1fr] gap-10">
            <Card>
              <CardHeader>
                <div className="flex items-start gap-4 mb-4">
                  <Skeleton className="w-14 h-14 rounded-lg" />
                  <div className="flex-1">
                    <div className="flex gap-2 mb-2">
                      <Skeleton className="h-6 w-20" />
                      <Skeleton className="h-6 w-32" />
                    </div>
                    <Skeleton className="h-8 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-full" />
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-8">
                {Array.from({ length: 6 }).map((_, index) => (
                  <div key={index}>
                    <Skeleton className="h-6 w-48 mb-4" />
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-3/4" />
                  </div>
                ))}
              </CardContent>
            </Card>
            <div className="space-y-6">
              <Skeleton className="h-80 w-full rounded-2xl" />
              <Skeleton className="h-60 w-full rounded-2xl" />
            </div>
          </div>
        )}

        {/* Success State */}
        {!loading && !error && scheme && (
          <div className="grid grid-cols-1 lg:grid-cols-[3fr_1fr] gap-10">
            <Card>
              <CardHeader>
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-3 rounded-lg bg-slate-100 dark:bg-slate-800">
                    <Icon className="h-8 w-8 text-slate-600 dark:text-slate-400" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <Badge variant="secondary" className="bg-blue-50 text-blue-700 dark:bg-blue-900 dark:text-blue-300">
                        {scheme.category}
                      </Badge>
                      <Badge variant="outline" className="border-slate-300 dark:border-slate-600">
                        {scheme.department}
                      </Badge>
                      {scheme.status?.isApplicationOpen && (
                        <Badge className="bg-green-50 text-green-700 dark:bg-green-900 dark:text-green-300 border-green-200 dark:border-green-800">
                          Applications Open
                        </Badge>
                      )}
                    </div>
                    <CardTitle className="text-3xl mb-2">{scheme.title}</CardTitle>
                    <p className="text-muted-foreground">{scheme.description}</p>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-8">
                {/* Key Benefits */}
                <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg border-l-4 border-l-blue-500">
                  <div className="flex justify-between">
                    <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
                      <Gift className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      Key Benefits
                    </h3>
                    <ShareButton title={scheme.title} text={scheme.description} />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-blue-700 dark:text-blue-300">{scheme.benefits}</p>
                    <p className="text-sm text-muted-foreground mt-1">For: {scheme.eligibility}</p>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
                    <Calendar className="h-8 w-8 text-slate-600 dark:text-slate-400" />
                    <div>
                      <p className="text-sm text-muted-foreground">Launch Date</p>
                      <p className="font-semibold text-foreground">{formatDate(scheme?.launchDate)}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
                    <Calendar className="h-8 w-8 text-slate-600 dark:text-slate-400" />
                    <div>
                      <p className="text-sm text-muted-foreground">Last Date</p>
                      <p className="font-semibold text-foreground">{formatDateLast(scheme?.lastDate)}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
                    <UserCheck className="h-8 w-8 text-slate-600 dark:text-slate-400" />
                    <div>
                      <p className="text-sm text-muted-foreground">Application Mode</p>
                      <p className="font-semibold text-foreground">{scheme.applicationMode}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
                    <Users className="h-8 w-8 text-slate-600 dark:text-slate-400" />
                    <div>
                      <p className="text-sm text-muted-foreground">Beneficiaries</p>
                      <p className="font-semibold text-foreground">{scheme.beneficiaries}</p>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* About the Scheme */}
                {scheme.fullDescription && (
                  <>
                    <div>
                      <h3 className="font-semibold text-xl mb-3 text-foreground">About the Scheme</h3>
                      <p className="text-muted-foreground leading-relaxed">{scheme.fullDescription}</p>
                    </div>
                    <Separator />
                  </>
                )}

                {/* Objectives */}
                {scheme.objectives && scheme.objectives.length > 0 && (
                  <>
                    <div>
                      <h3 className="font-semibold text-xl mb-3 text-foreground">Objectives</h3>
                      <ul className="space-y-2">
                        {scheme.objectives.map((obj, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="text-blue-500 mt-1">•</span>
                            <span className="text-muted-foreground">{obj}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <Separator />
                  </>
                )}

                {/* Financial Details */}
                {scheme.financialInfo && (
                  <>
                    <div>
                      <h3 className="font-semibold text-xl mb-3 text-foreground">Financial Details</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
                          <p className="font-semibold text-foreground">Annual Amount</p>
                          <p className="text-blue-600 dark:text-blue-400 text-xl font-bold">{scheme.financialInfo.amount}</p>
                        </div>
                        <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
                          <p className="font-semibold text-foreground">Payment Schedule</p>
                          <p className="text-muted-foreground">{scheme.financialInfo.installmentDetails}</p>
                        </div>
                      </div>
                      {scheme.financialInfo.coverage && (
                        <p className="text-sm text-muted-foreground mt-3">
                          {scheme.financialInfo.coverage}
                        </p>
                      )}
                    </div>
                    <Separator />
                  </>
                )}

                {/* Target Audience */}
                {scheme.targetAudience && scheme.targetAudience.length > 0 && (
                  <>
                    <div>
                      <h3 className="font-semibold text-xl mb-3 flex items-center gap-2 text-foreground">
                        <Target className="h-5 w-5 text-slate-600 dark:text-slate-400" />
                        Target Audience
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {scheme.targetAudience.map((audience, index) => (
                          <Badge key={index} variant="outline" className="bg-blue-50 text-blue-700 dark:bg-blue-900 dark:text-blue-300 border-blue-200 dark:border-blue-800">
                            {audience}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <Separator />
                  </>
                )}

                {/* Eligibility Criteria */}
                {scheme.eligibilityDetails && scheme.eligibilityDetails.length > 0 && (
                  <>
                    <div>
                      <h3 className="font-semibold text-xl mb-3 text-foreground">Eligibility Criteria</h3>
                      <ul className="space-y-2">
                        {scheme.eligibilityDetails.map((criteria, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="text-green-500 mt-1">✓</span>
                            <span className="text-muted-foreground">{criteria}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <Separator />
                  </>
                )}

                {/* Required Documents */}
                {scheme.documents && scheme.documents.length > 0 && (
                  <>
                    <div>
                      <h3 className="font-semibold text-xl mb-3 text-foreground">Required Documents</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {scheme.documents.map((doc, index) => (
                          <div key={index} className="flex items-center gap-2 p-3 bg-slate-50 dark:bg-slate-800/50 rounded border border-slate-200 dark:border-slate-700">
                            <span className="text-blue-500">📄</span>
                            <span className="text-sm text-foreground">{doc}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <Separator />
                  </>
                )}

                {/* How to Apply */}
                {scheme.howToApply && scheme.howToApply.length > 0 && (
                  <>
                    <div>
                      <h3 className="font-semibold text-xl mb-3 text-foreground">How to Apply</h3>
                      <ol className="space-y-3">
                        {scheme.howToApply.map((step, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-500 text-white text-sm font-semibold flex-shrink-0">
                              {index + 1}
                            </span>
                            <span className="text-muted-foreground pt-0.5">{step}</span>
                          </li>
                        ))}
                      </ol>
                    </div>
                    <Separator />
                  </>
                )}

                {/* FAQs */}
                {scheme.extraInfo?.faqs && scheme.extraInfo.faqs.length > 0 && (
                  <>
                    <div>
                      <h3 className="font-semibold text-xl mb-3 text-foreground">Frequently Asked Questions</h3>
                      <div className="space-y-4">
                        {scheme.extraInfo.faqs.map((faq, index) => (
                          <div key={index} className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
                            <p className="font-semibold mb-2 text-foreground">Q: {faq.question}</p>
                            <p className="text-muted-foreground">A: {faq.answer}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                    <Separator />
                  </>
                )}

                {/* Contact & Resources */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-xl mb-3 text-foreground">Contact & Resources</h3>
                  
                  {/* Official Website */}
                  {scheme.links?.officialWebsite && (
                    <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
                      <div>
                        <p className="font-semibold mb-1 text-foreground">Official Website</p>
                        <p className="text-sm text-muted-foreground">Visit the official portal for more information</p>
                      </div>
                      <a href={scheme.links.officialWebsite} target="_blank" rel="noopener noreferrer">
                        <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                          Visit Website
                          <ExternalLink className="ml-2 h-4 w-4" />
                        </Button>
                      </a>
                    </div>
                  )}

                  {/* Helpline */}
                  {scheme.links?.helpline && (
                    <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
                      <div className="flex items-center gap-3">
                        <Phone className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                        <div>
                          <p className="font-semibold mb-1 text-foreground">Helpline</p>
                          <p className="text-sm text-muted-foreground">{scheme.links.helpline}</p>
                        </div>
                      </div>
                      <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20">
                        Call Now
                      </Button>
                    </div>
                  )}

                  {/* Mobile App */}
                  {scheme.links?.mobileApp && (
                    <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
                      <div>
                        <p className="font-semibold mb-1 text-foreground">Mobile Application</p>
                        <p className="text-sm text-muted-foreground">{scheme.links.mobileApp}</p>
                      </div>
                      <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20">
                        Download
                        <Download className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  )}

                  {/* Guidelines PDF */}
                  {scheme.links?.guidelinesPDF && (
                    <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
                      <div>
                        <p className="font-semibold mb-1 text-foreground">Official Guidelines</p>
                        <p className="text-sm text-muted-foreground">Download detailed scheme guidelines</p>
                      </div>
                      <a href={scheme.links.guidelinesPDF} target="_blank" rel="noopener noreferrer">
                        <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20">
                          Download PDF
                          <Download className="ml-2 h-4 w-4" />
                        </Button>
                      </a>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* RIGHT SIDE ADS / MORE ARTICLES */}
            <div className="w-full">
              <div className="sticky top-28 space-y-6">
                {/* AD BOX */}
                <Card className="rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all border border-slate-200 dark:border-slate-700">
                  <p className="text-sm text-muted-foreground mb-3">Sponsored</p>
                  <img
                    src="https://img.freepik.com/free-vector/education-banner-template-design_23-2149325082.jpg"
                    className="rounded-xl w-full mb-4"
                    alt="Exam Preparation"
                  />
                  <h3 className="font-semibold text-lg text-foreground">
                    Start Your Exam Prep Today!
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Join India's No.1 online coaching for all competitive exams.
                  </p>
                  <Button className="mt-4 w-full rounded-xl bg-blue-600 hover:bg-blue-700 text-white">
                    Learn More
                  </Button>
                </Card>

                {/* More Suggestions */}
                <Card className="rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all border border-slate-200 dark:border-slate-700">
                  <h3 className="font-semibold text-lg mb-4 text-foreground">More like this</h3>
                  <div className="space-y-4 text-sm">
                    <Link to="/govt-schemes" className="block hover:text-blue-600 text-foreground transition-colors">Govt. Schemes Must Read</Link>
                    <Link to="/govt-schemes" className="block hover:text-blue-600 text-foreground transition-colors">Always be Updated</Link>
                    <Link to="/govt-schemes" className="block hover:text-blue-600 text-foreground transition-colors">PM Jana Dhan Yojna Or PM Mudra Yojna – Which to Choose?</Link>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default SchemeDetail;