import React from 'react';

function CartDrawer({ isOpen, onClose, cartItems, onRemoveItem }) {
  if (!isOpen) return null;
  const totalCost = cartItems.reduce((acc, item) => acc + (item.value * item.quantity), 0);

  return (
    <div style={styles.overlay}>
      <div style={styles.backdrop} onClick={onClose}></div>
      <div style={styles.drawer}>
        <div style={styles.header}>
          <h3 style={styles.title} className="tech-mono">// MANIFEST_[{cartItems.length}]</h3>
          <button onClick={onClose} style={styles.closeBtn}>✕</button>
        </div>
        
        <div style={styles.body}>
          {cartItems.length === 0 ? (
            <p style={styles.emptyMsg} className="tech-mono">SYSTEM_CART_EMPTY</p>
          ) : (
            cartItems.map((item) => (
              <div key={item.id} style={styles.cartItem}>
                <div style={styles.itemMeta}>
                  <h5 style={styles.itemName}>{item.label}</h5>
                  <p style={styles.itemPrice} className="tech-mono">{item.quantity} x ${item.value.toFixed(2)}</p>
                </div>
                <button onClick={() => onRemoveItem(item.id)} style={styles.removeBtn} className="tech-mono">[X]</button>
              </div>
            ))
          )}
        </div>

        {cartItems.length > 0 && (
          <div style={styles.footer}>
            <div style={styles.totalRow}>
              <span className="tech-mono">AGGREGATE_TOTAL:</span>
              <span style={styles.totalPrice} className="tech-mono">${totalCost.toFixed(2)}</span>
            </div>
            <button onClick={() => alert('Order initialized. Transmitting parameters.')} style={styles.checkoutBtn} className="tech-mono">
              Execute Order Protocol
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  overlay: { position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 1000 },
  backdrop: { position: 'absolute', width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(6px)' },
  drawer: { position: 'absolute', right: 0, width: '360px', height: '100%', backgroundColor: 'var(--bg-surface)', borderLeft: '1px solid var(--border-technical)', display: 'flex', flexDirection: 'column' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '24px', borderBottom: '1px solid var(--border-technical)' },
  title: { fontSize: '13px', color: 'var(--brand-primary)' },
  closeBtn: { background: 'none', border: 'none', color: 'var(--text-main)', cursor: 'pointer', fontSize: '14px' },
  body: { flexGrow: 1, padding: '24px', overflowY: 'auto' },
  emptyMsg: { textAlign: 'center', color: 'var(--text-muted)', marginTop: '40px', fontSize: '11px' },
  cartItem: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '16px', marginBottom: '16px', borderBottom: '1px solid var(--border-technical)' },
  itemMeta: { display: 'flex', flexDirection: 'column', gap: '4px' },
  itemName: { fontSize: '13px', fontWeight: '600' },
  itemPrice: { fontSize: '12px', color: 'var(--brand-primary)' },
  removeBtn: { background: 'none', border: 'none', color: '#ff4d4d', cursor: 'pointer', fontSize: '12px' },
  footer: { padding: '24px', borderTop: '1px solid var(--border-technical)', backgroundColor: 'var(--bg-canvas)' },
  totalRow: { display: 'flex', justifyContent: 'space-between', marginBottom: '20px', fontSize: '13px' },
  totalPrice: { color: 'var(--brand-primary)', fontWeight: '700' },
  checkoutBtn: { width: '100%', padding: '14px', backgroundColor: 'var(--brand-primary)', color: '#000', border: 'none', borderRadius: 'var(--radius-sharp)', fontWeight: '700', cursor: 'pointer', fontSize: '12px' }
};

export default CartDrawer;