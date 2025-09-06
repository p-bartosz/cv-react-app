import { useState } from 'react';
import styles from './CV.module.scss';
import { CVFields } from '../models/CVFields';
import { CVFieldsInit } from '../models/CVFields.init';

export default function CV() {
  const [cvFields, setCvFields] = useState<CVFields>(CVFieldsInit);

  const updateFields = (newFields: Partial<CVFields>) => {
    setCvFields({ ...cvFields, ...newFields });
  };

  return <div className={styles.cvContainer}>
    <input type="text" placeholder="First Name" className={styles.field} value={cvFields.firstName} onChange={e => updateFields({ firstName: e.target.value })} />
    <input type="text" placeholder="Last Name" className={styles.field} value={cvFields.lastName} onChange={e => updateFields({ lastName: e.target.value })} />
    <input type="email" placeholder="Email" className={styles.field} value={cvFields.email} onChange={e => updateFields({ email: e.target.value })} />
    <input type="tel" placeholder="Phone" className={styles.field} value={cvFields.phone} onChange={e => updateFields({ phone: e.target.value })} />
    <input type="text" placeholder="Address" className={styles.field} value={cvFields.address} onChange={e => updateFields({ address: e.target.value })} />
    <input type="text" placeholder="City" className={styles.field} value={cvFields.city} onChange={e => updateFields({ city: e.target.value })} />
    <input type="text" placeholder="Postal Code" className={styles.field} value={cvFields.postalCode} onChange={e => updateFields({ postalCode: e.target.value })} />
    <input type="text" placeholder="Country" className={styles.field} value={cvFields.country} onChange={e => updateFields({ country: e.target.value })} />
    <textarea placeholder="Summary" className={styles.field} value={cvFields.summary} onChange={e => updateFields({ summary: e.target.value })} />
  </div>;
}
