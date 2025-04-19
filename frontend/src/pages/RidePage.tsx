
import { useState } from "react";
import { Search, ChevronDown, Clock, MapPin, User, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  Dialog,
  DialogContent, 
  DialogTrigger
} from "@/components/ui/dialog";
import { toast } from "@/components/ui/use-toast";
import Map from "@/components/Map";
import RideNavbar from "@/components/RideNavbar";

const RidePage = () => {
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [additionalStops, setAdditionalStops] = useState<string[]>([]);
  const [pickupLocation, setPickupLocation] = useState<[number, number] | undefined>(undefined);
  const [dropoffLocation, setDropoffLocation] = useState<[number, number] | undefined>(undefined);
  const [pickupModalOpen, setPickupModalOpen] = useState(false);
  const [riderModalOpen, setRiderModalOpen] = useState(false);
  const [pickupTime, setPickupTime] = useState("Pickup now");
  const [selectedRider, setSelectedRider] = useState("For me");

  // Pickup time options
  const timeOptions = [
    "Pickup now",
    "Pickup in 15 minutes",
    "Pickup in 30 minutes",
    "Pickup in 45 minutes",
    "Schedule for later"
  ];

  // Rider options
  const riderOptions = [
    "For me",
    "For someone else"
  ];

  const handleAddressSearch = () => {
    if (!pickup || !dropoff) {
      toast({
        title: "Missing information",
        description: "Please enter both pickup and dropoff locations",
        variant: "destructive"
      });
      return;
    }
    
    // For demo purposes, using fixed coordinates
    setPickupLocation([-122.1430, 37.4419]); // Palo Alto
    setDropoffLocation([-122.0841, 37.3893]); // Mountain View
    
    toast({
      title: "Searching for rides",
      description: "Finding the best options for your trip"
    });
  };

  const handleAddStop = () => {
    if (additionalStops.length < 3) {
      setAdditionalStops([...additionalStops, ""]);
    } else {
      toast({
        title: "Maximum stops reached",
        description: "You can add up to 3 additional stops",
        variant: "destructive"
      });
    }
  };

  const handleRemoveStop = (index: number) => {
    const newStops = [...additionalStops];
    newStops.splice(index, 1);
    setAdditionalStops(newStops);
  };

  const updateStop = (index: number, value: string) => {
    const newStops = [...additionalStops];
    newStops[index] = value;
    setAdditionalStops(newStops);
  };

  return (
    <div className="h-screen w-full flex flex-col">
      <RideNavbar />
      
      <div className="flex-1 relative pt-16">
        {/* Map takes the full screen */}
        <Map 
          pickupLocation={pickupLocation}
          dropoffLocation={dropoffLocation}
          className="h-full w-full absolute inset-0"
        />
        
        {/* Ride request form overlay */}
        <div className="absolute top-4 left-4 md:left-8 z-10 max-w-md">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Get a ride</h2>
            
            <div className="space-y-3 mb-4">
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
              
              {/* Additional stops */}
              {additionalStops.map((stop, index) => (
                <div className="relative" key={`stop-${index}`}>
                  <div className="absolute top-3 left-3">
                    <div className="w-2 h-2 bg-black rounded-full"></div>
                  </div>
                  <div className="flex">
                    <input
                      type="text"
                      placeholder={`Stop ${index + 1}`}
                      className="w-full p-3 pl-8 border border-gray-300 rounded-l-md focus:outline-none"
                      value={stop}
                      onChange={(e) => updateStop(index, e.target.value)}
                    />
                    <Button 
                      variant="ghost" 
                      className="border border-gray-300 border-l-0 rounded-l-none rounded-r-md px-2"
                      onClick={() => handleRemoveStop(index)}
                    >
                      <X className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              ))}
              
              <div className="relative">
                <div className="absolute top-3 left-3">
                  <div className="w-2 h-2 bg-black rounded-full"></div>
                </div>
                <div className="flex">
                  <input
                    type="text"
                    placeholder="Dropoff location"
                    className="w-full p-3 pl-8 border border-gray-300 rounded-l-md focus:outline-none"
                    value={dropoff}
                    onChange={(e) => setDropoff(e.target.value)}
                  />
                  <Button 
                    variant="ghost" 
                    className="border border-gray-300 border-l-0 rounded-l-none rounded-r-md px-2"
                    onClick={handleAddStop}
                  >
                    <Plus className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="mb-4">
              {/* Pickup time dropdown */}
              <Dialog open={pickupModalOpen} onOpenChange={setPickupModalOpen}>
                <DialogTrigger asChild>
                  <Button 
                    variant="outline" 
                    className="w-full flex items-center justify-between border border-gray-300 p-3"
                  >
                    <div className="flex items-center">
                      <Clock className="h-5 w-5 mr-2" />
                      <span>{pickupTime}</span>
                    </div>
                    <ChevronDown className="h-5 w-5" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <div className="py-2">
                    <h3 className="text-lg font-medium mb-2">When do you want to be picked up?</h3>
                    <div className="space-y-2">
                      {timeOptions.map((option) => (
                        <Button
                          key={option}
                          variant="ghost"
                          className="w-full justify-start py-2 px-3 text-left"
                          onClick={() => {
                            setPickupTime(option);
                            setPickupModalOpen(false);
                          }}
                        >
                          {option}
                        </Button>
                      ))}
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
            
            <div className="mb-4">
              {/* Rider selection dropdown */}
              <Dialog open={riderModalOpen} onOpenChange={setRiderModalOpen}>
                <DialogTrigger asChild>
                  <Button 
                    variant="outline" 
                    className="w-full flex items-center justify-between border border-gray-300 p-3"
                  >
                    <div className="flex items-center">
                      <User className="h-5 w-5 mr-2" />
                      <span>{selectedRider}</span>
                    </div>
                    <ChevronDown className="h-5 w-5" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <div className="py-2">
                    <h3 className="text-lg font-medium mb-2">Who is this ride for?</h3>
                    <div className="space-y-2">
                      {riderOptions.map((option) => (
                        <Button
                          key={option}
                          variant="ghost"
                          className="w-full justify-start py-2 px-3 text-left"
                          onClick={() => {
                            setSelectedRider(option);
                            setRiderModalOpen(false);
                          }}
                        >
                          {option}
                        </Button>
                      ))}
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
            
            <Button
              className="w-full bg-black hover:bg-gray-800 text-white p-3"
              onClick={handleAddressSearch}
              disabled={!pickup || !dropoff}
            >
              <Search className="h-5 w-5 mr-2" />
              Search
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RidePage;
