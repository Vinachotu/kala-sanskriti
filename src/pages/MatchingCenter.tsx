import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, Filter, ChevronDown, ChevronLeft, X } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

const rawColors = [
  '#F44336', '#E53935', '#D32F2F', '#C62828', '#B71C1C', '#FF5252', '#FF1744', '#D50000', '#F06292', '#EC407A',
  '#E91E63', '#D81B60', '#C2185B', '#AD1457', '#880E4F', '#FF80AB', '#FF4081', '#F50057', '#C51162', '#F48FB1',
  '#CE93D8', '#BA68C8', '#AB47BC', '#9C27B0', '#8E24AA', '#7B1FA2', '#6A1B9A', '#4A148C', '#E1BEE7', '#D1C4E9',
  '#B39DDB', '#9575CD', '#7E57C2', '#673AB7', '#5E35B1', '#512DA8', '#4527A0', '#311B92', '#B388FF', '#7C4DFF',
  '#536DFE', '#3D5AFE', '#304FFE', '#8C9EFF', '#7986CB', '#5C6BC0', '#3F51B5', '#3949AB', '#303F9F', '#283593',
  '#1A237E', '#2196F3', '#1E88E5', '#1976D2', '#1565C0', '#0D47A1', '#64B5F6', '#42A5F5', '#2196F3', '#1E88E5',
  '#039BE5', '#0288D1', '#0277BD', '#01579B', '#81D4FA', '#4FC3F7', '#29B6F6', '#03A9F4', '#039BE5', '#0288D1',
  '#00ACC1', '#0097A7', '#00838F', '#006064', '#80DEEA', '#4DD0E1', '#26C6DA', '#00BCD4', '#00ACC1', '#0097A7',
  '#26A69A', '#009688', '#00897B', '#00796B', '#00695C', '#004D40', '#80CBC4', '#4DB6AC', '#26A69A', '#009688',
  '#66BB6A', '#4CAF50', '#43A047', '#388E3C', '#2E7D32', '#1B5E20', '#A5D6A7', '#81C784', '#66BB6A', '#4CAF50',
  '#9CCC65', '#8BC34A', '#7CB342', '#689F38', '#558B2F', '#33691E', '#DCEDC8', '#C5E1A5', '#AED581', '#9CCC65',
  '#D4E157', '#CDDC39', '#C0CA33', '#AFB42B', '#9E9D24', '#827717', '#F0F4C3', '#E6EE9C', '#DCE775', '#D4E157',
  '#FFF176', '#FFEB3B', '#FDD835', '#FBC02D', '#F9A825', '#F57F17', '#FFF9C4', '#FFF59D', '#FFF176', '#FFEE58',
  '#FFD54F', '#FFC107', '#FFB300', '#FFA000', '#FF8F00', '#FF6F00', '#FFE082', '#FFD54F', '#FFCA28', '#FFC107',
  '#FFB74D', '#FFA726', '#FB8C00', '#F57C00', '#EF6C00', '#E65100', '#FFCC80', '#FFB74D', '#FFA726', '#FB8C00',
  '#FF8A65', '#FF7043', '#F4511E', '#E64A19', '#D84315', '#BF360C', '#FFAB91', '#FF8A65', '#FF7043', '#F4511E',
  '#A1887F', '#8D6E63', '#795548', '#6D4C41', '#5D4037', '#4E342E', '#D7CCC8', '#BCAAA4', '#A1887F', '#8D6E63',
  '#BDBDBD', '#9E9E9E', '#757575', '#616161', '#424242', '#212121', '#EEEEEE', '#E0E0E0', '#BDBDBD', '#9E9E9E',
  '#90A4AE', '#78909C', '#607D8B', '#546E7A', '#455A64', '#263238', '#CFD8DC', '#B0BEC5', '#90A4AE', '#78909C',
  '#F5F5F5', '#FAFAFA', '#ECEFF1', '#F3E5F5', '#E8EAF6', '#E1F5FE', '#E0F7FA', '#E0F2F1', '#E8F5E9', '#F1F8E9',
  '#FFFDE7', '#FFF8E1', '#FBE9E7', '#EFEBE9', '#FAFAFA', '#FCE4EC', '#F3E5F5', '#EDE7F6', '#E8EAF6', '#E3F2FD',
  '#E1F5FE', '#E0F7FA', '#E0F2F1', '#E8F5E9', '#F9FBE7', '#FFFDE7', '#FFF8E1', '#FBE9E7', '#EFEBE9', '#F5F5F5',
  '#FADADD', '#FFD1DC', '#FFE4E1', '#FFEFD5', '#F5DEB3', '#FFEBCD', '#F0E68C', '#E6E6FA', '#D8BFD8', '#DDA0DD',
  '#DA70D6', '#EE82EE', '#FFB6C1', '#FFC0CB', '#FFA07A', '#FA8072', '#E9967A', '#F08080', '#CD5C5C', '#DC143C',
  '#8B0000', '#800000', '#8B4513', '#A0522D', '#D2691E', '#CD853F', '#DEB887', '#F4A460', '#DAA520', '#B8860B',
  '#9ACD32', '#6B8E23', '#556B2F', '#3CB371', '#2E8B57', '#20B2AA', '#5F9EA0', '#4682B4', '#4169E1', '#6A5ACD',
  '#483D8B', '#191970', '#708090', '#2F4F4F', '#000080', '#00008B', '#0000CD', '#0000FF', '#1E90FF', '#00BFFF',
  '#87CEFA', '#87CEEB', '#ADD8E6', '#B0E0E6', '#AFEEEE', '#00FFFF', '#00CED1', '#40E0D0', '#48D1CC', '#7FFFD4',
  '#66CDAA', '#8FBC8F', '#98FB98', '#90EE90', '#00FA9A', '#00FF7F', '#3CB371', '#2E8B57', '#228B22', '#006400'
];

