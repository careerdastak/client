// import { Link } from "react-router-dom";
// import Header from "@/components/Header";
// import Footer from "@/components/Footer";
// import { Card, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { FileText } from "lucide-react";

// const Syllabus = () => {
//   const syllabi = [
//     {
//       id: "1",
//       title: "UPSC Civil Services 2025 Complete Syllabus & Exam Pattern",
//       description: "Prelims (GS + CSAT), Mains (9 Papers) & Interview - Download PDF",
//       organization: "Union Public Service Commission",
//       subjects: "General Studies (History, Polity, Geography, Economy), Essay, Optional Subject, CSAT",
//     },
//     {
//       title: "SSC CGL 2024 Syllabus - Tier 1, 2, 3 & 4 with Exam Pattern",
//       description: "Subject-wise Topics, Marks Distribution & Previous Year Papers",
//       organization: "Staff Selection Commission",
//       subjects: "Quantitative Aptitude, General Intelligence & Reasoning, General Awareness, English",
//     },
//     {
//       title: "RRB NTPC Graduate Level CBT 1 & 2 Syllabus 2024",
//       description: "Mathematics, GA, Reasoning - Stage wise detailed syllabus",
//       organization: "Railway Recruitment Board",
//       subjects: "Mathematics, General Intelligence, General Awareness, General Science",
//     },
//     {
//       title: "IBPS PO XIII Prelims & Mains Syllabus 2024 - Download PDF",
//       description: "Reasoning, Quant, English, Computer & Banking Awareness Topics",
//       organization: "Institute of Banking Personnel Selection",
//       subjects: "Reasoning Ability, Quantitative Aptitude, English Language, Computer Knowledge, Banking Awareness",
//     },
//     {
//       title: "All State PSC Prelims & Mains Syllabus 2024-25 (UPPSC, BPSC, MPPSC, RPSC)",
//       description: "State-wise Detailed Syllabus for Provincial Civil Services",
//       organization: "State Public Service Commissions",
//       subjects: "General Studies, History, Geography, Polity, Economy, Optional Papers",
//     },
//     {
//       title: "Delhi Police Constable Complete Syllabus & Exam Pattern 2024",
//       description: "Computer Based Test - All Sections Detailed",
//       organization: "Staff Selection Board, Delhi Police",
//       subjects: "General Knowledge & Current Affairs, Reasoning, Numerical Ability, Computer Fundamentals",
//     },
//     {
//       title: "Indian Navy Agniveer SSR Syllabus 2025 - Science & Mathematics",
//       description: "Class 10+2 Level Physics, Chemistry, Maths Topics",
//       organization: "Indian Navy - Ministry of Defence",
//       subjects: "Physics, Chemistry, Mathematics (10+2 Level), English, General Awareness",
//     },
//     {
//       title: "IBPS Clerk Prelims & Mains Syllabus 2024 - Complete PDF",
//       description: "Section-wise Topics with Weightage and Previous Papers",
//       organization: "Institute of Banking Personnel Selection",
//       subjects: "Reasoning Ability, Numerical Ability, English Language, Computer Knowledge, General Awareness",
//     },
//     {
//       title: "SSC CHSL (10+2) Tier 1 & 2 Syllabus 2024 - Detailed Topics",
//       description: "Combined Higher Secondary Level - All Sections",
//       organization: "Staff Selection Commission",
//       subjects: "English Language, General Intelligence, Quantitative Aptitude, General Awareness",
//     },
//     {
//       title: "SBI Clerk Junior Associate Syllabus 2025 - Prelims & Mains",
//       description: "Topic-wise Syllabus with Exam Pattern & Previous Papers",
//       organization: "State Bank of India",
//       subjects: "Reasoning Ability, Numerical Ability, English Language, General Awareness, Computer Aptitude",
//     },
//   ];

//   return (
//     <div className="min-h-screen bg-background flex flex-col">
//       <Header />
      
//       <main className="flex-1">
//         <div className="bg-gradient-to-br from-primary via-primary/90 to-accent text-primary-foreground py-8 md:py-12">
//           <div className="container mx-auto px-4">
//             <h1 className="text-3xl md:text-4xl font-bold mb-2">Exam Syllabus</h1>
//             <p className="text-primary-foreground/90">Complete syllabus and exam pattern for all government exams</p>
//           </div>
//         </div>

