import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const testimonials = [
    { name: "Dr. Sarah Chen", rating: 5, message: "We've been using PeptideLab for our research facility for over a year now. The purity consistently exceeds expectations, and their CoA documentation is always thorough. Highly recommend for any serious research work." },
    { name: "James Mitchell", rating: 4, message: "Good quality peptides for the price. Shipping was faster than expected. Only reason for 4 stars is that one of my orders took a bit longer to process, but the product itself was excellent." },
    { name: "Dr. Amanda Roberts", rating: 5, message: "As a researcher at a university lab, I need reliable peptide suppliers. PeptideLab has been consistent with their quality. The BPC-157 we ordered tested at 98.5% purity." },
    { name: "Marcus Thompson", rating: 3, message: "Product worked as expected, but the packaging could be improved. One vial arrived slightly damaged. Customer service was responsive though and resolved the issue quickly." },
    { name: "Dr. Emily Watson", rating: 5, message: "Excellent supplier for our clinical research. Their transparency with batch testing results gives us confidence in our work. Will continue ordering." },
    { name: "Robert Garcia", rating: 4, message: "Second time ordering and both experiences have been positive. Products arrive well-packaged with ice packs. The quality is consistent with what I'd expect from a professional supplier." },
    { name: "Dr. Lisa Park", rating: 5, message: "Finally found a reliable supplier after trying several others. PeptideLab's peptides are consistently high purity. Their team is knowledgeable and responsive to technical questions." },
    { name: "Kevin Brown", rating: 4, message: "Good overall experience. The semaglutide I purchased worked well. Would like to see more product variety, but the quality is solid." },
    { name: "Dr. Michael Foster", rating: 5, message: "I've ordered from many peptide companies over the years, and PeptideLab is among the best. Their quality control is evident in every batch. Highly recommend for research purposes." },
    { name: "Jennifer Walsh", rating: 4, message: "Satisfied with my purchase. Products arrived properly stored and labeled. The certificate of analysis was included as promised." },
    { name: "Dr. Christopher Lee", rating: 5, message: "Outstanding service and products. Our lab has placed three orders now, and each has been exactly as described with matching CoA results. Very impressed." },
    { name: "Thomas Anderson", rating: 3, message: "Decent products but had an issue with one order being delayed. It eventually arrived, but communication about the delay could have been better." },
    { name: "Dr. Rachel Green", rating: 5, message: "For peptide research, consistency is key, and PeptideLab delivers. We use their products for our studies and have never been disappointed. Excellent supplier." },
    { name: "David Kim", rating: 4, message: "Good value for money. The peptides I've used have been effective. The website could use more detailed product information, but the actual products are quality." },
    { name: "Dr. Patricia Moore", rating: 5, message: "We conduct independent testing on all our peptide purchases. PeptideLab's products have consistently matched or exceeded their stated purity levels. A trustworthy supplier." },
    { name: "Andrew Wilson", rating: 4, message: "Solid experience overall. Products are properly formulated and stored during shipping. Would order again." },
    { name: "Dr. Stephanie Taylor", rating: 5, message: "Outstanding quality and service. The team at PeptideLab really knows their products and are happy to answer questions. A pleasure to work with." },
    { name: "Brian Clark", rating: 4, message: "Works well for my needs. The TB-500 I ordered arrived in good condition. Price is reasonable for the quality you get." },
    { name: "Dr. Nancy White", rating: 5, message: "We've recommended PeptideLab to several colleagues in the research community. Their reliability and product quality make them our go-to supplier." },
    { name: "Steven Harris", rating: 3, message: "Product quality is good but had some shipping issues. Order took longer than expected to arrive. Otherwise acceptable." },
];

async function seedTestimonials() {
    try {
        await mongoose.connect(process.env.MONGODB_URI || '');
        console.log('Connected to MongoDB');

        // Clear existing testimonials
        await mongoose.connection.collection('testimonials').deleteMany({});
        console.log('Cleared existing testimonials');

        // Insert new testimonials
        await mongoose.connection.collection('testimonials').insertMany(testimonials);
        console.log('Inserted 20 testimonials');

        console.log('Seeding complete!');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding testimonials:', error);
        process.exit(1);
    }
}

seedTestimonials();