export interface CVFields {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address?: string;
  city?: string;
  postalCode?: string;
  country: string;
  summary?: string;
  experience?: CVExperience[];
  education?: CVEducation[];
  skills?: string[];
  languages: CVLanguage[];
  hobbies?: string[];
}

interface CVQualifications {
  startDate: string;
  endDate: string;
  description: string;
}

export interface CVExperience extends CVQualifications {
  id: string;
  company: string;
  position: string;
}

export interface CVEducation extends CVQualifications {
  id: string;
  institution: string;
  degree: string;
}

export interface CVLanguage {
  language: string;
  proficiency: string;
}
