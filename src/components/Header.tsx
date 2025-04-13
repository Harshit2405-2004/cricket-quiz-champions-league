
import { Link } from "react-router-dom";
import { Trophy, Home, User, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-primary text-white sticky top-0 z-50 shadow-md">
      <div className="container mx-auto flex justify-between items-center py-4">
        <Link to="/" className="flex items-center gap-2">
          <Trophy size={24} className="text-accent" />
          <h1 className="text-xl font-bold">Cricket Quiz Champions</h1>
        </Link>

        {/* Mobile menu button */}
        <Button 
          variant="ghost" 
          size="icon" 
          className="md:hidden text-white" 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <List />
        </Button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="flex items-center gap-2 hover:text-accent">
            <Home size={18} />
            <span>Home</span>
          </Link>
          <Link to="/quiz" className="flex items-center gap-2 hover:text-accent">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="18" 
              height="18" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
              <path d="M12 17h.01" />
            </svg>
            <span>Quiz</span>
          </Link>
          <Link to="/leaderboard" className="flex items-center gap-2 hover:text-accent">
            <Trophy size={18} />
            <span>Leaderboard</span>
          </Link>
          <Link to="/profile" className="flex items-center gap-2 hover:text-accent">
            <User size={18} />
            <span>Profile</span>
          </Link>
        </nav>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <nav className="md:hidden bg-primary-foreground text-primary">
          <div className="container flex flex-col py-2">
            <Link 
              to="/" 
              className="py-3 px-4 hover:bg-muted rounded-md flex items-center gap-2"
              onClick={() => setIsMenuOpen(false)}
            >
              <Home size={18} />
              <span>Home</span>
            </Link>
            <Link 
              to="/quiz" 
              className="py-3 px-4 hover:bg-muted rounded-md flex items-center gap-2"
              onClick={() => setIsMenuOpen(false)}
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="18" 
                height="18" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                <path d="M12 17h.01" />
              </svg>
              <span>Quiz</span>
            </Link>
            <Link 
              to="/leaderboard" 
              className="py-3 px-4 hover:bg-muted rounded-md flex items-center gap-2"
              onClick={() => setIsMenuOpen(false)}
            >
              <Trophy size={18} />
              <span>Leaderboard</span>
            </Link>
            <Link 
              to="/profile" 
              className="py-3 px-4 hover:bg-muted rounded-md flex items-center gap-2"
              onClick={() => setIsMenuOpen(false)}
            >
              <User size={18} />
              <span>Profile</span>
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;
