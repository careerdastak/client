import { Calendar, MapPin, GraduationCap, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

interface JobCardProps {
  id: string;
  title: string;
  slug: string;
  organization: string;
  posts?: string | number;
  qualification?: string;
  location?: string;
  lastDate?: string | null;
  isNew?: boolean;
  status?: {
    isApplicationOpen?: boolean;
    isAdmitCardAvailable?: boolean;
    isAnswerKeyReleased?: boolean;
    isResultDeclared?: boolean;
    isCorrectionWindowOpen?: boolean;
  };
}

const formatDate = (dateValue: any): string | null => {
  if (!dateValue) return null;

  if (typeof dateValue === "string" && dateValue.includes(" ")) {
    return dateValue;
  }

  try {
    const d = new Date(dateValue);
    if (isNaN(d.getTime())) return null;

    return d.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  } catch {
    return null;
  }
};

const StatusBadges = ({ status }: { status: JobCardProps["status"] }) => {
  if (!status) return null;

  const {
    isApplicationOpen,
    isAdmitCardAvailable,
    isAnswerKeyReleased,
    isResultDeclared,
    isCorrectionWindowOpen,
  } = status;

  const activeStatuses = [];

  if (isApplicationOpen) {
    activeStatuses.push(
      <Badge key="application" className="bg-emerald-100 text-emerald-800 border-emerald-200">
        Application Open
      </Badge>
    );
  }

  if (isAdmitCardAvailable) {
    activeStatuses.push(
      <Badge key="admitcard" className="bg-purple-100 text-purple-800 border-purple-200">
        Admit Card Out
      </Badge>
    );
  }

  if (isAnswerKeyReleased) {
    activeStatuses.push(
      <Badge key="answerkey" className="bg-blue-100 text-blue-800 border-blue-200">
        Answer Key Out
      </Badge>
    );
  }

  if (isResultDeclared) {
    activeStatuses.push(
      <Badge key="result" className="bg-green-100 text-green-800 border-green-200">
        Result Declared
      </Badge>
    );
  }

  if (isCorrectionWindowOpen) {
    activeStatuses.push(
      <Badge key="correction" className="bg-amber-100 text-amber-800 border-amber-200">
        Correction Open
      </Badge>
    );
  }

  if (activeStatuses.length === 0) {
    return <Badge variant="outline">Upcoming</Badge>;
  }

  return <div className="flex flex-wrap gap-1">{activeStatuses}</div>;
};

const JobCard = ({
  id,
  title,
  slug,
  organization,
  posts,
  qualification,
  location,
  lastDate,
  isNew,
  status,
}: JobCardProps) => {
  const formattedLast = (() => {
    const formatted = formatDate(lastDate);

    if (!formatted) return "Notified Soon";

    const rawDate = new Date(lastDate as any);
    const today = new Date();

    if (!isNaN(rawDate.getTime()) && rawDate < today) {
      return `${formatted} (Closed)`;
    }

    return formatted;
  })();

  return (
    <Link to={`/jobs/${slug}`}>
      <Card className="hover:shadow-hover transition-all duration-300 cursor-pointer border-border w-full">
        <CardContent className="p-5">

          {/* Header */}
          <div className="mb-3">
            <h3 className="font-semibold text-lg text-foreground mb-1 hover:text-primary transition-colors">
              {title}
            </h3>
            <p className="text-sm text-muted-foreground">{organization}</p>

            {/* MOBILE — Badge Row Just Below Title */}
            <div className="flex sm:hidden flex-wrap gap-2 mt-2">
              {isNew && <Badge className="bg-success text-success-foreground">New</Badge>}
              <StatusBadges status={status} />
            </div>

            {/* DESKTOP — Badge on Right Side */}
            <div className="hidden sm:flex flex-col items-end gap-2 -mt-8">
              {isNew && <Badge className="bg-success text-success-foreground">New</Badge>}
              <StatusBadges status={status} />
            </div>
          </div>

          {/* Details */}
          <div className="space-y-2 mb-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <GraduationCap className="h-4 w-4" />
              <span className="line-clamp-2">{qualification ?? "—"}</span>
            </div>

            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>{location ?? "All India"}</span>
            </div>

            <div className="flex items-center gap-2 text-sm">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="text-foreground">
                Last Date:{" "}
                <span className="font-semibold text-destructive">{formattedLast}</span>
              </span>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-3 border-t border-border">
            <span className="text-sm text-muted-foreground">
              Total Posts:{" "}
              <span className="font-semibold text-foreground">{posts ?? "—"}</span>
            </span>

            <button className="flex items-center gap-1 text-sm font-medium text-primary hover:text-accent transition-colors">
              View Details <ArrowRight className="h-4 w-4" />
            </button>
          </div>

        </CardContent>
      </Card>
    </Link>
  );
};

export default JobCard;
