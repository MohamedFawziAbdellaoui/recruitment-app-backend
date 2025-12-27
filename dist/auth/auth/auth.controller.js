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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const passport_1 = require("@nestjs/passport");
const multer_1 = require("@nestjs/platform-express/multer");
const multer_2 = require("multer");
const path = require("path");
const uuid_1 = require("uuid");
const fs = require("fs");
const util_1 = require("util");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    async login(loginData) {
        try {
            const { email, password } = loginData;
            const result = await this.authService.login(email, password);
            return result;
        }
        catch (error) {
            throw error;
        }
    }
    async signUp(signUpData) {
        const { user, resume } = signUpData;
        return this.authService.signUp(user, resume);
    }
    async uploadAvatar(avatar) {
        const avatarPath = avatar ? `/uploads/avatars/${avatar.filename}` : null;
        return { avatarPath };
    }
    async uploadIdentityPic(identityPic) {
        const identityPicPath = identityPic
            ? `/uploads/identities/${identityPic.filename}`
            : null;
        return { identityPicPath };
    }
    async getAvatarByPath(imagePath) {
        if (!imagePath) {
            throw new common_1.NotFoundException('Image path parameter is missing');
        }
        const fullPath = path.join(process.cwd(), 'uploads/avatars/', imagePath);
        if (!fs.existsSync(fullPath)) {
            throw new common_1.NotFoundException(`Image at path ${imagePath} not found`);
        }
        const readFile = (0, util_1.promisify)(fs.readFile);
        try {
            const imageBuffer = await readFile(fullPath);
            return new common_1.StreamableFile(imageBuffer);
        }
        catch (error) {
            throw new common_1.NotFoundException(`Error reading image at path ${imagePath}`);
        }
    }
    async getIdentiyPicByPath(imagePath) {
        if (!imagePath) {
            throw new common_1.NotFoundException('Image path parameter is missing');
        }
        const fullPath = path.join(process.cwd(), 'uploads/identities/', imagePath);
        if (!fs.existsSync(fullPath)) {
            throw new common_1.NotFoundException(`Image at path ${imagePath} not found`);
        }
        const readFile = (0, util_1.promisify)(fs.readFile);
        try {
            const imageBuffer = await readFile(fullPath);
            return new common_1.StreamableFile(imageBuffer);
        }
        catch (error) {
            throw new common_1.NotFoundException(`Error reading image at path ${imagePath}`);
        }
    }
    async getUserById(id) {
        const user = await this.authService.getUserById(id);
        if (!user) {
            throw new common_1.NotFoundException(`User with ID ${id} not found`);
        }
        console.log(user);
        return user;
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.Post)('signup'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signUp", null);
__decorate([
    (0, common_1.Post)('/upload-avatar'),
    (0, common_1.UseInterceptors)((0, multer_1.FileInterceptor)('avatar', {
        storage: (0, multer_2.diskStorage)({
            destination: './uploads/avatars',
            filename: (req, file, cb) => {
                const filename = `${(0, uuid_1.v4)()}${file.originalname}`;
                cb(null, filename);
            },
        }),
    })),
    __param(0, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "uploadAvatar", null);
__decorate([
    (0, common_1.Post)('/upload-identity-pic'),
    (0, common_1.UseInterceptors)((0, multer_1.FileInterceptor)('identityPic', {
        storage: (0, multer_2.diskStorage)({
            destination: './uploads/identities',
            filename: (req, file, cb) => {
                const filename = `${(0, uuid_1.v4)()}${file.originalname}`;
                cb(null, filename);
            },
        }),
    })),
    __param(0, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "uploadIdentityPic", null);
__decorate([
    (0, common_1.Get)('avatar/:path'),
    __param(0, (0, common_1.Param)('path')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "getAvatarByPath", null);
__decorate([
    (0, common_1.Get)('identityPic/:path'),
    __param(0, (0, common_1.Param)('path')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "getIdentiyPicByPath", null);
__decorate([
    (0, common_1.Get)('user/:id'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "getUserById", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map