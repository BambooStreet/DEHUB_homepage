"use client";

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

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
    if (file) {
      setFileName(file.name);
      if (file.type.startsWith("image/")) {
        setPreviewUrl(URL.createObjectURL(file));
      }
    } else {
      setFileName(null);
    }
  };

  const handleClear = () => {
    if (inputRef.current) inputRef.current.value = "";
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setFileName(null);
    setPreviewUrl(null);
  };

  const displayUrl = previewUrl || (fileName ? null : existingUrl);
  const hasSelection = !!fileName;

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="inline-flex items-center gap-2 rounded-md border border-secondary-300 bg-white px-4 py-2 text-sm font-medium text-secondary-700 shadow-sm hover:bg-secondary-50"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" className="h-4 w-4">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          {hasSelection || existingUrl ? "다른 파일 선택" : label}
        </button>
        <input
          ref={inputRef}
          type="file"
          name={name}
          accept={accept}
          onChange={handleChange}
          className="sr-only"
        />
        {hasSelection && (
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
