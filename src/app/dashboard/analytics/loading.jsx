export default function Loading() {
  return (
    <div className="container mx-auto p-4">
      <div className="animate-pulse space-y-6">
        <div className="h-8 w-48 bg-slate-700 rounded"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-32 bg-slate-700 rounded"></div>
          ))}
        </div>
        <div className="h-12 w-full max-w-[600px] bg-slate-700 rounded"></div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="h-80 bg-slate-700 rounded"></div>
          <div className="h-80 bg-slate-700 rounded"></div>
        </div>
      </div>
    </div>
  )
}
