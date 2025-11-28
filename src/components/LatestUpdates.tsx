import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";

const LatestUpdates = () => {
  const updates = [
    { text: "SSC CGL 2024 Tier-1 Result to be announced this week - Official Notice", badge: "Breaking", time: "45 mins ago", link: "/results" },
    { text: "RRB NTPC Admit Card Released for CBT Stage 1 - Download Now", badge: "Admit Card", time: "2 hours ago", link: "/admit-card" },
    { text: "UPSC CSE Mains 2024 Date Sheet Released - Check Exam Schedule", badge: "Important", time: "5 hours ago", link: "/latest-jobs" },
    { text: "Delhi Police Constable 2024 - 7500+ Posts Application Extended", badge: "Extended", time: "1 day ago", link: "/latest-jobs" },
    { text: "IBPS Clerk Prelims Score Card Available - Direct Link Inside", badge: "Result", time: "1 day ago", link: "/results" },
  ];

  return (
    <Card className="shadow-card">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Latest News & Blogs</CardTitle>
                  <Link to="/news-blogs">
                    <Button variant="link" size="sm" className="text-primary text-sm">View All</Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="pb-3 border-b border-border last:border-0 last:pb-0">
                  <div className="flex items-start gap-2 mb-1">
                    <Badge variant="secondary" className="text-xs">UPSC</Badge>
                    <span className="text-xs text-muted-foreground">2 hours ago</span>
                  </div>
                  <Link to="/news-blogs" className="text-sm font-medium text-foreground hover:text-primary transition-colors line-clamp-2">
                    UPSC 2025 Notification Released: Key Changes You Need to Know
                  </Link>
                </div>
                <div className="pb-3 border-b border-border last:border-0 last:pb-0">
                  <div className="flex items-start gap-2 mb-1">
                    <Badge variant="secondary" className="text-xs">SSC</Badge>
                    <span className="text-xs text-muted-foreground">5 hours ago</span>
                  </div>
                  <Link to="/news-blogs" className="text-sm font-medium text-foreground hover:text-primary transition-colors line-clamp-2">
                    SSC CGL 2024: Strategy to Crack Tier-I in First Attempt
                  </Link>
                </div>
                <div className="pb-3 border-b border-border last:border-0 last:pb-0">
                  <div className="flex items-start gap-2 mb-1">
                    <Badge variant="secondary" className="text-xs">Railway</Badge>
                    <span className="text-xs text-muted-foreground">1 day ago</span>
                  </div>
                  <Link to="/news-blogs" className="text-sm font-medium text-foreground hover:text-primary transition-colors line-clamp-2">
                    Railway Recruitment 2024: Over 1 Lakh Vacancies Expected
                  </Link>
                </div>
                <div className="pb-3 border-b border-border last:border-0 last:pb-0">
                  <div className="flex items-start gap-2 mb-1">
                    <Badge variant="secondary" className="text-xs">Banking</Badge>
                    <span className="text-xs text-muted-foreground">1 day ago</span>
                  </div>
                  <Link to="/news-blogs" className="text-sm font-medium text-foreground hover:text-primary transition-colors line-clamp-2">
                    Banking Exams 2025 Calendar: All Important Dates
                  </Link>
                </div>
                <div className="pb-3 border-b border-border last:border-0 last:pb-0">
                  <div className="flex items-start gap-2 mb-1">
                    <Badge variant="secondary" className="text-xs">Defence</Badge>
                    <span className="text-xs text-muted-foreground">2 days ago</span>
                  </div>
                  <Link to="/news-blogs" className="text-sm font-medium text-foreground hover:text-primary transition-colors line-clamp-2">
                    Defence Recruitment Updates: NDA, CDS, and AFCAT 2025
                  </Link>
                </div>
              </CardContent>
            </Card>
  );
};

export default LatestUpdates;
