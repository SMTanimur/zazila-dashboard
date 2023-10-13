import { metaKeywords } from './keywords';
import type { Metadata } from 'next';
import { siteConfig } from './site';

export const defaultMetadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default:
      'Jazila-bazaar  - Jazila-Bazaar: Your Ultimate Multi-Vendor Marketplace',
    template: 'Jazila-bazaar  | %s',
  },
  description:
    'Welcome to Jazila-Bazaar, your ultimate online shopping destination! We are your one-stop marketplace for a diverse range of products, all conveniently curated from a multitude of trusted sellers. ',
  keywords: metaKeywords.join(', '),
  creator: 'SM Tanimur Rahman',
  publisher: 'SM Tanimur Rahman',
  applicationName: 'Jazila-bazaar ',
  viewport: 'width=device-width, initial-scale=1.0',
  colorScheme: 'light',
  category: 'Jazila-Bazaar: Your Ultimate Multi-Vendor Marketplace',
  robots: {
    index: false,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: false,
      noimageindex: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  authors: [
    {
      name: 'SM Tanimur Rahman',
      url: 'https://smtanimur.vercel.app/',
    },
  ],
  themeColor: '#ffffff',
  appLinks: {
    web: {
      url: siteConfig.url,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfig.url,
    siteName: 'Jazila-bazaar',
    title:
      'Jazila-bazaar - Jazila-Bazaar: Your Ultimate Multi-Vendor Marketplace',
    description:
      'Welcome to Jazila-Bazaar, your ultimate online shopping destination! We are your one-stop marketplace for a diverse range of products, all conveniently curated from a multitude of trusted sellers. ',
    images: [
      {
        url: `${siteConfig.url}/images/seo_image.png`,
        width: 800,
        height: 600,
        alt: 'Jazila-bazaar - Jazila-Bazaar: Your Ultimate Multi-Vendor Marketplace',
      },
    ],
    emails: ['mushfiqurtanim@gmail.com'],
    phoneNumbers: ['+880 1648138404'],
    countryName: 'Bangladesh',
  },
  // icons: {
  //   // TODO: Add icons
  //   icon: {},
  // },
  twitter: {
    creator: '@smtanimur',
    site: '@Jazila-bazaar',
    card: 'summary_large_image',
    title:
      'Jazila-bazaar - Jazila-Bazaar: Your Ultimate Multi-Vendor Marketplace',
    description:
      'Welcome to Jazila-Bazaar, your ultimate online shopping destination! We are your one-stop marketplace for a diverse range of products, all conveniently curated from a multitude of trusted sellers. ',
    images: [
      {
        url: `${siteConfig.url}/images/seo_image.png`,
        width: 800,
        height: 600,
        alt: 'Jazila-bazaar - Jazila-Bazaar: Your Ultimate Multi-Vendor Marketplace',
      },
    ],
  },
} as Metadata;
