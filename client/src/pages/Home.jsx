import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  // 1. Interactive Impact Tier Selector State (2 Toggles Only)
  const [activeTier, setActiveTier] = useState('entry');

  // 2. Accurate Tournament Countdown Timer with Seconds (Target: August 9th, 12:00 PM EST)
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const currentYear = new Date().getFullYear();
    const targetDate = new Date(`August 9, ${currentYear} 12:00:00 GMT-0400`);

    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = targetDate - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const d = Math.floor(difference / (1000 * 60 * 60 * 24));
      const h = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days: d, hours: h, minutes: m, seconds: s });
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="split-home-container">
      
      {/* LEFT COLUMN: Controls & Interactive Modules */}
      <div className="info-side scrollable-info-pane">
        
        <div className="status-badge">
          <span className="pulse-indicator"></span> 
          Registration Now Open
        </div>

        <h1 className="main-headline">
          7th Annual Greater Cincinnati <span className="accent-text">Chess Tournament</span> Fundraiser
        </h1>

        <p className="sub-headline-text">
          Join the battle for a healthier future on the chessboard. Connect with players across the region, showcase your strategy, and make a profound community impact.
        </p>

        {/* Primary Action Button */}
        <div className="action-button-group">
          <Link to="/registration" className="btn-register-action">
            <span>Play Now & Register</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </Link>
        </div>

        {/* INTERACTIVE MODULE 1: Live Tournament Countdown Deck with Date Display */}
        <div className="countdown-grid-wrapper">
          <div className="countdown-header-row">
            <span className="countdown-section-title">Tournament Countdown</span>
            <span className="countdown-event-date">August 9th @ 12:00 PM EST</span>
          </div>
          <div className="countdown-row">
            <div className="time-tile">
              <span className="time-val">{timeLeft.days}</span>
              <span className="time-lbl">Days</span>
            </div>
            <div className="time-tile">
              <span className="time-val">{timeLeft.hours}</span>
              <span className="time-lbl">Hrs</span>
            </div>
            <div className="time-tile">
              <span className="time-val">{timeLeft.minutes}</span>
              <span className="time-lbl">Min</span>
            </div>
            <div className="time-tile highlight-seconds">
              <span className="time-val">{timeLeft.seconds}</span>
              <span className="time-lbl">Sec</span>
            </div>
          </div>
        </div>

        {/* INTERACTIVE MODULE 2: Impact Selector Tiers */}
        <div className="interactive-impact-container">
          <span className="impact-section-title">See Your Impact</span>
          
          <div className="tier-toggle-bar">
            <button 
              className={`tier-btn ${activeTier === 'entry' ? 'active' : ''}`}
              onClick={() => setActiveTier('entry')}
            >
              $10 Entry Fee
            </button>
            <button 
              className={`tier-btn ${activeTier === 'donation' ? 'active' : ''}`}
              onClick={() => setActiveTier('donation')}
            >
             Donations
            </button>
          </div>

          <div className="tier-display-card animate-fade-in">
            {activeTier === 'entry' && (
              <>
                <h4 className="tier-title">Tournament Registration</h4>
                <p className="tier-description">Secures your formal bracket placement and tournament profile. All money raised from registrations goes directly to Cincinnati Children's Center for Better Health and Nutrition.</p>
              </>
            )}
            {activeTier === 'donation' && (
              <>
                <h4 className="tier-title">Direct Support Contribution</h4>
                <p className="tier-description">Every dollar from extra donations supports the Center for Better Health and Nutrition at Cincinnati Children’s, helping fund family-based obesity prevention programs, metabolic health research, and resources that empower children and teens to achieve healthy, sustainable lifestyle changes.</p>
              </>
            )}
          </div>
        </div>

        {/* INTERACTIVE MODULE 3: Image-Ready Sponsor / Partner Grid */}
        
<div className="partners-section">
  <span className="partners-title">Supported By Regional Partners</span>
  <div className="partners-interactive-grid">

    {/* Toggle Sponsor 1: Change 'true' to 'false' to hide */}
    {true && (
      <div className="partner-logo-card">
        <div className="partner-image-frame">
          <img src="/cchmc-sponsor.jpg" alt="Cincinnati Children's" className="partner-logo-img" onError={(e) => { e.target.style.display = 'none'; }} />
          <span className="partner-fallback-text"></span>
	  <div className="partner-hover-tooltip">Cincinnati Children's Hospital</div>
        </div>
        
      </div>
    )}

    {/* Toggle Sponsor 2: Change 'true' to 'false' to hide */}
    {false && (
      <div className="partner-logo-card">
        <div className="partner-image-frame">
          <img src="" alt="Queen City Health" className="partner-logo-img" onError={(e) => { e.target.style.display = 'none'; }} />
          <span className="partner-fallback-text">Queen City Health</span>
        </div>
        <div className="partner-hover-tooltip">Our medical safety partner sponsoring medical research.</div>
      </div>
    )}

    {/* Toggle Sponsor 3: Change 'true' to 'false' to hide */}
    {false && (
      <div className="partner-logo-card">
        <div className="partner-image-frame">
          <img src="" alt="Tri-State Logistics" className="partner-logo-img" onError={(e) => { e.target.style.display = 'none'; }} />
          <span className="partner-fallback-text">Tri-State Logistics</span>
        </div>
        <div className="partner-hover-tooltip">Covering all logistical expenses for our event venue.</div>
      </div>
    )}

  </div>
</div>
      </div>

      {/* RIGHT COLUMN: Interactive Immersive Photo Window */}
      <div className="photo-side">
        <div className="image-zoom-wrapper">
          <img 
            src="/background-home.png" 
            alt="Greater Cincinnati Skyline" 
            className="interactive-hero-photo"
          />
        </div>
        <div className="photo-floating-tag">
          <span className="tag-location">Cincinnati, OH</span>
        </div>
      </div>

    </div>
  );
}

export default Home;