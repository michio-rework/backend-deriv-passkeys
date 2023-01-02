"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, { cors: true });
    const configService = app.get(config_1.ConfigService);
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Passkeys')
        .setDescription('Passkeys Backend API')
        .setVersion('0.1')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('docs', app, document, {
        swaggerOptions: {
            defaultModelsExpandDepth: -1,
        },
    });
    app.useGlobalPipes(new common_1.ValidationPipe());
    app.enableCors({
        preflightContinue: true,
        optionsSuccessStatus: 204,
        allowedHeaders: ['Accept', 'Content-Type', 'Authorization'],
        origin: '*',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
        credentials: true,
    });
    await app.listen(configService.get('app.port'));
}
bootstrap();
//# sourceMappingURL=main.js.map