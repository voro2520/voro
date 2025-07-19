'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    phone: '',
    email: '',
    serviceTypes: [] as string[],
    projectType: '',
    budget: '',
    period: '',
    description: '',
    agreePrivacy: false
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      if (name === 'serviceTypes') {
        setFormData(prev => ({
          ...prev,
          serviceTypes: checked 
            ? [...prev.serviceTypes, value]
            : prev.serviceTypes.filter(item => item !== value)
        }));
      } else {
        setFormData(prev => ({ ...prev, [name]: checked }));
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitMessage('문의가 성공적으로 전송되었습니다. 빠른 시일 내 연락드리겠습니다.');
        // 폼 초기화
        setFormData({
          name: '',
          company: '',
          phone: '',
          email: '',
          serviceTypes: [],
          projectType: '',
          budget: '',
          period: '',
          description: '',
          agreePrivacy: false
        });
      } else {
        setSubmitMessage(result.message || '문의 전송 중 오류가 발생했습니다.');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitMessage('문의 전송 중 오류가 발생했습니다. 아래 연락처로 직접 문의해주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* 구조화된 데이터 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ContactPage",
            "mainEntity": {
              "@type": "Organization",
              "name": "VORO",
              "contactPoint": {
                "@type": "ContactPoint",
                "contactType": "customer service",
                "availableLanguage": "Korean",
                "areaServed": "KR"
              }
            }
          })
        }}
      />
      
      <div className="min-h-screen bg-white">
        {/* Header */}
        <header className="fixed w-full top-0 z-50 backdrop-blur-sm bg-white/95 border-b border-gray-100">
          <div className="w-full px-8 sm:px-12 lg:px-16">
            <div className="flex justify-between items-center h-16">
              <Link href="/" className="flex items-center">
                <h1 className="text-2xl font-bold text-black">VORO</h1>
                <span className="ml-2 text-sm text-gray-600">웹/앱 제작</span>
              </Link>
              
              <nav className="hidden md:flex space-x-8" role="navigation" aria-label="주요 메뉴">
                <Link href="/" className="text-gray-700 hover:text-black transition-colors font-medium">홈</Link>
                <Link href="/#about" className="text-gray-700 hover:text-black transition-colors font-medium">VORO소개</Link>
                <Link href="/#services" className="text-gray-700 hover:text-black transition-colors font-medium">서비스안내</Link>
                <Link href="/#portfolio" className="text-gray-700 hover:text-black transition-colors font-medium">포트폴리오</Link>
                <Link href="/contact" className="text-black font-medium" aria-current="page">견적문의</Link>
              </nav>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="pt-24 pb-16">
          <div className="max-w-4xl mx-auto px-6 sm:px-8">
            {/* Page Title */}
            <header className="text-center mb-16">
              <h1 className="text-4xl md:text-6xl font-black text-black mb-4">CONTACT</h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
                빠르고 간편한 상담을 원하신다면<br />
                <strong>카카오톡이나 전화</strong>로 연락해주세요!
              </p>
              
              {/* 빠른 연락 방법 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto mb-12">
                <a 
                  href="http://pf.kakao.com/_tExfLG" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 bg-yellow-400 hover:bg-yellow-500 text-black px-6 py-4 rounded-lg font-bold text-lg transition-colors"
                >
                  <span>💬</span>
                  카카오톡 상담하기
                </a>
                <a 
                  href="tel:010-5344-9868"
                  className="flex items-center justify-center gap-3 bg-black hover:bg-gray-800 text-white px-6 py-4 rounded-lg font-bold text-lg transition-colors"
                >
                  <span>📞</span>
                  전화 상담하기
                </a>
              </div>
              
              <div className="text-center text-gray-500 mb-8">
                <p>또는 아래 폼을 작성해주세요</p>
                <div className="w-16 h-px bg-gray-300 mx-auto mt-4"></div>
              </div>
            </header>

            {/* Contact Form */}
            <form onSubmit={handleSubmit} className="space-y-8" noValidate>
              {/* 1. 기본정보 */}
              <section className="bg-gray-50 p-8 rounded-xl">
                <h2 className="text-2xl font-bold text-black mb-6">
                  📝 기본정보
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-bold text-gray-800 mb-2">
                      이름 *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full p-4 border-2 border-gray-300 focus:border-black focus:outline-none bg-white text-gray-900 rounded-lg transition-colors"
                      placeholder="홍길동"
                    />
                  </div>
                  <div>
                    <label htmlFor="company" className="block text-sm font-bold text-gray-800 mb-2">
                      회사명
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="w-full p-4 border-2 border-gray-300 focus:border-black focus:outline-none bg-white text-gray-900 rounded-lg transition-colors"
                      placeholder="(주)회사명 (선택)"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-bold text-gray-800 mb-2">
                      연락처 *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full p-4 border-2 border-gray-300 focus:border-black focus:outline-none bg-white text-gray-900 rounded-lg transition-colors"
                      placeholder="010-1234-5678"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-bold text-gray-800 mb-2">
                      이메일 *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full p-4 border-2 border-gray-300 focus:border-black focus:outline-none bg-white text-gray-900 rounded-lg transition-colors"
                      placeholder="example@company.com"
                    />
                  </div>
                </div>
              </section>

              {/* 2. 프로젝트 정보 */}
              <section className="bg-white border-2 border-gray-200 p-8 rounded-xl">
                <h2 className="text-2xl font-bold text-black mb-6">
                  🚀 어떤 서비스가 필요하신가요?
                </h2>

                {/* 서비스 유형 */}
                <div className="mb-8">
                  <h3 className="text-lg font-bold text-black mb-4">
                    서비스 유형 (복수 선택 가능)
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {[
                      { name: '홈페이지 제작', desc: '회사소개, 제품소개' },
                      { name: '쇼핑몰 제작', desc: '온라인 판매' },
                      { name: '랜딩페이지', desc: '이벤트, 프로모션' },
                      { name: '브랜딩', desc: '로고, 디자인' },
                      { name: '앱 개발', desc: '모바일 앱' },
                      { name: '기타', desc: '직접 상담' }
                    ].map((service) => (
                      <label key={service.name} className="flex flex-col border-2 border-gray-200 hover:border-black rounded-lg p-4 cursor-pointer transition-colors">
                        <div className="flex items-center mb-2">
                          <input
                            type="checkbox"
                            name="serviceTypes"
                            value={service.name}
                            onChange={handleInputChange}
                            className="w-4 h-4 text-black border-gray-300 rounded focus:ring-black mr-3"
                          />
                          <span className="font-bold text-gray-800">{service.name}</span>
                        </div>
                        <span className="text-sm text-gray-600">{service.desc}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* 제작 유형 & 예산 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  <div>
                    <h3 className="text-lg font-bold text-black mb-4">
                      제작 유형
                    </h3>
                    <div className="space-y-3">
                      {['새로 만들기', '기존 사이트 리뉴얼', '유지보수', '잘 모르겠어요'].map((type) => (
                        <label key={type} className="flex items-center space-x-3 cursor-pointer p-3 border rounded-lg hover:bg-gray-50">
                          <input
                            type="radio"
                            name="projectType"
                            value={type}
                            onChange={handleInputChange}
                            className="w-4 h-4 text-black border-gray-300 focus:ring-black"
                          />
                          <span className="text-gray-700 font-medium">{type}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-black mb-4">
                      예상 예산
                    </h3>
                    <div className="space-y-3">
                      {['100만원 이하', '100-300만원', '300-500만원', '500만원 이상', '상담 후 결정'].map((budget) => (
                        <label key={budget} className="flex items-center space-x-3 cursor-pointer p-3 border rounded-lg hover:bg-gray-50">
                          <input
                            type="radio"
                            name="budget"
                            value={budget}
                            onChange={handleInputChange}
                            className="w-4 h-4 text-black border-gray-300 focus:ring-black"
                          />
                          <span className="text-gray-700 font-medium">{budget}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                {/* 기간 */}
                <div className="mb-8">
                  <h3 className="text-lg font-bold text-black mb-4">
                    언제까지 필요하신가요?
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {['1개월 이내', '2-3개월', '3-6개월', '상관없음'].map((period) => (
                      <label key={period} className="flex items-center space-x-3 cursor-pointer p-3 border rounded-lg hover:bg-gray-50">
                        <input
                          type="radio"
                          name="period"
                          value={period}
                          onChange={handleInputChange}
                          className="w-4 h-4 text-black border-gray-300 focus:ring-black"
                        />
                        <span className="text-gray-700 font-medium">{period}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* 상세 설명 */}
                <div>
                  <h3 className="text-lg font-bold text-black mb-4">
                    💡 어떤 사이트를 원하시나요?
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    예) "카페 홈페이지인데 메뉴소개랑 매장위치가 나왔으면 좋겠어요", "쇼핑몰인데 결제기능이 필요해요" 등 편하게 적어주세요.
                  </p>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={6}
                    placeholder="원하시는 기능이나 참고할 사이트, 궁금한 점 등을 자유롭게 적어주세요."
                    className="w-full p-4 border-2 border-gray-300 focus:border-black focus:outline-none bg-white text-gray-900 rounded-lg resize-none transition-colors"
                  />
                </div>
              </section>

              {/* 개인정보처리방침 */}
              <section className="bg-gray-50 p-6 rounded-xl">
                <h3 className="text-lg font-bold text-black mb-4">개인정보처리방침</h3>
                <div className="text-sm text-gray-600 space-y-2 mb-4 p-4 bg-white rounded-lg border">
                  <p><strong>수집목적:</strong> 프로젝트 상담 및 견적 제공</p>
                  <p><strong>수집항목:</strong> 이름, 연락처, 이메일, 회사명</p>
                  <p><strong>보유기간:</strong> 상담 완료 후 1년</p>
                  <p><strong>문의:</strong> voro2520@gmail.com / 010-5344-9868</p>
                </div>

                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="agreePrivacy"
                    required
                    checked={formData.agreePrivacy}
                    onChange={handleInputChange}
                    className="w-5 h-5 text-black border-gray-300 rounded focus:ring-black"
                  />
                  <span className="text-gray-700 font-medium">
                    개인정보 수집 및 이용에 동의합니다. *
                  </span>
                </label>
              </section>

              {/* Submit Message */}
              {submitMessage && (
                <div className={`text-center p-6 rounded-xl text-lg font-medium ${
                  submitMessage.includes('성공적으로') 
                    ? 'bg-green-100 text-green-800 border-2 border-green-200' 
                    : 'bg-red-100 text-red-800 border-2 border-red-200'
                }`}>
                  {submitMessage}
                  {submitMessage.includes('오류') && (
                    <div className="mt-4 text-center">
                      <a 
                        href="tel:010-5344-9868"
                        className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 rounded-lg font-bold hover:bg-gray-800 transition-colors"
                      >
                        📞 010-5344-9868로 전화하기
                      </a>
                    </div>
                  )}
                </div>
              )}

              {/* Submit Button */}
              <div className="text-center">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-black hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-16 py-5 text-xl font-bold rounded-xl transition-colors shadow-lg"
                >
                  {isSubmitting ? '전송 중...' : '🚀 문의하기'}
                </button>
                <p className="text-sm text-gray-500 mt-4">
                  급하시면 <strong>카카오톡</strong>이나 <strong>전화</strong>로 연락주세요!
                </p>
              </div>
            </form>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-black text-white py-12">
          <div className="max-w-7xl mx-auto px-6 sm:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-bold mb-2">VORO</h3>
                <p className="text-gray-400 mb-4">Digital Solutions Company</p>
                <div className="text-sm text-gray-400">
                  <div>대표자. 임세화</div>
                  <div>Tel. 010-5344-9868</div>
                  <div>Mail. voro2520@gmail.com</div>
                </div>
              </div>
              <div className="text-sm text-gray-400">
                <div className="mb-2">
                  <strong>Head office.</strong> 수원시 장안구 조원동 552-4
                </div>
                <div className="flex space-x-4 mt-4">
                  <Link href="#" className="hover:text-white transition-colors">개인정보처리방침</Link>
                  <Link href="#" className="hover:text-white transition-colors">이용약관</Link>
                </div>
                <div className="mt-4">
                  ©VORO All rights reserved.
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
} 