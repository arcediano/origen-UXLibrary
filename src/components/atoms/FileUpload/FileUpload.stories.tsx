import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { FileUpload, type UploadedFile } from "./FileUpload";

const meta: Meta<typeof FileUpload> = {
  title: "Atoms/FileUpload",
  component: FileUpload,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof FileUpload>;

export const Default: Story = {
  render: () => {
    const [files, setFiles] = React.useState<UploadedFile[]>([]);
    return (
      <div className="p-4 bg-white max-w-lg">
        <FileUpload value={files} onChange={setFiles} helperText="Arrastra archivos o haz clic para subir" />
      </div>
    );
  },
};

export const ImagesMultiple: Story = {
  render: () => {
    const [files, setFiles] = React.useState<UploadedFile[]>([]);
    return (
      <div className="p-4 bg-white max-w-lg">
        <FileUpload
          value={files}
          onChange={setFiles}
          accept="image/*"
          multiple
          maxSize={5}
          maxFiles={6}
          helperText="Sube fotos del entorno de tu negocio"
          dimensionsHint="800x600 px mín."
        />
      </div>
    );
  },
};

export const WithExistingFiles: Story = {
  render: () => {
    const [files, setFiles] = React.useState<UploadedFile[]>([
      { id: "1", name: "logo-tienda.png", size: 245_000, type: "image/png", preview: "https://picsum.photos/200" },
      { id: "2", name: "ficha-tecnica.pdf", size: 1_200_000, type: "application/pdf" },
    ]);
    return (
      <div className="p-4 bg-white max-w-lg">
        <FileUpload value={files} onChange={setFiles} multiple />
      </div>
    );
  },
};

export const PdfOnly: Story = {
  render: () => {
    const [files, setFiles] = React.useState<UploadedFile[]>([]);
    return (
      <div className="p-4 bg-white max-w-lg">
        <FileUpload
          value={files}
          onChange={setFiles}
          accept=".pdf"
          maxSize={5}
          buttonText="Subir documento"
          helperText="Solo se acepta formato PDF"
        />
      </div>
    );
  },
};

export const Disabled: Story = {
  render: () => {
    const [files] = React.useState<UploadedFile[]>([]);
    return (
      <div className="p-4 bg-white max-w-lg">
        <FileUpload value={files} onChange={() => {}} disabled helperText="La subida está deshabilitada" />
      </div>
    );
  },
};
