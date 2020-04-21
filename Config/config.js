const env = require('dotenv');
env.config();
module.exports = {
    port: process.env.port,
    db_config: {

        host: 'swt-psql-server.postgres.database.azure.com',

        user: 'swtpsqladmin@swt-psql-server',

        password: 'ReggTop2six%',

        database: 'shred_db',

        ssl: true,

    },
    roles: {
        ADMIN: 'ADMIN',
        CLIENT: 'CLIENT',
        CUSTOMER: 'CUSTOMER'
    },
    jwt_secret: "Diatoz@123"
};