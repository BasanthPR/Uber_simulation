
import { Bell, Menu, User } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { DarkModeToggle } from "@/components/DarkModeToggle";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-border h-16 px-4">
      <div className="h-full mx-auto max-w-7xl flex items-center justify-between">
        <div className="flex items-center">
          <Button variant="ghost" size="icon" className="md:hidden mr-2">
            <Menu className="h-5 w-5" />
          </Button>
          <Link to="/" className="text-foreground font-bold text-2xl">
            Uber
          </Link>
        </div>
        
        <div className="hidden md:flex space-x-6">
          <Link to="/" className="text-foreground hover:text-primary transition-colors">
            Ride
          </Link>
          <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">
            Drive
          </Link>
          <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">
            Deliver
          </Link>
          <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">
            Business
          </Link>
        </div>
        
        <div className="flex items-center space-x-4">
          <DarkModeToggle />
          
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Notifications</TooltipContent>
          </Tooltip>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <Link to="/profile">
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                </Button>
              </Link>
            </TooltipTrigger>
            <TooltipContent>Profile</TooltipContent>
          </Tooltip>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
