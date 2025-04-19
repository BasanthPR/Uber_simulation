
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Star, LifeBuoy, Wallet, ClipboardList, User, Tag, LogOut, ChevronUp, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

const ProfilePage = () => {
  const [username, setUsername] = useState("User");
  const navigate = useNavigate();

  useEffect(() => {
    // Get username from localStorage if it exists
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const handleSignOut = () => {
    // Clear username from localStorage
    localStorage.removeItem('username');
    
    toast({
      title: "Signed out successfully",
      description: "You have been signed out of your account."
    });
    
    // Navigate to home after sign out
    navigate('/');
  };

  const handleClose = () => {
    navigate(-1);
  };

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  const handleExternalLink = (url: string) => {
    window.open(url, '_blank');
  };

  return (
    <div className="fixed inset-0 bg-white z-50 overflow-y-auto">
      <div className="max-w-md mx-auto p-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-bold">{username}</h1>
          
          <div className="flex items-center">
            <button className="p-2" onClick={handleClose}>
              <ChevronUp className="h-6 w-6" />
            </button>
          </div>
        </div>
        
        <div className="flex items-center mb-6">
          <Star className="h-5 w-5 text-black mr-2" />
          <span className="text-xl font-bold">4.74</span>
        </div>
        
        <div className="grid grid-cols-3 gap-4 mb-8">
          <button 
            className="bg-gray-100 p-4 rounded-lg flex flex-col items-center hover:bg-gray-200 transition-colors"
            onClick={() => handleExternalLink('https://help.uber.com')}
          >
            <LifeBuoy className="h-8 w-8 mb-2" />
            <span className="text-lg font-medium">Help</span>
          </button>
          
          <button 
            className="bg-gray-100 p-4 rounded-lg flex flex-col items-center hover:bg-gray-200 transition-colors"
            onClick={() => handleNavigate('/wallet')}
          >
            <Wallet className="h-8 w-8 mb-2" />
            <span className="text-lg font-medium">Wallet</span>
          </button>
          
          <button 
            className="bg-gray-100 p-4 rounded-lg flex flex-col items-center hover:bg-gray-200 transition-colors"
            onClick={() => handleNavigate('/activity')}
          >
            <ClipboardList className="h-8 w-8 mb-2" />
            <span className="text-lg font-medium">Activity</span>
          </button>
        </div>
        
        <div className="bg-gray-100 p-4 rounded-lg mb-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-medium">Uber Cash</h2>
            <span className="text-2xl font-bold">$0.00</span>
          </div>
        </div>
        
        <div className="space-y-4 mb-8">
          <button 
            className="w-full flex items-center text-left py-3 px-3 hover:bg-gray-100 rounded-lg transition-colors"
            onClick={() => handleNavigate('/account')}
          >
            <User className="h-6 w-6 mr-4" />
            <span className="text-lg">Manage account</span>
          </button>
          
          <button 
            className="w-full flex items-center text-left py-3 px-3 hover:bg-gray-100 rounded-lg transition-colors"
            onClick={() => handleNavigate('/promotions')}
          >
            <Tag className="h-6 w-6 mr-4" />
            <span className="text-lg">Promotions</span>
          </button>
          
          <button 
            className="w-full flex items-center text-left py-3 px-3 hover:bg-gray-100 rounded-lg transition-colors"
            onClick={() => handleExternalLink('https://www.uber.com/legal')}
          >
            <ExternalLink className="h-6 w-6 mr-4" />
            <span className="text-lg">Legal</span>
          </button>
        </div>
        
        <button 
          className="w-full py-4 bg-gray-100 rounded-lg text-red-600 text-xl font-medium hover:bg-gray-200 transition-colors"
          onClick={handleSignOut}
        >
          Sign out
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
