import { desc } from 'drizzle-orm';
import swaggerJSDoc, { Options } from 'swagger-jsdoc';

const swaggerOptions: Options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'FirmFit API',
            version: '1.0.0',
            description: 'FirmFit API Documentation',
        },
        servers: [
            {
                url: `http://localhost:${process.env.PORT || 3000}`,
                description: 'Development server',
            },
            {
                url: `${process.env.BASE_URL}`,
                description: 'Production server',
            },
        ],
        components: {
            schemas: {
                Users: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'integer',
                            example: 1
                        },
                        username: {
                            type: 'string',
                            example: 'john_doe'
                        },
                        email: {
                            type: 'string',
                            example: 'john@example.com'
                        },
                        password: {
                            type: 'string',
                            example: 'password123'
                        },
                        role: {
                            type: 'string',
                            example: 'member'
                        },
                        gymId: {
                            type: 'integer',
                            example: 1
                        },
                        createdAt: {
                            type: 'string',
                            format: 'date-time',
                            example: '2023-01-01T00:00:00Z'
                        },
                        updatedAt: {
                            type: 'string',
                            format: 'date-time',
                            example: '2023-01-01T00:00:00Z'
                        }
                    }
                },
                Login: {
                    type: 'object',
                    properties: {
                        username: {
                            type: 'string',
                            example: 'john_doe'
                        },
                        email: {
                            type: 'string',
                            example: 'john@example.com'
                        },
                        password: {
                            type: 'string',
                            example: 'password123'
                        }
                    }
                }
            }
        }
    },
    apis: ['./src/routes/**/*.ts'],
};

export default swaggerOptions;