import { useState, useEffect } from 'react';

function Navbar() {
  const [promoIndex, setPromoIndex] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showCategories, setShowCategories] = useState(false);
  const [showCollections, setShowCollections] = useState(false);
  const [showCapsule, setShowCapsule] = useState(false);
  const [showAccessories, setShowAccessories] = useState(false);
  const [showKidsAndToddlers, setShowKidsAndToddlers] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [showCurrencyDropdown, setShowCurrencyDropdown] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState('INR');
  
  // Promotional messages - add your messages here
  const promoMessages = [
    "BUY ANY 1 PRODUCTS AND GET 10% OFF I USE CODE DEPLOYED10",
    "Buy any 2 products and get 20% off I Use code DEPLOYED20",
    "Buy any 3 products and get 25% off I Use code DEPLOYED25",
    "COD Available | Easy Returns I 6,00,000+ customers served",
    "Wear Your Valour I Built to stand apart"
    // Add more messages here as needed
  ];

  // Auto-carousel effect
  useEffect(() => {
    if (promoMessages.length <= 1) return;

    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setPromoIndex((prev) => (prev === promoMessages.length - 1 ? 0 : prev + 1));
        setIsTransitioning(false);
      }, 300);
    }, 5000); // Change message every 5 seconds

    return () => clearInterval(interval);
  }, [promoMessages.length]);

  useEffect(() => {
    const handleScroll = () => {
      // Get the hero section height (approximately viewport height)
      const heroHeight = window.innerHeight;
      // Check if scrolled past the hero section
      setIsScrolled(window.scrollY > heroHeight * 0.3);
    };

    window.addEventListener('scroll', handleScroll);
    // Check initial scroll position
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  // Close currency dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showCurrencyDropdown && !event.target.closest('.currency-selector')) {
        setShowCurrencyDropdown(false);
      }
    };

    if (showCurrencyDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showCurrencyDropdown]);

  const handlePromoPrev = () => {
    if (promoMessages.length <= 1) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setPromoIndex((prev) => (prev === 0 ? promoMessages.length - 1 : prev - 1));
      setIsTransitioning(false);
    }, 300);
  };

  const handlePromoNext = () => {
    if (promoMessages.length <= 1) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setPromoIndex((prev) => (prev === promoMessages.length - 1 ? 0 : prev + 1));
      setIsTransitioning(false);
    }, 300);
  };

  // Find the longest message to set max-width
  const longestMessage = promoMessages.reduce((longest, current) => 
    current.length > longest.length ? current : longest, 
    promoMessages[0] || ''
  );
  
  // Calculate approximate width based on character count (roughly 7px per character for text-xs)
  // Add padding for arrows (32px each) and some extra spacing
  const maxWidth = Math.min(longestMessage.length * 7 + 100, 1200);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    // Reset views when closing menu
    if (isMenuOpen) {
      setShowCategories(false);
      setShowCollections(false);
      setShowCapsule(false);
      setShowAccessories(false);
      setShowKidsAndToddlers(false);
    }
  };

  const menuItems = [
    { label: "DEPLOYED® BASICS", hasArrow: false },
    { label: "CATEGORIES", hasArrow: true, onClick: () => setShowCategories(true) },
    { label: "COLLECTIONS", hasArrow: true, onClick: () => setShowCollections(true) },
    { label: "CAPSULE", hasArrow: true, onClick: () => setShowCapsule(true) },
    { label: "BUNDLES", hasArrow: false },
    { label: "CLEARANCE SALE", hasArrow: false },
    { label: "ACCESSORIES", hasArrow: true, onClick: () => setShowAccessories(true) },
    { label: "KIDS AND TODDLERS", hasArrow: true, onClick: () => setShowKidsAndToddlers(true) },
  ];

  const categories = [
    "T-Shirt",
    "Full Sleeve T-Shirt",
    "Polo",
    "Oversized",
    "Cargo Shirt",
    "Sweatshirt",
    "Hoodies",
    "Zipper Hoodies",
    "Jacket"
  ];

  const collections = [
    { category: "MILITARY", subcategories: ["Army", "Airforce", "Navy"] },
    { category: "ADVENTURE", subcategories: ["Wildlife & Nature", "Travel", "Mountaineering", "Offroad Riding"] },
    { category: "PATRIOT", subcategories: [] },
    { category: "CHAMPIONS", subcategories: ["Racing", "Combat & Fitness"] },
    { category: "MEN AT WORK", subcategories: [] },
    { category: "TRANSPORT", subcategories: ["Land", "Air", "Sea"] },
  ];

  const capsuleItems = [
    "Operation Sindoor",
    "Ghatak Collection",
    "Camo Collection",
    "On Duty Collection",
    "Outpost",
    "Kargil Collection",
    "Deployed x SKYHIGH",
    "Deployed x HMI",
    "Deployed x Wildlife SOS",
    "Special Forces",
    "The Guts and Glory 1971",
    "Operation Black Tornado",
    "The Gorkhas",
    "Aero Stripes",
    "Retro Arcade Collection",
    "Flagship Polos"
  ];

  const accessoriesItems = [
    "Patches",
    "Tacticards",
    "Aero Cap",
    "Keychain",
    "Paracord Bracelet",
    "Tactical Belts",
    "Socks"
  ];

  const kidsItems = [
    "Kids Hoodie",
    "Kids T-Shirt"
  ];

  const mostViewedCollections = [
    "MILITARY",
    "ADVENTURE",
    "PATRIOT",
    "CHAMPIONS",
    "MEN AT WORK",
    "TRANSPORT"
  ];

  const currencies = [
    { code: 'INR', flag: '🇮🇳', name: 'Auto Location' },
    { code: 'AED', flag: '🇦🇪', name: 'United Arab Emirates Dirham' },
  ];

  return (
    <div className={`w-full fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-gray-800' : 'bg-transparent'
    }`}>
      {/* Promotional Banner - Always opaque with black background */}
      <div className="bg-black text-white py-3 px-4 flex items-center justify-center">
        <div 
          className="relative flex items-center justify-center mx-auto"
          style={{ 
            maxWidth: `${maxWidth}px`,
            width: '100%'
          }}
        >
          {/* Left Arrow - positioned at the left end */}
          <button
            onClick={handlePromoPrev}
            className="absolute left-0 text-white hover:text-gray-300 transition-colors flex-shrink-0"
            aria-label="Previous promotion"
            disabled={promoMessages.length <= 1}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Promotional Text with smooth transition - centered */}
          <div className="text-center text-xs font-semibold tracking-wider whitespace-nowrap overflow-visible relative flex items-center justify-center min-h-[20px] px-8">
            <div 
              className={`transition-all duration-500 ease-in-out ${
                isTransitioning ? 'opacity-0 translate-x-4' : 'opacity-100 translate-x-0'
              }`}
              key={promoIndex}
            >
              {promoMessages[promoIndex]}
            </div>
          </div>

          {/* Right Arrow - positioned at the right end */}
          <button
            onClick={handlePromoNext}
            className="absolute right-0 text-white hover:text-gray-300 transition-colors flex-shrink-0"
            aria-label="Next promotion"
            disabled={promoMessages.length <= 1}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Main Navbar */}
      <div className={`px-6 py-4 flex items-center justify-between transition-all duration-300 ${
        isMenuOpen 
          ? 'bg-white border-t border-gray-200' 
          : isScrolled 
            ? 'bg-gray-800 border-t border-gray-700' 
            : 'bg-transparent border-t border-transparent'
      }`}>
        {/* Left: Menu Button */}
        <button
          onClick={toggleMenu}
          className={`flex items-center gap-2 uppercase font-semibold text-sm tracking-wide transition-colors ${
            isMenuOpen 
              ? 'text-black hover:text-gray-600' 
              : 'text-white hover:text-gray-300'
          }`}
          aria-label="Menu"
        >
          {isMenuOpen ? (
            <>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              <span className="hidden sm:inline">MENU</span>
            </>
          ) : (
            <>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <span className="hidden sm:inline">MENU</span>
            </>
          )}
        </button>

        {/* Center: Logo */}
        <div className="flex items-center gap-2">
          {/* Geometric Icon - Two upward chevrons/arrows */}
          <svg className={`w-5 h-5 transition-colors ${isMenuOpen ? 'text-black' : 'text-white'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
            <path strokeLinecap="square" strokeLinejoin="miter" d="M5 15l7-7 7 7M5 9l7-7 7 7" />
          </svg>
          <h1 className={`text-xl font-black tracking-tight uppercase transition-colors ${isMenuOpen ? 'text-black' : 'text-white'}`} style={{ 
            fontFamily: 'system-ui, -apple-system, sans-serif',
            letterSpacing: '0.05em',
            fontWeight: 900
          }}>
            DEPLOYED
          </h1>
        </div>

        {/* Right: Icons */}
        <div className="flex items-center gap-4">
          {/* Profile Icon */}
          <button
            className={`transition-colors ${isMenuOpen ? 'text-black hover:text-gray-600' : 'text-white hover:text-gray-300'}`}
            aria-label="User profile"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </button>

          {/* Search Icon */}
          <button
            onClick={() => setShowSearch(true)}
            className={`transition-colors ${isMenuOpen ? 'text-black hover:text-gray-600' : 'text-white hover:text-gray-300'}`}
            aria-label="Search"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>

          {/* Cart Icon */}
          <button
            onClick={() => setShowCart(true)}
            className={`transition-colors relative ${isMenuOpen ? 'text-black hover:text-gray-600' : 'text-white hover:text-gray-300'}`}
            aria-label="Shopping cart"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            {/* Cart badge can be added here if needed */}
          </button>
        </div>
      </div>

      {/* Side Menu - positioned below navbar */}
      <div
        className={`fixed left-0 bg-white z-50 transform transition-transform duration-300 ease-in-out ${
          isMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        style={{ 
          width: '33.333333%', 
          minWidth: '300px', 
          maxWidth: '400px',
          top: '112px', // Below promotional banner + navbar
          height: 'calc(100vh - 112px)'
        }}
      >
        <div className="h-full flex flex-col p-8">
          {showCategories ? (
            <>
              {/* Back Button */}
              <div className="mb-6 flex-shrink-0">
                <button
                  onClick={() => setShowCategories(false)}
                  className="bg-gray-100 hover:bg-gray-200 text-black uppercase font-semibold text-sm tracking-wide px-4 py-2 rounded-md transition-colors flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  BACK
                </button>
              </div>

              {/* Categories List - Scrollable */}
              <div className="flex-1 overflow-y-auto scrollbar-hide">
                {categories.map((category, index) => (
                  <button
                    key={index}
                    className="w-full text-left py-3 text-black font-medium text-base hover:text-gray-600 transition-colors"
                  >
                    {category}
                  </button>
                ))}
              </div>

              {/* Currency Selector - Fixed at bottom */}
              <div className="mt-auto mb-6 flex-shrink-0 relative currency-selector">
                <button
                  onClick={() => setShowCurrencyDropdown(!showCurrencyDropdown)}
                  className="flex items-center gap-2 text-black uppercase font-semibold text-lg tracking-wide hover:text-gray-600 transition-colors"
                >
                  <span className="text-2xl">
                    {currencies.find(c => c.code === selectedCurrency)?.flag || '🇮🇳'}
                  </span>
                  <span>{selectedCurrency}</span>
                  <svg 
                    className={`w-4 h-4 text-black transition-transform ${showCurrencyDropdown ? 'rotate-180' : ''}`}
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {/* Currency Dropdown */}
                {showCurrencyDropdown && (
                  <div className="absolute bottom-full left-0 mb-2 bg-white border border-gray-200 rounded-md shadow-lg z-50 min-w-[280px]">
                    {currencies.map((currency) => (
                      <button
                        key={currency.code}
                        onClick={() => {
                          setSelectedCurrency(currency.code);
                          setShowCurrencyDropdown(false);
                        }}
                        className={`w-full text-left px-4 py-3 flex items-center gap-3 hover:bg-gray-100 transition-colors ${
                          selectedCurrency === currency.code ? 'bg-gray-50' : ''
                        }`}
                      >
                        <span className="text-xl">{currency.flag}</span>
                        <span className="text-black font-medium text-base">
                          {currency.name}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </>
          ) : showCollections ? (
            <>
              {/* Back Button */}
              <div className="mb-6 flex-shrink-0">
                <button
                  onClick={() => setShowCollections(false)}
                  className="bg-gray-100 hover:bg-gray-200 text-black uppercase font-semibold text-sm tracking-wide px-4 py-2 rounded-md transition-colors flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  BACK
                </button>
              </div>

              {/* Collections List - Scrollable */}
              <div className="flex-1 overflow-y-auto scrollbar-hide">
                {collections.map((collection, index) => (
                  <div key={index} className="mb-4">
                    <div className="text-black font-semibold text-base py-2">
                      {collection.category}
                    </div>
                    {collection.subcategories.length > 0 && (
                      <div className="pl-4">
                        {collection.subcategories.map((subcategory, subIndex) => (
                          <button
                            key={subIndex}
                            className="w-full text-left py-2 text-black font-medium text-base hover:text-gray-600 transition-colors"
                          >
                            {subcategory}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Currency Selector - Fixed at bottom */}
              <div className="mt-auto mb-6 flex-shrink-0 relative currency-selector">
                <button
                  onClick={() => setShowCurrencyDropdown(!showCurrencyDropdown)}
                  className="flex items-center gap-2 text-black uppercase font-semibold text-lg tracking-wide hover:text-gray-600 transition-colors"
                >
                  <span className="text-2xl">
                    {currencies.find(c => c.code === selectedCurrency)?.flag || '🇮🇳'}
                  </span>
                  <span>{selectedCurrency}</span>
                  <svg 
                    className={`w-4 h-4 text-black transition-transform ${showCurrencyDropdown ? 'rotate-180' : ''}`}
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {/* Currency Dropdown */}
                {showCurrencyDropdown && (
                  <div className="absolute bottom-full left-0 mb-2 bg-white border border-gray-200 rounded-md shadow-lg z-50 min-w-[280px]">
                    {currencies.map((currency) => (
                      <button
                        key={currency.code}
                        onClick={() => {
                          setSelectedCurrency(currency.code);
                          setShowCurrencyDropdown(false);
                        }}
                        className={`w-full text-left px-4 py-3 flex items-center gap-3 hover:bg-gray-100 transition-colors ${
                          selectedCurrency === currency.code ? 'bg-gray-50' : ''
                        }`}
                      >
                        <span className="text-xl">{currency.flag}</span>
                        <span className="text-black font-medium text-base">
                          {currency.name}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </>
          ) : showCapsule ? (
            <>
              {/* Back Button */}
              <div className="mb-6 flex-shrink-0">
                <button
                  onClick={() => setShowCapsule(false)}
                  className="bg-gray-100 hover:bg-gray-200 text-black uppercase font-semibold text-sm tracking-wide px-4 py-2 rounded-md transition-colors flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  BACK
                </button>
              </div>

              {/* Capsule List - Scrollable */}
              <div className="flex-1 overflow-y-auto scrollbar-hide">
                {capsuleItems.map((item, index) => (
                  <button
                    key={index}
                    className="w-full text-left py-3 text-black font-medium text-base hover:text-gray-600 transition-colors"
                  >
                    {item}
                  </button>
                ))}
              </div>

              {/* Currency Selector - Fixed at bottom */}
              <div className="mt-auto mb-6 flex-shrink-0 relative currency-selector">
                <button
                  onClick={() => setShowCurrencyDropdown(!showCurrencyDropdown)}
                  className="flex items-center gap-2 text-black uppercase font-semibold text-lg tracking-wide hover:text-gray-600 transition-colors"
                >
                  <span className="text-2xl">
                    {currencies.find(c => c.code === selectedCurrency)?.flag || '🇮🇳'}
                  </span>
                  <span>{selectedCurrency}</span>
                  <svg 
                    className={`w-4 h-4 text-black transition-transform ${showCurrencyDropdown ? 'rotate-180' : ''}`}
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {/* Currency Dropdown */}
                {showCurrencyDropdown && (
                  <div className="absolute bottom-full left-0 mb-2 bg-white border border-gray-200 rounded-md shadow-lg z-50 min-w-[280px]">
                    {currencies.map((currency) => (
                      <button
                        key={currency.code}
                        onClick={() => {
                          setSelectedCurrency(currency.code);
                          setShowCurrencyDropdown(false);
                        }}
                        className={`w-full text-left px-4 py-3 flex items-center gap-3 hover:bg-gray-100 transition-colors ${
                          selectedCurrency === currency.code ? 'bg-gray-50' : ''
                        }`}
                      >
                        <span className="text-xl">{currency.flag}</span>
                        <span className="text-black font-medium text-base">
                          {currency.name}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </>
          ) : showAccessories ? (
            <>
              {/* Back Button */}
              <div className="mb-6 flex-shrink-0">
                <button
                  onClick={() => setShowAccessories(false)}
                  className="bg-gray-100 hover:bg-gray-200 text-black uppercase font-semibold text-sm tracking-wide px-4 py-2 rounded-md transition-colors flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  BACK
                </button>
              </div>

              {/* Accessories List - Scrollable */}
              <div className="flex-1 overflow-y-auto scrollbar-hide">
                {accessoriesItems.map((item, index) => (
                  <button
                    key={index}
                    className="w-full text-left py-3 text-black font-medium text-base hover:text-gray-600 transition-colors"
                  >
                    {item}
                  </button>
                ))}
              </div>

              {/* Currency Selector - Fixed at bottom */}
              <div className="mt-auto mb-6 flex-shrink-0 relative currency-selector">
                <button
                  onClick={() => setShowCurrencyDropdown(!showCurrencyDropdown)}
                  className="flex items-center gap-2 text-black uppercase font-semibold text-lg tracking-wide hover:text-gray-600 transition-colors"
                >
                  <span className="text-2xl">
                    {currencies.find(c => c.code === selectedCurrency)?.flag || '🇮🇳'}
                  </span>
                  <span>{selectedCurrency}</span>
                  <svg 
                    className={`w-4 h-4 text-black transition-transform ${showCurrencyDropdown ? 'rotate-180' : ''}`}
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {/* Currency Dropdown */}
                {showCurrencyDropdown && (
                  <div className="absolute bottom-full left-0 mb-2 bg-white border border-gray-200 rounded-md shadow-lg z-50 min-w-[280px]">
                    {currencies.map((currency) => (
                      <button
                        key={currency.code}
                        onClick={() => {
                          setSelectedCurrency(currency.code);
                          setShowCurrencyDropdown(false);
                        }}
                        className={`w-full text-left px-4 py-3 flex items-center gap-3 hover:bg-gray-100 transition-colors ${
                          selectedCurrency === currency.code ? 'bg-gray-50' : ''
                        }`}
                      >
                        <span className="text-xl">{currency.flag}</span>
                        <span className="text-black font-medium text-base">
                          {currency.name}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </>
          ) : showKidsAndToddlers ? (
            <>
              {/* Back Button */}
              <div className="mb-6 flex-shrink-0">
                <button
                  onClick={() => setShowKidsAndToddlers(false)}
                  className="bg-gray-100 hover:bg-gray-200 text-black uppercase font-semibold text-sm tracking-wide px-4 py-2 rounded-md transition-colors flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  BACK
                </button>
              </div>

              {/* Kids and Toddlers List - Scrollable */}
              <div className="flex-1 overflow-y-auto scrollbar-hide">
                {kidsItems.map((item, index) => (
                  <button
                    key={index}
                    className="w-full text-left py-3 text-black font-medium text-base hover:text-gray-600 transition-colors"
                  >
                    {item}
                  </button>
                ))}
              </div>

              {/* Currency Selector - Fixed at bottom */}
              <div className="mt-auto mb-6 flex-shrink-0 relative currency-selector">
                <button
                  onClick={() => setShowCurrencyDropdown(!showCurrencyDropdown)}
                  className="flex items-center gap-2 text-black uppercase font-semibold text-lg tracking-wide hover:text-gray-600 transition-colors"
                >
                  <span className="text-2xl">
                    {currencies.find(c => c.code === selectedCurrency)?.flag || '🇮🇳'}
                  </span>
                  <span>{selectedCurrency}</span>
                  <svg 
                    className={`w-4 h-4 text-black transition-transform ${showCurrencyDropdown ? 'rotate-180' : ''}`}
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {/* Currency Dropdown */}
                {showCurrencyDropdown && (
                  <div className="absolute bottom-full left-0 mb-2 bg-white border border-gray-200 rounded-md shadow-lg z-50 min-w-[280px]">
                    {currencies.map((currency) => (
                      <button
                        key={currency.code}
                        onClick={() => {
                          setSelectedCurrency(currency.code);
                          setShowCurrencyDropdown(false);
                        }}
                        className={`w-full text-left px-4 py-3 flex items-center gap-3 hover:bg-gray-100 transition-colors ${
                          selectedCurrency === currency.code ? 'bg-gray-50' : ''
                        }`}
                      >
                        <span className="text-xl">{currency.flag}</span>
                        <span className="text-black font-medium text-base">
                          {currency.name}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              {/* Scrollable Menu Content */}
              <div className="flex-1 overflow-y-auto scrollbar-hide mt-8">
                {/* Main Menu Items */}
                {menuItems.map((item, index) => (
                  <button
                    key={index}
                    onClick={item.onClick}
                    className="w-full text-left py-4 text-black uppercase font-semibold text-lg tracking-wide hover:text-gray-600 transition-colors flex items-center justify-between"
                  >
                    <span>{item.label}</span>
                    {item.hasArrow && (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    )}
                  </button>
                ))}

                {/* Additional Links */}
                <div className="mt-6">
                  <button className="w-full text-left py-4 text-black uppercase font-semibold text-base tracking-wide hover:text-gray-600 transition-colors">
                    CONTACT US
                  </button>
                  <button className="w-full text-left py-4 text-black uppercase font-semibold text-base tracking-wide hover:text-gray-600 transition-colors">
                    RETURN AND EXCHANGE
                  </button>
                  <button className="w-full text-left py-4 text-black uppercase font-semibold text-base tracking-wide hover:text-gray-600 transition-colors">
                    TRACK YOUR ORDER
                  </button>
                  <button className="w-full text-left py-4 text-black uppercase font-semibold text-base tracking-wide hover:text-gray-600 transition-colors">
                    WISHLIST
                  </button>
                </div>
              </div>

              {/* Fixed Bottom Section */}
              <div className="flex-shrink-0 mt-auto">
                {/* Currency Selector */}
                <div className="mb-6 relative currency-selector">
                  <button
                    onClick={() => setShowCurrencyDropdown(!showCurrencyDropdown)}
                    className="flex items-center gap-2 text-black uppercase font-semibold text-lg tracking-wide hover:text-gray-600 transition-colors"
                  >
                    <span className="text-2xl">
                      {currencies.find(c => c.code === selectedCurrency)?.flag || '🇮🇳'}
                    </span>
                    <span>{selectedCurrency}</span>
                    <svg 
                      className={`w-4 h-4 text-black transition-transform ${showCurrencyDropdown ? 'rotate-180' : ''}`}
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  
                  {/* Currency Dropdown */}
                  {showCurrencyDropdown && (
                    <div className="absolute bottom-full left-0 mb-2 bg-white border border-gray-200 rounded-md shadow-lg z-50 min-w-[280px]">
                      {currencies.map((currency) => (
                        <button
                          key={currency.code}
                          onClick={() => {
                            setSelectedCurrency(currency.code);
                            setShowCurrencyDropdown(false);
                          }}
                          className={`w-full text-left px-4 py-3 flex items-center gap-3 hover:bg-gray-100 transition-colors ${
                            selectedCurrency === currency.code ? 'bg-gray-50' : ''
                          }`}
                        >
                          <span className="text-xl">{currency.flag}</span>
                          <span className="text-black font-medium text-base">
                            {currency.name}
                          </span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Social Media Icons */}
                <div className="flex items-center gap-4">
                  <a href="#" className="text-black hover:text-gray-600 transition-colors" aria-label="Facebook">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>
                  <a href="#" className="text-black hover:text-gray-600 transition-colors" aria-label="Twitter">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  </a>
                  <a href="#" className="text-black hover:text-gray-600 transition-colors" aria-label="Instagram">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </a>
                  <a href="#" className="text-black hover:text-gray-600 transition-colors" aria-label="YouTube">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Backdrop/Overlay - positioned below navbar with strong blur */}
      {isMenuOpen && (
        <div
          className="fixed z-40"
          style={{
            top: '112px', // Start below navbar
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(107, 114, 128, 0.4)',
            backdropFilter: 'blur(16px) saturate(180%)',
            WebkitBackdropFilter: 'blur(16px) saturate(180%)'
          }}
          onClick={toggleMenu}
        />
      )}

      {/* Search Overlay */}
      {showSearch && (
        <>
          {/* Backdrop with blur */}
          <div
            className="fixed inset-0 z-50"
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.3)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)'
            }}
            onClick={() => setShowSearch(false)}
          />
          
          {/* Search Panel - slides in from right */}
          <div
            className="fixed right-0 top-0 h-full bg-white z-50 transform transition-transform duration-300 ease-in-out shadow-2xl"
            style={{ width: '33.333333%', minWidth: '350px' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="h-full flex flex-col p-6">
              {/* Search Bar */}
              <div className="mb-8">
                <div className="flex items-center border-b-2 border-black pb-3">
                  <svg className="w-6 h-6 text-black mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <input
                    type="text"
                    placeholder="SEARCH FOR..."
                    className="flex-1 text-black uppercase font-semibold text-base tracking-wide bg-transparent border-none outline-none placeholder-gray-500"
                    autoFocus
                  />
                  <button
                    onClick={() => setShowSearch(false)}
                    className="text-black hover:text-gray-600 transition-colors ml-3"
                    aria-label="Close search"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Most Viewed Collections */}
              <div>
                <h2 className="text-black uppercase font-semibold text-lg tracking-wide mb-4">
                  MOST VIEWED COLLECTIONS
                </h2>
                <div className="space-y-3">
                  {mostViewedCollections.map((collection, index) => (
                    <button
                      key={index}
                      className="w-full text-left text-black font-medium text-base hover:text-gray-600 transition-colors py-2"
                    >
                      {collection}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Cart Overlay */}
      {showCart && (
        <>
          {/* Backdrop with blur */}
          <div
            className="fixed inset-0 z-50"
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.3)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)'
            }}
            onClick={() => setShowCart(false)}
          />
          
          {/* Cart Panel - slides in from right */}
          <div
            className="fixed right-0 top-0 h-full bg-white z-50 transform transition-transform duration-300 ease-in-out shadow-2xl"
            style={{ width: '33.333333%', minWidth: '350px' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="h-full flex flex-col">
              {/* Top Bar */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <button
                  onClick={() => setShowCart(false)}
                  className="text-black hover:text-gray-600 transition-colors"
                  aria-label="Close cart"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                <div className="flex items-center gap-2">
                  <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  <h2 className="text-black uppercase font-semibold text-lg tracking-wide">CART</h2>
                </div>
                <div className="w-6"></div> {/* Spacer for centering */}
              </div>

              {/* Navigation Tabs */}
              <div className="flex border-b border-gray-200">
                <button className="flex-1 flex items-center justify-center gap-2 py-4 bg-white border-b-2 border-black text-black uppercase font-semibold text-sm tracking-wide">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  CART
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 py-4 bg-gray-100 text-black uppercase font-semibold text-sm tracking-wide relative">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                  OFFERS
                  <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>
              </div>

              {/* Cart Content */}
              <div className="flex-1 flex flex-col items-center justify-center p-6">
                <p className="text-gray-600 uppercase font-semibold text-base tracking-wide mb-6">
                  YOUR CART IS EMPTY
                </p>
                <button
                  onClick={() => setShowCart(false)}
                  className="bg-black text-white uppercase font-semibold text-sm tracking-wide px-8 py-3 rounded-md hover:bg-gray-800 transition-colors"
                >
                  CONTINUE SHOPPING
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Navbar;
