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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_schema_1 = require("../schemas/user.schema");
const bcrypt = require("bcryptjs");
const jwt_1 = require("@nestjs/jwt");
const resume_service_1 = require("../../resume/resume/resume.service");
let AuthService = class AuthService {
    constructor(userModel, jwtService, resumeService) {
        this.userModel = userModel;
        this.jwtService = jwtService;
        this.resumeService = resumeService;
    }
    async signUp(user, resume) {
        const existingUser = await this.userModel.findOne({ email: user.email });
        if (existingUser) {
            new common_1.InternalServerErrorException('User with this email already exists');
        }
        const hashedPassword = await bcrypt.hash(user.password, 10);
        user.password = hashedPassword;
        const createdUser = await this.userModel.create(user);
        if (user.type === 'employee') {
            resume.userId = createdUser._id.toString();
            const createdResume = await this.resumeService.createResume(resume);
        }
        const token = this.jwtService.sign({
            id: createdUser._id,
            type: user.type,
        });
        return {
            token,
            userId: createdUser._id.toString(),
            type: createdUser.type,
        };
    }
    async login(email, password) {
        try {
            const user = await this.userModel.findOne({ email });
            if (!user) {
                throw new Error('User not found');
            }
            const passwordMatch = await bcrypt.compare(password, user.password);
            if (!passwordMatch) {
                throw new Error('Incorrect password');
            }
            const token = this.jwtService.sign({ id: user._id, type: user.type });
            return { token, userId: user._id.toString(), type: user.type };
        }
        catch (error) {
            if (error.message === 'User not found') {
                throw new common_1.NotFoundException('User not found');
            }
            else if (error.message === 'Incorrect password') {
                throw new common_1.UnauthorizedException('Incorrect password');
            }
            else {
                throw new common_1.InternalServerErrorException('Internal server error');
            }
        }
    }
    async getUserById(id) {
        return this.userModel.findById(id).exec();
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        jwt_1.JwtService,
        resume_service_1.ResumeService])
], AuthService);
//# sourceMappingURL=auth.service.js.map