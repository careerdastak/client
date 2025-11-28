import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { BookOpen, FileText, Video, Download, ExternalLink, FileQuestion } from "lucide-react";

const Resources = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("study-materials");

  const resources = [
    {
      id: "upsc-coaching",
      category: "UPSC Resources",
      icon: BookOpen,
      color: "bg-blue-500",
      items: [
        {
          title: "BYJU'S IAS Coaching",
          description: "Comprehensive UPSC preparation with live classes and study material",
          link: "https://byjus.com/ias/",
          institute: "BYJU'S",
          badge: "Popular",
        },
        {
          title: "Unacademy UPSC Preparation",
          description: "Learn from India's top educators with free and premium courses",
          link: "https://unacademy.com/goal/upsc-civil-services-examination-ias-preparation/",
          institute: "Unacademy",
          badge: "Popular",
        },
        {
          title: "Vision IAS Study Material",
          description: "Current affairs, test series and comprehensive UPSC content",
          link: "https://www.visionias.in/",
          institute: "Vision IAS",
        },
        {
          title: "Drishti IAS Resources",
          description: "Daily current affairs, editorials and prelims practice",
          link: "https://www.drishtiias.com/",
          institute: "Drishti IAS",
          badge: "Updated",
        },
        {
          title: "InsightsIAS Test Series",
          description: "Prelims and Mains test series with detailed solutions",
          link: "https://www.insightsonindia.com/",
          institute: "Insights IAS",
        },
        {
          title: "ClearIAS Free Resources",
          description: "Free study material, notes and online test series for UPSC",
          link: "https://www.clearias.com/",
          institute: "ClearIAS",
        },
      ],
    },
    {
      id: "ssc-banking",
      category: "SSC & Banking",
      icon: FileText,
      color: "bg-green-500",
      items: [
        {
          title: "Adda247 SSC & Banking",
          description: "Live classes, mock tests and study material for all govt exams",
          link: "https://www.adda247.com/",
          institute: "Adda247",
          badge: "Popular",
        },
        {
          title: "Testbook SSC Resources",
          description: "Practice tests, quizzes and study notes for SSC exams",
          link: "https://testbook.com/ssc",
          institute: "Testbook",
        },
        {
          title: "Oliveboard Banking Prep",
          description: "Mock tests and video courses for bank PO, clerk exams",
          link: "https://www.oliveboard.in/bank-exams/",
          institute: "Oliveboard",
          badge: "Updated",
        },
        {
          title: "Gradeup SSC & Railways",
          description: "Free mock tests, current affairs and study material",
          link: "https://gradeup.co/ssc-exams",
          institute: "Gradeup",
        },
        {
          title: "AffairsCloud Current Affairs",
          description: "Daily GK updates and banking awareness for competitive exams",
          link: "https://www.affairscloud.com/",
          institute: "AffairsCloud",
        },
        {
          title: "SmartKeeda Online Tests",
          description: "Free online test series for banking and SSC exams",
          link: "https://www.smartkeeda.com/",
          institute: "SmartKeeda",
        },
      ],
    },
    {
      id: "engineering-medical",
      category: "JEE & NEET",
      icon: Video,
      color: "bg-purple-500",
      items: [
        {
          title: "Allen Kota Resources",
          description: "Study material and test series from India's top coaching institute",
          link: "https://www.allen.ac.in/",
          institute: "Allen",
          badge: "Popular",
        },
        {
          title: "Physics Wallah",
          description: "Free video lectures and notes for JEE & NEET by Alakh Pandey",
          link: "https://www.pw.live/",
          institute: "Physics Wallah",
          badge: "Popular",
        },
        {
          title: "Vedantu JEE/NEET Courses",
          description: "Live online classes with India's best teachers",
          link: "https://www.vedantu.com/",
          institute: "Vedantu",
        },
        {
          title: "Unacademy JEE Preparation",
          description: "Comprehensive courses and practice for engineering entrance",
          link: "https://unacademy.com/goal/jee-main-and-advanced-preparation/",
          institute: "Unacademy",
        },
        {
          title: "Embibe JEE/NEET Practice",
          description: "AI-powered learning platform with personalized tests",
          link: "https://www.embibe.com/",
          institute: "Embibe",
          badge: "New",
        },
        {
          title: "Toppr Engineering Resources",
          description: "Study materials, practice questions and doubt solving",
          link: "https://www.toppr.com/",
          institute: "Toppr",
        },
      ],
      pyqs: [
        {
          title: "JEE Main 2024 - Physics PYQ",
          year: "2024",
          subject: "physics",
          questions: 5,
          description: "Previous year questions from JEE Main 2024 Physics paper",
        },
        {
          title: "JEE Main 2024 - Chemistry PYQ",
          year: "2024",
          subject: "chemistry",
          questions: 5,
          description: "Previous year questions from JEE Main 2024 Chemistry paper",
        },
        {
          title: "JEE Main 2024 - Mathematics PYQ",
          year: "2024",
          subject: "mathematics",
          questions: 5,
          description: "Previous year questions from JEE Main 2024 Mathematics paper",
        },
      ],
    },
    {
      id: "state-exams",
      category: "State PSC & Others",
      icon: Download,
      color: "bg-orange-500",
      items: [
        {
          title: "Study IQ Education",
          description: "Free video courses for state PSC and government exams",
          link: "https://www.studyiq.com/",
          institute: "Study IQ",
          badge: "Popular",
        },
        {
          title: "KD Campus Resources",
          description: "Study material for SSC, Railways and state PSC exams",
          link: "https://www.kdcampus.in/",
          institute: "KD Campus",
        },
        {
          title: "Mahendras Banking & SSC",
          description: "English and quantitative aptitude preparation material",
          link: "https://www.mahendras.org/",
          institute: "Mahendras",
        },
        {
          title: "Paramount Coaching",
          description: "Study notes and test series for all competitive exams",
          link: "https://www.paramountcoaching.com/",
          institute: "Paramount",
        },
        {
          title: "Youth Competition Times",
          description: "Monthly magazine with current affairs and GK",
          link: "https://yct.in/",
          institute: "YCT",
          badge: "Updated",
        },
        {
          title: "Jagran Josh Resources",
          description: "Latest exam updates, study material and current affairs",
          link: "https://www.jagranjosh.com/",
          institute: "Jagran Josh",
        },
      ],
    },
  ];


  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">Coaching Institute Resources</h1>
          <p className="text-muted-foreground text-lg">
            Access study materials from top coaching institutes across India
          </p>
        </div>

        {/* Resource Categories with Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 mb-6 h-auto">
            {resources.map((category) => (
              <TabsTrigger 
                key={category.id} 
                value={category.id}
                className="flex flex-col items-center gap-1 py-3"
              >
                <category.icon className="h-5 w-5" />
                <span className="text-xs sm:text-sm">{category.category}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {resources.map((category) => (
            <TabsContent key={category.id} value={category.id} className="space-y-6">
              {/* PYQs Section for JEE & NEET */}
              {category.id === "engineering-medical" && category.pyqs && (
                <div className="mb-8">
                  <div className="flex items-center gap-2 mb-4">
                    <FileQuestion className="h-5 w-5 text-primary" />
                    <h2 className="text-xl font-semibold">Previous Year Questions (PYQs)</h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {category.pyqs.map((pyq, index) => (
                      <Card key={index} className="hover:shadow-lg transition-all hover:-translate-y-1 border-primary/20">
                        <CardHeader className="pb-3">
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <div className="space-y-1">
                              <Badge variant="default" className="mb-2">PYQ {pyq.year}</Badge>
                              <CardTitle className="text-lg">{pyq.title}</CardTitle>
                            </div>
                          </div>
                          <CardDescription>
                            {pyq.description} • {pyq.questions} Questions
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2">
                          <Button 
                            variant="default" 
                            className="w-full"
                            onClick={() => navigate(`/test/${pyq.subject}`)}
                          >
                            <FileQuestion className="h-4 w-4 mr-2" />
                            Give Test
                          </Button>
                          <Button variant="outline" className="w-full">
                            <Download className="h-4 w-4 mr-2" />
                            Download PDF
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                  
                  <div className="mt-8 border-t pt-8">
                    <h2 className="text-xl font-semibold mb-4">Coaching Resources</h2>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.items.map((item, itemIndex) => (
                  <Card key={itemIndex} className="hover:shadow-lg transition-all hover:-translate-y-1">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div className="space-y-1">
                          <div className="text-xs font-medium text-muted-foreground">{item.institute}</div>
                          <CardTitle className="text-lg line-clamp-2">{item.title}</CardTitle>
                        </div>
                        {item.badge && (
                          <Badge variant={item.badge === "New" ? "default" : "secondary"} className="shrink-0">
                            {item.badge}
                          </Badge>
                        )}
                      </div>
                      <CardDescription className="line-clamp-2">
                        {item.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button variant="outline" className="w-full group" asChild>
                        <a href={item.link} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4 mr-2 group-hover:translate-x-0.5 transition-transform" />
                          Visit Website
                        </a>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        {/* Information Box */}
        <Card className="mt-12 bg-primary/5 border-primary/20">
          <CardContent className="pt-6 text-center">
            <h3 className="text-xl font-semibold mb-2">Explore Premium Coaching Resources</h3>
            <p className="text-muted-foreground mb-4">
              Access study materials and courses from India's leading coaching institutes. Click on any resource to visit their official website.
            </p>
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <ExternalLink className="h-4 w-4" />
              <span>All links redirect to official coaching websites</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
};

export default Resources;