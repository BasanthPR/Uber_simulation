
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Map from "@/components/Map";
import RideRequestForm from "@/components/RideRequestForm";

const Index = () => {
  const [pickupLocation, setPickupLocation] = useState<[number, number] | undefined>(undefined);
  const [dropoffLocation, setDropoffLocation] = useState<[number, number] | undefined>(undefined);

  const handleLocationSelect = (pickup: [number, number] | undefined, dropoff: [number, number] | undefined) => {
    setPickupLocation(pickup);
    setDropoffLocation(dropoff);
  };

  return (
    <div className="h-screen w-full bg-background text-foreground flex flex-col">
      <Navbar />
      
      <div className="flex-1 pt-16 relative">
        {/* Map takes the full screen */}
        <Map 
          pickupLocation={pickupLocation}
          dropoffLocation={dropoffLocation}
          className="h-full w-full absolute inset-0"
        />
        
        {/* Overlay with ride request form */}
        <div className="absolute top-4 left-4 md:left-8 z-10 max-w-md">
          <RideRequestForm onLocationSelect={handleLocationSelect} />
        </div>
      </div>
    </div>
  );
};

export default Index;
