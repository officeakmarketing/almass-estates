export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const payload = req.body;
    const webhookUrl = process.env.WEBHOOK_URL;
    const makeApiKey = process.env.MAKE_API_KEY;

    if (!webhookUrl || !makeApiKey) {
      console.error('Missing environment variables');
      return res.status(500).json({ message: 'Server configuration error' });
    }

    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-make-apikey': makeApiKey
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`Make error: ${response.status} - ${text}`);
    }
    let responseData = {};
    try {
      responseData = await response.json();
    } catch (e) {
      // If the response is not valid JSON, we just ignore and send empty data
    }

    return res.status(200).json({
      success: true,
      message: 'Submitted successfully',
      estimate: responseData.estimate || null
    });

  } catch (error) {
    console.error('API Route Error:', error);

    return res.status(500).json({
      success: false,
      message: 'Internal Server Error'
    });
  }
}
