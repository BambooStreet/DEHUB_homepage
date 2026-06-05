"use client";

import { useEffect, useRef, useState } from "react";

interface LibraryItem {
  partner: string;
  logoUrl: string;
}

interface PartnerLogoFieldProps {
  initialPartner?: string;
  initialLogoUrl?: string;
  library: LibraryItem[];
}

export function PartnerLogoField({
  initialPartner,
  initialLogoUrl,
  library,
}: PartnerLogoFieldProps) {
  const [partner, setPartner] = useState(initialPartner || "");
  const [savedLogoUrl, setSavedLogoUrl] = useState<string | null>(
    initialLogoUrl || null,
  );
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const [uploadedPreview, setUploadedPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    return () => {
      if (uploadedPreview) URL.revokeObjectURL(uploadedPreview);
    };
  }, [uploadedPreview]);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (uploadedPreview) URL.revokeObjectURL(uploadedPreview);
    if (file) {
      setUploadedFileName(file.name);
      setUploadedPreview(URL.createObjectURL(file));
    } else {
      setUploadedFileName(null);
      setUploadedPreview(null);
    }
  };

  const handlePickLibrary = (item: LibraryItem) => {
    setPartner(item.partner);
    setSavedLogoUrl(item.logoUrl);
    setUploadedFileName(null);
    if (uploadedPreview) URL.revokeObjectURL(uploadedPreview);
    setUploadedPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleClearLogo = () => {
    setSavedLogoUrl(null);
    setUploadedFileName(null);
    if (uploadedPreview) URL.revokeObjectURL(uploadedPreview);
    setUploadedPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // existingPartnerLogo hidden field carries library/initial URL when no new upload
  const existingPartnerLogo = uploadedFileName ? "" : savedLogoUrl || "";
  const previewUrl = uploadedPreview || (uploadedFileName ? null : savedLogoUrl);

  return (
    <div className="space-y-4 rounded-md border border-secondary-200 bg-secondary-50/50 p-4">
      <div>
        <label className="block text-sm font-medium text-secondary-700 mb-1">
          협업 기관 (Partner)
        </label>
        <input
          name="partner"
          value={partner}
          onChange={(e) => setPartner(e.target.value)}
          placeholder="삼성전자 / Naver / KAKAO 등"
          className="w-full px-3 py-2 border border-secondary-300 rounded-md text-sm bg-white"
        />
        <p className="text-xs text-secondary-400 mt-1">
          제목 위에 로고로 표시되며, alt 텍스트로도 사용됩니다.
        </p>
      </div>

      <input type="hidden" name="existingPartnerLogo" value={existingPartnerLogo} />

      {library.length > 0 && (
        <div>
          <p className="text-sm font-medium text-secondary-700 mb-2">
            이전에 사용한 로고에서 선택
          </p>
          <div className="flex flex-wrap gap-2">
            {library.map((item) => {
              const isSelected =
                !uploadedFileName && savedLogoUrl === item.logoUrl;
              return (
                <button
                  key={item.logoUrl}
                  type="button"
                  onClick={() => handlePickLibrary(item)}
                  className={`flex items-center gap-2 rounded-md border bg-white px-2 py-1.5 text-xs transition ${
                    isSelected
                      ? "border-primary-500 ring-2 ring-primary-200"
                      : "border-secondary-200 hover:border-secondary-400"
                  }`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.logoUrl}
                    alt={item.partner}
                    className="h-6 w-16 object-contain"
                  />
                  <span className="text-secondary-600">{item.partner}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      <div>
        <p className="text-sm font-medium text-secondary-700 mb-2">
          또는 새 로고 업로드
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="inline-flex items-center gap-2 rounded-md border border-secondary-300 bg-white px-4 py-2 text-sm font-medium text-secondary-700 shadow-sm hover:bg-secondary-50"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" className="h-4 w-4">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            {uploadedFileName ? "다른 파일 선택" : "로고 업로드"}
          </button>
          <input
            ref={fileInputRef}
            type="file"
            name="partnerLogo"
            accept="image/*"
            onChange={handleUpload}
            className="sr-only"
          />
          {uploadedFileName && (
            <span className="max-w-xs truncate text-sm text-secondary-600">
              {uploadedFileName}
            </span>
          )}
        </div>
      </div>

      {previewUrl && (
        <div className="flex items-center gap-3">
          <span className="text-xs font-medium text-secondary-500">미리보기</span>
          <div className="flex h-10 w-36 items-center rounded border border-secondary-200 bg-white">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={previewUrl}
              alt="logo preview"
              className="max-h-full max-w-full object-contain mx-auto"
            />
          </div>
          <button
            type="button"
            onClick={handleClearLogo}
            className="text-xs text-secondary-500 underline hover:text-secondary-700"
          >
            로고 제거
          </button>
        </div>
      )}
    </div>
  );
}
