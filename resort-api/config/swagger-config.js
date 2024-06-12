const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    swaggerDefinition: {
        info: {
            title: 'Your API Title',
            version: '1.0.0',
            description: 'Your API Description',
        },
        servers: [
            { url: 'http://localhost:3000' }, // Adjust the URL based on your server
        ],
    },
    apis: ['../routes/*.js'], // Adjust the path to your API routes
};

const specs = swaggerJsdoc(options);

module.exports = specs;
