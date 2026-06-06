import React from 'react';

function Categories({ activeCategory, onCategorySelect }) {
  const catalog = [
    { id: 'All', label: 'All Hardware', img: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=120&q=80' },
    { id: 'Keyboards', label: 'Keyboards', img: 'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?auto=format&fit=crop&w=120&q=80' },
    { id: 'Mice', label: 'Precision Mice', img: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=120&q=80' },
    { id: 'Audio', label: 'Pro Headsets', img: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=120&q=80' },
    { id: 'Controllers', label: 'Elite Gamepads', img: 'https://images.unsplash.com/photo-1592840496694-26d035b52b48?auto=format&fit=crop&w=120&q=80' },
  ];

  return (
    <section style={styles.wrapper}>
      <div style={styles.gridContainer}>
        {catalog.map((item) => {
          const isSelected = activeCategory === item.id;
          return (
            <div 
              key={item.id} 
              onClick={() => onCategorySelect(item.id)}
              className="interactive-card" 
              style={{
                ...styles.catCard,
                borderColor: isSelected ? 'var(--brand-primary)' : 'var(--border-subtle)',
                boxShadow: isSelected ? '0 8px 20px rgba(255, 51, 102, 0.06)' : 'none'
              }}
            >
              <img src={item.img} alt={item.label} style={styles.catImage} />
              <h4 style={styles.title}>{item.label}</h4>
            </div>
          );
        })}
      </div>
    </section>
  );
}

const styles = {
  wrapper: { padding: '40px 8% 20px 8%' },
  gridContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
    gap: '20px',
  },
  catCard: {
    padding: '16px',
    textAlign: 'center',
    cursor: 'pointer',
    userSelect: 'none',
  },
  catImage: {
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    objectFit: 'cover',
    marginBottom: '12px',
  },
  title: { fontSize: '13px', fontWeight: '600' },
};

export default Categories;