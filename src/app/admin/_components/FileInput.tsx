"use client";

import { upload } from "@vercel/blob/client";
import { useEffect, useRef, useState } from "react";

interface FileInputProps {
  name: string;
  accept?: string;
  label?: string;
  helperText?: string;
  existingUrl?: string;
}

export function FileInput({
  name,
  accept = "image/*",
  label = "파일 선택",
  helperText,
  existingUrl,
}: FileInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  // The URL submitted with the form: a freshly uploaded blob URL once an
  // upload completes, otherwise the existing image URL (or empty).
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
    setError(null);

    if (!file) {
      setFileName(null);
      setUploadedUrl(null);
      return;
    }

    setFileName(file.name);
    if (file.type.startsWith("image/")) {
      setPreviewUrl(URL.createObjectURL(file));
    }

    try {
      setUploading(true);
      const blob = await upload(`images/${file.name}`, file, {
        access: "public",
        handleUploadUrl: "/api/upload",
        contentType: file.type,
      });
      setUploadedUrl(blob.url);
    } catch {
      setError("업로드에 실패했습니다. 다시 시도해 주세요.");
      setFileName(null);
      setUploadedUrl(null);
      if (inputRef.current) inputRef.current.value = "";
    } finally {
      setUploading(false);
    }
  };

  const handleClear = () => {
    if (inputRef.current) inputRef.current.value = "";
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setFileName(null);
    setPreviewUrl(null);
    setUploadedUrl(null);
    setError(null);
  };

  const displayUrl = previewUrl || (fileName ? null : existingUrl);
  const hasSelection = !!fileName;
  // Value submitted with the form. handleImage on the server just reads this.
  const submittedUrl = uploadedUrl ?? (fileName ? "" : existingUrl ?? "");

  return (
    <div className="space-y-2">
      {/* The blob URL submitted with the form (small string, no file body). */}
      <input type="hidden" name={name} value={submittedUrl} />
      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="inline-flex items-center gap-2 rounded-md border border-secondary-300 bg-white px-4 py-2 text-sm font-medium text-secondary-700 shadow-sm hover:bg-secondary-50 disabled:opacity-50"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" className="h-4 w-4">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          {hasSelection || existingUrl ? "다른 파일 선택" : label}
        </button>
        {/* No `name` — the raw file is never part of the form body. */}
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          onChange={handleChange}
          className="sr-only"
        />
        {uploading && <span className="text-sm text-primary-600">업로드 중…</span>}
        {!uploading && hasSelection && (
          <>
            <span className="max-w-xs truncate text-sm text-secondary-600">{fileName}</span>
            <button
              type="button"
              onClick={handleClear}
              className="text-xs text-secondary-500 underline hover:text-secondary-700"
            >
              제거
            </button>
          </>
        )}
        {!hasSelection && existingUrl && (
          <span className="text-sm text-secondary-500">기존 파일 유지</span>
        )}
      </div>
      {error && <p className="text-xs text-red-500">{error}</p>}
      {displayUrl && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={displayUrl}
          alt="preview"
          className="h-20 w-auto rounded border border-secondary-200 bg-secondary-50 object-contain p-1"
        />
      )}
      {helperText && <p className="text-xs text-secondary-400">{helperText}</p>}
    </div>
  );
}
