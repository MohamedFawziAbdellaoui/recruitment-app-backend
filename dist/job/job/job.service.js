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
exports.JobService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const job_schema_1 = require("../schemas/job.schema");
const mongoose = require("mongoose");
const moment = require("moment");
let JobService = class JobService {
    constructor(jobModel) {
        this.jobModel = jobModel;
    }
    async findJobsByUserID(userID) {
        try {
            const jobs = await this.jobModel
                .find({ applicants_ids: { $all: [userID] } })
                .exec();
            return jobs;
        }
        catch (error) {
            throw new Error('Failed to fetch jobs by user ID');
        }
    }
    async findAll() {
        const jobs = await this.jobModel.find().exec();
        return jobs;
    }
    async createJob(job) {
        const res = await this.jobModel.create(job);
        return res;
    }
    async findById(id) {
        return this.jobModel.findById(id).exec();
    }
    async findByCity(city) {
        return this.jobModel
            .find({ address: { $regex: city, $options: 'i' } })
            .exec();
    }
    async findByStartDate(startDate) {
        return this.jobModel.find({ startDate: startDate }).exec();
    }
    async findByPriceAndType(minPrice, maxPrice, pricingType) {
        return this.jobModel
            .find({
            price: { $gte: minPrice, $lte: maxPrice },
            pricing_type: pricingType,
        })
            .exec();
    }
    async findByDateRange(startDate, endDate) {
        return this.jobModel
            .find({
            startDate: {
                $gte: moment(startDate).format(),
            },
            endDate: {
                $lte: moment(endDate).format(),
            },
        })
            .exec();
    }
};
exports.JobService = JobService;
exports.JobService = JobService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(job_schema_1.default.name)),
    __metadata("design:paramtypes", [mongoose.Model])
], JobService);
//# sourceMappingURL=job.service.js.map