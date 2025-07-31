'use client';

import { useState } from 'react';

// 디버깅용 로그 함수
const debugLog = (message: string, data?: any) => {
  console.log(`🔍 [DEBUG] ${message}`, data);
};

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

  // 상태 초기화 디버깅
  debugLog('Component initialized with formData:', formData);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleInputChange = (e: any) => {
    console.log('🎯 Input change detected:', e.target.name, e.target.value, e.target.type);
    const { name, value, type, checked } = e.target;
    
    setFormData(prev => {
      const newData = {
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      };
      console.log('📊 Updated form data:', newData);
      return newData;
    });
  };

  const handleInputFocus = (e: any) => {
    console.log('🎯 Input focused:', e.target.name);
    // 강제로 포커스 확보
    e.target.focus();
  };

  const handleInputClick = (e: any) => {
    console.log('🎯 Input clicked:', e.target.name);
    // e.target.focus();
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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
          serviceTypes: formData.serviceType ? [formData.serviceType] : [],
          serviceType: formData.serviceType
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
    <div style={{
      fontFamily: 'Arial, sans-serif',
      maxWidth: '800px',
      margin: '0 auto',
      padding: '20px',
      background: 'white',
      minHeight: '100vh',
      position: 'relative',
      zIndex: 1
    }}>
      
      {/* Header */}
      <div style={{
        textAlign: 'center',
        marginBottom: '40px',
        padding: '30px 0',
        borderBottom: '3px solid #333'
      }}>
        <h1 style={{ 
          fontSize: '48px', 
          margin: '0 0 10px 0', 
          color: 'black',
          fontWeight: 'bold'
        }}>
          VORO
        </h1>
        <p style={{ 
          fontSize: '18px', 
          color: '#666', 
          margin: 0 
        }}>
          웹사이트 제작 전문 · 견적 문의
        </p>
      </div>

      {/* Quick Contact */}
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: '15px',
        justifyContent: 'center',
        marginBottom: '40px'
      }}>
        <a 
          href="http://pf.kakao.com/_tExfLG" 
          target="_blank" 
          rel="noopener noreferrer"
          style={{
            display: 'inline-block',
            padding: '15px 30px',
            background: '#fee500',
            color: 'black',
            textDecoration: 'none',
            borderRadius: '8px',
            fontWeight: 'bold',
            fontSize: '16px',
            minWidth: '200px',
            textAlign: 'center'
          }}
        >
          💬 카카오톡 상담하기
        </a>
        <a 
          href="tel:010-5344-9868"
          style={{
            display: 'inline-block',
            padding: '15px 30px',
            background: 'black',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '8px',
            fontWeight: 'bold',
            fontSize: '16px',
            minWidth: '200px',
            textAlign: 'center'
          }}
        >
          📞 전화 상담하기
        </a>
      </div>

      <div style={{ textAlign: 'center', marginBottom: '40px', color: '#666' }}>
        <p>또는 아래 폼을 작성해주세요</p>
      </div>

      {/* 디버깅 패널 */}
      <div style={{
        position: 'fixed',
        top: '10px',
        right: '10px',
        background: '#000',
        color: '#fff',
        padding: '15px',
        borderRadius: '8px',
        fontSize: '12px',
        fontFamily: 'monospace',
        maxWidth: '300px',
        zIndex: 9999,
        border: '2px solid #007bff'
      }}>
        <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>🔍 LIVE DEBUG</div>
        <div>Name: "{formData.name}"</div>
        <div>Description: "{formData.description.substring(0, 20)}{formData.description.length > 20 ? '...' : ''}"</div>
        <div>Service: "{formData.serviceType}"</div>
        <div style={{ marginTop: '5px', fontSize: '10px', color: '#ccc' }}>
          브라우저 콘솔(F12)도 확인하세요!
        </div>
      </div>

      {/* Contact Form */}
      <form 
        onSubmit={handleSubmit}
        style={{
          position: 'relative',
          zIndex: 2
        }}
      >
        
        {/* 기본 정보 */}
        <div style={{
          border: '3px solid #ddd',
          borderRadius: '10px',
          padding: '30px',
          marginBottom: '30px',
          background: '#f8f9fa'
        }}>
          <h2 style={{ marginBottom: '25px', color: 'black' }}>📝 기본 정보</h2>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
            gap: '20px', 
            marginBottom: '20px' 
          }}>
            <div>
              <label htmlFor="name" style={{ 
                display: 'block', 
                marginBottom: '8px', 
                fontWeight: 'bold', 
                color: '#333',
                fontSize: '18px'
              }}>
                이름 * (테스트)
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={(e) => {
                  debugLog('✅ Name input changed:', e.target.value);
                  setFormData(prev => {
                    const newData = { ...prev, name: e.target.value };
                    debugLog('✅ New formData after name change:', newData);
                    return newData;
                  });
                }}
                onFocus={(e) => {
                  debugLog('✅ Name input focused');
                  e.target.style.borderColor = '#007bff';
                }}
                onBlur={(e) => {
                  debugLog('✅ Name input blurred');
                  e.target.style.borderColor = '#000';
                }}
                onClick={() => debugLog('✅ Name input clicked')}
                placeholder="클릭해서 입력해보세요"
                style={{
                  width: '100%',
                  padding: '15px',
                  fontSize: '18px',
                  border: '3px solid #000',
                  borderRadius: '8px',
                  backgroundColor: '#ffffff',
                  color: '#000000',
                  boxSizing: 'border-box',
                  fontFamily: 'monospace'
                }}
              />
              <div style={{ 
                marginTop: '5px', 
                fontSize: '14px', 
                color: '#666',
                fontFamily: 'monospace'
              }}>
                현재 값: "{formData.name}"
              </div>
            </div>
            
            <div>
              <label htmlFor="company" style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#333' }}>
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
                  fontSize: '16px',
                  border: '2px solid #ccc',
                  borderRadius: '5px',
                  background: 'white',
                  color: 'black',
                  boxSizing: 'border-box',

                }}
              />
            </div>
          </div>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
            gap: '20px' 
          }}>
            <div>
              <label htmlFor="phone" style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#333' }}>
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
                  fontSize: '16px',
                  border: '2px solid #ccc',
                  borderRadius: '5px',
                  background: 'white',
                  color: 'black',
                  boxSizing: 'border-box',

                }}
              />
            </div>
            
            <div>
              <label htmlFor="email" style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#333' }}>
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
                  fontSize: '16px',
                  border: '2px solid #ccc',
                  borderRadius: '5px',
                  background: 'white',
                  color: 'black',
                  boxSizing: 'border-box',

                }}
              />
            </div>
          </div>
        </div>

        {/* 서비스 정보 */}
        <div style={{
          border: '3px solid #ddd',
          borderRadius: '10px',
          padding: '30px',
          marginBottom: '30px',
          background: 'white'
        }}>
          <h2 style={{ marginBottom: '25px', color: 'black' }}>🚀 서비스 정보</h2>
          
          <div style={{ marginBottom: '20px' }}>
            <label htmlFor="serviceType" style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#333' }}>
              어떤 서비스가 필요하신가요?
            </label>
            <select
              id="serviceType"
              name="serviceType"
              value={formData.serviceType}
              onChange={handleInputChange}
              style={{
                width: '100%',
                padding: '12px',
                fontSize: '16px',
                border: '2px solid #ccc',
                borderRadius: '5px',
                background: 'white',
                color: 'black',
                boxSizing: 'border-box',
                cursor: 'pointer',
                outline: 'none',
                pointerEvents: 'auto',
                zIndex: 'auto'
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

          <div>
            <label htmlFor="description" style={{ 
              display: 'block', 
              marginBottom: '8px', 
              fontWeight: 'bold', 
              color: '#333',
              fontSize: '18px'
            }}>
              어떤 사이트를 원하시나요? (테스트)
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={(e) => {
                debugLog('✅ Description textarea changed:', e.target.value);
                setFormData(prev => {
                  const newData = { ...prev, description: e.target.value };
                  debugLog('✅ New formData after description change:', newData);
                  return newData;
                });
              }}
              onFocus={(e) => {
                debugLog('✅ Description textarea focused');
                e.target.style.borderColor = '#007bff';
              }}
              onBlur={(e) => {
                debugLog('✅ Description textarea blurred');
                e.target.style.borderColor = '#000';
              }}
              onClick={() => debugLog('✅ Description textarea clicked')}
              rows={6}
              placeholder="여기를 클릭해서 텍스트를 입력해보세요..."
              style={{
                width: '100%',
                padding: '15px',
                fontSize: '16px',
                border: '3px solid #000',
                borderRadius: '8px',
                backgroundColor: '#ffffff',
                color: '#000000',
                minHeight: '150px',
                fontFamily: 'monospace',
                boxSizing: 'border-box',
                resize: 'vertical'
              }}
            />
            <div style={{ 
              marginTop: '5px', 
              fontSize: '14px', 
              color: '#666',
              fontFamily: 'monospace'
            }}>
              현재 값: "{formData.description}" (길이: {formData.description.length})
            </div>
          </div>
        </div>

        {/* 개인정보처리방침 */}
        <div style={{
          border: '2px solid #ddd',
          borderRadius: '10px',
          padding: '25px',
          marginBottom: '30px',
          background: '#f8f9fa'
        }}>
          <h3 style={{ marginBottom: '15px', color: 'black' }}>개인정보처리방침</h3>
          <div style={{
            background: 'white',
            padding: '15px',
            borderRadius: '5px',
            marginBottom: '15px',
            border: '1px solid #ddd'
          }}>
            <p style={{ margin: '5px 0' }}><strong>수집목적:</strong> 프로젝트 상담 및 견적 제공</p>
            <p style={{ margin: '5px 0' }}><strong>수집항목:</strong> 이름, 연락처, 이메일, 회사명</p>
            <p style={{ margin: '5px 0' }}><strong>보유기간:</strong> 상담 완료 후 1년</p>
            <p style={{ margin: '5px 0' }}><strong>문의:</strong> voro2520@gmail.com / 010-5344-9868</p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <input
              type="checkbox"
              id="agreePrivacy"
              name="agreePrivacy"
              checked={formData.agreePrivacy}
              onChange={handleInputChange}
              style={{ 
                width: '18px', 
                height: '18px',
                cursor: 'pointer',
                accentColor: 'black'
              }}
            />
            <label htmlFor="agreePrivacy" style={{ 
              color: '#333', 
              fontWeight: '500',
              cursor: 'pointer'
            }}>
              개인정보 수집 및 이용에 동의합니다. *
            </label>
          </div>
        </div>

        {/* Submit Message */}
        {submitMessage && (
          <div style={{
            textAlign: 'center',
            padding: '20px',
            borderRadius: '8px',
            marginBottom: '20px',
            background: submitMessage.includes('성공적으로') ? '#d4edda' : '#f8d7da',
            color: submitMessage.includes('성공적으로') ? '#155724' : '#721c24',
            border: submitMessage.includes('성공적으로') ? '2px solid #c3e6cb' : '2px solid #f5c6cb'
          }}>
            {submitMessage}
            {submitMessage.includes('오류') && (
              <div style={{ marginTop: '15px' }}>
                <a 
                  href="tel:010-5344-9868"
                  style={{
                    background: 'black',
                    color: 'white',
                    padding: '10px 20px',
                    textDecoration: 'none',
                    borderRadius: '5px',
                    fontWeight: 'bold'
                  }}
                >
                  📞 010-5344-9868로 전화하기
                </a>
              </div>
            )}
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          style={{
            width: '100%',
            padding: '20px',
            fontSize: '20px',
            fontWeight: 'bold',
            background: isSubmitting ? '#ccc' : 'black',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: isSubmitting ? 'not-allowed' : 'pointer'
          }}
        >
          {isSubmitting ? '전송 중...' : '🚀 문의하기'}
        </button>
        
        <div style={{ textAlign: 'center', marginTop: '20px', color: '#666' }}>
          <p>급하시면 <strong>카카오톡</strong>이나 <strong>전화</strong>로 연락주세요!</p>
        </div>
      </form>

      {/* Footer */}
      <footer style={{
        marginTop: '60px',
        padding: '30px 0',
        borderTop: '3px solid #333',
        textAlign: 'center',
        background: '#f8f9fa'
      }}>
        <h3 style={{ margin: '0 0 10px 0', color: 'black' }}>VORO</h3>
        <p style={{ margin: '0 0 15px 0', color: '#666' }}>Digital Solutions Company</p>
        <div style={{ color: '#333' }}>
          <div>대표자. 임세화</div>
          <div>Tel. 010-5344-9868</div>
          <div>Mail. voro2520@gmail.com</div>
          <div>Head office. 수원시 장안구 조원동 552-4</div>
        </div>
        <div style={{ marginTop: '15px', color: '#999' }}>
          ©VORO All rights reserved.
        </div>
      </footer>
    </div>
  );
} 