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

  // Handle preflight
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Only allow POST
  if (req.method !== 'POST') {
    console.log('Method not allowed:', req.method);
    return res.status(405).json({ 
      success: false,
      error: 'Method not allowed',
      detail: `Expected POST but got ${req.method}` 
    });
  }

  try {
    console.log('Received request body:', req.body);

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
    } = req.body || {};

    // Validation
    if (!fullName || !email || !phone || !collegeName || !course || !year || !areaOfInterest || !motivation) {
      console.log('Validation failed. Missing fields.');
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

    console.log('Inserting application:', application);

    // Insert into database
    const result = await db.collection('applications').insertOne(application);

    console.log('Insert result:', result);

    return res.status(200).json({
      success: true,
      message: 'Application submitted successfully',
      applicationId: application.id
    });

  } catch (error) {
    console.error('Error in submit function:', error);
    return res.status(500).json({
      success: false,
      detail: error.message || 'Internal server error'
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
