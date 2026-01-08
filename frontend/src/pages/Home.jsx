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
    { id: 6, name: "Para Sf Zipper Hoodie", image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&h=800&fit=crop", price: "Rs. 1,750.00", originalPrice: "Rs. 3,299.00", colors: ['black', 'white'] },
    { id: 7, name: "Sikh Regiment Zipper Hoodie", image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&h=800&fit=crop", price: "Rs. 1,750.00", originalPrice: "Rs. 3,299.00", colors: ['black'] },
    { id: 8, name: "Rajput Regiment Zipper Hoodie", image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&h=800&fit=crop", price: "Rs. 1,750.00", originalPrice: "Rs. 3,299.00", colors: ['black', 'white'] },
    { id: 9, name: "Maratha Light Infantry Zipper Hoodie", image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&h=800&fit=crop", price: "Rs. 1,750.00", originalPrice: "Rs. 3,299.00", colors: ['black'] },
    { id: 10, name: "Gorkha Rifles Zipper Hoodie", image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&h=800&fit=crop", price: "Rs. 1,750.00", originalPrice: "Rs. 3,299.00", colors: ['black', 'white'] },
    { id: 11, name: "Dogra Regiment Zipper Hoodie", image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&h=800&fit=crop", price: "Rs. 1,750.00", originalPrice: "Rs. 3,299.00", colors: ['black'] },
    { id: 12, name: "Mahar Regiment Zipper Hoodie", image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&h=800&fit=crop", price: "Rs. 1,750.00", originalPrice: "Rs. 3,299.00", colors: ['black', 'white'] }
  ];

  const hoodies = [
    { id: 1, name: "MARCOS AGENT HOODIE", image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&h=800&fit=crop", price: "Rs. 2,499.00", originalPrice: "Rs. 3,299.00", colors: ['black'] },
    { id: 2, name: "ARMY SERVICE HOODIE", image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&h=800&fit=crop", price: "Rs. 2,499.00", originalPrice: "Rs. 3,299.00", colors: ['black'] },
    { id: 3, name: "GARUD COMMANDOS HOODIE", image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&h=800&fit=crop", price: "Rs. 2,499.00", originalPrice: "Rs. 3,299.00", colors: ['black', 'white'] },
    { id: 4, name: "DEPLOYED HOODIE", image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&h=800&fit=crop", price: "Rs. 2,499.00", originalPrice: "Rs. 3,299.00", colors: ['black'] },
    { id: 5, name: "ELITE FORCES HOODIE", image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&h=800&fit=crop", price: "Rs. 2,499.00", originalPrice: "Rs. 3,299.00", colors: ['black', 'white'] },
    { id: 6, name: "NAVY SEAL HOODIE", image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&h=800&fit=crop", price: "Rs. 2,499.00", originalPrice: "Rs. 3,299.00", colors: ['black'] },
    { id: 7, name: "SPECIAL OPS HOODIE", image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&h=800&fit=crop", price: "Rs. 2,499.00", originalPrice: "Rs. 3,299.00", colors: ['black', 'white'] },
    { id: 8, name: "COMMANDO FORCE HOODIE", image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&h=800&fit=crop", price: "Rs. 2,499.00", originalPrice: "Rs. 3,299.00", colors: ['black'] },
    { id: 9, name: "TACTICAL HOODIE", image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&h=800&fit=crop", price: "Rs. 2,499.00", originalPrice: "Rs. 3,299.00", colors: ['black', 'white'] },
    { id: 10, name: "COMBAT READY HOODIE", image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&h=800&fit=crop", price: "Rs. 2,499.00", originalPrice: "Rs. 3,299.00", colors: ['black'] },
    { id: 11, name: "FIELD OPERATIONS HOODIE", image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&h=800&fit=crop", price: "Rs. 2,499.00", originalPrice: "Rs. 3,299.00", colors: ['black', 'white'] },
    { id: 12, name: "MISSION READY HOODIE", image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&h=800&fit=crop", price: "Rs. 2,499.00", originalPrice: "Rs. 3,299.00", colors: ['black'] }
  ];

  const sweatshirts = [
    { id: 1, name: "TIGER HEAD SWEATSHIRT", image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&h=800&fit=crop", price: "Rs. 1,999.00", originalPrice: "Rs. 2,499.00", colors: ['black'] },
    { id: 2, name: "ROARING TIGER SWEATSHIRT", image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&h=800&fit=crop", price: "Rs. 1,999.00", originalPrice: "Rs. 2,499.00", colors: ['black'] },
    { id: 3, name: "GARUD COMMANDOS SWEATSHIRT", image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&h=800&fit=crop", price: "Rs. 1,999.00", originalPrice: "Rs. 2,499.00", colors: ['white', 'black'] },
    { id: 4, name: "GHATAK SWEATSHIRT", image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&h=800&fit=crop", price: "Rs. 1,999.00", originalPrice: "Rs. 2,499.00", colors: ['white', 'black'] },
    { id: 5, name: "ELITE FORCES SWEATSHIRT", image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&h=800&fit=crop", price: "Rs. 1,999.00", originalPrice: "Rs. 2,499.00", colors: ['black'] },
    { id: 6, name: "SPECIAL OPS SWEATSHIRT", image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&h=800&fit=crop", price: "Rs. 1,999.00", originalPrice: "Rs. 2,499.00", colors: ['black', 'white'] },
    { id: 7, name: "TACTICAL SWEATSHIRT", image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&h=800&fit=crop", price: "Rs. 1,999.00", originalPrice: "Rs. 2,499.00", colors: ['black'] },
    { id: 8, name: "COMBAT SWEATSHIRT", image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&h=800&fit=crop", price: "Rs. 1,999.00", originalPrice: "Rs. 2,499.00", colors: ['black', 'white'] },
    { id: 9, name: "FIELD OPERATIONS SWEATSHIRT", image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&h=800&fit=crop", price: "Rs. 1,999.00", originalPrice: "Rs. 2,499.00", colors: ['black'] },
    { id: 10, name: "MISSION READY SWEATSHIRT", image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&h=800&fit=crop", price: "Rs. 1,999.00", originalPrice: "Rs. 2,499.00", colors: ['black', 'white'] },
    { id: 11, name: "DEPLOYED SWEATSHIRT", image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&h=800&fit=crop", price: "Rs. 1,999.00", originalPrice: "Rs. 2,499.00", colors: ['black'] },
    { id: 12, name: "ARMY HERITAGE SWEATSHIRT", image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&h=800&fit=crop", price: "Rs. 1,999.00", originalPrice: "Rs. 2,499.00", colors: ['black', 'white'] }
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
  const firstRowProductsScrollRef = useRef(null);
  const secondRowProductsScrollRef = useRef(null);
  const racingProductsScrollRef = useRef(null);

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

  // Scroll progress state for carousel indicators
  const [scrollProgress, setScrollProgress] = useState({
    zipperHoodies: 0,
    hoodies: 0,
    sweatshirts: 0,
    firstRowProducts: 0,
    secondRowProducts: 0,
    racingProducts: 0
  });

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

  // Calculate scroll progress for a given ref
  const calculateScrollProgress = (ref, key) => {
    if (!ref.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = ref.current;
    const maxScroll = scrollWidth - clientWidth;
    const progress = maxScroll > 0 ? scrollLeft / maxScroll : 0;
    setScrollProgress(prev => ({ ...prev, [key]: progress }));
  };

  // Handle scroll event
  const handleScroll = (ref, key) => {
    calculateScrollProgress(ref, key);
  };

  // Initialize scroll progress on mount
  useEffect(() => {
    const refs = [
      { ref: zipperHoodiesScrollRef, key: 'zipperHoodies' },
      { ref: hoodiesScrollRef, key: 'hoodies' },
      { ref: sweatshirtsScrollRef, key: 'sweatshirts' },
      { ref: firstRowProductsScrollRef, key: 'firstRowProducts' },
      { ref: secondRowProductsScrollRef, key: 'secondRowProducts' },
      { ref: racingProductsScrollRef, key: 'racingProducts' }
    ];

    refs.forEach(({ ref, key }) => {
      if (ref.current) {
        calculateScrollProgress(ref, key);
      }
    });
  }, []);

  // Helper functions
  const getColorClass = (color) => {
    const colorMap = {
      'black': 'bg-black border-white',
      'white': 'bg-white border-gray-300',
      'olive': 'bg-[#556B2F] border-gray-300',
      'blue': 'bg-blue-600 border-gray-300',
      'green': 'bg-green-600 border-gray-300'
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

  const racingProducts = [
    { id: 1, name: "Speed Demon Signature LuxeSoft Cotton T-Shirt", image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=800&fit=crop", price: "From Rs. 799.00", originalPrice: "Rs. 999.00", colors: ['white'] },
    { id: 2, name: "Deployed Drift Edition Signature LuxeSoft T-Shirt", image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=800&fit=crop", price: "From Rs. 799.00", originalPrice: "Rs. 999.00", colors: ['black', 'white', 'blue'] },
    { id: 3, name: "Deployed Racing Edition Signature T-Shirt", image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=800&fit=crop", price: "From Rs. 799.00", originalPrice: "Rs. 999.00", colors: ['white', 'black', 'green'] },
    { id: 4, name: "Racing League Signature Luxesoft Cotton Long-sleeve Shirt", image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=800&fit=crop", price: "Rs. 999.00", originalPrice: "Rs. 1,499.00", colors: ['white', 'black', 'green'] },
    { id: 5, name: "Deployed Racing Polo T-Shirt", image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=800&fit=crop", price: "Rs. 1,799.00", originalPrice: "Rs. 2,499.00", colors: ['black'] },
    { id: 6, name: "Formula One Signature T-Shirt", image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=800&fit=crop", price: "From Rs. 799.00", originalPrice: "Rs. 999.00", colors: ['white', 'black'] },
    { id: 7, name: "Track Master Racing T-Shirt", image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=800&fit=crop", price: "From Rs. 799.00", originalPrice: "Rs. 999.00", colors: ['black', 'white'] },
    { id: 8, name: "Checkered Flag Signature T-Shirt", image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=800&fit=crop", price: "From Rs. 799.00", originalPrice: "Rs. 999.00", colors: ['white'] },
    { id: 9, name: "Racing Champion Polo T-Shirt", image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=800&fit=crop", price: "Rs. 1,799.00", originalPrice: "Rs. 2,499.00", colors: ['black', 'white'] },
    { id: 10, name: "Speed Masters Signature T-Shirt", image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=800&fit=crop", price: "From Rs. 799.00", originalPrice: "Rs. 999.00", colors: ['white', 'black'] },
    { id: 11, name: "Drag Racing Edition T-Shirt", image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=800&fit=crop", price: "From Rs. 799.00", originalPrice: "Rs. 999.00", colors: ['black'] },
    { id: 12, name: "Pit Stop Crew Signature T-Shirt", image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=800&fit=crop", price: "From Rs. 799.00", originalPrice: "Rs. 999.00", colors: ['white', 'black', 'blue'] }
  ];

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
      <section className="w-full bg-white py-16 md:py-12 overflow-x-hidden">
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
            className="absolute left-4 top-1/2 -translate-y-1/2 w-14 h-14 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-100 transition-all duration-300 z-20 border-2 border-gray-200 md:flex hidden"
            aria-label="Previous product"
          >
            <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div 
            ref={zipperHoodiesScrollRef}
            onScroll={() => handleScroll(zipperHoodiesScrollRef, 'zipperHoodies')}
            className="overflow-x-auto scrollbar-hide flex gap-6 pb-4 scroll-smooth pl-4"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {zipperHoodiesProducts.map((product) => (
              <div key={product.id} className="flex-shrink-0 w-64 md:w-72 group relative bg-white">
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
          <button
            onClick={() => scrollRight(zipperHoodiesScrollRef)}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-14 h-14 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-100 transition-all duration-300 z-20 border-2 border-gray-200 md:flex hidden"
            aria-label="Next product"
          >
            <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
        {/* Progress Bar */}
        <div className="flex justify-center mt-6">
          <div className="relative w-64 h-0.5 bg-gray-300">
            <div 
              className="absolute top-0 h-full bg-black transition-all duration-300"
              style={{ 
                width: '20%',
                left: `${scrollProgress.zipperHoodies * 0.8}%`
              }}
            ></div>
          </div>
        </div>
      </section>

      {/* Hoodies Section */}
      <section className="w-full bg-white py-16 md:py-12 overflow-x-hidden">
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
            className="absolute left-4 top-1/2 -translate-y-1/2 w-14 h-14 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-100 transition-all duration-300 z-20 border-2 border-gray-200 md:flex hidden"
            aria-label="Previous product"
          >
            <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div 
            ref={hoodiesScrollRef}
            onScroll={() => handleScroll(hoodiesScrollRef, 'hoodies')}
            className="overflow-x-auto scrollbar-hide flex gap-6 pb-4 scroll-smooth pl-4"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {hoodies.map((product) => (
              <div key={product.id} className="flex-shrink-0 w-64 md:w-72 group relative bg-white">
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
          <button
            onClick={() => scrollRight(hoodiesScrollRef)}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-14 h-14 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-100 transition-all duration-300 z-20 border-2 border-gray-200 md:flex hidden"
            aria-label="Next product"
          >
            <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
        {/* Progress Bar */}
        <div className="flex justify-center mt-6">
          <div className="relative w-64 h-0.5 bg-gray-300">
            <div 
              className="absolute top-0 h-full bg-black transition-all duration-300"
              style={{ 
                width: '20%',
                left: `${scrollProgress.hoodies * 0.8}%`
              }}
            ></div>
          </div>
        </div>
      </section>

      {/* Sweatshirts Section */}
      <section className="w-full bg-white py-16 md:py-12 overflow-x-hidden">
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
            className="absolute left-4 top-1/2 -translate-y-1/2 w-14 h-14 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-100 transition-all duration-300 z-20 border-2 border-gray-200 md:flex hidden"
            aria-label="Previous product"
          >
            <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div 
            ref={sweatshirtsScrollRef}
            onScroll={() => handleScroll(sweatshirtsScrollRef, 'sweatshirts')}
            className="overflow-x-auto scrollbar-hide flex gap-6 pb-4 scroll-smooth pl-4"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {sweatshirts.map((product) => (
              <div key={product.id} className="flex-shrink-0 w-64 md:w-72 group relative bg-white">
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
          <button
            onClick={() => scrollRight(sweatshirtsScrollRef)}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-14 h-14 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-100 transition-all duration-300 z-20 border-2 border-gray-200 md:flex hidden"
            aria-label="Next product"
          >
            <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
        {/* Progress Bar */}
        <div className="flex justify-center mt-6">
          <div className="relative w-64 h-0.5 bg-gray-300">
            <div 
              className="absolute top-0 h-full bg-black transition-all duration-300"
              style={{ 
                width: '20%',
                left: `${scrollProgress.sweatshirts * 0.8}%`
              }}
            ></div>
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
        <div className="w-full py-16 md:py-12">
          <div className="relative overflow-x-hidden">
            <button
              onClick={() => scrollLeft(firstRowProductsScrollRef)}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-14 h-14 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-100 transition-all duration-300 z-20 border-2 border-gray-200 md:flex hidden"
              aria-label="Previous product"
            >
              <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div 
              ref={firstRowProductsScrollRef}
              onScroll={() => handleScroll(firstRowProductsScrollRef, 'firstRowProducts')}
              className="overflow-x-auto scrollbar-hide flex gap-6 pb-4 scroll-smooth pl-4"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {firstRowProducts.map((product) => (
                <div key={product.id} className="flex-shrink-0 w-64 md:w-72 group relative bg-white">
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
            <button
              onClick={() => scrollRight(firstRowProductsScrollRef)}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-14 h-14 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-100 transition-all duration-300 z-20 border-2 border-gray-200 md:flex hidden"
              aria-label="Next product"
            >
              <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
          {/* Progress Bar */}
          <div className="flex justify-center mt-6">
            <div className="relative w-64 h-0.5 bg-gray-300">
              <div 
                className="absolute top-0 h-full bg-black transition-all duration-300"
                style={{ 
                  width: '20%',
                  left: `${scrollProgress.firstRowProducts * 0.8}%`
                }}
              ></div>
            </div>
          </div>
        </div>
      </section>

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

      {/* Second Row Products Section */}
      <section className="w-full bg-white">
        <div className="w-full py-16 md:py-12">
          <div className="relative overflow-x-hidden">
            <button
              onClick={() => scrollLeft(secondRowProductsScrollRef)}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-14 h-14 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-100 transition-all duration-300 z-20 border-2 border-gray-200 md:flex hidden"
              aria-label="Previous product"
            >
              <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div 
              ref={secondRowProductsScrollRef}
              onScroll={() => handleScroll(secondRowProductsScrollRef, 'secondRowProducts')}
              className="overflow-x-auto scrollbar-hide flex gap-6 pb-4 scroll-smooth pl-4"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {secondRowProducts.map((product) => (
                <div key={product.id} className="flex-shrink-0 w-64 md:w-72 group relative bg-white">
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
            <button
              onClick={() => scrollRight(secondRowProductsScrollRef)}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-14 h-14 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-100 transition-all duration-300 z-20 border-2 border-gray-200 md:flex hidden"
              aria-label="Next product"
            >
              <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
          {/* Progress Bar */}
          <div className="flex justify-center mt-6">
            <div className="relative w-64 h-0.5 bg-gray-300">
              <div 
                className="absolute top-0 h-full bg-black transition-all duration-300"
                style={{ 
                  width: '20%',
                  left: `${scrollProgress.secondRowProducts * 0.8}%`
                }}
              ></div>
            </div>
          </div>
        </div>
      </section>

      {/* Patriot Collection Banner Section */}
      <div className="w-full bg-white">
        <div className="relative w-full h-[70vh] md:h-[75vh] overflow-hidden">
          <img
            src="https://res.cloudinary.com/dvkxgrcbv/image/upload/v1767866521/Frame_427321221_d06213ca-8773-4542-b58e-385c20291c73_plaiap.jpg"
            alt="Patriot Collection"
            className="w-full h-full object-cover"
          />
          <div className="absolute top-32 right-8 md:right-6 md:top-24 text-right">
            <p className="text-base md:text-sm lg:text-lg text-white uppercase tracking-wide leading-relaxed max-w-sm ml-auto drop-shadow-md mb-4">
              UNIFORMED IN SPIRIT.
              <br />
              UNFILTERED IN PRIDE.
            </p>
          </div>
          <div className="absolute top-1/2 -translate-y-1/2 right-8 md:right-6 text-right">
            <h2 className="text-7xl md:text-5xl lg:text-6xl font-black text-white uppercase tracking-tight leading-tight drop-shadow-lg mb-2">
              PATRIOT
            </h2>
            <h2 className="text-7xl md:text-5xl lg:text-6xl font-black text-white uppercase tracking-tight leading-tight drop-shadow-lg">
              COLLECTION
            </h2>
          </div>
          <div className="absolute bottom-20 right-8 md:right-6 md:bottom-16">
            <button className="px-6 py-3 border-2 border-white text-white font-normal uppercase tracking-wide text-sm hover:bg-white hover:text-black transition-all duration-300 drop-shadow-md">
              THE INDIA COLLECTION
            </button>
          </div>
        </div>
        <div className="w-full bg-white !h-52 py-8 px-8 md:px-6">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-8">
            <div className="flex items-center gap-4 mb-4 md:mb-0">
               
            </div>
            <p className="text-base md:text-lg text-gray-800 !text-center leading-relaxed flex-1">
              India Collection by Deployed, speaks to those who carry their Indianness not in loud symbols, but in silent conviction. To wear not just a design, but an identity of heritage, pride and responsibility.
            </p>
          </div>
        </div>
      </div>

      {/* Champions Collection Banner Section */}
      <div className="w-full bg-white">
        <div className="relative w-full h-[70vh] md:h-[75vh] overflow-hidden">
          <img
            src="https://res.cloudinary.com/dvkxgrcbv/image/upload/v1767866781/Frame_1000012090_7e71cadf-bd48-4af7-a798-f7fe16cc4865_qlaloj.jpg"
            alt="Champions Collection"
            className="w-full h-full object-cover"
            style={{ objectPosition: 'center', minHeight: '100%', minWidth: '100%' }}
          />
          <div className="absolute top-32 left-8 md:left-6 md:top-24">
            <h2 className="text-7xl md:text-5xl lg:text-6xl font-black text-white uppercase tracking-tight leading-tight mb-2 drop-shadow-lg">
              CHAMPIONS
            </h2>
            <h2 className="text-7xl md:text-5xl lg:text-6xl font-black text-white uppercase tracking-tight leading-tight drop-shadow-lg">
              COLLECTION
            </h2>
          </div>
          
          {/* Red Banner with Scrolling Text */}
          <div className="absolute bottom-0 left-0 w-full bg-red-600 py-4 md:py-3 overflow-hidden transform -skew-y-1 origin-bottom">
            <div className="flex items-center h-full transform skew-y-1">
              {/* Currency Selector */}
              <div className="flex-shrink-0 ml-8 md:ml-6 z-10">
                 
              </div>
              
              {/* Scrolling Text Carousel */}
              <div className="flex-1 overflow-hidden ml-8 md:ml-6 flex justify-end">
                <div className="flex animate-scroll-text-from-right">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="flex items-center gap-12 md:gap-10 whitespace-nowrap flex-shrink-0 px-4">
                      <span className="text-white uppercase text-lg md:text-base font-semibold tracking-wider">ADRENALINE</span>
                      <span className="text-white uppercase text-lg md:text-base font-semibold tracking-wider">DISCIPLINE</span>
                      <span className="text-white uppercase text-lg md:text-base font-semibold tracking-wider">DECISION</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full bg-white !h-52 py-8 px-8 md:px-6">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-8">
            <p className="text-base md:text-lg text-gray-800 !text-center leading-relaxed flex-1">
              The Champions Collection by Deployed celebrates the relentless pursuit of excellence, where adrenaline meets discipline, and every decision counts. Built for those who race towards victory.
            </p>
          </div>
        </div>
      </div>

      {/* Racing Products Section */}
      <section className="w-full bg-white py-16 md:py-12">
        <div className="relative overflow-x-hidden">
          <button
            onClick={() => scrollLeft(racingProductsScrollRef)}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-14 h-14 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-100 transition-all duration-300 z-20 border-2 border-gray-200 md:flex hidden"
            aria-label="Previous product"
          >
            <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div 
            ref={racingProductsScrollRef}
            onScroll={() => handleScroll(racingProductsScrollRef, 'racingProducts')}
            className="overflow-x-auto scrollbar-hide flex gap-6 pb-4 scroll-smooth pl-4"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {racingProducts.map((product) => (
              <div key={product.id} className="flex-shrink-0 w-64 md:w-72 group relative bg-white">
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
          <button
            onClick={() => scrollRight(racingProductsScrollRef)}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-14 h-14 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-100 transition-all duration-300 z-20 border-2 border-gray-200 md:flex hidden"
            aria-label="Next product"
          >
            <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
        {/* Progress Bar */}
        <div className="flex justify-center mt-6">
          <div className="relative w-64 h-0.5 bg-gray-300">
            <div 
              className="absolute top-0 h-full bg-black transition-all duration-300"
              style={{ 
                width: '20%',
                left: `${scrollProgress.racingProducts * 0.8}%`
              }}
            ></div>
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
    </div>
  );
}

export default Homepage;