import { motion } from 'motion/react';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Cart() {
  return (
    <div className="min-h-screen bg-ivory pt-32 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-12 shadow-2xl border border-champagne/30 flex flex-col items-center"
        >
          <div className="w-24 h-24 bg-cream rounded-full flex items-center justify-center mb-6">
            <ShoppingBag className="w-10 h-10 text-maroon" />
          </div>
          <h1 className="font-serif text-3xl text-maroon uppercase tracking-widest mb-4">
            Your Cart is Empty
          </h1>
          <p className="text-ink-light font-light mb-8 max-w-md">
            Looks like you haven't added anything to your cart yet. Explore our collections to find something beautiful.
          </p>
          <Link
            to="/matching-center"
            className="inline-flex items-center justify-center px-8 py-4 bg-maroon text-ivory text-xs uppercase tracking-widest font-medium hover:bg-ink transition-colors duration-300"
          >
            Start Shopping
            <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
