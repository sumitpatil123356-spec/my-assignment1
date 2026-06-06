import React from 'react';

function ProductList() {
  const products = [
    { id: 1, name: 'Green Broccoli Mouse', price: '$8.00', oldPrice: '$12.00', icon: '🖱️', discount: '-33%' },
    { id: 2, name: 'Gaming Logi G Pro X', price: '$30.00', oldPrice: '$45.00', icon: '🎧', discount: '-33%' },
    { id: 3, name: 'Vortex Gamepad', price: '$12.00', oldPrice: '', icon: '🎮', discount: '' },
    { id: 4, name: 'Precision Alpha', price: '$30.00', oldPrice: '', icon: '🖱️', discount: '' },
    { id: 5, name: 'Onyx Enforcer', price: '$18.00', oldPrice: '', icon: '⌨️', discount: '' },
  ];

  return (
    <div style={styles.section}>
      <div style={styles.header}>
        <div>
          <h2 style={styles.heading}>Our Product's</h2>
          <p style={styles.sub}>Master Your Battleground! Elevate Your Game With Our Elite-Reviewed Gear.</p>
        </div>
      </div>
      
      <div style={styles.grid}>
        {products.map((p) => (
          <div key={p.id} style={styles.card}>
            {p.discount && <span style={styles.badge}>{p.discount}</span>}
            <div style={styles.imgWrap}>{p.icon}</div>
            <h4 style={styles.pName}>{p.name}</h4>
            <div style={styles.stars}>⭐⭐⭐⭐⭐</div>
            <div style={styles.priceRow}>
              <span style={styles.price}>{p.price}</span>
              {p.oldPrice && <span style={styles.oldPrice}>{p.oldPrice}</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  section: {
    padding: '40px 8% 80px 8%',
  },
  header: {
    marginBottom: '35px',
  },
  heading: {
    fontSize: '24px',
    fontWeight: '700',
  },
  sub: {
    fontSize: '14px',
    color: 'var(--text-muted)',
    marginTop: '5px',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
    gap: '20px',
  },
  card: {
    backgroundColor: '#fff',
    border: '1px solid #f0f0f0',
    borderRadius: '8px',
    padding: '20px',
    position: 'relative',
    textAlign: 'center',
  },
  badge: {
    position: 'absolute',
    top: '10px',
    left: '10px',
    backgroundColor: 'var(--accent-pink)',
    color: 'white',
    fontSize: '11px',
    fontWeight: '600',
    padding: '2px 6px',
    borderRadius: '4px',
  },
  imgWrap: {
    height: '130px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '50px',
    backgroundColor: '#fdfdfd',
    borderRadius: '6px',
    marginBottom: '15px',
  },
  pName: {
    fontSize: '14px',
    fontWeight: '600',
    marginBottom: '5px',
    color: 'var(--text-dark)',
  },
  stars: {
    fontSize: '12px',
    marginBottom: '10px',
  },
  priceRow: {
    display: 'flex',
    justifyContent: 'center',
    gap: '10px',
    alignItems: 'center',
  },
  price: {
    fontWeight: '700',
    color: 'var(--text-dark)',
  },
  oldPrice: {
    fontSize: '13px',
    color: '#a0a0a0',
    textDecoration: 'line-through',
  },
};

export default ProductList;