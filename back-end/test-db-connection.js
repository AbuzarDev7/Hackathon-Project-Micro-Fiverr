const mongoose = require('mongoose');
require('dotenv').config();

const testDb = async () => {
    try {
        console.log('📡 Testing MongoDB Connection...');
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ Connected.');
        
        console.log('📝 Testing Write Operation...');
        const TestSchema = new mongoose.Schema({ name: String });
        const TestModel = mongoose.model('Test', TestSchema);
        const doc = await TestModel.create({ name: 'ConnectionTest_' + Date.now() });
        console.log('✅ Write Successful:', doc._id);
        
        console.log('🗑️ Cleaning up...');
        await TestModel.findByIdAndDelete(doc._id);
        console.log('✅ Cleanup Successful.');
        
        await mongoose.disconnect();
        console.log('🏁 Test Completed Successfully.');
        process.exit(0);
    } catch (err) {
        console.error('❌ Test Failed:', err.message);
        process.exit(1);
    }
};

testDb();
