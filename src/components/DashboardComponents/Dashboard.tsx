import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarInset,
} from "@/components/ui/sidebar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  Briefcase,
  Trophy,
  CreditCard,
  Key,
  BookOpen,
  GraduationCap,
  FileText,
  Library,
  LogOut,
  Menu,
  ClipboardList,
  User,
  Gift,
} from "lucide-react";
import { LoginForm } from "./LoginForm";
import { JobsSection } from "./Sections/JobsSection";
import { AdmissionsSection } from "./Sections/AdmissionsSection";
import { ResultsSection } from "./Sections/ResultsSection";
import { AdmitCardsSection } from "./Sections/AdmitCardsSection";
import { AnswerKeysSection } from "./Sections/AnswerKeysSection";
import { SyllabusSection } from "./Sections/SyllabusSection";
import { DocumentsSection } from "./Sections/DocumentsSection";
import { ResourcesSection } from "./Sections/ResourcesSection";
import { QuizManagement } from "@/components/QuizManagement";
import { authService } from "./authService";
import { SchemesSection } from "./Sections/SchemesSection";

const Dashboard = () => {
  const { toast } = useToast();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeSection, setActiveSection] = useState("jobs");
  const [adminProfile, setAdminProfile] = useState<any>(null);

  // Check authentication status on component mount
  useEffect(() => {
    const checkAuthStatus = async () => {
      if (authService.isAuthenticated()) {
        try {
          const profile = await authService.getProfile();
          setAdminProfile(profile.admin);
          setIsAuthenticated(true);
        } catch (error) {
          console.error('Auth check failed:', error);
          await authService.logout();
          setIsAuthenticated(false);
        }
      }
    };

    checkAuthStatus();
  }, []);

  // Logout Handler
  const handleLogout = async () => {
    try {
      await authService.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setIsAuthenticated(false);
      setAdminProfile(null);
      toast({ title: "Logged Out", description: "You have been logged out successfully" });
    }
  };

  const menuItems = [
    { id: "jobs", label: "Jobs", icon: Briefcase },
    { id: "admissions", label: "Admissions", icon: GraduationCap },
    { id: "schemes", label: "Govt Schemes", icon: Gift },
    { id: "results", label: "Results", icon: Trophy },
    { id: "admit-cards", label: "Admit Cards", icon: CreditCard },
    { id: "answer-keys", label: "Answer Keys", icon: Key },
    { id: "syllabus", label: "Syllabus", icon: BookOpen },
    { id: "documents", label: "Documents", icon: FileText },
    { id: "resources", label: "Resources", icon: Library },
    { id: "quiz", label: "Quiz Management", icon: ClipboardList },
  ];

  const SidebarMenuContent = () => (
    <>
      <div className="p-4 border-b">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
            <User className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h2 className="text-lg font-semibold">Admin Dashboard</h2>
            <p className="text-sm text-muted-foreground">
              {adminProfile?.username || 'Admin'}
            </p>
          </div>
        </div>
      </div>
      <SidebarGroup>
        <SidebarGroupContent>
          <SidebarMenu>
            {menuItems.map((item) => (
              <SidebarMenuItem key={item.id}>
                <SidebarMenuButton
                  isActive={activeSection === item.id}
                  onClick={() => setActiveSection(item.id)}
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
      <div className="mt-auto p-4 border-t">
        <Button variant="outline" className="w-full" onClick={handleLogout}>
          <LogOut className="h-4 w-4 mr-2" />
          Logout
        </Button>
      </div>
    </>
  );

  // Login UI
  if (!isAuthenticated) {
    return <LoginForm onLoginSuccess={(profile) => {
      setAdminProfile(profile);
      setIsAuthenticated(true);
    }} />;
  }

  const renderActiveSection = () => {
    const sectionProps = {
      onLogout: handleLogout
    };

    switch (activeSection) {
      case "jobs":
        return <JobsSection {...sectionProps} />;
      case "admissions":
        return <AdmissionsSection {...sectionProps} />;
      case "schemes":
        return <SchemesSection {...sectionProps} />;
      case "results":
        return <ResultsSection {...sectionProps} />;
      case "admit-cards":
        return <AdmitCardsSection {...sectionProps} />;
      case "answer-keys":
        return <AnswerKeysSection {...sectionProps} />;
      case "syllabus":
        return <SyllabusSection {...sectionProps} />;
      case "documents":
        return <DocumentsSection {...sectionProps} />;
      case "resources":
        return <ResourcesSection {...sectionProps} />;
      case "quiz":
        return <QuizManagement />;
      default:
        return <JobsSection {...sectionProps} />;
    }
  };

  return (
    <SidebarProvider defaultOpen>
      <div className="min-h-screen flex w-full">
        {/* Desktop Sidebar */}
        <Sidebar className="hidden md:flex border-r">
          <SidebarContent>
            <SidebarMenuContent />
          </SidebarContent>
        </Sidebar>

        <SidebarInset className="flex-1">
          <div className="flex flex-col h-full">
            {/* Header with Mobile Menu */}
            <div className="bg-gradient-to-br from-primary via-primary/90 to-accent text-primary-foreground py-4 px-4 md:py-6 md:px-6">
              <div className="flex items-center gap-3">
                {/* Mobile Hamburger Menu */}
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="ghost" size="icon" className="md:hidden text-primary-foreground hover:bg-primary-foreground/20">
                      <Menu className="h-5 w-5" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="p-0 w-64">
                    <SidebarContent>
                      <SidebarMenuContent />
                    </SidebarContent>
                  </SheetContent>
                </Sheet>
                <div>
                  <h1 className="text-xl md:text-2xl font-bold">Content Management</h1>
                  <p className="text-sm text-primary-foreground/90">
                    Welcome back, {adminProfile?.username || 'Admin'}!
                  </p>
                </div>
              </div>
            </div>

            <div className="flex-1 p-6 overflow-auto">
              {renderActiveSection()}
            </div>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;