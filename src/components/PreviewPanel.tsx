import { forwardRef } from 'react';
import styles from './CV.module.scss';
import { CVFields } from '../models/CVFields';

type PreviewPanelProps = {
  cvFields: CVFields;
};

const PreviewPanel = forwardRef<HTMLDivElement, PreviewPanelProps>(({ cvFields }, ref) => {
  return (
    <main className={styles.previewPanel} style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
      <div
        ref={ref}
        className={styles.cvPage}
        style={{
          width: '210mm',
          height: '297mm',
          backgroundColor: 'white',
          boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
          padding: '20mm',
          display: 'flex',
          flexDirection: 'column',
          gap: '10mm',
        }}
      >
        <header className={styles.cvHeader} style={{ borderBottom: '1px solid #ccc', paddingBottom: '10mm' }}>
          <div>
            <h1 className={styles.cvName} style={{ fontSize: '24pt', margin: 0 }}>
              {cvFields.firstName || 'First'} {cvFields.lastName || 'Last'}
            </h1>
            <div className={styles.cvMeta} style={{ fontSize: '12pt', color: '#666' }}>
              {[cvFields.city, cvFields.country].filter(Boolean).join(', ') || '–'}
            </div>
          </div>
          <ul className={styles.cvContacts} style={{ listStyle: 'none', padding: 0, margin: '10mm 0 0 0', fontSize: '10pt' }}>
            {cvFields.email && <li>{cvFields.email}</li>}
            {cvFields.phone && <li>{cvFields.phone}</li>}
            {cvFields.address && <li>{cvFields.address}</li>}
            {cvFields.postalCode && <li>{cvFields.postalCode}</li>}
          </ul>
        </header>

        {cvFields.summary && (
          <section className={styles.cvSection} style={{ fontSize: '10pt', lineHeight: '1.5' }}>
            <h2 className={styles.cvSectionTitle} style={{ fontSize: '14pt', marginBottom: '5mm' }}>Summary</h2>
            <p className={styles.cvParagraph}>{cvFields.summary}</p>
          </section>
        )}

        {(cvFields.experience?.length ?? 0) > 0 && (
          <section className={styles.cvSection} style={{ fontSize: '10pt', lineHeight: '1.5' }}>
            <h2 className={styles.cvSectionTitle} style={{ fontSize: '14pt', marginBottom: '5mm' }}>Experience</h2>
            <ul className={styles.timeline} style={{ padding: 0, listStyle: 'none' }}>
              {cvFields.experience!.map((exp, i) => (
                <li key={exp.id ?? i} className={styles.timelineItem} style={{ marginBottom: '5mm' }}>
                  <div className={styles.timelineContent}>
                    <div className={styles.itemHeader} style={{ fontWeight: 'bold' }}>
                      {exp.position || 'Position'} <span className={styles.at}>@</span> <span className={styles.muted}>{exp.company || 'Company'}</span>
                    </div>
                    <div className={styles.muted} style={{ fontSize: '9pt', color: '#666' }}>
                      {(exp.startDate || '—')} – {(exp.endDate || 'Present')}
                    </div>
                    {exp.description && <p className={styles.cvParagraph}>{exp.description}</p>}
                  </div>
                </li>
              ))}
            </ul>
          </section>
        )}

        {(cvFields.education?.length ?? 0) > 0 && (
          <section className={styles.cvSection} style={{ fontSize: '10pt', lineHeight: '1.5' }}>
            <h2 className={styles.cvSectionTitle} style={{ fontSize: '14pt', marginBottom: '5mm' }}>Education</h2>
            <ul className={styles.timeline} style={{ padding: 0, listStyle: 'none' }}>
              {cvFields.education!.map((edu, i) => (
                <li key={edu.id ?? i} className={styles.timelineItem} style={{ marginBottom: '5mm' }}>
                  <div className={styles.timelineContent}>
                    <div className={styles.itemHeader} style={{ fontWeight: 'bold' }}>
                      {edu.degree || 'Degree'} <span className={styles.at}>@</span> <span className={styles.muted}>{edu.institution || 'Institution'}</span>
                    </div>
                    <div className={styles.muted} style={{ fontSize: '9pt', color: '#666' }}>
                      {(edu.startDate || '—')} – {(edu.endDate || 'Present')}
                    </div>
                    {edu.description && <p className={styles.cvParagraph}>{edu.description}</p>}
                  </div>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </main>
  );
});

export default PreviewPanel;
