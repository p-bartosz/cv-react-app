import { forwardRef } from 'react';
import styles from './CV.module.scss';
import { CVFields } from '../models/CVFields';

type PreviewPanelProps = {
  cvFields: CVFields;
};

const PreviewPanel = forwardRef<HTMLDivElement, PreviewPanelProps>(({ cvFields }, ref) => {
  return (
    <main className={styles.previewPanel}>
      <div ref={ref} className={styles.cvPage}>
        <header className={styles.cvHeader}>
          <div>
            <h1 className={styles.cvName}>
              {cvFields.firstName || 'First'} {cvFields.lastName || 'Last'}
            </h1>
            <div className={styles.cvMeta}>
              {[cvFields.city, cvFields.country].filter(Boolean).join(', ') || '–'}
            </div>
          </div>
          <ul className={styles.cvContacts}>
            {cvFields.email && <li>{cvFields.email}</li>}
            {cvFields.phone && <li>{cvFields.phone}</li>}
            {cvFields.address && <li>{cvFields.address}</li>}
            {cvFields.postalCode && <li>{cvFields.postalCode}</li>}
          </ul>
        </header>

        {cvFields.summary && (
          <section className={styles.cvSection}>
            <h2 className={styles.cvSectionTitle}>Summary</h2>
            <p className={styles.cvParagraph}>{cvFields.summary}</p>
          </section>
        )}

        {(cvFields.experience?.length ?? 0) > 0 && (
          <section className={styles.cvSection}>
            <h2 className={styles.cvSectionTitle}>Experience</h2>
            <ul className={styles.timeline}>
              {cvFields.experience!.map((exp, i) => (
                <li key={exp.id ?? i} className={styles.timelineItem}>
                  <div className={styles.timelineBullet} />
                  <div className={styles.timelineContent}>
                    <div className={styles.itemHeader}>
                      <strong>{exp.position || 'Position'}</strong>{' '}
                      <span className={styles.at}>@</span>{' '}
                      <span className={styles.muted}>{exp.company || 'Company'}</span>
                    </div>
                    <div className={styles.muted}>
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
          <section className={styles.cvSection}>
            <h2 className={styles.cvSectionTitle}>Education</h2>
            <ul className={styles.timeline}>
              {cvFields.education!.map((edu, i) => (
                <li key={edu.id ?? i} className={styles.timelineItem}>
                  <div className={styles.timelineBullet} />
                  <div className={styles.timelineContent}>
                    <div className={styles.itemHeader}>
                      <strong>{edu.degree || 'Degree'}</strong>{' '}
                      <span className={styles.at}>@</span>{' '}
                      <span className={styles.muted}>{edu.institution || 'Institution'}</span>
                    </div>
                    <div className={styles.muted}>
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
