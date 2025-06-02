export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800 p-4">
      <div className="animate-pulse w-full max-w-md">
        <div className="h-8 w-48 bg-slate-700 rounded mx-auto mb-4"></div>
        <div className="h-4 w-64 bg-slate-700 rounded mx-auto mb-8"></div>
        <div className="space-y-4">
          <div className="h-12 bg-slate-700 rounded"></div>
          <div className="h-12 bg-slate-700 rounded"></div>
          <div className="h-12 bg-slate-700 rounded"></div>
          <div className="h-12 bg-slate-700 rounded"></div>
          <div className="h-12 bg-slate-700 rounded"></div>
        </div>
      </div>
    </div>
  )
}
