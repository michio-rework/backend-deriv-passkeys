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
exports.PasskeyController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const login_options_passkey_dto_1 = require("./dto/login-options-passkey.dto");
const verify_login_passkey_dto_1 = require("./dto/verify-login-passkey.dto");
const verify_registration_passkey_dto_1 = require("./dto/verify-registration-passkey.dto");
const passkey_login_option_entity_1 = require("./entities/passkey-login-option.entity");
const passkey_login_verify_option_entity_1 = require("./entities/passkey-login-verify-option.entity");
const passkey_register_option_entity_1 = require("./entities/passkey-register-option.entity");
const passkey_register_verify_entity_1 = require("./entities/passkey-register-verify.entity");
const passkeys_service_1 = require("./passkeys.service");
let PasskeyController = class PasskeyController {
    constructor(passkeysService) {
        this.passkeysService = passkeysService;
    }
    passkeyRegisterOptions(req) {
        return this.passkeysService.requestRegisterPasskey(req.user);
    }
    passkeyVerfiyRegisterOptions(req, verifyRegistrationPasskeyDto) {
        return this.passkeysService.registerPasskey({
            user: req.user,
            credential: verifyRegistrationPasskeyDto.credential,
        });
    }
    passkeyLoginOptions(req, body) {
        return this.passkeysService.requestPasskeyLogin(body.email);
    }
    passkeyVerfiyLoginOptions(req, verifyLoginPasskeyDto) {
        return this.passkeysService.passkeyLogin(verifyLoginPasskeyDto);
    }
};
__decorate([
    (0, swagger_1.ApiOkResponse)({ type: passkey_register_option_entity_1.PasskeyRegisterOpitonEntity }),
    (0, common_1.Get)('register/options'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiSecurity)('access-key'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PasskeyController.prototype, "passkeyRegisterOptions", null);
__decorate([
    (0, common_1.Post)('register'),
    (0, swagger_1.ApiOkResponse)({ type: passkey_register_verify_entity_1.PasskeyRegisterVerifyEntity }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiSecurity)('access-token'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, verify_registration_passkey_dto_1.VerifyRegistrationPasskeyDto]),
    __metadata("design:returntype", void 0)
], PasskeyController.prototype, "passkeyVerfiyRegisterOptions", null);
__decorate([
    (0, common_1.Post)('login/options'),
    (0, swagger_1.ApiOkResponse)({ type: passkey_login_option_entity_1.PasskeyLoginOptionEntity }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, login_options_passkey_dto_1.LoginOptionsPasskeyDto]),
    __metadata("design:returntype", void 0)
], PasskeyController.prototype, "passkeyLoginOptions", null);
__decorate([
    (0, common_1.Post)('login'),
    (0, swagger_1.ApiOkResponse)({ type: passkey_login_verify_option_entity_1.PasskeyAuthenticationResponse }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, verify_login_passkey_dto_1.VerifyLoginPasskeyDto]),
    __metadata("design:returntype", void 0)
], PasskeyController.prototype, "passkeyVerfiyLoginOptions", null);
PasskeyController = __decorate([
    (0, swagger_1.ApiTags)('passkeys'),
    (0, common_1.Controller)('passkeys'),
    __metadata("design:paramtypes", [passkeys_service_1.PasskeyService])
], PasskeyController);
exports.PasskeyController = PasskeyController;
//# sourceMappingURL=passkey.controller.js.map