export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="h-8 w-32 bg-slate-700/50 rounded animate-pulse mb-4"></div>
          <div className="h-10 w-64 bg-slate-700/50 rounded-lg animate-pulse"></div>
        </div>
        <div className="bg-slate-800/30 border border-slate-700/50 rounded-2xl p-6 space-y-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="space-y-2">
              <div className="h-4 w-24 bg-slate-700/30 rounded animate-pulse"></div>
              <div className="h-6 w-48 bg-slate-700/50 rounded animate-pulse"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