const liningColors = rawColors.map((hex, index) => ({
  id: index + 1,
  name: `Color ${index + 1}`,
  hex: hex
}));

const products = [
  {
    id: 1,
    name: 'Saree Petticoats',
    price: 'Starting from ₹50',
    image: 'https://images.unsplash.com/photo-1584227351656-11f26742918b?q=80&w=800&auto=format&fit=crop',
    unit: 'Piece'
  },
  {
    id: 2,
    name: 'Saree Falls',
    price: 'Starting from ₹126/Doz',
    image: 'https://images.unsplash.com/photo-1610030469611-399436402844?q=80&w=800&auto=format&fit=crop',
    unit: 'Dozens Pack'
  },
  {
    id: 3,
    name: 'Lining Fabric',
    price: 'Sold in 20m Than',
    image: 'https://i.postimg.cc/zGjpN8VV/Untitled.png',
    unit: '20m Than'
  },
  {
    id: 4,
    name: 'Fancy Blouses',
    price: '₹42 - ₹600',
    image: 'https://images.unsplash.com/photo-1610030469611-399436402844?q=80&w=800&auto=format&fit=crop',
    unit: 'Piece'
  }
];

const previewColors = [
  { ...liningColors[2], name: 'Red' },
  { ...liningColors[241], name: 'Maroon' },
  { ...liningColors[258], name: 'Royal Blue' },
  { ...liningColors[91], name: 'Green' },
  { ...liningColors[175], name: 'Black' },
  { ...liningColors[201], name: 'Cream' },
  { ...liningColors[233], name: 'Pink' },
  { ...liningColors[121], name: 'Yellow' }
];

