import { ResumeService } from './resume.service';
export declare class ResumeController {
    private readonly resumeService;
    constructor(resumeService: ResumeService);
    createResume(createResumeDto: any): Promise<import("../schemas/resume.schema").Resume>;
    getResumeById(id: string): Promise<import("../schemas/resume.schema").Resume>;
    getResumesByUserId(userId: string): Promise<import("../schemas/populated-resume.interface").PopulatedResume>;
    updateResume(id: string, updateResumeDto: any): Promise<import("../schemas/resume.schema").Resume>;
    deleteResume(id: string): Promise<import("../schemas/resume.schema").Resume>;
}
