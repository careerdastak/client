import { TrendingUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

const TrendingJobs = () => {
  const trending = [
    { title: "UPSC IAS 2024", views: "45K", applicants: "12K", trending: true },
    { title: "SSC CGL", views: "38K", applicants: "25K", trending: true },
    { title: "Railway Group D", views: "52K", applicants: "35K", trending: true },
    { title: "IBPS PO", views: "28K", applicants: "8K", trending: false },
    { title: "Delhi Police", views: "42K", applicants: "18K", trending: true },
  ];

  const gradients = [
    "from-pink-500 to-rose-500",
    "from-blue-500 to-indigo-500",
    "from-green-500 to-emerald-500",
    "from-purple-500 to-violet-500",
    "from-orange-500 to-amber-500",
  ];

  return (
    <section className="mb-6">
      <div className="flex items-center gap-2 mb-3">
        <TrendingUp className="h-4 w-4 text-primary" />
        <h2 className="text-lg font-semibold text-foreground">Trending Now</h2>
      </div>

      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
        {trending.map((job, index) => (
          <Link key={index} to="/latest-jobs">
            <Card
              className={`
                min-w-[200px] text-white border-0 cursor-pointer 
                bg-gradient-to-r ${gradients[index % gradients.length]}
                hover:scale-[1.03] hover:shadow-lg transition-all
                rounded-xl
              `}
            >
              <CardContent className="p-3 flex items-center justify-between gap-3">
                <div className="flex-1">
                  <h3 className="font-semibold text-sm mb-1">{job.title}</h3>

                  <div className="flex items-center gap-2 text-xs opacity-90">
                    <span>{job.views} views</span>
                  </div>
                </div>

                {job.trending && (
                  <Badge
                    variant="secondary"
                    className="text-xs bg-white/90 text-red-600 font-semibold"
                  >
                    Hot
                  </Badge>
                )}
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default TrendingJobs;
