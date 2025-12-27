/// <reference types="multer" />
import { StreamableFile } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from 'src/auth/schemas/user.schema';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(loginData: {
        email: string;
        password: string;
    }): Promise<{
        token: string;
        userId: string;
        type: string;
    }>;
    signUp(signUpData: any): Promise<{
        token: string;
        userId: string;
        type: string;
    }>;
    uploadAvatar(avatar: Express.Multer.File): Promise<{
        avatarPath: string;
    }>;
    uploadIdentityPic(identityPic: Express.Multer.File): Promise<{
        identityPicPath: string;
    }>;
    getAvatarByPath(imagePath: string): Promise<StreamableFile>;
    getIdentiyPicByPath(imagePath: string): Promise<StreamableFile>;
    getUserById(id: string): Promise<User>;
}
