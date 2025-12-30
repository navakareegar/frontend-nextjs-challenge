"use client";

import {
  ExclamationCircleOutlined,
  WarningOutlined,
  InfoCircleOutlined,
  LoadingOutlined,
} from "@ant-design/icons";

interface IConfirmModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
  isLoading?: boolean;
  variant?: "danger" | "warning" | "info";
}

export default function ConfirmModal(props: IConfirmModalProps) {
  const {
    isOpen,
    title,
    message,
    confirmText = "Confirm",
    cancelText = "Cancel",
    onConfirm,
    onCancel,
    isLoading = false,
    variant = "danger",
  } = props;

  if (!isOpen) return null;

  const variantStyles = {
    danger: {
      icon: <ExclamationCircleOutlined className="text-2xl text-red-400" />,
      bgColor: "bg-red-500/10",
      buttonBg: "bg-red-500 hover:bg-red-400",
    },
    warning: {
      icon: <WarningOutlined className="text-2xl text-amber-400" />,
      bgColor: "bg-amber-500/10",
      buttonBg: "bg-amber-500 hover:bg-amber-400",
    },
    info: {
      icon: <InfoCircleOutlined className="text-2xl text-cyan-400" />,
      bgColor: "bg-cyan-500/10",
      buttonBg: "bg-cyan-500 hover:bg-cyan-400",
    },
  };

  const styles = variantStyles[variant];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onCancel}
      />

      <div className="relative bg-slate-800 border border-slate-700 rounded-2xl shadow-2xl max-w-md w-full mx-4 overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="p-6">
          <div
            className={`w-12 h-12 ${styles.bgColor} rounded-full flex items-center justify-center mx-auto mb-4`}
          >
            {styles.icon}
          </div>

          <h3 className="text-xl font-semibold text-white text-center mb-2">
            {title}
          </h3>
          <p className="text-slate-400 text-center">{message}</p>
        </div>

        <div className="flex gap-3 p-4 bg-slate-800/50 border-t border-slate-700">
          <button
            type="button"
            onClick={onCancel}
            disabled={isLoading}
            className="flex-1 px-4 py-2.5 text-slate-300 bg-slate-700 hover:bg-slate-600 rounded-lg font-medium transition-colors disabled:opacity-50"
          >
            {cancelText}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isLoading}
            className={`flex-1 px-4 py-2.5 text-white ${styles.buttonBg} rounded-lg font-medium transition-colors disabled:opacity-50 flex items-center justify-center gap-2`}
          >
            {isLoading ? (
              <>
                <LoadingOutlined spin />
                Processing...
              </>
            ) : (
              confirmText
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
