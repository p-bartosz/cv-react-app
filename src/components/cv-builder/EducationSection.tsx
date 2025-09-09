import React from 'react';
import styles from '../CV.module.scss';
import { CVErrorFields } from '../../models/CVFields';
import { NestedKey } from '../CV';

type EducationSectionProps = {
  education: any[];
  handleNestedArrayFieldChange: (
    field: 'education',
    index: number,
    key: string,
    value: string
  ) => void;
  handleRemoveItem: (field: 'education', index: number) => void;
  handleAddItem: (field: 'education') => void;
  isEducationOpen: boolean;
  setIsEducationOpen: React.Dispatch<React.SetStateAction<boolean>>;
  errors: CVErrorFields;
  validateField: (
    field: string,
    value: string,
    index?: number,
    section?: NestedKey
  ) => void;
};

const EducationSection: React.FC<EducationSectionProps> = ({
  education,
  handleNestedArrayFieldChange,
  handleRemoveItem,
  handleAddItem,
  isEducationOpen,
  setIsEducationOpen,
  errors,
  validateField
}) => {
  return (
    <section className={styles.card}>
      <div className={styles.cardTitleRow}>
        <h2 className={styles.cardTitle}>Education</h2>
        <button
          type="button"
          className={styles.ghostBtn}
          onClick={() => setIsEducationOpen(v => !v)}
          aria-expanded={isEducationOpen}
        >
          {isEducationOpen ? 'Hide' : 'Show'}
        </button>
      </div>

      {isEducationOpen && (
        <div className={styles.stackMd}>
          {education.map((edu, index) => (
            <div key={edu.id ?? index} className={styles.itemCard}>
              <div className={styles.grid2}>
                <label className={styles.inputGroup}>
                  <span>Institution</span>
                  <input
                    type="text"
                    value={edu.institution}
                    onChange={(e) =>
                      handleNestedArrayFieldChange('education', index, 'institution', e.target.value)
                    }
                    onBlur={(e) =>
                      validateField('institution', e.target.value, index, 'education')
                    }
                    placeholder="Politechnika Gdańska"
                  />
                </label>
                <label className={styles.inputGroup}>
                  <span>Degree</span>
                  <input
                    type="text"
                    value={edu.degree}
                    onChange={(e) =>
                      handleNestedArrayFieldChange('education', index, 'degree', e.target.value)
                    }
                    onBlur={(e) => validateField('degree', e.target.value, index, 'education')}
                    placeholder="Informatyka, mgr inż."
                  />
                </label>
                <label className={styles.inputGroup}>
                  <span>Start</span>
                  <input
                    type="date"
                    value={edu.startDate}
                    onChange={(e) =>
                      handleNestedArrayFieldChange('education', index, 'startDate', e.target.value)
                    }
                    onBlur={(e) =>
                      validateField('startDate', e.target.value, index, 'education')
                    }
                  />
                </label>
                <label className={styles.inputGroup}>
                  <span>End</span>
                  <input
                    type="date"
                    value={edu.endDate}
                    onChange={(e) =>
                      handleNestedArrayFieldChange('education', index, 'endDate', e.target.value)
                    }
                    onBlur={(e) => validateField('endDate', e.target.value, index, 'education')}
                  />
                </label>
              </div>

              <label className={styles.inputGroup}>
                <span>Description</span>
                <textarea
                  rows={3}
                  value={edu.description}
                  onChange={(e) =>
                    handleNestedArrayFieldChange('education', index, 'description', e.target.value)
                  }
                  onBlur={(e) =>
                    validateField('description', e.target.value, index, 'education')
                  }
                  placeholder="Specjalizacja, praca dyplomowa, wyróżnienia…"
                />
              </label>

              <div className={styles.itemActions}>
                <button
                  type="button"
                  className={styles.dangerBtn}
                  onClick={() => handleRemoveItem('education', index)}
                  aria-label="Remove education item"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          <button
            type="button"
            className={styles.primaryBtn}
            onClick={() => handleAddItem('education')}
          >
            + Add Education
          </button>
        </div>
      )}
    </section>
  );
};

export default EducationSection;
