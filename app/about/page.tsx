import Link from 'next/link';
import Button from '@/components/ui/Button';
import Image from 'next/image';
import Seo from '@/components/Seo';
import LogoLoop from '@/components/LogoLoop';

export default function AboutPage() {
    const medicalLogos = [
        { src: '/images/partner-logos/WebMD_logo-150x35.png', alt: 'WebMD', href: '#' },
        { src: '/images/partner-logos/bachem_logo_blue-1-150x31.png', alt: 'Bachem', href: '#' },
        { src: '/images/partner-logos/bioxconomy_logo.png', alt: 'Bioxconomy', href: '#' },
        { src: '/images/partner-logos/thesciencetime_logo.png', alt: 'ScienceTime', href: '#' },
        { src: '/images/partner-logos/hypebae_logo.png', alt: 'Hypebae', href: '#' },
        { src: '/images/partner-logos/nih_logo.png', alt: 'NIH', href: '#' },
        { src: '/images/partner-logos/pubmed_logo.png', alt: 'PubMed', href: '#' },
        { src: '/images/partner-logos/fda_logo.png', alt: 'FDA', href: '#' },
        { src: '/images/partner-logos/mayo_logo.png', alt: 'Mayo Clinic', href: '#' },
        { src: '/images/partner-logos/hopkins_logo.png', alt: 'Johns Hopkins', href: '#' },
        { src: '/images/partner-logos/stanford_logo.png', alt: 'Stanford Medicine', href: '#' },
    ];

    return (
        <div className="bg-white">
            <Seo 
                title="About PeptideLab – Premium Research-Grade Peptides"
                description="Learn about PeptideLab's mission to provide high-purity, lab-tested peptides for research professionals worldwide. GMP-compliant manufacturing with full transparency."
                keywords="about peptides, peptide company, research peptides supplier, peptide lab, GMP peptides, peptide manufacturer, biotech company"
            />
            
            {/* Hero Section */}
            <section className="bg-primary text-white py-20">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6">About Us</h1>
                    <p className="text-xl max-w-2xl mx-auto text-blue-100">
                        Science-Driven. Results-Focused. Global Excellence.
                    </p>
                </div>
            </section>

            {/* Mission Section */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto text-center">
                        <h2 className="text-3xl font-heading font-bold text-dark mb-6">
                            Our Mission
                        </h2>
                        <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                            At PeptideLab, we are committed to providing the scientific community with the highest-quality research peptides for cutting-edge biomedical studies. 
                            As a leading peptide manufacturing company, we specialize in producing a wide range of synthetic peptides, including biologically active peptides, 
                            peptide hormones, and custom peptide synthesis solutions. Our dedication to quality, purity, and innovation has made us the best peptide company for researchers worldwide.
                        </p>
                    </div>
                </div>
            </section>

            {/* Why Purity? Section */}
            <section className="bg-gray-50 py-16 md:py-16">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-heading font-bold text-dark mb-4">Why PeptideLab?</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Peptides are taking the world by storm – redefining what's possible in longevity, performance, and vitality science.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
                        <div>
                            <div className="bg-white p-8 rounded-lg shadow-md border-l-4 border-primary mb-6">
                                <h3 className="text-xl font-bold text-dark mb-2">Research-Grade Quality</h3>
                                <p className="text-gray-600">
                                    We supply only the highest purity peptides, synthesized in GMP-compliant facilities and rigorously tested for identity and purity.
                                </p>
                            </div>
                            <div className="bg-white p-8 rounded-lg shadow-md border-l-4 border-secondary mb-6">
                                <h3 className="text-xl font-bold text-dark mb-2">Transparency First</h3>
                                <p className="text-gray-600">
                                    Every batch comes with a Certificate of Analysis (CoA) so you know exactly what you're researching with. No fillers, no secrets.
                                </p>
                            </div>
                            <div className="bg-white p-8 rounded-lg shadow-md border-l-4 border-accent">
                                <h3 className="text-xl font-bold text-dark mb-2">Secure & Specialized</h3>
                                <p className="text-gray-600">
                                    We understand the unique needs of researchers. Our packaging is distinct, professional, and designed to preserve peptide integrity.
                                </p>
                            </div>
                        </div>
                        <div className="relative h-[600px] md:h-96 w-full">
                            <Image
                                src="/images/about-peptidelab.png"
                                alt="PeptideLab Scientific Excellence"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Peptides Matter Section */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-heading font-bold text-dark mb-4">Why Peptides?</h2>
                            <p className="text-gray-600">
                                Peptides play a critical role in biomedical and life sciences research, contributing to advancements in metabolism, 
                                cellular repair, immune function, and molecular signaling.
                            </p>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <div className="text-center p-6">
                                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                    </svg>
                                </div>
                                <h3 className="font-bold text-dark mb-2">Metabolism</h3>
                                <p className="text-gray-600 text-sm">Essential for studying metabolic processes and hormonal regulation</p>
                            </div>
                            
                            <div className="text-center p-6">
                                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                    </svg>
                                </div>
                                <h3 className="font-bold text-dark mb-2">Cellular Repair</h3>
                                <p className="text-gray-600 text-sm">Key players in tissue repair and wound healing research</p>
                            </div>
                            
                            <div className="text-center p-6">
                                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                    </svg>
                                </div>
                                <h3 className="font-bold text-dark mb-2">Immune Function</h3>
                                <p className="text-gray-600 text-sm">Critical for understanding immune response mechanisms</p>
                            </div>
                            
                            <div className="text-center p-6">
                                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                </div>
                                <h3 className="font-bold text-dark mb-2">Molecular Signaling</h3>
                                <p className="text-gray-600 text-sm">Vital for studying cellular communication pathways</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Quality Commitment Section */}
            <section className="py-16 bg-primary text-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-3xl font-heading font-bold mb-6">Our Quality Commitment</h2>
                        <p className="text-blue-100 mb-8">
                            With decades of expertise in peptide manufacturing, PeptideLab provides researchers with consistent, high-purity peptides 
                            that drive groundbreaking discoveries. We prioritize quality and innovation, ensuring that every peptide meets the 
                            stringent demands of scientific research.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                            <div className="bg-white/10 p-6 rounded-xl">
                                <h3 className="font-bold text-lg mb-2">Rigorous Testing</h3>
                                <p className="text-blue-100 text-sm">Every batch undergoes HPLC and Mass Spectrometry testing</p>
                            </div>
                            <div className="bg-white/10 p-6 rounded-xl">
                                <h3 className="font-bold text-lg mb-2">99%+ Purity</h3>
                                <p className="text-blue-100 text-sm">Certificate of Analysis (COA) included with every order</p>
                            </div>
                            <div className="bg-white/10 p-6 rounded-xl">
                                <h3 className="font-bold text-lg mb-2">Same Day Shipping</h3>
                                <p className="text-blue-100 text-sm">Fast shipping from the USA with tracking</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Medical Partners LogoLoop Section */}
            <section className="py-12 bg-white">
                <div className="text-center">
                    <h3 className="text-2xl font-heading font-bold text-dark mb-6">Medical & Research Partners</h3>
                    <div className="mt-4">
                        <LogoLoop
                            logos={medicalLogos}
                            speed={100}
                            direction="left"
                            logoHeight={40}
                            gap={50}
                            fadeOut
                            fadeOutColor="#ffffff"
                            ariaLabel="Medical and research partners"
                        />
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 text-center bg-gray-50">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-heading font-bold text-dark mb-6">Ready to Advance Your Research?</h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
                        When you need research peptides for sale, trust PeptideLab for unparalleled precision and reliability. 
                        Our peptides undergo rigorous quality control and testing to ensure the highest purity standards.
                    </p>
                    <div className="flex justify-center gap-4">
                        <Link href="/shop">
                            <Button variant="primary" size="lg">Browse Products</Button>
                        </Link>
                        <Link href="/contact">
                            <Button variant="outline" size="lg">Contact Us</Button>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}