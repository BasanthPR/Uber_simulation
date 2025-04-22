import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { User, CreditCard, Clock, Settings, LogOut } from "lucide-react";
import Navbar from "@/components/Navbar";
import { toast } from "@/components/ui/use-toast";

const Profile = () => {
  const { username: urlUsername } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    rating: 4.89,
    photoUrl: "https://randomuser.me/api/portraits/men/32.jpg"
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUsername = localStorage.getItem("username");
    const email = localStorage.getItem("email");

    // Redirect if not logged in
    if (!token || !storedUsername || !email) {
      toast({
        title: "Unauthorized",
        description: "Please log in to access your profile.",
        variant: "destructive"
      });
      navigate("/login");
      return;
    }

    // Optional: redirect if someone tries to access another user's profile
    const urlName = urlUsername?.replace(/-/g, " ").toLowerCase();
    const storedName = storedUsername.toLowerCase();
    if (urlName !== storedName) {
      toast({
        title: "Access Denied",
        description: "You can only view your own profile.",
        variant: "destructive"
      });
      navigate("/");
      return;
    }

    setUser({
      name: storedUsername,
      email,
      rating: 4.89,
      photoUrl: "https://randomuser.me/api/portraits/men/32.jpg"
    });
  }, [navigate, urlUsername]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("email");

    toast({
      title: "Logged out",
      description: "You have been signed out."
    });

    navigate("/");
  };

  const menuItems = [
    { icon: User, label: "Account", link: "/account" },
    { icon: CreditCard, label: "Payment", link: "/wallet" },
    { icon: Clock, label: "Ride history", link: "/activity" },
    { icon: Settings, label: "Settings", link: "/settings" },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <div className="max-w-md mx-auto pt-24 px-4">
        <div className="flex items-center space-x-4 mb-8">
          <div className="h-20 w-20 rounded-full overflow-hidden border-2 border-primary">
            <img 
              src={user.photoUrl} 
              alt={user.name} 
              className="h-full w-full object-cover"
            />
          </div>
          <div>
            <h1 className="text-xl font-bold">{user.name}</h1>
            <p className="text-muted-foreground">{user.email}</p>
            <div className="flex items-center mt-1 text-sm">
              <svg 
                viewBox="0 0 24 24" 
                fill="currentColor" 
                className="w-4 h-4 text-yellow-400 mr-1"
              >
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
              <span>{user.rating}</span>
            </div>
          </div>
        </div>

        <div className="bg-card rounded-lg shadow-sm border border-border overflow-hidden mb-6">
          {menuItems.map((item, index) => (
            <a 
              key={index}
              href={item.link}
              className={`flex items-center px-4 py-3 hover:bg-secondary/50 ${
                index !== menuItems.length - 1 ? "border-b border-border" : ""
              }`}
            >
              <item.icon className="h-5 w-5 mr-3 text-primary" />
              <span>{item.label}</span>
            </a>
          ))}
        </div>

        <div className="bg-card rounded-lg shadow-sm border border-border overflow-hidden">
          <button
            onClick={handleLogout}
            className="w-full flex items-center px-4 py-3 hover:bg-secondary/50 text-left text-destructive"
          >
            <LogOut className="h-5 w-5 mr-3" />
            <span>Sign out</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
