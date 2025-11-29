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
  "state_psc",
  "ssc",
  "medical",
  "engineering",
  "banking",
  "railway",
  "defence"
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
              className="w-full px-4 py-2 border-2 border-blue-900 rounded-md bg-background text-foreground"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Category Buttons */}
          <div className="max-w-5xl mx-auto mb-8 flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                className={`px-4 py-2 text-sm rounded-full border transition ${category === cat
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
          <div className="max-w-5xl mx-auto grid gap-4 sm:grid-cols-1 md:grid-cols-2">
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

                      {syllabus.subjects && syllabus.subjects.length > 0 && (
                        <p className="text-xs text-blue-800">
                          <strong>Topics:</strong> {syllabus.subjects.join(", ")}
                        </p>
                      )}

                      <a href={syllabus.url} target="_blank" rel="noopener noreferrer">
                        <Button size="sm" className="mt-3">
                          Download Syllabus PDF
                        </Button>
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )).reverse()}
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
