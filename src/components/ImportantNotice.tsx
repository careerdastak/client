import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Landmark, Calendar, Users, ExternalLink } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface GovtScheme {
  _id: string;
  schemeId: string;
  title: string;
  slug: string;
  category: string;
  ministry: string;
  launchDate: string;
  status: {
    isActive: boolean;
    isFeatured: boolean;
    isPublished: boolean;
  };
  meta: {
    views: number;
    applications: number;
  };
  importantDates?: {
    applicationStart?: string;
    applicationEnd?: string;
  };
}

const GovtSchemesNotice = () => {
  const [schemes, setSchemes] = useState<GovtScheme[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchGovtSchemes();
  }, []);

  const fetchGovtSchemes = async () => {
    try {
      const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;
      const response = await fetch(`${API_BASE_URL}/api/govt-schemes?limit=5&status=active`);

      if (!response.ok) {
        throw new Error('Failed to fetch government schemes');
      }

      const data = await response.json();
      if (data.success) {
        // Filter only active and published schemes, and take latest 5
        const activeSchemes = data.data
          .filter((scheme: GovtScheme) => 
            scheme.status.isActive && scheme.status.isPublished
          )
          .slice(0, 5);
        
        setSchemes(activeSchemes);
      }
    } catch (error) {
      console.error('Error fetching government schemes:', error);
      toast({
        title: "Error",
        description: "Failed to load government schemes",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const isApplicationOpen = (scheme: GovtScheme) => {
    if (!scheme.importantDates?.applicationStart || !scheme.importantDates?.applicationEnd) {
      return false;
    }
    const now = new Date();
    const start = new Date(scheme.importantDates.applicationStart);
    const end = new Date(scheme.importantDates.applicationEnd);
    return now >= start && now <= end;
  };

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      'Education': 'bg-blue-100 text-blue-800',
      'Healthcare': 'bg-green-100 text-green-800',
      'Agriculture': 'bg-orange-100 text-orange-800',
      'Employment': 'bg-purple-100 text-purple-800',
      'Housing': 'bg-red-100 text-red-800',
      'Women Empowerment': 'bg-pink-100 text-pink-800',
      'Senior Citizens': 'bg-gray-100 text-gray-800',
      'Financial Inclusion': 'bg-teal-100 text-teal-800',
      'Rural Development': 'bg-yellow-100 text-yellow-800',
      'Other': 'bg-gray-100 text-gray-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  if (loading) {
    return (
      <Card className="shadow-card border-l-4 border-l-primary">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <Landmark className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg">Government Schemes</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="flex gap-2">
                  <div className="h-6 bg-gray-200 rounded w-16"></div>
                  <div className="h-4 bg-gray-200 rounded w-20"></div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (schemes.length === 0) {
    return (
      <Card className="shadow-card border-l-4 border-l-primary">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <Landmark className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg">Government Schemes</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground text-center py-4">
            No active government schemes available at the moment.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-card border-l-4 border-l-primary">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Landmark className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg">Government Schemes</CardTitle>
          </div>
          <Badge variant="secondary" className="text-xs">
            {schemes.length} Active
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {schemes.slice(0, 15).map((scheme) => (
          <div key={scheme._id} className="pb-4 border-b border-border last:border-0 last:pb-0">
            <div className="flex items-start gap-2 mb-2">
              <div className="flex-1 min-w-0">
                <Link 
                  to={`/schemes/${scheme.slug}`}
                  className="block text-sm font-semibold text-foreground hover:text-primary transition-colors mb-2 line-clamp-2"
                >
                  {scheme.title}
                </Link>
                
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  <Badge 
                    variant="secondary" 
                    className={`text-xs ${getCategoryColor(scheme.category)}`}
                  >
                    {scheme.category}
                  </Badge>
                  
                  {scheme.status.isFeatured && (
                    <Badge variant="default" className="text-xs bg-yellow-100 text-yellow-800">
                      Featured
                    </Badge>
                  )}
                  
                  {isApplicationOpen(scheme) && (
                    <Badge variant="default" className="text-xs bg-green-100 text-green-800">
                      Apply Now
                    </Badge>
                  )}
                </div>

                <div className="flex items-center gap-3 text-xs text-muted-foreground flex-wrap">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    <span>Launched: {formatDate(scheme.launchDate)}</span>
                  </div>
                  
                  {scheme.importantDates?.applicationEnd && (
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      <span>Ends: {formatDate(scheme.importantDates.applicationEnd)}</span>
                    </div>
                  )}
                  
                  <div className="flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    <span>{scheme.meta.applications} applications</span>
                  </div>
                </div>

                <div className="mt-2 text-xs text-muted-foreground">
                  <span className="font-medium">By:</span> {scheme.ministry}
                </div>
              </div>
              
              <ExternalLink className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
            </div>
          </div>
        ))}
        
        {/* View All Link */}
        <div className="pt-2 border-t border-border">
          <Link 
            to="/govt-schemes"
            className="text-sm text-primary hover:text-primary/80 font-medium flex items-center gap-1 justify-center"
          >
            View All Government Schemes
            <ExternalLink className="h-3 w-3" />
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default GovtSchemesNotice;