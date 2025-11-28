// src/components/DocumentsCardGrid.tsx (BEAUTIFUL DESIGN)
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileText, User, BookOpen, Truck, Building2, Heart, FolderOpen, ExternalLink, ArrowRight } from 'lucide-react'; 

// Simplified type for homepage display
interface DocumentItem {
  category: string;
  title: string;
  description: string;
  services: string[];
  url: string; 
}

// Full document data (MOCK DATA)
const DOCUMENTS_DATA: DocumentItem[] = [
  // Identity Documents
  {
    category: "identity",
    title: "Aadhaar Card Services",
    description: "Update details, download e-Aadhaar, book appointments for your Aadhaar card",
    services: ["Update Aadhaar", "Download e-Aadhaar", "Check Status", "Book Appointment"],
    url: "https://uidai.gov.in/",
  },
  {
    category: "identity",
    title: "PAN Card Services",
    description: "Apply for new PAN, correction, reprint, and linking services",
    services: ["New PAN", "PAN Correction", "Reprint PAN", "Link Aadhaar"],
    url: "https://www.onlineservices.nsdl.com/paam/endUserRegisterContact.html",
  },
  {
    category: "identity",
    title: "Passport Seva",
    description: "Apply for passport, renewal, police clearance certificate online",
    services: ["New Passport", "Renewal", "PCC", "Track Application"],
    url: "https://www.passportindia.gov.in/",
  },
  {
    category: "identity",
    title: "Voter ID Card",
    description: "Apply for voter ID, correction, download e-EPIC digital card",
    services: ["New Voter ID", "Correction", "Download e-EPIC", "Check Status"],
    url: "https://voters.eci.gov.in/",
  },
  
  // Education Documents
  {
    category: "education",
    title: "DigiLocker",
    description: "Access and share educational certificates digitally with secure storage",
    services: ["Store Documents", "Share Documents", "Verify Certificates"],
    url: "https://digilocker.gov.in/",
  },
  {
    category: "education",
    title: "CBSE Academic",
    description: "Marksheet verification, migration certificate, duplicate certificates",
    services: ["Certificate Verification", "Migration", "Duplicate Certificate"],
    url: "https://www.cbse.gov.in/",
  },

  // Employment Documents
  {
    category: "employment",
    title: "EPF Passbook",
    description: "Check EPF balance, download passbook, withdrawal and transfer services",
    services: ["EPF Balance", "Download Passbook", "Withdrawal", "Transfer"],
    url: "https://unifiedportal-mem.epfindia.gov.in/memberinterface/",
  },

  // Transport Documents
  {
    category: "transport",
    title: "Driving License Services",
    description: "Apply for DL, renewal, address change, duplicate DL services",
    services: ["New DL", "DL Renewal", "Duplicate DL", "Address Change"],
    url: "https://parivahan.gov.in/parivahan/",
  },
  {
    category: "transport",
    title: "Vehicle Registration (RC)",
    description: "RC transfer, address change, duplicate RC, NOC services",
    services: ["RC Transfer", "Address Change", "Duplicate RC", "NOC"],
    url: "https://parivahan.gov.in/parivahan/",
  },

  // Property Documents
  {
    category: "property",
    title: "Land Records",
    description: "View land records, khata certificate, mutation services online",
    services: ["View Records", "Khata Certificate", "Mutation"],
    url: "https://landrecords.gov.in/",
  },

  // Health Documents
  {
    category: "health",
    title: "Ayushman Bharat (PMJAY)",
    description: "Health card, hospital empanelment, claim status and benefits",
    services: ["Check Eligibility", "Download Card", "Find Hospital"],
    url: "https://pmjay.gov.in/",
  },

  // Other Services
  {
    category: "other",
    title: "Birth/Death Certificate",
    description: "Apply for birth or death certificate online with easy process",
    services: ["Birth Certificate", "Death Certificate", "Download"],
    url: "https://crsorgi.gov.in/",
  },
];

// Map categories to icons and colors
const CategoryConfig: Record<string, { icon: React.ElementType; color: string; bgColor: string; textColor: string }> = {
  identity: { 
    icon: User, 
    color: "text-blue-600", 
    bgColor: "bg-blue-50", 
    textColor: "text-blue-700" 
  },
  education: { 
    icon: BookOpen, 
    color: "text-green-600", 
    bgColor: "bg-green-50", 
    textColor: "text-green-700" 
  },
  employment: { 
    icon: FolderOpen, 
    color: "text-purple-600", 
    bgColor: "bg-purple-50", 
    textColor: "text-purple-700" 
  },
  transport: { 
    icon: Truck, 
    color: "text-orange-600", 
    bgColor: "bg-orange-50", 
    textColor: "text-orange-700" 
  },
  property: { 
    icon: Building2, 
    color: "text-red-600", 
    bgColor: "bg-red-50", 
    textColor: "text-red-700" 
  },
  health: { 
    icon: Heart, 
    color: "text-pink-600", 
    bgColor: "bg-pink-50", 
    textColor: "text-pink-700" 
  },
  other: { 
    icon: FileText, 
    color: "text-gray-600", 
    bgColor: "bg-gray-50", 
    textColor: "text-gray-700" 
  },
};

