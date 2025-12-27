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
exports.ResumeService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const resume_schema_1 = require("../schemas/resume.schema");
const mongoose_2 = require("mongoose");
const education_schema_1 = require("../schemas/education.schema");
const workexperience_schema_1 = require("../schemas/workexperience.schema");
const language_schema_1 = require("../schemas/language.schema");
const skill_schema_1 = require("../schemas/skill.schema");
const certification_schema_1 = require("../schemas/certification.schema");
let ResumeService = class ResumeService {
    constructor(resumeModel, educationModel, workExperienceModel, languageModel, skillsModel, certificationModel, langModel) {
        this.resumeModel = resumeModel;
        this.educationModel = educationModel;
        this.workExperienceModel = workExperienceModel;
        this.languageModel = languageModel;
        this.skillsModel = skillsModel;
        this.certificationModel = certificationModel;
        this.langModel = langModel;
    }
    async createResume(data) {
        if (data.file &&
            !(data.education ||
                data.workExperience ||
                data.skills ||
                data.certifications ||
                data.languages)) {
            return await new this.resumeModel(data);
        }
        else if (data.education ||
            data.workExperience ||
            data.skills ||
            data.certifications ||
            data.languages) {
            const educationIds = [];
            const workIds = [];
            const skillIds = [];
            const certifIds = [];
            const languageIds = [];
            for (const ed of data.education) {
                const newEd = await this.educationModel.create(ed);
                educationIds.push(newEd._id.toString());
            }
            for (const work of data.workExperience) {
                const newWork = await this.workExperienceModel.create(work);
                workIds.push(newWork._id.toString());
            }
            for (const skill of data.skills) {
                const newSkill = await this.skillsModel.create(skill);
                skillIds.push(newSkill._id.toString());
            }
            for (const cert of data.certifications) {
                const newCert = await this.certificationModel.create(cert);
                certifIds.push(newCert._id.toString());
            }
            for (const lang of data.languages) {
                const newLang = await this.languageModel.create(lang);
                languageIds.push(newLang._id.toString());
            }
            data.education = educationIds;
            data.workExperience = workIds;
            data.skills = skillIds;
            data.certifications = certifIds;
            data.languages = languageIds;
            return await this.resumeModel.create(data);
        }
    }
    async getResumesByUserId(userId) {
        const resume = await this.resumeModel.findOne({ userId }).exec();
        if (!resume) {
            return null;
        }
        const education = await this.educationModel
            .find({ _id: { $in: resume.education } })
            .exec();
        const workExperience = await this.workExperienceModel
            .find({ _id: { $in: resume.workExperience } })
            .exec();
        const skills = await this.skillsModel
            .find({ _id: { $in: resume.skills } })
            .exec();
        const certifications = await this.certificationModel
            .find({ _id: { $in: resume.certifications } })
            .exec();
        const languages = await this.langModel
            .find({ _id: { $in: resume.languages } })
            .exec();
        return {
            ...resume.toObject(),
            education,
            workExperience,
            skills,
            certifications,
            languages,
        };
    }
    async getResumeById(id) {
        return this.resumeModel
            .findById(id)
            .populate('education workExperience skills certifications languages')
            .exec();
    }
    async updateResume(id, updateData) {
        return this.resumeModel
            .findByIdAndUpdate(id, updateData, { new: true })
            .exec();
    }
    async deleteResume(id) {
        return this.resumeModel.findByIdAndDelete(id).exec();
    }
};
exports.ResumeService = ResumeService;
exports.ResumeService = ResumeService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(resume_schema_1.Resume.name)),
    __param(1, (0, mongoose_1.InjectModel)(education_schema_1.Education.name)),
    __param(2, (0, mongoose_1.InjectModel)(workexperience_schema_1.WorkExperience.name)),
    __param(3, (0, mongoose_1.InjectModel)(language_schema_1.Language.name)),
    __param(4, (0, mongoose_1.InjectModel)(skill_schema_1.Skills.name)),
    __param(5, (0, mongoose_1.InjectModel)(certification_schema_1.Certification.name)),
    __param(6, (0, mongoose_1.InjectModel)(language_schema_1.Language.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], ResumeService);
//# sourceMappingURL=resume.service.js.map