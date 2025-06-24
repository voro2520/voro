export default function Loading() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white mb-4"></div>
        <h2 className="text-white text-xl font-bold mb-2">VORO</h2>
        <p className="text-gray-400">Loading...</p>
      </div>
    </div>
  )
} 