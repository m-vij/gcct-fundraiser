import React, { useState } from 'react';
import './ManualRegistration.css'; 

function ManualRegistration({ onBack }) {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [emailAcknowledged, setEmailAcknowledged] = useState(false);
  const [donationType, setDonationType] = useState('preset'); // 'preset' or 'custom'

  const [payerInfo, setPayerInfo] = useState({
    payerFirstName: '',
    payerLastName: '',
    payerEmail: '',
    payerPhone: '',
    referralSource: '',
    extraDonation: '0',
    transactionId: ''
  });

  const [competitors, setCompetitors] = useState([
    { firstName: '', lastName: '', chessUsername: '', rapidRating: '' }
  ]);

  const handlePayerChange = (e) => {
    const { name, value } = e.target;
    setPayerInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleDonationPreset = (amount) => {
    setDonationType('preset');
    setPayerInfo(prev => ({ ...prev, extraDonation: amount }));
  };

  const handleCustomDonationClick = () => {
    setDonationType('custom');
    setPayerInfo(prev => ({ ...prev, extraDonation: '' }));
  };

  const handleCompetitorChange = (index, e) => {
    const { name, value } = e.target;
    const updatedCompetitors = [...competitors];
    updatedCompetitors[index][name] = value;
    setCompetitors(updatedCompetitors);
  };

  const addCompetitorRow = () => {
    setCompetitors([
      ...competitors,
      { firstName: '', lastName: '', chessUsername: '', rapidRating: '' }
    ]);
  };

  const removeCompetitorRow = (index) => {
    if (competitors.length > 1) {
      setCompetitors(competitors.filter((_, i) => i !== index));
    }
  };

  const parsedDonation = parseInt(payerInfo.extraDonation, 10);
  const validDonation = isNaN(parsedDonation) || parsedDonation < 0 ? 0 : parsedDonation;
  const calculatedTotal = (competitors.length * 10) + validDonation;

  const handleResetForm = () => {
    setPayerInfo({
      payerFirstName: '',
      payerLastName: '',
      payerEmail: '',
      payerPhone: '',
      referralSource: '',
      extraDonation: '0',
      transactionId: ''
    });
    setCompetitors([
      { firstName: '', lastName: '', chessUsername: '', rapidRating: '' }
    ]);
    setDonationType('preset');
    setEmailAcknowledged(false);
    setSubmitted(false);
  };

  const handleManualSubmit = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (!emailAcknowledged || !isFormValid()) return;
    
    setLoading(true);
    try {
      const response = await fetch('https://gcct-fundraiser.onrender.com/api/submit-manual', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          payer: { ...payerInfo, extraDonation: validDonation.toString() }, 
          competitors, 
          totalAmount: calculatedTotal,
          transactionId: payerInfo.transactionId 
        })
      });
      if (response.ok) {
        setSubmitted(true);
      } else {
        alert("Failed to sync registration ledger with spreadsheet backend.");
      }
    } catch (err) {
      alert("Manual ledger sync error. Backend is likely offline.");
    } finally {
      setLoading(false);
    }
  };

  const isFormValid = () => {
    return (
      payerInfo.payerFirstName &&
      payerInfo.payerLastName &&
      payerInfo.payerEmail &&
      payerInfo.payerPhone &&
      payerInfo.referralSource &&
      emailAcknowledged &&
      (payerInfo.transactionId && payerInfo.transactionId.trim() !== "") &&
      payerInfo.extraDonation !== '' &&
      competitors.every(c => c.firstName && c.lastName && c.chessUsername && c.rapidRating)
    );
  };

  if (submitted) {
    return (
      <div className="reg-page-container">
        <div className="success-wrapper" style={{ maxWidth: '600px', margin: '60px auto', textAlign: 'center', padding: '0 20px' }}>
          <div className="success-badge" style={{ fontSize: '4rem', color: '#4ade80', marginBottom: '16px' }}>✓</div>
          <h2 style={{ color: '#f8fafc', fontSize: '2.2rem', fontWeight: '700', marginBottom: '12px' }}>
            Registration Processed Successfully!
          </h2>
          <p style={{ margin: '0 0 32px 0', color: '#cbd5e1', fontSize: '1.1rem', lineHeight: '1.5' }}>
            Thank you, {payerInfo.payerFirstName}. Your tournament data packet has been safely logged.
          </p>
          
          <div style={{ background: '#1e293b', padding: '24px', borderRadius: '12px', marginBottom: '32px', textAlign: 'left', border: '1px solid #334155' }}>
            <div style={{ margin: '8px 0', color: '#f8fafc', fontSize: '1.05rem' }}>
              <span style={{ color: '#94a3b8', fontWeight: '600' }}>Payer:</span> {payerInfo.payerFirstName} {payerInfo.payerLastName}
            </div>
            <div style={{ margin: '8px 0', color: '#f8fafc', fontSize: '1.05rem' }}>
              <span style={{ color: '#94a3b8', fontWeight: '600' }}>Total Amount:</span> ${calculatedTotal}.00 USD
            </div>
            <div style={{ margin: '8px 0', color: '#f8fafc', fontSize: '1.05rem' }}>
              <span style={{ color: '#94a3b8', fontWeight: '600' }}>Players Registered:</span> {competitors.length}
            </div>
            
            <div style={{ marginTop: '20px', padding: '12px 16px', background: '#3b82f61a', borderRadius: '8px', border: '1px dashed #3b82f6', color: '#93c5fd', fontSize: '0.95rem', lineHeight: '1.4' }}>
              <strong>✉️ Check your Spam Folder:</strong> Automated confirmation receipts are frequently rerouted by email filters. If you do not see the email in your primary inbox within 5 minutes, please check your <strong>Spam, Junk, or Promotions folders</strong> and mark it as "Not Spam."
            </div>
          </div>

          <button onClick={handleResetForm} className="btn-primary" style={{ padding: '14px 28px', fontSize: '1.05rem' }}>
            Register Another Group
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="reg-page-container">
      <div className="reg-split-layout">
        
        {/* Left Hand Context Column */}
        <div className="reg-info-pane">
          <button onClick={onBack} className="btn-add" style={{ borderStyle: 'solid', width: 'auto', alignSelf: 'flex-start', padding: '8px 16px', marginBottom: '24px' }}>
            ← Change Payment Method
          </button>
          
          <span className="meta-badge">7th Annual GCCT</span>
          <h1 className="meta-title">Venmo & Zelle <span className="accent-text">Registration</span></h1>
          <p className="meta-description">
            Please complete the registration form below to secure your spot in the event. At this stage, <strong>Venmo and Zelle are the only accepted payment methods</strong>. The entrance fee is $10 per person, and the final registration deadline is August 9th at midnight. Upon successful submission, a confirmation message containing our payment handles will automatically be sent to the email address you provided. If you do not receive this confirmation email within 24 hours, please reach out directly to our support team at gcctfundraiser@gmail.com for manual verification.
          </p>

          <div className="summary-cards-container">
            <div className="summary-item-tile">
              <span className="summary-label">Base Fee Per Slot</span>
              <span className="summary-value">$10.00</span>
            </div>
            <div className="summary-item-tile">
              <span className="summary-label">Account Headcount</span>
              <span className="summary-value">{competitors.length} Player(s)</span>
            </div>
          </div>

          <div className="running-total-banner">
            <h3>Calculated Balance:</h3>
            <div className="grand-price-display">${calculatedTotal}.00</div>
          </div>
        </div>

        {/* Right Hand Input Panel Sheet */}
        <div className="reg-form-pane">
          <div className="reg-form" style={{ opacity: loading ? 0.7 : 1, transition: 'opacity 0.2s ease' }}>
            
            <h3 className="section-title">1. Primary Payer / Billing Profile</h3>
            <div className="form-grid-2">
              <div className="form-group">
                <label>Payer First Name *</label>
                <input type="text" name="payerFirstName" value={payerInfo.payerFirstName} onChange={handlePayerChange} required disabled={loading} />
              </div>
              <div className="form-group">
                <label>Payer Last Name *</label>
                <input type="text" name="payerLastName" value={payerInfo.payerLastName} onChange={handlePayerChange} required disabled={loading} />
              </div>
            </div>

            <div className="form-grid-2">
              <div className="form-group">
                <label>Email Address *</label>
                <input type="email" name="payerEmail" value={payerInfo.payerEmail} onChange={handlePayerChange} required disabled={loading} />
              </div>
              <div className="form-group">
                <label>Phone Number *</label>
                <input type="tel" name="payerPhone" value={payerInfo.payerPhone} onChange={handlePayerChange} required disabled={loading} />
              </div>
            </div>

            <div className="form-group">
              <label>How did you hear about our event? *</label>
              <select name="referralSource" value={payerInfo.referralSource} onChange={handlePayerChange} required disabled={loading}>
                <option value="">Select an option</option>
                <option value="social_media">Social Media</option>
                <option value="chess_club">Local Chess Club / Coach</option>
                <option value="friend_family">Friend / Family</option>
                <option value="email_newsletter">Email Newsletter</option>
                <option value="other">Other</option>
              </select>
            </div>

            <h3 className="section-title">2. Competitor Slots</h3>
            {competitors.map((competitor, index) => (
              <div key={index} className="player-block">
                <div className="player-block-header">
                  <h4>Competitor Account #{index + 1}</h4>
                  {competitors.length > 1 && (
                    <button type="button" className="btn-delete" onClick={() => removeCompetitorRow(index)} disabled={loading}>Remove</button>
                  )}
                </div>

                <div className="form-grid-2">
                  <div className="form-group">
                    <label>First Name *</label>
                    <input type="text" name="firstName" value={competitor.firstName} onChange={(e) => handleCompetitorChange(index, e)} required disabled={loading} />
                  </div>
                  <div className="form-group">
                    <label>Last Name *</label>
                    <input type="text" name="lastName" value={competitor.lastName} onChange={(e) => handleCompetitorChange(index, e)} required disabled={loading} />
                  </div>
                </div>

                <div className="form-grid-2">
                  <div className="form-group">
                    <label>Chess.com Username *</label>
                    <input type="text" name="chessUsername" value={competitor.chessUsername} onChange={(e) => handleCompetitorChange(index, e)} required disabled={loading} />
                  </div>
                  <div className="form-group">
                    <label>Chess.com Rapid Rating *</label>
                    <input type="number" name="rapidRating" value={competitor.rapidRating} onChange={(e) => handleCompetitorChange(index, e)} required min="0" max="3500" disabled={loading} />
                  </div>
                </div>
              </div>
            ))}

            <button type="button" className="btn-add" onClick={addCompetitorRow} disabled={loading}>
              + Add Another Competitor Account
            </button>

           <h3 className="section-title">3. Optional Donation Contribution</h3>
<div className="form-group">
  <label>Please select or enter a donation amount</label>
  
  {/* Option Selector Grid */}
  <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '12px' }}>
    {[0, 10, 25, 50, 100].map((amt) => (
      <button
        key={amt}
        type="button"
        disabled={loading}
        onClick={() => handleDonationPreset(amt.toString())}
        style={{
          flex: '1 1 70px',
          padding: '10px',
          borderRadius: '8px',
          background: donationType === 'preset' && payerInfo.extraDonation === amt.toString() ? '#eab308' : '#1e293b',
          color: donationType === 'preset' && payerInfo.extraDonation === amt.toString() ? '#0f172a' : '#cbd5e1',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          fontWeight: '600',
          cursor: 'pointer',
          transition: 'all 0.2s ease'
        }}
      >
        {amt === 0 ? 'None' : `$${amt}`}
      </button>
    ))}
    <button
      type="button"
      disabled={loading}
      onClick={handleCustomDonationClick}
      style={{
        flex: '1 1 70px',
        padding: '10px',
        borderRadius: '8px',
        background: donationType === 'custom' ? '#eab308' : '#1e293b',
        color: donationType === 'custom' ? '#0f172a' : '#cbd5e1',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        fontWeight: '600',
        cursor: 'pointer',
        transition: 'all 0.2s ease'
      }}
    >
      Custom
    </button>
  </div>

  {/* Corrected & Aligned Custom Donation Entry Layout */}
  {donationType === 'custom' && (
    <div style={{ animation: 'fadeIn 0.2s ease-out', position: 'relative', width: '100%' }}>
      <span 
        style={{ 
          position: 'absolute', 
          left: '14px', 
          top: '50%', 
          transform: 'translateY(-50%)', 
          color: '#94a3b8', 
          fontSize: '1rem', 
          fontWeight: '600',
          pointerEvents: 'none'
        }}
      >
        $
      </span>
      <input
        type="number"
        name="extraDonation"
        value={payerInfo.extraDonation}
        onChange={handlePayerChange}
        min="0"
        placeholder="Enter custom dollar amount"
        disabled={loading}
        style={{ paddingLeft: '32px', width: '100%', boxSizing: 'border-box' }}
        required
      />
    </div>
  )}
