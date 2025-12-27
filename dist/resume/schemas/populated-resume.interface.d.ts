import { Certification } from './certification.schema';
import { Education } from './education.schema';
import { Language } from './language.schema';
import { Skills } from './skill.schema';
import { WorkExperience } from './workexperience.schema';
export interface PopulatedResume {
    _id: string;
    file: string;
    userId: string;
    education: Education[];
    workExperience: WorkExperience[];
    skills: Skills[];
    certifications: Certification[];
    languages: Language[];
}
