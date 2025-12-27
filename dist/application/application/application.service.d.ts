import { Model } from 'mongoose';
import { Application } from '../schemas/application.schema';
import Job from 'src/job/schemas/job.schema';
import { ApplicationWithJobUser } from '../schemas/fullapp.schema';
export declare class ApplicationService {
    private readonly applicationModel;
    private readonly jobModel;
    private readonly userModel;
    constructor(applicationModel: Model<Application>, jobModel: Model<Job>, userModel: any);
    getAllApplications(): Promise<ApplicationWithJobUser[]>;
    getApplicationsByApplicantId(applicantId: string): Promise<ApplicationWithJobUser[]>;
    getApplicationsByEntrepriseId(entrepriseId: string): Promise<ApplicationWithJobUser[]>;
    getApplicationById(applicationId: string): Promise<ApplicationWithJobUser | null>;
    applyForJob(applicationData: any): Promise<Application>;
    private updateJobApplicants;
    getApplicationsByJobId(jobId: string): Promise<Application[]>;
    getApplicationsByStatus(status: string): Promise<ApplicationWithJobUser[]>;
    getApplicationsByUserId(userId: string): Promise<Application[]>;
}
