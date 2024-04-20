"use client";

import dynamic from "next/dynamic";
import { useMemo } from "react";
import "react-quill/dist/quill.snow.css";
import "./quill.css";
interface EditorProps {
  onChange: (value: string) => void;
  value: string;
  disabled: boolean;
}

export const Editor = ({ onChange, value, disabled }: EditorProps) => {
  const ReactQuill = useMemo(
    () => dynamic(() => import("react-quill"), { ssr: false }),
    [],
  );
  return (
    <ReactQuill
      theme="snow"
      value={value}
      onChange={onChange}
      readOnly={disabled}
    />
  );
};
