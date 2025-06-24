import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '404 - 페이지를 찾을 수 없습니다 | VORO',
  description: '요청하신 페이지를 찾을 수 없습니다. VORO 홈페이지로 돌아가서 다른 페이지를 확인해보세요.',
  robots: {
    index: false,
    follow: false,
  },
}

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="text-center max-w-2xl mx-auto px-4">
        <h1 className="text-8xl md:text-9xl font-black mb-8 bg-gradient-to-r from-white via-gray-300 to-white bg-clip-text text-transparent">
          404
        </h1>
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          페이지를 찾을 수 없습니다
        </h2>
        <p className="text-xl text-gray-400 mb-8 leading-relaxed">
          죄송합니다. 요청하신 페이지가 존재하지 않거나<br />
          이동되었을 수 있습니다.
        </p>
        <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
          <Link 
            href="/"
            className="inline-block bg-white text-black px-8 py-4 font-bold hover:bg-gray-200 transition-colors rounded-lg"
          >
            홈으로 돌아가기
          </Link>
          <Link 
            href="/contact"
            className="inline-block border-2 border-white text-white px-8 py-4 font-bold hover:bg-white hover:text-black transition-colors rounded-lg"
          >
            문의하기
          </Link>
        </div>
      </div>
    </div>
  )
} 