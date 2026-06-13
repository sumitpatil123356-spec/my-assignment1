export default function ProductGrid({ products, onAddToCart }) {
  return (
    <section className="products-grid-container">
      {products.length > 0 ? (
        products.map((product) => (
          <div key={product.id} className="product-card">
            <div className="product-card-image-box">
              <img src={product.img} alt={product.label} className="product-card-img" />
            </div>
            <div className="product-card-info">
              <div>
                <div className="product-sku">{product.category || 'General'}</div>
                <h3 className="product-title">{product.label}</h3>
              </div>
              <div className="product-footer-flex">
                <span className="product-price-label">${Number(product.value).toFixed(2)}</span>
                <button
                  className="product-add-btn"
                  onClick={() => onAddToCart(product)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px', color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>
          No products found.
        </div>
      )}
    </section>
  );
}