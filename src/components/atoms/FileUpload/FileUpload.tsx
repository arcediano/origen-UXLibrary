/**
 * @file FileUpload.tsx
 * @description Componente de subida de archivos con drag & drop, validacion
 * de formato/tamano/dimensiones y previsualizacion. Promovido desde
 * origen-dashboard/src/components/shared/upload/file-upload.tsx — sin
 * dependencias de proyecto.
 */

"use client";

import * as React from "react";
import { useState, useCallback } from "react";
import {
  Upload,
  X,
  FileText,
  Image as ImageIcon,
  Download,
} from "lucide-react";
import { cn, formatFileSize } from "../../../lib/utils";
import {
  buildImageResolutionError,
  getImageDimensions,
  getImageQualityHint,
  isImageFile,
  type ImageQualityRequirement,
} from "../../../lib/validations/image-quality";
import { Button } from "../Button";
import { Alert, AlertTitle, AlertDescription } from "../Alert";

// ─── Tipos ────────────────────────────────────────────────────────────────────

export interface UploadedFile {
  id: string;
  file?: File;
  name: string;
  size: number;
  type: string;
  url?: string;
  preview?: string;
  status?: string;
  /** Clave de almacenamiento del fichero ya subido — presente en archivos hidratados desde el servidor */
  key?: string;
}

export interface FileUploadProps {
  /** Archivos actualmente cargados */
  value: UploadedFile[];
  /** Callback cuando cambian los archivos */
  onChange: (files: UploadedFile[]) => void;
  /** Texto de ayuda para el usuario */
  helperText?: string;
  /** Tipos MIME aceptados (ej: "image/*", ".pdf", ".doc,.docx") */
  accept?: string;
  /** Si permite multiples archivos */
  multiple?: boolean;
  /** Tamano maximo en MB */
  maxSize?: number;
  /** Numero maximo de archivos */
  maxFiles?: number;
  /** Clases CSS adicionales */
  className?: string;
  /** Si esta deshabilitado */
  disabled?: boolean;
  /** Texto personalizado para el boton de subida */
  buttonText?: string;
  /** Si mostrar previsualizacion de imagenes */
  showPreview?: boolean;
  /** Dimensiones minimas para imagenes (en pixeles) */
  minDimensions?: { width: number; height: number };
  /** Etiqueta de dimensiones recomendadas a mostrar en la zona de drop (ej: "200x200 px min.") */
  dimensionsHint?: string;
  /** Requisito de calidad para imagenes visibles en el escaparate publico (ver IMAGE_QUALITY_PRESETS) */
  qualityRequirement?: ImageQualityRequirement;
}

// ─── Utilidades ───────────────────────────────────────────────────────────────

const createPreview = (file: File): Promise<string> => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target?.result as string);
    reader.readAsDataURL(file);
  });
};

const formatAcceptHint = (accept: string): string => {
  if (accept === "*/*") return "";
  return accept
    .split(",")
    .map((t) => t.trim().replace("image/", "").replace("application/", "").toUpperCase())
    .join(", ");
};

// ─── Componente ───────────────────────────────────────────────────────────────

/**
 * Zona de subida de archivos con drag & drop, validacion de formato, tamano
 * y dimensiones minimas (para imagenes), y lista de archivos cargados con
 * previsualizacion.
 *
 * @example
 * <FileUpload
 *   value={photos}
 *   onChange={setPhotos}
 *   accept="image/*"
 *   multiple
 *   maxSize={5}
 *   qualityRequirement={IMAGE_QUALITY_PRESETS.profileGallery}
 *   dimensionsHint={getImageQualityHint(IMAGE_QUALITY_PRESETS.profileGallery)}
 * />
 */
