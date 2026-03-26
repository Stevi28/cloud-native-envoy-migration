const express = require('express');
const { MongoClient } = require('mongodb');
const redis = require('redis');

const app = express();
const port = 3000;

const MONGO_URL = process.env.MONGO_URL;
const REDIS_URL = process.env.REDIS_URL;

if (!MONGO_URL || !REDIS_URL) {
  console.error('ERROR: MONGO_URL and REDIS_URL environment variables must be set.');
  process.exit(1);
}

async function checkMongo() {
  const client = new MongoClient(MONGO_URL, {
    serverSelectionTimeoutMS: 3000,
  });
  try {
    await client.connect();
    await client.db('admin').command({ ping: 1 });
    return { ok: true };
  } catch (err) {
    return { ok: false, error: err.message };
  } finally {
    await client.close();
  }
}

async function checkRedis() {
  const client = redis.createClient({ url: REDIS_URL });
  try {
    await client.connect();
    await client.ping();
    return { ok: true };
  } catch (err) {
    return { ok: false, error: err.message };
  } finally {
    await client.quit();
  }
}

app.get('/', async (req, res) => {
  const [mongo, redisResult] = await Promise.all([checkMongo(), checkRedis()]);

  const status = (check) =>
    check.ok
      ? '✅ Connected'
      : `❌ Failed — ${check.error}`;

  res.send(`
    <h1>Hello! This app is running inside a Docker Container.</h1>
    <h2>DB Connectivity</h2>
    <ul>
      <li><strong>MongoDB:</strong> ${status(mongo)}</li>
      <li><strong>Redis:</strong> ${status(redisResult)}</li>
    </ul>
  `);
});

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});