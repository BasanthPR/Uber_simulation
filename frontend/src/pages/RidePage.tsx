import { useEffect, useState } from "react";
import { Search, ChevronDown, Clock, User, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "@/components/ui/use-toast";
import Map from "@/components/Map";
import RideNavbar from "@/components/RideNavbar";
import axios from 'axios';

const RidePage = () => {
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [additionalStops, setAdditionalStops] = useState<string[]>([]);
  const [pickupLocation, setPickupLocation] = useState<[number, number]>();
  const [dropoffLocation, setDropoffLocation] = useState<[number, number]>();
  const [pickupModalOpen, setPickupModalOpen] = useState(false);
  const [riderModalOpen, setRiderModalOpen] = useState(false);
  const [pickupTime, setPickupTime] = useState("Pickup now");
  const [selectedRider, setSelectedRider] = useState("For me");
  const [mapboxToken, setMapboxToken] = useState("");
  const [pickupSuggestions, setPickupSuggestions] = useState<any[]>([]);
  const [dropoffSuggestions, setDropoffSuggestions] = useState<any[]>([]);

  const timeOptions = [
    "Pickup now",
    "Pickup in 15 minutes",
    "Pickup in 30 minutes",
    "Pickup in 45 minutes",
    "Schedule for later",
  ];

  const riderOptions = ["For me", "For someone else"];

  // Fetch the token once from your backend
  useEffect(() => {
    const fetchToken = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/mapbox-token");
        const data = await res.json();
        setMapboxToken(data.token);
      } catch (error) {
        console.error("Failed to fetch Mapbox token", error);
      }
    };

    fetchToken();
  }, []);

  // 🔍 Fetch pickup suggestions
  useEffect(() => {
    if (!mapboxToken || pickup.length < 3) {
      setPickupSuggestions([]);
      return;
    }
  
    const controller = new AbortController();
    const fetchSuggestions = async () => {
      try {
        const res = await fetch(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(pickup)}.json?access_token=${mapboxToken}&autocomplete=true&limit=5`,
          { signal: controller.signal }
        );
        const data = await res.json();
        setPickupSuggestions(data.features || []);
      } catch (err) {
        if ((err as any).name !== "AbortError") {
          console.error("Pickup fetch failed", err);
        }
      }
    };
  
    fetchSuggestions();
    return () => controller.abort();
  }, [pickup, mapboxToken]);
  
  // 🔍 Fetch dropoff suggestions
  useEffect(() => {
    if (!mapboxToken || dropoff.length < 3) {
      setDropoffSuggestions([]);
      return;
    }
  
    const controller = new AbortController();
    const fetchSuggestions = async () => {
      try {
        const res = await fetch(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(dropoff)}.json?access_token=${mapboxToken}&autocomplete=true&limit=5`,
          { signal: controller.signal }
        );
        const data = await res.json();
        setDropoffSuggestions(data.features || []);
      } catch (err) {
        if ((err as any).name !== "AbortError") {
          console.error("Dropoff fetch failed", err);
        }
      }
    };
  
    fetchSuggestions();
    return () => controller.abort();
  }, [dropoff, mapboxToken]);
  

  const handleAddressSearch = async () => {
    if (!pickup || !dropoff) {
      toast({
        title: "Missing information",
        description: "Please enter both pickup and dropoff locations",
        variant: "destructive",
      });
      return;
    }
    try {
      const res = await axios.post("http://localhost:3000/api/rides", {
        pickup,
        dropoff,
        pickupCoords: pickupLocation,
        dropoffCoords: dropoffLocation,
        time: pickupTime,
        rider: selectedRider,
        additionalStops,
      });

    toast({
      title: "Searching for rides",
      description: "Finding the best options for your trip",
    });
    console.log("Ride saved:", res.data);
  } catch (err) {
    toast({
      title: "Request failed",
      description: "Something went wrong. Please try again.",
      variant: "destructive",
    });
  }
};

  const handleAddStop = () => {
    if (additionalStops.length < 3) {
      setAdditionalStops([...additionalStops, ""]);
    } else {
      toast({
        title: "Maximum stops reached",
        description: "You can add up to 3 additional stops",
        variant: "destructive",
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

      <div className="flex-1 relative pt-20">
        <Map
          pickupLocation={pickupLocation}
          dropoffLocation={dropoffLocation}
          className="absolute inset-0 h-full w-full"
        />

        <div className="absolute top-24 left-4 md:left-8 z-30 w-[90vw] max-w-md">
          <div className="bg-white/80 backdrop-blur-lg border border-white/30 rounded-2xl shadow-2xl p-6">
            <h2 className="text-2xl font-bold mb-4">Get a ride</h2>

            {/* Pickup Input */}
            <div className="relative mb-3">
            <div className="flex">
              <div className="absolute top-1/2 left-3 -translate-y-1/2 w-3 h-3 bg-black rounded-full shadow-sm border border-white" />
              <input
                type="text"
                placeholder="Pickup location"
                className="w-full p-3 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black/80 transition"
                value={pickup}
                onChange={(e) => setPickup(e.target.value)}
              />
              {pickupSuggestions.length > 0 && (
                <ul className="absolute z-50 top-full left-0 right-0 bg-white border rounded-md shadow mt-1 max-h-60 overflow-y-auto">
                  {pickupSuggestions.map((place) => (
                    <li
                      key={place.id}
                      className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => {
                        setPickup(place.place_name);
                        setPickupLocation(place.center);
                        setPickupSuggestions([]);
                        (document.activeElement as HTMLElement)?.blur();
                      }}
                    >
                      {place.place_name}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            </div>

            {/* Dropoff Input */}
            <div className="relative mb-4">
              <div className="absolute top-3 left-3 w-2 h-2 bg-black rounded-full" />
              <div className="flex">
                <div className="relative w-full">
                <div className="absolute top-1/2 left-3 -translate-y-1/2 w-3 h-3 bg-black square-full shadow-sm border border-white" />
                  <input
                    type="text"
                    placeholder="Dropoff location"
                    className="w-full p-3 pl-10 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-black/80 transition"
                    value={dropoff}
                    onChange={(e) => setDropoff(e.target.value)}
                  />
                  {dropoffSuggestions.length > 0 && (
                    <ul className="absolute z-50 top-full left-0 right-0 bg-white border rounded-md shadow mt-1 max-h-60 overflow-y-auto">
                      {dropoffSuggestions.map((place) => (
                        <li
                          key={place.id}
                          className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                          onClick={() => {
                            setDropoff(place.place_name);
                            setDropoffLocation(place.center);
                            setDropoffSuggestions([]);
                            (document.activeElement as HTMLElement)?.blur();
                          }}
                        >
                          {place.place_name}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                <Button
                  // variant="ghost"
                  className="ml-2 z-50 border border-gray-300 bg-white rounded-md px-2"
                  onClick={handleAddStop}
                >
                  <Plus className="h-5 w-5" />
                </Button>
              </div>
            </div>
            {/* Additional Stops */}
            {additionalStops.map((stop, index) => (
              <div key={index} className="relative mb-4 flex">
                <div className="relative w-full">
                  <div className="absolute top-1/2 left-3 -translate-y-1/2 w-3 h-3 bg-black rounded-full shadow-sm border border-white" />
                  <input
                    type="text"
                    placeholder={`Stop ${index + 1}`}
                    className="w-full p-3 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black/80 transition"
                    value={stop}
                    onChange={(e) => updateStop(index, e.target.value)}
                  />
                </div>
                <Button
                  variant="ghost"
                  className="ml-2 border border-gray-300 rounded-md px-2"
                  onClick={() => handleRemoveStop(index)}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
            ))}


            {/* Time & Rider Dialogs */}
            <div className="mb-4">
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
                <DialogContent className="sm:max-w-md bg-white rounded-md shadow-lg">
                  <div className="py-2">
                    <h3 className="text-lg font-medium mb-2">
                      When do you want to be picked up?
                    </h3>
                    <div className="space-y-2">
                      {timeOptions.map((option) => (
                        <Button
                          key={option}
                          // variant="outline"
                          className="w-full justify-start py-2 px-3 text-left border border-gray-400 rounded-md hover:border-black"
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
                <DialogContent className="sm:max-w-md bg-white rounded-md shadow-lg">
                  <div className="py-2">
                    <h3 className="text-lg font-medium mb-2">
                      Who is this ride for?
                    </h3>
                    <div className="space-y-2">
                      {riderOptions.map((option) => (
                        <Button
                          key={option}
                          // variant="ghost"
                          className="w-full justify-start py-2 px-3 text-left border border-gray-400 rounded-md hover:border-black"
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
              className="w-full bg-black hover:bg-zinc-900 text-white p-3 font-semibold rounded-lg transition shadow-md"
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
