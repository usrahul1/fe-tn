export default function Loading() {
  return (
    <div className="container mx-auto p-4">
      <div className="animate-pulse space-y-6">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-1/2 h-80 bg-slate-700 rounded"></div>
          <div className="w-full md:w-1/2 space-y-4">
            <div className="h-64 bg-slate-700 rounded"></div>
            <div className="h-32 bg-slate-700 rounded"></div>
          </div>
        </div>
        <div className="h-12 w-full max-w-[400px] bg-slate-700 rounded"></div>
        <div className="h-96 bg-slate-700 rounded"></div>
      </div>
    </div>
  )
}
