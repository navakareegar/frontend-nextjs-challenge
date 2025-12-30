"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { ArrowLeftOutlined } from "@ant-design/icons";
import useForm from "@/hooks/useForm";
import { IUser } from "@/types/user";
import { createUser, updateUser } from "@/api/user";
import { formConfig, FormData, formSchema } from "@/cnfs/UserForm";

interface IAddEditFormProps {
  user?: IUser;
  onSuccess?: () => void;
  onCancel?: () => void;
  inline?: boolean;
}

export default function AddEditForm(props: IAddEditFormProps) {
  const { user, onSuccess, onCancel, inline = false } = props;

  const router = useRouter();
  const queryClient = useQueryClient();

  const isEditMode = !!user;
  const userId = user ? String(user.id) : "";

  const createMutation = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      onSuccess?.();
      if (!inline) {
        router.push("/users");
      }
    },
  });

  const updateMutation = useMutation({
    mutationFn: (data: FormData) => updateUser(userId, data),
    onSuccess: (updatedUser) => {
      queryClient.setQueryData(["user", userId], updatedUser);
      queryClient.invalidateQueries({ queryKey: ["users"] });
      onSuccess?.();
      if (!inline) {
        router.refresh();
      }
    },
  });

  const mutation = isEditMode ? updateMutation : createMutation;

  const handleSubmit = (data: FormData) => {
    if (isEditMode) {
      updateMutation.mutate(data);
    } else {
      createMutation.mutate(data);
    }
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    } else {
      router.back();
    }
  };

  const defaultValues = user
    ? {
        name: user.name,
        username: user.username,
        email: user.email,
        phone: user.phone,
        website: user.website,
        address: {
          street: user.address?.street || "",
          suite: user.address?.suite || "",
          city: user.address?.city || "",
          zipcode: user.address?.zipcode || "",
        },
        company: {
          name: user.company?.name || "",
          catchPhrase: user.company?.catchPhrase || "",
          bs: user.company?.bs || "",
        },
      }
    : undefined;

  const { Form } = useForm<FormData>({
    config: formConfig,
    schema: formSchema,
    defaultValues,
    onSubmit: handleSubmit,
    onCancel: handleCancel,
    isLoading: mutation.isPending,
    isEditMode,
  });

  const ErrorMessage = mutation.isError ? (
    <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">
      {mutation.error instanceof Error
        ? mutation.error.message
        : isEditMode
        ? "Failed to update user"
        : "Failed to create user"}
    </div>
  ) : null;

  if (inline) {
    return (
      <>
        {ErrorMessage}
        {Form}
      </>
    );
  }

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

        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
            {isEditMode ? "Edit User" : "Add New User"}
          </h1>
          <p className="text-slate-400">
            {isEditMode ? `Editing ${user?.name}` : "Create a new user account"}
          </p>
        </div>

        <div className="bg-slate-800/30 border border-slate-700/50 rounded-2xl p-6 shadow-xl">
          {ErrorMessage}
          {Form}
        </div>
      </div>
    </div>
  );
}
