"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { deleteAccount } from "@/src/services/auth/auth.service";
import { useAuth } from "@/src/hooks/useAuth";

interface DeleteAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DeleteAccountModal: React.FC<DeleteAccountModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { logout } = useAuth();
  const [isDeleting, setIsDeleting] = useState(false);
  const [confirmInput, setConfirmInput] = useState("");

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteAccount();
      toast.success("Your account has been permanently deleted.");
      logout();
    } catch (err: unknown) {
      console.error("Account deletion failed:", err);
      const errorObj = err as { response?: { data?: { message?: string } }; message?: string };
      toast.error(
        errorObj?.response?.data?.message ||
          errorObj?.message ||
          "Failed to delete account. Please try again."
      );
      setIsDeleting(false);
    }

  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="relative bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-red-100 z-10 space-y-6"
        >
          {/* Header Icon */}
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center shrink-0 border border-red-200">
              <span className="material-symbols-outlined text-2xl">warning</span>
            </div>
            <div>
              <h3 className="text-xl font-bold text-on-surface font-display">Delete Account?</h3>
              <p className="text-xs text-red-600 font-semibold uppercase tracking-wider">
                Permanent Action
              </p>
            </div>
          </div>

          {/* Warning Content */}
          <div className="bg-red-50/60 p-4 rounded-2xl border border-red-200 text-xs text-red-900 leading-relaxed space-y-2">
            <p>
              Are you sure you want to permanently delete your Mentorly account?
            </p>
            <p>
              This action <strong>cannot be undone</strong>. Your student profile, tuition posts, applications, and related data will be permanently removed.
            </p>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-outline uppercase tracking-wider block">
              Type <span className="font-bold text-red-600 select-all">DELETE</span> to confirm:
            </label>
            <input
              type="text"
              value={confirmInput}
              onChange={(e) => setConfirmInput(e.target.value)}
              placeholder="DELETE"
              className="w-full px-3.5 py-2.5 rounded-xl border border-outline-variant/40 text-sm focus:outline-none focus:border-red-500 font-mono text-center tracking-widest uppercase"
            />
          </div>

          {/* Modal Actions */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              disabled={isDeleting}
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl bg-surface-container text-on-surface font-semibold text-xs hover:bg-surface-container-high transition-all cursor-pointer"
            >
              Cancel
            </button>
            <button
              disabled={isDeleting || confirmInput !== "DELETE"}
              onClick={handleDelete}
              className={`px-5 py-2.5 rounded-xl text-white font-semibold text-xs flex items-center gap-2 shadow-md transition-all ${
                confirmInput === "DELETE" && !isDeleting
                  ? "bg-red-600 hover:bg-red-700 shadow-red-600/20 cursor-pointer"
                  : "bg-red-300 opacity-60 cursor-not-allowed"
              }`}
            >
              {isDeleting ? (
                <>
                  <span className="material-symbols-outlined text-sm animate-spin">progress_activity</span>
                  <span>Deleting...</span>
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-sm">delete_forever</span>
                  <span>Delete Permanently</span>
                </>
              )}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
