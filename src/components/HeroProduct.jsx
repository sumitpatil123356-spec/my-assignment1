import { useRef } from 'react';

export default function HeroProduct({ activeVariant, onAddToCart, selectedVariantId, setSelectedVariantId, INVENTORY }) {
  const heroRef = useRef(null);

  const controllerVariants = INVENTORY.filter(item => item.id.toString().startsWith('ctrl-'));

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const rotateX = -(y / (rect.height / 2)) * 15;
    const rotateY = (x / (rect.width / 2)) * 15;
    if (heroRef.current) {
      heroRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
      heroRef.current.style.transition = 'transform 0.1s ease-out';
    }
  };

  const handleMouseLeave = () => {
    if (heroRef.current) {
      heroRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
      heroRef.current.style.transition = 'transform 0.5s ease-out';
    }
  };

  return (
    <section className="hero-command-grid">
      {/* Left Column */}
      <div className="console-panel">
        <div>
          <div className="pro-label-box">Pro Series</div>

          <h1 className="hero-heading">
            Next Level<br />
            <span className="accent-highlight">Control</span><br />
            System
          </h1>

          <p className="hero-desc">
            Engineered for elite performance. Low-latency input with premium hybrid switches and full customization.
          </p>
        </div>

        <div>
          <div className="cta-buttons-stack">
            <button className="btn-primary-filled" onClick={() => onAddToCart(activeVariant)}>
              Buy Now
            </button>
            <button className="btn-secondary-outlined" onClick={() => onAddToCart(activeVariant)}>
              Add to Cart
            </button>
          </div>

          <div className="variant-selector-module">
            <div className="system-node-display">
              Color: <span className="node-value">{activeVariant.label}</span>
            </div>
            <div className="variant-nodes-flex">
              {controllerVariants.map((variant) => (
                <button
                  key={variant.id}
                  className={`variant-node-btn ${selectedVariantId === variant.id ? 'active' : ''}`}
                  onClick={() => setSelectedVariantId(variant.id)}
                  title={variant.label}
                >
                  <div className={`color-fill-${variant.id.split('-')[1]}`} />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Center Column */}
      <div className="hero-render-panel">
        <div className="hero-glow-depth" />
        <div
          ref={heroRef}
          className="hero-image-wrapper"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <img src={activeVariant.img} alt={activeVariant.label} className="hero-image-render" />
        </div>
      </div>

      {/* Right Column */}
      <div className="telemetry-panel">
        <div className="telemetry-module-card">
          <div className="telemetry-icon-box">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="22" y1="12" x2="18" y2="12"></line><line x1="6" y1="12" x2="2" y2="12"></line><line x1="12" y1="6" x2="12" y2="2"></line><line x1="12" y1="22" x2="12" y2="18"></line></svg>
          </div>
          <div className="telemetry-labels">
            <span className="telemetry-subtitle">Response Time</span>
            <span className="telemetry-title">0.2ms Input</span>
          </div>
        </div>

        <div className="telemetry-module-card">
          <div className="telemetry-icon-box">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="22" y1="12" x2="18" y2="12"></line><line x1="6" y1="12" x2="2" y2="12"></line><line x1="12" y1="6" x2="12" y2="2"></line><line x1="12" y1="22" x2="12" y2="18"></line></svg>
          </div>
          <div className="telemetry-labels">
            <span className="telemetry-subtitle">Adaptive Trigger</span>
            <span className="telemetry-title">Haptic Engine</span>
          </div>
        </div>

        <div className="telemetry-module-card">
          <div className="telemetry-icon-box">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="22" y1="12" x2="18" y2="12"></line><line x1="6" y1="12" x2="2" y2="12"></line><line x1="12" y1="6" x2="12" y2="2"></line><line x1="12" y1="22" x2="12" y2="18"></line></svg>
          </div>
          <div className="telemetry-labels">
            <span className="telemetry-subtitle">Multi-Device</span>
            <span className="telemetry-title">Sync Protocol</span>
          </div>
        </div>

        <div className="telemetry-module-card">
          <div className="telemetry-icon-box">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="22" y1="12" x2="18" y2="12"></line><line x1="6" y1="12" x2="2" y2="12"></line><line x1="12" y1="6" x2="12" y2="2"></line><line x1="12" y1="22" x2="12" y2="18"></line></svg>
          </div>
          <div className="telemetry-labels">
            <span className="telemetry-subtitle">Tournament</span>
            <span className="telemetry-title">Certified Build</span>
          </div>
        </div>
      </div>
    </section>
  );
}