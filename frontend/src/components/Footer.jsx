import { useState } from 'react';
import AutoCarousel from './AutoCarousel';

const Footer = () => {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    console.log('Subscribing:', email);
    setEmail('');
  };

  // Reusable component for DEPLOYED with trademark symbols
  const DeployedWithTrademark = () => (
    <span className="relative inline-block">
       
      <span className="text-2xl md:text-3xl lg:text-4xl font-black text-gray-800 tracking-tight uppercase">DEPLOYED</span>
      <span className="absolute -top-0.5 -right-3 md:-right-4 lg:-right-5 w-3 h-3 md:w-3.5 md:h-3.5 lg:w-4 lg:h-4 rounded-full bg-black flex items-center justify-center">
        <span className="text-white text-[7px] md:text-[8px] lg:text-[9px] font-bold leading-none">®</span>
      </span>
    </span>
  );

  const carouselItems = [
    <DeployedWithTrademark key="deployed-1" />,
    <DeployedWithTrademark key="deployed-2" />,
    <DeployedWithTrademark key="deployed-3" />,
  ];

  return (
    <footer className="w-full bg-[#f5f5f0] text-gray-800">
      {/* Auto-scrolling Carousel */}
      <div className="w-full bg-[#f5f5f0] py-8 md:py-10 border-b border-gray-200">
        <AutoCarousel 
          items={carouselItems} 
          speed={40}
          className="h-16 md:h-20 flex items-center"
        />
      </div>
      <div className="max-w-7xl mx-auto px-8 py-12 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-6 lg:gap-8">
          <div>
            <h3 className="text-sm font-bold uppercase mb-4 tracking-wide text-gray-800">SHOP BY CATEGORY</h3>
            <ul className="space-y-2">
              <li><a href="/collections/t-shirt" className="text-sm text-gray-700 hover:text-gray-900 block">T-Shirt</a></li>
              <li><a href="/collections/polos" className="text-sm text-gray-700 hover:text-gray-900 block">Polos</a></li>
              <li><a href="/collections/full-sleeves" className="text-sm text-gray-700 hover:text-gray-900 block">Full Sleeves</a></li>
              <li><a href="/collections/cargo-shirts" className="text-sm text-gray-700 hover:text-gray-900 block">Cargo Shirts</a></li>
              <li><a href="/collections/oversized" className="text-sm text-gray-700 hover:text-gray-900 block">Oversized</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-bold uppercase mb-4 tracking-wide text-gray-800">SHOP BY COLLECTIONS</h3>
            <ul className="space-y-2">
              <li><a href="/collections/military" className="text-sm text-gray-700 hover:text-gray-900 block">Military</a></li>
              <li><a href="/collections/adventure" className="text-sm text-gray-700 hover:text-gray-900 block">Adventure</a></li>
              <li><a href="/collections/patriot" className="text-sm text-gray-700 hover:text-gray-900 block">Patriot</a></li>
              <li><a href="/collections/champions" className="text-sm text-gray-700 hover:text-gray-900 block">Champions</a></li>
              <li><a href="/collections/men-at-work" className="text-sm text-gray-700 hover:text-gray-900 block">Men At Work</a></li>
              <li><a href="/collections/transport" className="text-sm text-gray-700 hover:text-gray-900 block">Transport</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-bold uppercase mb-4 tracking-wide text-gray-800">POLICIES</h3>
            <ul className="space-y-2">
              <li><a href="/policies/privacy-policy" className="text-sm text-gray-700 hover:text-gray-900 block">Privacy Policy</a></li>
              <li><a href="/policies/return-and-exchange-policy" className="text-sm text-gray-700 hover:text-gray-900 block">Return and Exchange Policy</a></li>
              <li><a href="/policies/shipping-policy" className="text-sm text-gray-700 hover:text-gray-900 block">Shipping Policy</a></li>
              <li><a href="/policies/terms-of-service" className="text-sm text-gray-700 hover:text-gray-900 block">Terms of Service</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-bold uppercase mb-4 tracking-wide text-gray-800">NEWSLETTER</h3>
            <p className="text-sm text-gray-700 mb-4">
              Sign up to our newsletter to receive exclusive offers.
            </p>
            <form onSubmit={handleSubscribe} className="mb-3">
              <div className="flex w-full">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="E-mail"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-l text-xs bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:border-gray-400"
                  required
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-gray-800 text-white uppercase text-xs font-semibold rounded-r hover:bg-gray-900 whitespace-nowrap"
                >
                  SUBSCRIBE
                </button>
              </div>
            </form>
            <p className="text-xs text-gray-600">
              By signing up to our newsletter, you agree with our privacy policy.
            </p>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-8 py-14 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
            <div>
              <h3 className="text-sm font-bold uppercase mb-6 tracking-wider text-gray-900">CONTACT US</h3>
              <div className="space-y-3 text-sm text-gray-600">
                <p>
                  <a href="/track-order" className="underline hover:text-gray-900 transition-colors duration-200 font-medium">
                    Track your Order - Click Here
                  </a>
                </p>
                <p className="text-gray-700">The Accesories</p>
                <p>
                  <span className="font-semibold text-gray-800">Email</span> - <a href="mailto:support@deployed.store" className="hover:text-gray-900 transition-colors">support@deployed.store</a>
                </p>
                <p>
                  <span className="font-semibold text-gray-800">Phone No.</span> - <a href="tel:+918047360314" className="hover:text-gray-900 transition-colors">+91 80 4736 0314</a>
                </p>
                <p className="text-xs text-gray-500">( Mon - Fri 11 AM - 6 PM )</p>
                <p className="text-xs text-gray-500">( Sat - 11 AM - 5 PM )</p>
                <div className="mt-5">
                  <div className="inline-flex items-center gap-2.5 px-4 py-2.5 bg-white border border-gray-300 rounded-md cursor-pointer hover:border-gray-400 hover:shadow-sm transition-all duration-200">
                    <span className="text-xl">🇮🇳</span>
                    <span className="text-sm font-semibold text-gray-800">INR</span>
                    <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
                <p className="mt-5 text-gray-700">50 B C Road, Kolkata - 700050</p>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-bold uppercase mb-6 tracking-wider text-gray-900">ABOUT US</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                At Deployed, we celebrate passions that demand courage and resilience. From aviation to military, 
                expeditions to wildlife, and the high seas to the open roads, our brand is built for those who live boldly.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-200 bg-[#f5f5f0]">
        <div className="max-w-7xl mx-auto px-8 py-6 md:px-6">
          <p className="text-xs text-gray-500 text-center">
            © 2026 - Deployed Copyrighted and Owned by - Squawk Supply Core Pvt Ltd
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
