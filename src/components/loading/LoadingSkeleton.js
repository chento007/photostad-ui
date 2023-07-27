
export default function LoadingSkeleton() {
  return (
    <div className="w-9/12 mx-auto h-screen">
    <div className="grid grid-cols-4 gap-2 mb-5">
      <div className="w-full h-2 rounded-full skeleton"></div>
      <div className="w-full h-2 rounded-full skeleton"></div>
      <div className="w-full h-2 rounded-full skeleton"></div>
      <div className="w-full h-2 rounded-full skeleton"></div>
      <div className="w-full h-2 rounded-full skeleton"></div>
      <div className="w-full h-2 rounded-full skeleton"></div>
      <div className="w-full h-2 rounded-full skeleton"></div>
      <div className="w-full h-2 rounded-full skeleton"></div>
      <div className="w-full h-2 rounded-full skeleton"></div>
      <div className="w-full h-2 rounded-full skeleton"></div>
      <div className="w-full h-2 rounded-full skeleton"></div>
      <div className="w-full h-2 rounded-full skeleton"></div>
      <div className="w-full h-2 rounded-full skeleton"></div>
      <div className="w-full h-2 rounded-full skeleton"></div>
      <div className="w-full h-2 rounded-full skeleton"></div>
      <div className="w-full h-2 rounded-full skeleton"></div>
    </div>

    <div className="w-full h-96 rounded-main skeleton"></div>

    <div className="grid grid-cols-2 gap-2 mt-5">
      <div className="w-full h-2 rounded-full skeleton"></div>
      <div className="w-full h-2 rounded-full skeleton"></div>
      <div className="w-full h-2 rounded-full skeleton"></div>
      <div className="w-full h-2 rounded-full skeleton"></div>
    </div>
  </div>
  )
}