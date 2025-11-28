import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  ArrowLeft, 
  ExternalLink, 
  Building, 
  FileText, 
  Calendar, 
  IndianRupee, 
  UserCheck,
  CheckCircle,
  AlertCircle,
  CreditCard,
  GraduationCap,
  Briefcase,
  Car,
  Home,
  Heart,
  Shield
} from "lucide-react";
import ShareButton from "@/components/ShareButton";
import { Skeleton } from "@/components/ui/skeleton";

const API_BASE = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

// Icon mapping for categories
const categoryIconMap = {
  identity: CreditCard,
  education: GraduationCap,
  employment: Briefcase,
  transport: Car,
  property: Home,
  health: Heart,
  other: Shield
};

const DocumentDetail = () => {
  const { slug } = useParams();
  const [document, setDocument] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!slug) {
      setError("Invalid document slug");
      setLoading(false);
      return;
    }

    let mounted = true;
    const fetchDocument = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await fetch(`${API_BASE}/api/documents/slug/${slug}`);
        if (!response.ok) throw new Error(`Failed to load document (${response.status})`);
        const data = await response.json();
        if (!mounted) return;
        setDocument(data);
      } catch (err) {
        if (mounted) setError(err.message || "Unable to load document");
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchDocument();
    return () => { mounted = false; };
  }, [slug]);

  // Helper function to get category icon
  const getCategoryIcon = (category) => {
    return categoryIconMap[category] || FileText;
  };

  // Helper function to format category name
  const formatCategory = (category) => {
    return category ? category.charAt(0).toUpperCase() + category.slice(1) : "";
  };

  const CategoryIcon = document?.category ? getCategoryIcon(document.category) : FileText;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <div className="flex-1 container mx-auto px-4 py-8">
        <Link to="/documents">
          <Button variant="ghost" className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to All Documents
          </Button>
        </Link>

        {/* Error State */}
        {error && (
          <Card className="max-w-2xl mx-auto">
            <CardContent className="py-12 text-center">
              <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Document Not Found
              </h3>
              <p className="text-muted-foreground mb-4">
                The document service you're looking for doesn't exist or couldn't be loaded.
              </p>
              <Link to="/documents">
                <Button variant="outline">
                  Browse All Documents
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
        {!loading && !error && document && (
          <div className="grid grid-cols-1 lg:grid-cols-[3fr_1fr] gap-10">
            <Card>
              <CardHeader>
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-3 rounded-lg bg-slate-100 dark:bg-slate-800">
                    <CategoryIcon className="h-8 w-8 text-slate-600 dark:text-slate-400" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <Badge variant="secondary" className="bg-blue-50 text-blue-700 dark:bg-blue-900 dark:text-blue-300">
                        {formatCategory(document.category)}
                      </Badge>
                      {document.serviceProvider && (
                        <Badge variant="outline" className="border-slate-300 dark:border-slate-600">
                          {document.serviceProvider}
                        </Badge>
                      )}
                    </div>
                    <CardTitle className="text-3xl mb-2">{document.title}</CardTitle>
                    <p className="text-muted-foreground text-lg">{document.description}</p>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-8">
                {/* Quick Actions */}
                {(document.url || (document.usefulLinks && document.usefulLinks.length > 0)) && (
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg border-l-4 border-l-blue-500">
                    <div className="flex justify-between items-center">
                      <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
                        <ExternalLink className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                        Quick Access
                      </h3>
                      <ShareButton title={document.title} text={document.description} />
                    </div>
                    <div className="flex gap-4 mt-4">
                      {document.url && (
                        <a href={document.url} target="_blank" rel="noopener noreferrer">
                          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                            Visit Official Portal
                            <ExternalLink className="ml-2 h-4 w-4" />
                          </Button>
                        </a>
                      )}
                      {document.usefulLinks && document.usefulLinks.length > 0 && (
                        <a href={document.usefulLinks[0].url} target="_blank" rel="noopener noreferrer">
                          <Button variant="outline">
                            {document.usefulLinks[0].title}
                          </Button>
                        </a>
                      )}
                    </div>
                  </div>
                )}

                {/* Quick Stats - Only show if we have at least 2 items to display */}
                {(document.serviceProvider || 
                  (document.importantDatesFees && document.importantDatesFees.length > 0) || 
                  (document.documentsRequired && document.documentsRequired.length > 0) ||
                  (document.usefulLinks && document.usefulLinks.length > 0)) && (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      {/* Service Provider */}
                      {document.serviceProvider && (
                        <div className="flex items-center gap-3 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
                          <Building className="h-8 w-8 text-slate-600 dark:text-slate-400" />
                          <div>
                            <p className="text-sm text-muted-foreground">Service Provider</p>
                            <p className="font-semibold text-foreground">{document.serviceProvider}</p>
                          </div>
                        </div>
                      )}

                      {/* Category - Always show */}
                      <div className="flex items-center gap-3 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
                        <CategoryIcon className="h-8 w-8 text-slate-600 dark:text-slate-400" />
                        <div>
                          <p className="text-sm text-muted-foreground">Category</p>
                          <p className="font-semibold text-foreground">{formatCategory(document.category)}</p>
                        </div>
                      </div>

                      {/* Important Dates Count */}
                      {document.importantDatesFees && document.importantDatesFees.length > 0 && (
                        <div className="flex items-center gap-3 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
                          <Calendar className="h-8 w-8 text-slate-600 dark:text-slate-400" />
                          <div>
                            <p className="text-sm text-muted-foreground">Important Info</p>
                            <p className="font-semibold text-foreground">{document.importantDatesFees.length} items</p>
                          </div>
                        </div>
                      )}

                      {/* Useful Links Count */}
                      {document.usefulLinks && document.usefulLinks.length > 0 && (
                        <div className="flex items-center gap-3 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
                          <ExternalLink className="h-8 w-8 text-slate-600 dark:text-slate-400" />
                          <div>
                            <p className="text-sm text-muted-foreground">Useful Links</p>
                            <p className="font-semibold text-foreground">{document.usefulLinks.length}</p>
                          </div>
                        </div>
                      )}

                      {/* Documents Required Count */}
                      {document.documentsRequired && document.documentsRequired.length > 0 && (
                        <div className="flex items-center gap-3 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
                          <FileText className="h-8 w-8 text-slate-600 dark:text-slate-400" />
                          <div>
                            <p className="text-sm text-muted-foreground">Documents Required</p>
                            <p className="font-semibold text-foreground">{document.documentsRequired.length}</p>
                          </div>
                        </div>
                      )}
                    </div>
                    <Separator />
                  </>
                )}

                {/* Services */}
                {document.services && (
                  <>
                    <div>
                      <h3 className="font-semibold text-xl mb-4 text-foreground">Available Services</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                        {document.services.split(',').map((service, index) => (
                          <div key={index} className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
                            <CheckCircle className="h-5 w-5 text-green-500" />
                            <span className="text-foreground">{service.trim()}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <Separator />
                  </>
                )}

                {/* Important Dates & Fees */}
                {document.importantDatesFees && document.importantDatesFees.length > 0 && (
                  <>
                    <div>
                      <h3 className="font-semibold text-xl mb-4 text-foreground">Important Dates & Fees</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {document.importantDatesFees.map((item, index) => (
                          <div key={index} className="flex items-center gap-3 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
                            {item.category === 'date' && <Calendar className="h-6 w-6 text-blue-500" />}
                            {item.category === 'fee' && <IndianRupee className="h-6 w-6 text-green-500" />}
                            {item.category === 'general' && <UserCheck className="h-6 w-6 text-purple-500" />}
                            <div className="flex-1">
                              <p className="font-semibold text-foreground">{item.key}</p>
                              <p className="text-muted-foreground">{item.value}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <Separator />
                  </>
                )}

                {/* Documents Required */}
                {document.documentsRequired && document.documentsRequired.length > 0 && (
                  <>
                    <div>
                      <h3 className="font-semibold text-xl mb-4 text-foreground">Required Documents</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {document.documentsRequired.map((doc, index) => (
                          <div key={index} className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
                            <FileText className="h-5 w-5 text-blue-500" />
                            <span className="text-foreground">{doc}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <Separator />
                  </>
                )}

                {/* How to Apply */}
                {document.howToApply && document.howToApply.length > 0 && (
                  <>
                    <div>
                      <h3 className="font-semibold text-xl mb-4 text-foreground">How to Apply</h3>
                      <ol className="space-y-4">
                        {document.howToApply.map((step, index) => (
                          <li key={index} className="flex items-start gap-4">
                            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-500 text-white text-sm font-semibold flex-shrink-0">
                              {index + 1}
                            </span>
                            <div className="flex-1">
                              <p className="font-medium text-foreground mb-1">{step.action || `Step ${index + 1}`}</p>
                              <p className="text-muted-foreground">{step.description}</p>
                            </div>
                          </li>
                        ))}
                      </ol>
                    </div>
                    <Separator />
                  </>
                )}

                {/* Useful Links - Simplified */}
                {document.usefulLinks && document.usefulLinks.length > 0 && (
                  <div className="space-y-4">
                    <h3 className="font-semibold text-xl mb-4 text-foreground">Useful Links</h3>
                    <div className="grid grid-cols-1 gap-3">
                      {document.usefulLinks.map((link, index) => (
                        <div key={index} className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
                          <div>
                            <p className="font-semibold mb-1 text-foreground">{link.title}</p>
                          </div>
                          <a href={link.url} target="_blank" rel="noopener noreferrer">
                            <Button size="sm">
                              Visit
                              <ExternalLink className="ml-2 h-4 w-4" />
                            </Button>
                          </a>
                        </div>
                      ))}
                    </div>
                    <Separator />
                  </div>
                )}

                {/* Tags */}
                {document.tags && document.tags.length > 0 && (
                  <>
                    <Separator />
                    <div>
                      <h3 className="font-semibold text-xl mb-3 text-foreground">Related Tags</h3>
                      <div className="flex flex-wrap gap-2">
                        {document.tags.map((tag, index) => (
                          <Badge key={index} variant="secondary" className="text-sm">
                            #{tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </>
                )}
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
                    alt="Document Services"
                  />
                  <h3 className="font-semibold text-lg text-foreground">
                    Need Help with Documents?
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Get expert assistance for all your document-related services.
                  </p>
                  <Button className="mt-4 w-full rounded-xl bg-blue-600 hover:bg-blue-700 text-white">
                    Get Assistance
                  </Button>
                </Card>

                {/* More Suggestions */}
                <Card className="rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all border border-slate-200 dark:border-slate-700">
                  <h3 className="font-semibold text-lg mb-4 text-foreground">More Document Services</h3>
                  <div className="space-y-4 text-sm">
                    <Link to="/documents" className="block hover:text-blue-600 text-foreground transition-colors">
                      All Identity Documents
                    </Link>
                    <Link to="/documents" className="block hover:text-blue-600 text-foreground transition-colors">
                      Education Certificates
                    </Link>
                    <Link to="/documents" className="block hover:text-blue-600 text-foreground transition-colors">
                      Employment Services
                    </Link>
                    <Link to="/documents" className="block hover:text-blue-600 text-foreground transition-colors">
                      Property & Legal Documents
                    </Link>
                  </div>
                </Card>

                {/* Quick Stats */}
                <Card className="rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all border border-slate-200 dark:border-slate-700">
                  <h3 className="font-semibold text-lg mb-4 text-foreground">Service Information</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Category:</span>
                      <span className="font-medium text-foreground">{formatCategory(document.category)}</span>
                    </div>
                    {document.serviceProvider && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Provider:</span>
                        <span className="font-medium text-foreground">{document.serviceProvider}</span>
                      </div>
                    )}
                    {document.services && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Services:</span>
                        <span className="font-medium text-foreground">{document.services.split(',').length}</span>
                      </div>
                    )}
                    {document.usefulLinks && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Useful Links:</span>
                        <span className="font-medium text-foreground">{document.usefulLinks.length}</span>
                      </div>
                    )}
                    <div className="pt-3 border-t">
                      <Button variant="outline" className="w-full" asChild>
                        <a href={document.url} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="mr-2 h-4 w-4" />
                          Visit Official Portal
                        </a>
                      </Button>
                    </div>
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

export default DocumentDetail;