const MongoClient = require('mongodb').MongoClient;

// MongoDB URI from Studio 3T
const uri = 'mongodb://3t__user@172.19.0.2:27017/?retryWrites=true&serverSelectionTimeoutMS=5000&connectTimeoutMS=10000&&authMechanism=SCRAM-SHA-256&3t.uriVersion=3&3t.connection.name=tdmongodb&3t.ssh=true&3t.sshAddress=172.26.82.70&3t.sshPort=22&3t.sshAuthMode=password&3t.sshUser=tdmongo&3t.alwaysShowAuthDB=true&3t.alwaysShowDBFromUserRole=true';

const dbName = 'your_database';
const collectionName = 'your_collection';

async function updateDatabase() {
    const client = new MongoClient(uri, { useUnifiedTopology: true });

    try {
        // Connect to the server
        await client.connect();
        console.log('Connected successfully to MongoDB');

        const db = client.db(dbName);
        const collection = db.collection(collectionName);

        const now = new Date();

        if (now.getHours() === 0 && now.getMinutes() === 0) {
            // Update field
            const midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0);

            await collection.updateMany(
                { "expirationTime": now },
                { $set: { "searchRemainingNews": 10, "searchRemainingPlace": 125, "expirationTime": midnight } }
            );

            console.log('Documents updated successfully');
        }
    } catch (err) {
        console.error('Error updating documents:', err);
    } finally {
        await client.close();
    }
}

// update every 10min
async function checkAndUpdate() {
    while (true) {
        await updateDatabase();
        // Wait for 10 minutes
        await new Promise(resolve => setTimeout(resolve, 10 * 60 * 1000));
    }
}

// Start
checkAndUpdate();
