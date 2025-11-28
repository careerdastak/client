import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import {
  Sidebar,
  SidebarContent,
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu, User } from "lucide-react";

// Sidebar Components
import { SidebarMenuContent } from "../components/DashboardComponents/SidebarMenu";
import { LoginForm } from "../components/DashboardComponents/LoginForm";

// Section Components
import { JobsSection } from "../components/DashboardComponents/Sections/JobsSection";
import { AdmissionsSection } from "../components/DashboardComponents/Sections/AdmissionsSection";
// import { ResultsSection } from "./sidebarcomponents/sections/ResultsSection";
// import { AdmitCardsSection } from "./sidebarcomponents/sections/AdmitCardsSection";
// import { AnswerKeysSection } from "./sidebarcomponents/sections/AnswerKeysSection";
// import { SyllabusSection } from "./sidebarcomponents/sections/SyllabusSection";
// import { DocumentsSection } from "./sidebarcomponents/sections/DocumentsSection";
// import { ResourcesSection } from "./sidebarcomponents/sections/ResourcesSection";
// import { QuizSection } from "./sidebarcomponents/sections/QuizSection";

// Auth Service
import { authService } from "../components/DashboardComponents/authService";

const Dashboard = () => {
  const { toast } = useToast();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeSection, setActiveSection] = useState("jobs");
  const [adminProfile, setAdminProfile] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

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

  // Login Handler
  const handleLogin = async (credentials: { username: string; password: string }) => {
    setIsLoading(true);
    try {
      const result = await authService.login(credentials);

      if (result.success) {
        const profile = await authService.getProfile();
        setAdminProfile(profile.admin);
        setIsAuthenticated(true);
        toast({
          title: "Login Successful",
          description: `Welcome ${profile.admin?.username || 'Admin'}!`
        });
        return true;
      } else {
        throw new Error(result.message || 'Login failed');
      }
    } catch (error: any) {
      console.error('Login error:', error);
      toast({
        title: "Login Failed",
        description: error.message || "Invalid credentials",
        variant: "destructive"
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

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

  // Render section based on active section
  const renderActiveSection = () => {
    const sectionProps = {
      onLogout: handleLogout
    };

    switch (activeSection) {
      case "jobs":
        return <JobsSection {...sectionProps} />;
      case "admissions":
        return <AdmissionsSection {...sectionProps} />;
      // case "results":
      //   return <ResultsSection {...sectionProps} />;
      // case "admit-cards":
      //   return <AdmitCardsSection {...sectionProps} />;
      // case "answer-keys":
      //   return <AnswerKeysSection {...sectionProps} />;
      // case "syllabus":
      //   return <SyllabusSection {...sectionProps} />;
      // case "documents":
      //   return <DocumentsSection {...sectionProps} />;
      // case "resources":
      //   return <ResourcesSection {...sectionProps} />;
      // case "quiz":
      //   return <QuizSection {...sectionProps} />;
      default:
        return <JobsSection {...sectionProps} />;
    }
  };

  // Login UI
  if (!isAuthenticated) {
    return <LoginForm onSubmit={handleLogin} isLoading={isLoading} />;
  }

  return (
    <SidebarProvider defaultOpen>
      <div className="min-h-screen flex w-full">
        {/* Desktop Sidebar */}
        <Sidebar className="hidden md:flex border-r">
          <SidebarContent>
            <SidebarMenuContent
              activeSection={activeSection}
              onSectionChange={setActiveSection}
              adminProfile={adminProfile}
              onLogout={handleLogout}
            />
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
                      <SidebarMenuContent
                        activeSection={activeSection}
                        onSectionChange={setActiveSection}
                        adminProfile={adminProfile}
                        onLogout={handleLogout}
                      />
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

