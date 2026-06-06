import React, { useState, useMemo, useEffect } from 'react';

// Exact inventory array as requested
const INVENTORY = [
  { id: "ctrl-volt", label: "Volt Green Special", value: 169.00, img: "https://images.unsplash.com/photo-1600861195091-690c92f1d2cc?auto=format&fit=crop&w=600&q=80" },
  { id: "ctrl-blue", label: "Cobalt Element", value: 159.00, img: "https://images.unsplash.com/photo-1592840496694-26d035b52b48?auto=format&fit=crop&w=600&q=80" },
  { id: "ctrl-white", label: "Alabaster Core", value: 149.00, img: "https://images.unsplash.com/photo-1602532432638-3486ec2c2a0d?auto=format&fit=crop&w=600&q=80" },
  { id: 20, label: 'Mechanical Core TKL Keyboard', value: 125.00, img: 'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?auto=format&fit=crop&w=400&q=80' },
  { id: 21, label: 'SoundScape Pro Tactical Array', value: 210.00, img: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=400&q=80' },
  { id: 22, label: 'Zero-Lag Precision Speed Mouse', value: 80.00, img: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=400&q=80' },
  { id: 23, label: 'Apex Stealth Linear Keyboard', value: 175.00, img: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=400&q=80' },
  { id: 24, label: 'Vortex Wireless Macro Pad', value: 65.00, img: 'https://images.unsplash.com/photo-1626958390898-162d3577f593?auto=format&fit=crop&w=400&q=80' },
  { id: 25, label: 'Carbon Grid Ultralight Mouse', value: 95.00, img: 'https://images.unsplash.com/photo-1625842268584-8f3290455651?auto=format&fit=crop&w=400&q=80' },
  { id: 26, label: 'Vector Audio Desk Monitor Mic', value: 140.00, img: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=400&q=80' },
  { id: 27, label: 'Kevlar Coiled Connection Cable', value: 35.00, img: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&w=400&q=80' },
  { id: 28, label: 'Onyx Desk Armor Mat (XL)', value: 45.00, img: 'https://images.unsplash.com/photo-1632292224971-0d45778b3c9b?auto=format&fit=crop&w=400&q=80' },
  { id: 29, label: 'Quantum Dots Ultrawide Display', value: 899.00, img: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=400&q=80' },
  { id: 30, label: 'Titanium Monitor Articulated Arm', value: 115.00, img: 'https://images.unsplash.com/photo-1616440347437-b1c73416efc2?auto=format&fit=crop&w=400&q=80' },
  { id: 31, label: 'Stream Command Deck Controller', value: 150.00, img: 'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?auto=format&fit=crop&w=400&q=80' },
  { id: 32, label: 'Pro Ambient Backlight Tube', value: 55.00, img: 'https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=400&q=80' }
];

export default function App() {
  const [selectedVariantId, setSelectedVariantId] = useState('ctrl-volt');
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartUpdated, setCartUpdated] = useState(false);
  const [tiltStyle, setTiltStyle] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  // Trigger pulse animation on cart icon when items are updated
  useEffect(() => {
    if (cart.length > 0) {
      setCartUpdated(true);
      const timer = setTimeout(() => setCartUpdated(false), 300);
      return () => clearTimeout(timer);
    }
  }, [cart]);

  // Find active variant info
  const activeVariant = useMemo(() => {
    return INVENTORY.find(item => item.id === selectedVariantId) || INVENTORY[0];
  }, [selectedVariantId]);

  // Rest of product inventory (not active controller variants)
  const remainingProducts = useMemo(() => {
    const mainIds = ['ctrl-volt', 'ctrl-blue', 'ctrl-white'];
    let list = INVENTORY.filter(item => !mainIds.includes(item.id));
    if (searchQuery.trim() !== '') {
      list = list.filter(item => item.label.toLowerCase().includes(searchQuery.toLowerCase()));
    }
    return list;
  }, [searchQuery]);

  // Cart operations
  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter(item => item.id !== id));
  };

  const increaseQty = (id) => {
    setCart((prev) => prev.map(item => item.id === id ? { ...item, quantity: item.quantity + 1 } : item));
  };

  const decreaseQty = (id) => {
    setCart((prev) => prev.map(item => {
      if (item.id === id) {
        const nextQty = item.quantity - 1;
        return nextQty > 0 ? { ...item, quantity: nextQty } : null;
      }
      return item;
    }).filter(Boolean));
  };

  const totals = useMemo(() => {
    const subtotal = cart.reduce((acc, item) => acc + (item.value * item.quantity), 0);
    const systemFees = subtotal * 0.08;
    const total = subtotal + systemFees;
    const itemsCount = cart.reduce((acc, item) => acc + item.quantity, 0);
    return { subtotal, systemFees, total, itemsCount };
  }, [cart]);

  // Interactive mouse tilt effect for Hero Render
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    // Cap rotation at 15 degrees
    const rotateX = -(y / (rect.height / 2)) * 15;
    const rotateY = (x / (rect.width / 2)) * 15;
    setTiltStyle({
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`,
      transition: 'transform 0.1s ease-out'
    });
  };

  const handleMouseLeave = () => {
    setTiltStyle({
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)',
      transition: 'transform 0.5s ease-out'
    });
  };

  return (
    <div className="app-container">
      {/* Global CSS Embedded */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700;900&family=Space+Mono:wght@400;700&display=swap');

        :root {
          --color-bg-canvas: #000000;
          --color-surface-panel: #0a0c10;
          --color-surface-panel-elevated: #12161f;
          --color-border-system: #161b26;
          --color-text: #f5f7fa;
          --color-text-secondary: #7f8794;
          --color-primary-accent: #a3ff12;
          --color-accent-soft: rgba(163, 255, 18, 0.08);
          --color-accent-glow: rgba(163, 255, 18, 0.35);
          
          --font-primary: 'Inter', sans-serif;
          --font-technical: 'Space Mono', monospace;
        }

        /* Basic Resets */
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        body {
          background-color: var(--color-bg-canvas);
          color: var(--color-text);
          font-family: var(--font-primary);
          overflow-x: hidden;
          -webkit-font-smoothing: antialiased;
        }

        .app-container {
          background-color: var(--color-bg-canvas);
          min-height: 100vh;
          width: 100%;
          position: relative;
        }

        /* Layout limits */
        .layout-wrapper {
          max-width: 1440px;
          margin: 0 auto;
          padding: 0 24px;
        }

        /* Utility classes */
        .tech-mono {
          font-family: var(--font-technical);
          letter-spacing: 2px;
          text-transform: uppercase;
        }

        /* Top System Navigation */
        .navbar-sticky {
          position: sticky;
          top: 0;
          height: 64px;
          background: rgba(0, 0, 0, 0.95);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border-bottom: 1px solid var(--color-border-system);
          z-index: 100;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 32px;
        }

        .navbar-brand {
          font-family: var(--font-technical);
          font-weight: 700;
          font-size: 1.2rem;
          color: var(--color-text);
          letter-spacing: 2px;
          cursor: pointer;
          transition: filter 0.2s ease;
          display: flex;
          align-items: center;
        }
        .navbar-brand:hover {
          filter: brightness(1.2);
        }
        .navbar-brand span.cursor-underscore {
          color: var(--color-primary-accent);
          text-shadow: 0 0 8px var(--color-primary-accent);
          animation: blink 1s infinite;
        }

        .navbar-links {
          display: flex;
          gap: 32px;
          height: 100%;
          align-items: center;
        }
        .navbar-link-item {
          font-family: var(--font-technical);
          font-size: 0.85rem;
          color: var(--color-text-secondary);
          text-decoration: none;
          position: relative;
          padding: 8px 0;
          cursor: pointer;
          transition: color 0.25s ease;
        }
        .navbar-link-item:hover {
          color: var(--color-primary-accent);
        }
        .navbar-link-item::after {
          content: '';
          position: absolute;
          width: 0;
          height: 1.5px;
          bottom: 0;
          left: 0;
          background-color: var(--color-primary-accent);
          transition: width 0.25s ease;
        }
        .navbar-link-item:hover::after {
          width: 100%;
        }

        .navbar-actions {
          display: flex;
          align-items: center;
          gap: 24px;
        }
        .navbar-action-btn {
          background: none;
          border: none;
          color: var(--color-text-secondary);
          font-family: var(--font-technical);
          font-size: 0.85rem;
          cursor: pointer;
          transition: color 0.25s ease;
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .navbar-action-btn:hover {
          color: var(--color-primary-accent);
        }

        .cart-trigger-container {
          position: relative;
        }
        .cart-badge {
          background: var(--color-primary-accent);
          color: #000000;
          font-weight: 700;
          font-family: var(--font-technical);
          font-size: 0.7rem;
          padding: 2px 6px;
          border-radius: 2px;
          margin-left: 4px;
          display: inline-block;
          box-shadow: 0 0 8px var(--color-primary-accent);
        }
        .cart-badge-pulse {
          animation: pulse-glow 0.3s ease-out 2;
        }

        /* Hero Command Center */
        .hero-command-grid {
          display: grid;
          grid-template-columns: 1fr 1.2fr 1fr;
          gap: 32px;
          margin-top: 40px;
          margin-bottom: 60px;
          align-items: stretch;
        }

        /* Config Console (Left Column) */
        .console-panel {
          background: var(--color-surface-panel);
          border: 1px solid var(--color-border-system);
          border-radius: 4px;
          padding: 32px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          box-shadow: 0 0 0 1px var(--color-border-system), 0 0 40px rgba(163,255,18,.03);
        }

        .pro-label-box {
          border: 1px solid var(--color-primary-accent);
          background: var(--color-accent-soft);
          color: var(--color-primary-accent);
          font-family: var(--font-technical);
          font-size: 0.75rem;
          padding: 6px 12px;
          align-self: flex-start;
          font-weight: 700;
          margin-bottom: 24px;
        }

        .hero-heading {
          font-size: 3.5rem;
          font-weight: 900;
          line-height: 1.1;
          letter-spacing: -1px;
          color: var(--color-text);
          margin-bottom: 24px;
        }
        .hero-heading span.accent-highlight {
          color: var(--color-primary-accent);
          text-shadow: 0 0 20px rgba(163,255,18,0.2);
        }

        .hero-desc {
          color: var(--color-text-secondary);
          font-size: 0.95rem;
          line-height: 1.6;
          margin-bottom: 32px;
        }

        .cta-buttons-stack {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-bottom: 32px;
        }

        /* Buttons & Interactions */
        .btn-primary-filled {
          background: var(--color-primary-accent);
          color: #000000;
          border: 1px solid var(--color-primary-accent);
          font-family: var(--font-technical);
          font-weight: 700;
          font-size: 0.9rem;
          padding: 16px 24px;
          cursor: pointer;
          border-radius: 4px;
          transition: all 0.25s ease;
          letter-spacing: 2px;
          text-align: center;
        }
        .btn-primary-filled:hover {
          transform: translateY(-2px);
          box-shadow: 0 0 20px var(--color-accent-glow);
          background: #b4ff33;
        }
        .btn-primary-filled:active {
          transform: translateY(0);
        }

        .btn-secondary-outlined {
          background: transparent;
          color: var(--color-text);
          border: 1px solid var(--color-border-system);
          font-family: var(--font-technical);
          font-weight: 700;
          font-size: 0.9rem;
          padding: 16px 24px;
          cursor: pointer;
          border-radius: 4px;
          transition: all 0.25s ease;
          letter-spacing: 2px;
          text-align: center;
        }
        .btn-secondary-outlined:hover {
          transform: translateY(-2px);
          border-color: var(--color-text);
          box-shadow: 0 0 15px rgba(255,255,255,0.05);
        }
        .btn-secondary-outlined:active {
          transform: translateY(0);
        }

        /* Variant System Selector */
        .variant-selector-module {
          border-top: 1px solid var(--color-border-system);
          padding-top: 24px;
        }
        .system-node-display {
          font-family: var(--font-technical);
          font-size: 0.75rem;
          color: var(--color-text-secondary);
          margin-bottom: 12px;
        }
        .system-node-display span.node-value {
          color: var(--color-primary-accent);
        }
        .variant-nodes-flex {
          display: flex;
          gap: 16px;
        }
        .variant-node-btn {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          border: 2px solid var(--color-border-system);
          background: none;
          cursor: pointer;
          transition: all 0.25s ease;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .variant-node-btn:hover {
          transform: scale(1.1);
        }
        .variant-node-btn.active {
          border-color: var(--color-primary-accent);
          box-shadow: 0 0 10px var(--color-accent-glow);
        }
        .variant-node-btn .color-fill-volt {
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: #a3ff12;
        }
        .variant-node-btn .color-fill-blue {
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: #2563eb;
        }
        .variant-node-btn .color-fill-white {
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: #ffffff;
        }

        /* Center Column (Hero Image Container) */
        .hero-render-panel {
          position: relative;
          background: var(--color-surface-panel);
          border: 1px solid var(--color-border-system);
          border-radius: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          padding: 40px;
          box-shadow: 0 0 0 1px var(--color-border-system), 0 0 40px rgba(163,255,18,.03);
        }
        .hero-glow-depth {
          position: absolute;
          width: 100%;
          height: 100%;
          background: radial-gradient(circle, rgba(163,255,18,.18), transparent 70%);
          pointer-events: none;
          z-index: 1;
        }
        .hero-image-wrapper {
          position: relative;
          z-index: 2;
          width: 100%;
          max-width: 420px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: grab;
        }
        .hero-image-render {
          width: 100%;
          height: auto;
          object-fit: contain;
          animation: float-slow 6s ease-in-out infinite;
          filter: drop-shadow(0 10px 20px rgba(0,0,0,0.8));
        }

        /* Telemetry Stack (Right Column) */
        .telemetry-panel {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .telemetry-module-card {
          background: var(--color-surface-panel);
          border: 1px solid var(--color-border-system);
          border-radius: 4px;
          padding: 20px 24px;
          display: flex;
          align-items: center;
          gap: 16px;
          position: relative;
          overflow: hidden;
          box-shadow: 0 0 0 1px var(--color-border-system), 0 0 40px rgba(163,255,18,.03);
          transition: all 0.25s ease;
        }
        .telemetry-module-card:hover {
          border-color: rgba(163, 255, 18, 0.4);
          transform: translateX(4px);
        }
        .telemetry-icon-box {
          color: var(--color-primary-accent);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .telemetry-labels {
          display: flex;
          flex-direction: column;
        }
        .telemetry-subtitle {
          font-family: var(--font-technical);
          font-size: 0.65rem;
          color: var(--color-text-secondary);
          letter-spacing: 2px;
        }
        .telemetry-title {
          font-family: var(--font-technical);
          font-size: 0.95rem;
          font-weight: 700;
          color: var(--color-text);
          letter-spacing: 1px;
          margin-top: 4px;
        }
        .telemetry-module-card:hover .telemetry-title {
          color: var(--color-primary-accent);
        }

        /* Compatibility Ribbon */
        .compatibility-ribbon-bar {
          background: var(--color-surface-panel);
          border-top: 1px solid var(--color-border-system);
          border-bottom: 1px solid var(--color-border-system);
          padding: 20px 0;
          margin: 40px 0 60px 0;
        }
        .ribbon-flex {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 20px;
        }
        .ribbon-header {
          font-family: var(--font-technical);
          font-size: 0.85rem;
          color: var(--color-primary-accent);
          letter-spacing: 3px;
          font-weight: 700;
        }
        .ribbon-chips-grid {
          display: flex;
          gap: 16px;
          flex-wrap: wrap;
        }
        .compatibility-chip {
          font-family: var(--font-technical);
          font-size: 0.75rem;
          color: var(--color-text-secondary);
          border: 1px solid var(--color-border-system);
          padding: 8px 16px;
          border-radius: 4px;
          letter-spacing: 1.5px;
          background: rgba(22, 27, 38, 0.2);
        }

        /* Ecosystem Section */
        .ecosystem-header-block {
          margin-bottom: 32px;
        }
        .ecosystem-tech-label {
          font-family: var(--font-technical);
          font-size: 0.8rem;
          color: var(--color-primary-accent);
          letter-spacing: 2px;
          font-weight: 700;
          margin-bottom: 12px;
        }
        .ecosystem-heading {
          font-size: 2.2rem;
          font-weight: 900;
          letter-spacing: -0.5px;
          color: var(--color-text);
        }

        /* Product Grid */
        .products-grid-container {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 24px;
          margin-bottom: 80px;
        }
        .product-card {
          background: var(--color-surface-panel);
          border: 1px solid var(--color-border-system);
          border-radius: 4px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          position: relative;
          box-shadow: 0 0 0 1px var(--color-border-system), 0 0 40px rgba(163,255,18,.03);
          transition: transform 0.25s ease, border-color 0.25s ease;
        }
        .product-card:hover {
          transform: translateY(-4px);
          border-color: var(--color-primary-accent);
          box-shadow: 0 0 20px rgba(163, 255, 18, 0.15);
        }
        .product-card-image-box {
          height: 220px;
          overflow: hidden;
          background: #000;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          border-bottom: 1px solid var(--color-border-system);
        }
        .product-card-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
        }
        .product-card:hover .product-card-img {
          transform: scale(1.05);
        }
        .product-card-info {
          padding: 20px;
          display: flex;
          flex-direction: column;
          flex-grow: 1;
          justify-content: space-between;
        }
        .product-sku {
          font-family: var(--font-technical);
          font-size: 0.65rem;
          color: var(--color-text-secondary);
          letter-spacing: 2px;
          margin-bottom: 8px;
        }
        .product-card:hover .product-sku {
          color: var(--color-primary-accent);
          text-shadow: 0 0 8px rgba(163, 255, 18, 0.3);
        }
        .product-title {
          font-size: 1.05rem;
          font-weight: 700;
          color: var(--color-text);
          margin-bottom: 16px;
          line-height: 1.4;
        }
        .product-footer-flex {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: auto;
        }
        .product-price-label {
          font-family: var(--font-technical);
          font-size: 1.1rem;
          font-weight: 700;
          color: var(--color-text);
        }
        .product-add-btn {
          background: transparent;
          border: 1px solid var(--color-border-system);
          color: var(--color-text);
          font-family: var(--font-technical);
          font-size: 0.75rem;
          font-weight: 700;
          padding: 8px 16px;
          border-radius: 4px;
          cursor: pointer;
          transition: all 0.25s ease;
          letter-spacing: 1.5px;
        }
        .product-card:hover .product-add-btn {
          border-color: var(--color-primary-accent);
          color: var(--color-primary-accent);
        }
        .product-add-btn:hover {
          background: var(--color-primary-accent) !important;
          color: #000000 !important;
          box-shadow: 0 0 10px var(--color-accent-glow);
        }

        /* Cart Drawer Slide Out */
        .cart-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(0, 0, 0, 0.7);
          backdrop-filter: blur(4px);
          z-index: 1000;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.35s ease;
        }
        .cart-overlay.open {
          opacity: 1;
          pointer-events: auto;
        }
        .cart-drawer-panel {
          position: fixed;
          top: 0;
          right: 0;
          width: 420px;
          height: 100%;
          background: var(--color-surface-panel-elevated);
          border-left: 1px solid var(--color-border-system);
          z-index: 1001;
          transform: translateX(100%);
          transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
          display: flex;
          flex-direction: column;
          box-shadow: -10px 0 30px rgba(0, 0, 0, 0.5);
        }
        .cart-overlay.open .cart-drawer-panel {
          transform: translateX(0);
        }
        .cart-header {
          padding: 24px;
          border-bottom: 1px solid var(--color-border-system);
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .cart-header-title {
          font-family: var(--font-technical);
          font-size: 1rem;
          font-weight: 700;
          letter-spacing: 2px;
          color: var(--color-text);
        }
        .cart-close-btn {
          background: none;
          border: none;
          color: var(--color-text-secondary);
          font-family: var(--font-technical);
          font-size: 1.2rem;
          cursor: pointer;
          transition: color 0.25s ease;
        }
        .cart-close-btn:hover {
          color: var(--color-primary-accent);
        }

        .cart-items-container {
          flex-grow: 1;
          overflow-y: auto;
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .cart-empty-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100%;
          color: var(--color-text-secondary);
          gap: 16px;
        }
        .cart-item-row {
          display: flex;
          justify-content: space-between;
          border-bottom: 1px solid var(--color-border-system);
          padding-bottom: 16px;
        }
        .cart-item-details {
          flex-grow: 1;
          padding-right: 16px;
        }
        .cart-item-name {
          font-weight: 700;
          font-size: 0.95rem;
          color: var(--color-text);
          margin-bottom: 6px;
        }
        .cart-item-meta {
          font-family: var(--font-technical);
          font-size: 0.75rem;
          color: var(--color-text-secondary);
        }
        .cart-item-controls-col {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          justify-content: space-between;
          gap: 8px;
        }
        .cart-item-actions {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .cart-qty-btn {
          background: transparent;
          border: 1px solid var(--color-border-system);
          color: var(--color-text);
          font-family: var(--font-technical);
          width: 28px;
          height: 28px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          border-radius: 2px;
          font-size: 0.8rem;
          transition: all 0.2s ease;
        }
        .cart-qty-btn:hover {
          border-color: var(--color-primary-accent);
          color: var(--color-primary-accent);
        }
        .cart-qty-value {
          font-family: var(--font-technical);
          font-size: 0.85rem;
          min-width: 24px;
          text-align: center;
        }
        .cart-item-remove {
          background: none;
          border: none;
          color: #ff4a4a;
          font-family: var(--font-technical);
          font-size: 0.7rem;
          cursor: pointer;
          letter-spacing: 1px;
          transition: opacity 0.2s;
        }
        .cart-item-remove:hover {
          opacity: 0.8;
          text-decoration: underline;
        }

        .cart-footer {
          padding: 24px;
          background: var(--color-surface-panel);
          border-top: 1px solid var(--color-border-system);
        }
        .cart-totals-table {
          width: 100%;
          margin-bottom: 24px;
          border-collapse: collapse;
        }
        .cart-totals-table td {
          padding: 8px 0;
          font-size: 0.9rem;
          color: var(--color-text-secondary);
        }
        .cart-totals-table tr.total-row td {
          font-size: 1.1rem;
          font-weight: 700;
          color: var(--color-text);
          border-top: 1px solid var(--color-border-system);
          padding-top: 16px;
        }
        .cart-totals-table td.numeric-cell {
          text-align: right;
          font-family: var(--font-technical);
        }
        .cart-totals-table tr.total-row td.numeric-cell {
          color: var(--color-primary-accent);
          text-shadow: 0 0 10px var(--color-accent-glow);
        }

        .checkout-btn {
          width: 100%;
          text-align: center;
          background: var(--color-primary-accent);
          color: #000000;
          border: 1px solid var(--color-primary-accent);
          border-radius: 4px;
          padding: 16px;
          font-family: var(--font-technical);
          font-weight: 700;
          letter-spacing: 2px;
          cursor: pointer;
          transition: all 0.25s ease;
          box-shadow: 0 0 15px var(--color-accent-glow);
        }
        .checkout-btn:hover {
          background: #b4ff33;
          box-shadow: 0 0 25px var(--color-primary-accent);
          transform: translateY(-2px);
        }

        /* Search Panel overlay inline */
        .search-container-bar {
          background: var(--color-surface-panel);
          border: 1px solid var(--color-border-system);
          padding: 12px 24px;
          margin-top: 20px;
          display: flex;
          align-items: center;
          gap: 16px;
          border-radius: 4px;
        }
        .search-input-field {
          background: transparent;
          border: none;
          outline: none;
          color: var(--color-text);
          font-family: var(--font-technical);
          font-size: 0.9rem;
          flex-grow: 1;
        }
        .search-input-field::placeholder {
          color: var(--color-text-secondary);
        }

        /* Animations */
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        @keyframes float-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }
        @keyframes pulse-glow {
          0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(163, 255, 18, 0.7); }
          70% { transform: scale(1.1); box-shadow: 0 0 0 10px rgba(163, 255, 18, 0); }
          100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(163, 255, 18, 0); }
        }

        /* Responsive Breakpoints */
        @media (max-width: 1024px) {
          .hero-command-grid {
            grid-template-columns: 1fr 1fr;
          }
          .telemetry-panel {
            grid-column: span 2;
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 16px;
          }
        }

        @media (max-width: 768px) {
          .navbar-sticky {
            padding: 0 16px;
          }
          .navbar-links {
            display: none; /* simple elegant collapse as per guidelines */
          }
          .hero-command-grid {
            grid-template-columns: 1fr;
            gap: 24px;
          }
          .telemetry-panel {
            grid-column: span 1;
            grid-template-columns: 1fr;
          }
          .cart-drawer-panel {
            width: 100%;
          }
          .hero-heading {
            font-size: 2.8rem;
          }
        }
      `}</style>

      {/* Navigation bar */}
      <nav className="navbar-sticky">
        <div className="navbar-brand" onClick={() => setSelectedVariantId('ctrl-volt')}>
          GAMEOVER<span className="cursor-underscore">_</span>
        </div>
        
        <div className="navbar-links">
          <span className="navbar-link-item">STORE</span>
          <span className="navbar-link-item">PRODUCTS</span>
          <span className="navbar-link-item">ECOSYSTEM</span>
          <span className="navbar-link-item">TECH</span>
          <span className="navbar-link-item">SUPPORT</span>
        </div>

        <div className="navbar-actions">
          <button className="navbar-action-btn" onClick={() => alert('Accessing secure terminal portal...')}>
            LOGIN
          </button>
          
          <button className="navbar-action-btn" onClick={() => setIsSearchVisible(prev => !prev)}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            SEARCH
          </button>

          <button className="navbar-action-btn cart-trigger-container" onClick={() => setIsCartOpen(true)}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
            CART
            {totals.itemsCount > 0 && (
              <span className={`cart-badge ${cartUpdated ? 'cart-badge-pulse' : ''}`}>
                {totals.itemsCount}
              </span>
            )}
          </button>
        </div>
      </nav>

      <main className="layout-wrapper">
        {/* Inline Search Bar (toggled by SEARCH nav action) */}
        {isSearchVisible && (
          <div className="search-container-bar">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{color: 'var(--color-primary-accent)'}}><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            <input 
              type="text" 
              className="search-input-field" 
              placeholder="SEARCH PROTOCOLS: TYPE HARDWARE NAME..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus
            />
            {searchQuery && (
              <button className="cart-close-btn" style={{fontSize: '0.85rem'}} onClick={() => setSearchQuery('')}>[RESET]</button>
            )}
          </div>
        )}

        {/* Hero Command Center */}
        <section className="hero-command-grid">
          {/* Left Column: Configuration Console */}
          <div className="console-panel">
            <div>
              <div className="pro-label-box">
                [ PRO SERIES ]
              </div>
              
              <h1 className="hero-heading">
                NEXT LEVEL<br />
                <span className="accent-highlight">CONTROL</span><br />
                SYSTEM
              </h1>
              
              <p className="hero-desc">
                Engineered for elite esports specialists. The ultimate low-latency modular gaming input array, calibrated to military specification with premium hybrid switches and tactical customization nodes.
              </p>
            </div>

            <div>
              <div className="cta-buttons-stack">
                <button 
                  className="btn-primary-filled" 
                  onClick={() => addToCart(activeVariant)}
                >
                  EXECUTE PURCHASE
                </button>
                <button 
                  className="btn-secondary-outlined" 
                  onClick={() => addToCart(activeVariant)}
                >
                  ADD TO LOADOUT
                </button>
              </div>

              {/* Variant System Selector */}
              <div className="variant-selector-module">
                <div className="system-node-display">
                  // system_node: <span className="node-value">[{activeVariant.label.toUpperCase()}]</span>
                </div>
                <div className="variant-nodes-flex">
                  <button 
                    className={`variant-node-btn ${selectedVariantId === 'ctrl-volt' ? 'active' : ''}`}
                    onClick={() => setSelectedVariantId('ctrl-volt')}
                    title="Volt Green Special"
                  >
                    <div className="color-fill-volt" />
                  </button>
                  <button 
                    className={`variant-node-btn ${selectedVariantId === 'ctrl-blue' ? 'active' : ''}`}
                    onClick={() => setSelectedVariantId('ctrl-blue')}
                    title="Cobalt Element"
                  >
                    <div className="color-fill-blue" />
                  </button>
                  <button 
                    className={`variant-node-btn ${selectedVariantId === 'ctrl-white' ? 'active' : ''}`}
                    onClick={() => setSelectedVariantId('ctrl-white')}
                    title="Alabaster Core"
                  >
                    <div className="color-fill-white" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Center Column: Hardware Render */}
          <div className="hero-render-panel">
            <div className="hero-glow-depth" />
            <div 
              className="hero-image-wrapper"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={tiltStyle}
            >
              <img 
                src={activeVariant.img} 
                alt={activeVariant.label} 
                className="hero-image-render"
              />
            </div>
          </div>

          {/* Right Column: Telemetry Stack */}
          <div className="telemetry-panel">
            <div className="telemetry-module-card">
              <div className="telemetry-icon-box">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="22" y1="12" x2="18" y2="12"></line><line x1="6" y1="12" x2="2" y2="12"></line><line x1="12" y1="6" x2="12" y2="2"></line><line x1="12" y1="22" x2="12" y2="18"></line></svg>
              </div>
              <div className="telemetry-labels">
                <span className="telemetry-subtitle">ULTRA RESPONSE</span>
                <span className="telemetry-title">0.2MS INPUT</span>
              </div>
            </div>

            <div className="telemetry-module-card">
              <div className="telemetry-icon-box">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="22" y1="12" x2="18" y2="12"></line><line x1="6" y1="12" x2="2" y2="12"></line><line x1="12" y1="6" x2="12" y2="2"></line><line x1="12" y1="22" x2="12" y2="18"></line></svg>
              </div>
              <div className="telemetry-labels">
                <span className="telemetry-subtitle">ADAPTIVE TRIGGER</span>
                <span className="telemetry-title">HAPTIC ENGINE</span>
              </div>
            </div>

            <div className="telemetry-module-card">
              <div className="telemetry-icon-box">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="22" y1="12" x2="18" y2="12"></line><line x1="6" y1="12" x2="2" y2="12"></line><line x1="12" y1="6" x2="12" y2="2"></line><line x1="12" y1="22" x2="12" y2="18"></line></svg>
              </div>
              <div className="telemetry-labels">
                <span className="telemetry-subtitle">MULTI-DEVICE</span>
                <span className="telemetry-title">SYNC PROTOCOL</span>
              </div>
            </div>

            <div className="telemetry-module-card">
              <div className="telemetry-icon-box">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="22" y1="12" x2="18" y2="12"></line><line x1="6" y1="12" x2="2" y2="12"></line><line x1="12" y1="6" x2="12" y2="2"></line><line x1="12" y1="22" x2="12" y2="18"></line></svg>
              </div>
              <div className="telemetry-labels">
                <span className="telemetry-subtitle">TOURNAMENT</span>
                <span className="telemetry-title">CERTIFIED BUILD</span>
              </div>
            </div>
          </div>
        </section>

        {/* Compatibility Ribbon */}
        <section className="compatibility-ribbon-bar">
          <div className="ribbon-flex">
            <span className="ribbon-header">WORKS_WITH //</span>
            <div className="ribbon-chips-grid">
              <span className="compatibility-chip">CONSOLES</span>
              <span className="compatibility-chip">WINDOWS_PC</span>
              <span className="compatibility-chip">IOS</span>
              <span className="compatibility-chip">ANDROID</span>
            </div>
          </div>
        </section>

        {/* Ecosystem Section Header */}
        <section className="ecosystem-header-block">
          <div className="ecosystem-tech-label">// ECOSYSTEM_COMPLEMENTS</div>
          <h2 className="ecosystem-heading">Complete Your Battle Station</h2>
        </section>

        {/* Product Grid */}
        <section className="products-grid-container">
          {remainingProducts.length > 0 ? (
            remainingProducts.map((product) => (
              <div key={product.id} className="product-card">
                <div className="product-card-image-box">
                  <img src={product.img} alt={product.label} className="product-card-img" />
                </div>
                <div className="product-card-info">
                  <div>
                    <div className="product-sku">SKU-{product.id} // SECURE_NODE</div>
                    <h3 className="product-title">{product.label}</h3>
                  </div>
                  <div className="product-footer-flex">
                    <span className="product-price-label">${product.value.toFixed(2)}</span>
                    <button 
                      className="product-add-btn" 
                      onClick={() => addToCart(product)}
                    >
                      ADD_TO_CART
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="tech-mono" style={{gridColumn: '1 / -1', textAlign: 'center', padding: '40px', color: 'var(--color-text-secondary)'}}>
              NO HARDWARE DETECTED IN ACTIVE SIGNALS
            </div>
          )}
        </section>
      </main>

      {/* Cart Drawer sliding out */}
      <div className={`cart-overlay ${isCartOpen ? 'open' : ''}`} onClick={() => setIsCartOpen(false)}>
        <div className="cart-drawer-panel" onClick={(e) => e.stopPropagation()}>
          <div className="cart-header">
            <span className="cart-header-title">ORDER_PROTOCOL</span>
            <button className="cart-close-btn" onClick={() => setIsCartOpen(false)}>[CLOSE]</button>
          </div>

          <div className="cart-items-container">
            {cart.length === 0 ? (
              <div className="cart-empty-state">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" style={{color: 'var(--color-text-secondary)'}}><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
                <span className="tech-mono" style={{fontSize: '0.8rem'}}>LOADOUT IS CURRENTLY EMPTY</span>
              </div>
            ) : (
              cart.map((item) => (
                <div key={item.id} className="cart-item-row">
                  <div className="cart-item-details">
                    <div className="cart-item-name">{item.label}</div>
                    <div className="cart-item-meta">
                      UNIT PRICE: ${item.value.toFixed(2)}
                    </div>
                  </div>
                  <div className="cart-item-controls-col">
                    <div className="cart-item-actions">
                      <button className="cart-qty-btn" onClick={() => decreaseQty(item.id)}>-</button>
                      <span className="cart-qty-value">{item.quantity}</span>
                      <button className="cart-qty-btn" onClick={() => increaseQty(item.id)}>+</button>
                    </div>
                    <button className="cart-item-remove" onClick={() => removeFromCart(item.id)}>
                      [REMOVE]
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="cart-footer">
            <table className="cart-totals-table">
              <tbody>
                <tr>
                  <td>ITEMS ACTIVE</td>
                  <td className="numeric-cell">{totals.itemsCount}</td>
                </tr>
                <tr>
                  <td>SUBTOTAL</td>
                  <td className="numeric-cell">${totals.subtotal.toFixed(2)}</td>
                </tr>
                <tr>
                  <td>SYSTEM FEES (8%)</td>
                  <td className="numeric-cell">${totals.systemFees.toFixed(2)}</td>
                </tr>
                <tr className="total-row">
                  <td>TOTAL LEVEL</td>
                  <td className="numeric-cell">${totals.total.toFixed(2)}</td>
                </tr>
              </tbody>
            </table>

            <button 
              className="checkout-btn" 
              onClick={() => {
                if (cart.length > 0) {
                  alert(`ORDER PROTOCOL SENT // TRANSACTION TOTAL: $${totals.total.toFixed(2)}\nSECURE COMMENCE DEPLOYMENT INTEL SENT.`);
                  setCart([]);
                  setIsCartOpen(false);
                } else {
                  alert('LOADOUT EMPTY. PLEASE SELECT SYSTEMS.');
                }
              }}
            >
              EXECUTE ORDER PROTOCOL
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}