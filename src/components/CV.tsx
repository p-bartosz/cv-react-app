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

type NestedKey = 'experience' | 'education';

const newExperience = () => ({
  id: crypto.randomUUID?.() ?? String(Date.now() + Math.random()),
  company: '',
  position: '',
  startDate: '',
  endDate: '',
  description: '',
});

const newEducation = () => ({
  id: crypto.randomUUID?.() ?? String(Date.now() + Math.random()),
  institution: '',
  degree: '',
  startDate: '',
  endDate: '',
  description: '',
});

export default function CV(): JSX.Element {
  const [cvFields, setCvFields] = useState<CVFields>(CVFieldsInit);
  const [isExperienceOpen, setIsExperienceOpen] = useState(true);
  const [isEducationOpen, setIsEducationOpen] = useState(true);

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

  return (
    <div className={styles.app}>

      <aside className={styles.editorPanel}>
        <CVHeader />

        <CVPersonalDataSection cvFields={cvFields} updateFields={updateFields} />

        <ExperienceSection
          experience={cvFields.experience || []}
          handleNestedArrayFieldChange={handleNestedArrayFieldChange}
          handleRemoveItem={handleRemoveItem}
          handleAddItem={handleAddItem}
          isExperienceOpen={isExperienceOpen}
          setIsExperienceOpen={setIsExperienceOpen}
        />

        <EducationSection
          education={cvFields.education || []}
          handleNestedArrayFieldChange={handleNestedArrayFieldChange}
          handleRemoveItem={handleRemoveItem}
          handleAddItem={handleAddItem}
          isEducationOpen={isEducationOpen}
          setIsEducationOpen={setIsEducationOpen}
        />

        <div className={`${styles.actionBar} ${styles.stickyBar}`}>
          <button type="button" className={styles.printBtn} onClick={handlePrint}>
            🖨️ Drukuj / PDF
          </button>
        </div>
      </aside>

      <PreviewPanel ref={previewRef} cvFields={cvFields} />
    </div>
  );
}
