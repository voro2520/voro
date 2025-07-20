'use client';

import { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    phone: '',
    email: '',
    serviceType: '',
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
          description: '',
          agreePrivacy: false
        });
      } else {
        setSubmitMessage(result.message || '문의 전송 중 오류가 발생했습니다.');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitMessage('문의 전송 중 오류가 발생했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <html>
      <head>
        <title>VORO - Contact</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <style>{`
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            background: white;
          }
          
          .container {
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
          }
          
          .header {
            text-align: center;
            margin-bottom: 40px;
            padding: 20px 0;
            border-bottom: 2px solid #333;
          }
          
          .quick-contact {
            display: flex;
            gap: 20px;
            justify-content: center;
            margin: 30px 0;
          }
          
          .quick-contact a {
            display: inline-block;
            padding: 15px 30px;
            text-decoration: none;
            font-weight: bold;
            border-radius: 5px;
            text-align: center;
          }
          
          .kakao-btn {
            background: #fee500;
            color: black;
          }
          
          .phone-btn {
            background: black;
            color: white;
          }
          
          .form-section {
            margin: 30px 0;
            padding: 20px;
            border: 2px solid #ddd;
            border-radius: 10px;
          }
          
          .form-group {
            margin-bottom: 20px;
          }
          
          .form-row {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
          }
          
          label {
            display: block;
            margin-bottom: 5px;
            font-weight: bold;
            color: #333;
          }
          
          input, select, textarea {
            width: 100%;
            padding: 12px;
            border: 2px solid #ccc;
            border-radius: 5px;
            font-size: 16px;
            font-family: Arial, sans-serif;
            background: white;
            color: black;
          }
          
          input:focus, select:focus, textarea:focus {
            border-color: #007bff;
            outline: none;
          }
          
          textarea {
            min-height: 120px;
            resize: vertical;
          }
          
          .checkbox-group {
            display: flex;
            align-items: center;
            gap: 10px;
          }
          
          .checkbox-group input[type="checkbox"] {
            width: auto;
          }
          
          .submit-btn {
            width: 100%;
            padding: 15px;
            background: black;
            color: white;
            border: none;
            border-radius: 5px;
            font-size: 18px;
            font-weight: bold;
            cursor: pointer;
          }
          
          .submit-btn:disabled {
            background: #ccc;
            cursor: not-allowed;
          }
          
          .message {
            padding: 15px;
            margin: 20px 0;
            border-radius: 5px;
            text-align: center;
          }
          
          .success {
            background: #d4edda;
            color: #155724;
            border: 1px solid #c3e6cb;
          }
          
          .error {
            background: #f8d7da;
            color: #721c24;
            border: 1px solid #f5c6cb;
          }
        `}</style>
      </head>
      <body>
        <div className="container">
          
          <div className="header">
            <h1>VORO - 견적 문의</h1>
            <p>웹사이트 제작 전문</p>
          </div>

          <div className="quick-contact">
            <a href="http://pf.kakao.com/_tExfLG" target="_blank" rel="noopener noreferrer" className="kakao-btn">
              💬 카카오톡 상담하기
            </a>
            <a href="tel:010-5344-9868" className="phone-btn">
              📞 전화 상담하기
            </a>
          </div>

          <div style={{ textAlign: 'center', margin: '20px 0', color: '#666' }}>
            <p>또는 아래 폼을 작성해주세요</p>
          </div>

          <form onSubmit={handleSubmit}>
            
            <div className="form-section">
              <h2>기본 정보</h2>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">이름 *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="홍길동"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="company">회사명</label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    placeholder="(주)회사명 (선택)"
                  />
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="phone">연락처 *</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="010-1234-5678"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="email">이메일 *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="example@company.com"
                  />
                </div>
              </div>
            </div>

            <div className="form-section">
              <h2>서비스 정보</h2>
              
              <div className="form-group">
                <label htmlFor="serviceType">어떤 서비스가 필요하신가요?</label>
                <select
                  id="serviceType"
                  name="serviceType"
                  value={formData.serviceType}
                  onChange={handleInputChange}
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

              <div className="form-group">
                <label htmlFor="description">어떤 사이트를 원하시나요?</label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={6}
                  placeholder="원하시는 기능이나 참고할 사이트, 궁금한 점 등을 자유롭게 적어주세요."
                />
              </div>
            </div>

            <div className="form-section">
              <h3>개인정보처리방침</h3>
              <div style={{ background: '#f9f9f9', padding: '15px', borderRadius: '5px', margin: '10px 0' }}>
                <p><strong>수집목적:</strong> 프로젝트 상담 및 견적 제공</p>
                <p><strong>수집항목:</strong> 이름, 연락처, 이메일, 회사명</p>
                <p><strong>보유기간:</strong> 상담 완료 후 1년</p>
                <p><strong>문의:</strong> voro2520@gmail.com / 010-5344-9868</p>
              </div>

              <div className="checkbox-group">
                <input
                  type="checkbox"
                  id="agreePrivacy"
                  name="agreePrivacy"
                  checked={formData.agreePrivacy}
                  onChange={handleInputChange}
                />
                <label htmlFor="agreePrivacy">개인정보 수집 및 이용에 동의합니다. *</label>
              </div>
            </div>

            {submitMessage && (
              <div className={`message ${submitMessage.includes('성공적으로') ? 'success' : 'error'}`}>
                {submitMessage}
                {submitMessage.includes('오류') && (
                  <div style={{ marginTop: '10px' }}>
                    <a href="tel:010-5344-9868" style={{ background: 'black', color: 'white', padding: '10px 20px', textDecoration: 'none', borderRadius: '5px' }}>
                      📞 010-5344-9868로 전화하기
                    </a>
                  </div>
                )}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="submit-btn"
            >
              {isSubmitting ? '전송 중...' : '🚀 문의하기'}
            </button>
            
            <div style={{ textAlign: 'center', marginTop: '20px', color: '#666' }}>
              <p>급하시면 <strong>카카오톡</strong>이나 <strong>전화</strong>로 연락주세요!</p>
            </div>
          </form>

          <footer style={{ marginTop: '60px', padding: '30px 0', borderTop: '2px solid #333', textAlign: 'center', background: '#f8f9fa' }}>
            <h3>VORO</h3>
            <p>Digital Solutions Company</p>
            <div style={{ marginTop: '15px' }}>
              <div>대표자. 임세화</div>
              <div>Tel. 010-5344-9868</div>
              <div>Mail. voro2520@gmail.com</div>
              <div>Head office. 수원시 장안구 조원동 552-4</div>
            </div>
            <div style={{ marginTop: '15px', color: '#666' }}>
              ©VORO All rights reserved.
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
} 