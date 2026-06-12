/**
 * @file DocumentUploadCard.tsx
 * @description Card de subida de documento de verificacion (CIF, Seguro RC,
 * Manipulador de alimentos, certificaciones, etc.), con icono en cuadro con
 * gradiente, titulo, badges de estado (Obligatorio / Subido / Verificado) y
 * FileUpload integrado. Patron de alto valor detectado en /onboarding, Paso 5
 * - Documentacion (ver manual de diseno, seccion 9).
 */

"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Badge } from "../Badge";
import { FileUpload, type FileUploadProps, type UploadedFile } from "../FileUpload";

export type DocumentUploadStatus = "pending" | "uploaded" | "verified";

export interface DocumentUploadCardProps extends Omit<FileUploadProps, "value" | "onChange" | "buttonText"> {
  /** Icono mostrado en el recuadro con gradiente de marca (recomendado: lucide-react h-5 w-5) */
  icon: React.ReactNode;
  /** Titulo del documento (ej. "CIF / NIF") */
  title: string;
  /** Descripcion corta del documento */
  description?: string;
  /** Si el documento es obligatorio (muestra badge "Obligatorio") */
  required?: boolean;
  /**
   * Estado del documento:
   * - `pending`: aun no se ha subido — se muestra el FileUpload.
   * - `uploaded`: subido, pendiente de verificacion — badge "Subido".
   * - `verified`: subido y verificado — badge "Verificado".
   */
  status?: DocumentUploadStatus;
  /** Archivo(s) actualmente cargados */
  value: UploadedFile[];
  /** Callback cuando cambian los archivos */
  onChange: (files: UploadedFile[]) => void;
  /** Clases adicionales para el contenedor */
  className?: string;
}

const statusBadge: Record<DocumentUploadStatus, React.ReactNode> = {
  pending: null,
  uploaded: <Badge variant="success" size="xs">Subido</Badge>,
  verified: <Badge variant="success" size="xs">Verificado</Badge>,
};

/**
 * @example
 * <DocumentUploadCard
 *   icon={<Shield className="h-5 w-5" />}
 *   title="CIF / NIF"
 *   description="El documento que identifica fiscalmente a tu negocio"
 *   required
 *   status={data.cif ? "uploaded" : "pending"}
 *   value={data.cif ? [data.cif] : []}
 *   onChange={(files) => handleDocumentUpload("cif", files)}
 *   accept=".pdf,.jpg,.jpeg,.png"
 *   maxSize={5}
 * />
 */
const DocumentUploadCard = React.forwardRef<HTMLDivElement, DocumentUploadCardProps>(
  ({ className, icon, title, description, required = false, status = "pending", value, onChange, ...fileUploadProps }, ref) => {
    return (
      <div ref={ref} className={cn("space-y-3", className)}>
        <div className="flex items-start gap-3">
          <div
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-origen-pradera/20 to-origen-hoja/20 text-origen-pradera"
            aria-hidden="true"
          >
            {icon}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="font-semibold text-origen-bosque">{title}</h3>
              {required && (
                <Badge variant="danger" size="xs">
                  Obligatorio
                </Badge>
              )}
              {statusBadge[status]}
            </div>
            {description && <p className="mt-0.5 text-xs text-text-subtle">{description}</p>}
          </div>
        </div>

        {status === "pending" ? (
          <FileUpload value={value} onChange={onChange} {...fileUploadProps} />
        ) : (
          <div className="flex items-center justify-between rounded-xl border border-origen-pradera/30 bg-origen-crema/20 p-4">
            <div className="flex min-w-0 flex-1 items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-origen-pradera/10 text-origen-pradera">
                {icon}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-origen-bosque">{value[0]?.name}</p>
                <p className="text-xs text-text-subtle">
                  {status === "verified" ? "Verificado" : "Pendiente de verificación"}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
);

DocumentUploadCard.displayName = "DocumentUploadCard";

export { DocumentUploadCard };
