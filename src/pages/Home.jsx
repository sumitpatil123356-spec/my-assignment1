import { useState, useEffect, useMemo } from 'react';
import { useOutletContext } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import HeroProduct from '../components/HeroProduct';
import ProductGrid from '../components/ProductGrid';

// Minimal fallback shown only when Supabase is not connected
const FALLBACK_INVENTORY = [
  { id: 'ctrl-volt', label: 'Volt Green Special', value: 169.00, img: 'https://images.unsplash.com/photo-1600861195091-690c92f1d2cc?auto=format&fit=crop&w=600&q=80', category: 'Controllers' },
  { id: 'ctrl-blue', label: 'Cobalt Element', value: 159.00, img: 'https://images.unsplash.com/photo-1592840496694-26d035b52b48?auto=format&fit=crop&w=600&q=80', category: 'Controllers' },
  { id: 'ctrl-white', label: 'Alabaster Core', value: 149.00, img: 'https://images.unsplash.com/photo-1602532432638-3486ec2c2a0d?auto=format&fit=crop&w=600&q=80', category: 'Controllers' },
  { id: '20', label: 'Mechanical Core TKL Keyboard', value: 125.00, img: 'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?auto=format&fit=crop&w=400&q=80', category: 'Keyboards' },
  { id: '21', label: 'SoundScape Pro Tactical Array', value: 210.00, img: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=400&q=80', category: 'Audio' },
  { id: '22', label: 'Zero-Lag Precision Speed Mouse', value: 80.00, img: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=400&q=80', category: 'Mice' },
  { id: '23', label: 'Apex Stealth Linear Keyboard', value: 175.00, img: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=400&q=80', category: 'Keyboards' },
  { id: '24', label: 'Vortex Wireless Macro Pad', value: 65.00, img: 'https://images.unsplash.com/photo-1626958390898-162d3577f593?auto=format&fit=crop&w=400&q=80', category: 'Keyboards' },
  { id: '25', label: 'Carbon Grid Ultralight Mouse', value: 95.00, img: 'https://images.unsplash.com/photo-1625842268584-8f3290455651?auto=format&fit=crop&w=400&q=80', category: 'Mice' },
  { id: '26', label: 'Vector Audio Desk Monitor Mic', value: 140.00, img: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=400&q=80', category: 'Audio' },
  { id: '27', label: 'Kevlar Coiled Connection Cable', value: 35.00, img: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&w=400&q=80', category: 'Accessories' },
  { id: '28', label: 'Onyx Desk Armor Mat (XL)', value: 45.00, img: 'https://images.unsplash.com/photo-1632292224971-0d45778b3c9b?auto=format&fit=crop&w=400&q=80', category: 'Accessories' },
  { id: '29', label: 'Quantum Dots Ultrawide Display', value: 899.00, img: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=400&q=80', category: 'Displays' },
  { id: '30', label: 'Titanium Monitor Articulated Arm', value: 115.00, img: 'https://images.unsplash.com/photo-1616440347437-b1c73416efc2?auto=format&fit=crop&w=400&q=80', category: 'Accessories' },
  { id: '31', label: 'Stream Command Deck Controller', value: 150.00, img: 'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?auto=format&fit=crop&w=400&q=80', category: 'Controllers' },
  { id: '32', label: 'Pro Ambient Backlight Tube', value: 55.00, img: 'https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=400&q=80', category: 'Accessories' },
];

export default function Home() {
  const { addToCart, searchQuery } = useOutletContext();
  const [products, setProducts] = useState(FALLBACK_INVENTORY);
  const [selectedVariantId, setSelectedVariantId] = useState('ctrl-volt');

  useEffect(() => {
    // Fetch live products from Supabase (includes admin-added products)
    supabase
      .from('products')
      .select('*')
      .then(({ data, error }) => {
        if (!error && data && data.length > 0) {
          setProducts(data);
        } else {
          const local = localStorage.getItem('localProducts');
          if (local) setProducts(JSON.parse(local));
        }
      });

    // Track visitor (fire and forget)
    supabase
      .from('visitor_logs')
      .insert({ session_id: 'storefront-visitor', path: '/', user_agent: navigator.userAgent });
  }, []);

  const activeVariant = useMemo(() => {
    return products.find(item => item.id === selectedVariantId) || products[0];
  }, [products, selectedVariantId]);

  const remainingProducts = useMemo(() => {
    const mainIds = ['ctrl-volt', 'ctrl-blue', 'ctrl-white'];
    let list = products.filter(item => !mainIds.includes(item.id.toString()));
    if (searchQuery.trim() !== '') {
      list = list.filter(item => item.label.toLowerCase().includes(searchQuery.toLowerCase()));
    }
    return list;
  }, [products, searchQuery]);

  return (
    <>
      <HeroProduct
        activeVariant={activeVariant}
        onAddToCart={addToCart}
        selectedVariantId={selectedVariantId}
        setSelectedVariantId={setSelectedVariantId}
        INVENTORY={products}
      />

      <section className="compatibility-ribbon-bar">
        <div className="ribbon-flex">
          <span className="ribbon-header">Compatible with</span>
          <div className="ribbon-chips-grid">
            <span className="compatibility-chip">Consoles</span>
            <span className="compatibility-chip">Windows PC</span>
            <span className="compatibility-chip">iOS</span>
            <span className="compatibility-chip">Android</span>
          </div>
        </div>
      </section>

      <section className="ecosystem-header-block">
        <div className="ecosystem-tech-label">More Products</div>
        <h2 className="ecosystem-heading">Complete Your Setup</h2>
      </section>

      <ProductGrid
        products={remainingProducts}
        onAddToCart={addToCart}
      />
    </>
  );
}
