import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const MONGO_URI = process.env.MONGODB_URI!;

const ProductSchema = new mongoose.Schema({
    name: { type: String, required: true },
    images: [String],
}, { timestamps: true });

const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);

const productImages: Record<string, string> = {
    'CJC-1295 with DAC': '/images/peptide-injections.webp',
    'Ipamorelin': '/images/transparent-peptide-bottle.png',
    'Tesamorelin': '/images/peptide-molecules.avif',
    'AOD-9604': '/images/MS40PacksOfPeptidesStackedUp.jpg',
    'BPC-157': '/images/ManyPeptideBottlesOnATreansparentSurfaceWithLightShiningFromBeneathTheTable.jpg',
    'TB-500 (Thymosin Beta-4)': '/images/HandsWithPinkGlovesPullingOutPeptideFromItsBottleWithASyringe.jpg',
    'MOTS-C': '/images/peptide-injections.webp',
    'Epithalon': '/images/transparent-peptide-bottle.png',
    'DSIP (Delta-Sleep Inducing Peptide)': '/images/peptide-molecules.avif',
    'Melanotan II': '/images/peptide-injections.webp',
};

async function updateImages() {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('Connected to MongoDB');

        for (const [name, image] of Object.entries(productImages)) {
            await Product.updateOne(
                { name },
                { $set: { images: [image] } }
            );
            console.log(`Updated ${name} -> ${image}`);
        }

        console.log('\nDone!');
    } catch (error) {
        console.error('Error:', error);
    } finally {
        await mongoose.disconnect();
    }
}

updateImages();