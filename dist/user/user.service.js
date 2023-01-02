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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const bcrypt_1 = require("bcrypt");
let UserService = class UserService {
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    async create(userDto) {
        const userInDb = await this.prismaService.user.findFirst({
            where: { email: userDto.email },
        });
        if (userInDb) {
            throw new common_1.HttpException('user_already_exist', common_1.HttpStatus.CONFLICT);
        }
        return await this.prismaService.user.create({
            data: Object.assign(Object.assign({}, userDto), { password: await (0, bcrypt_1.hash)(userDto.password, 10) }),
        });
    }
    async findByLogin({ email, password, }) {
        const user = await this.prismaService.user.findFirst({
            where: { email },
        });
        if (!user) {
            throw new common_1.HttpException('invalid_credentials', common_1.HttpStatus.UNAUTHORIZED);
        }
        const areEqual = await (0, bcrypt_1.compare)(password, user.password);
        if (!areEqual) {
            throw new common_1.HttpException('invalid_credentials', common_1.HttpStatus.UNAUTHORIZED);
        }
        const { password: p } = user, rest = __rest(user, ["password"]);
        return rest;
    }
    async findByPayload({ email }) {
        const user = await this.prismaService.user.findFirst({
            where: { email },
        });
        return user;
    }
    async getMe(user) {
        const userData = await this.prismaService.user.findFirstOrThrow({
            where: { email: user.email },
            include: { PasskeyAuthenticators: true },
        });
        const response = {
            email: userData.email,
            authenticators: [],
        };
        if (userData.PasskeyAuthenticators.length) {
            response.authenticators = userData.PasskeyAuthenticators.map((authenticator) => (Object.assign(Object.assign({}, authenticator), { credentialID: authenticator.credentialID.toString('base64'), credentialPublicKey: authenticator.credentialPublicKey.toString('base64'), attestationFormat: authenticator.attestationFormat.toString('base64') })));
        }
        return response;
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map