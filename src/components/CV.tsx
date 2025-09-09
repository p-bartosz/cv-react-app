import { JSX, useRef, useState } from 'react';
import { useReactToPrint } from 'react-to-print';
import styles from './CV.module.scss';
import { CVFields } from '../models/CVFields';
import { CVFieldsInit } from '../models/CVFields.init';
import CVPersonalDataSection from './cv-builder/CVPersonalDataSection';
import PreviewPanel from './PreviewPanel';
import ExperienceSection from './cv-builder/ExperienceSection';
import EducationSection from './cv-builder/EducationSection';
import CVHeader from './cv-builder/CVHeader';

export type NestedKey = 'experience' | 'education';

const newExperience = () => ({
  id: crypto.randomUUID?.() ?? String(Date.now() + Math.random()),
  company: '',
  position: '',
  startDate: '',
  endDate: '',
  description: '',
  postalCode: '',
});

const newEducation = () => ({
  id: crypto.randomUUID?.() ?? String(Date.now() + Math.random()),
  institution: '',
  degree: '',
  startDate: '',
  endDate: '',
  description: '',
  postalCode: '',
});

type CVErrorFields = {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  [key: `experience-${number}-company`]: string | undefined;
  [key: `experience-${number}-position`]: string | undefined;
  [key: `education-${number}-institution`]: string | undefined;
  [key: `education-${number}-degree`]: string | undefined;
};

export default function CV(): JSX.Element {
  const [cvFields, setCvFields] = useState<CVFields>(CVFieldsInit);
  const [isExperienceOpen, setIsExperienceOpen] = useState(true);
  const [isEducationOpen, setIsEducationOpen] = useState(true);
  const [errors, setErrors] = useState<CVErrorFields>({});

  const previewRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    contentRef: previewRef,
    documentTitle: `${cvFields.firstName || 'CV'}_${cvFields.lastName || ''}`.trim(),
    pageStyle: `
      @page { size: A4; margin: 16mm; }
      @media print {
        body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
        .${styles.app} { display: block; }
        .${styles.editorPanel}, .${styles.actionBar} { display: none !important; }
        .${styles.previewPanel} { box-shadow: none !important; margin: 0 !important; }
        .${styles.cvPage} { box-shadow: none !important; }
      }
    `,
  });

  const updateFields = (patch: Partial<CVFields>) => {
    setCvFields(prev => ({ ...prev, ...patch }));
  };

  const handleNestedArrayFieldChange = (
    field: NestedKey,
    index: number,
    key: string,
    value: string
  ) => {
    setCvFields(prev => {
      const arr = [...((prev[field] as any[]) ?? [])];
      arr[index] = { ...(arr[index] || {}), [key]: value };
      return { ...prev, [field]: arr } as CVFields;
    });
  };

  const handleRemoveItem = (field: NestedKey, index: number) => {
    setCvFields(prev => {
      const arr = [...((prev[field] as any[]) ?? [])];
      arr.splice(index, 1);
      return { ...prev, [field]: arr } as CVFields;
    });
  };

  const handleAddItem = (field: NestedKey) => {
    setCvFields(prev => {
      const arr = [...((prev[field] as any[]) ?? [])];
      arr.push(field === 'experience' ? newExperience() : newEducation());
      return { ...prev, [field]: arr } as CVFields;
    });
  };

  const validateFields = (): boolean => {
    const newErrors: CVErrorFields = {};

    if (!cvFields.firstName) newErrors.firstName = 'First name is required';
    if (!cvFields.lastName) newErrors.lastName = 'Last name is required';
    if (!cvFields.email) newErrors.email = 'Email is required';
    if (!cvFields.phone) newErrors.phone = 'Phone number is required';

    cvFields.experience?.forEach((exp, index) => {
      if (!exp.company) newErrors[`experience-${index}-company`] = 'Company is required';
      if (!exp.position) newErrors[`experience-${index}-position`] = 'Position is required';
    });

    cvFields.education?.forEach((edu, index) => {
      if (!edu.institution) newErrors[`education-${index}-institution`] = 'Institution is required';
      if (!edu.degree) newErrors[`education-${index}-degree`] = 'Degree is required';
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateField = (field: string, value: string, index?: number, section?: NestedKey) => {
    setErrors(prevErrors => {
      const newErrors = { ...prevErrors };
      console.log('Validating field:', field, value, index, section);
      

      if (section && typeof index === 'number') {
        const key = `${section}-${index}-${field}`;
        if (!value) {
          newErrors[key] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
        } else {
          delete newErrors[key];
        }
      } else {
        if (!value) {
          newErrors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
        } else {
          delete newErrors[field];
        }
      }

      return newErrors;
    });
  };

  const handleSubmit = () => {
    if (validateFields()) {
      console.log('Form is valid, submitting:', cvFields);
    } else {
      console.log('Form has errors:', errors);
    }
  };

  return (
    <div className={styles.app}>
      <aside className={styles.editorPanel}>
        <CVHeader />

        <CVPersonalDataSection
          cvFields={cvFields}
          updateFields={updateFields}
          errors={errors}
          validateField={validateField}
        />

        <ExperienceSection
          experience={cvFields.experience || []}
          handleNestedArrayFieldChange={handleNestedArrayFieldChange}
          handleRemoveItem={handleRemoveItem}
          handleAddItem={handleAddItem}
          isExperienceOpen={isExperienceOpen}
          setIsExperienceOpen={setIsExperienceOpen}
          errors={errors}
          validateField={validateField}
        />

        <EducationSection
          education={cvFields.education || []}
          handleNestedArrayFieldChange={handleNestedArrayFieldChange}
          handleRemoveItem={handleRemoveItem}
          handleAddItem={handleAddItem}
          isEducationOpen={isEducationOpen}
          setIsEducationOpen={setIsEducationOpen}
          errors={errors}
          validateField={validateField}
        />

        <div className={`${styles.actionBar} ${styles.stickyBar}`}>
          <button type="button" className={styles.printBtn} onClick={handlePrint}>
            🖨️ Drukuj / PDF
          </button>
        </div>
      </aside>

      <PreviewPanel ref={previewRef} cvFields={cvFields} />

      <div className={styles.actionBar}>
        <button type="button" className={styles.primaryBtn} onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
}
