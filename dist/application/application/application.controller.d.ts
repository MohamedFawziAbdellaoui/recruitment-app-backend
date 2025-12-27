import { ApplicationService } from './application.service';
import { ApplicationWithJobUser } from '../schemas/fullapp.schema';
export declare class ApplicationController {
    private readonly applicationService;
    constructor(applicationService: ApplicationService);
    getAllApplications(): Promise<ApplicationWithJobUser[]>;
    getApplicationsByStatus(status: string): Promise<ApplicationWithJobUser[]>;
    applyForJob(applicationData: any): Promise<import("../schemas/application.schema").Application>;
    getApplicationsByJobId(jobId: string): Promise<import("../schemas/application.schema").Application[]>;
    getApplicationsByApplicantId(applicantId: string): Promise<ApplicationWithJobUser[]>;
    getApplicationsByEntrepriseId(entrepriseId: string): Promise<ApplicationWithJobUser[]>;
    getApplicationWithJobUser(applicationId: string): Promise<ApplicationWithJobUser | null>;
}
