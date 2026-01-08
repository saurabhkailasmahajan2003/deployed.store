import User from '../models/User.js';
import Order from '../models/Order.js';
import MenTshirt from '../models/product/menTshirt.model.js';
import TShirt from '../models/product/tShirt.js';
import FullSleeveTShirt from '../models/product/fullsleevetshirt.js';
import Polo from '../models/product/polo.js';
import Oversized from '../models/product/oversized.js';
import CargoShirt from '../models/product/cargoshirt.js';
import Sweatshirt from '../models/product/sweatshirt.js';
import Hoodies from '../models/product/hoodies.js';
import ZipperHoodies from '../models/product/zipperhoodies.js';
import Jacket from '../models/product/jacket.js';

const productModelMap = {
  'men-tshirt': MenTshirt,
  'MenTshirt': MenTshirt,
  'Tshirts': MenTshirt,
  'Tshirt': MenTshirt,
  't-shirt': TShirt,
  'T-Shirt': TShirt,
  'full-sleeve-t-shirt': FullSleeveTShirt,
  'Full Sleeve T-Shirt': FullSleeveTShirt,
  'FullSleeveTShirt': FullSleeveTShirt,
  'polo': Polo,
  'Polo': Polo,
  'oversized': Oversized,
  'Oversized': Oversized,
  'cargo-shirt': CargoShirt,
  'Cargo Shirt': CargoShirt,
  'CargoShirt': CargoShirt,
  'sweatshirt': Sweatshirt,
  'Sweatshirt': Sweatshirt,
  'hoodies': Hoodies,
  'Hoodies': Hoodies,
  'zipper-hoodies': ZipperHoodies,
  'Zipper Hoodies': ZipperHoodies,
  'ZipperHoodies': ZipperHoodies,
  'jacket': Jacket,
  'Jacket': Jacket,
};

const resolveProductModel = (category) => {
  if (!category) {
    throw new Error('Category is required');
  }
  // Check for exact match first (for WATCH/WATCHES)
  const exactMatch = productModelMap[category];
  if (exactMatch) {
    return exactMatch;
  }
  // Then check lowercase
  const key = category.toLowerCase();
  const model = productModelMap[key];
  if (!model) {
    throw new Error(`Unsupported category: ${category}`);
  }
  return model;
};

