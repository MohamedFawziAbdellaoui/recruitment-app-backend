import { Model } from 'mongoose';
import { User } from 'src/auth/schemas/user.schema';
import { JwtService } from '@nestjs/jwt';
import { ResumeService } from 'src/resume/resume/resume.service';
export declare class AuthService {
    private userModel;
    private jwtService;
    private resumeService;
    constructor(userModel: Model<User>, jwtService: JwtService, resumeService: ResumeService);
    signUp(user: User, resume: any): Promise<{
        token: string;
        userId: string;
        type: string;
    }>;
    login(email: any, password: any): Promise<{
        token: string;
        userId: string;
        type: string;
    }>;
    getUserById(id: string): Promise<User | null>;
}
