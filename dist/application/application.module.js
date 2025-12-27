"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplicationModule = void 0;
const common_1 = require("@nestjs/common");
const application_service_1 = require("./application/application.service");
const application_controller_1 = require("./application/application.controller");
const passport_1 = require("@nestjs/passport");
const mongoose_1 = require("@nestjs/mongoose");
const auth_module_1 = require("../auth/auth.module");
const application_schema_1 = require("./schemas/application.schema");
const job_module_1 = require("../job/job.module");
const job_schema_1 = require("../job/schemas/job.schema");
const user_schema_1 = require("../auth/schemas/user.schema");
let ApplicationModule = class ApplicationModule {
};
exports.ApplicationModule = ApplicationModule;
exports.ApplicationModule = ApplicationModule = __decorate([
    (0, common_1.Module)({
        imports: [
            passport_1.PassportModule.register({ defaultStrategy: 'jwt' }),
            auth_module_1.AuthModule,
            job_module_1.JobModule,
            mongoose_1.MongooseModule.forFeature([
                { name: 'Application', schema: application_schema_1.ApplicationSchema },
                { name: 'Job', schema: job_schema_1.JobSchema },
                { name: 'User', schema: user_schema_1.UserSchema },
            ]),
        ],
        providers: [application_service_1.ApplicationService],
        controllers: [application_controller_1.ApplicationController],
    })
], ApplicationModule);
//# sourceMappingURL=application.module.js.map