import express from 'express';
import { createServer as createViteServer } from 'vite';
import Database from 'better-sqlite3';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, 'public', 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Database setup
const dbPath = path.join(__dirname, 'database.sqlite');
const db = new Database(dbPath);

// Initialize database schema
db.exec(`
  CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    price TEXT NOT NULL,
    description TEXT,
    category TEXT NOT NULL,
    images TEXT NOT NULL -- JSON array of image URLs
  );

  CREATE TABLE IF NOT EXISTS settings (
    key TEXT PRIMARY KEY,
    value TEXT NOT NULL
  );
`);

// Seed database if empty
const count = db.prepare('SELECT COUNT(*) as count FROM products').get() as { count: number };
if (count.count === 0) {
  const seedProducts = [
    {
      name: 'Casement Petticoat',
      category: 'Saree Petticoat',
      price: '₹50',
      description: 'Comfortable casement cotton petticoat',
      images: ['https://i.postimg.cc/m2HjYf73/Untitled.png']
    },
    {
      name: 'Regular Petticoat',
      category: 'Saree Petticoat',
      price: '₹80',
      description: 'Standard cotton petticoat for daily wear',
      images: ['https://i.postimg.cc/m2HjYf73/Untitled.png']
    },
    {
      name: 'Heavy Petticoat',
      category: 'Saree Petticoat',
      price: '₹90',
      description: 'Premium heavy cotton petticoat',
      images: ['https://i.postimg.cc/m2HjYf73/Untitled.png']
    },
    {
      name: 'XXL Petticoat',
      category: 'Saree Petticoat',
      price: '₹120',
      description: 'Extra large size cotton petticoat',
      images: ['https://i.postimg.cc/m2HjYf73/Untitled.png']
    },
    {
      name: 'Chilli Petticoat',
      category: 'Saree Petticoat',
      price: '₹150',
      description: 'Special chilli cotton petticoat',
      images: ['https://i.postimg.cc/m2HjYf73/Untitled.png']
    },
    {
      name: 'Polyester Fall',
      category: 'Saree Falls',
      price: '₹10.5',
      description: 'Durable polyester saree fall',
      images: ['https://i.postimg.cc/fThPzZ7N/Untitled.png']
    },
    {
      name: 'Mixed Cotton Fall',
      category: 'Saree Falls',
      price: '₹11',
      description: 'Comfortable mixed cotton fall',
      images: ['https://i.postimg.cc/fThPzZ7N/Untitled.png']
    },
    {
      name: 'Cotton Fall',
      category: 'Saree Falls',
      price: '₹15',
      description: 'Pure cotton saree fall',
      images: ['https://i.postimg.cc/fThPzZ7N/Untitled.png']
    },
    {
      name: 'Polyester Lining',
      category: 'Lining Fabric',
      price: '₹30',
      description: 'Polyester lining fabric',
      images: ['https://i.postimg.cc/zGjpN8VV/Untitled.png']
    },
    {
      name: 'Mixed Lining',
      category: 'Lining Fabric',
      price: '₹40',
      description: 'Mixed cotton lining fabric',
      images: ['https://i.postimg.cc/zGjpN8VV/Untitled.png']
    },
    {
      name: 'Cotton Lining',
      category: 'Lining Fabric',
      price: '₹50',
      description: 'Pure cotton lining fabric',
      images: ['https://i.postimg.cc/zGjpN8VV/Untitled.png']
    },
    {
      name: 'Satin Lining',
      category: 'Lining Fabric',
      price: 'Offline Only',
      description: 'Premium satin lining fabric',
      images: ['https://i.postimg.cc/zGjpN8VV/Untitled.png']
    },
    {
      name: 'Crape Lining',
      category: 'Lining Fabric',
      price: 'Offline Only',
      description: 'Crape lining fabric',
      images: ['https://i.postimg.cc/zGjpN8VV/Untitled.png']
    },
    {
      name: 'Pattu Lining',
      category: 'Lining Fabric',
      price: 'Offline Only',
      description: 'Pattu lining fabric',
      images: ['https://i.postimg.cc/zGjpN8VV/Untitled.png']
    },
    {
      name: 'Tissue Lining',
      category: 'Lining Fabric',
      price: 'Offline Only',
      description: 'Tissue lining fabric',
      images: ['https://i.postimg.cc/zGjpN8VV/Untitled.png']
    },
    {
      name: 'Fancy Blouses Collection',
      category: 'Fancy Blouses',
      price: '₹42 - ₹600',
      description: 'Available offline due to various design changes',
      images: ['https://images.unsplash.com/photo-1610030469611-399436402844?q=80&w=800&auto=format&fit=crop']
    },
    {
      name: 'Cotton Saree',
      category: 'Sarees',
      price: 'Offline Only',
      description: 'Pure cotton sarees for daily wear',
      images: ['https://i.postimg.cc/L82S0q0D/Untitled.png']
    },
    {
      name: 'Silk Saree',
      category: 'Sarees',
      price: 'Offline Only',
      description: 'Premium silk sarees for special occasions',
      images: ['https://i.postimg.cc/L82S0q0D/Untitled.png']
    },
    {
      name: 'Fancy Saree',
      category: 'Sarees',
      price: 'Offline Only',
      description: 'Designer fancy sarees',
      images: ['https://i.postimg.cc/L82S0q0D/Untitled.png']
    },
    {
      name: 'Premium Saree',
      category: 'Sarees',
      price: 'Offline Only',
      description: 'Exclusive premium collection',
      images: ['https://i.postimg.cc/L82S0q0D/Untitled.png']
    },
    {
      name: 'Banarasi Saree',
      category: 'Sarees',
      price: 'Offline Only',
      description: 'Traditional Banarasi silk sarees',
      images: ['https://i.postimg.cc/L82S0q0D/Untitled.png']
    },
    {
      name: 'Pattu Saree',
      category: 'Sarees',
      price: 'Offline Only',
      description: 'Authentic Pattu sarees',
      images: ['https://i.postimg.cc/L82S0q0D/Untitled.png']
    },
    {
      name: 'Premium Threads',
      category: 'Tailoring Materials',
      price: '₹15',
      description: 'High-quality polyester threads in all colors',
      images: ['https://images.unsplash.com/photo-1584031641662-37152069b177?q=80&w=800&auto=format&fit=crop']
    },
    {
      name: 'Designer Buttons Set',
      category: 'Tailoring Materials',
      price: '₹45',
      description: 'Pack of 12 premium designer buttons',
      images: ['https://images.unsplash.com/photo-1626245000782-b6d85e7831af?q=80&w=800&auto=format&fit=crop']
    },
    {
      name: 'Zari Border Lace',
      category: 'Tailoring Materials',
      price: '₹120',
      description: '9-meter premium zari border lace',
      images: ['https://images.unsplash.com/photo-1605810755745-97171e06e306?q=80&w=800&auto=format&fit=crop']
    },
    {
      name: 'Cotton Kurti',
      category: 'Readymade Garments',
      price: '₹499',
      description: 'Comfortable daily wear cotton kurti with block print',
      images: ['https://images.unsplash.com/photo-1583391733958-d25e07fac044?q=80&w=800&auto=format&fit=crop']
    },
    {
      name: 'Designer Lehenga',
      category: 'Readymade Garments',
      price: '₹2999',
      description: 'Semi-stitched designer lehenga with heavy embroidery',
      images: ['https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=800&auto=format&fit=crop']
    },
    {
      name: 'Party Wear Gown',
      category: 'Readymade Garments',
      price: '₹1499',
      description: 'Elegant evening gown with sequin work',
      images: ['https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?q=80&w=800&auto=format&fit=crop']
    }
  ];

  const insertStmt = db.prepare('INSERT INTO products (name, price, description, category, images) VALUES (?, ?, ?, ?, ?)');
  const insertMany = db.transaction((products) => {
    for (const product of products) {
      insertStmt.run(product.name, product.price, product.description, product.category, JSON.stringify(product.images));
    }
  });
  insertMany(seedProducts);
}

