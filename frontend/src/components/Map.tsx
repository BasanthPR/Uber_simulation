
import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { toast } from "@/components/ui/use-toast";

type MapProps = {
  pickupLocation?: [number, number];
  dropoffLocation?: [number, number];
  className?: string;
};

const Map = ({ pickupLocation, dropoffLocation, className = '' }: MapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [mapboxToken, setMapboxToken] = useState<string>('');
  const [tokenError, setTokenError] = useState<string>('');

  useEffect(() => {
    // For demo purposes, we would use an environment variable in production
    // This is just a temporary state for user to input their token
    if (!mapboxToken) return;
    
    // Validate token format - must start with "pk."
    if (!mapboxToken.startsWith('pk.')) {
      setTokenError('Please use a public access token (starts with pk.)');
      toast({
        title: "Invalid Mapbox Token",
        description: "Please use a public access token that starts with 'pk.'",
        variant: "destructive"
      });
      return;
    } else {
      setTokenError('');
    }
    
    if (mapContainer.current && !map.current) {
      try {
        mapboxgl.accessToken = mapboxToken;
        
        map.current = new mapboxgl.Map({
          container: mapContainer.current,
          style: 'mapbox://styles/mapbox/dark-v11', // Uber-like dark style
          center: [-74.006, 40.7128], // Default to NYC
          zoom: 12,
        });

        map.current.on('load', () => {
          setMapLoaded(true);
        });
      } catch (error) {
        console.error('Mapbox initialization error:', error);
        setTokenError(error instanceof Error ? error.message : 'Failed to initialize map');
        toast({
          title: "Map Error",
          description: error instanceof Error ? error.message : 'Failed to initialize map',
          variant: "destructive"
        });
      }
    }

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, [mapboxToken]);

  // Add markers when locations change
  useEffect(() => {
    if (!mapLoaded || !map.current) return;
    
    // Clear existing markers
    const markers = document.querySelectorAll('.mapboxgl-marker');
    markers.forEach(marker => marker.remove());
    
    // Add pickup marker
    if (pickupLocation) {
      const el = document.createElement('div');
      el.className = 'pickup-marker';
      el.style.backgroundColor = '#276EF1'; // Uber blue
      el.style.width = '15px';
      el.style.height = '15px';
      el.style.borderRadius = '50%';
      el.style.border = '2px solid white';
      
      new mapboxgl.Marker(el)
        .setLngLat(pickupLocation)
        .addTo(map.current);
        
      map.current.flyTo({
        center: pickupLocation,
        zoom: 14,
        essential: true
      });
    }
    
    // Add dropoff marker
    if (dropoffLocation) {
      const el = document.createElement('div');
      el.className = 'dropoff-marker';
      el.style.backgroundColor = '#05A357'; // Uber green
      el.style.width = '15px';
      el.style.height = '15px';
      el.style.borderRadius = '50%';
      el.style.border = '2px solid white';
      
      new mapboxgl.Marker(el)
        .setLngLat(dropoffLocation)
        .addTo(map.current);
    }
    
    // If both locations are set, fit bounds to include both
    if (pickupLocation && dropoffLocation && map.current) {
      const bounds = new mapboxgl.LngLatBounds();
      bounds.extend(pickupLocation);
      bounds.extend(dropoffLocation);
      
      map.current.fitBounds(bounds, {
        padding: 100,
        maxZoom: 15
      });
    }
  }, [pickupLocation, dropoffLocation, mapLoaded]);

  return (
    <div className={`relative ${className}`}>
      {!mapboxToken && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-background z-10 p-4">
          <p className="mb-4 text-center">Please enter your Mapbox public token to use the map</p>
          <input 
            type="text" 
            className="uber-input w-full max-w-sm mb-2" 
            placeholder="Enter your Mapbox public token (starts with pk.)"
            onChange={(e) => setMapboxToken(e.target.value)}
          />
          <p className="text-xs text-muted-foreground text-center">
            You can get a token at <a href="https://mapbox.com" className="text-primary underline" target="_blank" rel="noopener noreferrer">mapbox.com</a>
          </p>
          {tokenError && (
            <p className="text-red-500 mt-2 text-sm">{tokenError}</p>
          )}
        </div>
      )}
      <div ref={mapContainer} className="w-full h-full rounded-lg overflow-hidden" />
      {/* Overlay with Uber logo when map is loading or not available */}
      {(!mapboxToken || !mapLoaded) && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm z-0">
          <div className="text-4xl font-bold mb-4">Uber</div>
          <div className="text-muted-foreground">Map loading...</div>
        </div>
      )}
    </div>
  );
};

export default Map;
