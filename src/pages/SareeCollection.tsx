import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { MapPin, Phone } from 'lucide-react';
import { supabase } from '../lib/supabase';

const fallbackProducts = [
  {
    id: '1',
    name: 'Cotton Sarees',
    description: 'Comfortable everyday wear with an elegant sheen',
    images: ['https://images.unsplash.com/photo-1584227351656-11f26742918b?q=80&w=1000&auto=format&fit=crop']
  },
  {
    id: '2',
    name: 'Silk Sarees',
    description: 'Authentic handwoven silk sarees',
    images: ['https://images.unsplash.com/photo-1610030469611-399436402844?q=80&w=1000&auto=format&fit=crop']
  },
  {
    id: '3',
    name: 'Fancy Sarees',
    description: 'Contemporary designs with intricate embroidery',
    images: ['https://images.unsplash.com/photo-1583391733958-d15f11368f28?q=80&w=1000&auto=format&fit=crop']
  },
  {
    id: '4',
    name: 'Premium Sarees',
    description: 'Exclusive premium collection for special occasions',
    images: ['https://images.unsplash.com/photo-1583391733958-d15f11368f28?q=80&w=1000&auto=format&fit=crop']
  },
  {
    id: '5',
    name: 'Banarasi Sarees',
    description: 'Rich traditional weaves perfect for bridal wear',
    images: ['https://images.unsplash.com/photo-1610030469611-399436402844?q=80&w=1000&auto=format&fit=crop']
  },
  {
    id: '6',
    name: 'Pattu Sarees',
    description: 'Traditional Pattu sarees with pure zari work',
    images: ['https://images.unsplash.com/photo-1584227351656-11f26742918b?q=80&w=1000&auto=format&fit=crop']
  }
];

export function SareeCollection() {
  const [dbProducts, setDbProducts] = useState<any[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .in('category', ['Sarees', 'Saree']);
          
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
            src="https://i.postimg.cc/kMfq7xNp/SAREE-FALLS-2.png"
            alt="Saree Collection"
            className="w-full h-full object-cover object-center"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-ink/50 mix-blend-multiply" />
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="font-serif text-5xl md:text-7xl text-ivory uppercase tracking-widest leading-tight mb-6"
          >
            Saree Collection
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
            className="text-sm md:text-lg text-champagne uppercase tracking-[0.3em] font-light"
          >
            Elegance Woven in Tradition
          </motion.p>
        </div>
      </section>

      {/* Notice Banner */}
      <div className="bg-maroon text-ivory py-4 text-center">
        <p className="text-xs md:text-sm uppercase tracking-widest font-medium">
          Available Only Offline & Wholesale
        </p>
      </div>

      {/* Categories Grid */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {dbProducts.map((product, index) => (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              key={product.id}
              className="group flex flex-col"
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-cream mb-8">
                <img
                  src={product.images?.[0] || 'https://images.unsplash.com/photo-1610030469611-399436402844?q=80&w=1000&auto=format&fit=crop'}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-ink/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              <div className="text-center">
                <h3 className="font-serif text-3xl text-ink uppercase tracking-wider mb-4">
                  {product.name}
                </h3>
                <p className="text-ink-light text-sm uppercase tracking-widest mb-8 font-light">
                  {product.description}
                </p>
                <Link
                  to="/contact"
                  className="inline-flex items-center px-8 py-4 border border-maroon text-maroon text-xs uppercase tracking-widest font-medium hover:bg-maroon hover:text-ivory transition-colors duration-300"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Contact Store
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Visit Store CTA */}
      <section className="py-24 bg-cream border-t border-champagne/30 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <MapPin className="w-12 h-12 text-maroon mx-auto mb-8" />
          <h2 className="font-serif text-4xl text-ink uppercase tracking-wider mb-6">
            Experience the Collection
          </h2>
          <p className="text-ink-light text-lg font-light leading-relaxed mb-12">
            Visit our stores in Rikabgunj, Hyderabad to explore our complete range of premium sarees. Our expert staff will guide you through our extensive collection.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              to="/contact"
              className="px-8 py-4 bg-maroon text-ivory text-xs uppercase tracking-widest font-medium hover:bg-ink transition-colors duration-300"
            >
              Get Directions
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
