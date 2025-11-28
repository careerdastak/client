import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Gift, ArrowRight, Users, Building2, GraduationCap, Heart, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000";

// Icon mapping for schemes
const iconMap = {
  Users: Users,
  Building2: Building2,
  GraduationCap: GraduationCap,
  Heart: Heart,
  Gift: Gift,
};

const GovtSchemes = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [schemes, setSchemes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;
    const fetchSchemes = async () => {
      setLoading(true);
      setError("");
      try {
        const url = selectedCategory === "All" 
          ? `${API_BASE}/api/schemes`
          : `${API_BASE}/api/schemes/category/${selectedCategory}`;
        
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Failed to load schemes (${response.status})`);
        const data = await response.json();
        if (!mounted) return;
        setSchemes(Array.isArray(data) ? data : []);
      } catch (err) {
        if (mounted) setError(err.message || "Unable to load schemes");
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchSchemes();
    return () => { mounted = false; };
  }, [selectedCategory]);

  const categories = ["All", "Agriculture", "Housing", "Education", "Healthcare", "Business", "Women", "Senior Citizen", "Other"];

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
      
      <div className="flex-1 container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Gift className="h-8 w-8 text-primary" />
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">
              Government Schemes
            </h1>
          </div>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Explore various central and state government schemes designed for citizens' welfare
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-6 justify-center">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Error State */}
        {error && (
          <Card className="max-w-2xl mx-auto">
            <CardContent className="py-12 text-center">
              <AlertCircle className="h-12 w-12 text-destructive mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Failed to Load Schemes
              </h3>
              <p className="text-muted-foreground mb-4">
                We couldn't load the schemes. Please check your connection and try again.
              </p>
              <Button 
                onClick={() => window.location.reload()}
                variant="outline"
              >
                Try Again
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Loading State */}
        {loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <Skeleton className="w-10 h-10 rounded-lg" />
                    <Skeleton className="h-6 w-16" />
                  </div>
                  <Skeleton className="h-6 w-full mb-2" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                  </div>
                  <Skeleton className="h-10 w-full" />
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Success State */}
        {!loading && !error && (
          <>
            {/* Schemes Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {schemes.map((scheme) => {
                const IconComponent = iconMap[scheme.icon] || Gift;
                
                return (
                  <Card key={scheme._id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between mb-2">
                        <div className="p-2 rounded-lg bg-accent">
                          <IconComponent className="h-6 w-6" />
                        </div>
                        <Badge variant="secondary">{scheme.category}</Badge>
                      </div>
                      <CardTitle className="text-xl line-clamp-2">{scheme.title}</CardTitle>
                      <CardDescription className="line-clamp-2">
                        {scheme.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="space-y-2 text-sm">
                        <div className="flex gap-2">
                          <span className="text-muted-foreground">Eligibility:</span>
                          <span className="font-medium  line-clamp-1 max-w-[320px]">
                            {scheme.eligibility}
                          </span>
                        </div>
                        <div className="flex gap-2">
                          <span className="text-muted-foreground">Benefits:</span>
                          <span className="font-semibold text-primary">{scheme.benefits}</span>
                        </div>
                        <div className="text-xs text-muted-foreground pt-2 border-t">
                          {scheme.department}
                        </div>
                      </div>
                      <Link to={`/scheme/${scheme.slug}`}>
                        <Button className="w-full" variant="outline">
                          View Details <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Empty State */}
            {schemes.length === 0 && (
              <div className="text-center py-12">
                <Gift className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-muted-foreground mb-2">
                  No schemes found
                </h3>
                <p className="text-muted-foreground">
                  {selectedCategory === "All" 
                    ? "No schemes available at the moment." 
                    : `No ${selectedCategory} schemes found.`}
                </p>
              </div>
            )}
          </>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default GovtSchemes;