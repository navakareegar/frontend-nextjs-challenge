'use client';

import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import {
  ArrowLeftOutlined,
  EditOutlined,
  DeleteOutlined,
  UserOutlined,
  EnvironmentOutlined,
  BankOutlined,
} from '@ant-design/icons';
import { IUser } from '@/types/user';
import ConfirmModal from '@/components/modal/ConfirmModal';
import UserFormPage from './AddEditForm';
import { deleteUser } from '@/api/user';

interface IDetailsProps {
  user?: IUser;
}

export default function Details(props: IDetailsProps) {
  const { user = {} as IUser } = props;

  const router = useRouter();
  const queryClient = useQueryClient();

  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const deleteMutation = useMutation({
    mutationFn: () => deleteUser(user.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      router.push('/users');
    },
  });

  const handleDelete = () => {
    deleteMutation.mutate();
  };

  const handleEditSuccess = () => {
    setIsEditing(false);
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={() => router.back()}
          className="mb-6 flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeftOutlined className="text-lg" />
          Back to Users
        </button>

        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
              {user.name}
            </h1>
            <p className="text-slate-400">@{user.username}</p>
          </div>

          {!isEditing && (
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-2 px-4 py-2 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-lg hover:bg-emerald-500/30 transition-all"
              >
                <EditOutlined />
                Edit
              </button>
              <button
                onClick={() => setShowDeleteModal(true)}
                className="flex items-center gap-2 px-4 py-2 bg-red-500/20 text-red-400 border border-red-500/30 rounded-lg hover:bg-red-500/30 transition-all"
              >
                <DeleteOutlined />
                Delete
              </button>
            </div>
          )}
        </div>

        {isEditing ? (
          <div className="bg-slate-800/30 border border-slate-700/50 rounded-2xl p-6 shadow-xl">
            <h2 className="text-xl font-semibold text-white mb-6">Edit User</h2>
            <UserFormPage
              user={user}
              inline
              onSuccess={handleEditSuccess}
              onCancel={() => setIsEditing(false)}
            />
          </div>
        ) : (
          <div className="bg-slate-800/30 border border-slate-700/50 rounded-2xl overflow-hidden shadow-xl">
            <div className="p-6 border-b border-slate-700/50">
              <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <UserOutlined className="text-emerald-400" />
                Contact Information
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">
                    Email
                  </p>
                  <p className="text-slate-300">{user.email}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">
                    Phone
                  </p>
                  <p className="text-slate-300">{user.phone}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">
                    Website
                  </p>
                  <a
                    href={`https://${user.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-400 hover:text-emerald-300 transition-colors"
                  >
                    {user.website}
                  </a>
                </div>
              </div>
            </div>

            <div className="p-6 border-b border-slate-700/50">
              <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <EnvironmentOutlined className="text-cyan-400" />
                Address
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">
                    Street
                  </p>
                  <p className="text-slate-300">
                    {user.address.street}, {user.address.suite}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">
                    City
                  </p>
                  <p className="text-slate-300">{user.address.city}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">
                    Zipcode
                  </p>
                  <p className="text-slate-300">{user.address.zipcode}</p>
                </div>
              </div>
            </div>

            <div className="p-6">
              <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <BankOutlined className="text-amber-400" />
                Company
              </h2>
              <div className="space-y-4">
                <div>
                  <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">
                    Company Name
                  </p>
                  <p className="text-slate-300 font-medium">
                    {user.company.name}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">
                    Catch Phrase
                  </p>
                  <p className="text-slate-400 italic">
                    &quot;{user.company.catchPhrase}&quot;
                  </p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">
                    Business
                  </p>
                  <p className="text-slate-300">{user.company.bs}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <ConfirmModal
        isOpen={showDeleteModal}
        title="Delete User"
        message={`Are you sure you want to delete "${user.name}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={handleDelete}
        onCancel={() => setShowDeleteModal(false)}
        isLoading={deleteMutation.isPending}
        variant="danger"
      />
    </div>
  );
}
