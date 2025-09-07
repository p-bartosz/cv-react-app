import { JSX } from 'react';
import styles from './CVShared.module.scss';
import { CVFields } from '../../models/CVFields';
import CVInput from './CVInput';
import CVTextarea from './CVTextarea';

interface CVPersonalDataSectionProps {
  cvFields: CVFields;
  updateFields: (patch: Partial<CVFields>) => void;
}

export default function CVPersonalDataSection({ cvFields, updateFields }: CVPersonalDataSectionProps): JSX.Element {

  return (
    <section className={styles.card}>
      <h2 className={styles.cardTitle}>Dane osobowe</h2>
      <div className={styles.grid2}>
        <CVInput
          cvField={cvFields.firstName}
          updateFields={(firstName) => updateFields({ firstName })}
          placeholder="Name"
          inputTitle="First Name"
        />
        <CVInput
          cvField={cvFields.lastName}
          updateFields={(lastName) => updateFields({ lastName })}
          placeholder="Last Name"
          inputTitle="Last Name"
        />
        <CVInput
          cvField={cvFields.email}
          updateFields={(email) => updateFields({ email })}
          placeholder="Email"
          type="email"
          inputTitle="Email"
        />
        <CVInput
          cvField={cvFields.phone}
          updateFields={(phone) => updateFields({ phone })}
          placeholder="+48 ..."
          type="tel"
          inputTitle="Phone"
        />
        <CVInput
          cvField={cvFields.city}
          updateFields={(city) => updateFields({ city })}
          placeholder="City"
          inputTitle="City"
        />
        <CVInput
          cvField={cvFields.country}
          updateFields={(country) => updateFields({ country })}
          placeholder="Country"
          inputTitle="Country"
        />
        <CVInput
          cvField={cvFields.address}
          updateFields={(address) => updateFields({ address })}
          placeholder="Address"
          inputTitle="Address"
        />
        <CVInput
          cvField={cvFields.postalCode}
          updateFields={(postalCode) => updateFields({ postalCode })}
          placeholder="00-000"
          inputTitle="Postal Code"
        />
      </div>


      <CVTextarea
        cvField={cvFields.summary}
        updateFields={(summary) => updateFields({ summary })}
        placeholder="2–4 zdania o Twoich mocnych stronach, domenie i osiągnięciach…"
        rows={4}
        inputTitle="Summary"
      />
    </section>
  );
}
