import { Resume, ResumeDocument } from '../schemas/resume.schema';
import { Model } from 'mongoose';
import { Education } from '../schemas/education.schema';
import { WorkExperience } from '../schemas/workexperience.schema';
import { Language } from '../schemas/language.schema';
import { Skills } from '../schemas/skill.schema';
import { Certification } from '../schemas/certification.schema';
import { PopulatedResume } from '../schemas/populated-resume.interface';
export declare class ResumeService {
    private readonly resumeModel;
    private readonly educationModel;
    private readonly workExperienceModel;
    private readonly languageModel;
    private readonly skillsModel;
    private readonly certificationModel;
    private readonly langModel;
    constructor(resumeModel: Model<ResumeDocument>, educationModel: Model<Education>, workExperienceModel: Model<WorkExperience>, languageModel: Model<Language>, skillsModel: Model<Skills>, certificationModel: Model<Certification>, langModel: Model<Language>);
    createResume(data: any): Promise<Resume>;
    getResumesByUserId(userId: string): Promise<PopulatedResume | null>;
    getResumeById(id: string): Promise<Resume | null>;
    updateResume(id: string, updateData: Partial<Resume>): Promise<Resume | null>;
    deleteResume(id: string): Promise<Resume | null>;
}
