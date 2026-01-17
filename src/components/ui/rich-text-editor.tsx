"use client";

import { useRef, useEffect } from "react";

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  error?: string;
}

export function RichTextEditor({ value, onChange, placeholder = "Write your content here...", className = "", error }: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value;
    }
  }, [value]);

  const handleInput = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.ctrlKey || e.metaKey) {
      switch (e.key) {
        case "b":
          e.preventDefault();
          document.execCommand("bold");
          break;
        case "i":
          e.preventDefault();
          document.execCommand("italic");
          break;
        case "u":
          e.preventDefault();
          document.execCommand("underline");
          break;
      }
    }
  };

  const formatText = (command: string) => {
    document.execCommand(command, false);
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  return (
    <div className="w-full">
      <div className="border rounded-t-md bg-gray-50 p-2 flex items-center gap-2 border-b-0">
        <button
          type="button"
          onClick={() => formatText("bold")}
          className="px-2 py-1 text-sm font-bold hover:bg-gray-200 rounded"
          title="Bold (Ctrl+B)"
        >
          B
        </button>
        <button
          type="button"
          onClick={() => formatText("italic")}
          className="px-2 py-1 text-sm italic hover:bg-gray-200 rounded"
          title="Italic (Ctrl+I)"
        >
          I
        </button>
        <button
          type="button"
          onClick={() => formatText("underline")}
          className="px-2 py-1 text-sm underline hover:bg-gray-200 rounded"
          title="Underline (Ctrl+U)"
        >
          U
        </button>
        <div className="w-px h-6 bg-gray-300"></div>
        <button
          type="button"
          onClick={() => formatText("insertUnorderedList")}
          className="px-2 py-1 text-sm hover:bg-gray-200 rounded"
          title="Bullet List"
        >
          • List
        </button>
        <button
          type="button"
          onClick={() => formatText("insertOrderedList")}
          className="px-2 py-1 text-sm hover:bg-gray-200 rounded"
          title="Numbered List"
        >
          1. List
        </button>
        <div className="w-px h-6 bg-gray-300"></div>
        <button
          type="button"
          onClick={() => formatText("justifyLeft")}
          className="px-2 py-1 text-sm hover:bg-gray-200 rounded"
          title="Align Left"
        >
          ⬅
        </button>
        <button
          type="button"
          onClick={() => formatText("justifyCenter")}
          className="px-2 py-1 text-sm hover:bg-gray-200 rounded"
          title="Align Center"
        >
          ⬌
        </button>
        <button
          type="button"
          onClick={() => formatText("justifyRight")}
          className="px-2 py-1 text-sm hover:bg-gray-200 rounded"
          title="Align Right"
        >
        ➡
        </button>
      </div>
      <div
        ref={editorRef}
        contentEditable
        onInput={handleInput}
        onKeyDown={handleKeyDown}
        className={`min-h-[300px] p-4 border rounded-b-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${error ? "border-red-500" : "border-gray-300"} ${className}`}
        style={{ lineHeight: "1.6" }}
        dangerouslySetInnerHTML={{ __html: value }}
        data-placeholder={placeholder}
      />
      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
      <style jsx>{`
        [contenteditable]:empty:before {
          content: attr(data-placeholder);
          color: #9ca3af;
          pointer-events: none;
        }
      `}</style>
    </div>
  );
}