// Category labels for display
const CategoryLabels: Record<string, string> = {
  identity: "Identity",
  education: "Education",
  employment: "Employment",
  transport: "Transport",
  property: "Property",
  health: "Health",
  other: "Other Services"
};

export const DocumentsCardGrid: React.FC = () => {
  return (
    <section id="documents-grid" className="py-12 md:py-16 bg-gradient-to-br from-gray-50 to-blue-50/30 rounded-2xl">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-2xl mb-4">
            <FileText className="h-8 w-8 text-primary" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Important Documents & Digital Services
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Quick access to essential government portals for <span className="font-semibold text-primary">Aadhaar, PAN, Passport, Driving License, EPFO</span>, and other vital services
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {DOCUMENTS_DATA.map((doc, index) => {
            const categoryConfig = CategoryConfig[doc.category] || CategoryConfig.other;
            const Icon = categoryConfig.icon;
            const CategoryLabel = CategoryLabels[doc.category];
            
            return (
              <Card 
                key={index} 
                className="group hover:shadow-2xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm hover:bg-white hover:scale-105 cursor-pointer relative overflow-hidden"
              >
                {/* Background Gradient Effect */}
                <div className={`absolute inset-0 bg-gradient-to-br ${categoryConfig.bgColor} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                
                <CardHeader className="relative z-10 pb-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className={`p-2 rounded-xl ${categoryConfig.bgColor}`}>
                      <Icon className={`h-5 w-5 ${categoryConfig.color}`} />
                    </div>
                    <ExternalLink className={`h-4 w-4 ${categoryConfig.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                  </div>
                  
                  <CardTitle className="text-xl font-bold text-gray-900 group-hover:text-gray-800 transition-colors line-clamp-2 leading-tight">
                    {doc.title}
                  </CardTitle>
                  
                  <CardDescription className="text-sm leading-relaxed mt-2 line-clamp-2">
                    {doc.description}
                  </CardDescription>
                  
                  <Badge 
                    variant="secondary" 
                    className={`w-fit mt-3 ${categoryConfig.bgColor} ${categoryConfig.textColor} border-0 text-xs font-medium`}
                  >
                    {CategoryLabel}
                  </Badge>
                </CardHeader>
                
                <CardContent className="relative z-10 pt-0">
                  {/* Services Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {doc.services.slice(0, 3).map((service, idx) => (
                      <span
                        key={idx}
                        className={`text-xs px-2.5 py-1.5 rounded-full ${categoryConfig.bgColor} ${categoryConfig.textColor} font-medium border transition-all duration-200 hover:scale-105`}
                      >
                        {service}
                      </span>
                    ))}
                    {doc.services.length > 3 && (
                      <span className="text-xs px-2.5 py-1.5 rounded-full bg-gray-100 text-gray-600 font-medium">
                        +{doc.services.length - 3} more
                      </span>
                    )}
                  </div>
                  
                  {/* Action Button */}
                  <Button 
                    className={`w-full group/btn bg-gradient-to-r from-gray-900 to-gray-700 hover:from-gray-800 hover:to-gray-600 text-white border-0 shadow-md hover:shadow-lg transition-all duration-300`}
                    onClick={() => window.open(doc.url, '_blank', 'noopener,noreferrer')}
                  >
                    <span>Visit Portal</span>
                    <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform duration-200" />
                  </Button>
                </CardContent>
                
                {/* Hover Border Effect */}
                <div className={`absolute bottom-0 left-0 w-0 h-1 ${categoryConfig.bgColor.replace('bg-', 'bg-')} group-hover:w-full transition-all duration-300`} />
              </Card>
            );
          })}
        </div>

        {/* Footer CTA */}
        <div className="text-center mt-12">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/80 backdrop-blur-sm rounded-2xl border shadow-sm">
            <FileText className="h-5 w-5 text-primary" />
            <span className="text-sm font-medium text-gray-700">
              Need help with other documents?{" "}
              <a href="#contact" className="text-primary hover:underline font-semibold">
                Contact Support
              </a>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};