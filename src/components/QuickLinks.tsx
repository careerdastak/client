import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Award, BookOpen, UserCheck, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

const QuickLinks = () => {
  const links = [
    { icon: FileText, label: "Tools", count: "Latest", href: "/tools" },
    { icon: Award, label: "12th Pass Jobs", count: "New", href: "/latest-jobs" },
    { icon: BookOpen, label: "Graduate Jobs", count: "Trending", href: "/latest-jobs" },
    { icon: UserCheck, label: "Police Bharti", count: "Popular", href: "/latest-jobs" },
    { icon: TrendingUp, label: "Banking Jobs", count: "Hot", href: "/latest-jobs" },
  ];

  return (
    <Card className="shadow-card">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Quick Links</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {links.map((link, index) => {
          const Icon = link.icon;
          return (
            <Link
              key={index}
              to={link.href}
              className="flex items-center justify-between p-3 rounded-lg hover:bg-secondary transition-colors group"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <Icon className="h-4 w-4" />
                </div>
                <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                  {link.label}
                </span>
              </div>
              <span className="text-xs font-semibold text-muted-foreground">
                {link.count}
              </span>
            </Link>
          );
        })}
      </CardContent>
    </Card>
  );
};

export default QuickLinks;
