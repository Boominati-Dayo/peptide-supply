import mongoose from 'mongoose';

const MONGO_URI = 'mongodb+srv://mishusema237_db_user:Boominati@peptides.qwpchdj.mongodb.net/?appName=peptides';

const CategorySchema = new mongoose.Schema({
    name: { type: String, required: true },
    slug: { type: String, unique: true },
    description: String,
}, { timestamps: true });

const Category = mongoose.models.Category || mongoose.model('Category', CategorySchema);

const categories = [
    { name: 'Performance', slug: 'performance', description: 'Peptides for enhanced physical performance and athletic performance' },
    { name: 'Weight Loss', slug: 'weight-loss', description: 'Peptides that support fat loss and metabolic function' },
    { name: 'Recovery', slug: 'recovery', description: 'Peptides for tissue repair, healing and recovery' },
];

async function seedCategories() {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('Connected to MongoDB');

        for (const cat of categories) {
            await Category.findOneAndUpdate(
                { slug: cat.slug },
                { $setOnInsert: cat },
                { upsert: true, new: true }
            );
            console.log(`✓ ${cat.name}`);
        }

        console.log('\nAll categories ready!');
        console.log('Current categories:', await Category.find({}).select('name').lean());

    } catch (error) {
        console.error('Error:', error);
    } finally {
        await mongoose.disconnect();
    }
}

seedCategories();