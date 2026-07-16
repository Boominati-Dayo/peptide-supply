'use client';

import { useState, useRef, useEffect } from 'react';
import { usePathname, useRouter } from '@/i18n/navigation';
import { useLocale, useTranslations } from 'next-intl';

const FLAGS: Record<string, string> = {
    en: '🇬🇧',
    fr: '🇫🇷',
    de: '🇩🇪',
    es: '🇪🇸',
    pt: '🇧🇷',
};

export default function LanguageSwitcher() {
    const t = useTranslations('languages');
    const locale = useLocale();
    const pathname = usePathname();
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClick(e: MouseEvent) {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClick);
        return () => document.removeEventListener('mousedown', handleClick);
    }, []);

    const locales = ['en', 'fr', 'de', 'es', 'pt'] as const;

    function switchLocale(nextLocale: string) {
        router.replace(pathname, { locale: nextLocale });
        setOpen(false);
    }

    return (
        <div className="relative" ref={ref}>
            <button
                onClick={() => setOpen(!open)}
                className="flex items-center gap-1.5 px-2 py-1.5 text-xs font-medium text-gray-600 hover:text-primary hover:bg-gray-50 rounded-lg transition-colors"
                aria-label="Switch language"
                type="button"
            >
                <span>{FLAGS[locale] || '🌐'}</span>
                <span className="hidden md:inline">{t(locale)}</span>
                <svg className={`w-3 h-3 transition-transform ${open ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {open && (
                <div className="absolute right-0 top-full mt-2 bg-white shadow-xl rounded-xl border border-gray-100 py-1 min-w-[150px] z-50 animate-slide-up">
                    {locales.map((l) => (
                        <button
                            key={l}
                            onClick={() => switchLocale(l)}
                            className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors ${locale === l
                                ? 'bg-primary/5 text-primary font-bold'
                                : 'text-gray-700 hover:bg-gray-50'
                            }`}
                            type="button"
                        >
                            <span>{FLAGS[l]}</span>
                            <span>{t(l)}</span>
                            {locale === l && (
                                <svg className="w-4 h-4 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            )}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
