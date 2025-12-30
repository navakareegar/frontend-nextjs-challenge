import Link from "next/link";
import { UserDeleteOutlined, ArrowLeftOutlined } from "@ant-design/icons";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col items-center justify-center py-20">
          <div className="w-20 h-20 bg-slate-700/50 rounded-full flex items-center justify-center mb-6">
            <UserDeleteOutlined className="text-4xl text-slate-400" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">404 Not Found</h2>

          <Link
            href="/"
            className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white rounded-lg font-medium shadow-lg hover:shadow-emerald-500/25 hover:from-emerald-400 hover:to-cyan-400 transition-all duration-300 flex items-center gap-2"
          >
            <ArrowLeftOutlined />
            Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
