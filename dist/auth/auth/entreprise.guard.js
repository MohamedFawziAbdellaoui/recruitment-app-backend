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
var EntrepriseGuard_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.EntrepriseGuard = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
let EntrepriseGuard = EntrepriseGuard_1 = class EntrepriseGuard {
    constructor(jwtService) {
        this.jwtService = jwtService;
        this.logger = new common_1.Logger(EntrepriseGuard_1.name);
    }
    canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const token = request.headers.authorization;
        try {
            const decoded = this.jwtService.verify(token);
            this.logger.debug(`Decoded JWT payload: ${JSON.stringify(decoded)}`);
            if (decoded && decoded.type === 'entreprise') {
                return true;
            }
            throw new common_1.ForbiddenException('Access denied. User is not an entreprise.');
        }
        catch (error) {
            throw new common_1.ForbiddenException('Access denied. Invalid or missing token.');
        }
    }
};
exports.EntrepriseGuard = EntrepriseGuard;
exports.EntrepriseGuard = EntrepriseGuard = EntrepriseGuard_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService])
], EntrepriseGuard);
//# sourceMappingURL=entreprise.guard.js.map