// Multer setup for image uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  
  // Get all settings
  app.get('/api/settings', (req, res) => {
    try {
      const settings = db.prepare('SELECT * FROM settings').all();
      const formattedSettings = settings.reduce((acc: any, curr: any) => {
        acc[curr.key] = JSON.parse(curr.value);
        return acc;
      }, {});
      res.json(formattedSettings);
    } catch (error) {
      console.error('Error fetching settings:', error);
      res.status(500).json({ error: 'Failed to fetch settings' });
    }
  });

  // Update a setting
  app.put('/api/settings/:key', (req, res) => {
    try {
      const { key } = req.params;
      const { value } = req.body;
      const stmt = db.prepare('INSERT INTO settings (key, value) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value');
      stmt.run(key, JSON.stringify(value));
      res.json({ success: true });
    } catch (error) {
      console.error('Error updating setting:', error);
      res.status(500).json({ error: 'Failed to update setting' });
    }
  });

  // Get all products
  app.get('/api/products', (req, res) => {
    try {
      const products = db.prepare('SELECT * FROM products').all();
      // Parse images JSON string back to array
      const formattedProducts = products.map((p: any) => ({
        ...p,
        images: JSON.parse(p.images)
      }));
      res.json(formattedProducts);
    } catch (error) {
      console.error('Error fetching products:', error);
      res.status(500).json({ error: 'Failed to fetch products' });
    }
  });

  // Add a new product
  app.post('/api/products', (req, res) => {
    try {
      const { name, price, description, category, images } = req.body;
      const stmt = db.prepare('INSERT INTO products (name, price, description, category, images) VALUES (?, ?, ?, ?, ?)');
      const result = stmt.run(name, price, description || '', category, JSON.stringify(images || []));
      res.json({ id: result.lastInsertRowid, success: true });
    } catch (error) {
      console.error('Error adding product:', error);
      res.status(500).json({ error: 'Failed to add product' });
    }
  });

  // Update a product
  app.put('/api/products/:id', (req, res) => {
    try {
      const { id } = req.params;
      const { name, price, description, category, images } = req.body;
      const stmt = db.prepare('UPDATE products SET name = ?, price = ?, description = ?, category = ?, images = ? WHERE id = ?');
      stmt.run(name, price, description || '', category, JSON.stringify(images || []), id);
      res.json({ success: true });
    } catch (error) {
      console.error('Error updating product:', error);
      res.status(500).json({ error: 'Failed to update product' });
    }
  });

  // Delete a product
  app.delete('/api/products/:id', (req, res) => {
    try {
      const { id } = req.params;
      const stmt = db.prepare('DELETE FROM products WHERE id = ?');
      stmt.run(id);
      res.json({ success: true });
    } catch (error) {
      console.error('Error deleting product:', error);
      res.status(500).json({ error: 'Failed to delete product' });
    }
  });

  // Upload images
  app.post('/api/upload', upload.array('images', 10), (req, res) => {
    try {
      if (!req.files || (req.files as Express.Multer.File[]).length === 0) {
        return res.status(400).json({ error: 'No files uploaded' });
      }
      
      const files = req.files as Express.Multer.File[];
      const imageUrls = files.map(file => `/uploads/${file.filename}`);
      
      res.json({ urls: imageUrls });
    } catch (error) {
      console.error('Error uploading images:', error);
      res.status(500).json({ error: 'Failed to upload images' });
    }
  });

  // List all images
  app.get('/api/images', (req, res) => {
    try {
      const files = fs.readdirSync(uploadsDir);
      const imageUrls = files.map(file => `/uploads/${file}`);
      res.json(imageUrls);
    } catch (error) {
      console.error('Error listing images:', error);
      res.status(500).json({ error: 'Failed to list images' });
    }
  });

  // Delete an image
  app.delete('/api/images/:filename', (req, res) => {
    try {
      const { filename } = req.params;
      const filePath = path.join(uploadsDir, filename);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
      res.json({ success: true });
    } catch (error) {
      console.error('Error deleting image:', error);
      res.status(500).json({ error: 'Failed to delete image' });
    }
  });

  // Serve uploads directory
  app.use('/uploads', express.static(uploadsDir));

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // Serve static files in production
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (req, res) => {
      if (!req.path.startsWith('/api') && !req.path.startsWith('/uploads')) {
        res.sendFile(path.join(__dirname, 'dist', 'index.html'));
      }
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
