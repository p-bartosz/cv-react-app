import React from 'react';
import styles from '../CV.module.scss';
import CVInput from './CVInput';
import CVTextarea from './CVTextarea';
import { CVErrorFields, CVExperience } from '../../models/CVFields';

type ExperienceSectionProps = {
  experience: CVExperience[];
  handleNestedArrayFieldChange: (
    field: 'experience',
    index: number,
    key: string,
    value: string
  ) => void;
  handleRemoveItem: (field: 'experience', index: number) => void;
  handleAddItem: (field: 'experience') => void;
  isExperienceOpen: boolean;
  setIsExperienceOpen: React.Dispatch<React.SetStateAction<boolean>>;
  errors: CVErrorFields;
  validateField: (
    field: string,
    value: string,
    index?: number,
    section?: 'experience'
  ) => void;
};

const ExperienceSection: React.FC<ExperienceSectionProps> = ({
  experience,
  handleNestedArrayFieldChange,
  handleRemoveItem,
  handleAddItem,
  isExperienceOpen,
  setIsExperienceOpen,
  validateField,
}) => {
  return (
    <section className={styles.card}>
      <div className={styles.cardTitleRow}>
        <h2 className={styles.cardTitle}>Experience</h2>
        <button
          type="button"
          className={styles.ghostBtn}
          onClick={() => setIsExperienceOpen(v => !v)}
          aria-expanded={isExperienceOpen}
        >
          {isExperienceOpen ? 'Hide' : 'Show'}
        </button>
      </div>

      {isExperienceOpen && (
        <div className={styles.stackMd}>
          {experience.map((exp, index) => (
            <div key={exp.id ?? index} className={styles.itemCard}>
              <div className={styles.grid2}>
                <CVInput
                  cvField={exp.company}
                  updateFields={e => handleNestedArrayFieldChange('experience', index, 'company', e)}
                  placeholder="Company"
                  inputTitle="Company"
                  onBlur={e => validateField('company', e.target.value, index, 'experience')}
                />
                <CVInput
                  cvField={exp.position}
                  updateFields={e => handleNestedArrayFieldChange('experience', index, 'position', e)}
                  placeholder="Position"
                  inputTitle="Position"
                  onBlur={e => validateField('position', e.target.value, index, 'experience')}
                />
                <CVInput
                  cvField={exp.startDate}
                  updateFields={e => handleNestedArrayFieldChange('experience', index, 'startDate', e)}
                  placeholder="Start Date"
                  inputTitle="Start Date"
                  onBlur={e => validateField('startDate', e.target.value, index, 'experience')}
                />
                <CVInput
                  cvField={exp.endDate}
                  updateFields={e => handleNestedArrayFieldChange('experience', index, 'endDate', e)}
                  placeholder="End Date"
                  inputTitle="End Date"
                  onBlur={e => validateField('endDate', e.target.value, index, 'experience')}
                />
              </div>

              <CVTextarea
                cvField={exp.description}
                updateFields={e => handleNestedArrayFieldChange('experience', index, 'description', e)}
                placeholder="Description"
                rows={3}
                inputTitle="Description"
                onBlur={e => validateField('description', e.target.value, index, 'experience')}
              />

              <div className={styles.itemActions}>
                <button
                  type="button"
                  className={styles.dangerBtn}
                  onClick={() => handleRemoveItem('experience', index)}
                  aria-label="Remove experience item"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          <button
            type="button"
            className={styles.primaryBtn}
            onClick={() => handleAddItem('experience')}
          >
            + Add Experience
          </button>
        </div>
      )}
    </section>
  );
};

export default ExperienceSection;
