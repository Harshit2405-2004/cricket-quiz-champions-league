
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-primary text-white mt-auto py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-lg font-bold">Cricket Quiz Champions League</h3>
            <p className="text-sm text-gray-300 mt-1">
              Test your cricket knowledge daily and win rewards!
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row gap-4 md:gap-8">
            <Link to="/about" className="text-sm hover:text-accent">About</Link>
            <Link to="/rules" className="text-sm hover:text-accent">Rules</Link>
            <Link to="/privacy" className="text-sm hover:text-accent">Privacy</Link>
            <Link to="/terms" className="text-sm hover:text-accent">Terms</Link>
            <Link to="/contact" className="text-sm hover:text-accent">Contact</Link>
          </div>
        </div>
        
        <div className="mt-6 pt-4 border-t border-blue-700 text-center text-xs text-gray-300">
          © {new Date().getFullYear()} Cricket Quiz Champions League. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
