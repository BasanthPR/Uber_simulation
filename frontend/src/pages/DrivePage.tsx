
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import MainNavbar from "@/components/MainNavbar";

const DriveNav = () => (
  <div className="border-b border-gray-200">
    <div className="max-w-7xl mx-auto px-4 md:px-8">
      <nav className="flex space-x-8 overflow-x-auto">
        <Link 
          to="/drive" 
          className="text-black font-medium py-4 px-1 border-b-2 border-black whitespace-nowrap"
        >
          Driving overview
        </Link>
        <Link 
          to="/drive/requirements" 
          className="text-gray-500 font-medium py-4 px-1 hover:text-black whitespace-nowrap"
        >
          Driving requirements
        </Link>
        <Link 
          to="/drive/delivery" 
          className="text-gray-500 font-medium py-4 px-1 hover:text-black whitespace-nowrap"
        >
          Delivery driver
        </Link>
        <Link 
          to="/drive/basics" 
          className="text-gray-500 font-medium py-4 px-1 hover:text-black whitespace-nowrap"
        >
          Driving basics
        </Link>
        <Link 
          to="/drive/earnings" 
          className="text-gray-500 font-medium py-4 px-1 hover:text-black whitespace-nowrap"
        >
          Earnings
        </Link>
        <Link 
          to="/drive/vehicle" 
          className="text-gray-500 font-medium py-4 px-1 hover:text-black whitespace-nowrap"
        >
          Vehicle solutions
        </Link>
        <Link 
          to="/drive/safety" 
          className="text-gray-500 font-medium py-4 px-1 hover:text-black whitespace-nowrap"
        >
          Safety
        </Link>
        <Link 
          to="/drive/pro" 
          className="text-gray-500 font-medium py-4 px-1 hover:text-black whitespace-nowrap"
        >
          Uber Pro
        </Link>
        <Link 
          to="/drive/contact" 
          className="text-gray-500 font-medium py-4 px-1 hover:text-black whitespace-nowrap"
        >
          Contact us
        </Link>
      </nav>
    </div>
  </div>
);

const DrivePage = () => {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <MainNavbar />
      
      <div className="pt-16 bg-black">
        <div className="py-4">
          <h1 className="text-3xl font-bold px-4 md:px-8">Drive</h1>
        </div>
        
        <DriveNav />
      </div>
      
      <main className="flex-1 bg-black">
        <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="max-w-xl">
              <h2 className="text-5xl font-bold mb-6">
                Drive when you want, make what you need
              </h2>
              <p className="text-xl mb-8">
                Earn on your own schedule.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Link to="/signup">
                  <Button className="bg-white text-black hover:bg-gray-200 px-6 py-3 h-auto text-lg">
                    Get started
                  </Button>
                </Link>
                
                <Link to="/login" className="text-white hover:text-gray-300 flex items-center">
                  Already have an account? Sign in
                </Link>
              </div>
            </div>
            
            <div>
              <img 
                src="/lovable-uploads/961e34f0-4216-41c5-b509-87b018a81a0b.png" 
                alt="Uber driver" 
                className="w-full h-auto rounded-lg"
              />
            </div>
          </div>
        </section>
        
        <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-12">More ways to earn</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-900 p-6 rounded-lg flex flex-col h-full">
              <h3 className="text-2xl font-bold mb-2">Uber Comfort Electric</h3>
              <div className="mt-auto">
                <div className="flex justify-end">
                  <div className="bg-yellow-400 w-10 h-10 rounded-full flex items-center justify-center">
                    <svg viewBox="0 0 24 24" className="w-6 h-6">
                      <path fill="currentColor" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-900 p-6 rounded-lg flex flex-col h-full">
              <h3 className="text-2xl font-bold mb-2">Uber Black</h3>
              <div className="mt-auto">
                {/* Empty for spacing */}
              </div>
            </div>
            
            <div className="bg-gray-900 p-6 rounded-lg flex flex-col h-full">
              <h3 className="text-2xl font-bold mb-2">Uber Black SUV</h3>
              <p className="text-gray-400">
                Larger premium cars with top-rated drivers
              </p>
              <div className="mt-auto">
                {/* Empty for spacing */}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default DrivePage;
