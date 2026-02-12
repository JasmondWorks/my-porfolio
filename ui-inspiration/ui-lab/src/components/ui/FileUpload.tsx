"use client";

import * as React from "react";
import { cn } from "@/lib/cn";
import { UploadCloud, File, X } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface FileUploadProps {
  onFilesSelected: (files: File[]) => void;
  maxFiles?: number;
  accept?: string;
  className?: string;
}

export function FileUpload({
  onFilesSelected,
  maxFiles = 1,
  accept,
  className,
}: FileUploadProps) {
  const [dragActive, setDragActive] = React.useState(false);
  const [files, setFiles] = React.useState<File[]>([]);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(Array.from(e.dataTransfer.files));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFiles(Array.from(e.target.files));
    }
  };

  const handleFiles = (newFiles: File[]) => {
    const validFiles = newFiles.slice(0, maxFiles - files.length);
    const updatedFiles = [...files, ...validFiles];
    setFiles(updatedFiles);
    onFilesSelected(updatedFiles);
  };

  const removeFile = (index: number) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
    onFilesSelected(newFiles);
  };

  return (
    <div className={cn("w-full space-y-4", className)}>
      <div
        className={cn(
          "relative flex flex-col items-center justify-center w-full h-32 rounded-lg border-2 border-dashed transition-colors",
          dragActive
            ? "border-brand-primary bg-brand-primary/5"
            : "border-border-default bg-surface-subtle/30",
          "hover:bg-surface-subtle/50",
        )}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <UploadCloud className="w-8 h-8 mb-3 text-text-tertiary" />
          <p className="mb-1 text-sm text-text-secondary">
            <span className="font-semibold">Click to upload</span> or drag and
            drop
          </p>
          <p className="text-xs text-text-tertiary">
            {accept ? accept.replace(/,/g, ", ") : "All files"} (Max {maxFiles})
          </p>
        </div>
        <input
          ref={inputRef}
          type="file"
          className="hidden"
          multiple={maxFiles > 1}
          accept={accept}
          onChange={handleChange}
        />
        <div
          className="absolute inset-0 cursor-pointer"
          onClick={() => inputRef.current?.click()}
        />
      </div>

      {files.length > 0 && (
        <ul className="space-y-2">
          {files.map((file, index) => (
            <li
              key={`${file.name}-${index}`}
              className="flex items-center justify-between p-3 bg-surface-base border border-border-default rounded-md"
            >
              <div className="flex items-center space-x-3 truncate">
                <div className="p-2 bg-brand-primary/10 rounded">
                  <File className="w-4 h-4 text-brand-primary" />
                </div>
                <div className="truncate">
                  <p className="text-sm font-medium text-text-primary truncate max-w-[200px]">
                    {file.name}
                  </p>
                  <p className="text-xs text-text-secondary">
                    {(file.size / 1024).toFixed(1)} KB
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeFile(index)}
                className="text-text-tertiary hover:text-state-error"
              >
                <X className="w-4 h-4" />
              </Button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
