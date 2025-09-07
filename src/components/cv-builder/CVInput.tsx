import { JSX } from "react";
import styles from './CVInput.module.scss';

interface CVInputProps {
  cvField?: string;
  updateFields: (newValue: string) => void;
  placeholder: string;
  type?: string;
  inputTitle: string;
}

export default function CVInput({ cvField, updateFields, placeholder = '', type = 'text', inputTitle = '' }: CVInputProps): JSX.Element {
  return (
    <label className={styles.inputGroup}>
      <span>{inputTitle}</span>
      <input
        type={type}
        value={ cvField }
        onChange={(e) => updateFields( e.target.value )}
        placeholder={placeholder}
      />
    </label>
  );
}