export const getDashboardSummary = async (req, res) => {
  try {
    // Count all documents in each collection (includes duplicates, multiple entries, etc.)
    // countDocuments() counts every document regardless of duplicates
    const [
      totalUsers,
      totalOrders,
      pendingOrders,
      totalRevenue,
      menTshirtCount,
      tShirtCount,
      fullSleeveTShirtCount,
      poloCount,
      oversizedCount,
      cargoShirtCount,
      sweatshirtCount,
      hoodiesCount,
      zipperHoodiesCount,
      jacketCount,
    ] = await Promise.all([
      User.countDocuments(), // Count all user documents
      Order.countDocuments(), // Count all order documents
      Order.countDocuments({ status: 'pending' }),
      Order.aggregate([{ $group: { _id: null, total: { $sum: '$totalAmount' } } }]),
      MenTshirt.countDocuments().catch(() => 0), // Count ALL men t-shirt products
      TShirt.countDocuments().catch(() => 0), // Count ALL t-shirt products
      FullSleeveTShirt.countDocuments().catch(() => 0), // Count ALL full sleeve t-shirt products
      Polo.countDocuments().catch(() => 0), // Count ALL polo products
      Oversized.countDocuments().catch(() => 0), // Count ALL oversized products
      CargoShirt.countDocuments().catch(() => 0), // Count ALL cargo shirt products
      Sweatshirt.countDocuments().catch(() => 0), // Count ALL sweatshirt products
      Hoodies.countDocuments().catch(() => 0), // Count ALL hoodies products
      ZipperHoodies.countDocuments().catch(() => 0), // Count ALL zipper hoodies products
      Jacket.countDocuments().catch(() => 0), // Count ALL jacket products
    ]);

    // Calculate total products from all collections
    const totalProducts = menTshirtCount + tShirtCount + fullSleeveTShirtCount + poloCount + 
                         oversizedCount + cargoShirtCount + sweatshirtCount + hoodiesCount + 
                         zipperHoodiesCount + jacketCount;

    // Calculate inventory totals
    const inventory = {
      'T-Shirts': menTshirtCount + tShirtCount,
      'Full Sleeve T-Shirts': fullSleeveTShirtCount,
      'Polo': poloCount,
      'Oversized': oversizedCount,
      'Cargo Shirt': cargoShirtCount,
      'Sweatshirt': sweatshirtCount,
      'Hoodies': hoodiesCount,
      'Zipper Hoodies': zipperHoodiesCount,
      'Jacket': jacketCount,
    };

    // Category-wise product counts
    const categoryCounts = {
      'T-Shirts': menTshirtCount + tShirtCount,
      'Full Sleeve T-Shirts': fullSleeveTShirtCount,
      'Polo': poloCount,
      'Oversized': oversizedCount,
      'Cargo Shirt': cargoShirtCount,
      'Sweatshirt': sweatshirtCount,
      'Hoodies': hoodiesCount,
      'Zipper Hoodies': zipperHoodiesCount,
      'Jacket': jacketCount,
    };

    res.status(200).json({
      success: true,
      data: {
        totalUsers,
        totalOrders,
        pendingOrders,
        totalRevenue: totalRevenue[0]?.total || 0,
        totalProducts, // Total count of all products available on website
        inventory,
        categoryCounts, // Individual category counts
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching dashboard summary',
      error: error.message,
    });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('user', 'name email')
      .sort({ orderDate: -1 });

    res.status(200).json({
      success: true,
      data: { orders },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching orders',
      error: error.message,
    });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const validStatuses = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status value',
      });
    }

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found',
      });
    }

    order.status = status;
    order.deliveredDate = status === 'delivered' ? new Date() : order.deliveredDate;
    await order.save();

    res.status(200).json({
      success: true,
      message: 'Order status updated',
      data: { order },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating order status',
      error: error.message,
    });
  }
};

export const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Order deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting order',
      error: error.message,
    });
  }
};

// Helper function to normalize products for admin panel
const normalizeProductForAdmin = (product) => {
  const normalized = product.toObject ? product.toObject() : product;
  
  // Convert images object to array format (using new image field names)
  let imagesArray = [];
  if (normalized.images && typeof normalized.images === 'object' && !Array.isArray(normalized.images)) {
    // Use the new image field names
    const imageOrder = [
      'T-Shirt',
      'Full Sleeve T-Shirt',
      'Polo',
      'Oversized',
      'Cargo Shirt',
      'Sweatshirt',
      'Hoodies',
      'Zipper Hoodies',
      'Jacket'
    ];
    imagesArray = imageOrder
      .map(key => normalized.images[key])
      .filter(img => img && typeof img === 'string' && img.trim() !== '');
  } else if (Array.isArray(normalized.images)) {
    imagesArray = normalized.images.filter(img => img && typeof img === 'string' && img.trim() !== '');
  }

  // Calculate prices
  const mrp = normalized.mrp || 0;
  const discountPercent = normalized.discountPercent || 0;
  const finalPrice = normalized.finalPrice || (discountPercent > 0 ? mrp - (mrp * discountPercent / 100) : mrp);

  // Extract brand from product_info
  const brand = normalized.product_info?.brand || normalized.brand || '';

  return {
    ...normalized,
    name: normalized.title || normalized.name,
    price: finalPrice,
    finalPrice: finalPrice,
    images: imagesArray,
    brand: brand,
    category: normalized.category || '',
  };
};