const fallbackProducts = [
  {
    id: 'p1',
    name: 'Casement Petticoat',
    category: 'Saree Petticoats',
    price: '₹50',
    description: 'Casement fabric petticoat',
    images: ['https://images.unsplash.com/photo-1584227351656-11f26742918b?q=80&w=800&auto=format&fit=crop']
  },
  {
    id: 'p2',
    name: 'Regular Petticoat',
    category: 'Saree Petticoats',
    price: '₹80',
    description: 'Regular cotton petticoat',
    images: ['https://images.unsplash.com/photo-1584227351656-11f26742918b?q=80&w=800&auto=format&fit=crop']
  },
  {
    id: 'p3',
    name: 'Heavy Petticoat',
    category: 'Saree Petticoats',
    price: '₹90',
    description: 'Heavy cotton petticoat',
    images: ['https://images.unsplash.com/photo-1584227351656-11f26742918b?q=80&w=800&auto=format&fit=crop']
  },
  {
    id: 'p4',
    name: 'XXL Petticoat',
    category: 'Saree Petticoats',
    price: '₹120',
    description: 'Extra extra large petticoat',
    images: ['https://images.unsplash.com/photo-1584227351656-11f26742918b?q=80&w=800&auto=format&fit=crop']
  },
  {
    id: 'p5',
    name: 'Chilli Petticoat',
    category: 'Saree Petticoats',
    price: '₹150',
    description: 'Premium chilli petticoat',
    images: ['https://images.unsplash.com/photo-1584227351656-11f26742918b?q=80&w=800&auto=format&fit=crop']
  },
  {
    id: 'f1',
    name: 'Polyester Fall',
    category: 'Saree Falls',
    price: '₹126/Doz',
    description: '₹10.5 per piece',
    images: ['https://images.unsplash.com/photo-1610030469611-399436402844?q=80&w=800&auto=format&fit=crop']
  },
  {
    id: 'f2',
    name: 'Mixed Cotton Fall',
    category: 'Saree Falls',
    price: '₹132/Doz',
    description: '₹11 per piece',
    images: ['https://images.unsplash.com/photo-1610030469611-399436402844?q=80&w=800&auto=format&fit=crop']
  },
  {
    id: 'f3',
    name: 'Cotton Fall',
    category: 'Saree Falls',
    price: '₹180/Doz',
    description: '₹15 per piece',
    images: ['https://images.unsplash.com/photo-1610030469611-399436402844?q=80&w=800&auto=format&fit=crop']
  },
  {
    id: 'l1',
    name: 'Polyester Lining',
    category: 'Lining Fabric',
    price: 'Contact for price',
    description: 'Polyester lining fabric',
    images: ['https://i.postimg.cc/zGjpN8VV/Untitled.png']
  },
  {
    id: 'l2',
    name: 'Mixed Lining',
    category: 'Lining Fabric',
    price: 'Contact for price',
    description: 'Mixed lining fabric',
    images: ['https://i.postimg.cc/zGjpN8VV/Untitled.png']
  },
  {
    id: 'l3',
    name: 'Cotton Lining',
    category: 'Lining Fabric',
    price: 'Contact for price',
    description: 'Cotton lining fabric',
    images: ['https://i.postimg.cc/zGjpN8VV/Untitled.png']
  },
  {
    id: 'l4',
    name: 'Satin Lining',
    category: 'Lining Fabric',
    price: 'Contact for price',
    description: 'Satin lining fabric',
    images: ['https://i.postimg.cc/zGjpN8VV/Untitled.png']
  },
  {
    id: 'l5',
    name: 'Crape Lining',
    category: 'Lining Fabric',
    price: 'Offline Only',
    description: 'Crape lining fabric',
    images: ['https://i.postimg.cc/zGjpN8VV/Untitled.png']
  },
  {
    id: 'l6',
    name: 'Pattu Lining',
    category: 'Lining Fabric',
    price: 'Offline Only',
    description: 'Pattu lining fabric',
    images: ['https://i.postimg.cc/zGjpN8VV/Untitled.png']
  },
  {
    id: 'l7',
    name: 'Tissue Lining',
    category: 'Lining Fabric',
    price: 'Offline Only',
    description: 'Tissue lining fabric',
    images: ['https://i.postimg.cc/zGjpN8VV/Untitled.png']
  },
  {
    id: 'b1',
    name: 'Fancy Blouses Collection',
    category: 'Fancy Blouses',
    price: '₹42 - ₹600',
    description: 'Available offline due to various design changes',
    images: ['https://images.unsplash.com/photo-1610030469611-399436402844?q=80&w=800&auto=format&fit=crop']
  }
];

