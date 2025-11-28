import { Users, Briefcase, Trophy, TrendingUp } from "lucide-react";
import { Card } from "@/components/ui/card";

const StatsSection = () => {
  const stats = [
    { icon: Briefcase, label: "Active Vacancies", value: "82,450+", color: "text-blue-600" },
    { icon: Users, label: "Daily Visitors", value: "3.2 Lakh+", color: "text-green-600" },
    { icon: Trophy, label: "Updated Today", value: "156", color: "text-orange-600" },
    { icon: TrendingUp, label: "Trust Score", value: "4.8/5", color: "text-purple-600" },
  ];

  return (
    <section className="mb-8">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card
              key={index}
              className="p-4 md:p-6 flex flex-col items-center gap-2 md:gap-3 border-border hover:shadow-hover transition-all"
            >
              <Icon className={`h-8 w-8 md:h-10 md:w-10 ${stat.color}`} />
              <div className="text-center">
                <p className="text-xl md:text-2xl font-bold text-foreground">{stat.value}</p>
                <p className="text-xs md:text-sm text-muted-foreground">{stat.label}</p>
              </div>
            </Card>
          );
        })}
      </div>
    </section>
  );
};

export default StatsSection;
