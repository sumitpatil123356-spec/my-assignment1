import { useState } from 'react';
import { useOutletContext, useNavigate, Navigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useAuth } from '../hooks/useAuth';

export default function Payment() {
  const { cart, totals, setCart } = useOutletContext();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    cardNumber: '',
    expiry: '',
    cvc: '',
    address: ''
  });
  const [isProcessing, setIsProcessing] = useState(false);

  // If the cart is empty, redirect back to home
  if (cart.length === 0) {
    return <Navigate to="/" replace />;
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      // Simulate network delay for payment gateway
      await new Promise(resolve => setTimeout(resolve, 1500));

      let orderId = `ORDER-${Math.floor(Math.random() * 1000000)}`;

      try {
        // Try inserting into Supabase
        const { data: orderData, error: orderError } = await supabase
          .from('orders')
          .insert({
            user_id: user?.id || null,
            total_price: totals.total,
            status: 'completed'
          })
          .select()
          .single();

        if (orderError) throw orderError;
        orderId = orderData.id;

        const orderItems = cart.map(item => ({
          order_id: orderId,
          product_id: item.id,
          quantity: item.quantity,
          price: item.value
        }));

        const { error: itemsError } = await supabase.from('order_items').insert(orderItems);
        if (itemsError) throw itemsError;

        await supabase.from('transactions_log').insert({
          user_id: user?.id || null,
          action: 'ORDER_COMPLETION',
          details: { order_id: orderId, total: totals.total, payment_method: 'credit_card' }
        });

      } catch (dbError) {
        // Fallback to LocalStorage if Supabase is disconnected or RLS fails
        console.warn('Supabase insert failed, falling back to local storage:', dbError);
        
        const localOrders = JSON.parse(localStorage.getItem('localOrders') || '[]');
        localOrders.push({ id: orderId, total_price: totals.total, created_at: new Date().toISOString() });
        localStorage.setItem('localOrders', JSON.stringify(localOrders));

        const localLogs = JSON.parse(localStorage.getItem('localTransactions') || '[]');
        localLogs.push({ id: `TX-${Math.floor(Math.random()*10000)}`, action: 'ORDER_COMPLETION', created_at: new Date().toISOString(), details: { order_id: orderId, total: totals.total } });
        localStorage.setItem('localTransactions', JSON.stringify(localLogs));
      }

      alert(`Payment successful! Your order ID is ${orderId}. Thank you for shopping with Nexus Gear.`);
      setCart([]); // Clear the cart
      navigate('/', { replace: true });

    } catch (err) {
      console.error('Checkout protocol failure:', err);
      alert(`Payment failed: ${err.message || 'Unknown error.'}`);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Checkout</h1>
      
      <div style={styles.grid}>
        {/* Order Summary */}
        <div style={styles.summaryPanel}>
          <h2 style={styles.subtitle}>Order Summary</h2>
          <div style={styles.cartList}>
            {cart.map(item => (
              <div key={item.id} style={styles.cartItem}>
                <span>{item.quantity}x {item.label}</span>
                <span>${(item.value * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <hr style={styles.divider} />
          <div style={styles.totalRow}>
            <span>Subtotal</span>
            <span>${totals.subtotal.toFixed(2)}</span>
          </div>
          <div style={styles.totalRow}>
            <span>Tax (8%)</span>
            <span>${totals.systemFees.toFixed(2)}</span>
          </div>
          <div style={{ ...styles.totalRow, fontWeight: '700', fontSize: '1.2rem', marginTop: '12px' }}>
            <span>Total</span>
            <span style={{ color: 'var(--color-primary-accent)' }}>${totals.total.toFixed(2)}</span>
          </div>
        </div>

        {/* Payment Form */}
        <div style={styles.paymentPanel}>
          <h2 style={styles.subtitle}>Payment Details</h2>
          <form onSubmit={handlePaymentSubmit} style={styles.form}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Full Name</label>
              <input 
                type="text" 
                name="name" 
                required 
                value={formData.name} 
                onChange={handleInputChange} 
                placeholder="John Doe" 
                style={styles.input} 
              />
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Shipping Address</label>
              <input 
                type="text" 
                name="address" 
                required 
                value={formData.address} 
                onChange={handleInputChange} 
                placeholder="123 Gaming Street, NY" 
                style={styles.input} 
              />
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Card Number</label>
              <input 
                type="text" 
                name="cardNumber" 
                required 
                maxLength="19"
                value={formData.cardNumber} 
                onChange={handleInputChange} 
                placeholder="0000 0000 0000 0000" 
                style={styles.input} 
              />
            </div>

            <div style={styles.rowGrid}>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Expiry Date</label>
                <input 
                  type="text" 
                  name="expiry" 
                  required 
                  maxLength="5"
                  value={formData.expiry} 
                  onChange={handleInputChange} 
                  placeholder="MM/YY" 
                  style={styles.input} 
                />
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>CVC</label>
                <input 
                  type="text" 
                  name="cvc" 
                  required 
                  maxLength="4"
                  value={formData.cvc} 
                  onChange={handleInputChange} 
                  placeholder="123" 
                  style={styles.input} 
                />
              </div>
            </div>

            <button 
              type="submit" 
              style={styles.submitBtn} 
              disabled={isProcessing}
            >
              {isProcessing ? 'Processing...' : `Pay $${totals.total.toFixed(2)}`}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '1000px',
    margin: '0 auto',
    padding: '40px 24px',
  },
  title: {
    fontSize: '2rem',
    fontWeight: '900',
    marginBottom: '32px',
    color: 'var(--color-text)',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1.5fr',
    gap: '32px',
    alignItems: 'start',
  },
  summaryPanel: {
    backgroundColor: 'var(--color-surface-panel)',
    border: '1px solid var(--color-border-system)',
    padding: '24px',
    borderRadius: '8px',
  },
  paymentPanel: {
    backgroundColor: 'var(--color-surface-panel)',
    border: '1px solid var(--color-border-system)',
    padding: '32px',
    borderRadius: '8px',
  },
  subtitle: {
    fontSize: '1.2rem',
    fontWeight: '700',
    marginBottom: '24px',
    color: 'var(--color-text)',
  },
  cartList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    marginBottom: '24px',
  },
  cartItem: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '0.9rem',
    color: 'var(--color-text-secondary)',
  },
  divider: {
    border: '0',
    height: '1px',
    backgroundColor: 'var(--color-border-system)',
    margin: '16px 0',
  },
  totalRow: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '8px',
    color: 'var(--color-text)',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  label: {
    fontSize: '0.85rem',
    color: 'var(--color-text-secondary)',
  },
  input: {
    backgroundColor: '#000000',
    border: '1px solid var(--color-border-system)',
    padding: '12px 16px',
    color: 'var(--color-text)',
    borderRadius: '4px',
    outline: 'none',
    fontSize: '0.95rem',
  },
  rowGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '20px',
  },
  submitBtn: {
    backgroundColor: 'var(--color-primary-accent)',
    color: '#000000',
    border: 'none',
    padding: '16px',
    borderRadius: '4px',
    fontWeight: '700',
    fontSize: '1rem',
    cursor: 'pointer',
    marginTop: '12px',
    transition: 'all 0.2s',
  }
};
