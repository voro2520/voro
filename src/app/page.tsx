'use client';

import { useState, useEffect, useMemo } from 'react';

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentSection, setCurrentSection] = useState(0);
  const [isWhiteTheme, setIsWhiteTheme] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });


  const sections = useMemo(() => [
    {
      title: "디자인으로, 브랜드의 기준을 바꿉니다.",
      subtitle: "사업의 크기가 아닌\n가능성과 방향을 먼저 생각합니다.\nVORO는 브랜드의 가치를 디자인합니다."
    }
  ], []);

  // 스크롤 이벤트
  useEffect(() => {
    const handleScroll = () => {
      const aboutSection = document.getElementById('about');
      const servicesSection = document.getElementById('services');
      
      if (aboutSection && servicesSection) {
        const aboutRect = aboutSection.getBoundingClientRect();
        const servicesRect = servicesSection.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const triggerPoint = windowHeight * 0.8;
        
        if (aboutRect.top <= triggerPoint && servicesRect.top > triggerPoint) {
          setIsWhiteTheme(true);
        } else {
          setIsWhiteTheme(false);
        }
      }

      // 텍스트 애니메이션
      const textElements = document.querySelectorAll('[data-scroll-text]');
      textElements.forEach((element) => {
        const rect = element.getBoundingClientRect();
        const elementTop = rect.top;
        const elementHeight = rect.height;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight * 0.7 && elementTop > -elementHeight) {
          const progress = Math.max(0, Math.min(1, (windowHeight * 0.7 - elementTop) / (windowHeight * 0.3)));
          
          if (progress > 0.3) {
            element.classList.remove('text-gray-400');
            element.classList.add('text-black');
          } else {
            element.classList.remove('text-black');
            element.classList.add('text-gray-400');
          }
        } else {
          element.classList.remove('text-black');
          element.classList.add('text-gray-400');
        }
      });


    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 마우스 위치 추적 (부드러운 패럴랙스 효과)
  useEffect(() => {
    let animationId: number;
    const targetPosition = { x: 0, y: 0 };
    
    const handleMouseMove = (e: MouseEvent) => {
      targetPosition.x = (e.clientX / window.innerWidth - 0.5) * 2;
      targetPosition.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    const updatePosition = () => {
      setMousePosition(prev => ({
        x: prev.x + (targetPosition.x - prev.x) * 0.05,
        y: prev.y + (targetPosition.y - prev.y) * 0.05
      }));
      animationId = requestAnimationFrame(updatePosition);
    };

    window.addEventListener('mousemove', handleMouseMove);
    animationId = requestAnimationFrame(updatePosition);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <>
      <div className={`min-h-screen w-full max-w-full overflow-x-hidden transition-colors duration-500 ${isWhiteTheme ? 'bg-white' : 'bg-black'}`}>
        {/* Header */}
        <header className="fixed w-full top-0 z-50 backdrop-blur-sm bg-transparent">
          <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <h1 className={`text-2xl font-bold transition-colors duration-500 ${isWhiteTheme ? 'text-black' : 'text-white'}`}>VORO</h1>
                <span className={`ml-2 text-sm transition-colors duration-500 ${isWhiteTheme ? 'text-gray-600' : 'text-gray-400'}`}>웹/앱 제작</span>
              </div>
              
              <nav className="hidden md:flex space-x-8">
                <a href="#home" className={`transition-colors font-medium ${isWhiteTheme ? 'text-black hover:text-gray-600' : 'text-white hover:text-gray-300'}`}>VORO소개</a>
                <a href="#services" className={`transition-colors font-medium ${isWhiteTheme ? 'text-gray-700 hover:text-black' : 'text-gray-300 hover:text-white'}`}>서비스안내</a>
                <a href="#portfolio" className={`transition-colors font-medium ${isWhiteTheme ? 'text-gray-700 hover:text-black' : 'text-gray-300 hover:text-white'}`}>포트폴리오</a>
                <a href="/contact" className={`transition-colors font-medium ${isWhiteTheme ? 'text-gray-700 hover:text-black' : 'text-gray-300 hover:text-white'}`}>견적문의</a>
              </nav>

              <button 
                className="md:hidden"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <div className="w-6 h-6 flex flex-col justify-center space-y-1">
                  <span className={`block h-0.5 w-6 transition-all ${isWhiteTheme ? 'bg-black' : 'bg-white'} ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
                  <span className={`block h-0.5 w-6 transition-all ${isWhiteTheme ? 'bg-black' : 'bg-white'} ${isMenuOpen ? 'opacity-0' : ''}`}></span>
                  <span className={`block h-0.5 w-6 transition-all ${isWhiteTheme ? 'bg-black' : 'bg-white'} ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
                </div>
              </button>
            </div>
            
            {isMenuOpen && (
              <div className={`md:hidden py-4 border-t transition-colors duration-500 ${isWhiteTheme ? 'border-gray-300' : 'border-gray-700'}`}>
                <div className="flex flex-col space-y-3">
                  <a href="#home" className={`py-2 transition-colors ${isWhiteTheme ? 'text-black hover:text-gray-600' : 'text-white hover:text-gray-300'}`}>VORO소개</a>
                  <a href="#services" className={`py-2 transition-colors ${isWhiteTheme ? 'text-gray-700 hover:text-black' : 'text-gray-300 hover:text-white'}`}>서비스안내</a>
                  <a href="#portfolio" className={`py-2 transition-colors ${isWhiteTheme ? 'text-gray-700 hover:text-black' : 'text-gray-300 hover:text-white'}`}>포트폴리오</a>
                  <a href="/contact" className={`py-2 transition-colors ${isWhiteTheme ? 'text-gray-700 hover:text-black' : 'text-gray-300 hover:text-white'}`}>견적문의</a>
                </div>
              </div>
            )}
          </div>
        </header>

        {/* 1. 홈화면 */}
        <section id="home" className="min-h-screen bg-black text-white relative flex items-center justify-center overflow-hidden">
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="min-h-[600px] sm:min-h-[700px] flex flex-col justify-center">
              <div className="mb-8 sm:mb-12">
                <div className="text-left w-full no-cursor no-outline no-border">
                  <h1 
                    className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-6 sm:mb-8 opacity-0 animate-fade-in-up text-white no-cursor no-outline no-border" 
                                         style={{ 
                       caretColor: 'transparent', 
                       outline: '0', 
                       userSelect: 'none',
                       border: '0',
                       boxShadow: 'none',
                       textShadow: 'none',
                       background: 'transparent',
                       pointerEvents: 'none'
                     }}
                    tabIndex={-1}
                    unselectable="on"
                  >
                    디자인으로, 브랜드의 기준을 바꿉니다.
                  </h1>
                </div>
                
                <div className="text-left w-full no-cursor no-outline no-border">
                  <div 
                    className="text-lg sm:text-xl lg:text-2xl leading-relaxed max-w-full lg:max-w-3xl opacity-0 animate-fade-in-up delay-300 text-gray-400 no-cursor no-outline no-border" 
                                         style={{ 
                       caretColor: 'transparent', 
                       outline: '0', 
                       userSelect: 'none',
                       border: '0',
                       boxShadow: 'none',
                       textShadow: 'none',
                       background: 'transparent',
                       pointerEvents: 'none',
                       whiteSpace: 'pre-line'
                     }}
                    tabIndex={-1}
                    unselectable="on"
                  >
                    사업의 크기가 아닌{'\n'}가능성과 방향을 먼저 생각합니다.{'\n'}VORO는 브랜드의 가치를 디자인합니다.
                  </div>
                </div>
              </div>
              
              <div className="mt-8 sm:mt-12 text-left w-full opacity-0 animate-fade-in-up delay-500">
                <div 
                  onClick={() => window.location.href = '/contact'}
                  className="contact-button group cursor-pointer inline-flex items-center gap-2 text-white font-medium hover:text-gray-300 transition-colors"
                >
                  <span className="text-lg sm:text-xl lg:text-2xl font-bold">CONTACT US</span>
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>


            </div>
          </div>
        </section>

        {/* 2. 서비스 소개 */}
        <section id="services" className="py-20 sm:py-24 lg:py-32 bg-black relative overflow-hidden z-10 min-h-screen flex items-center justify-start w-full max-w-full">
          <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
            <div 
              className="text-[10rem] sm:text-[14rem] md:text-[18rem] lg:text-[22rem] xl:text-[26rem] 2xl:text-[30rem] font-black text-white/15 leading-none select-none will-change-transform"
              style={{
                transform: `translate3d(${mousePosition.x * 15}px, ${mousePosition.y * 15}px, 0)`,
                animation: 'voro-float-services 20s ease-in-out infinite, voro-pulse 15s ease-in-out infinite, voro-glow 12s ease-in-out infinite',
                transition: 'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
              }}
            >
              VORO
            </div>
          </div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
            <div className="text-left max-w-full lg:max-w-4xl">
              <div className="min-h-[400px] sm:min-h-[500px] flex flex-col justify-center">
                <div className="mb-8 sm:mb-12">
                  <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight mb-6 sm:mb-8 whitespace-pre-wrap break-words">
                    아이디어만 있어도{'\n'}괜찮습니다.
                  </h2>
                  <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight whitespace-pre-wrap break-words">
                    VORO는 브랜딩부터{'\n'}함께합니다.
                  </h2>
                </div>
                
                <div className="mb-8 sm:mb-12">
                  <p className="text-lg sm:text-xl lg:text-2xl text-gray-400 leading-relaxed max-w-full lg:max-w-3xl mb-6">
                    당신의 비전을 현실로 만드는 파트너,<br className="hidden sm:block" />
                    브랜드 아이덴티티부터 웹사이트, 앱 개발까지<br className="hidden sm:block" />
                    완성도 높은 디지털 솔루션을 제공합니다.
                  </p>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-12">
                    {/* 브랜드 아이덴티티 */}
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/15 transition-all duration-300">
                      <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">브랜드 아이덴티티</h3>
                      <p className="text-gray-400 text-base sm:text-lg leading-relaxed mb-4">
                        당신의 브랜드는 어떤 인상을 주고 있나요?
                      </p>
                      <p className="text-gray-300 text-base sm:text-lg leading-relaxed mb-4">
                        로고, 컬러, 글꼴, 말투까지<br />
                        브랜드의 첫인상과 성격을 정리해드립니다.
                      </p>
                      <p className="text-blue-300 text-base sm:text-lg font-medium">
                        작지만 분명한 아이덴티티를 만드는 것, VORO가 가장 잘합니다.
                      </p>
                    </div>

                    {/* 반응형 웹사이트 개발 */}
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/15 transition-all duration-300">
                      <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">반응형 웹사이트 개발</h3>
                      <p className="text-gray-300 text-base sm:text-lg leading-relaxed mb-4">
                        기업 홈페이지, 쇼핑몰, 랜딩페이지 등<br />
                        목적과 규모에 맞는 사이트를 설계하고 개발합니다.
                      </p>
                      <p className="text-green-300 text-base sm:text-lg font-medium">
                        빠르고 안정적인 기술로 완성도 높은 결과물을 제공합니다.
                      </p>
                    </div>

                    {/* UI/UX 디자인 */}
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/15 transition-all duration-300">
                      <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">UI/UX 디자인</h3>
                      <p className="text-gray-400 text-base sm:text-lg leading-relaxed mb-4">
                        보는 사람도, 사용하는 사람도 편안하게.
                      </p>
                      <p className="text-gray-300 text-base sm:text-lg leading-relaxed mb-4">
                        직관적인 구조와 감각적인 디자인으로<br />
                        고객이 머무르고 싶어지는 사이트를 만듭니다.
                      </p>
                      <p className="text-purple-300 text-base sm:text-lg font-medium">
                        모바일부터 PC까지, 일관된 사용자 경험을 고려합니다.
                      </p>
                    </div>

                    {/* SEO 검색엔진 최적화 */}
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/15 transition-all duration-300">
                      <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">SEO 검색엔진 최적화</h3>
                      <p className="text-gray-400 text-base sm:text-lg leading-relaxed mb-4">
                        검색에서 당신의 브랜드가 먼저 보이도록.
                      </p>
                      <p className="text-gray-300 text-base sm:text-lg leading-relaxed mb-4">
                        기본 SEO 구조를 적용해<br />
                        구글, 네이버 등에서 더 잘 노출되도록 설정해드립니다.
                      </p>
                      <p className="text-orange-300 text-base sm:text-lg font-medium">
                        오픈과 동시에 '발견되는' 홈페이지를 시작하세요.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 sm:mt-12">
                  <a 
                    href="/contact"
                    className="contact-button group cursor-pointer inline-flex items-center gap-2 text-white font-medium hover:text-gray-300 transition-colors"
                  >
                    <span className="text-lg sm:text-xl lg:text-2xl font-bold">CONTACT US</span>
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. 회사소개 */}
        <section id="about" className="py-20 sm:py-24 lg:py-32 bg-white relative z-20 min-h-screen overflow-x-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center min-h-[70vh]">
              <div className="space-y-8 lg:space-y-12">
                <div className="space-y-6 sm:space-y-8">
                  <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-black leading-tight tracking-wide">
                    ABOUT<br />VORO
                  </h2>
                  <div className="w-24 sm:w-32 h-1 bg-black"></div>
                </div>
                
                <p className="text-lg sm:text-xl lg:text-2xl text-gray-400 leading-relaxed transition-colors duration-700" data-scroll-text>
                  VORO는 브랜드의 방향성과 감성을 시각화하는<br className="hidden sm:block" />
                  디자인/개발 스튜디오입니다.
                </p>
                
                <p className="text-lg sm:text-xl lg:text-2xl text-gray-400 leading-relaxed transition-colors duration-700" data-scroll-text>
                  VORO는 단순히 디자인만 하지 않습니다.<br className="hidden sm:block" />
                  브랜딩의 시작부터, 고객의 이야기를 함께 디자인합니다.
                </p>
                
                <p className="text-lg sm:text-xl lg:text-2xl text-gray-400 leading-relaxed transition-colors duration-700" data-scroll-text>
                  아이디어, 아이덴티티, 방향성 —<br className="hidden sm:block" />
                  브랜드가 만들어지는 전 과정을 함께 고민합니다.
                </p>
                
                <div className="pt-6 sm:pt-8 space-y-6 sm:space-y-8 lg:space-y-10">
                  <p className="text-base sm:text-lg lg:text-xl text-gray-400 leading-relaxed transition-colors duration-700" data-scroll-text>
                    This is a design/development studio<br className="hidden sm:block" />
                    VORO that visualizes the direction and sensibility of the brand.
                  </p>
                  
                  <p className="text-base sm:text-lg lg:text-xl text-gray-400 leading-relaxed transition-colors duration-700" data-scroll-text>
                    VORO doesn&apos;t just design.<br className="hidden sm:block" />
                    From the start of branding, we design the customer&apos;s story together.
                  </p>
                  
                  <p className="text-base sm:text-lg lg:text-xl text-gray-400 leading-relaxed transition-colors duration-700" data-scroll-text>
                    Ideas, identities, and directions —<br className="hidden sm:block" />
                    We think about the entire process of creating a brand together.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>



        {/* 4. 포트폴리오 섹션 - 모던 카드 그리드 */}
        <section id="portfolio" className="py-20 sm:py-24 lg:py-32 bg-black relative z-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* 섹션 헤더 */}
            <div className="text-center mb-16 sm:mb-20">
              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
                PORTFOLIO
              </h2>
              <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto">
                다양한 프로젝트를 통해 축적된 경험과 노하우로<br className="hidden sm:block" />
                고객의 비전을 성공적으로 실현한 사례들입니다.
              </p>
            </div>

            {/* 포트폴리오 그리드 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
              {/* 프로젝트 1 - DN 오토모티브 */}
              <div className="group relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-500 hover:scale-105">
                <div className="aspect-[16/10] overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                    alt="DN 오토모티브 프로젝트"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                </div>
                
                <div className="p-6 sm:p-8">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-xs sm:text-sm text-gray-400">01</span>
                    <span className="text-xs sm:text-sm text-gray-400">•</span>
                    <span className="text-xs sm:text-sm text-gray-400">Feb 2023</span>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="bg-white/10 text-white px-3 py-1 rounded-full text-xs sm:text-sm">Website</span>
                    <span className="bg-white/10 text-white px-3 py-1 rounded-full text-xs sm:text-sm">Renewal</span>
                    <span className="bg-white/10 text-white px-3 py-1 rounded-full text-xs sm:text-sm">Development</span>
                  </div>
                  
                  <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3">
                    DN 오토모티브
                  </h3>
                  <p className="text-gray-400 text-sm sm:text-base leading-relaxed mb-6">
                    자동차 부품 전문 업체의 브랜드 리뉴얼과 웹사이트 개발 프로젝트. 
                    기업의 전문성과 신뢰성을 강조한 모던한 디자인으로 구현했습니다.
                  </p>
                  
                  <button className="flex items-center gap-2 text-white font-medium hover:text-gray-300 transition-colors group">
                    <span>VISIT SITE</span>
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* 프로젝트 2 - 테크 스타트업 */}
              <div className="group relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-500 hover:scale-105">
                <div className="aspect-[16/10] overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2015&q=80"
                    alt="테크 스타트업 프로젝트"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                </div>
                
                <div className="p-6 sm:p-8">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-xs sm:text-sm text-gray-400">02</span>
                    <span className="text-xs sm:text-sm text-gray-400">•</span>
                    <span className="text-xs sm:text-sm text-gray-400">Mar 2023</span>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="bg-white/10 text-white px-3 py-1 rounded-full text-xs sm:text-sm">Branding</span>
                    <span className="bg-white/10 text-white px-3 py-1 rounded-full text-xs sm:text-sm">UI/UX</span>
                    <span className="bg-white/10 text-white px-3 py-1 rounded-full text-xs sm:text-sm">App</span>
                  </div>
                  
                  <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3">
                    테크 스타트업
                  </h3>
                  <p className="text-gray-400 text-sm sm:text-base leading-relaxed mb-6">
                    혁신적인 기술을 바탕으로 한 스타트업의 브랜드 아이덴티티와 
                    사용자 경험 디자인. 미래지향적이고 직관적인 인터페이스를 제공했습니다.
                  </p>
                  
                  <button className="flex items-center gap-2 text-white font-medium hover:text-gray-300 transition-colors group">
                    <span>VISIT SITE</span>
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* 프로젝트 3 - 패션 브랜드 */}
              <div className="group relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-500 hover:scale-105">
                <div className="aspect-[16/10] overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                    alt="패션 브랜드 프로젝트"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                </div>
                
                <div className="p-6 sm:p-8">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-xs sm:text-sm text-gray-400">03</span>
                    <span className="text-xs sm:text-sm text-gray-400">•</span>
                    <span className="text-xs sm:text-sm text-gray-400">Apr 2023</span>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="bg-white/10 text-white px-3 py-1 rounded-full text-xs sm:text-sm">E-commerce</span>
                    <span className="bg-white/10 text-white px-3 py-1 rounded-full text-xs sm:text-sm">Mobile</span>
                    <span className="bg-white/10 text-white px-3 py-1 rounded-full text-xs sm:text-sm">Brand</span>
                  </div>
                  
                  <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3">
                    패션 브랜드
                  </h3>
                  <p className="text-gray-400 text-sm sm:text-base leading-relaxed mb-6">
                    감각적인 패션 브랜드의 온라인 쇼핑몰과 모바일 앱 디자인. 
                    트렌디하고 세련된 감성을 담아 고객의 쇼핑 경험을 향상시켰습니다.
                  </p>
                  
                  <button className="flex items-center gap-2 text-white font-medium hover:text-gray-300 transition-colors group">
                    <span>VISIT SITE</span>
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* 프로젝트 4 - 금융 서비스 */}
              <div className="group relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-500 hover:scale-105">
                <div className="aspect-[16/10] overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80"
                    alt="금융 서비스 프로젝트"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                </div>
                
                <div className="p-6 sm:p-8">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-xs sm:text-sm text-gray-400">04</span>
                    <span className="text-xs sm:text-sm text-gray-400">•</span>
                    <span className="text-xs sm:text-sm text-gray-400">May 2023</span>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="bg-white/10 text-white px-3 py-1 rounded-full text-xs sm:text-sm">Corporate</span>
                    <span className="bg-white/10 text-white px-3 py-1 rounded-full text-xs sm:text-sm">Identity</span>
                    <span className="bg-white/10 text-white px-3 py-1 rounded-full text-xs sm:text-sm">Web</span>
                  </div>
                  
                  <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3">
                    금융 서비스
                  </h3>
                  <p className="text-gray-400 text-sm sm:text-base leading-relaxed mb-6">
                    신뢰성과 안정성을 중시하는 금융 서비스의 기업 아이덴티티와 웹사이트. 
                    전문적이고 안전한 이미지를 구축하여 고객 신뢰도를 높였습니다.
                  </p>
                  
                  <button className="flex items-center gap-2 text-white font-medium hover:text-gray-300 transition-colors group">
                    <span>VISIT SITE</span>
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* 더 많은 프로젝트 보기 버튼 */}
            <div className="text-center mt-12 sm:mt-16">
              <button className="inline-flex items-center gap-3 bg-transparent border-2 border-white text-white px-8 sm:px-10 py-4 sm:py-5 text-lg font-bold hover:bg-white hover:text-black transition-all duration-300 rounded-lg">
                <span>VIEW ALL PROJECTS</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </section>

        {/* 5. 제작과정 */}
        <section className="py-20 sm:py-24 lg:py-32 bg-gray-50 relative z-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16 sm:mb-20">
              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-black mb-6">
                처음이신가요? 걱정하지 마세요.
              </h2>
              <h3 className="text-2xl sm:text-3xl font-bold text-black mb-4">
                VORO는 이렇게 함께합니다.
              </h3>
              <p className="text-xl sm:text-2xl text-gray-700 max-w-3xl mx-auto font-medium">
                "어떻게 만들지, 함께 이야기해요."
              </p>
            </div>

            <div className="space-y-16 sm:space-y-20">
              {/* 1단계 - 상담 */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="order-2 lg:order-1">
                  <div className="bg-black text-white rounded-2xl p-8 sm:p-10">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 bg-white text-black rounded-full flex items-center justify-center font-bold text-xl">01</div>
                      <h3 className="text-2xl sm:text-3xl font-bold">상담</h3>
                    </div>
                    <div className="space-y-4 text-gray-300 text-lg leading-relaxed">
                      <p className="font-medium text-white">
                        ✔ 이렇게 진행돼요:
                      </p>
                      <ul className="space-y-2 pl-4">
                        <li>• 브랜드나 아이디어가 있는지 확인</li>
                        <li>• 어떤 고객층을 타겟으로 할지 정리</li>
                        <li>• 필요한 기능이 있는지 함께 생각</li>
                        <li>• 예상 일정 간단히 안내</li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="order-1 lg:order-2">
                  <img 
                    src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop&q=90" 
                    alt="상담 과정"
                    className="w-full h-[400px] object-cover rounded-2xl shadow-lg"
                  />
                </div>
              </div>

              {/* 2단계 - 디자인 */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <img 
                    src="https://images.unsplash.com/photo-1558655146-d09347e92766?w=800&h=600&fit=crop&q=90" 
                    alt="디자인 과정"
                    className="w-full h-[400px] object-cover rounded-2xl shadow-lg"
                  />
                </div>
                <div>
                  <div className="bg-white border-2 border-black rounded-2xl p-8 sm:p-10">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center font-bold text-xl">02</div>
                      <div className="flex items-center gap-3">
                        <h3 className="text-2xl sm:text-3xl font-bold text-black">디자인</h3>
                        <span className="text-sm bg-black text-white px-3 py-1 rounded-full font-medium">무료시안제공</span>
                      </div>
                    </div>
                    <p className="text-gray-700 text-lg leading-relaxed mb-4 font-medium">
                      "눈에 띄고, 써보기 편한 디자인을 만들어요."
                    </p>
                    <p className="text-gray-700 text-base leading-relaxed mb-6">
                      고객의 스타일과 브랜드 감성에 맞게<br />
                      디자인 시안을 그려드려요.<br />
                      모바일에서도 예쁘고 편하게 볼 수 있도록 신경 씁니다.
                    </p>
                    <div className="space-y-2">
                      <p className="text-gray-700 font-medium">✔ 이렇게 진행돼요:</p>
                      <ul className="space-y-1 text-gray-700 text-sm pl-4">
                        <li>• 손으로 그린 첫 시안(와이어프레임) 제작</li>
                        <li>• 사용자 입장에서 보기 편한 UX 적용</li>
                        <li>• 브랜드 색상, 로고 톤 맞추기</li>
                        <li>• 모바일/PC 모두 보기 좋게 조정</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* 3단계 - 개발 */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="order-2 lg:order-1">
                  <div className="bg-black text-white rounded-2xl p-8 sm:p-10">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 bg-white text-black rounded-full flex items-center justify-center font-bold text-xl">03</div>
                      <h3 className="text-2xl sm:text-3xl font-bold">개발</h3>
                    </div>
                    <p className="text-gray-300 text-lg leading-relaxed mb-4 font-medium">
                      "디자인을 진짜 홈페이지로 완성해요."
                    </p>
                    <p className="text-gray-300 text-base leading-relaxed mb-6">
                      디자인이 결정되면, 실제로 홈페이지를 작동하게 만듭니다.<br />
                      느리지 않게, 문제 없이 잘 돌아가게 세팅합니다.
                    </p>
                    <div className="space-y-2">
                      <p className="text-white font-medium">✔ 이렇게 진행돼요:</p>
                      <ul className="space-y-1 text-gray-300 text-sm pl-4">
                        <li>• 화면이 보이도록 만드는 작업(프론트엔드)</li>
                        <li>• 글이나 제품을 저장할 시스템 개발(백엔드)</li>
                        <li>• 예약, 문의, 지도 등 필요한 기능 연결</li>
                        <li>• 로딩 속도와 보안도 함께 점검</li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="order-1 lg:order-2">
                  <img 
                    src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=600&fit=crop&q=90" 
                    alt="개발 과정"
                    className="w-full h-[400px] object-cover rounded-2xl shadow-lg"
                  />
                </div>
              </div>

              {/* 4단계 - 테스트 & 런칭 */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <img 
                    src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop&q=90" 
                    alt="테스트 및 런칭 과정"
                    className="w-full h-[400px] object-cover rounded-2xl shadow-lg"
                  />
                </div>
                <div>
                  <div className="bg-white border-2 border-black rounded-2xl p-8 sm:p-10">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center font-bold text-xl">04</div>
                      <h3 className="text-2xl sm:text-3xl font-bold text-black">테스트 & 런칭</h3>
                    </div>
                    <p className="text-gray-700 text-lg leading-relaxed mb-4 font-medium">
                      "문제 없는지 확인하고, 온라인에 올려드려요."
                    </p>
                    <p className="text-gray-700 text-base leading-relaxed mb-6">
                      홈페이지가 잘 작동하는지 꼼꼼히 확인한 후<br />
                      고객님께 최종 확인 받고 세상에 공개합니다.<br />
                      오픈 후에도 수정이나 업데이트는 언제든 도와드려요.
                    </p>
                    <div className="space-y-2">
                      <p className="text-gray-700 font-medium">✔ 이렇게 진행돼요:</p>
                      <ul className="space-y-1 text-gray-700 text-sm pl-4">
                        <li>• 기능 이상 없는지 점검</li>
                        <li>• 모바일/PC 모두 테스트</li>
                        <li>• 도메인 연결 및 오픈</li>
                        <li>• 수정이나 유지관리 지원</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* TIP 섹션 */}
            <div className="mt-20 bg-gradient-to-r from-gray-100 to-gray-200 rounded-3xl p-8 sm:p-12 text-center">
              <div className="max-w-4xl mx-auto">
                <blockquote className="text-lg sm:text-xl text-gray-700 leading-relaxed">
                  "잘 몰라도 괜찮습니다.<br />
                  당신의 아이디어나 상황만 말해주세요.<br />
                  우리가 함께 길을 만들어드립니다."
                </blockquote>
                <p className="text-base text-gray-600 mt-4 font-medium">– by VORO</p>
              </div>
            </div>

            <div className="text-center mt-20">
              <h3 className="text-2xl sm:text-3xl font-bold text-black mb-8">
                이제, 당신의 브랜드도 시작할 시간입니다.
              </h3>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <a 
                  href="/contact"
                  className="inline-flex items-center gap-3 bg-black text-white px-8 py-4 text-lg font-bold hover:bg-gray-800 transition-all duration-300 rounded-lg"
                >
                  <span>카카오톡으로 문의하기</span>
                </a>
                <a 
                  href="/contact"
                  className="inline-flex items-center gap-3 bg-white border-2 border-black text-black px-8 py-4 text-lg font-bold hover:bg-black hover:text-white transition-all duration-300 rounded-lg"
                >
                  <span>무료 시안 요청</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Work Together Section */}
        <section className="py-32 bg-black relative z-20">
          <div className="w-full px-4">
            <div className="text-center">
              <a 
                href="/contact"
                className="group cursor-pointer inline-block"
              >
                <h2 className="text-5xl md:text-7xl lg:text-9xl xl:text-[10rem] font-black text-white leading-tight transition-all duration-500 group-hover:text-gray-300 flex items-center justify-center whitespace-nowrap">
                  WORK TOGETHER
                  <span className="inline-block ml-8 opacity-0 transition-all duration-500 group-hover:opacity-100 group-hover:translate-x-2 group-hover:rotate-45 transform">
                    <svg 
                      className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 xl:w-28 xl:h-28 transition-transform duration-500" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M7 17L17 7M17 7H7M17 7V17" 
                      />
                    </svg>
                  </span>
                </h2>
              </a>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-black text-white py-8 relative z-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-bold mb-2">VORO</h3>
                <p className="text-gray-400 mb-4">Digital Solutions Company</p>
                <div className="text-sm text-gray-400">
                  <div>대표자. 임세화</div>
                  <div>Tel. 010-5344-9868</div>
                  <div>Mail. voro2520@ganmail.com</div>
                </div>
              </div>
              <div className="text-sm text-gray-400">
                <div className="mb-2">
                  <strong>Head office.</strong> 수원시 장안구 조원동 552-4
                </div>
                <div className="flex space-x-4 mt-4">
                  <a href="#" className="hover:text-white transition-colors">개인정보처리방침</a>
                  <a href="#" className="hover:text-white transition-colors">이용약관</a>
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