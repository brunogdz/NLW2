import knex from 'knex';
import path from 'path';

// useNullAsDefault: true -> o que ele encontrar com nada preenchido ele vai setar para NULL

const db = knex({
    client: 'sqlite3',
    connection: {
        filename: path.resolve(__dirname, 'database.sqlite')
    },
    useNullAsDefault: true, 
});

export default db;
