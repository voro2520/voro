import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import FirebaseProvider from "@/components/FirebaseProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://voro.co.kr'),
  title: {
    default: "VORO - 웹/앱 제작 디자인 회사 | 반응형 웹사이트 개발 전문",
    template: "%s | VORO - 웹/앱 제작 디자인 회사"
  },
  description: "혁신적인 웹사이트와 모바일 앱을 제작하는 전문 디자인 회사입니다. 현대적이고 사용자 친화적인 디지털 솔루션을 제공하며, 브랜딩부터 개발까지 원스톱 서비스를 제공합니다.",
  keywords: [
    "웹 개발", "앱 개발", "UI/UX 디자인", "웹사이트 제작", "모바일 앱", "반응형 웹",
    "브랜딩", "디지털 마케팅", "기업 홈페이지", "이커머스", "랜딩페이지", "웹 디자인",
    "앱 디자인", "사용자 경험", "사용자 인터페이스", "디지털 에이전시", "웹 에이전시",
    "VORO", "보로", "웹 제작 회사", "앱 제작 회사", "디자인 회사"
  ],
  authors: [{ name: "VORO Design", url: "https://voro.co.kr" }],
  creator: "VORO Design",
  publisher: "VORO Design",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://voro.co.kr',
  },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "https://voro.co.kr",
    siteName: "VORO - 웹/앱 제작 디자인 회사",
    title: "VORO - 웹/앱 제작 디자인 회사 | 반응형 웹사이트 개발 전문",
    description: "혁신적인 웹사이트와 모바일 앱을 제작하는 전문 디자인 회사입니다. 브랜딩부터 개발까지 원스톱 서비스를 제공합니다.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "VORO - 웹/앱 제작 디자인 회사",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "VORO - 웹/앱 제작 디자인 회사",
    description: "혁신적인 웹사이트와 모바일 앱을 제작하는 전문 디자인 회사",
    images: ["/twitter-image.jpg"],
    creator: "@voro_design",
  },
  verification: {
    google: "google-site-verification-code",
    other: {
      "naver-site-verification": "naver-verification-code",
    },
  },
  category: "웹 개발",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        {/* 구조화된 데이터 (JSON-LD) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "VORO",
              "alternateName": "보로",
              "url": "https://voro.co.kr",
              "logo": "https://voro.co.kr/logo.png",
              "sameAs": [
                "https://www.instagram.com/voro_design",
                "https://www.facebook.com/voro.design",
                "https://blog.naver.com/voro_design"
              ],
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+82-2-0000-0000",
                "contactType": "customer service",
                "areaServed": "KR",
                "availableLanguage": "Korean"
              },
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "KR",
                "addressLocality": "서울",
                "addressRegion": "서울특별시"
              },
              "description": "혁신적인 웹사이트와 모바일 앱을 제작하는 전문 디자인 회사",
              "founder": {
                "@type": "Person",
                "name": "임세화"
              },
              "foundingDate": "2020",
              "numberOfEmployees": "3-10",
              "serviceArea": {
                "@type": "Place",
                "name": "대한민국"
              },
              "makesOffer": [
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "웹사이트 제작",
                    "description": "반응형 웹사이트 개발 및 디자인 서비스"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "모바일 앱 개발",
                    "description": "iOS 및 Android 앱 개발 서비스"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "브랜딩 디자인",
                    "description": "기업 브랜딩 및 로고 디자인 서비스"
                  }
                }
              ]
            })
          }}
        />
        
        {/* 추가 SEO 태그 */}
        <meta name="format-detection" content="telephone=no" />
        <meta name="theme-color" content="#000000" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black" />
        <meta name="apple-mobile-web-app-title" content="VORO" />
        
        {/* 프리로드 중요 리소스 */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        
        {/* 파비콘 */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <FirebaseProvider>
          {children}
        </FirebaseProvider>
      </body>
    </html>
  );
}
