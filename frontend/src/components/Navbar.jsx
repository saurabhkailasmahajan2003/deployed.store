import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { getCartItemsCount } = useCart();
  const { getWishlistCount } = useWishlist();
  const { isAuthenticated, user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  
  const [activeCategory, setActiveCategory] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');
  
  // UI States
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [expandedMobileCategory, setExpandedMobileCategory] = useState(null); // Mobile Accordion
  const [hoveredCategory, setHoveredCategory] = useState(null); // Desktop Dropdown
  const [isScrolled, setIsScrolled] = useState(false);

  // --- DATA CONFIGURATION ---
  
  // 1. Define Sub-Items for each category
  const menSubItems = [
    { name: 'Shirts', path: '/men/shirt' },
    { name: 'T-Shirts', path: '/men/tshirt' },
    { name: 'Jeans', path: '/men/jeans' },
    { name: 'Trousers', path: '/men/trousers' },
  ];

  const womenSubItems = [
    { name: 'Shirts', path: '/women/shirt' },
    { name: 'T-Shirts', path: '/women/tshirt' },
    { name: 'Jeans', path: '/women/jeans' },
    { name: 'Trousers', path: '/women/trousers' },
  ];

  const watchesSubItems = [
    { name: "Men's Watches", path: '/watches?gender=men' },
    { name: "Women's Watches", path: '/watches?gender=women' },
    { name: 'Smart Watches', path: '/watches?type=smart' },
  ];

  const lensesSubItems = [
    { name: "Men's Eyewear", path: '/lenses?gender=men' },
    { name: "Women's Eyewear", path: '/lenses?gender=women' },
    { name: 'Sunglasses', path: '/lenses?type=sun' },
  ];

  const accessoriesSubItems = [
    { name: "Men's Accessories", path: '/accessories?gender=men' },
    { name: "Women's Accessories", path: '/accessories?gender=women' },
    { name: 'Wallets & Belts', path: '/accessories?type=general' },
  ];

  // 2. Master Navigation Config
  const navLinks = [
    { id: 'men', label: 'Men', path: '/men', subItems: menSubItems },
    { id: 'women', label: 'Women', path: '/women', subItems: womenSubItems },
    { id: 'watches', label: 'Watches', path: '/watches', subItems: watchesSubItems },
    { id: 'lenses', label: 'Lenses', path: '/lenses', subItems: lensesSubItems },
    { id: 'accessories', label: 'Accessories', path: '/accessories', subItems: accessoriesSubItems },
  ];

  // --- EFFECTS ---

  useEffect(() => {
    const path = location.pathname;
    if (path === '/') setActiveCategory('home');
    else if (path.includes('/men')) setActiveCategory('men');
    else if (path.includes('/women')) setActiveCategory('women');
    else if (path.includes('/watches')) setActiveCategory('watches');
    else if (path.includes('/lenses')) setActiveCategory('lenses');
    else if (path.includes('/accessories')) setActiveCategory('accessories');
    else if (path.includes('/sale')) setActiveCategory('sale');
    
    setIsMobileMenuOpen(false);
    setIsSearchOpen(false);
    window.scrollTo(0, 0); // Scroll to top on route change
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : 'unset';
  }, [isMobileMenuOpen]);

  // --- HANDLERS ---

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
      setIsSearchOpen(false);
    }
  };

  const toggleMobileAccordion = (id) => {
    setExpandedMobileCategory(expandedMobileCategory === id ? null : id);
  };

  return (
    <>
      {/* =======================
          HEADER
      ======================== */}
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b 
        ${isScrolled ? 'bg-white/95 backdrop-blur-md border-gray-200 shadow-sm py-2' : 'bg-white border-transparent py-3 md:py-4'}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-12">

            {/* LEFT: Mobile Toggle & Logo */}
            <div className="flex items-center gap-4">
              <button 
                className="md:hidden p-1 text-gray-800"
                onClick={() => setIsMobileMenuOpen(true)}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h7" /></svg>
              </button>

              <Link to="/" className="flex-shrink-0 group">
                 <img 
                   src="https://res.cloudinary.com/de1bg8ivx/image/upload/v1764747760/Urban_Vesra-removebg-preview_xyipwy.png"
                   alt="Logo"
                   className="h-8 md:h-11 w-auto object-contain transition-transform group-hover:scale-105"
                 />
              </Link>
            </div>

            {/* CENTER: Desktop Navigation (Dynamic) */}
            <div className="hidden md:flex items-center space-x-8">
              <Link 
                to="/" 
                className={`text-sm font-medium uppercase tracking-wide transition-colors ${activeCategory === 'home' ? 'text-black font-bold' : 'text-gray-500 hover:text-black'}`}
              >
                Home
              </Link>

              {navLinks.map((link) => (
                 <div 
                  key={link.id} 
                  className="relative group h-12 flex items-center"
                  onMouseEnter={() => setHoveredCategory(link.id)}
                  onMouseLeave={() => setHoveredCategory(null)}
                 >
                    <Link 
                      to={link.path}
                      className={`text-sm font-medium transition-colors tracking-wide uppercase ${activeCategory === link.id ? 'text-black font-bold' : 'text-gray-500 hover:text-black'}`}
                    >
                      {link.label}
                    </Link>
                    
                    {/* Active Indicator */}
                    {activeCategory === link.id && (
                      <span className="absolute bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-black rounded-full"></span>
                    )}

                    {/* Desktop Dropdown */}
                    {hoveredCategory === link.id && link.subItems && (
                       <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2">
                         <div className="bg-white rounded-lg shadow-xl border border-gray-100 p-2 w-56 animate-fadeIn">
                            {link.subItems.map((sub, idx) => (
                              <Link 
                                key={idx} 
                                to={sub.path}
                                className="block px-4 py-2.5 text-sm text-gray-600 hover:bg-gray-50 hover:text-black rounded-md transition-colors"
                              >
                                {sub.name}
                              </Link>
                            ))}
                            <div className="border-t border-gray-50 mt-1 pt-1">
                              <Link to={link.path} className="block px-4 py-2 text-xs font-bold text-black uppercase tracking-wider hover:bg-gray-50">
                                View All {link.label}
                              </Link>
                            </div>
                         </div>
                       </div>
                    )}
                 </div>
              ))}
              
              <Link to="/sale" className="text-sm font-bold text-red-600 uppercase tracking-wide hover:text-red-700">Sale</Link>
            </div>

            {/* RIGHT: Actions */}
            <div className="flex items-center gap-2 md:gap-5">
              
              {/* Search Toggle (Mobile) */}
              <button onClick={() => setIsSearchOpen(!isSearchOpen)} className="md:hidden p-2 text-gray-700">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              </button>

              {/* Desktop Search */}
              <form onSubmit={handleSearch} className="hidden md:block relative group">
                 <input 
                   type="text" 
                   value={searchQuery}
                   onChange={(e) => setSearchQuery(e.target.value)}
                   placeholder="Search..."
                   className="pl-4 pr-10 py-2 text-sm bg-gray-100/80 hover:bg-gray-100 rounded-full border-none focus:ring-1 focus:ring-black w-48 transition-all duration-300 placeholder-gray-500"
                 />
                 <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-black">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                 </button>
              </form>

              {/* Icons */}
              <div className="hidden md:flex items-center gap-3">
                 <Link to="/wishlist" className="p-2 text-gray-600 hover:text-black hover:bg-gray-100 rounded-full relative transition-all">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                    {getWishlistCount() > 0 && <span className="absolute top-1 right-0.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>}
                 </Link>

                 {isAuthenticated ? (
                   <Link to="/profile" className="p-2 text-gray-600 hover:text-black hover:bg-gray-100 rounded-full transition-all">
                     <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                   </Link>
                 ) : (
                   <Link to="/login" className="text-sm font-bold text-gray-900 hover:text-gray-600 px-3 py-2">Login</Link>
                 )}
                 
                 <Link to="/cart" className="flex items-center justify-center w-10 h-10 bg-black text-white rounded-full hover:bg-gray-800 transition-all relative">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
                    {getCartItemsCount() > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-bold border-2 border-white">
                        {getCartItemsCount()}
                      </span>
                    )}
                 </Link>
              </div>

              {/* Mobile Cart Icon */}
              <Link to="/cart" className="md:hidden p-2 text-gray-800 relative">
                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
                 {getCartItemsCount() > 0 && <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-600 rounded-full border border-white"></span>}
              </Link>

            </div>
          </div>

          {/* Mobile Search Expand */}
          {isSearchOpen && (
            <form onSubmit={handleSearch} className="md:hidden py-3 px-1 animate-slideDown">
               <input 
                 autoFocus
                 type="text" 
                 value={searchQuery}
                 onChange={(e) => setSearchQuery(e.target.value)}
                 placeholder="Search products..."
                 className="w-full bg-gray-100 border-none rounded-lg px-4 py-3 text-sm focus:ring-1 focus:ring-black"
               />
            </form>
          )}
        </div>
      </nav>
      
      {/* Spacer to prevent content from hiding behind fixed navbar */}
      <div className="h-16 md:h-20 w-full"></div>


      {/* =======================
          MOBILE BOTTOM BAR
      ======================== */}
      <div className="md:hidden fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 z-50 flex justify-around items-center py-3 pb-safe-area shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
         <Link to="/" className={`flex flex-col items-center gap-1 w-16 ${activeCategory === 'home' ? 'text-black' : 'text-gray-400'}`}>
            <svg className="w-6 h-6" fill={activeCategory === 'home' ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
            <span className="text-[10px] font-medium">Home</span>
         </Link>
         
         <button onClick={() => setIsMobileMenuOpen(true)} className={`flex flex-col items-center gap-1 w-16 ${isMobileMenuOpen ? 'text-black' : 'text-gray-400'}`}>
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" /></svg>
            <span className="text-[10px] font-medium">Menu</span>
         </button>

         <Link to="/wishlist" className="flex flex-col items-center gap-1 w-16 text-gray-400">
            <div className="relative">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
              {getWishlistCount() > 0 && <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>}
            </div>
            <span className="text-[10px] font-medium">Saved</span>
         </Link>

         <Link to={isAuthenticated ? "/profile" : "/login"} className="flex flex-col items-center gap-1 w-16 text-gray-400">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
            <span className="text-[10px] font-medium">Account</span>
         </Link>
      </div>


      {/* =======================
          MOBILE SIDE DRAWER
      ======================== */}
      <div 
        className={`fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm transition-opacity duration-300 md:hidden ${isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}
        onClick={() => setIsMobileMenuOpen(false)}
      ></div>

      <div 
        className={`fixed inset-y-0 left-0 z-[61] w-[85%] max-w-sm bg-white shadow-2xl transform transition-transform duration-300 ease-out flex flex-col md:hidden ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        
        {/* Drawer Header */}
        <div className="p-6 bg-gray-50 border-b border-gray-100">
           <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold tracking-tight">Menu</h2>
              <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 bg-white rounded-full text-gray-500 hover:text-black shadow-sm">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
           </div>
           
           {isAuthenticated ? (
             <div className="flex items-center gap-3">
               <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center text-sm font-bold shadow-md">
                 {user?.name?.charAt(0).toUpperCase()}
               </div>
               <div className="flex-1 min-w-0">
                 <p className="font-bold text-gray-900 truncate">Hi, {user?.name}</p>
                 <button onClick={() => { logout(); setIsMobileMenuOpen(false); }} className="text-xs text-red-600 font-semibold uppercase mt-0.5">Sign Out</button>
               </div>
             </div>
           ) : (
             <div className="flex gap-3">
               <Link to="/login" onClick={() => setIsMobileMenuOpen(false)} className="flex-1 py-2.5 text-center text-sm font-bold bg-black text-white rounded-lg shadow-md">Login</Link>
               <Link to="/signup" onClick={() => setIsMobileMenuOpen(false)} className="flex-1 py-2.5 text-center text-sm font-bold bg-white border border-gray-200 text-gray-900 rounded-lg">Register</Link>
             </div>
           )}
        </div>

        {/* Drawer Links */}
        <div className="flex-1 overflow-y-auto pb-8">
          
          <div className="py-2">
             <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="block px-6 py-3.5 text-base font-semibold text-gray-800 hover:bg-gray-50 border-l-4 border-transparent hover:border-black transition-all">Home</Link>
             <Link to="/new-arrival" onClick={() => setIsMobileMenuOpen(false)} className="block px-6 py-3.5 text-base font-semibold text-gray-800 hover:bg-gray-50 border-l-4 border-transparent hover:border-black transition-all">New Arrivals</Link>
             <Link to="/sale" onClick={() => setIsMobileMenuOpen(false)} className="block px-6 py-3.5 text-base font-bold text-red-600 hover:bg-red-50 border-l-4 border-transparent hover:border-red-600 transition-all">Sale</Link>
          </div>

          <div className="h-px bg-gray-100 mx-6 my-2"></div>

          <div className="py-2">
            <p className="px-6 py-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Categories</p>

            {/* DYNAMIC ACCORDIONS FOR ALL CATEGORIES */}
            {navLinks.map((link) => (
              <div key={link.id}>
                 <button 
                   onClick={() => toggleMobileAccordion(link.id)}
                   className={`w-full flex items-center justify-between px-6 py-3.5 text-base font-medium transition-colors ${expandedMobileCategory === link.id ? 'text-black bg-gray-50' : 'text-gray-700 hover:bg-gray-50'}`}
                 >
                   <span>{link.label}</span>
                   <svg className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${expandedMobileCategory === link.id ? 'rotate-180 text-black' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                 </button>
                 
                 <div className={`overflow-hidden transition-all duration-300 ease-in-out ${expandedMobileCategory === link.id ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                   <div className="bg-gray-50/50 px-6 py-2 space-y-1 pb-4">
                     <Link to={link.path} onClick={() => setIsMobileMenuOpen(false)} className="block py-2 text-sm text-black font-bold">Shop All {link.label}</Link>
                     {link.subItems.map((sub, idx) => (
                       <Link 
                         key={idx} 
                         to={sub.path} 
                         onClick={() => setIsMobileMenuOpen(false)} 
                         className="block py-2 text-sm text-gray-600 border-l-2 border-gray-200 hover:border-black pl-4 ml-1 transition-colors"
                       >
                         {sub.name}
                       </Link>
                     ))}
                   </div>
                 </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;