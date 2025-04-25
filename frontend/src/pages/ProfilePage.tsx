

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import CustomerProfileDetails from "@/components/CustomerProfileDetails";
import { CustomerProfile } from "@/types/customer";
import axios from "axios";


// const ProfilePage = () => {
//  const navigate = useNavigate();
//  const [profile, setProfile] = useState<CustomerProfile>({
//    id: "123-45-6789",
//    firstName: "John",
//    lastName: "Doe",
//    address: "123 Main St",
//    city: "San Francisco",
//    state: "CA",
//    zipCode: "94105",
//    phoneNumber: "(555) 123-4567",
//    email: "john.doe@example.com",
//    rating: 4.74,
//    cardDetails: {
//      last4Digits: "4321",
//      cardType: "Visa",
//      expiryMonth: 12,
//      expiryYear: 2025
//    },
//    ridesHistory: [
//      {
//        id: "1",
//        date: "2024-04-23",
//        destination: "SFO Airport",
//        price: 45.00
//      },
//      {
//        id: "2",
//        date: "2024-04-22",
//        destination: "Downtown SF",
//        price: 22.50
//      }
//    ],
//    reviews: [
//      {
//        id: "1",
//        rating: 5,
//        comment: "Great passenger, very punctual!",
//        date: "2024-04-23"
//      },
//      {
//        id: "2",
//        rating: 4.5,
//        comment: "Pleasant ride experience",
//        date: "2024-04-22"
//      }
//    ]
//  });


//  const handleClose = () => {
//    navigate(-1);
//  };


//  const handleManageAccount = () => {
//    navigate("/account/settings");
//  };


//  const handleSignOut = () => {
//    localStorage.removeItem('username');
//    toast({
//      title: "Signed out successfully",
//      description: "You have been signed out of your account."
//    });
//    navigate('/');
//  };


//  return (
//    <div className="fixed inset-0 bg-white z-50 overflow-y-auto">
//      <div className="max-w-3xl mx-auto p-6">
//        <div className="flex items-center justify-between mb-6">
//          <h1 className="text-3xl font-bold">{`${profile.firstName} ${profile.lastName}`}</h1>
//          <button className="p-2" onClick={handleClose}>
//            <ChevronUp className="h-6 w-6" />
//          </button>
//        </div>


//        <CustomerProfileDetails profile={profile} />


//        <div className="mt-8 space-y-4">
//          <Button
//            variant="outline"
//            className="w-full py-4 text-xl"
//            onClick={handleManageAccount}
//          >
//            Manage Account
//          </Button>
        
//          <Button
//            variant="outline"
//            className="w-full py-4 text-xl text-red-600 hover:text-red-700"
//            onClick={handleSignOut}
//          >
//            Sign out
//          </Button>
//        </div>
//      </div>
//    </div>
//  );
// };


// export default ProfilePage;


const validStates = [
  "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY",
  "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"
];

const ProfilePage = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({
    customerId: "",
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    cardDetails: {
      last4Digits: "",
      cardType: "",
      expiryMonth: "",
      expiryYear: "",
    },
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          toast({
            title: "Unauthorized",
            description: "Please log in to access your profile.",
            variant: "destructive",
          });
          navigate("/login");
          return;
        }

        const { data } = await axios.get("http://localhost:3000/api/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setProfile((prev) => ({
          ...prev,
          customerId: data.customerId || "",
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          phoneNumber: data.phoneNumber || "",
          address: data.address || "",
          city: data.city || "",
          state: data.state || "",
          zipCode: data.zipCode || "",
          cardDetails: data.creditCard || {
            last4Digits: "",
            cardType: "",
            expiryMonth: "",
            expiryYear: "",
          },
        }));
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to fetch profile details.",
          variant: "destructive",
        });
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name.startsWith("cardDetails.")) {
      const key = name.split(".")[1];
      setProfile((prev) => ({
        ...prev,
        cardDetails: { ...prev.cardDetails, [key]: value },
      }));
    } else {
      setProfile((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        "http://localhost:3000/api/profile",
        {
          ...profile,
          creditCard: profile.cardDetails,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast({
        title: "Profile Updated",
        description: "Your profile has been successfully updated.",
      });

      navigate("/");
    } catch (error) {
      toast({
        title: "Update Failed",
        description: "An error occurred while saving your profile.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <header className="border-b border-gray-200 py-2">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-2xl font-bold">Customer Profile Page</h1>
        </div>
      </header>

      <main className="flex-1 flex items-start justify-center py-6 px-4">
        <form onSubmit={handleSubmit} className="w-full max-w-lg space-y-6">
          {/* Personal Info */}
          <div>
            <h2 className="text-xl font-bold mb-4">Personal Information</h2>
            <input type="text" name="firstName" placeholder="First Name" value={profile.firstName} onChange={handleChange} className="w-full border p-2 rounded mb-4" />
            <input type="text" name="lastName" placeholder="Last Name" value={profile.lastName} onChange={handleChange} className="w-full border p-2 rounded mb-4" />
            <input type="text" name="customerId" placeholder="Customer ID (SSN format)" value={profile.customerId} onChange={handleChange} className="w-full border p-2 rounded mb-4" />
            <input type="email" name="email" placeholder="Email" value={profile.email} onChange={handleChange} className="w-full border p-2 rounded mb-4" disabled />
            <input type="text" name="phoneNumber" placeholder="Phone Number" value={profile.phoneNumber} onChange={handleChange} className="w-full border p-2 rounded" />
          </div>

          {/* Address Info */}
          <div>
            <h2 className="text-xl font-bold mb-4">Address Information</h2>
            <input type="text" name="address" placeholder="Address" value={profile.address} onChange={handleChange} className="w-full border p-2 rounded mb-4" />
            <input type="text" name="city" placeholder="City" value={profile.city} onChange={handleChange} className="w-full border p-2 rounded mb-4" />
            <input type="text" name="state" placeholder="State" value={profile.state} onChange={handleChange} className="w-full border p-2 rounded mb-4" />
            <input type="text" name="zipCode" placeholder="ZIP Code" value={profile.zipCode} onChange={handleChange} className="w-full border p-2 rounded" />
          </div>

          {/* Card Info */}
          <div>
            <h2 className="text-xl font-bold mb-4">Credit Card Details</h2>
            <input type="text" name="cardDetails.cardType" placeholder="Card Type" value={profile.cardDetails.cardType} onChange={handleChange} className="w-full border p-2 rounded mb-4" />
            <input type="text" name="cardDetails.last4Digits" placeholder="Last 4 Digits" value={profile.cardDetails.last4Digits} onChange={handleChange} className="w-full border p-2 rounded mb-4" />
            <div className="flex gap-4">
              <input type="text" name="cardDetails.expiryMonth" placeholder="Expiry Month (MM)" value={profile.cardDetails.expiryMonth} onChange={handleChange} className="flex-1 border p-2 rounded" />
              <input type="text" name="cardDetails.expiryYear" placeholder="Expiry Year (YYYY)" value={profile.cardDetails.expiryYear} onChange={handleChange} className="flex-1 border p-2 rounded" />
            </div>
          </div>

          <Button type="submit" className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded">
            Save Profile
          </Button>
        </form>
      </main>
    </div>
  );
};

export default ProfilePage;