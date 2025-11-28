import { useParams, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, FileText, BookOpen, Download } from "lucide-react";

const getSyllabusData = (id: string) => {
  const syllabi: Record<string, any> = {
    "1": {
      title: "UPSC Civil Services 2025 Complete Syllabus & Exam Pattern",
      description: "Prelims (GS + CSAT), Mains (9 Papers) & Interview - Download PDF",
      organization: "Union Public Service Commission",
      subjects: "General Studies (History, Polity, Geography, Economy), Essay, Optional Subject, CSAT",
      examPattern: {
        prelims: {
          paper1: "General Studies - 200 Marks",
          paper2: "CSAT - 200 Marks (Qualifying)",
        },
        mains: "9 Papers - 1750 Marks Total",
        interview: "275 Marks",
      },
      detailedTopics: [
        {
          subject: "Prelims - General Studies Paper I",
          topics: [
            "Current events of national and international importance",
            "History of India and Indian National Movement",
            "Indian and World Geography",
            "Indian Polity and Governance",
            "Economic and Social Development",
            "Environmental ecology, Bio-diversity and Climate Change",
            "General Science",
          ],
        },
        {
          subject: "Prelims - CSAT Paper II",
          topics: [
            "Comprehension",
            "Interpersonal skills including communication skills",
            "Logical reasoning and analytical ability",
            "Decision-making and problem-solving",
            "General mental ability",
            "Basic numeracy",
            "Data interpretation",
          ],
        },
        {
          subject: "Mains - Essay Paper",
          topics: ["Essay writing on current topics - 250 Marks"],
        },
      ],
      links: [
        { label: "Download Complete Syllabus PDF", url: "#" },
        { label: "Exam Pattern Details", url: "#" },
        { label: "Previous Year Papers", url: "#" },
      ],
    },
  };
  return syllabi[id] || null;
};

const SyllabusDetail = () => {
  const { id } = useParams();
  const syllabus = getSyllabusData(id || "");

  if (!syllabus) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl font-bold mb-4">Syllabus Not Found</h1>
          <Link to="/syllabus">
            <Button>Back to Syllabus</Button>
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="bg-gradient-to-br from-primary via-primary/90 to-accent text-primary-foreground py-6 md:py-8">
          <div className="container mx-auto px-4 max-w-5xl">
            <Link to="/syllabus" className="inline-flex items-center gap-2 text-primary-foreground/90 hover:text-primary-foreground mb-4 transition-colors">
              <ArrowLeft className="h-4 w-4" />
              Back to Syllabus
            </Link>
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
              <div className="flex-1">
                <h1 className="text-2xl md:text-3xl font-bold mb-2">{syllabus.title}</h1>
                <p className="text-primary-foreground/90 text-lg mb-2">{syllabus.organization}</p>
                <p className="text-primary-foreground/80">{syllabus.description}</p>
              </div>
              <Button size="lg" className="bg-white text-primary hover:bg-white/90 font-semibold shadow-lg">
                <Download className="h-4 w-4 mr-2" />
                Download PDF
              </Button>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-6 md:py-8 max-w-5xl">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-6">
              <Card>
                <CardHeader className="bg-accent/5">
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-primary" />
                    Exam Pattern
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="p-4 rounded-lg bg-muted/50">
                      <h4 className="font-semibold text-foreground mb-2">Preliminary Examination</h4>
                      <ul className="space-y-1 text-sm">
                        <li className="text-muted-foreground">• {syllabus.examPattern.prelims.paper1}</li>
                        <li className="text-muted-foreground">• {syllabus.examPattern.prelims.paper2}</li>
                      </ul>
                    </div>
                    <div className="p-4 rounded-lg bg-muted/50">
                      <h4 className="font-semibold text-foreground mb-2">Mains Examination</h4>
                      <p className="text-sm text-muted-foreground">{syllabus.examPattern.mains}</p>
                    </div>
                    <div className="p-4 rounded-lg bg-muted/50">
                      <h4 className="font-semibold text-foreground mb-2">Personality Test (Interview)</h4>
                      <p className="text-sm text-muted-foreground">{syllabus.examPattern.interview}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {syllabus.detailedTopics.map((section: any, index: number) => (
                <Card key={index}>
                  <CardHeader className="bg-accent/5">
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5 text-primary" />
                      {section.subject}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <ul className="space-y-2">
                      {section.topics.map((topic: string, topicIndex: number) => (
                        <li key={topicIndex} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                          <span className="text-primary font-bold mt-0.5">•</span>
                          <span className="text-foreground flex-1">{topic}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="space-y-6">
              <Card className="sticky top-4 border-primary/20">
                <CardHeader className="bg-primary/5">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Download className="h-5 w-5 text-primary" />
                    Downloads
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6 space-y-3">
                  {syllabus.links.map((link: any, index: number) => (
                    <Button key={index} variant={index === 0 ? "default" : "outline"} className="w-full font-semibold" size="lg">
                      {link.label}
                    </Button>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SyllabusDetail;
