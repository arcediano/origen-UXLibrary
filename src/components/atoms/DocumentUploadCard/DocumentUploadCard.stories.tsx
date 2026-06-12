import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { FileText, ShieldCheck, Utensils } from "lucide-react";
import { DocumentUploadCard } from "./DocumentUploadCard";
import type { UploadedFile } from "../FileUpload";

const meta: Meta<typeof DocumentUploadCard> = {
  title: "Atoms/DocumentUploadCard",
  component: DocumentUploadCard,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof DocumentUploadCard>;

export const Pending: Story = {
  render: () => {
    const [files, setFiles] = React.useState<UploadedFile[]>([]);
    return (
      <div className="p-4 bg-white max-w-lg">
        <DocumentUploadCard
          icon={<FileText className="h-5 w-5" />}
          title="CIF / NIF"
          description="El documento que identifica fiscalmente a tu negocio"
          required
          status="pending"
          value={files}
          onChange={setFiles}
          accept=".pdf,.jpg,.jpeg,.png"
          maxSize={5}
        />
      </div>
    );
  },
};

export const Uploaded: Story = {
  render: () => {
    const [files, setFiles] = React.useState<UploadedFile[]>([
      { id: "1", name: "seguro-rc.pdf", size: 850_000, type: "application/pdf" },
    ]);
    return (
      <div className="p-4 bg-white max-w-lg">
        <DocumentUploadCard
          icon={<ShieldCheck className="h-5 w-5" />}
          title="Seguro de Responsabilidad Civil"
          description="Cobertura mínima de 150.000 €"
          required
          status="uploaded"
          value={files}
          onChange={setFiles}
        />
      </div>
    );
  },
};

export const Verified: Story = {
  render: () => {
    const [files, setFiles] = React.useState<UploadedFile[]>([
      { id: "1", name: "carnet-manipulador.pdf", size: 320_000, type: "application/pdf" },
    ]);
    return (
      <div className="p-4 bg-white max-w-lg">
        <DocumentUploadCard
          icon={<Utensils className="h-5 w-5" />}
          title="Carnet de manipulador de alimentos"
          description="Documento acreditativo en vigor"
          required={false}
          status="verified"
          value={files}
          onChange={setFiles}
        />
      </div>
    );
  },
};

export const AllStatuses: Story = {
  render: () => {
    const [cif, setCif] = React.useState<UploadedFile[]>([]);
    const [insurance, setInsurance] = React.useState<UploadedFile[]>([
      { id: "1", name: "seguro-rc.pdf", size: 850_000, type: "application/pdf" },
    ]);
    const [handler, setHandler] = React.useState<UploadedFile[]>([
      { id: "2", name: "carnet-manipulador.pdf", size: 320_000, type: "application/pdf" },
    ]);

    return (
      <div className="flex flex-col gap-6 p-4 bg-white max-w-lg">
        <DocumentUploadCard
          icon={<FileText className="h-5 w-5" />}
          title="CIF / NIF"
          description="Obligatorio para verificar tu negocio"
          required
          status="pending"
          value={cif}
          onChange={setCif}
          accept=".pdf,.jpg,.jpeg,.png"
          maxSize={5}
        />
        <DocumentUploadCard
          icon={<ShieldCheck className="h-5 w-5" />}
          title="Seguro de Responsabilidad Civil"
          description="Pendiente de verificación"
          required
          status="uploaded"
          value={insurance}
          onChange={setInsurance}
        />
        <DocumentUploadCard
          icon={<Utensils className="h-5 w-5" />}
          title="Carnet de manipulador de alimentos"
          description="Documento verificado"
          status="verified"
          value={handler}
          onChange={setHandler}
        />
      </div>
    );
  },
};
