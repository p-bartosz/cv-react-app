import { JSX } from "react";
import styles from './CVInput.module.scss';

interface CVInputProps {
  cvField?: string;
  updateFields: (newValue: string) => void;
  placeholder: string;
  type?: string;
  inputTitle: string;
  errorMessage?: string;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
}

export default function CVInput({ cvField, updateFields, placeholder = '', type = 'text', inputTitle = '', errorMessage, onBlur }: CVInputProps): JSX.Element {
  return (
    <label className={styles.inputGroup}>
      <span>{inputTitle}</span>
      <input
        type={type}
        value={ cvField }
        onChange={(e) => updateFields( e.target.value )}
        placeholder={placeholder}
        onBlur={onBlur}
      />
      {errorMessage && <span className={styles.error}>{errorMessage}</span>}
    </label>
  );
}
