"use client";

import Head from 'next/head';
import React from 'react';

type SeoProps = {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  article?: boolean;
};

const Seo: React.FC<SeoProps> = ({ title, description, keywords, image, url, article }) => {
  const defaultTitle = 'PeptideMint – Premium Research-Grade Peptides';
  const defaultDescription = 'PeptideMint offers high-purity, lab-tested peptides for research and professional applications. GMP-compliant manufacturing, HPLC verified purity, worldwide shipping.';
  const siteUrl = url || '/';
  const seoTitle = title ?? defaultTitle;
  const seoDescription = description ?? defaultDescription;
  const seoKeywords = keywords ?? 
    'peptides, peptide synthesis, research peptides, RUO peptides, GMP peptides, laboratory peptides, peptide purity, peptide suppliers, biotech peptides, custom peptide synthesis, peptide manufacturing, peptide vendor, research grade peptides, peptide solutions, peptide testing, HPLC peptide, mass spectrometry peptides, peptide stability, peptide storage, peptide catalog, peptide wholesaler, peptide distributor';
  const seoImage = image ?? '/thumbnail.png';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'PeptideMint',
    url: siteUrl,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${siteUrl}/shop?search={search_term_string}`,
      'query-input': 'required name=search_term_string'
    }
  };

  const organizationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'PeptideMint',
    url: siteUrl,
    description: 'Premium research-grade peptide supplier',
    sameAs: []
  };

  return (
    <Head>
      <title>{seoTitle}</title>
      <meta name="description" content={seoDescription} />
      <meta name="keywords" content={seoKeywords} />
      <meta name="robots" content="index, follow" />
      <meta property="og:title" content={seoTitle} />
      <meta property="og:description" content={seoDescription} />
      <meta property="og:type" content={article ? 'article' : 'website'} />
      <meta property="og:url" content={siteUrl} />
      <meta property="og:image" content={seoImage} />
      <meta property="og:site_name" content="PeptideMint" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seoTitle} />
      <meta name="twitter:description" content={seoDescription} />
      <meta name="twitter:image" content={seoImage} />
      <link rel="canonical" href={siteUrl} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }} />
    </Head>
  );
};

export default Seo;