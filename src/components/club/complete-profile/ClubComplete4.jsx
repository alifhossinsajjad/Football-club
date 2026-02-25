"use client";

import { useState } from "react";
import { useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/Checkbox";
import { Label } from "@/components/ui/label";
import { Upload, Shield, AlertCircle } from "lucide-react";

export default function ClubComplete4({
  formData,
  updateFormData,
  onNext,
  onBack,
}) {
  const theme = useSelector((state) => state.theme);

  const [verificationDocument, setVerificationDocument] = useState(null);
  const [logo, setLogo] = useState(null);
  const [dataConsent, setDataConsent] = useState(false);
  const [termsAcceptance, setTermsAcceptance] = useState(false);

  // Required: both files uploaded + both checkboxes checked
  const isComplete =
    verificationDocument && logo && dataConsent && termsAcceptance;

  const handleContinue = () => {
    if (isComplete) {
      updateFormData({
        verificationDocument,
        logo,
        dataConsent,
        termsAcceptance,
      });
      onNext();
    }
  };

  const FileUploadBox = ({
    title,
    subtitle,
    file,
    setFile,
    formats,
    maxSize,
  }) => (
    <div
      className="rounded-2xl p-8 border-2 border-dashed transition-all hover:border-cyan-500/70 cursor-pointer text-center"
      style={{
        backgroundColor: theme.colors.backgroundCard,
        borderColor: file
          ? theme.colors.primaryCyan
          : `${theme.colors.primaryCyan}33`,
      }}
      onClick={() =>
        document
          .getElementById(`${title.toLowerCase().replace(/\s/g, "")}-input`)
          .click()
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

      <p className="text-gray-500 text-xs mt-4">
        {formats} (Max {maxSize})
      </p>

      <input
        id={`${title.toLowerCase().replace(/\s/g, "")}-input`}
        type="file"
        accept={formats
          .toLowerCase()
          .replace(/\s/g, "")
          .replace(/pdf,jpg,png/g, ".pdf,.jpg,.png")
          .replace(/png,jpg/g, ".png,.jpg")}
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
        <div
          className="w-20 h-20 rounded-full mx-auto flex items-center justify-center mb-6"
          style={{
            background: `linear-gradient(135deg, ${theme.colors.primaryCyan}, ${theme.colors.primaryMagenta})`,
          }}
        >
          <Shield className="w-10 h-10 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-white mb-3">
          Verification & Consent
        </h2>
        <p className="text-gray-400 text-lg">
          Upload verification documents and accept terms
        </p>
      </div>

      {/* Top Info box */}
      <div
        className="p-4 rounded-lg bg-[#FFA5001A] mb-6 flex border text-xs gap-4"
        style={{
          borderColor: `${theme.colors.primaryCyan}33`,
        }}
      >
        <AlertCircle className="w-8 h-8 text-[#FFA500]" />
        <p className="text-sm text-gray-300 mb-4">
          <strong>Important!</strong>
          <br />
          Upload verification documents to verify your platform account. Please
          provide high-quality, official documents.
        </p>
      </div>

      {/* Main Form Card */}
      <div className="rounded-2xl space-y-10">
        {/* Official Verification Document */}
        <div>
          <Label className="text-gray-300 text-sm mb-6 block">
            Official Verification Document *
          </Label>
          <FileUploadBox
            title="Upload Verification Document"
            subtitle="Business registration certificate or official letter"
            file={verificationDocument}
            setFile={setVerificationDocument}
            formats="PDF, JPG, PNG"
            maxSize="5MB"
          />
        </div>

        {/* Club/Academy Logo */}
        <div>
          <Label className="text-gray-300 text-sm mb-6 block">
            Club/Academy Logo *
          </Label>
          <FileUploadBox
            title="Upload Your Logo"
            subtitle=""
            file={logo}
            setFile={setLogo}
            formats="PNG, JPG"
            maxSize="2MB"
          />
        </div>

        {/* Legal Terms & Consent */}
        <div
          className="space-y-6 p-4 rounded-lg border"
          style={{
            backgroundColor: theme.colors.backgroundDark,
            borderColor: `${theme.colors.primaryCyan}33`,
          }}
        >
          <Label className="text-gray-300 text-sm block">
            Legal Terms & Consent
          </Label>

          <div
            className="flex items-start gap-4 p-5 rounded-xl border"
            style={{
              background: `linear-gradient(180deg, ${theme.colors.primaryCyan}10, ${theme.colors.primaryMagenta}10)`,
              borderColor: `${theme.colors.primaryCyan}33`,
            }}
            onClick={() => setDataConsent(!dataConsent)}
          >
            <Checkbox checked={dataConsent} onCheckedChange={setDataConsent} />
            <p className="text-gray-300 text-sm">
              <strong>Data Processing Consent:</strong> I consent to NextGen Pro
              processing my personal data, including organization information,
              contact, for providing services, ensuring privacy and security.
            </p>
          </div>

          <div
            className="flex items-start gap-4 p-5 rounded-xl border"
            style={{
              background: `linear-gradient(180deg, ${theme.colors.primaryCyan}10, ${theme.colors.primaryMagenta}10)`,
              borderColor: `${theme.colors.primaryCyan}33`,
            }}
            onClick={() => setTermsAcceptance(!termsAcceptance)}
          >
            <Checkbox
              checked={termsAcceptance}
              onCheckedChange={setTermsAcceptance}
            />
            <p className="text-gray-300 text-sm">
              <strong>Terms Acceptance:</strong> I confirm that I have read and
              accept this service's Terms and Privacy Policy.
            </p>
          </div>
        </div>

        {/* Bottom Info box */}
        <div
          className="p-4 rounded-lg bg-[#FFA5001A] mb-6 flex border text-xs gap-4"
          style={{
            borderColor: `${theme.colors.primaryCyan}33`,
          }}
        >
          <AlertCircle className="w-8 h-8 text-[#FFA500]" />
          <p className="text-sm text-gray-300 mb-4">
            <strong>Verification Process</strong>
            <br />
            After submission, our team will review your documents within 24-48
            hours. You'll receive an email notification once verified.
          </p>
        </div>
      </div>
    </div>
  );
}
