import { fakeArray } from '@/utils/common';

export default function Loading() {
  const columns = 5;
  const rows = 10;
  const columnHeaders = ['Name', 'Email', 'Company', 'City', 'Actions'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="h-8 sm:h-10 w-24 sm:w-32 bg-slate-700/50 rounded-lg animate-pulse mb-2"></div>
            <div className="h-4 sm:h-5 w-48 sm:w-64 bg-slate-700/30 rounded animate-pulse"></div>
          </div>
          <div className="h-10 w-28 bg-slate-700/50 rounded-lg animate-pulse"></div>
        </div>

        <div className="mb-6">
          <div className="h-11 sm:h-12 max-w-md bg-slate-800/50 border border-slate-700 rounded-xl animate-pulse"></div>
        </div>

        <div className="mb-4 flex items-center justify-between">
          <div className="h-4 w-32 sm:w-40 bg-slate-700/30 rounded animate-pulse"></div>
          <div className="flex gap-2">
            <div className="h-8 w-8 bg-slate-700/50 rounded-lg animate-pulse"></div>
            <div className="h-8 w-8 bg-slate-700/50 rounded-lg animate-pulse"></div>
          </div>
        </div>

        <div className="bg-slate-800/30 border border-slate-700/50 rounded-2xl overflow-hidden shadow-xl min-h-[400px]">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px]">
              <thead>
                <tr className="border-b border-slate-700/50">
                  {columnHeaders.slice(0, columns).map((header, i) => (
                    <th
                      key={i}
                      className="px-3 sm:px-6 py-3 sm:py-4 text-left text-[10px] sm:text-xs font-semibold text-slate-400 uppercase tracking-wider"
                    >
                      <div className="space-y-1.5 sm:space-y-2">
                        <div>{header}</div>
                        {header !== 'Actions' && (
                          <div className="h-7 sm:h-8 bg-slate-700/50 rounded-md animate-pulse"></div>
                        )}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/30">
                {fakeArray(rows).map((_, rowIndex) => (
                  <tr key={rowIndex}>
                    {Array.from({ length: columns }).map((_, colIndex) => {
                      const widths = [75, 85, 65, 70];
                      const width =
                        widths[(rowIndex + colIndex) % widths.length];

                      return (
                        <td
                          key={colIndex}
                          className="px-3 sm:px-6 py-3 sm:py-4"
                        >
                          {colIndex === columns - 1 ? (
                            <div className="flex gap-2">
                              <div className="h-6 w-6 bg-slate-700/40 rounded animate-pulse"></div>
                              <div className="h-6 w-6 bg-slate-700/40 rounded animate-pulse"></div>
                            </div>
                          ) : (
                            <div
                              className="h-4 sm:h-5 bg-slate-700/40 rounded animate-pulse"
                              style={{
                                width: `${width}%`,
                                animationDelay: `${
                                  rowIndex * 50 + colIndex * 25
                                }ms`,
                              }}
                            ></div>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
