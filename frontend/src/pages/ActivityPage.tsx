
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Calendar, ChevronDown, User, HelpCircle, FileText, RefreshCw, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import RideNavbar from "@/components/RideNavbar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";

interface RideActivity {
  id: string;
  name: string;
  date: string;
  time: string;
  price: string;
  status: "completed" | "cancelled";
  location: string;
}

const ActivityPage = () => {
  const [filter, setFilter] = useState<"Personal" | "Business">("Personal");
  const [tripType, setTripType] = useState<"All Trips" | "Past Month" | "Past 6 Months">("All Trips");
  const [activities, setActivities] = useState<RideActivity[]>([]);
  const [username, setUsername] = useState<string>("");
  
  useEffect(() => {
    // Get username from localStorage
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
    
    // Simulate fetching user activities
    // In a real app, this would come from an API
    const userActivities = getUserActivities();
    setActivities(userActivities);
  }, []);

  const getUserActivities = (): RideActivity[] => {
    // This would normally fetch from an API
    // For now using mock data that's user-specific
    return [
      {
        id: "1",
        name: "Airport Drop-off",
        date: new Date().toLocaleDateString(),
        time: "09:30 AM",
        price: "$45.00",
        status: "completed",
        location: "SFO International Airport"
      },
      {
        id: "2",
        name: "Downtown Trip",
        date: new Date(Date.now() - 86400000).toLocaleDateString(),
        time: "2:15 PM",
        price: "$22.50",
        status: "completed",
        location: "Financial District"
      }
    ];
  };

  return (
    <div className="min-h-screen bg-white">
      <RideNavbar />
      
      <main className="pt-20 px-4 md:px-8 max-w-5xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <Link to="/ride" className="p-2 hover:bg-gray-100 rounded-full">
            <ArrowLeft className="h-6 w-6" />
          </Link>
          <h1 className="text-2xl font-bold">Activity</h1>
        </div>

        <section className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Recent Activity</h2>
            
            <div className="flex gap-3">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    {filter}
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-40">
                  <DropdownMenuItem onClick={() => setFilter("Personal")}>
                    Personal
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilter("Business")}>
                    Business
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    {tripType}
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem onClick={() => setTripType("All Trips")}>
                    All Trips
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTripType("Past Month")}>
                    Past Month
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTripType("Past 6 Months")}>
                    Past 6 Months
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <ScrollArea className="h-[600px] rounded-md border p-4">
            {activities.length > 0 ? (
              activities.map((activity) => (
                <Card key={activity.id} className="mb-4 p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-lg font-medium">{activity.name}</h3>
                      <p className="text-sm text-gray-500">{activity.location}</p>
                      <p className="text-sm text-gray-500">{activity.date} • {activity.time}</p>
                    </div>
                    <span className="text-lg font-medium">{activity.price}</span>
                  </div>
                  
                  <div className="flex gap-4 mt-4">
                    <Button variant="ghost" size="sm" className="text-black">
                      <HelpCircle className="h-4 w-4 mr-2" />
                      Help
                    </Button>
                    <Button variant="ghost" size="sm" className="text-black">
                      <FileText className="h-4 w-4 mr-2" />
                      Receipt
                    </Button>
                    <Button variant="ghost" size="sm" className="text-black">
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Rebook
                    </Button>
                  </div>
                </Card>
              ))
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500">No activities to display</p>
              </div>
            )}
          </ScrollArea>
        </section>
      </main>
    </div>
  );
};

export default ActivityPage;
