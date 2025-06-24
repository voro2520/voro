'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function About() {
  const [activeTab, setActiveTab] = useState('philosophy');

  const teamMembers = [
    {
      name: "임세화",
      position: "Creative Director",
      description: "15년간의 브랜딩 경험으로 고객의 비전을 현실로 만듭니다.",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&q=80"
    },
    {
      name: "김디자인",
      position: "Lead Designer",
      description: "시각적 스토리텔링의 전문가로 브랜드에 생명을 불어넣습니다.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&q=80"
    },
    {
      name: "박개발",
      position: "Lead Developer",
      description: "최신 기술로 브랜드의 디지털 경험을 완성합니다.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&q=80"
    }
  ];

  return (
    <>
      {/* 구조화된 데이터 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "AboutPage",
            "mainEntity": {
              "@type": "Organization",
              "name": "VORO",
              "description": "브랜드의 시작부터 성장까지, 모든 순간을 함께하는 디자인 파트너",
              "employee": teamMembers.map(member => ({
                "@type": "Person",
                "name": member.name,
                "jobTitle": member.position,
                "description": member.description
              }))
            }
          })
        }}
      />
      
      <div className="min-h-screen bg-black text-white">
        {/* Header */}
        <header className="fixed w-full top-0 z-50 bg-black/90 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <Link href="/" className="flex items-center">
                <h1 className="text-2xl font-bold text-white">VORO</h1>
                <span className="ml-2 text-sm text-gray-400">웹/앱 제작</span>
              </Link>
              
              <nav className="hidden md:flex space-x-8" role="navigation" aria-label="주요 메뉴">
                <Link href="/" className="text-gray-300 hover:text-white transition-colors font-medium">홈</Link>
                <Link href="#philosophy" className="text-white hover:text-gray-300 transition-colors font-medium" aria-current="page">회사소개</Link>
                <Link href="#services" className="text-gray-300 hover:text-white transition-colors font-medium">서비스</Link>
                <Link href="#team" className="text-gray-300 hover:text-white transition-colors font-medium">팀</Link>
              </nav>

              <Link href="/" className="text-gray-300 hover:text-white transition-colors" aria-label="닫기">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </Link>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="pt-20 pb-16 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900/50 via-black to-gray-900/50"></div>
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center">
              <h1 className="text-5xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-white via-yellow-200 to-white bg-clip-text text-transparent">
                About VORO
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 leading-relaxed max-w-4xl mx-auto">
                브랜드의 시작부터 성장까지,<br />
                모든 순간을 함께하는 디자인 파트너
              </p>
            </div>
          </div>
        </section>

        {/* Tab Navigation */}
        <section className="py-8 border-b border-gray-800">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex justify-center space-x-8" role="tablist" aria-label="회사소개 섹션">
              {[
                { id: 'philosophy', label: '철학' },
                { id: 'approach', label: '접근방식' },
                { id: 'values', label: '가치' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  role="tab"
                  aria-selected={activeTab === tab.id}
                  aria-controls={`${tab.id}-panel`}
                  className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'bg-white text-black'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </section>

        {/* Tab Content */}
        <main className="py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            {activeTab === 'philosophy' && (
              <article id="philosophy-panel" role="tabpanel" className="space-y-12 animate-fade-in">
                <header className="text-center max-w-4xl mx-auto">
                  <h2 className="text-4xl md:text-5xl font-bold mb-8">우리의 철학</h2>
                  <p className="text-xl text-gray-300 leading-relaxed mb-12">
                    VORO는 단순히 예쁜 디자인을 만드는 회사가 아닙니다.<br />
                    우리는 브랜드의 본질을 찾고, 그 이야기를 세상에 전달하는 일을 합니다.
                  </p>
                </header>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <article className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 p-8 rounded-2xl border border-gray-700">
                    <h3 className="text-2xl font-bold mb-4 text-yellow-400">진정성</h3>
                    <p className="text-gray-300 leading-relaxed">
                      겉보기만 화려한 디자인이 아닌, 브랜드의 진정한 가치와 메시지를 담은 디자인을 추구합니다.
                    </p>
                  </article>
                  
                  <article className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 p-8 rounded-2xl border border-gray-700">
                    <h3 className="text-2xl font-bold mb-4 text-blue-400">협력</h3>
                    <p className="text-gray-300 leading-relaxed">
                      고객과의 긴밀한 소통을 통해 함께 브랜드를 만들어가며, 단순한 외주업체가 아닌 파트너가 됩니다.
                    </p>
                  </article>
                  
                  <article className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 p-8 rounded-2xl border border-gray-700">
                    <h3 className="text-2xl font-bold mb-4 text-pink-400">혁신</h3>
                    <p className="text-gray-300 leading-relaxed">
                      트렌드를 따라가는 것이 아닌, 브랜드만의 독특한 색깔을 찾아 새로운 가치를 창조합니다.
                    </p>
                  </article>
                  
                  <article className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 p-8 rounded-2xl border border-gray-700">
                    <h3 className="text-2xl font-bold mb-4 text-purple-400">지속성</h3>
                    <p className="text-gray-300 leading-relaxed">
                      일회성 프로젝트가 아닌, 브랜드의 성장과 함께하는 장기적인 관점에서 접근합니다.
                    </p>
                  </article>
                </div>
              </article>
            )}

            {activeTab === 'approach' && (
              <div className="space-y-12 animate-fade-in">
                <div className="text-center max-w-4xl mx-auto">
                  <h2 className="text-4xl md:text-5xl font-bold mb-8">우리의 접근방식</h2>
                  <p className="text-xl text-gray-300 leading-relaxed mb-12">
                    체계적이고 전략적인 프로세스를 통해<br />
                    브랜드의 성공을 보장합니다.
                  </p>
                </div>
                
                <div className="space-y-8">
                  {[
                    {
                      step: "01",
                      title: "깊이 있는 이해",
                      description: "브랜드의 비전, 미션, 타겟 고객을 완전히 이해하는 것부터 시작합니다.",
                      color: "cyan"
                    },
                    {
                      step: "02",
                      title: "전략 수립",
                      description: "시장 분석과 경쟁사 연구를 바탕으로 차별화된 브랜딩 전략을 세웁니다.",
                      color: "purple"
                    },
                    {
                      step: "03",
                      title: "창작과 구현",
                      description: "전략을 바탕으로 시각적 아이덴티티와 디지털 경험을 창조합니다.",
                      color: "pink"
                    },
                    {
                      step: "04",
                      title: "지속적 발전",
                      description: "런칭 이후에도 브랜드의 성장을 위한 지속적인 지원과 최적화를 제공합니다.",
                      color: "yellow"
                    }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center space-x-8 group">
                      <div className={`flex-shrink-0 w-20 h-20 rounded-full bg-${item.color}-400/20 flex items-center justify-center group-hover:bg-${item.color}-400/30 transition-all duration-300`}>
                        <span className={`text-${item.color}-400 font-bold text-xl`}>{item.step}</span>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold mb-2 group-hover:text-white transition-colors">{item.title}</h3>
                        <p className="text-gray-300 leading-relaxed">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'values' && (
              <div className="space-y-12 animate-fade-in">
                <div className="text-center max-w-4xl mx-auto">
                  <h2 className="text-4xl md:text-5xl font-bold mb-8">우리의 가치</h2>
                  <p className="text-xl text-gray-300 leading-relaxed mb-12">
                    VORO가 추구하는 핵심 가치들은<br />
                    모든 프로젝트의 기준이 됩니다.
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="text-center group">
                    <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold mb-4">창의성</h3>
                    <p className="text-gray-300">독창적이고 혁신적인 아이디어로 브랜드의 차별점을 만듭니다.</p>
                  </div>
                  
                  <div className="text-center group">
                    <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-purple-400 to-pink-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold mb-4">소통</h3>
                    <p className="text-gray-300">투명하고 원활한 커뮤니케이션으로 신뢰를 구축합니다.</p>
                  </div>
                  
                  <div className="text-center group">
                    <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-yellow-400 to-orange-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold mb-4">품질</h3>
                    <p className="text-gray-300">완벽을 추구하며 최고 수준의 결과물을 제공합니다.</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>

        {/* Team Section */}
        <section id="team" className="py-20 bg-gray-900/50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-8">Our Team</h2>
              <p className="text-xl text-gray-300 leading-relaxed">
                각 분야의 전문가들이 모여<br />
                최고의 결과를 만들어냅니다
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {teamMembers.map((member, index) => (
                <div key={index} className="text-center group">
                  <div className="relative mb-6">
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className="w-40 h-40 rounded-full mx-auto object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 w-40 h-40 rounded-full mx-auto bg-gradient-to-br from-cyan-400/20 to-purple-600/20 group-hover:opacity-100 opacity-0 transition-opacity duration-300"></div>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{member.name}</h3>
                  <p className="text-cyan-400 font-semibold mb-4">{member.position}</p>
                  <p className="text-gray-300 leading-relaxed">{member.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="py-20 bg-gradient-to-r from-gray-900 to-black">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-8">
              함께 시작해보세요
            </h2>
            <p className="text-xl text-gray-300 mb-12 leading-relaxed">
              아이디어만 있어도 괜찮습니다.<br />
              VORO는 브랜딩부터 함께 합니다.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/#contact" className="bg-white text-black px-8 py-4 rounded-lg font-semibold hover:bg-gray-200 transition-colors">
                프로젝트 문의
              </Link>
              <a href="tel:010-5344-9868" className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-black transition-colors">
                전화 상담
              </a>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-black text-white py-12 border-t border-gray-800">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-bold mb-4">VORO</h3>
                <p className="text-gray-400 mb-6">브랜딩 디자인 스튜디오</p>
                <div className="text-sm text-gray-400 space-y-1">
                  <div>대표자. 임세화</div>
                  <div>Tel. 010-5344-9868</div>
                  <div>Mail. voro2520@ganmail.com</div>
                  <div>Address. 수원시 장안구 조원동 552-4</div>
                </div>
              </div>
              <div className="flex flex-col justify-end">
                <div className="text-sm text-gray-400">
                  <div className="flex space-x-4 mb-4">
                    <a href="#" className="hover:text-white transition-colors">개인정보처리방침</a>
                    <a href="#" className="hover:text-white transition-colors">이용약관</a>
                  </div>
                  <div>
                    ©2024 VORO All rights reserved.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}