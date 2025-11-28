import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Newspaper, Calendar, User, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const NewsBlogs = () => {
  const newsArticles = [
    {
      id: 1,
      title: "UPSC 2025 Notification Released: Key Changes You Need to Know",
      excerpt: "Union Public Service Commission has released the official notification for Civil Services Examination 2025 with significant changes in the pattern...",
      category: "UPSC",
      author: "Editorial Team",
      date: "15 Nov 2024",
      readTime: "5 min read",
      image: "https://images.unsplash.com/photo-1554224311-beee2c91c77b?w=800&h=500&fit=crop",
    },
    {
      id: 2,
      title: "SSC CGL 2024: Strategy to Crack Tier-I in First Attempt",
      excerpt: "Complete preparation strategy for SSC CGL Tier-I examination including time management, important topics, and mock test analysis...",
      category: "SSC",
      author: "Priya Sharma",
      date: "14 Nov 2024",
      readTime: "8 min read",
      image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=500&fit=crop",
    },
    {
      id: 3,
      title: "Railway Recruitment 2024: Over 1 Lakh Vacancies Expected",
      excerpt: "Railway Recruitment Boards are expected to announce massive recruitment drive for various posts including NTPC, Group D, and technical positions...",
      category: "Railway",
      author: "Rajesh Kumar",
      date: "13 Nov 2024",
      readTime: "6 min read",
      image: "https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=800&h=500&fit=crop",
    },
    {
      id: 4,
      title: "Banking Exams 2025 Calendar: All Important Dates",
      excerpt: "Comprehensive calendar of all major banking examinations including IBPS, SBI, RBI for the year 2025 with notification and exam dates...",
      category: "Banking",
      author: "Amit Singh",
      date: "12 Nov 2024",
      readTime: "4 min read",
      image: "https://images.unsplash.com/photo-1501167786227-4cba60f6d58f?w=800&h=500&fit=crop",
    },
    {
      id: 5,
      title: "Defence Recruitment Updates: NDA, CDS, and AFCAT 2025",
      excerpt: "Latest updates on defence recruitment examinations for 2025 including notification dates, eligibility criteria, and selection process...",
      category: "Defence",
      author: "Vikram Yadav",
      date: "11 Nov 2024",
      readTime: "7 min read",
      image: "https://images.unsplash.com/photo-1622675363311-3e1904dc1885?w=800&h=500&fit=crop",
    },
    {
      id: 6,
      title: "State Government Jobs Alert: Latest Notifications",
      excerpt: "Round-up of latest state government job notifications across India including teaching, police, and administrative positions...",
      category: "State Govt",
      author: "Neha Gupta",
      date: "10 Nov 2024",
      readTime: "5 min read",
      image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=500&fit=crop",
    },
  ];

  const categories = ["All", "UPSC", "SSC", "Railway", "Banking", "Defence", "State Govt"];

  

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Newspaper className="h-8 w-8 text-primary" />
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">
              News & Blogs
            </h1>
          </div>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Stay updated with the latest news, exam updates, and career guidance articles
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          {categories.map((category) => (
            <Button
              key={category}
              variant={category === "All" ? "default" : "outline"}
              size="sm"
            >
              {category}
            </Button>
          ))}
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {newsArticles.map((article) => (
            <Card key={article.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <Link to={`/news-blogs/${article.id}`}>
                <div className="aspect-video overflow-hidden">
                  <img 
                    src={article.image} 
                    alt={article.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </Link>
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="secondary">{article.category}</Badge>
                  <span className="text-xs text-muted-foreground">{article.readTime}</span>
                </div>
                <Link to={`/news-blogs/${article.id}`}>
                  <CardTitle className="text-xl line-clamp-2 hover:text-primary transition-colors cursor-pointer">
                    {article.title}
                  </CardTitle>
                </Link>
                <CardDescription className="line-clamp-3">
                  {article.excerpt}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                  <div className="flex items-center gap-1">
                    <User className="h-4 w-4" />
                    <span>{article.author}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>{article.date}</span>
                  </div>
                </div>
                <Link to={`/news-blogs/${article.id}`}>
                  <Button variant="outline" className="w-full">
                    Read More <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default NewsBlogs;