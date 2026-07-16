'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

export default function ContactPage() {
    const t = useTranslations('contact');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        purpose: '',
        message: ''
    });
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');

        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                setStatus('success');
                setFormData({ name: '', email: '', purpose: '', message: '' });
            } else {
                setStatus('error');
            }
        } catch (error) {
            setStatus('error');
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className="bg-gray-50 min-h-screen">
            {/* Hero Section */}
            <section className="bg-primary text-white py-20">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6">{t('heroTitle')}</h1>
                    <p className="text-xl text-blue-100 max-w-2xl mx-auto">
                        {t('heroSubtitle')}
                    </p>
                </div>
            </section>

            {/* Contact Form Section */}
            <section className="py-12">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm border overflow-hidden">
                        <div className="grid grid-cols-1 md:grid-cols-2">

                            {/* Contact Info Sidebar */}
                            <div className="bg-primary p-10 text-white flex flex-col justify-between">
                                <div>
                                    <h1 className="text-3xl font-heading font-bold mb-6">{t('getInTouch')}</h1>
                                    <p className="text-blue-100 mb-8 leading-relaxed">
                                        {t('getInTouchDesc')}
                                    </p>

                                    <div className="space-y-6">
                                        <div className="flex items-start space-x-4">
                                            <svg className="w-6 h-6 text-accent mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                            </svg>
                                            <div>
                                                <h3 className="font-semibold text-lg">{t('email')}</h3>
                                                <p className="text-blue-100">support@peptidemint.com</p>
                                            </div>
                                        </div>

                                        <div className="flex items-start space-x-4">
                                            <svg className="w-6 h-6 text-accent mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            <div>
                                                <h3 className="font-semibold text-lg">{t('supportHours')}</h3>
                                                <p className="text-blue-100">{t('supportHoursValue')}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-12">
                                    <p className="text-sm text-blue-200">
                                        © 2026 PeptideMint. Made for Advanced Research.
                                    </p>
                                </div>
                            </div>

                            {/* Form Section */}
                            <div className="p-10">
                                <h2 className="text-2xl font-bold text-dark mb-6">{t('sendMessage')}</h2>

                                {status === 'success' ? (
                                    <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center animate-fade-in">
                                        <svg className="w-16 h-16 text-green-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <h3 className="text-xl font-bold text-green-800 mb-2">{t('messageSent')}</h3>
                                        <p className="text-green-700">
                                            {t('messageSentDesc')}
                                        </p>
                                        <button
                                            onClick={() => setStatus('idle')}
                                            className="mt-6 text-green-700 font-semibold hover:underline"
                                        >
                                            {t('sendAnother')}
                                        </button>
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <Input
                                            label={t('fullName')}
                                            name="name"
                                            placeholder="John Doe"
                                            required
                                            value={formData.name}
                                            onChange={handleChange}
                                        />

                                        <Input
                                            label={t('emailAddress')}
                                            name="email"
                                            type="email"
                                            placeholder="john@example.com"
                                            required
                                            value={formData.email}
                                            onChange={handleChange}
                                        />

                                        <div>
                                            <label className="block text-sm font-medium text-dark mb-2">
                                                {t('purposeOfInquiry')} <span className="text-error">*</span>
                                            </label>
                                            <select
                                                name="purpose"
                                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200"
                                                required
                                                value={formData.purpose}
                                                onChange={handleChange}
                                            >
                                                <option value="">- Select -</option>
                                                <option value="General Inquiry">{t('generalInquiry')}</option>
                                                <option value="Order Status">{t('orderStatus')}</option>
                                                <option value="Product Information">{t('productInformation')}</option>
                                                <option value="Wholesale/Bulk">{t('wholesaleBulk')}</option>
                                                <option value="Technical Support">{t('technicalSupport')}</option>
                                            </select>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-dark mb-2">
                                                {t('message')} <span className="text-error">*</span>
                                            </label>
                                            <textarea
                                                name="message"
                                                rows={5}
                                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200"
                                                placeholder="How can we help you?"
                                                required
                                                value={formData.message}
                                                onChange={handleChange}
                                            />
                                        </div>

                                        <Button
                                            type="submit"
                                            variant="primary"
                                            className="w-full"
                                            isLoading={status === 'loading'}
                                        >
                                            {t('submitForm')}
                                        </Button>
                                    </form>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            
            {/* Why Contact Us Section */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-heading font-bold text-dark mb-4">{t('howWeCanHelp')}</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            {t('getInTouchDesc')}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="p-6 bg-gray-50 rounded-xl">
                            <h3 className="font-bold text-dark mb-3">{t('productQuestions')}</h3>
                            <p className="text-gray-600 text-sm">{t('productQuestionsDesc')}</p>
                        </div>
                        <div className="p-6 bg-gray-50 rounded-xl">
                            <h3 className="font-bold text-dark mb-3">{t('orderSupport')}</h3>
                            <p className="text-gray-600 text-sm">{t('orderSupportDesc')}</p>
                        </div>
                        <div className="p-6 bg-gray-50 rounded-xl">
                            <h3 className="font-bold text-dark mb-3">{t('bulkOrders')}</h3>
                            <p className="text-gray-600 text-sm">{t('bulkOrdersDesc')}</p>
                        </div>
                        <div className="p-6 bg-gray-50 rounded-xl">
                            <h3 className="font-bold text-dark mb-3">{t('techSupport')}</h3>
                            <p className="text-gray-600 text-sm">{t('techSupportDesc')}</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
