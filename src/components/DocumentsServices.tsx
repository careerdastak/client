import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, CreditCard, Building2, GraduationCap, FileCheck, UserCheck } from "lucide-react";
import { Link } from "react-router-dom";

const DocumentsServices = () => {
  const services = [
    {
      title: "Aadhaar Card",
      description: "Apply for new Aadhaar or update existing details",
      icon: CreditCard,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      link: "/documents",
    },
    {
      title: "PAN Card",
      description: "Apply for new PAN card or request correction",
      icon: FileText,
      color: "text-green-600",
      bgColor: "bg-green-50",
      link: "/documents",
    },
    {
      title: "Passport Services",
      description: "New passport application and renewal",
      icon: FileCheck,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      link: "/documents",
    },
    {
      title: "Voter ID Card",
      description: "Register as voter and download voter ID",
      icon: UserCheck,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      link: "/documents",
    },
    {
      title: "Driving License",
      description: "Apply for learning or permanent driving license",
      icon: CreditCard,
      color: "text-red-600",
      bgColor: "bg-red-50",
      link: "/documents",
    },
    {
      title: "Educational Certificates",
      description: "Download mark sheets and degree certificates",
      icon: GraduationCap,
      color: "text-indigo-600",
      bgColor: "bg-indigo-50",
      link: "/documents",
    },
    {
      title: "Income Certificate",
      description: "Apply for income certificate online",
      icon: FileText,
      color: "text-teal-600",
      bgColor: "bg-teal-50",
      link: "/documents",
    },
    {
      title: "Caste Certificate",
      description: "Apply for SC/ST/OBC caste certificate",
      icon: Building2,
      color: "text-pink-600",
      bgColor: "bg-pink-50",
      link: "/documents",
    },
  ];

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <FileText className="h-6 w-6 text-primary" />
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">Documents & Services</h2>
        </div>
        <Link to="/documents">
          <Button variant="outline" size="sm">View All</Button>
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {services.slice(0, 15).map((service, index) => {
          const Icon = service.icon;
          return (
            <Card 
              key={index} 
              className="hover:shadow-lg transition-all cursor-pointer group border-2 hover:border-primary"
            >
              <CardHeader className="text-center pb-2">
                <div className={`mx-auto mb-3 p-4 rounded-full ${service.bgColor} group-hover:scale-110 transition-transform`}>
                  <Icon className={`h-8 w-8 ${service.color}`} />
                </div>
                <CardTitle className="text-sm font-semibold group-hover:text-primary transition-colors">
                  <Link to={service.link}>{service.title}</Link>
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-xs text-muted-foreground line-clamp-2">
                  {service.description}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="flex justify-center mt-6">
        <Link to="/documents">
          <Button>View All Documents & Services</Button>
        </Link>
      </div>
    </div>
  );
};

export default DocumentsServices;