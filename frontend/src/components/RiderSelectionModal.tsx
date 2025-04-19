
import { useState } from 'react';
import { X, User, UserPlus, Check } from 'lucide-react';
import { Button } from "@/components/ui/button";

type RiderSelectionModalProps = {
  onClose: () => void;
  onSelect: (rider: string) => void;
};

const RiderSelectionModal = ({ onClose, onSelect }: RiderSelectionModalProps) => {
  const [selectedRider, setSelectedRider] = useState('me');

  const handleSelect = (rider: string) => {
    setSelectedRider(rider);
  };

  const handleDone = () => {
    onSelect(selectedRider);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-white z-50 overflow-y-auto">
      <div className="p-4 max-w-lg mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">
            Switch rider
          </h1>
          <Button variant="ghost" onClick={onClose} className="p-2">
            <X className="h-6 w-6" />
          </Button>
        </div>

        <div className="space-y-4">
          <div 
            className="flex items-center justify-between p-4 rounded-lg hover:bg-gray-100 cursor-pointer"
            onClick={() => handleSelect('me')}
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                <User className="h-6 w-6 text-gray-500" />
              </div>
              <span className="text-xl font-medium">Me</span>
            </div>
            {selectedRider === 'me' && (
              <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
                <Check className="h-5 w-5 text-white" />
              </div>
            )}
          </div>

          <div className="border-t border-gray-200 my-2"></div>

          <div 
            className="flex items-center p-4 rounded-lg hover:bg-gray-100 cursor-pointer"
            onClick={() => handleSelect('someone_else')}
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                <UserPlus className="h-6 w-6 text-gray-500" />
              </div>
              <span className="text-xl font-medium">Order ride for someone else</span>
            </div>
          </div>

          <Button 
            className="w-full bg-black hover:bg-gray-800 text-white p-4 h-auto text-lg mt-8"
            onClick={handleDone}
          >
            Done
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RiderSelectionModal;
