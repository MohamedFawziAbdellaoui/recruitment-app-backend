import Job from '../schemas/job.schema';
import * as mongoose from 'mongoose';
export declare class JobService {
    private jobModel;
    constructor(jobModel: mongoose.Model<Job>);
    findJobsByUserID(userID: string): Promise<Job[]>;
    findAll(): Promise<Job[]>;
    createJob(job: Job): Promise<Job>;
    findById(id: string): Promise<Job | null>;
    findByCity(city: string): Promise<Job[]>;
    findByStartDate(startDate: Date): Promise<Job[]>;
    findByPriceAndType(minPrice: number, maxPrice: number, pricingType: string): Promise<Job[]>;
    findByDateRange(startDate: Date, endDate: Date): Promise<(mongoose.Document<unknown, {}, Job> & Job & {
        _id: mongoose.Types.ObjectId;
    })[]>;
}
