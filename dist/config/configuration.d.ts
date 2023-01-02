declare const _default: () => {
    app: {
        port: string | number;
    };
    jwt: {
        secret: string;
        expiration: string;
    };
    passkeys: {
        rpName: string;
        rpID: string;
        origin: string;
    };
};
export default _default;
