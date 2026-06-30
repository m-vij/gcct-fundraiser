import React from 'react';
import './About.css';

function About() {
  return (
    <div className="about-page-container">
      
      {/* HERO / HEADER SECTION */}
      <header className="about-hero-section">
        <div className="about-hero-overlay"></div>
        <div className="about-hero-content">
          <span className="about-badge">Our Story & Mission</span>
          <h1 className="about-main-title">Moving Pieces, <span className="accent-text">Changing Lives</span></h1>
          <p className="about-hero-subtitle">
            The Greater Cincinnati Chess Tournament is a grassroots movement using chess as a force for community connection and meaningful impact.
          </p>
        </div>
      </header>

      {/* QUICK EVENT INFO CARDS */}
      <section className="event-quick-info-grid">
        <div className="info-pill-card">
          <div className="card-icon-wrapper">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
          </div>
          <div className="card-text-block">
            <span className="info-card-label">Date</span>
            <span className="info-card-value">August 9th, 2026</span>
          </div>
        </div>

        <div className="info-pill-card">
          <div className="card-icon-wrapper">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
          </div>
          <div className="card-text-block">
            <span className="info-card-label">Location</span>
            <span className="info-card-value">Virtual on Chess.com</span>
          </div>
        </div>

        <div className="info-pill-card">
          <div className="card-icon-wrapper">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
          </div>
          <div className="card-text-block">
            <span className="info-card-label">Time</span>
            <span className="info-card-value">12:00 PM US Eastern</span>
          </div>
        </div>
      </section>

      {/* TWO-COLUMN HISTORY & FORMAT SECTION */}
      <section className="about-details-section">
        <div className="details-grid">
          
          {/* Column 1: History & Roots (With Brand Logo Integrated) */}
          <div className="details-column legacy-wrapper">
            <h2 className="section-column-title">The GCCT Legacy</h2>
            
            <div className="legacy-content-layout">
              {/* Logo Frame insertion */}
              <div className="legacy-logo-frame">
                <img 
                  src="/gcct-logo.jpg" 
                  alt="GCCT Fundraiser Logo" 
                  className="legacy-brand-logo"
                />
              </div>

              <div className="legacy-text-block">
                <p className="details-paragraph">
                  The Greater Cincinnati Chess Tournament (GCCT) enters its <strong>6th year!</strong> Founded in 2019 during the COVID-19 pandemic, GCCT began as a way to stay connected through chess while supporting vital medical causes.
                </p>
                <p className="details-paragraph">
                  What started as a small virtual tournament has grown into an annual community-driven event, raising <strong>over $5,000</strong> for critical healthcare initiatives, including COVID-19 research, pediatric nutrition, cancer research, and children’s mental and behavioral health.
                </p>
                <p className="details-paragraph">
                  Hosted online, GCCT brings together players of all skill levels for a day of spirited competition and purposeful giving. With support from local hospitals, chess clubs, and passionate volunteers, the tournament has engaged over 300 players across the country.
                </p>
              </div>
            </div>
          </div>

          {/* Column 2: Tournament Structure */}
          <div className="details-column format-card-bg">
            <h2 className="section-column-title">Tournament Format</h2>
            <p className="details-paragraph italic-highlight">
              A tournament entry fee of $10 is required to join. This one-day, virtual chess tournament will consist of <strong>5 rounds</strong>.
            </p>
            
            <div className="sections-list">
              <div className="section-item">
                <span className="section-badge">Section 1</span>
                <div>
                  <h4 className="section-item-title">Under 600 Rating</h4>
                  <p className="section-item-desc">Perfect for beginners, casual players, and newcomers navigating tournament rules.</p>
                </div>
              </div>

              <div className="section-item">
                <span className="section-badge">Section 2</span>
                <div>
                  <h4 className="section-item-title">Under 1000 Rating</h4>
                  <p className="section-item-desc">Tailored for intermediate players aiming to refine tactical calculation skills.</p>
                </div>
              </div>

              <div className="section-item">
                <span className="section-badge">Section 3</span>
                <div>
                  <h4 className="section-item-title">Champions Section</h4>
                  <p className="section-item-desc">Our premier division open to advanced tactical competitors fighting for ultimate status.</p>
                </div>
              </div>
            </div>

            <div className="rewards-callout">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#eab308" strokeWidth="2"><circle cx="12" cy="8" r="7"></circle><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline></svg>
              <span>The top three players of each section will receive an official placement medal depending upon their final ranking.</span>
            </div>
          </div>

        </div>
      </section>

      {/* MOTIVATION & CHILDREN'S HOSPITAL FUND DRIVE */}
      <section className="about-motivation-section">
        <div className="motivation-container">
          <div className="motivation-text-side">
            <span className="motivation-small-tag">This Year's Cause</span>
            <h3 className="motivation-title">Supporting Cincinnati Children’s Hospital</h3>
            <p className="motivation-desc">
              All money raised from this year's event will be donated directly to the <strong>Cincinnati Children's Epilepsy Surgery Family Assistance Fund</strong>. 
            </p>
            <p className="motivation-desc">
              This vital resource provides essential travel, housing, and meal assistance for families whose children are undergoing life-changing neurosurgery.
            </p>
            <p className="motivation-desc">
              For many, the journey to epilepsy surgery is long, emotionally exhausting, and financially overwhelming. Families often travel great distances for specialized care, adding heavy financial burden during an already difficult period. This fund steps in to ensure no family has to choose between treatment and baseline comfort.
            </p>
            
            <div className="quote-block">
              <p>"At GCCT, we believe in making bold moves — for progress, for equity, and for hope. Every game played and every donation made directly helps families find stability when they need it most."</p>
              <span className="quote-author">— GCCT Team</span>
            </div>
          </div>

          {/* LETTER OF ACKNOWLEDGEMENT PLACEHOLDER BOX */}
          <div className="acknowledgement-photo-side">
            <div className="document-frame">
              <img 
                src="" 
                alt="Letter of Acknowledgement" 
                className="letter-img-asset"
                onError={(e) => { e.target.style.display = 'none'; }}
              />
              
              <div className="document-placeholder-ui">
                <div className="placeholder-icon">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                    <line x1="16" y1="13" x2="8" y2="13"></line>
                    <line x1="16" y1="17" x2="8" y2="17"></line>
                    <polyline points="10 9 9 9 8 9"></polyline>
                  </svg>
                </div>
                <h4 className="placeholder-text-title">Letter of Acknowledgement</h4>
                <p className="placeholder-text-p">
                  Official verification letter from Cincinnati Children’s Hospital will be prominently uploaded and displayed right here upon receipt.
                </p>
                <div className="pending-badge">Pending Document Arrival</div>
              </div>

            </div>
          </div>

        </div>
      </section>

    </div>
  );
}

export default About;