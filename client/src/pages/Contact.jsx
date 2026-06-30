import React from 'react';

function Contact() {
  return (
    <section className="reg-page-container">
      <div className="reg-split-layout">
        
        {/* LEFT COLUMN: CONTACT DETAILS */}
        <div className="reg-info-pane">
          <span className="meta-badge">Get in Touch</span>
          <h1 className="meta-title">Contact <span className="accent-text">Us</span></h1>
          <p className="meta-description">
            Have questions about the tournament, registration process, or event details? We are happy to help. Click the button below to send us a message directly.
          </p>

          <div className="contact-details-card" style={{ marginTop: '32px' }}>
            <div className="contact-item">
              <a 
                href="mailto:gcctfundraiser@gmail.com" 
                className="btn-primary" 
                style={{ 
                  display: 'inline-block', 
                  padding: '16px 32px', 
                  textDecoration: 'none', 
                  fontSize: '1.1rem', 
                  fontWeight: '600' 
                }}
              >
                Email: gcctfundraiser@gmail.com
              </a>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: HELPFUL TIPS */}
        <div className="reg-form-pane">
          <div className="reg-form">
            <h3 className="section-title" style={{ marginTop: '0' }}>How to reach us</h3>
            <p style={{ color: '#cbd5e1', lineHeight: '1.6' }}>
              To help us get you an answer as quickly as possible, please include:
            </p>
            <ul style={{ color: '#94a3b8', paddingLeft: '20px', lineHeight: '2.5' }}>
              <li><strong>Your Full Name</strong></li>
              <li><strong>Your specific question</strong> or issue</li>
            </ul>
            <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginTop: '20px' }}>
              We check our inbox regularly and will get back to you promptly!
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}

export default Contact;