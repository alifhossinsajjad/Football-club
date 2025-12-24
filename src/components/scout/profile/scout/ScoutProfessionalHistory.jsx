"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trophy } from "lucide-react";

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
        <h2 className="text-2xl font-bold text-white">Professional History</h2>
        {isEditing && (
          <Button
            onClick={addNewEntry}
            className="rounded-full"
            style={{ backgroundColor: theme.colors.primaryCyan }}
          >
            + Add Entry
          </Button>
        )}
      </div>

      <div className="space-y-4">
        {history.map((job, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-5 rounded-xl"
            style={{
              backgroundColor: theme.colors.backgroundDark,
            }}
          >
            <div className="flex items-center gap-5">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primaryCyan to-primaryMagenta flex items-center justify-center flex-shrink-0">
                <Trophy className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                {isEditing ? (
                  <>
                    <Input
                      value={job.club}
                      onChange={(e) =>
                        handleUpdate(index, "club", e.target.value)
                      }
                      placeholder="Club / Organization"
                      className="mb-2 h-10 rounded-lg"
                    />
                    <Input
                      value={job.role}
                      onChange={(e) =>
                        handleUpdate(index, "role", e.target.value)
                      }
                      placeholder="Role"
                      className="mb-2 h-10 rounded-lg"
                    />
                    <Input
                      value={job.period}
                      onChange={(e) =>
                        handleUpdate(index, "period", e.target.value)
                      }
                      placeholder="Period (e.g. 2021 - Present)"
                      className="h-10 rounded-lg"
                    />
                  </>
                ) : (
                  <>
                    <p className="text-white font-medium text-lg">{job.club}</p>
                    <p className="text-gray-300">{job.role}</p>
                    <p className="text-sm text-gray-400">{job.period}</p>
                  </>
                )}
              </div>
            </div>

            {job.current && (
              <span
                className="px-5 py-2 rounded-full text-sm font-medium"
                style={{
                  backgroundColor: theme.colors.primaryCyan,
                  color: "white",
                }}
              >
                Current
              </span>
            )}
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
