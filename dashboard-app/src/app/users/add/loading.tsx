import { fakeArray } from '@/utils/common';

export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6 h-6 w-32 bg-slate-700/50 rounded animate-pulse"></div>

        <div className="mb-8">
          <div className="h-10 w-48 bg-slate-700/50 rounded-lg animate-pulse mb-2"></div>
          <div className="h-5 w-64 bg-slate-700/30 rounded animate-pulse"></div>
        </div>

        <div className="bg-slate-800/30 border border-slate-700/50 rounded-2xl p-6 shadow-xl space-y-6">
          <div className="space-y-4">
            <div className="h-6 w-40 bg-slate-700/50 rounded animate-pulse"></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="space-y-2">
                  <div className="h-4 w-20 bg-slate-700/30 rounded animate-pulse"></div>
                  <div className="h-10 bg-slate-700/50 rounded-lg animate-pulse"></div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div className="h-6 w-32 bg-slate-700/50 rounded animate-pulse"></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="space-y-2">
                  <div className="h-4 w-20 bg-slate-700/30 rounded animate-pulse"></div>
                  <div className="h-10 bg-slate-700/50 rounded-lg animate-pulse"></div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div className="h-6 w-28 bg-slate-700/50 rounded animate-pulse"></div>
            <div className="space-y-4">
              {fakeArray(3).map((_, i) => (
                <div key={i} className="space-y-2">
                  <div className="h-4 w-24 bg-slate-700/30 rounded animate-pulse"></div>
                  <div className="h-10 bg-slate-700/50 rounded-lg animate-pulse"></div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-700">
            <div className="h-10 w-20 bg-slate-700/30 rounded-lg animate-pulse"></div>
            <div className="h-10 w-32 bg-slate-700/50 rounded-lg animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
