import { createContext, useContext, useState, useEffect } from 'react';
import { wishlistAPI } from '../utils/api';
import { useAuth } from './AuthContext';

const WishlistContext = createContext();

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within WishlistProvider');
  }
  return context;
};

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      loadWishlist();
    } else {
      setWishlist([]);
    }
  }, [isAuthenticated]);

  // ---------------------------
  // LOAD WISHLIST
  // ---------------------------
  const loadWishlist = async () => {
    try {
      setIsLoading(true);
      const response = await wishlistAPI.getWishlist();

      const products =
        response?.data?.wishlist?.products ||
        response?.data?.wishlist ||
        response?.data?.products ||
        [];

      setWishlist([...products]); // always a new array
    } catch (error) {
      console.error("Error loading wishlist:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // ---------------------------
  // ADD TO WISHLIST
  // ---------------------------
  const addToWishlist = async (product) => {
    if (!isAuthenticated) throw new Error("Please login to add items.");

    try {
      const productId = product._id;
      const response = await wishlistAPI.addToWishlist(productId);

      const products =
        response?.data?.wishlist?.products ||
        response?.data?.wishlist ||
        response?.data?.products ||
        [];

      setWishlist([...products]);
    } catch (error) {
      console.error("Add wishlist error:", error);
      throw error;
    }
  };

  // ---------------------------
  // REMOVE FROM WISHLIST
  // ---------------------------
  const removeFromWishlist = async (productId) => {
    if (!isAuthenticated) return;

    try {
      const response = await wishlistAPI.removeFromWishlist(productId);

      const products =
        response?.data?.wishlist?.products ||
        response?.data?.wishlist ||
        response?.data?.products ||
        [];

      setWishlist([...products]);
    } catch (error) {
      console.error("Remove wishlist error:", error);
    }
  };

  // ---------------------------
  // CHECK IF IN WISHLIST
  // ---------------------------
  const isInWishlist = (productId) => {
    return wishlist.some((item) => item._id === productId);
  };

  const getWishlistCount = () => wishlist.length;

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        getWishlistCount,
        isLoading,
        loadWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};
