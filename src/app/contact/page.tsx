'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    phone: '',
    email: '',
    serviceType: '',
    projectType: '',
    budget: '',
    period: '',
    description: '',
    agreePrivacy: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleInputChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    
    if (!formData.name || !formData.phone || !formData.email) {
      setSubmitMessage('이름, 연락처, 이메일은 필수 입력사항입니다.');
      return;
    }

    if (!formData.agreePrivacy) {
      setSubmitMessage('개인정보 수집 및 이용에 동의해주세요.');
      return;
    }

    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          serviceTypes: formData.serviceType ? [formData.serviceType] : []
        }),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitMessage('문의가 성공적으로 전송되었습니다! 빠른 시일 내에 연락드리겠습니다. 🚀');
        setFormData({
          name: '',
          company: '',
          phone: '',
          email: '',
          serviceType: '',
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
    <div style={{ minHeight: '100vh', backgroundColor: 'white' }}>
      {/* Header */}
      <header style={{ 
        position: 'fixed', 
        width: '100%', 
        top: 0, 
        zIndex: 50, 
        backgroundColor: 'rgba(255,255,255,0.95)', 
        borderBottom: '1px solid #e5e7eb',
        backdropFilter: 'blur(8px)'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 32px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '64px' }}>
            <Link href="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
              <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: 'black', margin: 0 }}>VORO</h1>
              <span style={{ marginLeft: '8px', fontSize: '14px', color: '#6b7280' }}>웹/앱 제작</span>
            </Link>
            
            <nav style={{ display: 'flex', gap: '32px' }}>
              <Link href="/" style={{ color: '#374151', textDecoration: 'none', fontWeight: '500' }}>홈</Link>
              <Link href="/#about" style={{ color: '#374151', textDecoration: 'none', fontWeight: '500' }}>VORO소개</Link>
              <Link href="/#services" style={{ color: '#374151', textDecoration: 'none', fontWeight: '500' }}>서비스안내</Link>
              <Link href="/#portfolio" style={{ color: '#374151', textDecoration: 'none', fontWeight: '500' }}>포트폴리오</Link>
              <Link href="/contact" style={{ color: 'black', textDecoration: 'none', fontWeight: '500' }}>견적문의</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main style={{ paddingTop: '96px', paddingBottom: '64px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 24px' }}>
          
          {/* Page Title */}
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <h1 style={{ fontSize: '48px', fontWeight: 'black', color: 'black', marginBottom: '24px' }}>CONTACT</h1>
            <p style={{ fontSize: '18px', color: '#6b7280', marginBottom: '32px' }}>
              빠르고 간편한 상담을 원하신다면<br />
              <strong>카카오톡이나 전화</strong>로 연락해주세요!
            </p>
            
            {/* 빠른 연락 방법 */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', maxWidth: '600px', margin: '0 auto 48px' }}>
              <a 
                href="http://pf.kakao.com/_tExfLG" 
                target="_blank" 
                rel="noopener noreferrer"
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  gap: '12px', 
                  backgroundColor: '#fee500', 
                  color: 'black', 
                  padding: '16px 24px', 
                  borderRadius: '8px', 
                  fontWeight: 'bold', 
                  fontSize: '18px', 
                  textDecoration: 'none',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                <span>💬</span>
                카카오톡 상담하기
              </a>
              <a 
                href="tel:010-5344-9868"
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  gap: '12px', 
                  backgroundColor: 'black', 
                  color: 'white', 
                  padding: '16px 24px', 
                  borderRadius: '8px', 
                  fontWeight: 'bold', 
                  fontSize: '18px', 
                  textDecoration: 'none',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                <span>📞</span>
                전화 상담하기
              </a>
            </div>
            
            <div style={{ textAlign: 'center', color: '#6b7280', marginBottom: '32px' }}>
              <p>또는 아래 폼을 작성해주세요</p>
            </div>
          </div>

          {/* Contact Form - 기본 HTML 폼 */}
          <form onSubmit={handleSubmit} style={{ display: 'block' }}>
            
            {/* 기본정보 */}
            <div style={{ backgroundColor: '#f9fafb', padding: '32px', borderRadius: '12px', marginBottom: '32px' }}>
              <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: 'black', marginBottom: '24px' }}>📝 기본정보</h2>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
                <div>
                  <label htmlFor="name" style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', color: '#374151', marginBottom: '8px' }}>
                    이름 *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="홍길동"
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '2px solid #d1d5db',
                      borderRadius: '8px',
                      fontSize: '16px',
                      backgroundColor: 'white',
                      color: 'black',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
                
                <div>
                  <label htmlFor="company" style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', color: '#374151', marginBottom: '8px' }}>
                    회사명
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    placeholder="(주)회사명 (선택)"
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '2px solid #d1d5db',
                      borderRadius: '8px',
                      fontSize: '16px',
                      backgroundColor: 'white',
                      color: 'black',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                <div>
                  <label htmlFor="phone" style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', color: '#374151', marginBottom: '8px' }}>
                    연락처 *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="010-1234-5678"
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '2px solid #d1d5db',
                      borderRadius: '8px',
                      fontSize: '16px',
                      backgroundColor: 'white',
                      color: 'black',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
                
                <div>
                  <label htmlFor="email" style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', color: '#374151', marginBottom: '8px' }}>
                    이메일 *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="example@company.com"
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '2px solid #d1d5db',
                      borderRadius: '8px',
                      fontSize: '16px',
                      backgroundColor: 'white',
                      color: 'black',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
              </div>
            </div>

            {/* 프로젝트 정보 */}
            <div style={{ backgroundColor: 'white', border: '2px solid #e5e7eb', padding: '32px', borderRadius: '12px', marginBottom: '32px' }}>
              <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: 'black', marginBottom: '24px' }}>🚀 어떤 서비스가 필요하신가요?</h2>

              {/* 서비스 유형 */}
              <div style={{ marginBottom: '24px' }}>
                <label htmlFor="serviceType" style={{ display: 'block', fontSize: '18px', fontWeight: 'bold', color: 'black', marginBottom: '16px' }}>서비스 유형</label>
                <select
                  id="serviceType"
                  name="serviceType"
                  value={formData.serviceType}
                  onChange={handleInputChange}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '2px solid #d1d5db',
                    borderRadius: '8px',
                    fontSize: '16px',
                    backgroundColor: 'white',
                    color: 'black',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                >
                  <option value="">선택해주세요</option>
                  <option value="홈페이지 제작">홈페이지 제작 (회사소개, 제품소개)</option>
                  <option value="쇼핑몰 제작">쇼핑몰 제작 (온라인 판매)</option>
                  <option value="랜딩페이지">랜딩페이지 (이벤트, 프로모션)</option>
                  <option value="브랜딩">브랜딩 (로고, 디자인)</option>
                  <option value="앱 개발">앱 개발 (모바일 앱)</option>
                  <option value="기타">기타 (직접 상담)</option>
                </select>
              </div>

              {/* 제작 유형 & 예산 */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
                <div>
                  <label htmlFor="projectType" style={{ display: 'block', fontSize: '18px', fontWeight: 'bold', color: 'black', marginBottom: '16px' }}>제작 유형</label>
                  <select
                    id="projectType"
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleInputChange}
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '2px solid #d1d5db',
                      borderRadius: '8px',
                      fontSize: '16px',
                      backgroundColor: 'white',
                      color: 'black',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                  >
                    <option value="">선택해주세요</option>
                    <option value="새로 만들기">새로 만들기</option>
                    <option value="기존 사이트 리뉴얼">기존 사이트 리뉴얼</option>
                    <option value="유지보수">유지보수</option>
                    <option value="잘 모르겠어요">잘 모르겠어요</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="budget" style={{ display: 'block', fontSize: '18px', fontWeight: 'bold', color: 'black', marginBottom: '16px' }}>예상 예산</label>
                  <select
                    id="budget"
                    name="budget"
                    value={formData.budget}
                    onChange={handleInputChange}
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '2px solid #d1d5db',
                      borderRadius: '8px',
                      fontSize: '16px',
                      backgroundColor: 'white',
                      color: 'black',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                  >
                    <option value="">선택해주세요</option>
                    <option value="100만원 이하">100만원 이하</option>
                    <option value="100-300만원">100-300만원</option>
                    <option value="300-500만원">300-500만원</option>
                    <option value="500만원 이상">500만원 이상</option>
                    <option value="상담 후 결정">상담 후 결정</option>
                  </select>
                </div>
              </div>

              {/* 기간 */}
              <div style={{ marginBottom: '24px' }}>
                <label htmlFor="period" style={{ display: 'block', fontSize: '18px', fontWeight: 'bold', color: 'black', marginBottom: '16px' }}>언제까지 필요하신가요?</label>
                <select
                  id="period"
                  name="period"
                  value={formData.period}
                  onChange={handleInputChange}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '2px solid #d1d5db',
                    borderRadius: '8px',
                    fontSize: '16px',
                    backgroundColor: 'white',
                    color: 'black',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                >
                  <option value="">선택해주세요</option>
                  <option value="1개월 이내">1개월 이내</option>
                  <option value="2-3개월">2-3개월</option>
                  <option value="3-6개월">3-6개월</option>
                  <option value="상관없음">상관없음</option>
                </select>
              </div>

              {/* 상세 설명 */}
              <div>
                <label htmlFor="description" style={{ display: 'block', fontSize: '18px', fontWeight: 'bold', color: 'black', marginBottom: '16px' }}>💡 어떤 사이트를 원하시나요?</label>
                <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '16px' }}>
                  예) "카페 홈페이지인데 메뉴소개랑 매장위치가 나왔으면 좋겠어요", "쇼핑몰인데 결제기능이 필요해요" 등 편하게 적어주세요.
                </p>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={6}
                  placeholder="원하시는 기능이나 참고할 사이트, 궁금한 점 등을 자유롭게 적어주세요."
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '2px solid #d1d5db',
                    borderRadius: '8px',
                    fontSize: '16px',
                    backgroundColor: 'white',
                    color: 'black',
                    outline: 'none',
                    resize: 'vertical',
                    boxSizing: 'border-box',
                    fontFamily: 'inherit'
                  }}
                />
              </div>
            </div>

            {/* 개인정보처리방침 */}
            <div style={{ backgroundColor: '#f9fafb', padding: '24px', borderRadius: '12px', marginBottom: '32px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: 'black', marginBottom: '16px' }}>개인정보처리방침</h3>
              <div style={{ fontSize: '14px', color: '#6b7280', marginBottom: '16px', padding: '16px', backgroundColor: 'white', borderRadius: '8px', border: '1px solid #d1d5db' }}>
                <p style={{ margin: '8px 0' }}><strong>수집목적:</strong> 프로젝트 상담 및 견적 제공</p>
                <p style={{ margin: '8px 0' }}><strong>수집항목:</strong> 이름, 연락처, 이메일, 회사명</p>
                <p style={{ margin: '8px 0' }}><strong>보유기간:</strong> 상담 완료 후 1년</p>
                <p style={{ margin: '8px 0' }}><strong>문의:</strong> voro2520@gmail.com / 010-5344-9868</p>
              </div>

              <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  name="agreePrivacy"
                  checked={formData.agreePrivacy}
                  onChange={handleInputChange}
                  style={{
                    width: '20px',
                    height: '20px',
                    margin: 0
                  }}
                />
                <span style={{ color: '#374151', fontWeight: '500' }}>
                  개인정보 수집 및 이용에 동의합니다. *
                </span>
              </label>
            </div>

            {/* Submit Message */}
            {submitMessage && (
              <div style={{ 
                textAlign: 'center', 
                padding: '24px', 
                borderRadius: '12px', 
                fontSize: '18px', 
                fontWeight: '500',
                marginBottom: '32px',
                backgroundColor: submitMessage.includes('성공적으로') ? '#dcfce7' : '#fef2f2',
                color: submitMessage.includes('성공적으로') ? '#166534' : '#dc2626',
                border: submitMessage.includes('성공적으로') ? '2px solid #bbf7d0' : '2px solid #fecaca'
              }}>
                {submitMessage}
                {submitMessage.includes('오류') && (
                  <div style={{ marginTop: '16px', textAlign: 'center' }}>
                    <a 
                      href="tel:010-5344-9868"
                      style={{ 
                        display: 'inline-flex', 
                        alignItems: 'center', 
                        gap: '8px', 
                        backgroundColor: 'black', 
                        color: 'white', 
                        padding: '12px 24px', 
                        borderRadius: '8px', 
                        fontWeight: 'bold', 
                        textDecoration: 'none' 
                      }}
                    >
                      📞 010-5344-9868로 전화하기
                    </a>
                  </div>
                )}
              </div>
            )}

            {/* Submit Button */}
            <div style={{ textAlign: 'center' }}>
              <button
                type="submit"
                disabled={isSubmitting}
                style={{
                  backgroundColor: isSubmitting ? '#9ca3af' : 'black',
                  color: 'white',
                  padding: '20px 64px',
                  fontSize: '20px',
                  fontWeight: 'bold',
                  borderRadius: '12px',
                  border: 'none',
                  cursor: isSubmitting ? 'not-allowed' : 'pointer',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                }}
              >
                {isSubmitting ? '전송 중...' : '🚀 문의하기'}
              </button>
              <p style={{ fontSize: '14px', color: '#6b7280', marginTop: '16px' }}>
                급하시면 <strong>카카오톡</strong>이나 <strong>전화</strong>로 연락주세요!
              </p>
            </div>
          </form>
        </div>
      </main>

      {/* Footer */}
      <footer style={{ backgroundColor: 'black', color: 'white', padding: '48px 0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
            <div>
              <h3 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '8px' }}>VORO</h3>
              <p style={{ color: '#9ca3af', marginBottom: '16px' }}>Digital Solutions Company</p>
              <div style={{ fontSize: '14px', color: '#9ca3af' }}>
                <div>대표자. 임세화</div>
                <div>Tel. 010-5344-9868</div>
                <div>Mail. voro2520@gmail.com</div>
              </div>
            </div>
            <div style={{ fontSize: '14px', color: '#9ca3af' }}>
              <div style={{ marginBottom: '8px' }}>
                <strong>Head office.</strong> 수원시 장안구 조원동 552-4
              </div>
              <div style={{ display: 'flex', gap: '16px', marginTop: '16px' }}>
                <Link href="#" style={{ color: '#9ca3af', textDecoration: 'none' }}>개인정보처리방침</Link>
                <Link href="#" style={{ color: '#9ca3af', textDecoration: 'none' }}>이용약관</Link>
              </div>
              <div style={{ marginTop: '16px' }}>
                ©VORO All rights reserved.
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
} 