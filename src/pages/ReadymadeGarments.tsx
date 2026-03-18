import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Store } from 'lucide-react';
import { supabase } from '../lib/supabase';

const fallbackProducts = [
  {
    id: '1',
    name: 'Designer Kurtis',
    description: 'Contemporary and traditional kurtis for everyday elegance',
    images: ['https://images.unsplash.com/photo-1583391733958-d15f11368f28?q=80&w=1000&auto=format&fit=crop']
  },
  {
    id: '2',
    name: 'Ethnic Sets',
    description: 'Complete salwar kameez and palazzo sets for special occasions',
    images: ['https://images.unsplash.com/photo-1610030469611-399436402844?q=80&w=1000&auto=format&fit=crop']
  },
  {
    id: '3',
    name: 'Party Wear',
    description: 'Exclusive collection of gowns and indo-western dresses',
    images: ['https://images.unsplash.com/photo-1584227351656-11f26742918b?q=80&w=1000&auto=format&fit=crop']
  },
  {
    id: '4',
    name: 'All Types Nighties',
    description: 'Comfortable and stylish nightwear collection',
    images: ['https://images.unsplash.com/photo-1583391733958-d15f11368f28?q=80&w=1000&auto=format&fit=crop']
  }
];

export function ReadymadeGarments() {
  const [dbProducts, setDbProducts] = useState<any[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .in('category', ['Readymade Garments', 'Readymade Garment']);
          
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
            src="https://i.postimg.cc/7hnWN8DB/READYMADE-SECTIONS.png"
            alt="Readymade Garments"
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
            Readymade Garments
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-sm md:text-base uppercase tracking-[0.3em] text-champagne font-light"
          >
            Ready to Wear Elegance
          </motion.p>
        </div>
      </section>

      {/* Notice Banner */}
      <div className="bg-ink text-champagne py-4 text-center">
        <p className="text-xs md:text-sm uppercase tracking-widest font-medium">
          Offline & Wholesale Only
        </p>
      </div>

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
              className="group flex flex-col"
            >
              <div className="relative aspect-[3/4] overflow-hidden bg-cream mb-6">
                <img
                  src={product.images?.[0] || 'https://images.unsplash.com/photo-1556909211-3698a5401086?q=80&w=800&auto=format&fit=crop'}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-ink/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="text-center">
                <h3 className="font-serif text-2xl text-ink uppercase tracking-wider mb-2">
                  {product.name}
                </h3>
                <p className="text-ink-light text-sm font-light mb-6">
                  {product.description}
                </p>
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center px-6 py-3 border border-maroon text-maroon text-xs uppercase tracking-widest font-medium hover:bg-maroon hover:text-ivory transition-colors duration-300"
                >
                  <Store className="w-4 h-4 mr-2" />
                  Visit Store
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
