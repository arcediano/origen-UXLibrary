'use client';

/**
 * RichTextEditor — Editor de texto enriquecido basado en Tiptap v3.
 *
 * IMPORTANTE para consumidores Next.js (App Router):
 * Este componente usa hooks de React y no puede renderizarse en el servidor.
 * El archivo consumidor DEBE incluir la directiva "use client" en su primera
 * línea. La librería no incluye la directiva directamente para no forzar a
 * todos los consumidores a ser Client Components.
 *
 * @example
 * // page-form.tsx
 * "use client";
 * import { RichTextEditor } from "@arcediano/ux-library";
 */

import { useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import { BubbleMenu } from "@tiptap/react/menus";
import { Bold, Italic } from "lucide-react";
import { cn } from "../../../lib/utils";
import { Tooltip } from "../Tooltip";
import { RichTextEditorToolbar } from "./RichTextEditorToolbar";

export interface RichTextEditorProps {
  value: string;
  onChange: (html: string) => void;
  label?: string;
  helperText?: string;
  tooltip?: string;
  placeholder?: string;
  minHeight?: string;
  disabled?: boolean;
  maxHeight?: string;
  showWordCount?: boolean;
  className?: string;
}

export function RichTextEditor({
  value,
  onChange,
  label,
  helperText,
  tooltip,
  placeholder,
  minHeight,
  disabled,
  maxHeight,
  showWordCount,
  className,
}: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({ placeholder: placeholder ?? "" }),
    ],
    content: value,
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
  });

  // Sincronizar el valor externo sin disparar onChange
  // emitUpdate: false evita bucles infinitos al sincronizar desde prop
  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value, { emitUpdate: false });
    }
  }, [editor, value]);

  if (!editor) {
    return null;
  }

  return (
    <div className={cn("space-y-1.5", className)}>
      {/* Label + Tooltip */}
      {label && (
        <div className="flex items-center gap-2 mb-1.5">
          <p className="text-sm font-medium text-origen-bosque">{label}</p>
          {tooltip && <Tooltip content={tooltip} />}
        </div>
      )}

      {/* Contenedor del editor */}
      <div
        className={cn(
          "rounded-xl border border-border-subtle bg-surface-alt overflow-hidden transition-all",
          "focus-within:border-origen-pradera focus-within:ring-2 focus-within:ring-origen-pradera/20",
          disabled && "opacity-50 pointer-events-none"
        )}
      >
        {/* Toolbar */}
        <div className="flex items-center gap-0.5 border-b border-border-subtle px-2 py-1.5 bg-surface-alt">
          <RichTextEditorToolbar editor={editor} disabled={disabled} />
        </div>

        {/* BubbleMenu — aparece al seleccionar texto */}
        <BubbleMenu
          editor={editor}
          options={{ placement: "top" }}
        >
          <div className="flex items-center gap-0.5 rounded-lg bg-origen-bosque px-1.5 py-1 shadow-lg ring-1 ring-black/5">
            <button
              type="button"
              aria-label="Negrita"
              aria-pressed={editor.isActive("bold")}
              onClick={() => editor.chain().focus().toggleBold().run()}
              className="h-7 w-7 rounded text-white hover:bg-white/15 flex items-center justify-center transition-colors"
            >
              <Bold size={15} aria-hidden="true" />
            </button>
            <button
              type="button"
              aria-label="Cursiva"
              aria-pressed={editor.isActive("italic")}
              onClick={() => editor.chain().focus().toggleItalic().run()}
              className="h-7 w-7 rounded text-white hover:bg-white/15 flex items-center justify-center transition-colors"
            >
              <Italic size={15} aria-hidden="true" />
            </button>
          </div>
        </BubbleMenu>

        {/* Área de edición */}
        <div
          style={{
            minHeight: minHeight ?? "100px",
            maxHeight,
            overflowY: maxHeight ? "auto" : undefined,
          }}
        >
          <EditorContent
            editor={editor}
            className="[&_.ProseMirror]:outline-none [&_.ProseMirror]:px-3 [&_.ProseMirror]:py-2
              [&_.ProseMirror_strong]:font-semibold
              [&_.ProseMirror_em]:italic
              [&_.ProseMirror_ul]:list-disc [&_.ProseMirror_ul]:pl-4 [&_.ProseMirror_ul]:space-y-1
              [&_.ProseMirror_ol]:list-decimal [&_.ProseMirror_ol]:pl-4
              [&_.ProseMirror_li]:leading-relaxed
              [&_.ProseMirror_p]:mb-2 [&_.ProseMirror_p:last-child]:mb-0
              [&_.ProseMirror_h2]:text-sm [&_.ProseMirror_h2]:font-semibold [&_.ProseMirror_h2]:mt-3 [&_.ProseMirror_h2]:mb-1
              [&_.ProseMirror_h3]:text-sm [&_.ProseMirror_h3]:font-medium [&_.ProseMirror_h3]:mt-2 [&_.ProseMirror_h3]:mb-1
              [&_.ProseMirror_p.is-editor-empty:first-child::before]:content-[attr(data-placeholder)]
              [&_.ProseMirror_p.is-editor-empty:first-child::before]:text-muted-foreground
              [&_.ProseMirror_p.is-editor-empty:first-child::before]:float-left
              [&_.ProseMirror_p.is-editor-empty:first-child::before]:pointer-events-none
              [&_.ProseMirror]:min-h-[inherit]"
          />
        </div>

        {/* Contador de palabras */}
        {showWordCount && (
          <div className="border-t border-border-subtle px-3 py-1 text-right">
            <span className="text-[10px] text-text-subtle">
              {editor.getText().trim().split(/\s+/).filter(Boolean).length} palabras
            </span>
          </div>
        )}
      </div>

      {/* Helper text */}
      {helperText && (
        <p className="text-xs text-text-subtle mt-1">{helperText}</p>
      )}
    </div>
  );
}
