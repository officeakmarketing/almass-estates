export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const payload = req.body;
    const webhookUrl = process.env.WEBHOOK_URL;

    if (!webhookUrl) {
      console.error('Missing WEBHOOK_URL environment variable');
      return res.status(500).json({ message: 'Webhook configuration error on server' });
    }

    // Forward the request to LeadConnector
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error(`Webhook responded with status: ${response.status}`);
    }

    // Respond back to the React frontend
    return res.status(200).json({ success: true, message: 'Submitted successfully' });
  } catch (error) {
    console.error('API Route Error:', error);
    return res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
}
