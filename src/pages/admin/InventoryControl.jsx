import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';

const FALLBACK_PRODUCTS = [
  { id: 'ctrl-volt', label: 'Volt Green Special', value: 169.00, img: 'https://images.unsplash.com/photo-1600861195091-690c92f1d2cc?auto=format&fit=crop&w=600&q=80', category: 'Controllers' },
  { id: 'ctrl-blue', label: 'Cobalt Element', value: 159.00, img: 'https://images.unsplash.com/photo-1592840496694-26d035b52b48?auto=format&fit=crop&w=600&q=80', category: 'Controllers' },
  { id: '20', label: 'Mechanical Core TKL Keyboard', value: 125.00, img: 'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?auto=format&fit=crop&w=400&q=80', category: 'Keyboards' },
];

function loadProducts(setProducts) {
  supabase
    .from('products')
    .select('*')
    .then(({ data, error }) => {
      if (!error && data && data.length > 0) {
        setProducts(data);
      } else {
        const local = localStorage.getItem('localProducts');
        if (local) setProducts(JSON.parse(local));
        else setProducts(FALLBACK_PRODUCTS);
      }
    });
}

export default function InventoryControl() {
  const [products, setProducts] = useState(FALLBACK_PRODUCTS);
  const [form, setForm] = useState({ id: '', label: '', value: '', img: '', category: 'Controllers' });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    loadProducts(setProducts);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      id: form.id,
      label: form.label,
      value: Number(form.value),
      img: form.img,
      category: form.category,
    };

    const { error } = await supabase.from('products').upsert(payload);

    if (error) {
      // Optimistic local update on DB failure
      const existingIdx = products.findIndex(p => p.id === form.id);
      let next;
      if (existingIdx > -1) {
        next = [...products];
        next[existingIdx] = { ...form, value: Number(form.value) };
      } else {
        next = [...products, { ...form, value: Number(form.value) }];
      }
      setProducts(next);
      localStorage.setItem('localProducts', JSON.stringify(next));
      alert('Added locally. It will now appear in the storefront.');
    } else {
      alert('Inventory updated successfully.');
      loadProducts(setProducts);
    }

    setForm({ id: '', label: '', value: '', img: '', category: 'Controllers' });
    setIsEditing(false);
  };

  const handleEdit = (prod) => {
    setForm(prod);
    setIsEditing(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    const { error } = await supabase.from('products').delete().eq('id', id);
    if (error) {
      const next = products.filter(p => p.id !== id);
      setProducts(next);
      localStorage.setItem('localProducts', JSON.stringify(next));
      alert('Deleted locally.');
    } else {
      loadProducts(setProducts);
    }
  };

  return (
    <div>
      <div style={styles.header}>
        <h1 style={styles.title}>Inventory Management</h1>
        <p style={styles.subtitle}>Manage your product catalog.</p>
      </div>

      <div style={styles.columns}>
        {/* CRUD Form */}
        <div style={styles.formPanel}>
          <h3 style={styles.subHeading}>
            {isEditing ? 'Edit Product' : 'Add New Product'}
          </h3>
          <form onSubmit={handleSubmit} style={styles.form}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>SKU / ID (Unique)</label>
              <input
                type="text"
                required
                disabled={isEditing}
                placeholder="e.g. ctrl-neon"
                value={form.id}
                onChange={(e) => setForm({ ...form, id: e.target.value })}
                style={styles.input}
              />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Product Name</label>
              <input
                type="text"
                required
                placeholder="e.g. Proton Special Edition"
                value={form.label}
                onChange={(e) => setForm({ ...form, label: e.target.value })}
                style={styles.input}
              />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Price ($ USD)</label>
              <input
                type="number"
                step="0.01"
                required
                placeholder="159.00"
                value={form.value}
                onChange={(e) => setForm({ ...form, value: e.target.value })}
                style={styles.input}
              />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Image URL</label>
              <input
                type="text"
                required
                placeholder="https://images.unsplash.com/..."
                value={form.img}
                onChange={(e) => setForm({ ...form, img: e.target.value })}
                style={styles.input}
              />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Category</label>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                style={styles.select}
              >
                <option value="Controllers">Controllers</option>
                <option value="Keyboards">Keyboards</option>
                <option value="Mice">Mice</option>
                <option value="Audio">Audio</option>
                <option value="Accessories">Accessories</option>
                <option value="Displays">Displays</option>
              </select>
            </div>
            <div style={styles.btnRow}>
              <button type="submit" style={styles.submitBtn}>
                {isEditing ? 'Save Changes' : 'Add Product'}
              </button>
              {isEditing && (
                <button
                  type="button"
                  onClick={() => {
                    setIsEditing(false);
                    setForm({ id: '', label: '', value: '', img: '', category: 'Controllers' });
                  }}
                  style={styles.cancelBtn}
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Inventory List */}
        <div style={styles.listPanel}>
          <h3 style={styles.subHeading}>Current Inventory</h3>
          <div style={styles.listContainer}>
            {products.map((prod) => (
              <div key={prod.id} style={styles.itemRow}>
                <img src={prod.img} alt={prod.label} style={styles.itemThumb} />
                <div style={styles.itemDetails}>
                  <div style={styles.itemTitle}>{prod.label}</div>
                  <div style={styles.itemMeta}>
                    ID: {prod.id} | ${Number(prod.value).toFixed(2)} | {prod.category}
                  </div>
                </div>
                <div style={styles.itemActions}>
                  <button onClick={() => handleEdit(prod)} style={styles.editBtn}>
                    Edit
                  </button>
                  <button onClick={() => handleDelete(prod.id)} style={styles.deleteBtn}>
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  header: { marginBottom: '40px' },
  title: { fontSize: '1.5rem', fontWeight: '700', color: 'var(--color-primary-accent)', marginBottom: '8px' },
  subtitle: { fontSize: '0.85rem', color: 'var(--color-text-secondary)' },
  columns: { display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '32px', alignItems: 'start' },
  formPanel: { backgroundColor: 'var(--color-surface-panel)', border: '1px solid var(--color-border-system)', padding: '24px', borderRadius: '4px' },
  subHeading: { fontSize: '0.85rem', color: 'var(--color-text)', marginBottom: '20px', letterSpacing: '1px' },
  form: { display: 'flex', flexDirection: 'column', gap: '16px' },
  inputGroup: { display: 'flex', flexDirection: 'column', gap: '8px' },
  label: { fontSize: '0.7rem', color: 'var(--color-text-secondary)' },
  input: { backgroundColor: '#000000', border: '1px solid var(--color-border-system)', padding: '12px', color: 'var(--color-text)', borderRadius: '4px', outline: 'none', fontFamily: 'var(--font-technical)', fontSize: '0.8rem' },
  select: { backgroundColor: '#000000', border: '1px solid var(--color-border-system)', padding: '12px', color: 'var(--color-text)', borderRadius: '4px', outline: 'none', fontFamily: 'var(--font-technical)', fontSize: '0.8rem' },
  btnRow: { display: 'flex', gap: '12px', marginTop: '8px' },
  submitBtn: { flexGrow: 1, backgroundColor: 'var(--color-primary-accent)', color: '#000', border: 'none', padding: '12px', borderRadius: '4px', fontWeight: '700', fontSize: '0.8rem', cursor: 'pointer' },
  cancelBtn: { backgroundColor: 'transparent', border: '1px solid #7f8794', color: '#7f8794', padding: '12px 20px', borderRadius: '4px', fontSize: '0.8rem', cursor: 'pointer' },
  listPanel: { backgroundColor: 'var(--color-surface-panel)', border: '1px solid var(--color-border-system)', padding: '24px', borderRadius: '4px' },
  listContainer: { display: 'flex', flexDirection: 'column', gap: '16px' },
  itemRow: { display: 'flex', alignItems: 'center', borderBottom: '1px solid rgba(22, 27, 38, 0.5)', paddingBottom: '12px', gap: '16px' },
  itemThumb: { width: '50px', height: '50px', objectFit: 'cover', borderRadius: '2px', border: '1px solid var(--color-border-system)' },
  itemDetails: { flexGrow: 1 },
  itemTitle: { fontSize: '0.9rem', fontWeight: '700', color: 'var(--color-text)' },
  itemMeta: { fontSize: '0.7rem', color: 'var(--color-text-secondary)', marginTop: '4px' },
  itemActions: { display: 'flex', gap: '8px' },
  editBtn: { backgroundColor: 'transparent', border: '1px solid var(--color-primary-accent)', color: 'var(--color-primary-accent)', padding: '6px 12px', borderRadius: '2px', fontSize: '0.7rem', cursor: 'pointer' },
  deleteBtn: { backgroundColor: 'transparent', border: '1px solid #ff4d4d', color: '#ff4d4d', padding: '6px 12px', borderRadius: '2px', fontSize: '0.7rem', cursor: 'pointer' }
};
