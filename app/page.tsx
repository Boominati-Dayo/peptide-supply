'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Button from '@/components/ui/Button';
import ProductCard from '@/components/ui/Card';
import ProductCarousel from '@/components/ProductCarousel';
import Seo from '@/components/Seo';
import LogoLoop from '@/components/LogoLoop';

export default function Home() {
  const [products, setProducts] = useState<any[]>([]);
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const [productsRes, testimonialsRes] = await Promise.all([
          fetch('/api/products'),
          fetch('/api/testimonials')
        ]);
        
        const productsData = await productsRes.json();
        const testimonialsData = await testimonialsRes.json();
        
        setProducts(productsData.success ? productsData.data : []);
        setTestimonials(testimonialsData.slice(0, 6));
      } catch (error) {
        console.error('Error fetching home data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHomeData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }
  
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
    <div className="bg-white scroll-smooth overflow-x-hidden">
      <Seo 
        title="PeptideMint – Premium Research-Grade Peptides | GMP Certified"
        description="PeptideMint offers high-purity, lab-tested peptides for research and professional applications. GMP-compliant manufacturing, HPLC verified purity, worldwide shipping."
        keywords="peptides, peptide synthesis, research peptides, RUO peptides, GMP peptides, laboratory peptides, peptide purity, peptide suppliers, biotech peptides, custom peptide synthesis, peptide manufacturing"
      />
      
      {/* HERO SECTION - Creative Skewed Design */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* Background with skewed shapes */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-primary-100/30"></div>
        <div className="absolute top-0 right-0 w-[60%] h-full bg-primary/5 transform -skew-x-12"></div>
        <div className="absolute bottom-0 left-0 w-[40%] h-[60%] bg-secondary/10 transform skew-x-12 rounded-t-full"></div>
        
        <div className="container mx-auto px-6 relative z-10 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Content */}
            <div className="space-y-8">
              
              <h1 className="text-5xl md:text-6xl lg:text-7xl text-dark font-bold leading-tight">
                Purity in <span className="text-primary">Every</span> Molecule
              </h1>
              <p className="text-xl text-gray-600 max-w-xl leading-relaxed">
                Premium research-grade peptides manufactured under strict quality standards. 
                HPLC verified. GMP compliant. Delivered globally.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/shop">
                  <Button size="lg" className="shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                    Explore Products
                  </Button>
                </Link>
                <Link href="/about">
                  <Button size="lg" variant="outline" className="border-2 border-primary/30 hover:border-primary transition-all">
                    Our Science
                  </Button>
                </Link>
              </div>
              
              {/* Stats */}
              <div className="flex gap-8 pt-4">
                <div className="text-center">
                  <p className="text-3xl font-bold text-primary">99%+</p>
                  <p className="text-sm text-gray-500">Purity Guaranteed</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-primary">50K+</p>
                  <p className="text-sm text-gray-500">Researchers Served</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-primary">120+</p>
                  <p className="text-sm text-gray-500">Countries</p>
                </div>
              </div>
            </div>
            
            {/* Creative Image Composition */}
            <div className="relative h-[500px] lg:h-[600px]">
              {/* Main skewed container */}
              <div className="absolute inset-0 transform rotate-3 hover:rotate-0 transition-transform duration-700 ease-out">
                <div className="relative w-full h-full clip-path-polygon">
                  <Image
                    src="/images/ManyPeptideBottlesOnATreansparentSurfaceWithLightShiningFromBeneathTheTable.jpg"
                    alt="Premium Peptide Products"
                    fill
                    className="object-cover"
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-dark/60 via-transparent to-transparent"></div>
                  
                  {/* Floating triangular badge */}
                  <div className="absolute bottom-8 right-8 bg-white/95 backdrop-blur-sm p-6 shadow-2xl">
                    <p className="text-3xl font-bold text-primary">ISO</p>
                    <p className="text-xs text-gray-500">Certified</p>
                  </div>
                </div>
              </div>
              
              {/* Floating secondary image - skewed opposite */}
              <div className="absolute -bottom-10 -left-10 w-48 h-48 md:w-64 md:h-64 transform -rotate-6 hover:rotate-0 transition-transform duration-500 z-20">
                <div className="relative w-full h-full overflow-hidden shadow-2xl">
                  <Image
                    src="/images/HandsWithPinkGlovesPullingOutPeptideFromItsBottleWithASyringe.jpg"
                    alt="Expert Handling"
                    fill
                    className="object-cover hover:scale-110 transition-transform duration-500"
                  />
                </div>
              </div>
              
              {/* Decorative angled element */}
              <div className="absolute top-10 -right-5 w-24 h-24 bg-primary transform rotate-45 opacity-20"></div>
            </div>
          </div>
        </div>
        
        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white"/>
          </svg>
        </div>
      </section>

      {/* TRANSFORMATION SECTION - Triangular Overlays */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-dark mb-4">Real Results</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">Trusted by researchers worldwide for consistent, verifiable results</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 - Skewed */}
            <div className="group relative">
              <div className="absolute inset-0 bg-primary/10 transform -skew-x-6 rounded-lg"></div>
              <div className="relative h-80 overflow-hidden">
                <Image
                  src="/images/ABeforANdAfterImageOfAWomanWHoWasFatAndIsNowInGoodShapeThanksToPeptides.jpg"
                  alt="Transformation"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-white font-bold text-xl">Research Backing</h3>
                  <p className="text-white/80 text-sm">Scientifically formulated</p>
                </div>
              </div>
            </div>
            
            {/* Card 2 - Angled */}
            <div className="group relative">
              <div className="absolute inset-0 bg-secondary/20 transform skew-x-6 rounded-lg"></div>
              <div className="relative h-80 overflow-hidden">
                <Image
                  src="/images/MS40PacksOfPeptidesStackedUp.jpg"
                  alt="Bulk Orders"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark/70 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-white font-bold text-xl">Wholesale Options</h3>
                  <p className="text-white/80 text-sm">Bulk pricing available</p>
                </div>
              </div>
            </div>
            
            {/* Card 3 - Skewed */}
            <div className="group relative">
              <div className="absolute inset-0 bg-accent/30 transform -skew-x-3 rounded-lg"></div>
              <div className="relative h-80 overflow-hidden rounded-lg">
                <Image
                  src="/images/twoUnlabledFullPeptideBottlesWithASyringeOnAPinkTable.jpg"
                  alt="Quality Products"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/70 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-white font-bold text-xl">Premium Quality</h3>
                  <p className="text-white/80 text-sm">Every batch tested</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CREATIVE INFO SECTION - Asymmetric Layout */}
      <section className="py-24 bg-gray-50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 transform skew-x-12"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            {/* Asymmetric image stack */}
            <div className="relative w-full lg:w-1/2 h-[400px]">
              <div className="absolute top-0 right-8 w-64 h-80 overflow-hidden shadow-2xl transform rotate-6 hover:rotate-0 transition-transform duration-500 z-30">
                <Image
                  src="/images/HandsWithPinkGlovesPullingOutPeptideFromItsBottleWithASyringe.jpg"
                  alt="Lab Quality"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute bottom-0 left-0 w-72 h-56 overflow-hidden shadow-2xl transform -rotate-3 hover:rotate-0 transition-transform duration-500 z-20">
                <Image
                  src="/images/HandWearingBlackGlovesWritingInBookAboutPeptideRecords.jpg"
                  alt="Documentation"
                  fill
                  className="object-cover"
                />
              </div>
              {/* Decorative element */}
              <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-primary rounded-full opacity-20 animate-pulse"></div>
            </div>
            
            {/* Content */}
            <div className="w-full lg:w-1/2 space-y-6">
              <h2 className="text-4xl font-bold text-dark">Precision in Every Step</h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                From synthesis to delivery, our rigorous quality control ensures that every peptide 
                meets the highest standards. Each batch comes with full documentation and Certificate of Analysis.
              </p>
              
              <div className="grid grid-cols-2 gap-6 pt-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-dark">HPLC Tested</h4>
                    <p className="text-sm text-gray-500">Every batch verified</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-dark">99%+ Purity</h4>
                    <p className="text-sm text-gray-500">Guaranteed quality</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-dark">GMP Certified</h4>
                    <p className="text-sm text-gray-500">Industry standard</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945a8 8 0 005.056 7.056l2.898-2.898a2 2 0 012.787-.665l5.792 2.89a2 2 0 011.789 2.89l-.299 4.272a2 2 0 01-1.992 1.792L21 22H4a2 2 0 01-2-2v-6.18l2.055-2.12a8 8 0 005.056-7.056l-2.898 2.898a2 2 0 00-.787 2.787l.299 4.272a2 2 0 001.792 1.792h4.945a2 2 0 001.945-1.788l2.898-2.898a2 2 0 012.787-.665l5.792 2.89a2 2 0 011.789 2.89l-.299 4.272a2 2 0 01-1.992 1.792L21 22H4a2 2 0 01-2-2V9.055a8 8 0 015.056-7.056z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-dark">Global Shipping</h4>
                    <p className="text-sm text-gray-500">120+ countries</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Medical Partners */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-6 text-center">
          <h3 className="text-2xl font-heading font-bold text-dark mb-6">Medical & Research Partners</h3>
          <div className="mt-4">
            <LogoLoop
              logos={medicalLogos}
              speed={80}
              direction="left"
              logoHeight={36}
              gap={40}
              fadeOut
              fadeOutColor="#ffffff"
              ariaLabel="Medical and research partners"
            />
          </div>
        </div>
      </section>

      {/* Rest of sections - Product Carousel, Feature Grid, Testimonials */}
      <section className="relative bg-white overflow-hidden">
        <div className="relative h-[400px] w-full border-b border-gray-200 overflow-hidden">
          <Image
            src="/images/peptide-injections.webp"
            alt="Peptide Injections"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-primary/30 flex flex-col items-center justify-center pt-12 px-6 text-center">
            <div className="container mx-auto">
              <h2 className="text-3xl md:text-5xl text-white mb-4 drop-shadow-lg">Engineered for Results</h2>
              <div className="w-64 h-1.5 bg-white/30 rounded-full mx-auto"></div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto bg-white p-6 md:p-16 rounded-[40px] shadow-2xl border border-gray-100 mb-20 relative z-10 -mt-20">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-heading font-bold text-dark mb-2">Featured Products</h3>
            <p className="text-gray-500">Browse our selection of research peptides</p>
          </div>
          
          {/* Product Carousel */}
          {products.length > 0 ? (
            <ProductCarousel products={products} />
          ) : (
            <div className="text-center py-10">
              <p className="text-gray-400">No products available.</p>
            </div>
          )}

          {/* View All Link */}
          <div className="text-center mt-10">
            <Link href="/shop">
              <Button variant="outline" className="border-2 border-primary/30 hover:border-primary">
                View All Products
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="py-24 md:py-32 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-24 space-y-6">
            <h2 className="text-4xl md:text-6xl text-dark max-w-5xl mx-auto leading-tight italic">Reliable Research Starts from Molecular Precision.</h2>
            <p className="text-2xl md:text-4xl font-heading italic text-dark font-light tracking-wide opacity-90">
              The Standard of Research Integrity
            </p>
          </div>

          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-t border-l border-dark shadow-2xl">
              {[
                { title: 'Purity', desc: 'Peptide accuracy depends on synthesis quality, raw materials, and controlled production environments.' },
                { title: 'Stability', desc: 'Environmental exposure, temperature, and handling conditions directly affect molecular stability.' },
                { title: 'Testing', desc: 'Third-party laboratory testing confirms identity, purity percentage, and batch consistency.' },
                { title: 'Manufacturing', desc: 'Controlled synthesis methods reduce contamination and ensure reproducible molecular structures.' },
                { title: 'Storage & Handling', desc: 'Proper packaging and storage protocols preserve peptide integrity during transit and use.' },
                { title: 'Batch Consistency', desc: 'Advanced analytical methods ensure that every vial meets precise stoichiometric specifications.' }
              ].map((factor, i) => (
                <div key={i} className="p-10 md:p-14 border-r border-b border-dark space-y-8 min-h-[300px] transition-all hover:bg-primary hover:text-white group">
                  <h3 className="text-3xl font-bold font-sans tracking-tight group-hover:translate-x-2 transition-transform">{factor.title}</h3>
                  <p className="text-xl leading-relaxed opacity-80 group-hover:opacity-100 transition-opacity">{factor.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-gray-50 overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-dark mb-4">What Our Researchers Say</h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
              Trusted by research professionals and clinicians worldwide for unmatched purity and consistency.
            </p>
          </div>

          {testimonials.length > 0 ? (
            <div className="testimonials-slider">
              <LogoLoop
                logos={testimonials.map((t: any) => ({
                  node: (
                    <div className="testimonial-slide bg-white p-6 mx-4 rounded-3xl shadow-sm border border-gray-100 w-[320px] flex-shrink-0">
                      <div className="flex mb-3 text-yellow-500 text-sm">
                        {'★'.repeat(Math.floor(t.rating))}
                        {t.rating % 1 !== 0 ? '½' : ''}
                      </div>
                      <p className="text-gray-600 italic mb-4 text-sm leading-relaxed">"{t.message.length > 150 ? t.message.substring(0, 150) + '...' : t.message}"</p>
                      <p className="font-bold text-dark text-sm">{t.name}</p>
                    </div>
                  ),
                  title: t.name,
                }))}
                speed={50}
                direction="left"
                logoHeight={180}
                gap={20}
                pauseOnHover
                ariaLabel="Customer testimonials"
              />
            </div>
          ) : (
            <div className="text-center py-10">
              <p className="text-gray-400 italic">No testimonials yet.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}