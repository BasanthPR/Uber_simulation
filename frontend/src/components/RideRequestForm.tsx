
import { useState } from "react";
import { Search, MapPin, Clock, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import RideOptions from "./RideOptions";

type RideRequestFormProps = {
  onLocationSelect: (pickup: [number, number] | undefined, dropoff: [number, number] | undefined) => void;
};

const RideRequestForm = ({ onLocationSelect }: RideRequestFormProps) => {
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [showRideOptions, setShowRideOptions] = useState(false);
  
  // Mock function to simulate location search
  const handleSearch = () => {
    // In a real app, we would use geocoding here
    // For demo purposes, we'll use hardcoded coordinates
    
    // NYC locations as examples
    const pickupCoords: [number, number] = [-73.98, 40.76]; // Times Square
    const dropoffCoords: [number, number] = [-73.96, 40.78]; // Upper East Side
    
    onLocationSelect(pickupCoords, dropoffCoords);
    setShowRideOptions(true);
  };
  
  return (
    <div className="w-full max-w-md bg-card rounded-lg shadow-lg border border-border overflow-hidden">
      <div className="p-4">
        <h2 className="text-xl font-bold mb-4">Request a ride</h2>
        
        <div className="space-y-3 mb-4">
          <div className="relative">
            <div className="absolute top-3 left-3">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
            </div>
            <input
              type="text"
              placeholder="Enter pickup location"
              className="uber-input pl-8 w-full"
              value={pickup}
              onChange={(e) => setPickup(e.target.value)}
            />
          </div>
          
          <div className="relative">
            <div className="absolute top-3 left-3">
              <div className="w-2 h-2 bg-uber-green rounded-full"></div>
            </div>
            <input
              type="text"
              placeholder="Enter destination"
              className="uber-input pl-8 w-full"
              value={dropoff}
              onChange={(e) => setDropoff(e.target.value)}
            />
          </div>
        </div>
        
        <div className="flex space-x-2 mb-4">
          <Button variant="outline" size="sm" className="flex-1">
            <Clock className="h-4 w-4 mr-2" />
            Now
            <ChevronDown className="h-4 w-4 ml-1" />
          </Button>
          
          <Button variant="outline" size="sm" className="flex-1">
            <MapPin className="h-4 w-4 mr-2" />
            Saved Places
            <ChevronDown className="h-4 w-4 ml-1" />
          </Button>
        </div>
        
        <Button 
          className="w-full uber-button-primary" 
          onClick={handleSearch}
          disabled={!pickup || !dropoff}
        >
          <Search className="h-4 w-4 mr-2" />
          Find Rides
        </Button>
      </div>
      
      {showRideOptions && <RideOptions />}
    </div>
  );
};

export default RideRequestForm;
