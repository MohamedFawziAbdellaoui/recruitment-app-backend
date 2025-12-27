import { User } from 'src/auth/schemas/user.schema';
import Job from 'src/job/schemas/job.schema';
import { Application } from './application.schema';
export declare class ApplicationWithJobUser {
    id: string;
    application: Application;
    job: Job;
    applicant: User;
    publisher: User;
}
