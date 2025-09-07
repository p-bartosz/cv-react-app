import React from 'react';
import styles from '../CV.module.scss';

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
};

const EducationSection: React.FC<EducationSectionProps> = ({
  education,
  handleNestedArrayFieldChange,
  handleRemoveItem,
  handleAddItem,
  isEducationOpen,
  setIsEducationOpen,
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
