import { motion } from 'motion/react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export function Contact() {
  return (
    <div className="bg-ivory min-h-screen">
      {/* Hero Section */}
      <section className="bg-ink text-ivory py-24 px-4 text-center">
        <h1 className="font-serif text-4xl md:text-6xl uppercase tracking-widest mb-6 text-champagne">
          Contact Us
        </h1>
        <p className="text-sm md:text-base uppercase tracking-[0.2em] text-ivory/80 font-light">
          We look forward to welcoming you
        </p>
      </section>

      {/* Contact Information */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Store Locations */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-16"
          >
            <div>
              <h2 className="font-serif text-3xl text-maroon uppercase tracking-wider mb-8 flex items-center">
                <MapPin className="w-8 h-8 mr-4" />
                Our Stores
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="bg-cream p-8 border border-champagne/30">
                  <h3 className="font-serif text-2xl text-ink uppercase tracking-wider mb-4">
                    Kala Textiles
                  </h3>
                  <div className="text-ink-light text-sm leading-relaxed font-light space-y-2">
                    <p>#21-1-661, 2nd & 3rd Floor</p>
                    <p>Sattar Market</p>
                    <p>Rikabgunj</p>
                    <p>Hyderabad – 500002</p>
                  </div>
                </div>

                <div className="bg-cream p-8 border border-champagne/30">
                  <h3 className="font-serif text-2xl text-ink uppercase tracking-wider mb-4">
                    Kala Sanskriti
                  </h3>
                  <div className="text-ink-light text-sm leading-relaxed font-light space-y-2">
                    <p>21-1-551</p>
                    <p>Opposite High Court Gate No 4</p>
                    <p>Rikabgunj</p>
                    <p>Hyderabad – 500002</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <h2 className="font-serif text-2xl text-maroon uppercase tracking-wider mb-6 flex items-center">
                  <Phone className="w-6 h-6 mr-3" />
                  Call Us
                </h2>
                <ul className="space-y-4 text-ink-light text-sm font-light">
                  <li><a href="tel:9000089610" className="hover:text-maroon transition-colors">9000089610</a></li>
                  <li><a href="tel:9292000460" className="hover:text-maroon transition-colors">9292000460</a></li>
                  <li><a href="tel:9988116460" className="hover:text-maroon transition-colors">9988116460</a></li>
                  <li><a href="tel:7711994460" className="hover:text-maroon transition-colors">7711994460</a></li>
                </ul>
              </div>

              <div>
                <h2 className="font-serif text-2xl text-maroon uppercase tracking-wider mb-6 flex items-center">
                  <Mail className="w-6 h-6 mr-3" />
                  Email
                </h2>
                <a href="mailto:kalatextiles@gmail.com" className="text-ink-light text-sm font-light hover:text-maroon transition-colors">
                  kalatextiles@gmail.com
                </a>

                <h2 className="font-serif text-2xl text-maroon uppercase tracking-wider mb-6 mt-12 flex items-center">
                  <Clock className="w-6 h-6 mr-3" />
                  Hours
                </h2>
                <div className="text-ink-light text-sm font-light space-y-2">
                  <p>Monday - Saturday</p>
                  <p>10:30 AM - 8:30 PM</p>
                  <p className="text-maroon mt-2">Sunday Closed</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="h-[600px] bg-cream border border-champagne/30 p-2"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3807.653456789012!2d78.47123456789012!3d17.36123456789012!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb977777777777%3A0x1234567890abcdef!2sHigh%20Court%20for%20the%20State%20of%20Telangana!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Kala Sanskriti Location Map"
              className="grayscale contrast-125 opacity-90 hover:grayscale-0 hover:opacity-100 transition-all duration-700"
            ></iframe>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
