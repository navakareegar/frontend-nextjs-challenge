"use client";

import Link from "next/link";
import { HomeOutlined, WarningOutlined } from "@ant-design/icons";

interface IErrorProps {
  error: Error & { digest?: string };
}

export default function Error(props: IErrorProps) {
  const { error } = props;
  const message =
    error instanceof Error ? error.message : "An unexpected error occurred";

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
      <div className="text-center max-w-md mx-auto px-4">
        <div className="w-16 h-16 mx-auto mb-6 bg-red-500/10 rounded-full flex items-center justify-center">
          <WarningOutlined className="text-3xl text-red-400" />
        </div>
        <h1 className="text-2xl font-bold text-white mb-2">{message}</h1>
        <p className="text-slate-400 mb-6">
          {error.message || "An unexpected error occurred"}
        </p>
        <div className="flex items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-4 py-2 bg-slate-700/50 text-white border border-slate-600 rounded-lg hover:bg-slate-700 transition-all"
          >
            <HomeOutlined />
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}
