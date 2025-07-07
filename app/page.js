'use client'
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-100 text-gray-800 font-sans">
      
      {/* Google Fonts */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Playfair+Display:wght@400;500;600;700;800;900&family=Poppins:wght@300;400;500;600;700;800;900&display=swap');
        
        .font-display {
          font-family: 'Playfair Display', serif;
        }
        
        .font-body {
          font-family: 'Inter', sans-serif;
        }
        
        .font-heading {
          font-family: 'Poppins', sans-serif;
        }
      `}</style>

      {/* Banner */}
      <header className="relative py-10 bg-teal-600 shadow-md">
        <div className="absolute top-4 right-4 flex gap-4">
          <button 
            className="px-8 py-3 bg-white/20 backdrop-blur-sm text-white rounded-full shadow hover:bg-white/30 transition font-heading font-semibold text-lg"
            onClick={() => router.push("/login")}
          >
            Log in 
          </button>
          <button 
            className="px-8 py-3 bg-white text-teal-600 rounded-full shadow hover:bg-gray-100 transition font-heading font-semibold text-lg"
            onClick={() => router.push("/signup")}
          >
            Sign Up
          </button>
        </div>
        <div className="text-center">
          <h1 className="text-5xl font-bold text-white">🌿 CarbonWise</h1>
          <p className="text-lg mt-2 text-teal-100">Track. Learn. Reduce.</p>
        </div>
      </header>

      {/* Enhanced Hero Section */}
      <section className="relative py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="lg:w-1/2 space-y-8">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-tight text-gray-800">
                Take Control of Your 
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600"> Carbon Footprint</span>
              </h2>
              <p className="text-lg md:text-xl font-body leading-relaxed text-gray-600 max-w-2xl">
                CarbonWise empowers you to understand your daily environmental impact through intelligent carbon tracking. 
                Discover how small lifestyle changes create meaningful change. Stay informed, stay sustainable, stay ahead.
              </p>
              
              {/* Informative Resources */}
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 my-8 border border-emerald-200">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">📚 Learn More About Carbon Footprints</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <span className="text-blue-600">🌍</span>
                    <a 
                      href="https://www.who.int/news-room/fact-sheets/detail/climate-change-and-health" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 underline font-body"
                    >
                      WHO - Climate Change & Health
                    </a>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-blue-600">🏛️</span>
                    <a 
                      href="https://www.epa.gov/ghgemissions/overview-greenhouse-gases" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 underline font-body"
                    >
                      EPA - Greenhouse Gas Overview
                    </a>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-blue-600">🌱</span>
                    <a 
                      href="https://www.carbontrust.com/our-work-and-impact/guides-reports-and-tools/carbon-footprinting" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 underline font-body"
                    >
                      Carbon Trust - Footprinting Guide
                    </a>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-blue-600">🔬</span>
                    <a 
                      href="https://www.ipcc.ch/reports/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 underline font-body"
                    >
                      IPCC - Climate Reports
                    </a>
                  </div>
                </div>
                <p className="text-xs text-gray-600 mt-3 font-body">
                  💡 <strong>Did you know?</strong> The average person produces about 4.8 tons of CO₂ per year globally, 
                  but this varies significantly by country and lifestyle choices.
                </p>
              </div>
            </div>
            
            <div className="lg:w-1/2">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-3xl blur opacity-20"></div>
                <Image
                  src="/forest.jpeg"
                  alt="Carbon Awareness"
                  width={600}
                  height={400}
                  className="relative rounded-3xl shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Informative Section */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h3 className="text-3xl md:text-4xl font-display font-bold mb-6 text-gray-800">
            Why Track Carbon Emissions?
          </h3>
          <p className="max-w-4xl mx-auto text-gray-600 text-lg md:text-xl font-body leading-relaxed mb-12">
            Climate change is accelerated by invisible carbon emissions from our daily choices. Every decision you make — 
            from transportation and diet to energy consumption — shapes your environmental impact. By tracking and understanding 
            your carbon footprint, you unlock the power to make informed, sustainable decisions that protect our planet and 
            secure a better future for generations to come.
          </p>
          
          {/* Enhanced Image Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            <div className="group">
              <div className="relative overflow-hidden rounded-2xl shadow-lg transform group-hover:scale-105 transition-all duration-300">
                <Image
                  src="/steps.jpeg"
                  alt="Climate Action Steps"
                  width={400}
                  height={300}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h4 className="font-heading font-semibold text-lg">Climate Action</h4>
                  <p className="text-sm font-body opacity-90">Small steps, big impact</p>
                </div>
              </div>
            </div>
            
            <div className="group">
              <div className="relative overflow-hidden rounded-2xl shadow-lg transform group-hover:scale-105 transition-all duration-300">
                <Image
                  src="/footsteps.jpeg"
                  alt="Eco Lifestyle"
                  width={400}
                  height={300}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h4 className="font-heading font-semibold text-lg">Eco Lifestyle</h4>
                  <p className="text-sm font-body opacity-90">Sustainable living choices</p>
                </div>
              </div>
            </div>
            
            <div className="group md:col-span-2 lg:col-span-1">
              <div className="relative overflow-hidden rounded-2xl shadow-lg transform group-hover:scale-105 transition-all duration-300">
                <Image
                  src="/co2.jpg"
                  alt="CO2 Tracking"
                  width={400}
                  height={300}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h4 className="font-heading font-semibold text-lg">Smart Tracking</h4>
                  <p className="text-sm font-body opacity-90">Real-time carbon monitoring</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced HOW IT WORKS Section */}
      <section className="bg-gradient-to-b from-blue-50 to-indigo-100 py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-blue-800 mb-8">
            HOW IT WORKS
          </h2>
          <p className="max-w-3xl mx-auto text-gray-700 text-lg md:text-xl font-body leading-relaxed mb-16">
            Combating climate change requires strategic carbon reduction. When you offset your footprint, 
            you neutralize emissions by supporting forest protection initiatives that actively absorb carbon from our atmosphere.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {/* Step 1 */}
            <div className="bg-white rounded-3xl p-8 shadow-xl transform hover:scale-105 transition-all duration-300">
              <div className="relative mb-6">
                <div className="w-20 h-20 mx-auto bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center">
                  <Image src="/co2.jpg" alt="Calculate" width={40} height={40} className="rounded-full" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
              </div>
              <h3 className="text-xl font-heading font-semibold text-gray-800 mb-3">Calculate Impact</h3>
              <p className="text-gray-600 font-body">Precisely measure your carbon footprint across all life activities</p>
            </div>

            {/* Step 2 */}
            <div className="bg-white rounded-3xl p-8 shadow-xl transform hover:scale-105 transition-all duration-300">
              <div className="relative mb-6">
                <div className="w-20 h-20 mx-auto bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center">
                  <Image src="/steps.jpeg" alt="Offset" width={40} height={40} className="rounded-full" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
              </div>
              <h3 className="text-xl font-heading font-semibold text-gray-800 mb-3">Offset Emissions</h3>
              <p className="text-gray-600 font-body">Balance your climate impact through verified offset programs</p>
            </div>

            {/* Step 3 */}
            <div className="bg-white rounded-3xl p-8 shadow-xl transform hover:scale-105 transition-all duration-300">
              <div className="relative mb-6">
                <div className="w-20 h-20 mx-auto bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center">
                  <Image src="/protect.jpg" alt="Protect Forests" width={40} height={40} className="rounded-full" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</div>
              </div>
              <h3 className="text-xl font-heading font-semibold text-gray-800 mb-3">Protect Forests</h3>
              <p className="text-gray-600 font-body">Support vital ecosystem protection and restoration projects</p>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl">
            <h3 className="text-3xl md:text-4xl font-display font-bold text-blue-800 mb-6">
              OFFSET YOUR FOOTPRINT. PROTECT FORESTS.
            </h3>
            <p className="max-w-4xl mx-auto text-gray-700 text-base md:text-lg font-body leading-relaxed">
              Conservation International champions nature-based climate solutions through ecosystem protection. 
              Healthy, intact environments — from mangroves to rainforests to grasslands — absorb and store 
              massive amounts of carbon, making them essential in preventing irreversible climate damage. 
              Our forest protection and restoration initiatives directly benefit local communities who depend 
              on these ecosystems for food security, clean water, and sustainable livelihoods.
            </p>
          </div>
        </div>
      </section>

      {/* Enhanced Features Section */}
      <section className="bg-gray-50 py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-16 text-gray-800">
            Why Choose CarbonWise?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mb-4">
                <span className="text-2xl">📊</span>
              </div>
              <h3 className="text-xl font-heading font-semibold mb-3 text-gray-800">Real-Time Analytics</h3>
              <p className="text-gray-600 font-body">Track your carbon footprint with precision and get instant insights into your environmental impact.</p>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mb-4">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="text-xl font-heading font-semibold mb-3 text-gray-800">Personalized Goals</h3>
              <p className="text-gray-600 font-body">Set custom reduction targets and receive tailored recommendations for sustainable living.</p>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mb-4">
                <span className="text-2xl">🌱</span>
              </div>
              <h3 className="text-xl font-heading font-semibold mb-3 text-gray-800">Offset Projects</h3>
              <p className="text-gray-600 font-body">Support verified carbon offset projects that make a real difference in fighting climate change.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="bg-gradient-to-r from-gray-800 to-gray-900 text-white py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="md:col-span-2">
              <h3 className="text-2xl font-display font-bold mb-4">🌿 CarbonWise</h3>
              <p className="text-gray-300 font-body mb-4">
                Leading the way in carbon footprint tracking and environmental sustainability.
              </p>
              <div className="flex space-x-4">
                <button className="w-10 h-10 bg-emerald-600 rounded-full flex items-center justify-center hover:bg-emerald-700 transition-colors">
                  <span className="text-white">f</span>
                </button>
                <button className="w-10 h-10 bg-emerald-600 rounded-full flex items-center justify-center hover:bg-emerald-700 transition-colors">
                  <span className="text-white">t</span>
                </button>
                <button className="w-10 h-10 bg-emerald-600 rounded-full flex items-center justify-center hover:bg-emerald-700 transition-colors">
                  <span className="text-white">in</span>
                </button>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-heading font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 font-body">
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">How It Works</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-heading font-semibold mb-4">Support</h4>
              <ul className="space-y-2 font-body">
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">FAQ</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-700 pt-8 text-center">
            <p className="text-gray-400 font-body">
              © {new Date().getFullYear()} CarbonWise. All rights reserved. Made with 💚 for a sustainable future.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}