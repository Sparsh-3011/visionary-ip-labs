const { MongoClient } = require('mongodb');

// Global variable to reuse connection
let client = null;

async function getClient() {
  if (client && client.topology && client.topology.isConnected()) {
    return client;
  }

  const uri = process.env.MONGODB_URI;
  
  if (!uri) {
    throw new Error('MONGODB_URI not configured');
  }

  console.log('Creating new MongoDB client...');
  
  client = new MongoClient(uri, {
    maxPoolSize: 1,
    minPoolSize: 0,
    serverSelectionTimeoutMS: 10000,
    socketTimeoutMS: 10000,
    connectTimeoutMS: 10000,
    tls: true,
    tlsAllowInvalidCertificates: false,
    retryWrites: true,
    retryReads: true,
  });

  await client.connect();
  console.log('Connected to MongoDB');
  
  return client;
}

module.exports = async (req, res) => {
  // Set headers immediately
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const startTime = Date.now();

  try {
    console.log('Request received');
    
    // Validate input first (before DB connection)
    const data = req.body;
    if (!data || !data.email || !data.fullName) {
      return res.status(400).json({ 
        success: false, 
        detail: 'Missing required fields' 
      });
    }

    console.log(`Validation passed (${Date.now() - startTime}ms)`);

    // Connect to database
    const mongoClient = await getClient();
    console.log(`DB connected (${Date.now() - startTime}ms)`);

    const db = mongoClient.db(process.env.DB_NAME || 'visionary_ip_labs');

    // Create application
    const application = {
      id: Math.random().toString(36).substring(2, 15),
      fullName: data.fullName,
      email: data.email,
      phone: data.phone,
      collegeName: data.collegeName,
      course: data.course,
      year: data.year,
      areaOfInterest: data.areaOfInterest,
      motivation: data.motivation,
      createdAt: new Date().toISOString(),
      status: 'pending'
    };

    // Insert
    await db.collection('applications').insertOne(application);
    console.log(`Insert complete (${Date.now() - startTime}ms)`);

    return res.status(200).json({
      success: true,
      message: 'Application submitted successfully',
      applicationId: application.id
    });

  } catch (error) {
    console.error('ERROR:', error.message);
    console.error('Time elapsed:', Date.now() - startTime, 'ms');
    
    return res.status(500).json({
      success: false,
      detail: `Database error: ${error.message}`,
      hint: 'Check MongoDB connection and credentials'
    });
  }
};
