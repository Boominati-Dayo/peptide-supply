import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const ProductSchema = new mongoose.Schema({
    name: { type: String, required: true },
    slug: { type: String, unique: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    images: [String],
    category: { type: String, required: true },
    stock: { type: Number, default: 100 },
    sku: String,
    purity: String,
    content: String,
    size: String,
    form: String,
    soldout_status: { type: Boolean, default: false },
    featured: { type: Boolean, default: false },
}, { timestamps: true });

const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);

const peptides = [
    {
        name: "CJC-1295 with DAC",
        slug: "cjc-1295-dac",
        description: "CJC-1295 with DAC is a long-acting growth hormone releasing hormone (GHRH) analog. It stimulates GH release and increases IGF-1 levels for extended periods.",
        price: 89.99,
        images: ["/images/peptide-injections.webp"],
        category: "Performance",
        stock: 150,
        sku: "CJC-1295-DAC-10MG",
        purity: "99%+",
        content: "10mg",
        size: "10mg",
        form: "Lyophilized Powder",
    },
    {
        name: "Ipamorelin",
        slug: "ipamorelin",
        description: "Ipamorelin is a selective growth hormone secretagogue (GHS) that stimulates GH release with minimal side effects. Highly potent and research-proven.",
        price: 79.99,
        images: ["/images/peptide-injections.webp"],
        category: "Performance",
        stock: 120,
        sku: "IPAM-10MG",
        purity: "99%+",
        content: "10mg",
        size: "10mg",
        form: "Lyophilized Powder",
    },
    {
        name: "Tesamorelin",
        slug: "tesamorelin",
        description: "Tesamorelin is a synthetic analog of growth hormone-releasing hormone (GHRH). Used in research for fat loss and metabolic effects.",
        price: 129.99,
        images: ["/images/peptide-injections.webp"],
        category: "Weight Loss",
        stock: 80,
        sku: "TES-10MG",
        purity: "99%+",
        content: "10mg",
        size: "10mg",
        form: "Lyophilized Powder",
    },
    {
        name: "AOD-9604",
        slug: "aod-9604",
        description: "AOD-9604 is a modified form of hGH with fat-burning properties. Research shows it promotes lipolysis and reduces fat accumulation.",
        price: 94.99,
        images: ["/images/peptide-injections.webp"],
        category: "Weight Loss",
        stock: 95,
        sku: "AOD-20MG",
        purity: "99%+",
        content: "20mg",
        size: "20mg",
        form: "Lyophilized Powder",
    },
    {
        name: "BPC-157",
        slug: "bpc-157-10mg",
        description: "BPC-157 is a pentadecapeptide proven to accelerate wound healing and protect organs. Extensive research shows healing benefits for GI tract, tendons, and ligaments.",
        price: 69.99,
        images: ["/images/peptide-injections.webp"],
        category: "Recovery",
        stock: 200,
        sku: "BPC-157-10MG",
        purity: "99%+",
        content: "10mg",
        size: "10mg",
        form: "Lyophilized Powder",
    },
    {
        name: "TB-500 (Thymosin Beta-4)",
        slug: "tb-500-10mg",
        description: "TB-500 promotes healing and regeneration of tissues. Research demonstrates benefits for muscle recovery, joint health, and flexibility.",
        price: 84.99,
        images: ["/images/peptide-injections.webp"],
        category: "Recovery",
        stock: 110,
        sku: "TB500-10MG",
        purity: "99%+",
        content: "10mg",
        size: "10mg",
        form: "Lyophilized Powder",
    },
    {
        name: "MOTS-C",
        slug: "mots-c-10mg",
        description: "MOTS-C is a mitochondrial-derived peptide that influences metabolic regulation. Research shows benefits for energy, weight management, and exercise performance.",
        price: 119.99,
        images: ["/images/peptide-injections.webp"],
        category: "Performance",
        stock: 75,
        sku: "MOTS-C-10MG",
        purity: "99%+",
        content: "10mg",
        size: "10mg",
        form: "Lyophilized Powder",
    },
    {
        name: "Epithalon",
        slug: "epithalon-10mg",
        description: "Epithalon is a synthetic peptide that regulates telomere length and cellular aging. Research indicates anti-aging and rejuvenating properties.",
        price: 109.99,
        images: ["/images/peptide-injections.webp"],
        category: "Recovery",
        stock: 60,
        sku: "EPITH-10MG",
        purity: "99%+",
        content: "10mg",
        size: "10mg",
        form: "Lyophilized Powder",
    },
    {
        name: "DSIP (Delta-Sleep Inducing Peptide)",
        slug: "dsip-10mg",
        description: "DSIP promotes deep sleep and circadian rhythm regulation. Research shows potential for sleep disorders and stress management.",
        price: 74.99,
        images: ["/images/peptide-injections.webp"],
        category: "Recovery",
        stock: 90,
        sku: "DSIP-10MG",
        purity: "99%+",
        content: "10mg",
        size: "10mg",
        form: "Lyophilized Powder",
    },
    {
        name: "Melanotan II",
        slug: "melanotan-ii-10mg",
        description: "Melanotan II promotes melanogenesis and tanning response. Research indicates potential for skin pigmentation and appetite regulation.",
        price: 64.99,
        images: ["/images/peptide-injections.webp"],
        category: "Performance",
        stock: 140,
        sku: "MT2-10MG",
        purity: "99%+",
        content: "10mg",
        size: "10mg",
        form: "Lyophilized Powder",
    },
];

async function seedProducts() {
    try {
        const mongoUri = process.env.MONGODB_URI;
        if (!mongoUri) {
            console.error('MONGODB_URI not found in .env.local');
            process.exit(1);
        }
        
        await mongoose.connect(mongoUri);
        console.log('Connected to MongoDB');

        // Clear existing products (optional - comment out to keep existing)
        // await Product.deleteMany({});
        // console.log('Cleared existing products');

        // Insert new products
        const inserted = await Product.insertMany(peptides);
        console.log(`Successfully inserted ${inserted.length} products:`);
        
        inserted.forEach(p => console.log(`  - ${p.name} (${p.category}) - $${p.price}`));
        
        console.log('\nTotal products in database:', await Product.countDocuments());
        
    } catch (error) {
        console.error('Error seeding products:', error);
    } finally {
        await mongoose.disconnect();
        console.log('Disconnected from MongoDB');
    }
}

seedProducts();