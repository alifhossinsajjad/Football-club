"use client";

import { useState } from "react";
import { useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/Checkbox";
import { Label } from "@/components/ui/label";
import { Upload, ChevronLeft, ChevronRight, Shield } from "lucide-react";

export default function ScoutComplete4({
  formData,
  updateFormData,
  onNext,
  onBack,
}) {
  const theme = useSelector((state) => state.theme);

  const [licenseFile, setLicenseFile] = useState(null);
  const [idFile, setIdFile] = useState(null);
  const [dataConsent, setDataConsent] = useState(false);
  const [codeOfConduct, setCodeOfConduct] = useState(false);

  // Required: both files uploaded + both checkboxes checked
  const isComplete = licenseFile && idFile && dataConsent && codeOfConduct;

  const handleContinue = () => {
    if (isComplete) {
      updateFormData({
        licenseFile,
        idFile,
        dataConsent,
        codeOfConduct,
      });
      onNext();
    }
  };

  const FileUploadBox = ({ title, subtitle, file, setFile }) => (
    <div
      className="rounded-2xl p-8 border-2 border-dashed transition-all hover:border-cyan-500/70 cursor-pointer text-center"
      style={{
        backgroundColor: theme.colors.backgroundCard,
        borderColor: file
          ? theme.colors.primaryCyan
          : `${theme.colors.primaryCyan}33`,
      }}
      onClick={() =>
        document.getElementById(`${title.toLowerCase()}-input`).click()
      }
    >
      <Upload
        className="w-12 h-12 mx-auto mb-4"
        style={{ color: file ? theme.colors.primaryCyan : "#6b7280" }}
      />
      <h3 className="text-gray-300 text-sm mb-2">{title}</h3>
      <p className="text-gray-400 text-sm mb-4 max-w-md mx-auto">{subtitle}</p>

      {file ? (
        <div className="text-green-400 font-medium">✓ {file.name}</div>
      ) : (
        <Button
          variant="common"
          className="px-8 py-3 rounded-md font-medium"
          style={{
            backgroundColor: theme.colors.button,
            boxShadow: `0 4px 20px ${theme.colors.button}4d`,
          }}
        >
          Choose File
        </Button>
      )}

      <p className="text-gray-500 text-xs mt-4">PDF, JPG, PNG (Max 10MB)</p>

      <input
        id={`${title.toLowerCase()}-input`}
        type="file"
        accept=".pdf,.jpg,.jpeg,.png"
        className="hidden"
        onChange={(e) => {
          if (e.target.files?.[0]) setFile(e.target.files[0]);
        }}
      />
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="w-20 h-20 rounded-full mx-auto flex items-center justify-center mb-6">
          <Shield className="w-10 h-10 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-white mb-3">
          Experience & Track Record
        </h2>
        <p className="text-gray-400 text-lg">
          Share your scouting achievements
        </p>
      </div>

      {/* Main Form Card */}
      <div className="rounded-2xl  space-y-10">
        {/* Scout License / Certification */}
        <div>
          <Label className="text-gray-300 text-sm mb-6 block">
            Scout License or Certification *
          </Label>
          <FileUploadBox
            title="Upload License/Certification"
            subtitle="FIFA license, UEFA certification, or professional credentials"
            file={licenseFile}
            setFile={setLicenseFile}
          />
        </div>

        {/* Government-issued ID */}
        <div>
          <Label className="text-gray-300 text-sm mb-6 block">
            Government-issued ID *
          </Label>
          <FileUploadBox
            title="Upload ID Document"
            subtitle="Passport, National ID, or Driver's License"
            file={idFile}
            setFile={setIdFile}
          />
        </div>

        {/* Legal Agreement & Code of Conduct */}
        <div
          className="space-y-6 p-4 rounded-lg border"
          style={{
            backgroundColor: theme.colors.backgroundDark,
            borderColor: `${theme.colors.primaryCyan}33`,
          }}
        >
          <Label className="text-gray-300 text-sm block">
            Legal Agreement & Code of Conduct
          </Label>

          <div
            className="flex items-start gap-4 p-5 rounded-xl"
            style={{
              background: `linear-gradient(180deg, ${theme.colors.primaryCyan}10, ${theme.colors.primaryMagenta}10)`,
              borderColor: `${theme.colors.primaryCyan}33`,
            }}
            onClick={() => setDataConsent(!dataConsent)}
          >
            <Checkbox checked={dataConsent} onCheckedChange={setDataConsent} />
            <p className="text-gray-300 text-sm">
              <strong>Data Processing Consent:</strong> I consent to NextGen
              Pros processing and publishing my professional information.
            </p>
          </div>

          <div
            className="flex items-start gap-4 p-5 rounded-xl"
            style={{
              backgroundColor: `${theme.colors.backgroundCard}cc`,
            }}
            onClick={() => setCodeOfConduct(!codeOfConduct)}
          >
            <Checkbox
              checked={codeOfConduct}
              onCheckedChange={setCodeOfConduct}
            />
            <p className="text-gray-300 text-sm">
              <strong>Code of Conduct:</strong> I agree to uphold professional
              standards and comply with all regulations.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
