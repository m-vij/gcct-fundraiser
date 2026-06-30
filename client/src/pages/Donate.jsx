import React from 'react';

function Donate() {
  return (
    <section className="reg-page-container">
      <div className="reg-split-layout" style={{ maxWidth: '900px', margin: '0 auto', display: 'block' }}>
        
        {/* DONATION CONTENT */}
        <div className="reg-info-pane" style={{ textAlign: 'center', width: '100%' }}>
          <span className="meta-badge">Support the Cause</span>
          <h1 className="meta-title" style={{ fontSize: '2.5rem' }}>GCCT <span className="accent-text">Fundraiser</span></h1>
          <p className="meta-description" style={{ fontSize: '1.2rem', marginBottom: '40px' }}>
            Thank you for choosing to support our mission. All donations are processed directly through the secure Cincinnati Children's Hospital Medical Center portal, ensuring your contribution reaches the families and researchers who need it most.
          </p>

          <div className="reg-form" style={{ background: '#1e293b', border: '1px solid #334155', padding: '40px', borderRadius: '12px', textAlign: 'left' }}>
            <h3 style={{ color: '#f8fafc', marginBottom: '20px' }}>How to complete your donation:</h3>
            <ol style={{ paddingLeft: '20px', lineHeight: '2.2', color: '#cbd5e1', fontSize: '1.1rem' }}>
              <li>Click the button below to be redirected to the <strong>official Cincinnati Children's portal</strong>.</li>
              <li>Select your preferred donation amount or enter a custom gift tier.</li>
              <li>Complete the payment details on their encrypted, secure system.</li>
              <li>Receive your official tax-deductible receipt directly via email.</li>
            </ol>
            
            <div style={{ marginTop: '40px', textAlign: 'center' }}>
              <a 
                href="https://giving.cincinnatichildrens.org/fundraiser/6451803" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn-primary" 
                style={{ 
                  display: 'inline-block', 
                  padding: '18px 40px', 
                  fontSize: '1.2rem', 
                  textDecoration: 'none',
                  borderRadius: '8px'
                }}
              >
                Proceed to Secure Donation Page
              </a>
              <p style={{ marginTop: '20px', fontSize: '0.85rem', color: '#64748b' }}>
                *Note: You will be redirected to the secure giving.cincinnatichildrens.org portal in a new tab.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default Donate;