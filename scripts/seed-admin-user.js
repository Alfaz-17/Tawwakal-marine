const fs = require('fs');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

const env = fs.readFileSync('.env', 'utf8');
const dbUri = env.match(/DB_URI=(.*)/)[1].trim();

async function seedAdmin() {
  await mongoose.connect(dbUri);
  console.log('Connected to MongoDB');

  const email = 'tawwakalautomation@gmail.com';
  const plainPassword = 'Tawwakal@123';
  const hashedPassword = await bcrypt.hash(plainPassword, 10);

  const usersCollection = mongoose.connection.db.collection('users');
  
  const existingUser = await usersCollection.findOne({ email });
  if (existingUser) {
    await usersCollection.updateOne(
      { email },
      { $set: { password: hashedPassword, name: 'Tawwakal Admin', updatedAt: new Date() } }
    );
    console.log('Updated existing admin user:', email);
  } else {
    await usersCollection.insertOne({
      name: 'Tawwakal Admin',
      email,
      password: hashedPassword,
      createdAt: new Date(),
      updatedAt: new Date()
    });
    console.log('Created new admin user:', email);
  }

  // Verify login match
  const verifiedUser = await usersCollection.findOne({ email });
  const isMatch = await bcrypt.compare(plainPassword, verifiedUser.password);
  console.log('Password verification test:', isMatch ? 'SUCCESS ✔' : 'FAILED ✖');

  const allUsers = await usersCollection.find({}).toArray();
  console.log('Current Admin Users:', allUsers.map(u => ({ email: u.email, name: u.name })));

  await mongoose.disconnect();
  process.exit(0);
}

seedAdmin().catch(err => {
  console.error('Error seeding admin:', err);
  process.exit(1);
});
