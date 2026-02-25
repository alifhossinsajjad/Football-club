"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Briefcase, Trash2, Trophy } from "lucide-react";

export default function ScoutProfessionalHistory({
  history: initialHistory,
  isEditing,
  onUpdate,
  theme,
}) {
  const [history, setHistory] = useState(initialHistory || []);

  const handleUpdate = (index, field, value) => {
    const updated = [...history];
    updated[index] = { ...updated[index], [field]: value };
    setHistory(updated);
    if (onUpdate) onUpdate(updated);
  };

  const addNewEntry = () => {
    const newEntry = {
      club: "",
      role: "",
      period: "",
      current: false,
    };
    const updated = [newEntry, ...history];
    setHistory(updated);
    if (onUpdate) onUpdate(updated);
  };

  return (
    <div
      className="rounded-xl p-8 border"
      style={{
        backgroundColor: theme.colors.backgroundCard,
        borderColor: `${theme.colors.primaryCyan}33`,
      }}
    >
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl  text-white">Professional History</h2>
        {isEditing && (
          <Button
            variant="outline"
            onClick={addNewEntry}
            className="rounded-full border-none"
          >
            + Add Position
          </Button>
        )}
      </div>

      <div className="">
        {history.map((job, index) => (
          <div
            key={index}
            className={`flex items-center justify-between p-5 ${
              isEditing || "border-b"
            }`}
            style={{
              borderColor: isEditing || ` ${theme.colors.primaryCyan}33`,
            }}
          >
            <div className="flex items-center w-full gap-5">
              {isEditing || (
                <div
                  className="w-12 h-12 rounded-full  flex items-center justify-center flex-shrink-0"
                  style={{
                    color: theme.colors.primaryCyan,
                    background: `linear-gradient(180deg, ${theme.colors.primaryCyan}33, ${theme.colors.primaryMagenta}33)`,
                    borderColor: `${theme.colors.primaryCyan}50`,
                  }}
                >
                  <Briefcase className="w-6 h-6 text-white" />
                </div>
              )}
              <div className="w-full">
                {isEditing ? (
                  <div className=" bg-[#1A2049]  p-4 rounded-lg">
                    <Input
                      value={job.club}
                      onChange={(e) =>
                        handleUpdate(index, "club", e.target.value)
                      }
                      placeholder="Club / Organization"
                      className="mb-2 h-10 rounded-lg w-full"
                    />
                    <Input
                      value={job.role}
                      onChange={(e) =>
                        handleUpdate(index, "role", e.target.value)
                      }
                      placeholder="Role"
                      className="mb-2 h-10 rounded-lg w-full"
                    />
                    <Input
                      value={job.period}
                      onChange={(e) =>
                        handleUpdate(index, "period", e.target.value)
                      }
                      placeholder="Period (e.g. 2021 - Present)"
                      className="h-10 rounded-lg w-full mb-2"
                    />
                    {job.current && (
                      <div className="px-5 py-2  rounded-full text-sm font-medium">
                        Current Position
                      </div>
                    )}
                    <button
                      onClick={() => removeRegion(i)}
                      className="flex items-center gap-2 text-sm text-red-400 hover:text-red-500 transition "
                    >
                      <Trash2 className="w-4 h-4" />
                      Remove Region
                    </button>
                  </div>
                ) : (
                  <>
                    <p className="text-white font-medium text-lg">{job.club}</p>
                    <p className="text-gray-300">{job.role}</p>
                    <p
                      className="text-sm "
                      style={{
                        color: `${theme.colors.primaryCyan}`,
                      }}
                    >
                      {job.period}
                    </p>
                  </>
                )}
              </div>
              {job.current && !isEditing && (
                <span
                  className="px-5 py-2 rounded-full text-sm font-medium"
                  style={{
                    backgroundColor: theme.colors.button,
                    color: "white",
                  }}
                >
                  Current
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {history.length === 0 && !isEditing && (
        <p className="text-center text-gray-500 py-8">
          No professional history added yet.
        </p>
      )}
    </div>
  );
}
