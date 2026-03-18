import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useSiteSettings } from '../contexts/SiteSettingsContext';

export function Home() {
  const { settings } = useSiteSettings();

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={settings.hero_banner || "https://i.postimg.cc/dtvGhdyn/complete-banner.png"}
            alt="Luxury Indian Textiles"
            className="w-full h-full object-cover object-center"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-ink/40 mix-blend-multiply" />
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto flex flex-col items-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="font-serif text-5xl md:text-7xl lg:text-8xl text-ivory uppercase tracking-widest leading-tight mb-6"
          >
            {settings.home_main_heading || settings.store_name || "Kala Sanskriti"}
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
            className="text-sm md:text-lg text-ivory/90 uppercase tracking-[0.3em] font-light mb-12"
          >
            {settings.home_sub_heading || "Premium Textile Heritage of Hyderabad"}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
            className="flex flex-col sm:flex-row gap-6"
          >
            <Link
              to="/matching-center"
              className="px-8 py-4 bg-ivory text-maroon text-xs uppercase tracking-widest font-medium hover:bg-champagne transition-colors duration-300"
            >
              Explore Collection
            </Link>
            <Link
              to="/contact"
              className="px-8 py-4 bg-transparent border border-ivory text-ivory text-xs uppercase tracking-widest font-medium hover:bg-ivory/10 transition-colors duration-300"
            >
              Visit Our Store
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Featured Collections */}
      <section className="py-24 bg-ivory">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl md:text-5xl text-maroon uppercase tracking-wider mb-4">
              Curated Collections
            </h2>
            <div className="w-16 h-[1px] bg-maroon mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {[
              {
                title: 'Matching Center',
                subtitle: "Hyderabad's Largest Collection",
                image: settings.category_matching_center || 'https://i.postimg.cc/9FqYtBfF/MC.png',
                link: '/matching-center'
              },
              {
                title: 'Sarees',
                subtitle: 'Silk, Cotton & Wedding',
                image: settings.category_sarees || 'https://i.postimg.cc/mDVKPnNP/sarees_2.png',
                link: '/sarees'
              },
              
              {
                title: 'Tailoring Materials',
                subtitle: 'Premium Supplies',
                image: settings.category_tailoring || 'https://i.postimg.cc/J4Wq12mm/tailoring-material-4.png',
                link: '/tailoring'
              },
              {
                title: 'Readymade Garments',
                subtitle: 'Dresses & Suits',
                image: settings.category_readymade || 'https://i.postimg.cc/7hnWN8DB/READYMADE-SECTIONS.png',
                link: '/readymade'
              }
            ].map((collection, index) => (
              <Link
                key={collection.title}
                to={collection.link}
                className="group relative h-[60vh] overflow-hidden flex items-end"
              >
                <div className="absolute inset-0">
                  <img
                    src={collection.image}
                    alt={collection.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-transparent" />
                </div>
                <div className="relative z-10 p-8 w-full">
                  <p className="text-champagne text-xs uppercase tracking-widest mb-2 font-medium">
                    {collection.subtitle}
                  </p>
                  <h3 className="font-serif text-3xl text-ivory uppercase tracking-wider mb-4">
                    {collection.title}
                  </h3>
                  <div className="flex items-center text-ivory text-xs uppercase tracking-widest font-medium group-hover:text-champagne transition-colors">
                    <span>Discover</span>
                    <ArrowRight className="w-4 h-4 ml-2 transform group-hover:translate-x-2 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Brand Story Snippet */}
      <section className="py-24 bg-cream">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-3xl md:text-5xl text-maroon uppercase tracking-wider mb-8">
            A Legacy of Craftsmanship
          </h2>
          <p className="text-ink-light text-lg md:text-xl leading-relaxed font-light mb-12">
            Located near the historic Hyderabad High Court, Kala Textiles and Kala Sanskriti are established textile destinations serving customers with an extensive collection of sarees, matching materials, and tailoring supplies.
          </p>
          <Link
            to="/about"
            className="inline-flex items-center px-8 py-4 border border-maroon text-maroon text-xs uppercase tracking-widest font-medium hover:bg-maroon hover:text-ivory transition-colors duration-300"
          >
            Read Our Story
          </Link>
        </div>
      </section>
    </div>
  );
}
