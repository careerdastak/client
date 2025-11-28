import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  ExternalLink,
  FileText,
  CreditCard,
  GraduationCap,
  Briefcase,
  Car,
  Home,
  Heart,
  Shield,
  Search,
  Building,
  ArrowRight
} from "lucide-react";
import { Link } from "react-router-dom";

const Documents = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const documentCategories = [
    { id: "all", label: "All Documents", icon: FileText },
    { id: "identity", label: "Identity", icon: CreditCard },
    { id: "education", label: "Education", icon: GraduationCap },
    { id: "employment", label: "Employment", icon: Briefcase },
    { id: "transport", label: "Transport", icon: Car },
    { id: "property", label: "Property", icon: Home },
    { id: "health", label: "Health", icon: Heart },
    { id: "other", label: "Other Services", icon: Shield },
  ];

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        setLoading(true);
        setError("");
        const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

        const response = await fetch(`${API_BASE_URL}/api/documents`);
        
        if (!response.ok) {
          throw new Error("Failed to fetch documents");
        }

        const data = await response.json();
        const docs = Array.isArray(data) ? data : (data.data || []);
        setDocuments(docs);
      } catch (err) {
        console.error("Error fetching documents:", err);
        setError("Failed to load documents. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchDocuments();
  }, []);

  const filteredDocuments = documents
    .filter((doc) => selectedCategory === "all" || doc.category === selectedCategory)
    .filter((doc) => {
      if (!searchQuery.trim()) return true;
      const query = searchQuery.toLowerCase();
      return (
        doc.title?.toLowerCase().includes(query) ||
        doc.description?.toLowerCase().includes(query) ||
        doc.serviceProvider?.toLowerCase().includes(query) ||
        (doc.services && typeof doc.services === 'string' && doc.services.toLowerCase().includes(query))
      );
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

  // Helper function to get category icon
  const getCategoryIcon = (category) => {
    const categoryMap = {
      identity: CreditCard,
      education: GraduationCap,
      employment: Briefcase,
      transport: Car,
      property: Home,
      health: Heart,
      other: Shield
    };
    return categoryMap[category] || FileText;
  };

  // Helper function to format category name
  const formatCategory = (category) => {
    return category.charAt(0).toUpperCase() + category.slice(1);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Important Documents & Services</h1>
          <p className="text-muted-foreground text-base md:text-lg">
            Access direct links to government services, certificates, and important documents
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative max-w-2xl">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search by title, services, or service provider..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12 text-base"
            />
          </div>
        </div>

        {/* Category Filter */}
        <div className="mb-8 overflow-x-auto pb-2">
          <div className="flex gap-2 min-w-max">
            {documentCategories.map((category) => {
              const Icon = category.icon;
              return (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category.id)}
                  className="flex items-center gap-2 whitespace-nowrap"
                >
                  <Icon className="h-4 w-4" />
                  <span>{category.label}</span>
                </Button>
              );
            })}
          </div>
        </div>

        {/* Loading / Error States */}
        {loading && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground text-lg">Loading documents...</p>
          </div>
        )}

        {error && (
          <div className="text-center py-12">
            <FileText className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <p className="text-red-500 text-lg mb-2">{error}</p>
            <Button onClick={() => window.location.reload()} variant="outline">
              Try Again
            </Button>
          </div>
        )}

        {/* Documents Grid */}
        {!loading && !error && (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredDocuments.map((doc) => {
              const CategoryIcon = getCategoryIcon(doc.category);
              
              return (
                <Card key={doc._id || doc.id} className="hover:shadow-lg transition-shadow duration-300">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between mb-2">
                      <Badge variant="secondary" className="flex items-center gap-1">
                        <CategoryIcon className="h-3 w-3" />
                        {formatCategory(doc.category)}
                      </Badge>
                      <ExternalLink className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-1" />
                    </div>
                    
                    <CardTitle className="text-lg leading-tight mb-2">
                      {doc.title}
                    </CardTitle>
                    
                    <CardDescription className="text-sm leading-relaxed">
                      {doc.services}
                    </CardDescription>

                    {/* Service Provider */}
                    {doc.serviceProvider && (
                      <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                        <Building className="h-3 w-3" />
                        <span>{doc.serviceProvider}</span>
                      </div>
                    )}
                  </CardHeader>

                  <CardContent className="pt-0">
                    {/* Services */}
                    {/* {doc.services && (
                      <div className="mb-4">
                        <div className="flex flex-wrap gap-1">
                          {doc.services.split(',').slice(0, 6).map((service, idx) => (
                            <span
                              key={idx}
                              className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary"
                            >
                              {service.trim()}
                            </span>
                          ))}
                        </div>
                      </div>
                    )} */}

                    {/* Visit Button */}
                    {/* {doc.url && (
                      <Button 
                        className="w-full" 
                        onClick={() => window.open(doc.url, '_blank')}
                        size="sm"
                      >
                        View Details
                      </Button>
                    )} */}
                    <Link to={`/document/${doc.slug}`}>
                        <Button className="w-full" >
                          View Details <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}

        {/* No Results */}
        {!loading && !error && filteredDocuments.length === 0 && (
          <div className="text-center py-12">
            <FileText className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground text-lg">No documents found matching your search.</p>
            <p className="text-muted-foreground text-sm mt-2">
              Try adjusting your search terms or select a different category.
            </p>
            <Button 
              variant="outline" 
              className="mt-4"
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("all");
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Documents;