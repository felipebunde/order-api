const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Gerenciamento de Pedidos',
      version: '1.0.0',
      description: 'API para gerenciar pedidos com transformação automática de dados e autenticação JWT',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Servidor local',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Insira o token JWT no formato: Bearer SEU_TOKEN'
        }
      }
    },
    security: [{
      bearerAuth: []
    }]
  },
  apis: ['./src/routes/*.js'],
};

const specs = swaggerJsdoc(options);

const setupSwagger = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, {
    swaggerOptions: {
      persistAuthorization: true, // Mantém o token mesmo atualizando a página
      displayRequestDuration: true,
      filter: true,
    }
  }));
  console.log('📚 Swagger disponível em: http://localhost:3000/api-docs');
  console.log('🔐 Botão "Authorize" disponível para autenticação JWT');
};

module.exports = setupSwagger;