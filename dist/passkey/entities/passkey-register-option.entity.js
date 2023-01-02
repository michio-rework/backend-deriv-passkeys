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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PasskeyRegisterOpitonEntity = void 0;
const swagger_1 = require("@nestjs/swagger");
class PasskeyRegisterOpitonEntity {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Object)
], PasskeyRegisterOpitonEntity.prototype, "user", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], PasskeyRegisterOpitonEntity.prototype, "challenge", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Array)
], PasskeyRegisterOpitonEntity.prototype, "excludeCredentials", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Object)
], PasskeyRegisterOpitonEntity.prototype, "extensions", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], PasskeyRegisterOpitonEntity.prototype, "attestation", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Object)
], PasskeyRegisterOpitonEntity.prototype, "authenticatorSelection", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Array)
], PasskeyRegisterOpitonEntity.prototype, "pubKeyCredParams", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Relying Party' }),
    __metadata("design:type", Object)
], PasskeyRegisterOpitonEntity.prototype, "rp", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], PasskeyRegisterOpitonEntity.prototype, "timeout", void 0);
exports.PasskeyRegisterOpitonEntity = PasskeyRegisterOpitonEntity;
//# sourceMappingURL=passkey-register-option.entity.js.map