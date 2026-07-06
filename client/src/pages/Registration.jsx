import React, { useState } from 'react';
import ManualRegistration from './ManualRegistration';
import './Registration.css';

function Registration() {
  const [view, setView] = useState('selection');

  if (view === 'manual') {
    return <ManualRegistration onBack={() => setView('selection')} />;
  }

  // VIEW 2: PayPal Full View Replacement
  if (view === 'paypal') {
    return (
      <div className="reg-page-container" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', gap: '20px', padding: '24px' }}>
        
        {/* The Back Button - Stays fixed right at the top of the replacement view */}
        <div style={{ width: '100%', maxWidth: '800px', margin: '0 auto' }}>
          <button 
            onClick={() => setView('selection')} 
            style={{ 
              width: 'auto',
              display: 'inline-block',
              padding: '10px 24px',
              background: '#161920',
              color: '#eab308',
              border: '2px solid #eab308',
              borderRadius: '100px',
              cursor: 'pointer',
              fontSize: '0.95rem',
              fontWeight: '700',
              transition: 'all 0.2s ease',
              textAlign: 'center'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = '#eab308';
              e.target.style.color = '#0f172a';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = '#161920';
              e.target.style.color = '#eab308';
            }}
          >
            ← Change Payment Method
          </button>
        </div>

        {/* Full Frame Container replacing the view canvas */}
        <div 
          style={{
            width: '100%',
            maxWidth: '800px',
            margin: '0 auto',
            flex: 1,
            background: '#161920',
            borderRadius: '12px',
            border: '1px solid rgba(255, 255, 255, 0.05)',
            overflow: 'hidden',
            boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.3)'
          }}
        >
          <iframe
            id="jotform-embed"
            title="Registration Checkout Portal"
            /* MAKE SURE THIS IS THE LIVE LINK FROM THE 'PUBLISH' TAB, NOT THE BUILDER LINK */
            src="https://form.jotform.com/261848556127163" 
            style={{
              width: '100%',
              height: '1000px', /* Generous height so the fields don't feel squished */
              border: 'none',
              display: 'block'
            }}
            scrolling="yes"
            allow="payment"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="reg-page-container">
      <div className="reg-split-layout">
        
        {/* Left Side: Information Pane */}
        <div className="reg-info-pane">
          <span className="meta-badge">7th ANNUAL GCCT</span>
          <h1 className="meta-title">
            Tournament <span className="accent-text">Registration</span>
          </h1>
          <p className="meta-description">
            Please complete the registration form below to secure your spot in the event; the entrance fee is $10 per person, and the final registration deadline is August 9th at 11:00 a.m. Upon successful submission, a confirmation message will automatically be sent to the email address you provided. If you do not receive this confirmation email within 24 hours, please reach out directly to our support team at gcctfundraiser@gmail.com for manual verification.
          </p>
        </div>

        {/* Right Side: Interactive Action Pane */}
        <div className="reg-form-pane">
          
          {/* VIEW 1: Selection Menu */}
          {view === 'selection' && (
            <div className="reg-form transition-fade">
              <h3 className="section-title">Select Payment Method</h3>
              <p className="bright-instructions">
                The entrance fee is <strong style={{ color: '#eab308' }}>$10 per person</strong>. Select a payment option below.
              </p>
              
              <div className="payment-options-grid">
                <button 
                  onClick={() => setView('manual')} 
                  className="btn-payment-card fast-transfer"
                >
                  <div className="card-content">
                    <span className="card-title">Venmo / Zelle</span>
                    <span className="card-action-text">Proceed with manual verification entry</span>
                  </div>
                  <span className="card-arrow">→</span>
                </button>
                
                <button 
                  onClick={() => setView('paypal')} 
                  className="btn-payment-card legacy-transfer"
                >
                  <div className="card-content">
                    <span className="card-title">PayPal / Credit Card</span>
                    <span className="card-action-text">Complete checkout secure gateway inline</span>
                  </div>
                  <span className="card-arrow">→</span>
                </button>
              </div>

              {/* Enhanced Interactive Section to fill out bottom vertical space */}
              <div className="reg-perks-section">
                <h4 className="perks-title">Tournament Timeline & Details</h4>
                <div className="perks-grid">
                  
                  <div className="perk-item">
                    <span className="perk-bullet">✦</span>
                    <div>
                      <h5>Fundraiser Impact</h5>
                      <p>100% of tournament entrance proceeds directly support Cincinnati Children's Hospital.</p>
                    </div>
                  </div>

                  <div className="perk-item timeline-item">
                    <span className="perk-bullet">🕒</span>
                    <div>
                      <h5>Practice Event</h5>
                      <p>Practice tournament begins on August 8th at 12:00 PM Eastern Time.</p>
                    </div>
                  </div>

                  <div className="perk-item timeline-item">
                    <span className="perk-bullet">🏆</span>
                    <div>
                      <h5>Main Tournament Start</h5>
                      <p>Official brackets launch on August 9th at 12:00 PM Eastern Time.</p>
                    </div>
                  </div>

                </div>
              </div>

            </div>
          )}
          
        </div>
      </div>
    </div>
  );
}

export default Registration;