"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplicationService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
const application_schema_1 = require("../schemas/application.schema");
const job_schema_1 = require("../../job/schemas/job.schema");
const user_schema_1 = require("../../auth/schemas/user.schema");
let ApplicationService = class ApplicationService {
    constructor(applicationModel, jobModel, userModel) {
        this.applicationModel = applicationModel;
        this.jobModel = jobModel;
        this.userModel = userModel;
    }
    async getAllApplications() {
        const applications = await this.applicationModel.find().exec();
        const applicationData = [];
        for (const application of applications) {
            const job = await this.jobModel.findById(application.job_id).exec();
            const applicant = await this.userModel
                .findById(application.user_id)
                .exec();
            const publisher = await this.userModel
                .findById(application.entreprise_id)
                .exec();
            if (job && applicant && publisher) {
                const applicationWithJobUser = {
                    id: application._id,
                    application: application,
                    job: job,
                    applicant: applicant,
                    publisher: publisher,
                };
                applicationData.push(applicationWithJobUser);
            }
        }
        return applicationData;
    }
    async getApplicationsByApplicantId(applicantId) {
        const applications = await this.applicationModel
            .find({ user_id: applicantId })
            .exec();
        const applicationData = [];
        for (const application of applications) {
            const job = await this.jobModel.findById(application.job_id).exec();
            const applicant = await this.userModel
                .findById(application.user_id)
                .exec();
            const publisher = await this.userModel
                .findById(application.entreprise_id)
                .exec();
            if (job && applicant && publisher) {
                const applicationWithJobUser = {
                    id: application._id,
                    application: application,
                    job: job,
                    applicant: applicant,
                    publisher: publisher,
                };
                applicationData.push(applicationWithJobUser);
            }
        }
        return applicationData;
    }
    async getApplicationsByEntrepriseId(entrepriseId) {
        const applications = await this.applicationModel
            .find({ entreprise_id: entrepriseId })
            .exec();
        const applicationData = [];
        for (const application of applications) {
            const job = await this.jobModel.findById(application.job_id).exec();
            const applicant = await this.userModel
                .findById(application.user_id)
                .exec();
            const publisher = await this.userModel
                .findById(application.entreprise_id)
                .exec();
            if (job && applicant && publisher) {
                const applicationWithJobUser = {
                    id: application._id,
                    application: application,
                    job: job,
                    applicant: applicant,
                    publisher: publisher,
                };
                applicationData.push(applicationWithJobUser);
            }
        }
        return applicationData;
    }
    async getApplicationById(applicationId) {
        const application = await this.applicationModel
            .findById(applicationId)
            .exec();
        if (!application) {
            throw new common_1.NotFoundException('Application not found');
        }
        const job = await this.jobModel.findById(application.job_id).exec();
        const applicant = await this.userModel.findById(application.user_id).exec();
        const publisher = await this.userModel
            .findById(application.entreprise_id)
            .exec();
        if (!job || !applicant || !publisher) {
            throw new common_1.NotFoundException('Related data not found');
        }
        return {
            id: application._id,
            application: application,
            job: job,
            applicant: applicant,
            publisher: publisher,
        };
    }
    async applyForJob(applicationData) {
        const application = new this.applicationModel(applicationData);
        const savedApplication = await application.save();
        await this.updateJobApplicants(savedApplication.job_id, savedApplication.user_id);
        return savedApplication;
    }
    async updateJobApplicants(jobId, userId) {
        const job = await this.jobModel.findById(jobId).exec();
        if (!job) {
            throw new common_1.NotFoundException('Job not found');
        }
        job.applicants_ids.push(userId);
        await job.save();
    }
    async getApplicationsByJobId(jobId) {
        return this.applicationModel.find({ job_id: jobId }).exec();
    }
    async getApplicationsByStatus(status) {
        const applications = await this.applicationModel.find({ status }).exec();
        const applicationData = [];
        for (const application of applications) {
            const job = await this.jobModel.findById(application.job_id).exec();
            const applicant = await this.userModel
                .findById(application.user_id)
                .exec();
            const publisher = await this.userModel
                .findById(application.entreprise_id)
                .exec();
            if (job && applicant && publisher) {
                const applicationWithJobUser = {
                    id: application._id,
                    application: application,
                    job: job,
                    applicant: applicant,
                    publisher: publisher,
                };
                applicationData.push(applicationWithJobUser);
            }
        }
        return applicationData;
    }
    async getApplicationsByUserId(userId) {
        return this.applicationModel.find({ user_id: userId }).exec();
    }
};
exports.ApplicationService = ApplicationService;
exports.ApplicationService = ApplicationService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)(application_schema_1.Application.name)),
    __param(1, (0, mongoose_2.InjectModel)(job_schema_1.default.name)),
    __param(2, (0, mongoose_2.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_1.Model,
        mongoose_1.Model, Object])
], ApplicationService);
//# sourceMappingURL=application.service.js.map