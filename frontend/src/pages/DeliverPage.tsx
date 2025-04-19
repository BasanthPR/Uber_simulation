
import { useState } from "react";
import { Search, ChevronDown, Clock, MapPin, User, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { toast } from "@/components/ui/use-toast";
import Map from "@/components/Map";
import RideNavbar from "@/components/RideNavbar";

const DeliverPage = () => {
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [additionalStops, setAdditionalStops] = useState<string[]>([]);
  const [pickupLocation, setPickupLocation] = useState<[number, number] | undefined>(undefined);
  const [dropoffLocation, setDropoffLocation] = useState<[number, number] | undefined>(undefined);
  const [activeTab, setActiveTab] = useState("send");

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
      title: "Searching for couriers",
      description: "Finding the best delivery options"
    });
  };

  const handleAddStop = () => {
    if (additionalStops.length < 2) {
      setAdditionalStops([...additionalStops, ""]);
    } else {
      toast({
        title: "Maximum stops reached",
        description: "You can add up to 2 additional stops for delivery",
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
        
        {/* Delivery form overlay */}
        <div className="absolute top-4 left-4 md:left-8 z-10 max-w-md">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-3xl font-bold mb-3">Courier</h2>
            <p className="text-gray-600 mb-4">
              Have a courier deliver something for you. Get packages delivered in the time it takes to drive there.
            </p>
            
            {/* Tabs */}
            <Tabs defaultValue="send" className="mb-4">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="send" onClick={() => setActiveTab("send")}>Send</TabsTrigger>
                <TabsTrigger value="receive" onClick={() => setActiveTab("receive")}>Receive</TabsTrigger>
              </TabsList>
              
              <TabsContent value="send" className="space-y-4 mt-4">
                <div className="space-y-3">
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
                
                <Button
                  className="w-full bg-black hover:bg-gray-800 text-white p-3"
                  onClick={handleAddressSearch}
                  disabled={!pickup || !dropoff}
                >
                  <Search className="h-5 w-5 mr-2" />
                  Get price
                </Button>
              </TabsContent>
              
              <TabsContent value="receive" className="space-y-4 mt-4">
                <div className="space-y-3">
                  <div className="relative">
                    <div className="absolute top-3 left-3">
                      <div className="w-2 h-2 bg-black rounded-full"></div>
                    </div>
                    <input
                      type="text"
                      placeholder="Delivery location"
                      className="w-full p-3 pl-8 border border-gray-300 rounded-md focus:outline-none"
                    />
                  </div>
                  
                  <p className="text-sm text-gray-600 mt-2">
                    For deliveries to you, enter your location and share the link with the sender
                  </p>
                </div>
                
                <Button
                  className="w-full bg-black hover:bg-gray-800 text-white p-3"
                >
                  Get link to share
                </Button>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliverPage;
