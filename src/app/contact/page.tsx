'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
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
      setSubmitMessage('문의 전송 중 오류가 발생했습니다. 다시 시도해주세요.');
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
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                프로젝트에 대한 상세한 정보를 알려주시면<br />
                최적의 솔루션과 견적을 제안해드리겠습니다.
              </p>
            </header>

            {/* Contact Form */}
            <form onSubmit={handleSubmit} className="space-y-12" noValidate>
              {/* 1. 기본정보 */}
              <section>
                <h2 className="text-2xl font-bold text-black mb-8 pb-4 border-b-2 border-black">
                  1. 기본정보
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      이름 *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full p-4 border border-gray-300 focus:border-black focus:outline-none bg-white text-gray-900 rounded-none transition-colors"
                      placeholder="이름을 입력해주세요"
                      aria-describedby="name-error"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      연락처 *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full p-4 border border-gray-300 focus:border-black focus:outline-none bg-white text-gray-900 rounded-none transition-colors"
                      placeholder="010-0000-0000"
                      aria-describedby="phone-error"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      이메일 *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full p-4 border border-gray-300 focus:border-black focus:outline-none bg-white text-gray-900 rounded-none transition-colors"
                      placeholder="example@company.com"
                      aria-describedby="email-error"
                    />
                  </div>
                </div>
              </section>

              {/* 2. 프로젝트 정보 */}
              <section>
                <h2 className="text-2xl font-bold text-black mb-8 pb-4 border-b-2 border-black">
                  2. 프로젝트 정보
                </h2>

                {/* 서비스 유형 */}
                <fieldset className="mb-8">
                  <legend className="text-lg font-semibold text-black mb-4">
                    서비스 유형을 선택해주세요
                  </legend>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {['기업사이트', '이커머스', '랜딩페이지', '브랜딩', '제품소개사이트', '마이크로사이트'].map((service) => (
                      <label key={service} className="flex items-center space-x-3 cursor-pointer">
                        <input
                          type="checkbox"
                          name="serviceTypes"
                          value={service}
                          onChange={handleInputChange}
                          className="w-4 h-4 text-black border-gray-300 rounded focus:ring-black"
                        />
                        <span className="text-gray-700">{service}</span>
                      </label>
                    ))}
                  </div>
                </fieldset>

                {/* 제작 유형 */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-black mb-4">
                    제작 유형을 선택해 주세요
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {['신규 구축', '리뉴얼 구축', '유지보수', '기타'].map((type) => (
                      <label key={type} className="flex items-center space-x-3 cursor-pointer">
                        <input
                          type="radio"
                          name="projectType"
                          value={type}
                          onChange={handleInputChange}
                          className="w-4 h-4 text-black border-gray-300 focus:ring-black"
                        />
                        <span className="text-gray-700">{type}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* 제작 예산 & 제작 기간 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  <div>
                    <h3 className="text-lg font-semibold text-black mb-4">
                      제작예산
                    </h3>
                    <input
                      type="text"
                      name="budget"
                      value={formData.budget}
                      onChange={handleInputChange}
                      className="w-full p-4 border border-gray-300 focus:border-black focus:outline-none bg-white text-gray-900 rounded-none transition-colors"
                      placeholder="예산을 입력해주세요"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-black mb-4">
                      제작기간
                    </h3>
                    <input
                      type="text"
                      name="period"
                      value={formData.period}
                      onChange={handleInputChange}
                      className="w-full p-4 border border-gray-300 focus:border-black focus:outline-none bg-white text-gray-900 rounded-none transition-colors"
                      placeholder="기간을 입력해주세요"
                    />
                  </div>
                </div>

                {/* 요구사항 */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-black mb-4">
                    요구사항
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    제작시 저희가 알았으면하는걸 편하게 적어주세요.
                  </p>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={8}
                    required
                    placeholder="요구사항을 자세히 작성해주세요."
                    className="w-full p-4 border border-gray-300 focus:border-black focus:outline-none bg-white text-gray-900 rounded-none resize-none transition-colors"
                  />
                </div>
              </section>

              {/* 개인정보처리방침 */}
              <section className="border-t-2 border-gray-200 pt-8">
                <div className="bg-gray-50 p-6 mb-6">
                  <h3 className="text-lg font-semibold text-black mb-4">개인정보처리방침</h3>
                  <div className="text-sm text-gray-600 space-y-2 max-h-32 overflow-y-auto">
                    <p>VORO는 귀하의 개인정보보호를 매우 중요시하며, 『개인정보보호법』을 준수하고 있습니다.</p>
                    <p><strong>수집하는 개인정보:</strong> 이름, 전화번호, 이메일, 회사명</p>
                    <p><strong>수집 목적:</strong> 프로젝트 상담 및 견적 제공</p>
                    <p><strong>보유 기간:</strong> 상담 완료 후 1년간 보관 후 삭제</p>
                    <p><strong>문의:</strong> voro2520@gmail.com / 010-5344-9868</p>
                  </div>
                </div>

                <label className="flex items-start space-x-3 cursor-pointer mb-8">
                  <input
                    type="checkbox"
                    name="agreePrivacy"
                    required
                    checked={formData.agreePrivacy}
                    onChange={handleInputChange}
                    className="w-5 h-5 text-black border-gray-300 rounded focus:ring-black mt-0.5"
                  />
                  <span className="text-gray-700">
                    개인정보처리방침에 동의합니다. *
                  </span>
                </label>
              </section>

              {/* Submit Message */}
              {submitMessage && (
                <div className={`text-center p-4 rounded-lg mb-8 ${
                  submitMessage.includes('성공적으로') 
                    ? 'bg-green-100 text-green-800 border border-green-200' 
                    : 'bg-red-100 text-red-800 border border-red-200'
                }`}>
                  {submitMessage}
                </div>
              )}

              {/* Submit Button */}
              <div className="text-center">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-black hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-16 py-4 text-lg font-semibold transition-colors"
                >
                  {isSubmitting ? '전송 중...' : '프로젝트 문의하기'}
                </button>
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