export function FileUpload({
  value,
  onChange,
  helperText = "Arrastra archivos o haz clic para subir",
  accept = "*/*",
  multiple = false,
  maxSize = 10,
  maxFiles = 10,
  className,
  disabled = false,
  buttonText = "Subir archivos",
  showPreview = true,
  minDimensions,
  dimensionsHint,
  qualityRequirement,
}: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const acceptHint = accept !== "*/*" ? formatAcceptHint(accept) : "";
  const resolvedMinDimensions = qualityRequirement?.minDimensions ?? minDimensions;
  const resolvedDimensionsHint = dimensionsHint ?? (qualityRequirement ? getImageQualityHint(qualityRequirement) : undefined);

  const validateFileType = useCallback(
    (file: File): string | null => {
      if (accept === "*/*") return null;
      const acceptedTypes = accept.split(",").map((t) => t.trim());
      const isValidType = acceptedTypes.some((type) => {
        if (type.startsWith(".")) return file.name.toLowerCase().endsWith(type.toLowerCase());
        if (type.endsWith("/*")) return file.type.startsWith(type.replace("/*", "/"));
        return file.type === type;
      });
      if (!isValidType) {
        const hint = acceptHint || accept;
        return `Formato no valido: "${file.name}". Formatos aceptados: ${hint}`;
      }
      return null;
    },
    [accept, acceptHint]
  );

  const processFiles = useCallback(
    async (files: File[]) => {
      setError(null);
      const newFiles: UploadedFile[] = [];
      const errors: string[] = [];

      for (const file of files) {
        if (!multiple && newFiles.length + value.length >= 1) {
          errors.push("Solo se permite un archivo");
          break;
        }
        if (newFiles.length + value.length >= maxFiles) {
          errors.push(`Solo se permiten ${maxFiles} archivos como maximo`);
          break;
        }

        const typeError = validateFileType(file);
        if (typeError) {
          errors.push(typeError);
          continue;
        }

        const maxSizeBytes = maxSize * 1024 * 1024;
        if (file.size > maxSizeBytes) {
          errors.push(`El archivo "${file.name}" pesa ${(file.size / 1024 / 1024).toFixed(1)} MB. El maximo permitido es ${maxSize} MB.`);
          continue;
        }

        if (resolvedMinDimensions && isImageFile(file.type)) {
          try {
            const { width, height } = await getImageDimensions(file);
            if (width < resolvedMinDimensions.width || height < resolvedMinDimensions.height) {
              if (qualityRequirement) {
                errors.push(buildImageResolutionError(file.name, { width, height }, qualityRequirement));
              } else {
                errors.push(
                  `La imagen "${file.name}" mide ${width}x${height} px. El minimo requerido es ${resolvedMinDimensions.width}x${resolvedMinDimensions.height} px para que se vea nitida.`
                );
              }
              continue;
            }
          } catch {
            // Si no se pueden leer dimensiones, dejamos pasar
          }
        }

        const uploadedFile: UploadedFile = {
          id: `${file.name}-${Date.now()}-${Math.random()}`,
          file,
          name: file.name,
          size: file.size,
          type: file.type,
        };

        if (isImageFile(file.type) && showPreview) {
          uploadedFile.preview = await createPreview(file);
        }

        newFiles.push(uploadedFile);
      }

      if (errors.length > 0) setError(errors[0]);
      onChange([...value, ...newFiles]);
    },
    [value, onChange, validateFileType, multiple, maxFiles, maxSize, resolvedMinDimensions, qualityRequirement, showPreview]
  );

  const handleDragOver = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      if (!disabled) setIsDragging(true);
    },
    [disabled]
  );

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);

      if (!disabled && e.dataTransfer.files) {
        processFiles(Array.from(e.dataTransfer.files));
      }
    },
    [disabled, processFiles]
  );

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) processFiles(Array.from(e.target.files));
      e.target.value = "";
    },
    [processFiles]
  );

  const handleRemoveFile = useCallback(
    (fileId: string) => {
      onChange(value.filter((f) => f.id !== fileId));
    },
    [value, onChange]
  );

  const handleDownloadFile = useCallback((file: UploadedFile) => {
    const url = file.preview || (file.file ? URL.createObjectURL(file.file) : "");
    const a = document.createElement("a");
    a.href = url;
    a.download = file.name;
    a.click();
    if (!file.preview) URL.revokeObjectURL(url);
  }, []);

  return (
    <div className={cn("w-full", className)}>
      <div
        className={cn(
          "relative rounded-xl border-2 border-dashed p-8 transition-all duration-200",
          isDragging
            ? "border-origen-pradera bg-origen-pastel/50"
            : "border-border-subtle hover:border-origen-pradera hover:bg-origen-crema/30",
          disabled && "cursor-not-allowed opacity-50"
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleFileSelect}
          disabled={disabled}
          className="hidden"
        />

        <div className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-origen-bosque to-origen-pino shadow-md">
            <Upload className="h-8 w-8 text-white" aria-hidden="true" />
          </div>

          <h3 className="mb-2 text-sm font-semibold text-origen-bosque">Sube tus archivos</h3>

          <p className="mb-4 text-xs text-text-subtle">{helperText}</p>

          <p className="mb-4 text-[10px] text-text-subtle">
            {acceptHint && (
              <>
                <span className="font-medium">{acceptHint}</span> ·{" "}
              </>
            )}
            Max. {maxSize} MB
            {resolvedDimensionsHint && <> · {resolvedDimensionsHint}</>}
          </p>

          <Button type="button" variant="secondary" size="sm" onClick={() => fileInputRef.current?.click()} disabled={disabled}>
            {buttonText}
          </Button>
        </div>
      </div>

      {error && (
        <Alert variant="error" className="mt-3">
          <AlertTitle>Error de validacion</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {value.length > 0 && (
        <div className="mt-4 space-y-2">
          <p className="flex items-center gap-2 text-xs font-medium text-foreground">
            <FileText className="h-4 w-4 text-origen-pradera" aria-hidden="true" />
            Archivos cargados ({value.length}/{maxFiles})
          </p>

          {value.map((file) => (
            <div key={file.id} className="flex items-start gap-3 rounded-lg border border-border-subtle bg-surface-alt p-3 transition-all hover:border-origen-pradera/30">
              {file.preview && showPreview ? (
                <div className="h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-surface">
                  <img src={file.preview} alt={file.name} className="h-full w-full object-cover" />
                </div>
              ) : (
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-origen-crema to-origen-pastel">
                  {isImageFile(file.type) ? (
                    <ImageIcon className="h-8 w-8 text-origen-bosque" aria-hidden="true" />
                  ) : (
                    <FileText className="h-8 w-8 text-origen-bosque" aria-hidden="true" />
                  )}
                </div>
              )}

              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-origen-oscuro">{file.name}</p>
                <p className="text-xs text-text-subtle">{formatFileSize(file.size)}</p>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDownloadFile(file)}
                  className="h-8 w-8 p-0 text-text-subtle hover:text-origen-bosque"
                  aria-label={`Descargar ${file.name}`}
                >
                  <Download className="h-4 w-4" aria-hidden="true" />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => handleRemoveFile(file.id)}
                  className="h-8 w-8 p-0 text-text-subtle hover:text-red-600"
                  aria-label={`Eliminar ${file.name}`}
                >
                  <X className="h-4 w-4" aria-hidden="true" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

FileUpload.displayName = "FileUpload";
