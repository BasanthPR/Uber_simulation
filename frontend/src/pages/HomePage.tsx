
import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, Calendar, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import MainNavbar from "@/components/MainNavbar";

const HomePage = () => {
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");

  // Suggestions content updated with working links
  const suggestions = [
    {
      id: "courier",
      title: "Courier",
      description: "Uber makes same-day item delivery easier than ever.",
      link: "/deliver"
    },
    {
      id: "grocery",
      title: "Grocery",
      description: "Get groceries delivered to your door with Uber Eats.",
      link: "https://www.ubereats.com/"
    },
    {
      id: "hourly",
      title: "Hourly",
      description: "Request a trip for a block of time and make multiple stops.",
      link: "/ride"
    }
  ];

  return (
    <div className="min-h-screen bg-white text-black flex flex-col">
      <MainNavbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="pt-20 px-4 md:px-8 lg:px-16 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 py-12 items-center">
            <div>
              <h1 className="text-5xl font-bold mb-8">
                Go anywhere with<br />Uber
              </h1>
              
              {/* Ride Request Form */}
              <div className="space-y-2 max-w-xl">
                <div className="relative">
                  <div className="absolute top-3 left-3">
                    <div className="w-2 h-2 bg-black rounded-full"></div>
                  </div>
                  <input
                    type="text"
                    placeholder="Pickup location"
                    className="w-full p-3 pl-8 border border-gray-300 rounded-md focus:outline-none"
                    value={pickup}
                    onChange={(e) => setPickup(e.target.value)}
                  />
                </div>
                
                <div className="relative">
                  <div className="absolute top-3 left-3">
                    <div className="w-2 h-2 bg-black rounded-full"></div>
                  </div>
                  <input
                    type="text"
                    placeholder="Dropoff location"
                    className="w-full p-3 pl-8 border border-gray-300 rounded-md focus:outline-none"
                    value={dropoff}
                    onChange={(e) => setDropoff(e.target.value)}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline" className="flex items-center justify-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Today
                  </Button>
                  
                  <Button variant="outline" className="flex items-center justify-between gap-2">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2" />
                      Now
                    </div>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="flex gap-2">
                  <Button variant="default" className="bg-black hover:bg-gray-800 text-white">
                    See prices
                  </Button>
                  
                  <Link to="/login" className="text-black hover:text-gray-700 py-2 flex items-center">
                    Log in to see your recent activity
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Suggestions Section */}
        <section className="py-12 px-4 md:px-8 lg:px-16 max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">Suggestions</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {suggestions.map((suggestion) => (
              <div key={suggestion.id} className="bg-gray-100 p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-2">{suggestion.title}</h3>
                <p className="text-gray-700 mb-6">{suggestion.description}</p>
                <div className="flex justify-between items-end">
                  {suggestion.id === "grocery" ? (
                    <a href={suggestion.link} target="_blank" rel="noopener noreferrer" className="text-black font-medium hover:underline">
                      Details
                    </a>
                  ) : (
                    <Link to={suggestion.link} className="text-black font-medium hover:underline">
                      Details
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default HomePage;