</div>

            <h3 className="section-title">4. Venmo/Zelle Checkout</h3>
            <div className="acknowledgement-container">
              <button type="button" className={`btn-ack ${emailAcknowledged ? 'checked' : ''}`} onClick={() => !loading && setEmailAcknowledged(!emailAcknowledged)} disabled={loading}>
                <span className="checkbox-icon">{emailAcknowledged ? '✓' : ''}</span>
                I will remember and agree to check my email for Venmo/Zelle instructions
              </button>
            </div>

            <div className="info-box gold-box" style={{ marginTop: '16px' }}>
              <p style={{ margin: '0 0 16px 0' }}>
                Please prepare to send exactly <strong>${calculatedTotal}.00 USD</strong> via Venmo or Zelle. 
                Once you submit this form, you will receive an email shortly with detailed instructions and our specific payment handles to complete your registration.
              </p>
              <div className="form-group">
                <label>Venmo Username or Zelle Phone Number/Email *</label>
                <input type="text" name="transactionId" value={payerInfo.transactionId} onChange={handlePayerChange} required placeholder="For manual validation crosscheck" disabled={loading} />
              </div>
              <button 
                type="button" 
                onClick={handleManualSubmit}
                className="btn-primary btn-submit" 
                style={{ marginTop: '24px' }} 
                disabled={loading || !emailAcknowledged || !isFormValid()}
              >
                {loading ? "Processing..." : `Submit Registration — $${calculatedTotal}.00`}
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default ManualRegistration;