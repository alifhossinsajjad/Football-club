"use client";

import React, { useState } from "react";
import { X, Loader2, Plus, Save, Minus } from "lucide-react";
import {
  useCreateBoostPackageMutation,
  useUpdateBoostPackageMutation,
  type BoostPackage,
} from "@/redux/features/admin/adminBoostPackageApi";
import toast from "react-hot-toast";

interface Props {
  boostPackage?: BoostPackage | null;
  onClose: () => void;
}

const DURATION_OPTIONS = [
  "1_MONTH",
  "2_MONTHS",
  "3_MONTHS",
  "4_MONTHS",
  "5_MONTHS",
  "6_MONTHS",
  "7_MONTHS",
  "8_MONTHS",
  "9_MONTHS",
  "10_MONTHS",
  "11_MONTHS",
  "12_MONTHS",
];

const BoostPackageFormModal: React.FC<Props> = ({ boostPackage, onClose }) => {
  const isEditing = !!boostPackage;

  const [form, setForm] = useState({
    duration: boostPackage?.duration || "1_MONTH",
    price: boostPackage?.price || "",
    discount: boostPackage?.discount ?? 0,
    is_active: boostPackage ? boostPackage.is_active : true,
  });

  const [features, setFeatures] = useState<string[]>(
    boostPackage?.features || [""]
  );

  const [createBoostPackage, { isLoading: isCreating }] = useCreateBoostPackageMutation();
  const [updateBoostPackage, { isLoading: isUpdating }] = useUpdateBoostPackageMutation();
  const isLoading = isCreating || isUpdating;

  const addFeature = () => setFeatures((f) => [...f, ""]);
  const removeFeature = (idx: number) =>
    setFeatures((f) => f.filter((_, i) => i !== idx));
  const updateFeature = (idx: number, value: string) =>
    setFeatures((f) => f.map((v, i) => (i === idx ? value : v)));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const cleanFeatures = features.map((f) => f.trim()).filter(Boolean);
    if (cleanFeatures.length === 0) {
      toast.error("Please add at least one feature");
      return;
    }

    try {
      if (isEditing) {
        await updateBoostPackage({
          id: boostPackage.id,
          data: {
            price: parseFloat(String(form.price)),
            discount: Number(form.discount),
            features: cleanFeatures,
            is_active: form.is_active,
          },
        }).unwrap();
        toast.success("Boost package updated successfully");
      } else {
        await createBoostPackage({
          duration: form.duration,
          price: parseFloat(String(form.price)),
          discount: Number(form.discount),
          features: cleanFeatures,
          is_active: form.is_active,
        }).unwrap();
        toast.success("Boost package created successfully");
      }
      onClose();
    } catch (err) {
      const error = err as { data?: { message?: string } };
      toast.error(
        error.data?.message ||
          `Failed to ${isEditing ? "update" : "create"} boost package`
      );
    }
  };

  const inputClass =
    "w-full bg-[#0a0c16] border border-gray-700 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors";
  const labelClass = "block text-sm font-medium text-gray-300 mb-1.5";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="bg-[#171b2f] border border-gray-800 rounded-2xl w-full max-w-2xl shadow-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-start p-6 border-b border-gray-800">
          <div>
            <h2 className="text-xl font-bold text-white">
              {isEditing ? "Edit Boost Package" : "Create Boost Package"}
            </h2>
            <p className="text-gray-400 text-sm mt-0.5">
              {isEditing
                ? "Update the package configuration"
                : "Set up a new boost subscription plan"}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Duration (only for create) */}
          {!isEditing && (
            <div>
              <label className={labelClass}>
                Duration <span className="text-red-400">*</span>
              </label>
              <select
                value={form.duration}
                onChange={(e) =>
                  setForm((f) => ({ ...f, duration: e.target.value }))
                }
                className={inputClass}
                required
              >
                {DURATION_OPTIONS.map((d) => (
                  <option key={d} value={d}>
                    {d.replace("_", " ")}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Price & Discount */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>
                Price (€) <span className="text-red-400">*</span>
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                placeholder="e.g. 150.00"
                value={form.price}
                onChange={(e) =>
                  setForm((f) => ({ ...f, price: e.target.value }))
                }
                className={inputClass}
                required
              />
            </div>
            <div>
              <label className={labelClass}>
                Discount (%) <span className="text-red-400">*</span>
              </label>
              <input
                type="number"
                min="0"
                max="100"
                placeholder="e.g. 15"
                value={form.discount}
                onChange={(e) =>
                  setForm((f) => ({ ...f, discount: e.target.value as unknown as number }))
                }
                className={inputClass}
                required
              />
            </div>
          </div>

          {/* Features */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="text-sm font-medium text-gray-300">
                Features <span className="text-red-400">*</span>
              </label>
              <button
                type="button"
                onClick={addFeature}
                className="flex items-center gap-1 text-xs text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                <Plus className="w-3.5 h-3.5" /> Add Feature
              </button>
            </div>
            <div className="space-y-2">
              {features.map((f, i) => (
                <div key={i} className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder={`Feature ${i + 1}`}
                    value={f}
                    onChange={(e) => updateFeature(i, e.target.value)}
                    className={inputClass}
                  />
                  {features.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeFeature(i)}
                      className="p-2.5 rounded-lg text-red-400 hover:bg-red-400/10 transition-colors shrink-0"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Status */}
          <div>
            <label className={labelClass}>Status</label>
            <select
              value={form.is_active ? "true" : "false"}
              onChange={(e) =>
                setForm((f) => ({
                  ...f,
                  is_active: e.target.value === "true",
                }))
              }
              className={inputClass}
            >
              <option value="true">Active</option>
              <option value="false">Inactive</option>
            </select>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 bg-[#0a0c16] border border-gray-700 rounded-lg text-sm text-gray-300 hover:bg-white/5 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 py-2.5 bg-[#00d8b6] text-white rounded-lg text-sm font-medium hover:bg-[#00c2a3] transition-colors shadow-lg shadow-[#00d8b6]/20 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Saving...
                </>
              ) : (
                <>
                  {isEditing ? (
                    <Save className="w-4 h-4" />
                  ) : (
                    <Plus className="w-4 h-4" />
                  )}
                  {isEditing ? "Update Package" : "Create Package"}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BoostPackageFormModal;
