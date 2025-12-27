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
exports.JobController = void 0;
const common_1 = require("@nestjs/common");
const job_service_1 = require("./job.service");
const job_schema_1 = require("../schemas/job.schema");
const passport_1 = require("@nestjs/passport");
let JobController = class JobController {
    constructor(jobService) {
        this.jobService = jobService;
    }
    async getAllJobs() {
        return this.jobService.findAll();
    }
    async getJobsByCity(city) {
        return this.jobService.findByCity(city);
    }
    async getJobsByStartDate(startDate) {
        return this.jobService.findByStartDate(startDate);
    }
    async getJobsByPriceAndType(minPrice, maxPrice, pricingType) {
        return this.jobService.findByPriceAndType(minPrice, maxPrice, pricingType);
    }
    async getJobsByUserID(userID) {
        try {
            const jobs = await this.jobService.findJobsByUserID(userID);
            return jobs;
        }
        catch (error) {
            throw new Error('Failed to fetch jobs by user ID');
        }
    }
    async getJobsByDateRange(startDate, endDate) {
        const parsedStartDate = new Date(startDate);
        const parsedEndDate = new Date(endDate);
        return this.jobService.findByDateRange(parsedStartDate, parsedEndDate);
    }
    async getJobById(id) {
        return this.jobService.findById(id);
    }
    async createJob(jobData, req) {
        const entreprise_id = req.user.id;
        jobData.entreprise_id = entreprise_id;
        return this.jobService.createJob(jobData);
    }
};
exports.JobController = JobController;
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], JobController.prototype, "getAllJobs", null);
__decorate([
    (0, common_1.Get)('byCity'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    __param(0, (0, common_1.Query)('city')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], JobController.prototype, "getJobsByCity", null);
__decorate([
    (0, common_1.Get)('/byStartDate'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    __param(0, (0, common_1.Query)('startDate')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Date]),
    __metadata("design:returntype", Promise)
], JobController.prototype, "getJobsByStartDate", null);
__decorate([
    (0, common_1.Get)('/byPriceAndType'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    __param(0, (0, common_1.Query)('minPrice')),
    __param(1, (0, common_1.Query)('maxPrice')),
    __param(2, (0, common_1.Query)('pricingType')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, String]),
    __metadata("design:returntype", Promise)
], JobController.prototype, "getJobsByPriceAndType", null);
__decorate([
    (0, common_1.Get)('by-user'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    __param(0, (0, common_1.Query)('userID')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], JobController.prototype, "getJobsByUserID", null);
__decorate([
    (0, common_1.Get)('byDateRange'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    __param(0, (0, common_1.Param)('startDate')),
    __param(1, (0, common_1.Param)('endDate')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], JobController.prototype, "getJobsByDateRange", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], JobController.prototype, "getJobById", null);
__decorate([
    (0, common_1.Post)('create'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [job_schema_1.default, Object]),
    __metadata("design:returntype", Promise)
], JobController.prototype, "createJob", null);
exports.JobController = JobController = __decorate([
    (0, common_1.Controller)('job'),
    __metadata("design:paramtypes", [job_service_1.JobService])
], JobController);
//# sourceMappingURL=job.controller.js.map