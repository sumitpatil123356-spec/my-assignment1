import { useState, useMemo } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CartDrawer from '../components/CartDrawer';
import { useAuth } from '../hooks/useAuth';

export default function AppLayout() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchVisible, setIsSearchVisible] = useState(false);

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

  const handleProceedToCheckout = () => {
    if (cart.length === 0) {
      alert('Your cart is empty. Please add some items before checking out.');
      return;
    }
    setIsCartOpen(false);
    navigate('/payment');
  };

  return (
    <div className="app-container">
      <Navbar
        onCartClick={() => setIsCartOpen(true)}
        itemsCount={totals.itemsCount}
        onSearchToggle={() => setIsSearchVisible(prev => !prev)}
      />

      <main className="layout-wrapper" style={{ minHeight: 'calc(100vh - 280px)', paddingBottom: '60px' }}>
        {isSearchVisible && (
          <div className="search-container-bar">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--color-primary-accent)' }}><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            <input
              type="text"
              className="search-input-field"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus
            />
            {searchQuery && (
              <button className="cart-close-btn" style={{ fontSize: '0.85rem' }} onClick={() => setSearchQuery('')}>Clear</button>
            )}
          </div>
        )}

        <Outlet context={{
          cart,
          setCart,
          addToCart,
          removeFromCart,
          increaseQty,
          decreaseQty,
          totals,
          setIsCartOpen,
          searchQuery,
          setSearchQuery,
          isSearchVisible,
          setIsSearchVisible
        }} />
      </main>

      <Footer />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        increaseQty={increaseQty}
        decreaseQty={decreaseQty}
        removeFromCart={removeFromCart}
        totals={totals}
        onCheckout={handleProceedToCheckout}
      />
    </div>
  );
}
