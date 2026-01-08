import { useState, useEffect, useRef } from 'react';

function Homepage() {
  // Carousel component for Hero Section
  const Carousel = ({ images = [] }) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const slideRefs = useRef([]);

    useEffect(() => {
      if (images.length === 0) return;
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % images.length);
      }, 5000);
      return () => clearInterval(interval);
    }, [images.length]);

    const goToPrevious = () => {
      setCurrentSlide((prev) => (prev - 1 + images.length) % images.length);
    };

    const goToNext = () => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    };

    const goToSlide = (index) => {
      setCurrentSlide(index);
    };

    if (images.length === 0) {
      return (
        <div className="relative w-full bg-black flex items-center justify-center text-white text-base py-20">
          No images available
        </div>
      );
    }

    return (
      <div className="relative w-full h-full bg-black flex items-center justify-center">
        {images.map((image, index) => (
          <div 
            key={index} 
            ref={el => slideRefs.current[index] = el}
            className={`absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out ${
              index === currentSlide ? 'opacity-100 z-0' : 'opacity-0 z-[-1]'
            }`}
          >
            <img 
              src={image} 
              alt={`Slide ${index + 1}`}
              className="w-full h-full object-cover"
              loading={index === 0 ? 'eager' : 'lazy'}
            />
          </div>
        ))}

        <button 
          className="absolute top-1/2 -translate-y-1/2 left-8 bg-white/15 border border-white/20 w-12 h-12 rounded-full flex items-center justify-center cursor-pointer z-20 transition-all duration-300 backdrop-blur-md text-white hover:bg-white/30 hover:border-white/40 hover:scale-110 active:scale-95 lg:w-10 lg:h-10 md:left-4 md:w-9 md:h-9"
          onClick={goToPrevious}
          aria-label="Previous slide"
        >
          <svg className="w-6 h-6 lg:w-5 lg:h-5 md:w-[18px] md:h-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>
        <button 
          className="absolute top-1/2 -translate-y-1/2 right-8 bg-white/15 border border-white/20 w-12 h-12 rounded-full flex items-center justify-center cursor-pointer z-20 transition-all duration-300 backdrop-blur-md text-white hover:bg-white/30 hover:border-white/40 hover:scale-110 active:scale-95 lg:w-10 lg:h-10 md:right-4 md:w-9 md:h-9"
          onClick={goToNext}
          aria-label="Next slide"
        >
          <svg className="w-6 h-6 lg:w-5 lg:h-5 md:w-[18px] md:h-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-20 lg:bottom-6 md:bottom-4 md:gap-2">
          {images.map((_, index) => (
            <button
              key={index}
              className={`h-3 rounded-full border-2 border-white/50 bg-transparent cursor-pointer transition-all duration-300 p-0 hover:bg-white/30 hover:border-white/80 ${
                index === currentSlide 
                  ? 'bg-white border-white w-8 rounded-md md:w-6' 
                  : 'w-3 md:w-2.5'
              }`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    );
  };

  // Hero Section
  const CAROUSEL_IMAGES = [
    'https://res.cloudinary.com/dvkxgrcbv/image/upload/v1767796313/HomepageBannerDesktop1_adb64c08-9dd6-4c32-9bff-31ba0fbc2479_x0hn9c.webp',
    'https://res.cloudinary.com/dvkxgrcbv/image/upload/v1767796315/HomepageBannerDesktop1_4221d191-c68f-44b7-875b-bce6d84375a9_iy5qee.webp',
    'https://res.cloudinary.com/dvkxgrcbv/image/upload/v1767796318/Frame_427321171_c05550a7-b126-43f5-9b7e-9791f0ade122_jewwmf.webp'
  ];

  // Product data for various sections
  const zipperHoodiesProducts = [
    { id: 1, name: "CUSTOM ARMY UNIFORM ZIPPER HOODIE", image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&h=800&fit=crop", price: "Rs. 2,499.00", originalPrice: "Rs. 3,299.00", colors: ['black'] },
    { id: 2, name: "Garud SF Custom Uniform Zipper Hoodie", image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&h=800&fit=crop", price: "Rs. 2,499.00", originalPrice: "Rs. 3,299.00", colors: ['black'] },
    { id: 3, name: "Para Commando Uniform Zipper Hoodie", image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&h=800&fit=crop", price: "Rs. 1,750.00", originalPrice: "Rs. 3,299.00", colors: ['black', 'white'] },
    { id: 4, name: "Jat Regiment Zipper Hoodie", image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&h=800&fit=crop", price: "Rs. 1,750.00", originalPrice: "Rs. 3,299.00", colors: ['black', 'white'] },
    { id: 5, name: "IAF MK2 Special Edition Zipper Hoodie", image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&h=800&fit=crop", price: "Rs. 1,750.00", originalPrice: "Rs. 3,299.00", colors: ['black', 'white'] },
    { id: 6, name: "Para Sf Zipper Hoodie", image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&h=800&fit=crop", price: "Rs. 1,750.00", originalPrice: "Rs. 3,299.00", colors: ['black', 'white'] }
  ];

  const hoodies = [
    { id: 1, name: "MARCOS AGENT HOODIE", image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&h=800&fit=crop", colors: ['black'], url: "https://www.deployed.store/products/marcos-agent-hoodie" },
    { id: 2, name: "ARMY SERVICE HOODIE", image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&h=800&fit=crop", colors: ['black'], text: "ARMY", subtitle: "SERVICE BEFORE SELF", year: "EST. 1999" },
    { id: 3, name: "GARUD COMMANDOS HOODIE", frontImage: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&h=800&fit=crop", backImage: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&h=800&fit=crop", colors: ['black', 'white'], text: "GARUD", subtitle: "SPECIAL FORCES" },
    { id: 4, name: "DEPLOYED HOODIE", image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&h=800&fit=crop", colors: ['black'], text: "DEPLOYED" },
    { id: 5, name: "ELITE FORCES HOODIE", image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&h=800&fit=crop", colors: ['black', 'white'], text: "GH", subtitle: "775/3", tagline: "READY FOR EXTREMES" }
  ];

  const sweatshirts = [
    { id: 1, name: "TIGER HEAD SWEATSHIRT", image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&h=800&fit=crop", colors: ['black'], design: "Tiger head on back with DEPLOYED® branding" },
    { id: 2, name: "ROARING TIGER SWEATSHIRT", image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&h=800&fit=crop", colors: ['black'], design: "Roaring tiger graphic on front, DEPLOYED on sleeve" },
    { id: 3, name: "GARUD COMMANDOS SWEATSHIRT", image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&h=800&fit=crop", colors: ['white', 'black', 'white'], design: "Olive green with eagle emblem and GARUD COMMANDOS text" },
    { id: 4, name: "GHATAK SWEATSHIRT", image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&h=800&fit=crop", colors: ['white', 'white', 'black'], design: "Khaki/tan with skull design and GHATAK branding" }
  ];

  const products = [
    { id: 1, name: "PUNJAB REGIMENT Signature LuxeSoft Cotton T-Shirt", image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=800&fit=crop", price: "From Rs. 799.00", originalPrice: "Rs. 999.00", colors: [] },
    { id: 2, name: "Sqdn 30 Deployed Signature LuxeSoft Cotton T-Shirt", image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=800&fit=crop", price: "From Rs. 799.00", originalPrice: "Rs. 999.00", colors: [] },
    { id: 3, name: "Navy Admiral Polo T-Shirt", image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=800&fit=crop", price: "Rs. 1,799.00", originalPrice: "Rs. 2,499.00", colors: [] },
    { id: 4, name: "45 Armoured Corps Signature LuxeSoft Cotton T-Shirt", image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=800&fit=crop", price: "From Rs. 799.00", originalPrice: "Rs. 999.00", colors: [] },
    { id: 5, name: "Army Legacy Signature LuxeSoft Cotton T-Shirt", image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=800&fit=crop", price: "From Rs. 799.00", originalPrice: "Rs. 999.00", colors: ['black', 'olive'] },
    { id: 6, name: "Army 71 Heritage Polo T-Shirt", image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=800&fit=crop", price: "Rs. 1,799.00", originalPrice: "Rs. 2,499.00", colors: ['black', 'white'] },
    { id: 7, name: "Navy Guardians Of The Bay Signature LuxeSoft Cotton T-Shirt", image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=800&fit=crop", price: "From Rs. 799.00", originalPrice: "Rs. 999.00", colors: ['white'] },
    { id: 8, name: "Covert Ops X Signature LuxeSoft Cotton T-Shirt", image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=800&fit=crop", price: "From Rs. 799.00", originalPrice: "Rs. 999.00", colors: ['black', 'blue'] }
  ];

  // Refs for scrollable sections
  const zipperHoodiesScrollRef = useRef(null);
  const hoodiesScrollRef = useRef(null);
  const sweatshirtsScrollRef = useRef(null);

  // Scroll functions
  const scrollLeft = (ref) => {
    if (ref.current) {
      ref.current.scrollBy({ left: -400, behavior: 'smooth' });
    }
  };

  const scrollRight = (ref) => {
    if (ref.current) {
      ref.current.scrollBy({ left: 400, behavior: 'smooth' });
    }
  };

  // Category section state
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 3;

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:5000/api/categories');
        if (!response.ok) throw new Error('Failed to fetch categories');
        const data = await response.json();
        setCategories(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching categories:', err);
        setError(err.message);
        setCategories([
          { name: 'T-Shirt', slug: 't-shirt' },
          { name: 'Full Sleeve T-Shirt', slug: 'full-sleeve-t-shirt' },
          { name: 'Polo', slug: 'polo' },
          { name: 'Oversized', slug: 'oversized' },
          { name: 'Cargo Shirt', slug: 'cargo-shirt' },
          { name: 'Sweatshirt', slug: 'sweatshirt' },
          { name: 'Hoodies', slug: 'hoodies' },
          { name: 'Zipper Hoodies', slug: 'zipper-hoodies' },
          { name: 'Jacket', slug: 'jacket' }
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  // Footer state
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    console.log('Subscribing:', email);
    setEmail('');
  };

  // Helper functions
  const getColorClass = (color) => {
    const colorMap = {
      'black': 'bg-black border-white',
      'white': 'bg-white border-gray-300',
      'olive': 'bg-[#556B2F] border-gray-300',
      'blue': 'bg-blue-600 border-gray-300'
    };
    return colorMap[color] || 'bg-gray-400 border-gray-300';
  };

  const collections = [
    { name: 'Military', slug: 'military' },
    { name: 'Adventure', slug: 'adventure' },
    { name: 'Patriot', slug: 'patriot' },
    { name: 'Champions', slug: 'champions' },
    { name: 'Men At Work', slug: 'men-at-work' },
    { name: 'Transport', slug: 'transport' }
  ];

  const firstRowProducts = products.slice(0, 4);
  const secondRowProducts = products.slice(4, 8);

  return (
    <div className="min-h-screen bg-white overflow-x-hidden w-full">
      {/* Hero Section */}
      <div className="w-full h-screen bg-black relative overflow-hidden">
        <Carousel images={CAROUSEL_IMAGES} />
      </div>

      {/* Wear Your Valour Section */}
      <div className="w-full bg-white">
        <div className="bg-white py-20 px-8 text-center max-w-6xl mx-auto md:py-16 md:px-6">
          <h2 className="text-6xl font-black text-black mb-8 tracking-tight uppercase md:text-4xl md:mb-6">
            WEAR YOUR VALOUR
          </h2>
          <p className="text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto font-normal md:text-lg">
            We celebrate passions that demand courage and resilience. From aviation to military, 
            expeditions to wildlife, and the high seas to the open roads—our brand is built for 
            those who live boldly.
          </p>
        </div>
        <div className="relative w-full">
          <img 
            src="https://res.cloudinary.com/dvkxgrcbv/image/upload/v1767856091/Frame_1000012467_vy931w.png" 
            alt="Winter X DPLYD - High-Altitude Tactical Series" 
            className="w-full h-auto object-cover"
          />
        </div>
      </div>

      {/* Zipper Hoodies Section */}
      <section className="w-full bg-white py-16 px-8 md:py-12 md:px-6 overflow-x-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center justify-center mb-12">
            <h2 className="text-5xl font-light text-black tracking-tight md:text-4xl mb-6">
              ZIPPER HOODIES
            </h2>
            <button className="px-6 py-2 border border-black text-black font-normal uppercase tracking-wide text-sm hover:bg-black hover:text-white transition-all duration-300">
              VIEW ALL
            </button>
          </div>
          <div className="relative overflow-x-hidden">
            <button
              onClick={() => scrollLeft(zipperHoodiesScrollRef)}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-14 h-14 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-100 transition-all duration-300 z-20 border-2 border-gray-200 md:flex hidden"
              aria-label="Previous product"
            >
              <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div 
              ref={zipperHoodiesScrollRef}
              className="overflow-x-auto scrollbar-hide flex gap-6 pb-4 scroll-smooth"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {zipperHoodiesProducts.map((product) => (
                <div key={product.id} className="flex-shrink-0 w-64 md:w-72">
                  <div className="bg-white border-2 border-gray-200 rounded-lg p-4 hover:border-gray-400 transition-all duration-300 relative group h-full">
                    <div className="absolute top-4 left-4 flex gap-2 z-10">
                      {product.colors.map((color, idx) => (
                        <div
                          key={idx}
                          className={`w-8 h-8 rounded-full border-2 ${
                            color === 'black' ? 'bg-black border-white' : 'bg-white border-gray-300'
                          } shadow-lg`}
                        ></div>
                      ))}
                    </div>
                    <div className="relative mb-4 bg-gray-50 rounded-lg overflow-hidden aspect-[3/4]">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="text-center">
                      <h3 className="text-sm font-semibold text-gray-800 uppercase mb-2">
                        {product.name}
                      </h3>
                      <div className="flex flex-col items-center gap-1">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold text-gray-900">Sale price {product.price}</span>
                          <span className="text-sm text-gray-500 line-through">Regular price {product.originalPrice}</span>
                        </div>
                        <p className="text-xs text-gray-600">Color {product.colors.join(', ')}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={() => scrollRight(zipperHoodiesScrollRef)}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-14 h-14 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-100 transition-all duration-300 z-20 border-2 border-gray-200 md:flex hidden"
              aria-label="Next product"
            >
              <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* Hoodies Section */}
      <section className="w-full bg-white py-16 px-8 md:py-12 md:px-6 overflow-x-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center justify-center mb-12">
            <h2 className="text-5xl font-light text-black tracking-tight md:text-4xl mb-6">
              HOODIES
            </h2>
            <button className="px-6 py-2 border border-black text-black font-normal uppercase tracking-wide text-sm hover:bg-black hover:text-white transition-all duration-300">
              VIEW ALL
            </button>
          </div>
          <div className="relative overflow-x-hidden">
            <button
              onClick={() => scrollLeft(hoodiesScrollRef)}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-14 h-14 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-100 transition-all duration-300 z-20 border-2 border-gray-200 md:flex hidden"
              aria-label="Previous product"
            >
              <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div 
              ref={hoodiesScrollRef}
              className="overflow-x-auto scrollbar-hide flex gap-6 pb-4 scroll-smooth"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {hoodies.map((hoodie) => (
                <div key={hoodie.id} className="flex-shrink-0 w-64 md:w-72">
                  <div className="bg-white border-2 border-gray-200 rounded-lg p-4 hover:border-gray-400 transition-all duration-300 relative group h-full">
                    <div className="absolute -top-4 left-4 flex gap-2 z-10">
                      {hoodie.colors.map((color, idx) => (
                        <div
                          key={idx}
                          className={`w-8 h-8 rounded-full border-2 ${
                            color === 'black' ? 'bg-black border-white' : 'bg-white border-gray-300'
                          } shadow-lg`}
                        ></div>
                      ))}
                    </div>
                    <div className="relative mb-4 bg-gray-50 rounded-lg overflow-hidden aspect-[3/4]">
                      {hoodie.frontImage && hoodie.backImage ? (
                        <div className="relative w-full h-full">
                          <img
                            src={hoodie.frontImage}
                            alt={`${hoodie.name} - Front`}
                            className="w-full h-full object-cover group-hover:opacity-0 transition-opacity duration-300"
                          />
                          <img
                            src={hoodie.backImage}
                            alt={`${hoodie.name} - Back`}
                            className="absolute top-0 left-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          />
                        </div>
                      ) : (
                        <img
                          src={hoodie.image}
                          alt={hoodie.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      )}
                    </div>
                    <div className="text-center">
                      <h3 className="text-sm font-semibold text-gray-800 uppercase mb-1">
                        {hoodie.name}
                      </h3>
                      {hoodie.text && <p className="text-xs text-gray-600 font-medium">{hoodie.text}</p>}
                      {hoodie.subtitle && <p className="text-xs text-gray-500">{hoodie.subtitle}</p>}
                      {hoodie.year && <p className="text-xs text-gray-500">{hoodie.year}</p>}
                      {hoodie.tagline && <p className="text-xs text-gray-500 mt-1">{hoodie.tagline}</p>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={() => scrollRight(hoodiesScrollRef)}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-14 h-14 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-100 transition-all duration-300 z-20 border-2 border-gray-200 md:flex hidden"
              aria-label="Next product"
            >
              <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* Sweatshirts Section */}
      <section className="w-full bg-white py-16 px-8 md:py-12 md:px-6 overflow-x-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center justify-center mb-12">
            <h2 className="text-5xl font-light text-black tracking-tight md:text-4xl mb-6">
              SWEATSHIRTS
            </h2>
            <button className="px-6 py-2 border border-black text-black font-normal uppercase tracking-wide text-sm hover:bg-black hover:text-white transition-all duration-300">
              VIEW ALL
            </button>
          </div>
          <div className="relative overflow-x-hidden">
            <button
              onClick={() => scrollLeft(sweatshirtsScrollRef)}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-14 h-14 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-100 transition-all duration-300 z-20 border-2 border-gray-200 md:flex hidden"
              aria-label="Previous product"
            >
              <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div 
              ref={sweatshirtsScrollRef}
              className="overflow-x-auto scrollbar-hide flex gap-6 pb-4 scroll-smooth"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {sweatshirts.map((sweatshirt) => (
                <div key={sweatshirt.id} className="flex-shrink-0 w-64 md:w-72">
                  <div className="bg-white border-2 border-gray-200 rounded-lg p-4 hover:border-gray-400 transition-all duration-300 relative group h-full">
                    <div className="absolute -top-4 left-4 flex gap-2 z-10">
                      {sweatshirt.colors.map((color, idx) => (
                        <div
                          key={idx}
                          className={`w-8 h-8 rounded-full border-2 ${
                            color === 'black' 
                              ? 'bg-black border-white' 
                              : color === 'white'
                              ? 'bg-white border-gray-300'
                              : 'bg-gray-400 border-gray-300'
                          } shadow-lg`}
                        ></div>
                      ))}
                    </div>
                    <div className="relative mb-4 bg-gray-50 rounded-lg overflow-hidden aspect-[3/4]">
                      <img
                        src={sweatshirt.image}
                        alt={sweatshirt.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="text-center">
                      <h3 className="text-sm font-semibold text-gray-800 uppercase mb-1">
                        {sweatshirt.name}
                      </h3>
                      {sweatshirt.design && (
                        <p className="text-xs text-gray-500 mt-1">{sweatshirt.design}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={() => scrollRight(sweatshirtsScrollRef)}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-14 h-14 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-100 transition-all duration-300 z-20 border-2 border-gray-200 md:flex hidden"
              aria-label="Next product"
            >
              <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* Military Collection Section */}
      <div className="w-full bg-white">
        <div className="relative w-full h-[70vh] md:h-[75vh] overflow-hidden">
          <img
            src="https://res.cloudinary.com/dvkxgrcbv/image/upload/v1767856532/Frame_1000012091_6dbb3d9a-c4aa-455f-bb4c-8fcb4e6b65bb_hxmjl0.jpg"
            alt="Military Collection"
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-20 left-8 md:left-6 md:bottom-16">
            <h2 className="text-7xl md:text-5xl lg:text-6xl font-black text-white/90 uppercase tracking-tight leading-tight mb-2 drop-shadow-lg">
              MILITARY
            </h2>
            <h2 className="text-7xl md:text-5xl lg:text-6xl font-black text-white/90 uppercase tracking-tight leading-tight drop-shadow-lg">
              COLLECTION
            </h2>
          </div>
          <div className="absolute top-32 right-8 md:right-6 md:top-24 text-right">
            <p className="text-base md:text-sm lg:text-lg text-white/90 uppercase tracking-wide leading-relaxed max-w-sm ml-auto drop-shadow-md">
              ECHOES OF THE REGIMENT.
              <br />
              REIMAGINED FOR THE ROUTINE.
            </p>
          </div>
          <div className="absolute bottom-8 right-8 md:bottom-6 md:right-6 text-white text-sm md:text-xs">
            <div className="uppercase tracking-wide mb-1">OP-ZONE</div>
            <div className="font-mono">27.0596° N</div>
            <div className="font-mono">88.2656° E</div>
          </div>
        </div>
        <div className="w-full bg-white !h-52 py-8 px-8 md:px-6">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-8">
            <p className="text-base md:text-lg text-gray-800 !text-center leading-relaxed flex-1">
              The Military Collection by Deployed is forged from the very code that holds the line, discipline, dominance, and duty.
            </p>
          </div>
        </div>
      </div>

      {/* Product Grid Section */}
      <section className="w-full bg-white">
        <div className="w-full py-16 px-8 md:py-12 md:px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {firstRowProducts.map((product) => (
                <div key={product.id} className="group relative bg-white">
                  {product.colors.length > 0 && (
                    <div className="absolute top-2 left-2 flex gap-2 z-10">
                      {product.colors.map((color, idx) => (
                        <div
                          key={idx}
                          className={`w-6 h-6 rounded-full border-2 ${getColorClass(color)} shadow-md`}
                        ></div>
                      ))}
                    </div>
                  )}
                  <div className="relative mb-4 bg-gray-50 rounded-lg overflow-hidden aspect-[3/4]">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <button className="absolute bottom-3 right-3 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-gray-100">
                      <svg className="w-5 h-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </button>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-800 mb-2 line-clamp-2 min-h-[2.5rem]">
                      {product.name}
                    </h3>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm font-semibold text-gray-900">{product.price}</span>
                      {product.originalPrice && (
                        <span className="text-xs text-gray-500 line-through">{product.originalPrice}</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Adventure Collection Banner */}
        <div className="w-full bg-white">
          <div className="relative w-full h-[70vh] md:h-[75vh] overflow-hidden">
            <img
              src="https://res.cloudinary.com/dvkxgrcbv/image/upload/v1767857412/Frame_1000012090_889088bc-d433-4f4e-806b-40decff047fa_yu2p4j.jpg"
              alt="Adventure Collection"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-20 right-8 md:right-6 md:bottom-16">
              <h2 className="text-7xl md:text-5xl lg:text-6xl font-black text-white uppercase tracking-tight leading-tight drop-shadow-lg">
                ADVENTURE
              </h2>
            </div>
          </div>
          <div className="w-full bg-white !h-52 py-8 px-8 md:px-6">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-8">
              <p className="text-base md:text-lg !text-center text-gray-800 leading-relaxed flex-1">
                The Adventure collection by Deployed carries the raw spirit of those who choose the wild over the routine, the roar of engines, the silence of high altitudes, the stare of the wild, and the roads that don't show up on maps.
              </p>
            </div>
          </div>
        </div>

        <div className="w-full py-16 px-8 md:py-12 md:px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {secondRowProducts.map((product) => (
                <div key={product.id} className="group relative bg-white">
                  {product.colors.length > 0 && (
                    <div className="absolute top-2 left-2 flex gap-2 z-10">
                      {product.colors.map((color, idx) => (
                        <div
                          key={idx}
                          className={`w-6 h-6 rounded-full border-2 ${getColorClass(color)} shadow-md`}
                        ></div>
                      ))}
                    </div>
                  )}
                  <div className="relative mb-4 bg-gray-50 rounded-lg overflow-hidden aspect-[3/4]">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <button className="absolute bottom-3 right-3 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-gray-100">
                      <svg className="w-5 h-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </button>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-800 mb-2 line-clamp-2 min-h-[2.5rem]">
                      {product.name}
                    </h3>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm font-semibold text-gray-900">{product.price}</span>
                      {product.originalPrice && (
                        <span className="text-xs text-gray-500 line-through">{product.originalPrice}</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-center gap-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                aria-label="Previous page"
              >
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              {[...Array(totalPages)].map((_, index) => {
                const page = index + 1;
                return (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                      currentPage === page
                        ? 'bg-gray-900 text-white'
                        : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-100'
                    }`}
                    aria-label={`Go to page ${page}`}
                  >
                    {page}
                  </button>
                );
              })}
              <button
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                aria-label="Next page"
              >
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Category Section */}
      <div className="bg-white py-16">
        {loading ? (
          <section className="py-16 px-8 max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-5xl font-bold text-gray-900 mb-4 tracking-tight">Categories</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto"></div>
            </div>
            <div className="flex items-center justify-center py-16">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
            </div>
          </section>
        ) : (
          <>
            <section className="py-16 px-8 max-w-7xl mx-auto">
              <div>
                <h2 className="text-5xl font-black text-black mb-8 tracking-tight md:text-4xl">Shop By Collections</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {collections.map((collection) => (
                    <div 
                      key={collection.slug} 
                      className="group relative bg-white border-2 border-gray-200 rounded-lg p-4 text-base font-semibold text-gray-800 transition-all duration-300 cursor-pointer hover:border-black hover:shadow-lg"
                    >
                      <div className="flex items-center justify-between">
                        <span className="group-hover:text-black transition-colors duration-300">
                          {collection.name}
                        </span>
                        <svg 
                          className="w-5 h-5 text-gray-400 group-hover:text-black group-hover:translate-x-1 transition-all duration-300" 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
            <div className="w-full bg-white">
              <img
                src="https://www.deployed.store/cdn/shop/files/Frame_427321215_17a92bce-7808-44e5-b0d2-ed13ba6a9a5b.jpg?v=1766478114&width=2400"
                alt="Deployed Store Banner"
                className="w-full h-auto object-cover"
              />
            </div>
          </>
        )}
      </div>

      {/* Footer */}
      <footer className="w-full bg-[#f5f5f0] text-gray-800">
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
    </div>
  );
}

export default Homepage;