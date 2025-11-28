
const HeroSection = () => {
  return (
    <section className="relative rounded-xl bg-gradient-to-br from-primary via-primary/90 to-accent text-primary-foreground py-4 md:py-6 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10 ">
        <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent rounded-full blur-3xl" />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-4xl font-bold mb-2 md:mb-3 animate-fade-in">
            Latest Government Jobs & Career Exam Updates
          </h2>
          <p className="text-sm md:text-base text-primary-foreground/90">
            Career Opportunities 2024-25: Get Daily Updates on Latest Govt Jobs, Results, Admit Cards, Answer Keys & Exam Notifications
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
