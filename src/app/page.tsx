'use client';

import { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentSection, setCurrentSection] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [isWhiteTheme, setIsWhiteTheme] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [portfolioTransforms, setPortfolioTransforms] = useState<{ [key: number]: number }>({});
  const [tourSectionTransforms, setTourSectionTransforms] = useState<{ [key: string]: number }>({});


  const sections = useMemo(() => [
    {
      title: "당신의 브랜드,\n디자인으로 말하게 하세요.",
      subtitle: "브랜드를 세우는 첫 순간부터,\nVORO는 함께합니다."
    }
  ], []);

  useEffect(() => {
    const currentText = sections[currentSection].title + '\n\n' + sections[currentSection].subtitle;
    let index = 0;
    setDisplayedText('');
    setIsTyping(true);

    const typeWriter = () => {
      if (index < currentText.length) {
        setDisplayedText(currentText.slice(0, index + 1));
        index++;
        setTimeout(typeWriter, 50);
      } else {
        setIsTyping(false);
        if (currentSection < sections.length - 1) {
          setTimeout(() => {
            setCurrentSection((prev) => (prev + 1) % sections.length);
          }, 3000);
        }
      }
    };

    const timer = setTimeout(typeWriter, 500);
    return () => clearTimeout(timer);
  }, [currentSection, sections]);

  // 스크롤 이벤트로 테마 변경
  useEffect(() => {
    const handleScroll = () => {
      const aboutSection = document.getElementById('about');
      const servicesSection = document.getElementById('services');
      
      if (aboutSection && servicesSection) {
        const aboutRect = aboutSection.getBoundingClientRect();
        const servicesRect = servicesSection.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const triggerPoint = windowHeight * 0.8; // 화면의 4/5 지점
        
        // ABOUT 섹션이 화면의 4/5 지점에 도달하면 화이트 테마로 변경
        // Services 섹션(아이디어 섹션)이 화면의 4/5 지점에 도달하면 다시 블랙 테마로 변경
        if (aboutRect.top <= triggerPoint && servicesRect.top > triggerPoint) {
          setIsWhiteTheme(true);
        } else {
          setIsWhiteTheme(false);
        }
      }

      // ABOUT 섹션 내 텍스트 애니메이션
      const textElements = document.querySelectorAll('[data-scroll-text]');
      textElements.forEach((element) => {
        const rect = element.getBoundingClientRect();
        const elementTop = rect.top;
        const elementHeight = rect.height;
        const windowHeight = window.innerHeight;
        
        // 요소가 화면 중앙에 가까워질수록 블랙으로 변경
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

      // 포트폴리오 이미지 parallax 효과
      const portfolioImages = document.querySelectorAll('[data-portfolio-image]');
      const newTransforms: { [key: number]: number } = {};
      
      portfolioImages.forEach((image, index) => {
        const rect = image.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const imageCenter = rect.top + rect.height / 2;
        const windowCenter = windowHeight / 2;
        
        // 이미지가 화면에 보일 때만 계산
        if (rect.top < windowHeight && rect.bottom > 0) {
          // 화면 중앙을 기준으로 이미지의 상대적 위치 계산
          const distanceFromCenter = imageCenter - windowCenter;
          // parallax 강도 조절 (0.1은 미묘한 효과, 0.3은 강한 효과)
          const parallaxOffset = distanceFromCenter * 0.15;
          newTransforms[index] = parallaxOffset;
        } else {
          newTransforms[index] = 0;
        }
      });
      
      setPortfolioTransforms(newTransforms);

      // VORO Design Tour 중첩 효과 (JavaScript 기반)
      const tourSections = document.querySelectorAll('[data-tour-section]');
      const newTourTransforms: { [key: string]: number } = {};
      
      tourSections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const sectionId = section.getAttribute('data-tour-section') || `tour-${index}`;
        
        // 각 섹션의 위치에 따른 중첩 효과 계산
        if (rect.top <= 0 && rect.bottom > 0) {
          // 섹션이 화면 위로 올라가는 정도 (0 ~ 1)
          const progress = Math.abs(rect.top) / windowHeight;
          
          // 다음 섹션이 올라올 때만 현재 섹션을 위로 밀어올림
          const nextSection = tourSections[index + 1];
          if (nextSection) {
            const nextRect = nextSection.getBoundingClientRect();
            if (nextRect.top <= windowHeight) {
              // 다음 섹션이 화면에 들어오기 시작하면 현재 섹션을 위로 밀어올림
              const pushProgress = Math.max(0, (windowHeight - nextRect.top) / windowHeight);
              newTourTransforms[sectionId] = -pushProgress * 50;
            } else {
              newTourTransforms[sectionId] = 0;
            }
          } else {
            newTourTransforms[sectionId] = 0;
          }
        } else {
          newTourTransforms[sectionId] = 0;
        }
      });
      
      setTourSectionTransforms(newTourTransforms);
      
      // 디버깅용 로그 (개발 환경에서만)
      if (process.env.NODE_ENV === 'development' && Object.keys(newTourTransforms).some(key => newTourTransforms[key] !== 0)) {
        console.log('Tour transforms:', newTourTransforms);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 마우스 위치 추적
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2; // -1 to 1
      const y = (e.clientY / window.innerHeight - 0.5) * 2; // -1 to 1
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);



  const portfolio = [
    {
      title: "두산헤리티지",
      client: "두산헤리티지",
      category: "반응형 홈페이지 제작",
      bgColor: "from-blue-900 to-gray-900",
      size: "large",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&h=1600&fit=crop&q=90",
      alt: "두산헤리티지 반응형 웹사이트 프로젝트 이미지"
    },
    {
      title: "TRVN",
      client: "TRVN",
      category: "반응형 홈페이지 제작",
      bgColor: "from-green-600 to-teal-700",
      size: "medium",
      image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1200&h=1600&fit=crop&q=90",
      alt: "TRVN 브랜딩 및 웹사이트 디자인 프로젝트"
    },
    {
      title: "두산에너빌리티",
      client: "두산에너빌리티",
      category: "반응형 홈페이지 제작",
      bgColor: "from-gray-600 to-blue-800",
      size: "large",
      image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea8?w=1200&h=1600&fit=crop&q=90",
      alt: "두산에너빌리티 기업 홈페이지 제작 프로젝트"
    },
    {
      title: "SK케미칼",
      client: "SK케미칼",
      category: "반응형 홈페이지 제작",
      bgColor: "from-purple-600 to-pink-700",
      size: "medium",
      image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=1200&h=1600&fit=crop&q=90",
      alt: "SK케미칼 기업 브랜딩 및 웹 개발"
    },
    {
      title: "한화솔루션",
      client: "한화솔루션",
      category: "반응형 홈페이지 제작",
      bgColor: "from-emerald-600 to-cyan-700",
      size: "small",
      image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&h=1600&fit=crop&q=90"
    },
    {
      title: "LG전자",
      client: "LG전자",
      category: "모바일 앱 개발",
      bgColor: "from-orange-600 to-red-700",
      size: "medium",
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&h=1600&fit=crop&q=90"
    }
  ];



  return (
    <>
      {/* 구조화된 데이터 (JSON-LD) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "VORO",
            "alternateName": "보로 디자인",
            "url": "https://voro.co.kr",
            "description": "혁신적인 웹사이트와 모바일 앱을 제작하는 전문 디자인 회사",
            "publisher": {
              "@type": "Organization",
              "name": "VORO",
              "logo": "https://voro.co.kr/logo.png"
            },
            "potentialAction": {
              "@type": "SearchAction",
              "target": "https://voro.co.kr/search?q={search_term_string}",
              "query-input": "required name=search_term_string"
            }
          })
        }}
      />
      
      <div className={`min-h-screen w-full max-w-full overflow-x-hidden transition-colors duration-500 ${isWhiteTheme ? 'bg-white' : 'bg-black'}`}>
        {/* Header */}
        <header className="fixed w-full top-0 z-50 backdrop-blur-sm bg-transparent">
          <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
            <div className="flex justify-between items-center h-16">
              {/* 왼쪽 - VORO 웹/앱 제작 */}
              <div className="flex items-center">
                <h1 className={`text-2xl font-bold transition-colors duration-500 ${isWhiteTheme ? 'text-black' : 'text-white'}`}>VORO</h1>
                <span className={`ml-2 text-sm transition-colors duration-500 ${isWhiteTheme ? 'text-gray-600' : 'text-gray-400'}`}>웹/앱 제작</span>
              </div>
              
              {/* 오른쪽 - 4개 메뉴 (Desktop Navigation) */}
              <nav className="hidden md:flex space-x-8">
                <a href="#home" className={`transition-colors font-medium ${isWhiteTheme ? 'text-black hover:text-gray-600' : 'text-white hover:text-gray-300'}`}>VORO소개</a>
                <a href="#services" className={`transition-colors font-medium ${isWhiteTheme ? 'text-gray-700 hover:text-black' : 'text-gray-300 hover:text-white'}`}>서비스안내</a>
                <a href="#portfolio" className={`transition-colors font-medium ${isWhiteTheme ? 'text-gray-700 hover:text-black' : 'text-gray-300 hover:text-white'}`}>포트폴리오</a>
                <a href="/contact" className={`transition-colors font-medium ${isWhiteTheme ? 'text-gray-700 hover:text-black' : 'text-gray-300 hover:text-white'}`}>견적문의</a>
              </nav>

              {/* Mobile menu button */}
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
            
            {/* Mobile Navigation */}
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

        {/* Hero Section */}
        <section id="home" className={`pt-16 h-screen relative overflow-hidden flex items-center justify-start transition-colors duration-500 w-full max-w-full ${isWhiteTheme ? 'bg-white' : 'bg-black'}`}>
          {/* 홈화면 텍스트 (배경으로도 사용) */}
          <div className={`fixed inset-0 flex items-center justify-start px-4 sm:px-6 lg:px-8 py-20 z-0 transition-opacity duration-500 w-full max-w-full overflow-hidden ${isWhiteTheme ? 'opacity-0' : 'opacity-100'}`}>
            <div className="max-w-full w-full">
              {/* 타자기 효과가 적용된 텍스트 영역 */}
              <div className="min-h-[300px] sm:min-h-[400px] flex flex-col justify-center">
                <div className="text-left w-full">
                  <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight whitespace-pre-wrap break-words">
                    {displayedText.split('**').map((part, index) => {
                      if (index % 2 === 1) {
                        return (
                          <span key={index} className="text-white font-bold">
                            {part}
                          </span>
                        );
                      }
                      return part;
                    })}
                    {isTyping && <span className="animate-pulse">|</span>}
                  </div>
                </div>
              </div>
              
              {/* 섹션 인디케이터 */}
              <div className="flex justify-start space-x-2 mt-6 sm:mt-8">
                {sections.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                      index === currentSection 
                        ? 'bg-white' 
                        : 'bg-gray-600'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>



        {/* Portfolio Section */}
        <section id="portfolio" className="pt-16 sm:pt-20 pb-24 sm:pb-32 bg-transparent relative z-20 w-full max-w-full overflow-x-hidden">
          <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-12">
            <div className="text-center mb-12 sm:mb-16">
            </div>
            
            {/* 포트폴리오 그리드 레이아웃 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-12">
              {portfolio.map((project, index) => (
                <div
                  key={index}
                  className="portfolio-card relative"
                >
                  {/* 프로젝트 카드 */}
                  <div className="relative bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-2xl">
                    {/* 프로젝트 화면 */}
                    <div className="relative bg-white rounded-lg sm:rounded-xl overflow-hidden aspect-[3/4]">
                      {/* 프로젝트 이미지 */}
                      <div className="absolute inset-0">
                        <img 
                          src={project.image} 
                          alt={project.alt}
                          className="w-full h-full object-cover transition-transform duration-300 ease-out"
                          data-portfolio-image
                          style={{
                            transform: `translateY(${portfolioTransforms[index] || 0}px)`
                          }}
                        />
                        {/* 그라데이션 오버레이 */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                      </div>
                      
                      {/* 프로젝트 정보 */}
                      <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 text-white">
                        <div className="text-xs font-semibold text-cyan-400 mb-1 tracking-wider uppercase">
                          {project.client}
                        </div>
                        <h3 className="text-sm font-bold mb-1">{project.title}</h3>
                        <p className="text-xs text-gray-300">{project.category}</p>
                      </div>
                    </div>
                    
                    {/* 카드 하단 인디케이터 */}
                    <div className="flex justify-center mt-2">
                      <div className="w-10 sm:w-12 h-1 bg-white/30 rounded-full"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 포트폴리오와 서비스 사이 공백 - 배경 텍스트가 보이는 구간 */}
        <section className="py-32 bg-transparent relative z-10">
          <div className="h-screen flex items-center justify-center">
            {/* 이 구간에서 배경 텍스트가 명확하게 보임 */}
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-20 sm:py-24 lg:py-32 bg-white relative z-20 w-full max-w-full overflow-x-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16 lg:gap-24 items-start">
              {/* 왼쪽 - ABOUT */}
              <div className="flex items-start">
                <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-black leading-tight">ABOUT</h2>
                <span className="w-3 h-3 sm:w-4 sm:h-4 bg-black rounded-full mt-4 sm:mt-6 lg:mt-8 ml-3 sm:ml-4"></span>
              </div>
              
              {/* 오른쪽 - 내용 */}
              <div className="space-y-8 sm:space-y-10 lg:space-y-12">
                <p className="text-lg sm:text-xl lg:text-2xl text-gray-400 leading-relaxed transition-colors duration-700" data-scroll-text>
                  VORO는 브랜드의 방향과 감성을 시각화하는<br className="hidden sm:block" />
                  디자인 기반의 브랜딩 스튜디오입니다.
                </p>
                
                <p className="text-lg sm:text-xl lg:text-2xl text-gray-400 leading-relaxed transition-colors duration-700" data-scroll-text>
                  단순한 디자인이 아닌,<br className="hidden sm:block" />
                  브랜딩의 시작부터 함께 고민합니다.
                </p>
                
                <p className="text-lg sm:text-xl lg:text-2xl text-gray-400 leading-relaxed transition-colors duration-700" data-scroll-text>
                  고객의 목소리를 듣고,<br className="hidden sm:block" />
                  그 이야기를 감각적으로 설계합니다.
                </p>
                
                <div className="pt-6 sm:pt-8 space-y-6 sm:space-y-8 lg:space-y-10">
                  <p className="text-base sm:text-lg lg:text-xl text-gray-400 leading-relaxed transition-colors duration-700" data-scroll-text>
                    VORO visualizes the direction and emotions of the brand. It is a design-based branding studio.
                  </p>
                  
                  <p className="text-base sm:text-lg lg:text-xl text-gray-400 leading-relaxed transition-colors duration-700" data-scroll-text>
                    It&apos;s not just a design, Let&apos;s think about it together from the beginning of branding.
                  </p>
                  
                  <p className="text-base sm:text-lg lg:text-xl text-gray-400 leading-relaxed transition-colors duration-700" data-scroll-text>
                    Listen to the customer&apos;s voice, Design the story sensibly.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* VORO DESIGN TOUR 섹션 */}
        <section className="bg-white py-16 sm:py-20 relative z-20 w-full max-w-full overflow-x-hidden">
          <div className="w-full">
            {/* 제목과 버튼 */}
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-12 sm:mb-16 px-4 sm:px-6 lg:px-8">
              <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold text-black tracking-wider mb-6 sm:mb-8 lg:mb-0">
                VORO DESIGN TOUR
              </h2>
              <button className="border-2 border-black px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base text-black font-medium hover:bg-black hover:text-white transition-all duration-300 self-start lg:self-end">
                OUR WORK
              </button>
            </div>
          </div>
        </section>

        {/* 첫 번째 이미지 - DN 오토모티브 */}
        <section 
          className="h-screen relative overflow-x-hidden" 
          data-tour-section="tour-1"
          style={{
            zIndex: 1040,
            transform: `translateY(${tourSectionTransforms['tour-1'] || 0}vh)`,
            transition: 'transform 0.1s ease-out'
          }}
        >
          <div className="relative overflow-hidden w-full h-full">
            <img 
              src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
              alt="VORO Design Tour 1"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/20"></div>
            
            {/* 정보란 1 */}
            <div className="absolute top-4 sm:top-8 left-4 sm:left-8 right-4 sm:right-8 bg-white/95 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 lg:p-8 z-50">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 sm:gap-6">
                <div className="flex-1">
                  <div className="text-xs sm:text-sm text-gray-500 mb-2">VORO Design Tour 1</div>
                  <div className="text-xs sm:text-sm text-gray-400 mb-2">2nd / Feb / 2023</div>
                  <div className="flex flex-wrap gap-2 mb-3 sm:mb-4">
                    <span className="bg-black text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm">Renewal</span>
                    <span className="bg-black text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm">Website</span>
                    <span className="bg-black text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm">Development</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-black mb-2">
                    DN 오토모티브
                  </h3>
                  <p className="text-gray-400 text-sm sm:text-base lg:text-lg">
                    [DN AUTOMOTIVE]
                  </p>
                </div>
                <div className="flex-shrink-0">
                  <button className="flex items-center gap-2 text-black font-medium hover:text-gray-600 transition-all duration-300">
                    <span className="text-sm sm:text-base lg:text-lg">VISIT SITE</span>
                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 두 번째 이미지 - 테크 스타트업 */}
        <section 
          className="h-screen relative overflow-x-hidden" 
          data-tour-section="tour-2"
          style={{
            zIndex: 1030,
            transform: `translateY(${tourSectionTransforms['tour-2'] || 0}vh)`,
            transition: 'transform 0.1s ease-out'
          }}
        >
          <div className="relative overflow-hidden w-full h-full">
            <img 
              src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2015&q=80"
              alt="VORO Design Tour 2"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/20"></div>
            
            {/* 정보란 2 */}
            <div className="absolute top-4 sm:top-8 left-4 sm:left-8 right-4 sm:right-8 bg-white/95 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 lg:p-8 z-50">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 sm:gap-6">
                <div className="flex-1">
                  <div className="text-xs sm:text-sm text-gray-500 mb-2">VORO Design Tour 2</div>
                  <div className="text-xs sm:text-sm text-gray-400 mb-2">15th / Mar / 2023</div>
                  <div className="flex flex-wrap gap-2 mb-3 sm:mb-4">
                    <span className="bg-black text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm">Branding</span>
                    <span className="bg-black text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm">UI/UX</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-black mb-2">
                    테크 스타트업
                  </h3>
                  <p className="text-gray-400 text-sm sm:text-base lg:text-lg">
                    [TECH STARTUP]
                  </p>
                </div>
                <div className="flex-shrink-0">
                  <button className="flex items-center gap-2 text-black font-medium hover:text-gray-600 transition-all duration-300">
                    <span className="text-sm sm:text-base lg:text-lg">VISIT SITE</span>
                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 세 번째 이미지 - 패션 브랜드 */}
        <section 
          className="h-screen relative overflow-x-hidden" 
          data-tour-section="tour-3"
          style={{
            zIndex: 1020,
            transform: `translateY(${tourSectionTransforms['tour-3'] || 0}vh)`,
            transition: 'transform 0.1s ease-out'
          }}
        >
          <div className="relative overflow-hidden w-full h-full">
            <img 
              src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
              alt="VORO Design Tour 3"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/20"></div>
            
            {/* 정보란 3 */}
            <div className="absolute top-4 sm:top-8 left-4 sm:left-8 right-4 sm:right-8 bg-white/95 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 lg:p-8 z-50">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 sm:gap-6">
                <div className="flex-1">
                  <div className="text-xs sm:text-sm text-gray-500 mb-2">VORO Design Tour 3</div>
                  <div className="text-xs sm:text-sm text-gray-400 mb-2">8th / Apr / 2023</div>
                  <div className="flex flex-wrap gap-2 mb-3 sm:mb-4">
                    <span className="bg-black text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm">E-commerce</span>
                    <span className="bg-black text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm">Mobile</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-black mb-2">
                    패션 브랜드
                  </h3>
                  <p className="text-gray-400 text-sm sm:text-base lg:text-lg">
                    [FASHION BRAND]
                  </p>
                </div>
                <div className="flex-shrink-0">
                  <button className="flex items-center gap-2 text-black font-medium hover:text-gray-600 transition-all duration-300">
                    <span className="text-sm sm:text-base lg:text-lg">VISIT SITE</span>
                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 네 번째 이미지 - 금융 서비스 */}
        <section 
          className="h-screen relative overflow-x-hidden" 
          data-tour-section="tour-4"
          style={{
            zIndex: 1010,
            transform: `translateY(${tourSectionTransforms['tour-4'] || 0}vh)`,
            transition: 'transform 0.1s ease-out'
          }}
        >
          <div className="relative overflow-hidden w-full h-full">
            <img 
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80"
              alt="VORO Design Tour 4"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/20"></div>
            
            {/* 정보란 4 */}
            <div className="absolute top-4 sm:top-8 left-4 sm:left-8 right-4 sm:right-8 bg-white/95 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 lg:p-8 z-50">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 sm:gap-6">
                <div className="flex-1">
                  <div className="text-xs sm:text-sm text-gray-500 mb-2">VORO Design Tour 4</div>
                  <div className="text-xs sm:text-sm text-gray-400 mb-2">22nd / May / 2023</div>
                  <div className="flex flex-wrap gap-2 mb-3 sm:mb-4">
                    <span className="bg-black text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm">Corporate</span>
                    <span className="bg-black text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm">Identity</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-black mb-2">
                    금융 서비스
                  </h3>
                  <p className="text-gray-400 text-sm sm:text-base lg:text-lg">
                    [FINANCIAL SERVICE]
                  </p>
                </div>
                <div className="flex-shrink-0">
                  <button className="flex items-center gap-2 text-black font-medium hover:text-gray-600 transition-all duration-300">
                    <span className="text-sm sm:text-base lg:text-lg">VISIT SITE</span>
                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Idea Section - 홈화면과 연결된 스타일 */}
        <section id="services" className="py-20 sm:py-24 lg:py-32 bg-black relative overflow-hidden z-20 min-h-screen flex items-center justify-start w-full max-w-full">
          {/* VORO 배경 텍스트 애니메이션 - 마우스 반응형 */}
          <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
            <div 
              className="text-[12rem] sm:text-[16rem] md:text-[20rem] lg:text-[25rem] xl:text-[30rem] 2xl:text-[35rem] font-black text-white/20 leading-none select-none animate-voro-slide-down transition-transform duration-700 ease-out"
              style={{
                transform: `translate(${mousePosition.x * 30}px, ${mousePosition.y * 30}px)`,
                animationDelay: '0s'
              }}
            >
              VORO
            </div>
          </div>
          
          {/* 추가 VORO 텍스트들 - 다른 타이밍과 마우스 반응 */}
          <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
            <div 
              className="text-[12rem] sm:text-[16rem] md:text-[20rem] lg:text-[25rem] xl:text-[30rem] 2xl:text-[35rem] font-black text-white/15 leading-none select-none animate-voro-slide-down transition-transform duration-500 ease-out"
              style={{
                transform: `translate(${mousePosition.x * -20}px, ${mousePosition.y * -20}px)`,
                animationDelay: '2s'
              }}
            >
              VORO
            </div>
          </div>
          
          <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
            <div 
              className="text-[12rem] sm:text-[16rem] md:text-[20rem] lg:text-[25rem] xl:text-[30rem] 2xl:text-[35rem] font-black text-white/10 leading-none select-none animate-voro-slide-down transition-transform duration-900 ease-out"
              style={{
                transform: `translate(${mousePosition.x * 15}px, ${mousePosition.y * 15}px)`,
                animationDelay: '4s'
              }}
            >
              VORO
            </div>
          </div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
            <div className="text-left max-w-full lg:max-w-4xl">
              {/* 홈화면과 같은 스타일의 메인 메시지 */}
              <div className="min-h-[400px] sm:min-h-[500px] flex flex-col justify-center">
                <div className="mb-8 sm:mb-12">
                  <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight mb-6 sm:mb-8 whitespace-pre-wrap break-words">
                    아이디어만 있어도{'\n'}괜찮습니다.
                  </h2>
                  <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight whitespace-pre-wrap break-words">
                    VORO는 브랜딩부터{'\n'}함께합니다.
                  </h2>
                </div>
                
                {/* 홈화면과 같은 스타일의 부제목 */}
                <div className="mb-8 sm:mb-12">
                  <p className="text-lg sm:text-xl lg:text-2xl text-gray-400 leading-relaxed max-w-full lg:max-w-3xl">
                    당신의 비전을 현실로 만드는 파트너,<br className="hidden sm:block" />
                    브랜드 아이덴티티부터 웹사이트, 앱 개발까지<br className="hidden sm:block" />
                    완성도 높은 디지털 솔루션을 제공합니다.
                  </p>
                </div>
                
                {/* CONTACT US 버튼 - 투명 배경 테두리 스타일 */}
                <div className="mt-8 sm:mt-12">
                  <a 
                    href="/contact"
                    className="inline-flex items-center gap-2 sm:gap-3 bg-transparent border-2 border-white text-white px-8 sm:px-10 lg:px-12 py-4 sm:py-5 lg:py-6 text-lg sm:text-xl font-bold hover:bg-white hover:text-black transition-all duration-300 rounded-lg"
                  >
                    <span>CONTACT US</span>
                  </a>
                </div>
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
