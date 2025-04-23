

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import CustomerProfileDetails from "@/components/CustomerProfileDetails";
import { CustomerProfile } from "@/types/customer";


const ProfilePage = () => {
 const navigate = useNavigate();
 const [profile, setProfile] = useState<CustomerProfile>({
   id: "123-45-6789",
   firstName: "John",
   lastName: "Doe",
   address: "123 Main St",
   city: "San Francisco",
   state: "CA",
   zipCode: "94105",
   phoneNumber: "(555) 123-4567",
   email: "john.doe@example.com",
   rating: 4.74,
   cardDetails: {
     last4Digits: "4321",
     cardType: "Visa",
     expiryMonth: 12,
     expiryYear: 2025
   },
   ridesHistory: [
     {
       id: "1",
       date: "2024-04-23",
       destination: "SFO Airport",
       price: 45.00
     },
     {
       id: "2",
       date: "2024-04-22",
       destination: "Downtown SF",
       price: 22.50
     }
   ],
   reviews: [
     {
       id: "1",
       rating: 5,
       comment: "Great passenger, very punctual!",
       date: "2024-04-23"
     },
     {
       id: "2",
       rating: 4.5,
       comment: "Pleasant ride experience",
       date: "2024-04-22"
     }
   ]
 });


 const handleClose = () => {
   navigate(-1);
 };


 const handleManageAccount = () => {
   navigate("/account/settings");
 };


 const handleSignOut = () => {
   localStorage.removeItem('username');
   toast({
     title: "Signed out successfully",
     description: "You have been signed out of your account."
   });
   navigate('/');
 };


 return (
   <div className="fixed inset-0 bg-white z-50 overflow-y-auto">
     <div className="max-w-3xl mx-auto p-6">
       <div className="flex items-center justify-between mb-6">
         <h1 className="text-3xl font-bold">{`${profile.firstName} ${profile.lastName}`}</h1>
         <button className="p-2" onClick={handleClose}>
           <ChevronUp className="h-6 w-6" />
         </button>
       </div>


       <CustomerProfileDetails profile={profile} />


       <div className="mt-8 space-y-4">
         <Button
           variant="outline"
           className="w-full py-4 text-xl"
           onClick={handleManageAccount}
         >
           Manage Account
         </Button>
        
         <Button
           variant="outline"
           className="w-full py-4 text-xl text-red-600 hover:text-red-700"
           onClick={handleSignOut}
         >
           Sign out
         </Button>
       </div>
     </div>
   </div>
 );
};


export default ProfilePage;
