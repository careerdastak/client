import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Gift } from "lucide-react";
import { Link } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000";

const Schemes = () => {
  const [schemes, setSchemes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;
    const fetchActiveSchemes = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await fetch(`${API_BASE}/api/schemes/active`);
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

    fetchActiveSchemes();
    return () => { mounted = false; };
  }, []);

  return (
    <Card className="shadow-card border-l-4 border-l-primary">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Gift className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg">Government Schemes</CardTitle>
          </div>
          <Link to="/govt-schemes">
            <Button variant="link" size="sm" className="text-primary text-sm">
              View All
            </Button>
          </Link>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {loading ? (
          // Loading skeletons
          Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="pb-3 border-b border-border last:border-0 last:pb-0">
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-3 w-3/4" />
                <div className="flex gap-2">
                  <Skeleton className="h-5 w-16" />
                  <Skeleton className="h-5 w-20" />
                </div>
              </div>
            </div>
          ))
        ) : error ? (
          <div className="text-center py-4">
            <p className="text-sm text-muted-foreground">Failed to load schemes</p>
            <Button 
              variant="outline" 
              size="sm" 
              className="mt-2"
              onClick={() => window.location.reload()}
            >
              Try Again
            </Button>
          </div>
        ) : (
          schemes.slice(0, 15).map((scheme, index) => (
            <div key={scheme._id} className="pb-3 border-b border-border last:border-0 last:pb-0">
              <div className="flex items-start gap-2 mb-1">
                <div className="flex-1 min-w-0">
                  <Link 
                    to={`/scheme/${scheme.slug}`} 
                    className="block text-sm font-semibold text-foreground hover:text-primary transition-colors mb-1 line-clamp-1"
                  >
                    {scheme.title}
                  </Link>
                  <p className="text-xs text-muted-foreground mb-2 line-clamp-1">
                    {scheme.description}
                  </p>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="text-xs">
                      {scheme.category}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {scheme.status?.isApplicationOpen ? 'Applications Open' : 'Active Scheme'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
        
        {!loading && !error && schemes.length === 0 && (
          <div className="text-center py-4">
            <p className="text-sm text-muted-foreground">No schemes available</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default Schemes;