export function MatchingCenter() {
  const [selectedMainProduct, setSelectedMainProduct] = useState<string | null>(null);
  const [activeSubCategory, setActiveSubCategory] = useState<string | null>(null);
  const [showAllColorsModal, setShowAllColorsModal] = useState(false);
  const [selectedItemColor, setSelectedItemColor] = useState<typeof liningColors[0] | null>(null);
  const [dbProducts, setDbProducts] = useState<any[]>([]);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*');
          
        if (error) throw error;
        setDbProducts(data && data.length > 0 ? data : fallbackProducts);
      } catch (error) {
        console.error('Failed to fetch products:', error);
        setDbProducts(fallbackProducts);
      }
    };
    fetchProducts();
  }, []);

  const getCategoryData = (categoryName: string) => {
    // Handle plural/singular mismatch between frontend and database
    const searchCategory = categoryName === 'Saree Petticoats' ? 'Saree Petticoat' : categoryName;
    
    const items = dbProducts.filter(p => p.category === categoryName || p.category === searchCategory);
    if (items.length === 0) {
      return fallbackProducts.filter(p => p.category === categoryName || p.category === searchCategory);
    }
    return items;
  };

  return (
    <div className="bg-ivory min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://i.postimg.cc/26yrPyq7/1484-MATC.png"
            alt="Matching Center"
            className="w-full h-full object-cover object-center"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-ink/50 mix-blend-multiply" />
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="font-serif text-5xl md:text-7xl lg:text-8xl text-ivory uppercase tracking-widest mb-6"
          >
            Matching Center
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-sm md:text-base uppercase tracking-[0.3em] text-champagne font-light"
          >
            Hyderabad's Largest Matching Center
          </motion.p>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatePresence mode="wait">
          {!selectedMainProduct ? (
            <motion.div
              key="main-products"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12"
            >
              {products.map(product => (
                <div 
                  key={product.id} 
                  className="group cursor-pointer"
                  onClick={() => {
                    setSelectedMainProduct(product.name);
                  }}
                >
                  <div className="relative aspect-[3/4] overflow-hidden bg-cream mb-6">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-ink/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex justify-center">
                      <button className="bg-ivory text-ink px-6 py-3 text-xs uppercase tracking-widest font-medium hover:bg-champagne transition-colors flex items-center">
                        View Categories
                      </button>
                    </div>
                  </div>
                  <div className="text-center">
                    <h3 className="font-serif text-xl text-ink uppercase tracking-wider mb-2">
                      {product.name}
                    </h3>
                    <p className="text-ink-light text-sm mb-2">{product.price}</p>
                    <p className="text-xs text-maroon uppercase tracking-widest font-medium">
                      {product.unit}
                    </p>
                  </div>
                </div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="subcategories-view"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <button 
                onClick={() => {
                  setSelectedMainProduct(null);
                  setActiveSubCategory(null);
                }}
                className="mb-12 flex items-center text-sm uppercase tracking-widest text-ink-light hover:text-maroon transition-colors"
              >
                <ChevronLeft className="w-4 h-4 mr-2" />
                Back to Matching Center
              </button>

              <div className="text-center mb-16">
                <h2 className="font-serif text-3xl md:text-5xl text-ink uppercase tracking-wider mb-4">
                  {selectedMainProduct}
                </h2>
                <p className="text-ink-light text-sm uppercase tracking-widest">
                  Select a category to view available colours
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {selectedMainProduct && getCategoryData(selectedMainProduct).map(item => (
                  <div key={item.id} className="bg-white border border-champagne/30 shadow-sm flex flex-col">
                    <div className="relative aspect-[4/3] overflow-hidden bg-cream">
                      <img
                        src={item.images?.[0] || 'https://images.unsplash.com/photo-1584227351656-11f26742918b?q=80&w=800&auto=format&fit=crop'}
                        alt={item.name}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="p-6 flex-1 flex flex-col">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-serif text-xl text-ink uppercase tracking-wider">
                          {item.name}
                        </h3>
                        <span className="text-maroon font-medium">{item.price}</span>
                      </div>
                      <p className="text-ink-light text-sm mb-6 flex-1">
                        {item.description}
                      </p>
                      
                      {selectedMainProduct === 'Fancy Blouses' || item.name.includes('Crape') || item.name.includes('Pattu') || item.name.includes('Tissue') ? (
                        <button 
                          onClick={() => navigate('/contact')}
                          className="w-full py-3 bg-maroon text-ivory text-xs uppercase tracking-widest hover:bg-ink transition-colors"
                        >
                          Contact Store
                        </button>
                      ) : activeSubCategory === item.id ? (
                        <div className="pt-4 border-t border-champagne/30">
                          <p className="text-xs uppercase tracking-widest text-ink-light mb-4 text-center">Select Colour</p>
                          <div className="flex flex-wrap justify-center gap-3 mb-6">
                            {previewColors.map(color => (
                              <button
                                key={color.id}
                                onClick={() => setSelectedItemColor(color)}
                                className={`w-8 h-8 rounded-full shadow-sm border-2 transition-transform hover:scale-110 ${
                                  selectedItemColor?.id === color.id ? 'border-maroon scale-110' : 'border-transparent'
                                }`}
                                style={{ backgroundColor: color.hex }}
                                title={color.name}
                              />
                            ))}
                          </div>
                          <button 
                            onClick={() => setShowAllColorsModal(true)}
                            className="w-full py-3 border border-ink/20 text-ink text-xs uppercase tracking-widest hover:border-maroon hover:text-maroon transition-colors"
                          >
                            +292 More Colours
                          </button>
                          
                          {selectedItemColor && (
                            <div className="mt-6 p-4 bg-cream flex flex-col gap-4">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                  <div 
                                    className="w-6 h-6 rounded-full border border-black/10"
                                    style={{ backgroundColor: selectedItemColor.hex }}
                                  />
                                  <span className="text-sm font-medium text-ink">{selectedItemColor.name}</span>
                                </div>
                                <button 
                                  onClick={() => {
                                    if (!user) {
                                      navigate('/signin');
                                    } else {
                                      navigate('/cart');
                                    }
                                  }}
                                  className="bg-maroon text-ivory px-4 py-2 text-xs uppercase tracking-widest hover:bg-ink transition-colors flex items-center"
                                >
                                  <ShoppingBag className="w-4 h-4 mr-2" />
                                  Add
                                </button>
                              </div>
                              {selectedMainProduct === 'Lining Fabric' && (
                                <div className="text-xs text-ink-light uppercase tracking-widest text-center border-t border-champagne/30 pt-3">
                                  Sold in 20m Than (Min 100m Booking)
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      ) : (
                        <button 
                          onClick={() => setActiveSubCategory(item.id)}
                          className="w-full py-3 bg-ink text-ivory text-xs uppercase tracking-widest hover:bg-maroon transition-colors"
                        >
                          View Colours
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* All Colors Modal */}
      <AnimatePresence>
        {showAllColorsModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/80 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-ivory w-full max-w-5xl max-h-[90vh] flex flex-col shadow-2xl rounded-sm overflow-hidden"
            >
              <div className="p-6 border-b border-champagne/30 flex justify-between items-center bg-white">
                <div>
                  <h3 className="font-serif text-2xl text-ink uppercase tracking-wider">Complete Colour Palette</h3>
                  <p className="text-ink-light text-sm mt-1">Select from 300 premium shades</p>
                </div>
                <button 
                  onClick={() => setShowAllColorsModal(false)}
                  className="p-2 text-ink-light hover:text-maroon transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="p-6 overflow-y-auto flex-1 bg-cream/30">
                <div className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-12 lg:grid-cols-15 gap-3">
                  {liningColors.map((color) => (
                    <div
                      key={color.id}
                      onClick={() => {
                        setSelectedItemColor(color);
                        setShowAllColorsModal(false);
                      }}
                      className="group flex flex-col items-center gap-1 cursor-pointer"
                    >
                      <div 
                        className={`w-10 h-10 rounded-sm shadow-sm border transition-all duration-200 group-hover:scale-110 group-hover:shadow-md ${
                          selectedItemColor?.id === color.id ? 'border-maroon border-2 scale-110' : 'border-black/10'
                        }`}
                        style={{ backgroundColor: color.hex }}
                      />
                      <span className="text-[10px] text-ink-light uppercase tracking-wider group-hover:text-maroon transition-colors">
                        #{color.id.toString().padStart(3, '0')}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              
              {selectedItemColor && (
                <div className="p-6 border-t border-champagne/30 bg-white flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="text-sm uppercase tracking-widest text-ink-light">Selected:</div>
                    <div 
                      className="w-8 h-8 rounded-sm border border-black/10 shadow-sm"
                      style={{ backgroundColor: selectedItemColor.hex }}
                    />
                    <div className="font-medium text-ink">{selectedItemColor.name}</div>
                  </div>
                  <button 
                    onClick={() => setShowAllColorsModal(false)}
                    className="bg-maroon text-ivory px-8 py-3 text-xs uppercase tracking-widest hover:bg-ink transition-colors"
                  >
                    Confirm Selection
                  </button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
