import { Briefcase, Building2, Landmark, Train, GraduationCap, Shield } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";

const CategoryFilter = () => {
  const categories = [
    { icon: Building2, label: "मतदाता सेवा पोर्टल (SIR)", color: "bg-blue-50 text-blue-600 dark:bg-blue-950/50", link: "https://voters.eci.gov.in/" },
    { icon: GraduationCap, label: "UP Scholarship", color: "bg-indigo-50 text-indigo-600 dark:bg-indigo-950/50", link: "https://scholarship.up.gov.in/index.aspx" },
    { icon: Landmark, label: "State Govt", color: "bg-purple-50 text-purple-600 dark:bg-purple-950/50", link: "/latest-jobs" },
    { icon: Landmark, label: "Bank Jobs", color: "bg-green-50 text-green-600 dark:bg-green-950/50", link: "/latest-jobs" },
    { icon: Train, label: "Railway", color: "bg-orange-50 text-orange-600 dark:bg-orange-950/50", link: "/latest-jobs" },
    { icon: Shield, label: "Defence", color: "bg-red-50 text-red-600 dark:bg-red-950/50", link: "/latest-jobs" },
  ];

  return (
    <section className="mb-6 ">
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {categories.map((category, index) => {
          const Icon = category.icon;
          return (
            <Link key={index} to={category.link}>
              <Card className="px-4 py-2 flex items-center gap-2 cursor-pointer hover:shadow-md transition-shadow border-border whitespace-nowrap">
                <div className={`p-1.5 rounded-lg ${category.color}`}>
                  <Icon className="h-4 w-4" />
                </div>
                <span className="text-sm font-medium text-foreground">
                  {category.label}
                </span>
              </Card>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default CategoryFilter;
