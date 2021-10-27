import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  const config = new DocumentBuilder()
    .setTitle('Swagger Mycontacts API 👾')
    .setDescription('Swagger Mycontacts CRUD API')
    .setVersion('1.0')
    .addTag('users')
    .setLicense('Apache 2.0', 'https://www.apache.org/licenses/LICENSE-2.0')
    .setContact('Swagger', 'http://swagger.io', 'apiteam@swagger.io')
    .build();
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT || 5000);
  console.log(
    `Swagger Mycontacts API 👾 is running on: ${await app.getUrl()}/api`
  );

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }

}
bootstrap();
