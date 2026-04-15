const { MongoClient } = require('mongodb');

let cachedClient = null;

async function connectToDatabase() {
  if (cachedClient) {
    return cachedClient;
  }

  const client = await MongoClient.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  cachedClient = client;
  return client;
}

module.exports = async (req, res) => {
  // CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const client = await connectToDatabase();
    const db = client.db(process.env.DB_NAME || 'visionary_ip_labs');
    
    const {
      fullName,
      email,
      phone,
      collegeName,
      course,
      year,
      areaOfInterest,
      motivation
    } = req.body;

    // Validation
    if (!fullName || !email || !phone || !collegeName || !course || !year || !areaOfInterest || !motivation) {
      return res.status(400).json({
        success: false,
        detail: 'All fields are required'
      });
    }

    // Create application object
    const application = {
      id: generateUUID(),
      fullName,
      email,
      phone,
      collegeName,
      course,
      year,
      areaOfInterest,
      motivation,
      createdAt: new Date().toISOString(),
      status: 'pending'
    };

    // Insert into database
    await db.collection('applications').insertOne(application);

    return res.status(200).json({
      success: true,
      message: 'Application submitted successfully',
      applicationId: application.id
    });

  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({
      success: false,
      detail: error.message
    });
  }
};

function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}
