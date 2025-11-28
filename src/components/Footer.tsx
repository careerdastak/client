const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground mt-12">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-6">
          <div>
            <h3 className="font-bold text-lg mb-4">CareerDastak</h3>
            <p className="text-sm text-primary-foreground/80 mb-3">
              Your trusted source for latest Government Job notifications, results, and exam updates. We provide authentic career information daily.
            </p>
            <p className="text-xs text-primary-foreground/70">
              📧 Email: info@careerdastak.com<br />
              📱 WhatsApp Updates: <a href="https://whatsapp.com/channel/0029VbBQSFZ1nozFP1MR6136" target="_blank" rel="noopener noreferrer" className="hover:text-primary-foreground transition-colors">Join Group</a>
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Popular Searches</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">10th Pass Jobs</a></li>
              <li><a href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">12th Pass Jobs</a></li>
              <li><a href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">Graduate Jobs</a></li>
              <li><a href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">Police Bharti 2024</a></li>
              <li><a href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">SSC Jobs</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Job Categories</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">Central Govt Jobs</a></li>
              <li><a href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">State Govt Jobs</a></li>
              <li><a href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">Banking Jobs</a></li>
              <li><a href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">Railway Jobs</a></li>
              <li><a href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">Defence Jobs</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Important Links</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">About Us</a></li>
              <li><a href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">Contact Us</a></li>
              <li><a href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">Disclaimer</a></li>
              <li><a href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">Sitemap</a></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-4 border-t border-primary-foreground/20">
          <p className="text-xs text-primary-foreground/70 mb-3 text-center">
            <strong>Disclaimer:</strong> CareerDastak.com is not associated with any government organization. All information is collected from official government websites and published for educational purposes only. Please visit official websites for the final information.
          </p>
          <p className="text-center text-sm text-primary-foreground/80">
              © {new Date().getFullYear()} CareerDastak.com - All Rights Reserved | Made  for Students
           </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
