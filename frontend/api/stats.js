const { MongoClient } = require('mongodb');

let cachedClient = null;

async function connectToDatabase() {
  if (cachedClient) {
    return cachedClient;
  }

  const client = await MongoClient.connect(process.env.MONGODB_URI, {
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

  cachedClient = client;
  return client;
}

module.exports = async (req, res) => {
  // CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const client = await connectToDatabase();
    const db = client.db(process.env.DB_NAME || 'visionary_ip_labs');
    
    // Get total count
    const totalApplications = await db.collection('applications').countDocuments();

    // Get count by interest area
    const byInterest = await db.collection('applications').aggregate([
      {
        $group: {
          _id: '$areaOfInterest',
          count: { $sum: 1 }
        }
      }
    ]).toArray();

    return res.status(200).json({
      success: true,
      totalApplications,
      byInterest
    });

  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({
      success: false,
      detail: error.message
    });
  }
};
