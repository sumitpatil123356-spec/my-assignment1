export default function CartDrawer({
  isOpen,
  onClose,
  cart,
  increaseQty,
  decreaseQty,
  removeFromCart,
  totals,
  onCheckout
}) {
  return (
    <div className={`cart-overlay ${isOpen ? 'open' : ''}`} onClick={onClose}>
      <div className="cart-drawer-panel" onClick={(e) => e.stopPropagation()}>
        <div className="cart-header">
          <span className="cart-header-title">Cart</span>
          <button className="cart-close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="cart-items-container">
          {cart.length === 0 ? (
            <div className="cart-empty-state">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--color-text-secondary)' }}><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
              <span style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>Your cart is empty</span>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="cart-item-row">
                <div className="cart-item-details">
                  <div className="cart-item-name">{item.label}</div>
                  <div className="cart-item-meta">
                    ${Number(item.value).toFixed(2)} each
                  </div>
                </div>
                <div className="cart-item-controls-col">
                  <div className="cart-item-actions">
                    <button className="cart-qty-btn" onClick={() => decreaseQty(item.id)}>−</button>
                    <span className="cart-qty-value">{item.quantity}</span>
                    <button className="cart-qty-btn" onClick={() => increaseQty(item.id)}>+</button>
                  </div>
                  <button className="cart-item-remove" onClick={() => removeFromCart(item.id)}>
                    Remove
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="cart-footer">
            <table className="cart-totals-table">
              <tbody>
                <tr>
                  <td>Items</td>
                  <td className="numeric-cell">{totals.itemsCount}</td>
                </tr>
                <tr>
                  <td>Subtotal</td>
                  <td className="numeric-cell">${totals.subtotal.toFixed(2)}</td>
                </tr>
                <tr>
                  <td>Tax (8%)</td>
                  <td className="numeric-cell">${totals.systemFees.toFixed(2)}</td>
                </tr>
                <tr className="total-row">
                  <td>Total</td>
                  <td className="numeric-cell">${totals.total.toFixed(2)}</td>
                </tr>
              </tbody>
            </table>

            <button className="checkout-btn" onClick={onCheckout}>
              Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}