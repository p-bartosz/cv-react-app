import { JSX } from "react";
import styles from './CVInput.module.scss';

interface CVTextareaProps {
  cvField?: string;
  updateFields: (newValue: string) => void;
  placeholder: string;
  inputTitle?: string;
  rows?: number;
  onBlur?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
}

export default function CVTextarea({ cvField, updateFields, placeholder = '', inputTitle = '', rows = 4, onBlur }: CVTextareaProps): JSX.Element {
  return (
    <label className={styles.inputGroup}>
      <span>{inputTitle}</span>
      <textarea
        rows={rows}
        value={cvField}
        onChange={(e) => updateFields(e.target.value)}
        placeholder={placeholder}
        onBlur={onBlur}
      />
    </label>
  );
}
