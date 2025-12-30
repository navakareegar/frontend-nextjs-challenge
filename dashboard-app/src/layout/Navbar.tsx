import Link from "next/link";
import { AppstoreOutlined, TeamOutlined } from "@ant-design/icons";

export default function Navbar() {
  return (
    <nav className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 shadow-lg border-b border-slate-700/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-lg flex items-center justify-center shadow-md group-hover:shadow-emerald-500/30 transition-shadow duration-300">
              <AppstoreOutlined className="text-white text-lg" />
            </div>
            <span className="text-xl font-bold text-white tracking-tight">
              Dashboard
            </span>
          </Link>

          <div className="flex items-center gap-2">
            <Link
              href="/"
              className="px-4 py-2 text-slate-300 hover:text-white hover:bg-slate-700/50 rounded-lg transition-all duration-200 text-sm font-medium"
            >
              Home
            </Link>

            <Link
              href="/users"
              className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white rounded-lg font-medium text-sm shadow-md hover:shadow-emerald-500/25 hover:from-emerald-400 hover:to-cyan-400 transition-all duration-300 flex items-center gap-2"
            >
              <TeamOutlined />
              Users
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