export const getAdminProducts = async (req, res) => {
  try {
    const { category } = req.query;

    if (category) {
      const Model = resolveProductModel(category);
      const products = await Model.find().sort({ updatedAt: -1 }).limit(200);
      
      // Normalize products to ensure images are arrays
      const normalizedProducts = products.map(normalizeProductForAdmin);
      
      return res.status(200).json({
        success: true,
        data: { products: normalizedProducts },
      });
    }

    // Fetch from all collections if no category specified
    const [menTshirts, tShirts, fullSleeveTShirts, polos, oversized, cargoShirts, sweatshirts, hoodies, zipperHoodies, jackets] = await Promise.all([
      MenTshirt.find().limit(50).catch(() => []),
      TShirt.find().limit(50).catch(() => []),
      FullSleeveTShirt.find().limit(50).catch(() => []),
      Polo.find().limit(50).catch(() => []),
      Oversized.find().limit(50).catch(() => []),
      CargoShirt.find().limit(50).catch(() => []),
      Sweatshirt.find().limit(50).catch(() => []),
      Hoodies.find().limit(50).catch(() => []),
      ZipperHoodies.find().limit(50).catch(() => []),
      Jacket.find().limit(50).catch(() => []),
    ]);

    res.status(200).json({
      success: true,
      data: {
        products: [
          ...menTshirts.map((item) => normalizeProductForAdmin(item)),
          ...tShirts.map((item) => normalizeProductForAdmin(item)),
          ...fullSleeveTShirts.map((item) => normalizeProductForAdmin(item)),
          ...polos.map((item) => normalizeProductForAdmin(item)),
          ...oversized.map((item) => normalizeProductForAdmin(item)),
          ...cargoShirts.map((item) => normalizeProductForAdmin(item)),
          ...sweatshirts.map((item) => normalizeProductForAdmin(item)),
          ...hoodies.map((item) => normalizeProductForAdmin(item)),
          ...zipperHoodies.map((item) => normalizeProductForAdmin(item)),
          ...jackets.map((item) => normalizeProductForAdmin(item)),
        ],
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching products',
      error: error.message,
    });
  }
};

export const createProduct = async (req, res) => {
  try {
    let { category, ...productData } = req.body;
    
    const Model = resolveProductModel(category);
    
    // Convert images array to object format with new field names
    if (Array.isArray(productData.images) && productData.images.length > 0) {
      const imageOrder = [
        'T-Shirt',
        'Full Sleeve T-Shirt',
        'Polo',
        'Oversized',
        'Cargo Shirt',
        'Sweatshirt',
        'Hoodies',
        'Zipper Hoodies',
        'Jacket'
      ];
      productData.images = {};
      imageOrder.forEach((key, index) => {
        if (productData.images[index]) {
          productData.images[key] = productData.images[index];
        }
      });
      // Remove the array and use the object
      const imagesArray = productData.images;
      productData.images = {};
      imagesArray.forEach((img, index) => {
        if (img && imageOrder[index]) {
          productData.images[imageOrder[index]] = img;
        }
      });
    }
    
    const product = await Model.create(productData);

    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      data: { product: normalizeProductForAdmin(product) },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating product',
      error: error.message,
    });
  }
};

export const updateProduct = async (req, res) => {
  try {
    let { category, ...productData } = req.body;
    
    const Model = resolveProductModel(category);
    
    // Convert images array to object format with new field names
    if (Array.isArray(productData.images) && productData.images.length > 0) {
      const imageOrder = [
        'T-Shirt',
        'Full Sleeve T-Shirt',
        'Polo',
        'Oversized',
        'Cargo Shirt',
        'Sweatshirt',
        'Hoodies',
        'Zipper Hoodies',
        'Jacket'
      ];
      const imagesArray = productData.images;
      productData.images = {};
      imagesArray.forEach((img, index) => {
        if (img && imageOrder[index]) {
          productData.images[imageOrder[index]] = img;
        }
      });
    }
    
    const product = await Model.findByIdAndUpdate(req.params.id, productData, { new: true });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Product updated successfully',
      data: { product: normalizeProductForAdmin(product) },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating product',
      error: error.message,
    });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find()
      .select('-password')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: { users },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching users',
      error: error.message,
    });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'User deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting user',
      error: error.message,
    });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { category } = req.query;
    
    const Model = resolveProductModel(category);
    const product = await Model.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Product deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting product',
      error: error.message,
    });
  }
};


