"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = () => ({
    app: {
        port: process.env.PORT || 3000,
    },
    jwt: {
        secret: process.env.SECRET || 'SECRET',
        expiration: process.env.EXPIRATION || '60 days',
    },
    passkeys: {
        rpName: process.env.RELYING_PARTY_NAME || 'Deriv POC PASSKEYS me',
        rpID: process.env.RELYING_PARTY_ID || 'localhost',
        origin: process.env.ORIGIN || `http://${process.env.RELYING_PARYT_ID}:5173`,
    },
});
//# sourceMappingURL=configuration.js.map