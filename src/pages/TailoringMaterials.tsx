import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Phone } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';

const fallbackProducts = [
  {
    id: '1',
    name: 'Sewing Thread (₹300)',
    description: 'Standard sewing thread',
    images: ['https://images.unsplash.com/photo-1556909211-3698a5401086?q=80&w=800&auto=format&fit=crop']
  },
  {
    id: '2',
    name: 'Sewing Thread (₹450)',
    description: 'Premium sewing thread',
    images: ['https://images.unsplash.com/photo-1556909211-3698a5401086?q=80&w=800&auto=format&fit=crop']
  },
  {
    id: '3',
    name: 'Original Spade Poly Thread (₹550)',
    description: 'Original spade poly thread',
    images: ['https://images.unsplash.com/photo-1556909211-3698a5401086?q=80&w=800&auto=format&fit=crop']
  },
  {
    id: '4',
    name: 'Designer Buttons',
    description: 'Exclusive collection of metal, pearl, and fabric-covered buttons',
    images: ['https://images.unsplash.com/photo-1622480915761-417122b101c6?q=80&w=800&auto=format&fit=crop']
  },
  {
    id: '5',
    name: 'Zari & Laces',
    description: 'Intricate borders, zari work, and designer laces for ethnic wear',
    images: ['https://images.unsplash.com/photo-1605810730410-186915f02c4b?q=80&w=800&auto=format&fit=crop']
  },
  {
    id: '6',
    name: 'Tailoring Tools',
    description: 'Professional grade scissors, measuring tapes, and marking tools',
    images: ['https://images.unsplash.com/photo-1626379616459-b2ce1d9decbc?q=80&w=800&auto=format&fit=crop']
  },
  {
    id: '7',
    name: 'Button Machine',
    description: 'Professional button attaching machine',
    price: '₹1200',
    images: ['https://images.unsplash.com/photo-1626379616459-b2ce1d9decbc?q=80&w=800&auto=format&fit=crop']
  }
];

export function TailoringMaterials() {
  const [dbProducts, setDbProducts] = useState<any[]>([]);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .in('category', ['Tailoring Materials', 'Tailoring Material']);
          
        if (error) throw error;
        setDbProducts(data && data.length > 0 ? data : fallbackProducts);
      } catch (error) {
        console.error('Failed to fetch products:', error);
        setDbProducts(fallbackProducts);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="bg-ivory min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://i.postimg.cc/J4Wq12mm/tailoring-material-4.png"
            alt="Tailoring Materials"
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
            Tailoring Materials
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-sm md:text-base uppercase tracking-[0.3em] text-champagne font-light"
          >
            Precision Tools for Master Craftsmanship
          </motion.p>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {dbProducts.map((product, index) => (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              key={product.id}
              className="group flex flex-col bg-cream border border-champagne/30"
            >
              <div className="relative aspect-square overflow-hidden bg-white">
                <img
                  src={product.images?.[0] || 'https://images.unsplash.com/photo-1556909211-3698a5401086?q=80&w=800&auto=format&fit=crop'}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-ink/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="p-8 text-center flex-1 flex flex-col">
                <h3 className="font-serif text-xl text-ink uppercase tracking-wider mb-4">
                  {product.name}
                </h3>
                {product.price && <p className="text-maroon font-medium mb-2">{product.price}</p>}
                <p className="text-ink-light text-sm font-light mb-8 flex-1">
                  {product.description}
                </p>
                {product.name.includes('Thread') || product.name.includes('Button Machine') ? (
                  <button
                    onClick={() => {
                      if (!user) {
                        navigate('/signin');
                      } else {
                        // Add to cart logic here
                        navigate('/cart');
                      }
                    }}
                    className="inline-flex items-center justify-center px-6 py-3 border border-ink text-ink text-xs uppercase tracking-widest font-medium hover:bg-ink hover:text-ivory transition-colors duration-300"
                  >
                    <ShoppingBag className="w-4 h-4 mr-2" />
                    Add to Cart
                  </button>
                ) : (
                  <Link
                    to="/contact"
                    className="inline-flex items-center justify-center px-6 py-3 border border-maroon text-maroon text-xs uppercase tracking-widest font-medium hover:bg-maroon hover:text-ivory transition-colors duration-300"
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    Contact Store
                  </Link>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Wholesale Banner */}
      <section className="py-24 bg-maroon text-ivory text-center px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-serif text-3xl md:text-5xl uppercase tracking-wider mb-6">
            Wholesale Supply
          </h2>
          <p className="text-champagne text-lg font-light leading-relaxed mb-12">
            We supply premium tailoring materials in bulk to boutiques, tailors, and fashion designers across Hyderabad. Contact us for wholesale pricing and catalog.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a
              href="tel:9000089610"
              className="px-8 py-4 bg-ivory text-maroon text-xs uppercase tracking-widest font-medium hover:bg-champagne transition-colors duration-300 flex items-center justify-center"
            >
              <Phone className="w-4 h-4 mr-2" />
              Call 9000089610
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
