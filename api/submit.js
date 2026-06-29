export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    // Whitelist only the fields we expect from the frontend
    // This prevents malicious users from injecting arbitrary data into your Make scenario
    const {
      full_name,
      email,
      phone,
      property_type,
      bedrooms,
      current_situation,
      property_area,
      property_address
    } = req.body || {};

    const payload = {
      full_name,
      email,
      phone,
      property_type,
      bedrooms,
      current_situation,
      property_area,
      property_address
    };

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

    // Try to find the rent values in various common formats Make might return
    const min_rent = responseData.min_rent ?? responseData.minRent ?? (responseData.data && (responseData.data.min_rent ?? responseData.data.minRent)) ?? null;
    const max_rent = responseData.max_rent ?? responseData.maxRent ?? (responseData.data && (responseData.data.max_rent ?? responseData.data.maxRent)) ?? null;

    return res.status(200).json({
      success: true,
      message: 'Submitted successfully',
      min_rent,
      max_rent
    });

  } catch (error) {
    console.error('API Route Error:', error);

    return res.status(500).json({
      success: false,
      message: 'Internal Server Error'
    });
  }
}
