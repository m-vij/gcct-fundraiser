import React, { useState } from 'react';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import './Registration.css';

function Registration() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('paypal');
  const [emailAcknowledged, setEmailAcknowledged] = useState(false);

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

  const calculatedTotal = (competitors.length * 10) + parseInt(payerInfo.extraDonation || 0);

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
    setCompetitors([{ firstName: '', lastName: '', chessUsername: '', rapidRating: '' }]);
    setEmailAcknowledged(false);
    setPaymentMethod('paypal');
    setSubmitted(false);
  };

  const handleManualSubmit = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (!emailAcknowledged) return;
    setLoading(true);
    try {
      const response = await fetch('/api/submit-manual', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ payer: payerInfo, competitors, totalAmount: calculatedTotal })
      });
      if (response.ok) setSubmitted(true);
      else alert("Failed to sync registration.");
    } catch (err) {
      alert("Manual ledger sync error.");
    } finally {
      setLoading(false);
    }
  };

  const handlePayPalSuccessLogs = async (orderId) => {
    setLoading(true);
    try {
      await fetch('/api/submit-paypal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ payer: payerInfo, competitors, totalAmount: calculatedTotal, paypalOrderId: orderId })
      });
      setSubmitted(true);
    } catch (err) {
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  const isFormValid = () => {
    return (
      payerInfo.payerFirstName && payerInfo.payerLastName && payerInfo.payerEmail &&
      payerInfo.payerPhone && payerInfo.referralSource && emailAcknowledged &&
      competitors.every(c => c.firstName && c.lastName && c.chessUsername && c.rapidRating)
    );
  };

  if (submitted) {
    return (
      <div className="reg-page-container">
        <div className="success-wrapper" style={{ maxWidth: '600px', margin: '60px auto', textAlign: 'center', padding: '0 20px' }}>
          <div className="success-badge" style={{ fontSize: '4rem', color: '#4ade80', marginBottom: '16px' }}>✓</div>
          <h2 style={{ color: '#f8fafc', fontSize: '2.2rem', fontWeight: '700' }}>Registration Successful!</h2>
          <button onClick={handleResetForm} className="btn-primary" style={{ marginTop: '30px' }}>Register Another Group</button>
        </div>
      </div>
    );
  }

  return (
    <PayPalScriptProvider options={{ "client-id": "test", currency: "USD" }}>
      <div className="reg-page-container">
        <div className="reg-split-layout">
          <div className="reg-info-pane">
            <span className="meta-badge">6th Annual GCCT</span>
            <h1 className="meta-title">Tournament <span className="accent-text">Registration</span></h1>
            <p className="meta-description">Please complete the registration form below.</p>
            <div className="running-total-banner">
              <h3>Calculated Balance:</h3>
              <div className="grand-price-display">${calculatedTotal}.00</div>
            </div>
          </div>

          <div className="reg-form-pane">
            <div className="reg-form">
              <h3 className="section-title">1. Primary Payer</h3>
              <div className="form-grid-2">
                <input type="text" name="payerFirstName" placeholder="First Name" value={payerInfo.payerFirstName} onChange={handlePayerChange} required />
                <input type="text" name="payerLastName" placeholder="Last Name" value={payerInfo.payerLastName} onChange={handlePayerChange} required />
              </div>
              <input type="email" name="payerEmail" placeholder="Email Address" value={payerInfo.payerEmail} onChange={handlePayerChange} required />
              <input type="tel" name="payerPhone" placeholder="Phone Number" value={payerInfo.payerPhone} onChange={handlePayerChange} required />
              
              <h3 className="section-title">2. Competitor Slots</h3>
              {competitors.map((c, i) => (
                <div key={i} className="player-block">
                  <input type="text" name="firstName" placeholder="First Name" value={c.firstName} onChange={(e) => handleCompetitorChange(i, e)} required />
                  <input type="text" name="lastName" placeholder="Last Name" value={c.lastName} onChange={(e) => handleCompetitorChange(i, e)} required />
                  <input type="text" name="chessUsername" placeholder="Chess.com Username" value={c.chessUsername} onChange={(e) => handleCompetitorChange(i, e)} required />
                  <input type="number" name="rapidRating" placeholder="Rapid Rating" value={c.rapidRating} onChange={(e) => handleCompetitorChange(i, e)} required />
                </div>
              ))}
              <button type="button" className="btn-add" onClick={addCompetitorRow}>+ Add Competitor</button>

              <h3 className="section-title">4. Checkout</h3>
              <div className="payment-switch">
                <button className={`switch-tab ${paymentMethod === 'paypal' ? 'active' : ''}`} onClick={() => setPaymentMethod('paypal')}>PayPal</button>
                <button className={`switch-tab ${paymentMethod === 'venmo_zelle' ? 'active' : ''}`} onClick={() => setPaymentMethod('venmo_zelle')}>Venmo/Zelle</button>
              </div>

              {paymentMethod === 'paypal' ? (
                <PayPalButtons onApprove={(data, actions) => actions.order.capture().then(order => handlePayPalSuccessLogs(order.id))} />
              ) : (
                <button onClick={handleManualSubmit} className="btn-primary">Submit Registration</button>
              )}
            </div>
          </div>
        </div>
      </div>
    </PayPalScriptProvider>
  );
}

export default Registration;