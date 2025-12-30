export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-10">
          <div className="h-6 w-24 bg-slate-700/50 rounded-full animate-pulse mb-4"></div>
          <div className="h-10 w-64 bg-slate-700/50 rounded-lg animate-pulse mb-2"></div>
          <div className="h-5 w-48 bg-slate-700/30 rounded animate-pulse"></div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="bg-slate-800/30 border border-slate-700/50 rounded-xl"
              style={{ padding: "1.25rem" }}
            >
              <div className="w-10 h-10 bg-slate-700/50 rounded-lg animate-pulse mb-3"></div>
              <div className="h-7 w-12 bg-slate-700/50 rounded animate-pulse mb-2"></div>
              <div className="h-4 w-20 bg-slate-700/30 rounded animate-pulse"></div>
            </div>
          ))}
        </div>

        <div className="flex gap-3 mb-8">
          <div className="h-10 w-32 bg-slate-700/50 rounded-lg animate-pulse"></div>
          <div className="h-10 w-28 bg-slate-700/50 rounded-lg animate-pulse"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div
            className="lg:col-span-2 bg-slate-800/30 border border-slate-700/50 rounded-xl"
            style={{ padding: "1.5rem" }}
          >
            <div className="h-6 w-32 bg-slate-700/50 rounded animate-pulse mb-4"></div>
            <div className="space-y-3">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 bg-slate-700/30 rounded-lg"
                  style={{ padding: "0.75rem" }}
                >
                  <div className="w-10 h-10 bg-slate-700/50 rounded-full animate-pulse"></div>
                  <div className="flex-1">
                    <div className="h-4 w-32 bg-slate-700/50 rounded animate-pulse mb-2"></div>
                    <div className="h-3 w-48 bg-slate-700/30 rounded animate-pulse"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            {[...Array(2)].map((_, i) => (
              <div
                key={i}
                className="bg-slate-800/30 border border-slate-700/50 rounded-xl"
                style={{ padding: "1.5rem" }}
              >
                <div className="h-6 w-28 bg-slate-700/50 rounded animate-pulse mb-4"></div>
                <div className="space-y-3">
                  {[...Array(5)].map((_, j) => (
                    <div key={j} className="flex items-center justify-between">
                      <div className="h-4 w-24 bg-slate-700/30 rounded animate-pulse"></div>
                      <div className="h-5 w-8 bg-slate-700/50 rounded animate-pulse"></div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
