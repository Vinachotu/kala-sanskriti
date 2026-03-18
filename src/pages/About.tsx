import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export function About() {
  return (
    <div className="bg-ivory min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1584227351656-11f26742918b?q=80&w=2000&auto=format&fit=crop"
            alt="Kala Sanskriti Heritage"
            className="w-full h-full object-cover object-center"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-ink/60 mix-blend-multiply" />
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="font-serif text-5xl md:text-7xl text-ivory uppercase tracking-widest leading-tight mb-6"
          >
            Our Heritage
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
            className="text-sm md:text-lg text-champagne uppercase tracking-[0.3em] font-light"
          >
            A Legacy of Textile Excellence
          </motion.p>
        </div>
      </section>

      {/* Brand Narrative */}
      <section className="py-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-serif text-3xl md:text-5xl text-maroon uppercase tracking-wider mb-12">
            The Kala Sanskriti Story
          </h2>
          
          <div className="space-y-8 text-ink-light text-lg md:text-xl leading-relaxed font-light text-justify md:text-center">
            <p>
              Kala Textiles and Kala Sanskriti are well known textile destinations in Hyderabad.
            </p>
            <p>
              Located near the historic Hyderabad High Court, the stores serve customers with an extensive collection of sarees, matching materials, and tailoring supplies.
            </p>
            <p>
              Our stores are known for offering one of the largest colour collections in the city along with quality fabrics and wholesale pricing.
            </p>
            <p>
              Customers and retailers visit our stores to explore a wide range of textile products, experiencing the true essence of Indian craftsmanship and heritage.
            </p>
          </div>
        </motion.div>
      </section>

      {/* Image Grid */}
      <section className="py-24 bg-cream border-t border-champagne/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              'https://images.unsplash.com/photo-1610030469611-399436402844?q=80&w=800&auto=format&fit=crop',
              'https://images.unsplash.com/photo-1556909211-3698a5401086?q=80&w=800&auto=format&fit=crop',
              'https://images.unsplash.com/photo-1583391733958-d1501eq24197?q=80&w=800&auto=format&fit=crop'
            ].map((img, index) => (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                key={index}
                className="aspect-[4/5] overflow-hidden bg-white"
              >
                <img
                  src={img}
                  alt={`Store view ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105"
                  referrerPolicy="no-referrer"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-maroon text-ivory text-center px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-serif text-3xl md:text-5xl uppercase tracking-wider mb-8">
            Visit Our Stores
          </h2>
          <p className="text-champagne text-lg font-light leading-relaxed mb-12">
            Experience the luxury of our textiles in person. We invite you to explore our vast collections at our Rikabgunj showrooms.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center px-8 py-4 bg-ivory text-maroon text-xs uppercase tracking-widest font-medium hover:bg-champagne transition-colors duration-300"
          >
            Get Directions
            <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </div>
      </section>
    </div>
  );
}
