import { Bold, Italic, List, ListOrdered, RemoveFormatting } from "lucide-react";
import type { Editor } from "@tiptap/react";

interface RichTextEditorToolbarProps {
  editor: Editor;
  disabled?: boolean;
}

/** Componente INTERNO — no exportado desde index.ts */
export function RichTextEditorToolbar({ editor, disabled }: RichTextEditorToolbarProps) {
  const baseBtn =
    "h-8 w-8 rounded-md flex items-center justify-center transition-colors";
  const activeBtn = `${baseBtn} bg-origen-pradera/15 text-origen-bosque font-semibold`;
  const inactiveBtn = `${baseBtn} text-text-subtle hover:text-origen-bosque hover:bg-origen-pastel`;
  const separator = "h-4 w-px bg-border-subtle mx-0.5";

  return (
    <div className="flex items-center gap-0.5" aria-disabled={disabled}>
      {/* Negrita */}
      <button
        type="button"
        aria-label="Negrita"
        aria-pressed={editor.isActive("bold")}
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={editor.isActive("bold") ? activeBtn : inactiveBtn}
        disabled={disabled}
      >
        <Bold size={16} aria-hidden="true" />
      </button>

      {/* Cursiva */}
      <button
        type="button"
        aria-label="Cursiva"
        aria-pressed={editor.isActive("italic")}
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={editor.isActive("italic") ? activeBtn : inactiveBtn}
        disabled={disabled}
      >
        <Italic size={16} aria-hidden="true" />
      </button>

      {/* Separador */}
      <div className={separator} aria-hidden="true" />

      {/* Lista con viñetas */}
      <button
        type="button"
        aria-label="Lista con viñetas"
        aria-pressed={editor.isActive("bulletList")}
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={editor.isActive("bulletList") ? activeBtn : inactiveBtn}
        disabled={disabled}
      >
        <List size={16} aria-hidden="true" />
      </button>

      {/* Lista numerada */}
      <button
        type="button"
        aria-label="Lista numerada"
        aria-pressed={editor.isActive("orderedList")}
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={editor.isActive("orderedList") ? activeBtn : inactiveBtn}
        disabled={disabled}
      >
        <ListOrdered size={16} aria-hidden="true" />
      </button>

      {/* Separador */}
      <div className={separator} aria-hidden="true" />

      {/* Limpiar formato */}
      <button
        type="button"
        aria-label="Limpiar formato"
        onClick={() => editor.chain().focus().clearNodes().unsetAllMarks().run()}
        className={inactiveBtn}
        disabled={disabled}
      >
        <RemoveFormatting size={16} aria-hidden="true" />
      </button>
    </div>
  );
}
