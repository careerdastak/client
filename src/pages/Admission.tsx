import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { GraduationCap } from "lucide-react";

interface AdmissionType {
  _id: string;
  slug: string;
  title: string;
  organization: string;
  category: string;
  status?: {
    isPublished?: boolean;
    isApplicationOpen?: boolean;
    isCorrectionWindowOpen?: boolean;
    isAdmitCardAvailable?: boolean;
    isAnswerKeyReleased?: boolean;
    isResultDeclared?: boolean;
    isCounsellingActive?: boolean;
  };
  postDate?: string;
}

const StatusBadges = ({ status }: { status: AdmissionType['status'] }) => {
  if (!status) return <Badge variant="outline">Closed</Badge>;

  const {
    isApplicationOpen,
    isCorrectionWindowOpen,
    isAdmitCardAvailable,
    isAnswerKeyReleased,
    isResultDeclared,
    isCounsellingActive
  } = status;

  const activeStatuses = [];

  if (isApplicationOpen) activeStatuses.push(
    <Badge key="application" className="bg-emerald-100 text-emerald-800 border-emerald-200">Application Open</Badge>
  );
  if (isCorrectionWindowOpen) activeStatuses.push(
    <Badge key="correction" className="bg-amber-100 text-amber-800 border-amber-200">Correction Open</Badge>
  );
  if (isAdmitCardAvailable) activeStatuses.push(
    <Badge key="admitcard" className="bg-purple-100 text-purple-800 border-purple-200">Admit Card Out</Badge>
  );
  if (isAnswerKeyReleased) activeStatuses.push(
    <Badge key="answerkey" className="bg-blue-100 text-blue-800 border-blue-200">Answer Key Out</Badge>
  );
  if (isResultDeclared) activeStatuses.push(
    <Badge key="result" className="bg-green-100 text-green-800 border-green-200">Result Declared</Badge>
  );
  if (isCounsellingActive) activeStatuses.push(
    <Badge key="counselling" className="bg-indigo-100 text-indigo-800 border-indigo-200">Counselling Active</Badge>
  );

  if (activeStatuses.length === 0) return <Badge variant="outline">Closed</Badge>;

  return <div className="flex flex-wrap gap-2">{activeStatuses}</div>;
};

const Admission = () => {
  const [admissions, setAdmissions] = useState<AdmissionType[]>([]);
  const [filteredAdmissions, setFilteredAdmissions] = useState<AdmissionType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => { fetchAdmissions(); }, []);

  useEffect(() => {
    if (admissions.length > 0) {
      const filtered = admissions.filter(adm =>
        adm.status?.isPublished && adm.status?.isApplicationOpen
      );
      setFilteredAdmissions(filtered);
    }
  }, [admissions]);

  const fetchAdmissions = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/admissions`);
      const data = Array.isArray(res.data) ? res.data : res.data?.admissions;
      setAdmissions(data || []);
    } catch (err: any) {
      setError("Failed to load admission data!");
    } finally {
      setLoading(false);
    }
  };

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

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500 text-lg">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Banner */}
        <div className="bg-gradient-to-br from-primary via-primary/90 to-accent text-primary-foreground py-8 md:py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Admission Notifications</h1>
            <p className="text-primary-foreground/90">
              Latest admission updates for colleges and universities
            </p>

            {/* Status Summary */}
            <div className="mt-4 flex flex-wrap items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                <span>Showing {filteredAdmissions.length} active admissions</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-gray-400"></div>
                <span>{admissions.length - filteredAdmissions.length} closed/archived</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-6 md:py-8">
          <div className="flex items-center justify-between mb-6">
            <p className="text-muted-foreground">
              {filteredAdmissions.length} active admission{filteredAdmissions.length !== 1 ? "s" : ""} found
            </p>
            <Button variant="outline" size="sm">Filter</Button>
          </div>

          {filteredAdmissions.length === 0 ? (
            <div className="text-center py-12">
              <GraduationCap className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">No Active Admissions</h3>
              <p className="text-muted-foreground">
                {admissions.length > 0
                  ? "There are no currently open admissions. Check back later for new opportunities."
                  : "No admission notifications available right now."}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 max-w-5xl mx-auto">
              {filteredAdmissions.map(admission => (
                <Card key={admission._id} className="shadow-card hover:shadow-lg transition-shadow">
                  <CardContent className="p-4 md:p-6">
                    <div className="flex flex-col sm:flex-row gap-4">

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-foreground text-base md:text-lg mb-1">{admission.title}</h3>
                        <p className="text-sm text-muted-foreground mb-2">{admission.organization}</p>
                        <div className="mb-2"><StatusBadges status={admission.status} /></div>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-xs text-muted-foreground mb-3">
                          <span>Category: {admission.category || "General"}</span>
                          {admission.postDate && (
                            <span className="font-semibold">
                              Posted On: {new Date(admission.postDate).toLocaleDateString()}
                            </span>
                          )}
                        </div>
                        <Link to={`/admission/${admission.slug}`}>
                          <Button size="sm">View Details & Apply</Button>
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Admission;
