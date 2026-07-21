export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    // Whitelist only the fields we expect from the frontend
    // This prevents malicious users from injecting arbitrary data into your Make scenario
    const {
      fullName,
      email,
      phone,
      propertyAddress,
      propertyType,
      bedrooms,
      bathrooms,
      enSuite,
      wcs,
      livingRooms,
      furnishedState,
      parking,
      garden,
      licenceType,
      otherLicence,
      balcony,
      floor,
      lift,
      gdpr
    } = req.body || {};

    const payload = {
      fullName,
      email,
      phone,
      propertyAddress,
      propertyType,
      bedrooms,
      bathrooms,
      enSuite,
      wcs,
      livingRooms,
      furnishedState,
      parking,
      garden,
      licenceType,
      otherLicence,
      balcony,
      floor,
      lift,
      gdpr
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

    const minRent = responseData.minRent ?? responseData.min_rent ?? (responseData.data && (responseData.data.minRent ?? responseData.data.min_rent)) ?? null;
    const maxRent = responseData.maxRent ?? responseData.max_rent ?? (responseData.data && (responseData.data.maxRent ?? responseData.data.max_rent)) ?? null;
    const annualIncome = responseData.annualIncome ?? (responseData.data && responseData.data.annualIncome) ?? null;
    const marketRentLow = responseData.marketRentLow ?? (responseData.data && responseData.data.marketRentLow) ?? null;
    const marketRentHigh = responseData.marketRentHigh ?? (responseData.data && responseData.data.marketRentHigh) ?? null;
    const confidenceScore = responseData.confidenceScore ?? (responseData.data && responseData.data.confidenceScore) ?? null;
    const confidenceReason = responseData.confidenceReason ?? (responseData.data && responseData.data.confidenceReason) ?? null;

    return res.status(200).json({
      success: true,
      message: 'Submitted successfully',
      minRent,
      maxRent,
      annualIncome,
      marketRentLow,
      marketRentHigh,
      confidenceScore,
      confidenceReason
    });

  } catch (error) {
    console.error('API Route Error:', error);

    return res.status(500).json({
      success: false,
      message: 'Internal Server Error'
    });
  }
}
