import express from 'express';
import fetch from 'node-fetch';
import validator from 'validator';


const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

// ==========================================
// TWO SEPARATE GOOGLE SCRIPT MACRO ENDPOINTS
// ==========================================
const GOOGLE_SCRIPT_URL_PAYPAL = "https://script.google.com/macros/s/AKfycbxeOWk-c9DO6H9SMMp9AVgolB7Hw3lU7yzuFoMzRjV3M6qqyP2IqeaMrM4SVo5w9ggWBg/exec"; 
const GOOGLE_SCRIPT_URL_MANUAL = "https://script.google.com/macros/s/AKfycbzVR3JWUwaoqp4qWJtacy83oIRDMteTMPxlxhEZN75eiQucleqBT9RmFR143YXfJ2oG/exec"; 

// ==========================================
// ROUTE 1: AUTOMATED PAYPAL BATCH ROUTE
// ==========================================
app.post('/api/submit-paypal', async (req, res) => {
  try {
    const { payer, competitors, totalAmount, paypalOrderId } = req.body;

    if (!payer?.payerEmail || !validator.isEmail(payer.payerEmail)) {
      return res.status(400).json({ error: "Invalid primary payer email address." });
    }

    const response = await fetch(GOOGLE_SCRIPT_URL_PAYPAL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'PAYPAL_TRANSACTION',
        payer,
        competitors,
        totalAmount,
        paypalOrderId: paypalOrderId || 'AUTOMATED_VERIFIED',
        status: 'COMPLETED'
      })
    });

    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ==========================================
// ROUTE 2: MANUAL VENMO / ZELLE ROUTE
// ==========================================
app.post('/api/submit-manual', async (req, res) => {
  try {
    const { payer, competitors, totalAmount } = req.body;

    if (!payer?.payerEmail || !validator.isEmail(payer.payerEmail)) {
      return res.status(400).json({ error: "Invalid primary payer email address." });
    }

    const response = await fetch(GOOGLE_SCRIPT_URL_MANUAL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'MANUAL_TRANSACTION',
        payer,
        competitors,
        totalAmount,
        transactionId: payer.transactionId,
        status: 'PENDING_ADMIN_CHECK'
      })
    });

    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/ping', (req, res) => {
  res.send('pong!');
});

process.on('uncaughtException', (err) => {
  console.error('CRITICAL BACKEND ERROR:', err);
});

process.on('unhandledRejection', (reason) => {
  console.error('UNHANDLED PROMISE REJECTION:', reason);
});

app.listen(PORT, '127.0.0.1', () => {
  console.log(`\n==================================================`);
  console.log(`GCCT Backend operating cleanly on http://127.0.0.1:${PORT}`);
  console.log(`KEEP THIS TERMINAL OPEN! Server is listening...`);
  console.log(`==================================================\n`);
});