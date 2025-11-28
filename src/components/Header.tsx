import { useState, useEffect, useRef } from "react";
import { Search, Bell, Menu, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  // Smart Header Logic
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

  const handleScroll = () => {
    const currentScrollY = window.scrollY;
    const scrollDelta = currentScrollY - lastScrollY.current; 

    if (scrollDelta < 0 || currentScrollY < 80) {
      setIsVisible(true);
    } 
    else if (scrollDelta > 0 && currentScrollY > 150) {
      setIsVisible(false);
    }

    lastScrollY.current = currentScrollY;
  };

  useEffect(() => {
    // Attach scroll listener
    window.addEventListener("scroll", handleScroll, { passive: true });
    
    // Clean up listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  // End Smart Header Logic

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/latest-jobs?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/latest-jobs", label: "Jobs" },
    { href: "/results", label: "Results" },
    { href: "/admit-card", label: "Admit Card" },
    { href: "/answer-key", label: "Answer Key" },
    { href: "/syllabus", label: "Syllabus" },
    { href: "/admission", label: "Admission" },
    { href: "/govt-schemes", label: "Schemes" },
    { href: "/news-blogs", label: "News & Blogs" },
    { href: "/documents", label: "Documents" },
    { href: "/tools", label: "Tools" },
    // { href: "/resources", label: "Resources" },
    // { href: "/dashboard", label: "Dashboard" },
  ];

  // Dynamic classes for the header animation
  const headerClasses = `
    sticky top-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border shadow-sm
    transition-transform duration-300 ease-in-out
    ${isVisible ? 'translate-y-0' : '-translate-y-full'}
  `;

  return (
    <header className={headerClasses}>
      <div className="container mx-auto px-4">
        {/* Top Bar */}
        <div className="flex items-center justify-between py-2 border-b border-border">
          <Link to="/" className="flex items-center gap-2">
            <h1 className="text-xl md:text-2xl font-bold text-primary">CareerDastak</h1>
            {/* <span className="text-xs bg-accent text-accent-foreground px-2 py-1 rounded">TRUSTED</span> */}
          </Link>
          
          <div className="flex items-center gap-2 md:gap-3">
            <form onSubmit={handleSearch} className="relative flex-1 md:flex-none">
              <Search className="absolute left-2 md:left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                type="search" 
                placeholder="Search jobs..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 md:pl-10 w-full md:w-[240px] lg:w-[300px] h-9 text-sm"
              />
            </form>
            <Button variant="ghost" size="sm" className="hidden sm:flex">
              हिंदी
            </Button>
            <Button variant="ghost" size="icon" className="hidden sm:flex">
              <Bell className="h-5 w-5" />
            </Button>
          </div>
          
          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] sm:w-[350px] overflow-y-auto">
              <div className="flex flex-col gap-6 mt-8">
                <div className="flex items-center gap-2 pb-4 border-b border-border">
                  <h2 className="text-xl font-bold text-primary">CareerDastak</h2>
                  {/* <span className="text-xs bg-accent text-accent-foreground px-2 py-1 rounded">TRUSTED</span> */}
                </div>
                
                <nav className="flex flex-col gap-1">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      to={link.href}
                      className="px-4 py-3 rounded-lg text-foreground hover:bg-secondary hover:text-primary transition-colors font-medium"
                      onClick={() => setIsOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>

                <div className="flex flex-col gap-2 pt-4 border-t border-border">
                  <Button variant="ghost" size="sm" className="justify-start">
                    हिंदी
                  </Button>
                  <Button variant="ghost" size="sm" className="justify-start">
                    <Bell className="h-4 w-4 mr-2" />
                    Notifications
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 py-3 text-sm">
          <Link to="/" className="font-semibold text-primary hover:text-accent transition-colors">
            Home
          </Link>
          {navLinks.slice(1).map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className="text-foreground hover:text-primary transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;