'use client';

import Link from 'next/link';
import {
  TeamOutlined,
  EnvironmentOutlined,
  BankOutlined,
  MailOutlined,
  UserAddOutlined,
  RightOutlined,
} from '@ant-design/icons';
import { IUser } from '@/types/user';

interface IDashboardProps {
  users: IUser[];
}

export default function Dashboard(props: IDashboardProps) {
  const { users } = props;

  if (!users || users.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <TeamOutlined className="text-6xl text-slate-600 mb-4" />
          <p className="text-slate-400">No users found</p>
        </div>
      </div>
    );
  }

  const totalCities = new Set(users.map((u) => u.address.city)).size;
  const totalCompanies = new Set(users.map((u) => u.company.name)).size;

  const recentUsers = users.slice(0, 5);

  const cityCounts = users.reduce((acc: Record<string, number>, user) => {
    acc[user.address.city] = (acc[user.address.city] || 0) + 1;
    return acc;
  }, {});

  const companyCounts = users.reduce((acc: Record<string, number>, user) => {
    acc[user.company.name] = (acc[user.company.name] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-400 text-xs font-medium mb-4">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            Dashboard
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
            Welcome to{' '}
            <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              Okian
            </span>
          </h1>
          <p className="text-slate-400">User management dashboard overview</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-5">
            <div className="w-10 h-10 bg-emerald-500/10 rounded-lg flex items-center justify-center mb-3">
              <TeamOutlined className="text-xl text-emerald-400" />
            </div>
            <div className="text-2xl font-bold text-white">{users.length}</div>
            <div className="text-sm text-slate-500">Total Users</div>
          </div>

          <div className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-5">
            <div className="w-10 h-10 bg-cyan-500/10 rounded-lg flex items-center justify-center mb-3">
              <EnvironmentOutlined className="text-xl text-cyan-400" />
            </div>
            <div className="text-2xl font-bold text-white">{totalCities}</div>
            <div className="text-sm text-slate-500">Cities</div>
          </div>

          <div className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-5">
            <div className="w-10 h-10 bg-amber-500/10 rounded-lg flex items-center justify-center mb-3">
              <BankOutlined className="text-xl text-amber-400" />
            </div>
            <div className="text-2xl font-bold text-white">
              {totalCompanies}
            </div>
            <div className="text-sm text-slate-500">Companies</div>
          </div>

          <div className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-5">
            <div className="w-10 h-10 bg-purple-500/10 rounded-lg flex items-center justify-center mb-3">
              <MailOutlined className="text-xl text-purple-400" />
            </div>
            <div className="text-2xl font-bold text-white">{users.length}</div>
            <div className="text-sm text-slate-500">Emails</div>
          </div>
        </div>

        <div className="flex gap-3 mb-8">
          <Link
            href="/users"
            className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-lg hover:bg-emerald-500/20 transition-all"
          >
            <TeamOutlined />
            View All Users
          </Link>
          <Link
            href="/users/add"
            className="inline-flex items-center gap-2 px-4 py-2 bg-slate-700/50 text-white border border-slate-600 rounded-lg hover:bg-slate-700 transition-all"
          >
            <UserAddOutlined />
            Add User
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-slate-800/30 border border-slate-700/50 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-white">Recent Users</h2>
              <Link
                href="/users"
                className="text-sm text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
              >
                View all <RightOutlined className="text-xs" />
              </Link>
            </div>
            <div className="space-y-3">
              {recentUsers.map((user) => (
                <Link
                  key={user.id}
                  href={`/users/${user.id}`}
                  className="flex items-center gap-4 p-3 bg-slate-700/30 rounded-lg hover:bg-slate-700/50 transition-all"
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-cyan-400 rounded-full flex items-center justify-center text-white font-semibold">
                    {user.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-white font-medium truncate">
                      {user.name}
                    </div>
                    <div className="text-sm text-slate-400 truncate">
                      {user.email}
                    </div>
                  </div>
                  <div className="text-xs text-slate-500 hidden sm:block">
                    {user.company.name}
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-6">
              <h2 className="text-lg font-semibold text-white mb-4">
                Users by City
              </h2>
              <div className="space-y-3">
                {Object.entries(cityCounts)
                  .slice(0, 5)
                  .map(([city, count]) => (
                    <div
                      key={city}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2">
                        <EnvironmentOutlined className="text-cyan-400" />
                        <span className="text-slate-300 text-sm">{city}</span>
                      </div>
                      <span className="text-xs bg-slate-700 text-slate-300 px-2 py-1 rounded">
                        {count}
                      </span>
                    </div>
                  ))}
              </div>
            </div>

            <div className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-6">
              <h2 className="text-lg font-semibold text-white mb-4">
                Users by Company
              </h2>
              <div className="space-y-3">
                {Object.entries(companyCounts)
                  .slice(0, 5)
                  .map(([company, count]) => (
                    <div
                      key={company}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <BankOutlined className="text-amber-400 flex-shrink-0" />
                        <span className="text-slate-300 text-sm truncate">
                          {company}
                        </span>
                      </div>
                      <span className="text-xs bg-slate-700 text-slate-300 px-2 py-1 rounded flex-shrink-0">
                        {count}
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>

        <div className="text-center pt-8 mt-8 border-t border-slate-800">
          <p className="text-slate-500 text-sm">
            Built with Next.js, React Query & TanStack Table
          </p>
        </div>
      </div>
    </div>
  );
}
