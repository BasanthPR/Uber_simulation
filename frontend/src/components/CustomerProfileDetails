

import { Card, CardContent } from "@/components/ui/card";
import { CustomerProfile } from "@/types/customer";


interface CustomerProfileDetailsProps {
 profile: CustomerProfile;
}


const CustomerProfileDetails = ({ profile }: CustomerProfileDetailsProps) => {
 return (
   <div className="space-y-6">
     <Card>
       <CardContent className="p-6">
         <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
           <div>
             <p className="text-sm text-muted-foreground">Customer ID</p>
             <p className="font-medium">{profile.id}</p>
           </div>
           <div>
             <p className="text-sm text-muted-foreground">Name</p>
             <p className="font-medium">{`${profile.firstName} ${profile.lastName}`}</p>
           </div>
           <div>
             <p className="text-sm text-muted-foreground">Email</p>
             <p className="font-medium">{profile.email}</p>
           </div>
           <div>
             <p className="text-sm text-muted-foreground">Phone</p>
             <p className="font-medium">{profile.phoneNumber}</p>
           </div>
           <div className="col-span-2">
             <p className="text-sm text-muted-foreground">Address</p>
             <p className="font-medium">
               {profile.address}
               <br />
               {`${profile.city}, ${profile.state} ${profile.zipCode}`}
             </p>
           </div>
         </div>
       </CardContent>
     </Card>


     <Card>
       <CardContent className="p-6">
         <h2 className="text-xl font-semibold mb-4">Payment Information</h2>
         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
           <div>
             <p className="text-sm text-muted-foreground">Card Type</p>
             <p className="font-medium">{profile.cardDetails.cardType}</p>
           </div>
           <div>
             <p className="text-sm text-muted-foreground">Card Number</p>
             <p className="font-medium">•••• {profile.cardDetails.last4Digits}</p>
           </div>
           <div>
             <p className="text-sm text-muted-foreground">Expiry Date</p>
             <p className="font-medium">
               {profile.cardDetails.expiryMonth.toString().padStart(2, '0')}/
               {profile.cardDetails.expiryYear}
             </p>
           </div>
         </div>
       </CardContent>
     </Card>


     <Card>
       <CardContent className="p-6">
         <h2 className="text-xl font-semibold mb-4">Ride History</h2>
         <div className="space-y-4">
           {profile.ridesHistory.map((ride) => (
             <div key={ride.id} className="flex justify-between items-center border-b pb-2">
               <div>
                 <p className="font-medium">{ride.destination}</p>
                 <p className="text-sm text-muted-foreground">{ride.date}</p>
               </div>
               <p className="font-medium">${ride.price.toFixed(2)}</p>
             </div>
           ))}
         </div>
       </CardContent>
     </Card>


     <Card>
       <CardContent className="p-6">
         <h2 className="text-xl font-semibold mb-4">Reviews & Rating</h2>
         <div className="mb-4">
           <p className="text-sm text-muted-foreground">Overall Rating</p>
           <p className="text-2xl font-bold">{profile.rating.toFixed(1)}</p>
         </div>
         <div className="space-y-4">
           {profile.reviews.map((review) => (
             <div key={review.id} className="border-b pb-2">
               <div className="flex items-center gap-2">
                 <p className="font-medium">{review.rating.toFixed(1)}</p>
                 <p className="text-sm text-muted-foreground">{review.date}</p>
               </div>
               <p className="text-sm mt-1">{review.comment}</p>
             </div>
           ))}
         </div>
       </CardContent>
     </Card>
   </div>
 );
};


export default CustomerProfileDetails;
