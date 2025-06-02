export default function Loading() {
  return (
    <div className="container mx-auto p-4">
      <div className="animate-pulse space-y-6">
        <div className="h-8 w-48 bg-slate-700 rounded"></div>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="h-10 w-full md:w-1/3 bg-slate-700 rounded"></div>
          <div className="flex flex-wrap gap-2">
            <div className="h-10 w-32 bg-slate-700 rounded"></div>
            <div className="h-10 w-32 bg-slate-700 rounded"></div>
            <div className="h-10 w-32 bg-slate-700 rounded"></div>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="h-64 bg-slate-700 rounded"></div>
          ))}
        </div>
      </div>
    </div>
  )
}
