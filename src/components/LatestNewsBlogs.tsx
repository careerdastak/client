import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Newspaper } from "lucide-react";
import { Link } from "react-router-dom";

const LatestNewsBlogs = () => {
  const newsItems = [
    {
      id: 1,
      title: "UPSC 2025 Notification Released: Key Changes You Need to Know",
      category: "UPSC",
      date: "15 Nov 2024",
      image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=250&fit=crop",
    },
    {
      id: 2,
      title: "SSC CGL 2024: Strategy to Crack Tier-I in First Attempt",
      category: "SSC",
      date: "14 Nov 2024",
      image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=250&fit=crop",
    },
    {
      id: 3,
      title: "Railway Recruitment 2024: Over 1 Lakh Vacancies Expected",
      category: "Railway",
      date: "13 Nov 2024",
      image: "https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=400&h=250&fit=crop",
    },
    {
      id: 4,
      title: "Banking Exams 2025 Calendar: All Important Dates",
      category: "Banking",
      date: "12 Nov 2024",
      image: "https://images.unsplash.com/photo-1501167786227-4cba60f6d58f?w=400&h=250&fit=crop",
    },
  ];

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Newspaper className="h-6 w-6 text-primary" />
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">Latest News & Blogs</h2>
        </div>
        <Link to="/news-blogs">
          <Button variant="outline" size="sm">View All</Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {newsItems.slice(0, 15).map((item) => (
          <Link key={item.id} to={`/news-blogs/${item.id}`}>
            <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group h-full">
              <div className="aspect-video overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardHeader className="pb-2">
                <Badge variant="secondary" className="w-fit mb-2">{item.category}</Badge>
                <CardTitle className="text-sm line-clamp-2 group-hover:text-primary transition-colors">
                  {item.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground">{item.date}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <div className="flex justify-center mt-6">
        <Link to="/news-blogs">
          <Button>View All News & Blogs</Button>
        </Link>
      </div>
    </div>
  );
};

export default LatestNewsBlogs;