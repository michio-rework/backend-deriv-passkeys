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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PasskeyService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const server_1 = require("@simplewebauthn/server");
const auth_service_1 = require("../auth/auth.service");
const prisma_service_1 = require("../prisma/prisma.service");
const user_service_1 = require("../user/user.service");
let PasskeyService = class PasskeyService {
    constructor(configService, userService, prismaService, authService) {
        this.configService = configService;
        this.userService = userService;
        this.prismaService = prismaService;
        this.authService = authService;
    }
    async getUserAuthenticators(user) {
        return this.prismaService.passkeyAuthenticator.findMany({
            where: {
                userId: user.id,
            },
        });
    }
    async getUserCredentials(user) {
        const authenticators = await this.getUserAuthenticators(user);
        const credentials = authenticators.map((authenticator) => ({
            id: authenticator.credentialID,
            type: 'public-key',
        }));
        return credentials;
    }
    async checkStaleRegistrationChallenge(user) {
        const staleChallenge = await this.prismaService.passkeyRegistrationChallenge.findFirst({
            where: {
                verified: false,
                userId: user.id,
                active: true,
            },
        });
        if (staleChallenge !== null) {
            await this.prismaService.passkeyRegistrationChallenge.update({
                where: { id: staleChallenge.id },
                data: {
                    active: false,
                },
            });
        }
    }
    async checkStaleLoginChallenge(user) {
        const staleChallenge = await this.prismaService.passkeyLoginChallenge.findFirst({
            where: {
                verified: false,
                userId: user.id,
                active: true,
            },
        });
        if (staleChallenge !== null) {
            await this.prismaService.passkeyLoginChallenge.update({
                where: { id: staleChallenge.id },
                data: {
                    active: false,
                },
            });
        }
    }
    async requestRegisterPasskey(user) {
        await this.checkStaleRegistrationChallenge(user);
        const credentials = await this.getUserCredentials(user);
        const options = (0, server_1.generateRegistrationOptions)({
            rpName: this.configService.get('passkeys.rpName'),
            rpID: this.configService.get('passkeys.rpID'),
            userID: String(user.id),
            userName: user.email,
            attestationType: 'none',
            excludeCredentials: credentials,
        });
        await this.prismaService.passkeyRegistrationChallenge.create({
            data: {
                userId: user.id,
                challenge: options.challenge,
            },
        });
        return options;
    }
    async requestPasskeyLogin(email) {
        const user = await this.userService.findByPayload({ email });
        const credentials = await this.getUserCredentials(user);
        await this.checkStaleLoginChallenge(user);
        const options = (0, server_1.generateAuthenticationOptions)({
            allowCredentials: credentials,
            userVerification: 'preferred',
        });
        await this.prismaService.passkeyLoginChallenge.create({
            data: {
                userId: user.id,
                challenge: options.challenge,
            },
        });
        return options;
    }
    async registerPasskey({ user, credential, }) {
        const expectedChallenge = await this.prismaService.passkeyRegistrationChallenge.findFirst({
            where: {
                userId: user.id,
                active: true,
                verified: false,
            },
        });
        const { challenge } = expectedChallenge;
        const registrationOptions = {
            credential,
            expectedChallenge: challenge,
            expectedOrigin: this.configService.get('passkeys.origin'),
            expectedRPID: this.configService.get('passkeys.rpID'),
        };
        const { verified, registrationInfo } = await (0, server_1.verifyRegistrationResponse)(registrationOptions);
        if (verified) {
            await this.prismaService.passkeyRegistrationChallenge.update({
                where: { id: expectedChallenge.id },
                data: {
                    verified: true,
                    active: false,
                },
            });
            console.log('transports: ', credential.transports);
            await this.prismaService.passkeyAuthenticator.create({
                data: {
                    userId: user.id,
                    counter: registrationInfo.counter,
                    credentialID: registrationInfo.credentialID,
                    credentialPublicKey: registrationInfo.credentialPublicKey,
                    attestationFormat: registrationInfo.attestationObject,
                    credentialDeviceType: registrationInfo.credentialDeviceType,
                    transports: credential.transports,
                },
            });
            return { verified };
        }
        else {
            const message = 'Verfication Not OK!';
            throw new common_1.HttpException(message, common_1.HttpStatus.BAD_REQUEST, {
                cause: new Error(message),
            });
        }
    }
    async passkeyLogin(passkeyLoginDto) {
        const { credential, email } = passkeyLoginDto;
        try {
            const user = await this.userService.findByPayload({ email });
            const expectedChallenge = await this.prismaService.passkeyLoginChallenge.findFirst({
                where: {
                    userId: user.id,
                    active: true,
                    verified: false,
                },
            });
            const { challenge } = expectedChallenge;
            const validAuthenticator = await this.prismaService.passkeyAuthenticator.findFirstOrThrow({
                where: {
                    userId: user.id,
                    credentialID: Buffer.from(credential.id, 'base64'),
                },
            });
            const { transports } = validAuthenticator, rest = __rest(validAuthenticator, ["transports"]);
            const { verified, authenticationInfo } = await (0, server_1.verifyAuthenticationResponse)({
                credential,
                expectedChallenge: challenge,
                expectedOrigin: this.configService.get('passkeys.origin'),
                expectedRPID: this.configService.get('passkeys.rpID'),
                authenticator: rest,
            });
            await this.prismaService.passkeyLoginChallenge.update({
                where: {
                    id: expectedChallenge.id,
                },
                data: {
                    verified: true,
                    active: false,
                },
            });
            await this.prismaService.passkeyAuthenticator.update({
                where: {
                    id: validAuthenticator.id,
                },
                data: {
                    counter: authenticationInfo.newCounter,
                },
            });
            const token = this.authService.createToken(user);
            const status = {
                id: user.id,
                email: user.email,
                token,
                verified,
                credential,
                success: true,
                message: 'PASSKEY_LOGIN_SUCCESS',
            };
            return status;
        }
        catch (error) {
            throw new common_1.HttpException(new Error(error), common_1.HttpStatus.BAD_REQUEST);
        }
    }
};
PasskeyService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService,
        user_service_1.UserService,
        prisma_service_1.PrismaService,
        auth_service_1.AuthService])
], PasskeyService);
exports.PasskeyService = PasskeyService;
//# sourceMappingURL=passkeys.service.js.map