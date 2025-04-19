
import { Car, Clock, Award, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const RideOptions = () => {
  // Sample ride options
  const rideOptions = [
    {
      id: 'uberx',
      name: 'UberX',
      description: 'Affordable, everyday rides',
      icon: Car,
      price: '$18.50',
      time: '8 min',
      isPopular: true
    },
    {
      id: 'ubercomfort',
      name: 'Comfort',
      description: 'Newer cars with extra legroom',
      icon: Car,
      price: '$24.75',
      time: '10 min',
      isPopular: false
    },
    {
      id: 'uberxl',
      name: 'UberXL',
      description: 'Affordable rides for groups up to 6',
      icon: Car,
      price: '$30.20',
      time: '12 min',
      isPopular: false
    },
  ];

  return (
    <div className="border-t border-border">
      <div className="px-4 py-3 flex justify-between items-center border-b border-border">
        <div className="flex items-center">
          <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
          <span className="text-sm font-medium">Arrives in 3 min</span>
        </div>
        <Button variant="ghost" size="sm" className="text-sm font-medium">
          Schedule
          <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      </div>
      
      <div className="py-2">
        {rideOptions.map((option) => (
          <div 
            key={option.id}
            className="px-4 py-3 flex items-center justify-between hover:bg-secondary/50 cursor-pointer"
          >
            <div className="flex items-center">
              <div className="bg-secondary w-10 h-10 rounded-full flex items-center justify-center mr-3">
                <option.icon className="h-6 w-6" />
              </div>
              <div>
                <div className="flex items-center">
                  <h3 className="font-medium">{option.name}</h3>
                  {option.isPopular && (
                    <div className="ml-2 px-1.5 py-0.5 bg-primary/10 rounded text-xs text-primary font-medium flex items-center">
                      <Award className="h-3 w-3 mr-1" />
                      Popular
                    </div>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">{option.description}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-medium">{option.price}</p>
              <p className="text-sm text-muted-foreground">{option.time}</p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="p-4 border-t border-border">
        <Button className="w-full uber-button-primary">
          Choose UberX
        </Button>
      </div>
    </div>
  );
};

export default RideOptions;
