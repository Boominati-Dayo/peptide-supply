import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import Button from '@/components/ui/Button';
import Image from 'next/image';
import Seo from '@/components/Seo';
import LogoLoop from '@/components/LogoLoop';

export default async function AboutPage() {
    const t = await getTranslations('about');
    const c = await getTranslations('common');
    const n = await getTranslations('nav');

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
        <div className="bg-white overflow-hidden">
            <Seo 
                title={t('pageTitle')}
                description={t('pageDescription')}
                keywords="about peptides, peptide company, research peptides supplier, peptide lab, GMP peptides, peptide manufacturer, biotech company"
            />
            
            {/* HERO SECTION - Creative Skewed Design */}
            <section className="relative min-h-[70vh] flex items-center overflow-hidden">
                {/* Background with skewed shapes */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-primary-100/30"></div>
                <div className="absolute top-0 right-0 w-[50%] h-full bg-primary/5 transform -skew-x-12"></div>
                <div className="absolute bottom-0 left-0 w-[35%] h-[50%] bg-secondary/10 transform skew-x-12 rounded-t-full"></div>
                
                {/* Floating skewed decorative elements */}
                <div className="absolute top-20 left-10 w-32 h-32 bg-primary/10 rotate-12 rounded-2xl animate-float"></div>
                <div className="absolute bottom-20 right-20 w-24 h-24 bg-secondary/20 -rotate-12 rounded-2xl animate-float-delayed"></div>
                
                <div className="container mx-auto px-6 relative z-10 py-20">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        {/* Content */}
                        <div className="space-y-6">
                            
                            <h1 className="text-5xl md:text-6xl text-dark font-bold leading-tight">
                                {t.rich('heroTitle', { highlight: (chunks) => <span className="text-primary">{chunks}</span> })}
                            </h1>
                            <p className="text-xl text-gray-600 max-w-xl leading-relaxed">
                                {t('heroSubtitle')}
                            </p>
                            <p className="text-gray-500 leading-relaxed">
                                {t('heroDesc')}
                            </p>
                        </div>
                        
                        {/* Creative Image Composition */}
                        <div className="relative h-[400px] lg:h-[500px]">
                            {/* Main skewed container */}
                            <div className="absolute inset-0 transform rotate-2 hover:rotate-0 transition-transform duration-700 ease-out">
                                <div className="relative w-full h-full rounded-2xl overflow-hidden" style={{ clipPath: 'polygon(10% 0, 100% 0, 90% 100%, 0% 100%)' }}>
                                    <Image
                                        src="/images/ManyPeptideBottlesOnATreansparentSurfaceWithLightShiningFromBeneathTheTable.jpg"
                                        alt="PeptideMint Scientific Excellence"
                                        fill
                                        className="object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-dark/50 via-transparent to-transparent"></div>
                                </div>
                            </div>
                            
                            {/* Floating diamond badge */}
                            <div className="absolute -bottom-4 -left-4 bg-white p-4 shadow-2xl rounded-2xl transform rotate-6 hover:rotate-0 transition-transform duration-300">
                                <div className="w-20 h-20 bg-primary/10 flex items-center justify-center rounded-xl" style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }}>
                                    <span className="text-primary font-bold text-lg">GMP</span>
                                </div>
                            </div>
                            
                            {/* Triangle accent */}
                            <div className="absolute top-10 -right-4 w-16 h-16 bg-secondary/30 rounded-b-xl" style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Mission Section with Asymmetric Layout */}
            <section className="py-20 relative overflow-hidden">
                {/* Decorative skewed background */}
                <div className="absolute top-0 left-0 w-full h-full">
                    <div className="absolute top-1/2 left-0 w-[30%] h-[400px] bg-primary/5 -skew-x-12 -translate-y-1/2"></div>
                </div>
                
                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-3xl mx-auto text-center">
                        <h2 className="text-4xl font-heading font-bold text-dark mb-8 relative inline-block">
                            <span className="relative z-10">{t('ourMission')}</span>
                            <span className="absolute bottom-0 left-0 w-full h-3 bg-secondary/30 -z-10 transform -skew-x-12"></span>
                        </h2>
                        <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                            {t('missionText')}
                        </p>
                    </div>
                </div>
            </section>

            {/* Why Purity? Section - Creative Design */}
            <section className="py-20 bg-gray-50 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[40%] h-full bg-primary/5 transform skew-x-12"></div>
                
                <div className="container mx-auto px-4 relative z-10">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-heading font-bold text-dark mb-4 relative inline-block">
                            {t.rich('whyPeptideMint', { highlight: (chunks) => <span className="text-primary">{chunks}</span> })}
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                            {t('whySubtitle')}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
                        {/* Image with skewed frame */}
                        <div className="relative h-[500px] md:h-auto order-2 md:order-1">
                            <div className="absolute inset-0 transform translate-x-4 translate-y-4 bg-primary/20 skew-x-12 rounded-3xl"></div>
                            <div className="relative h-full w-full overflow-hidden rounded-2xl" style={{ clipPath: 'polygon(0 0, 100% 0, 85% 100%, 15% 100%)' }}>
                                <Image
                                    src="/images/MS40PacksOfPeptidesStackedUp.jpg"
                                    alt="Peptide Products"
                                    fill
                                    className="object-cover hover:scale-105 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-dark/60 to-transparent"></div>
                            </div>
                            
                            {/* Floating stats card */}
                            <div className="absolute -bottom-6 -right-2 md:right-8 bg-white p-5 shadow-2xl transform rotate-3">
                                <div className="text-center">
                                    <p className="text-3xl font-bold text-primary">99%+</p>
                                    <p className="text-xs text-gray-500 font-bold uppercase">Purity Guaranteed</p>
                                </div>
                            </div>
                        </div>
                        
                        {/* Feature cards with angled edges */}
                        <div className="space-y-6 order-1 md:order-2">
                            <div className="bg-white p-6 shadow-lg transform -rotate-1 hover:rotate-0 transition-all duration-300 rounded-2xl" style={{ clipPath: 'polygon(0 0, 100% 0, 98% 100%, 2% 100%)' }}>
                                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                                    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-dark mb-2">{t('researchGrade')}</h3>
                                <p className="text-gray-600">
                                    {t('researchGradeDesc')}
                                </p>
                            </div>
                            
                            <div className="bg-white p-6 shadow-lg transform rotate-1 hover:rotate-0 transition-all duration-300 rounded-2xl" style={{ clipPath: 'polygon(2% 0, 100% 0, 100% 98%, 0% 100%)' }}>
                                <div className="w-12 h-12 bg-secondary/20 rounded-lg flex items-center justify-center mb-4">
                                    <svg className="w-6 h-6 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-dark mb-2">{t('transparencyFirst')}</h3>
                                <p className="text-gray-600">
                                    {t('transparencyDesc')}
                                </p>
                            </div>
                            
                            <div className="bg-white p-6 shadow-lg transform -rotate-0.5 hover:rotate-0 transition-all duration-300 rounded-2xl" style={{ clipPath: 'polygon(5% 0, 95% 0, 100% 100%, 0% 100%)' }}>
                                <div className="w-12 h-12 bg-accent/30 rounded-lg flex items-center justify-center mb-4">
                                    <svg className="w-6 h-6 text-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-dark mb-2">{t('secureSpecialized')}</h3>
                                <p className="text-gray-600">
                                    {t('secureSpecializedDesc')}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Peptides Matter Section - Diamond Grid */}
            <section className="py-20 bg-white relative overflow-hidden">
                <div className="absolute inset-0">
                    <div className="absolute top-0 right-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-secondary/5 rounded-full blur-3xl"></div>
                </div>
                
                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-4xl mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl font-heading font-bold text-dark mb-4">{t('whyPeptides')}</h2>
                            <p className="text-gray-600 text-lg">
                                {t('whyPeptidesDesc')}
                            </p>
                        </div>
                        
                        {/* Diamond grid layout */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {/* Card 1 - Diamond shape */}
                            <div className="group relative p-8 bg-white shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 rounded-2xl" style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }}>
                                <div className="absolute inset-2 bg-gray-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }}></div>
                                <div className="relative z-10 text-center">
                                    <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 transform rotate-45 group-hover:rotate-0 transition-transform duration-300">
                                        <svg className="w-7 h-7 text-primary -rotate-45 group-hover:rotate-0 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                        </svg>
                                    </div>
                                    <h3 className="font-bold text-dark mb-2">{t('metabolism')}</h3>
                                    <p className="text-gray-600 text-sm">{t('metabolismDesc')}</p>
                                </div>
                            </div>
                            
                            {/* Card 2 - Skewed rectangle */}
                            <div className="group relative p-8 bg-white shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 rounded-2xl" style={{ clipPath: 'polygon(0 0, 100% 5%, 100% 100%, 0 95%)' }}>
                                <div className="text-center">
                                    <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                                        <svg className="w-7 h-7 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                        </svg>
                                    </div>
                                    <h3 className="font-bold text-dark mb-2">{t('cellularRepair')}</h3>
                                    <p className="text-gray-600 text-sm">{t('cellularRepairDesc')}</p>
                                </div>
                            </div>
                            
                            {/* Card 3 - Hexagon-like */}
                            <div className="group relative p-8 bg-white shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 rounded-2xl" style={{ clipPath: 'polygon(5% 0, 95% 0, 100% 50%, 95% 100%, 5% 100%, 0% 50%)' }}>
                                <div className="text-center">
                                    <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                                        <svg className="w-7 h-7 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                        </svg>
                                    </div>
                                    <h3 className="font-bold text-dark mb-2">{t('immuneFunction')}</h3>
                                    <p className="text-gray-600 text-sm">{t('immuneFunctionDesc')}</p>
                                </div>
                            </div>
                            
                            {/* Card 4 - Triangle top */}
                            <div className="group relative p-8 bg-white shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 rounded-2xl" style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 100%, 0% 100%, 0% 25%)' }}>
                                <div className="text-center">
                                    <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                                        <svg className="w-7 h-7 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                        </svg>
                                    </div>
                                    <h3 className="font-bold text-dark mb-2">{t('molecularSignaling')}</h3>
                                    <p className="text-gray-600 text-sm">{t('molecularSignalingDesc')}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Quality Commitment Section - Layered Design */}
            <section className="py-20 bg-primary text-white relative overflow-hidden">
                <div className="absolute inset-0">
                    <div className="absolute top-0 left-0 w-full h-4 bg-gradient-to-b from-white/10 to-transparent"></div>
                    <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
                    <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-secondary/20 rounded-full blur-3xl"></div>
                </div>
                
                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-4xl font-heading font-bold mb-8 relative inline-block">
                            <span className="relative z-10">{t('qualityCommitment')}</span>
                            <span className="absolute bottom-0 left-0 w-full h-2 bg-white/20 -skew-x-12"></span>
                        </h2>
                        <p className="text-pink-100 mb-12 text-lg leading-relaxed">
                            {t('qualityDesc')}
                        </p>
                        
                        {/* Three column skewed cards */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="group bg-white/10 p-8 rounded-xl hover:bg-white/20 transition-all duration-300 transform hover:-translate-y-2">
                                <div className="w-16 h-16 bg-white/20 rounded-lg flex items-center justify-center mx-auto mb-4 transform -rotate-12 group-hover:rotate-0 transition-transform duration-300">
                                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                                    </svg>
                                </div>
                                <h3 className="font-bold text-lg mb-2">{t('rigorousTesting')}</h3>
                                <p className="text-pink-100 text-sm">{t('rigorousTestingDesc')}</p>
                            </div>
                            
                            <div className="group bg-white/10 p-8 rounded-xl hover:bg-white/20 transition-all duration-300 transform hover:-translate-y-2 md:-mt-8">
                                <div className="w-16 h-16 bg-white/20 rounded-lg flex items-center justify-center mx-auto mb-4 rotate-12 group-hover:rotate-0 transition-transform duration-300">
                                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <h3 className="font-bold text-lg mb-2">{t('purityGuaranteed')}</h3>
                                <p className="text-pink-100 text-sm">{t('purityGuaranteedDesc')}</p>
                            </div>
                            
                            <div className="group bg-white/10 p-8 rounded-xl hover:bg-white/20 transition-all duration-300 transform hover:-translate-y-2">
                                <div className="w-16 h-16 bg-white/20 rounded-lg flex items-center justify-center mx-auto mb-4 transform -rotate-6 group-hover:rotate-0 transition-transform duration-300">
                                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                </div>
                                <h3 className="font-bold text-lg mb-2">{t('sameDayShipping')}</h3>
                                <p className="text-pink-100 text-sm">{t('sameDayShippingDesc')}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Medical Partners LogoLoop Section */}
            <section className="py-16 bg-white relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-gray-50 via-white to-gray-50"></div>
                <div className="container mx-auto px-4 relative z-10">
                    <div className="text-center">
                        <h3 className="text-2xl font-heading font-bold text-dark mb-8 relative inline-block">
                            {t('medicalPartners')}
                            <span className="absolute -bottom-2 left-0 w-full h-1 bg-primary/30 transform -skew-x-12"></span>
                        </h3>
                        <div className="mt-6">
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
                </div>
            </section>

            {/* CTA Section - Angled Design */}
            <section className="py-20 text-center bg-gray-50 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full">
                    <div className="absolute top-1/2 left-0 w-[20%] h-[200px] bg-primary/5 -skew-x-12 -translate-y-1/2"></div>
                    <div className="absolute top-1/2 right-0 w-[20%] h-[200px] bg-secondary/5 skew-x-12 -translate-y-1/2"></div>
                </div>
                
                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-2xl mx-auto">
                        <h2 className="text-4xl font-heading font-bold text-dark mb-6">{t('ctaTitle')}</h2>
                        <p className="text-lg text-gray-600 mb-10 max-w-xl mx-auto leading-relaxed">
                            {t('ctaDesc')}
                        </p>
                        <div className="flex justify-center gap-6 flex-wrap">
                            <Link href="/shop">
                                <Button size="lg" className="shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                                    {t('browseProducts')}
                                </Button>
                            </Link>
                            <Link href="/contact">
                                <Button size="lg" variant="outline" className="border-2 border-primary/30 hover:border-primary transition-all">
                                    {t('contactUs')}
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}