//         <div className="container mx-auto px-4 py-6 md:py-8">
//           <div className="max-w-5xl mx-auto space-y-4">
//             {syllabi.map((syllabus, index) => (
//               <Card key={index} className="shadow-card hover:shadow-lg transition-shadow">
//                 <CardContent className="p-4 md:p-6">
//                   <div className="flex gap-4">
//                     <div className="shrink-0 mt-1">
//                       <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
//                         <FileText className="h-6 w-6 text-primary" />
//                       </div>
//                     </div>
//                     <div className="flex-1 min-w-0">
//                       <h3 className="font-semibold text-foreground text-base md:text-lg mb-1">
//                         {syllabus.title}
//                       </h3>
//                       <p className="text-sm text-muted-foreground mb-2">{syllabus.description}</p>
//                       <p className="text-sm text-muted-foreground mb-2">{syllabus.organization}</p>
//                       <p className="text-xs text-muted-foreground">
//                         <strong>Topics:</strong> {syllabus.subjects}
//                       </p>
//                       <Link to={`/syllabus/${syllabus.id || '1'}`}>
//                         <Button size="sm" className="mt-3">Download Syllabus PDF</Button>
//                       </Link>
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>
//             ))}
//           </div>
//         </div>
//       </main>

//       <Footer />
//     </div>
//   );
// };

// export default Syllabus;


import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";

const CATEGORIES = [
  "all",
  "upsc",
  "ssc",
  "banking",
  "jee",
  "neet",
  "railway",
  "defence",
  "state_psc",
  "class10",
  "class12"
];

const Syllabus = () => {
  const [syllabi, setSyllabi] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [category, setCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSyllabus = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/syllabus`);
        setSyllabi(res.data.data || []);
        setFiltered(res.data.data || []);
      } catch (err) {
        console.error("Error loading syllabus");
      } finally {
      setLoading(false);
    }
    };

    fetchSyllabus();
  }, []);

  // Filtering Logic
  useEffect(() => {
    let data = [...syllabi];

    // Filter by category
    if (category !== "all") {
      data = data.filter((s) => s.category?.toLowerCase() === category);
    }

    // Search filter
    if (search.trim() !== "") {
      const q = search.toLowerCase();
      data = data.filter((s) =>
        s.title.toLowerCase().includes(q) ||
        s.description?.toLowerCase().includes(q) ||
        s.organization?.toLowerCase().includes(q)
      );
    }

    setFiltered(data);
  }, [category, search, syllabi]);

    if (loading) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1">
        <div className="bg-gradient-to-br from-primary via-primary/90 to-accent text-primary-foreground py-8 md:py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Exam Syllabus</h1>
            <p className="text-primary-foreground/90">
              Complete syllabus and exam pattern for all government exams
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-6 md:py-8">
          
          {/* Search Bar */}
          <div className="max-w-4xl mx-auto mb-6">
            <input
              type="text"
              placeholder="Search syllabus..."
              className="w-full px-4 py-2 border rounded-md bg-background text-foreground border-muted"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Category Buttons */}
          <div className="max-w-5xl mx-auto mb-8 flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                className={`px-4 py-2 text-sm rounded-full border transition ${
                  category === cat
                    ? "bg-primary text-primary-foreground border-primary"
                    : "border-muted hover:bg-muted"
                }`}
                onClick={() => setCategory(cat)}
              >
                {cat === "all" ? "All" : cat.toUpperCase().replace("_", " ")}
              </button>
            ))}
          </div>

          {/* Syllabus Cards */}
          <div className="max-w-5xl mx-auto space-y-4">
            {filtered.map((syllabus) => (
              <Card key={syllabus._id} className="shadow-card hover:shadow-lg transition-shadow">
                <CardContent className="p-4 md:p-6">
                  <div className="flex gap-4">
                    <div className="shrink-0 mt-1">
                      <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <FileText className="h-6 w-6 text-primary" />
                      </div>
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-foreground text-base md:text-lg mb-1">
                        {syllabus.title}
                      </h3>

                      <p className="text-sm text-muted-foreground mb-2">
                        {syllabus.description}
                      </p>

                      <p className="text-sm text-muted-foreground mb-2">
                        {syllabus.organization}
                      </p>

                      <p className="text-xs text-muted-foreground">
                        <strong>Topics:</strong> {syllabus.subjects?.join(", ")}
                      </p>

                      <a href={syllabus.url} target="_blank" rel="noopener noreferrer">
                        <Button size="sm" className="mt-3">
                          Download Syllabus PDF
                        </Button>
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filtered.length === 0 && (
            <p className="text-center text-muted-foreground mt-6">No syllabus found.</p>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Syllabus;
