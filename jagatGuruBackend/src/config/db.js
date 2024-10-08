import mysql from "mysql";
// MySQL connection setup
export const server = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'jagatGuru'
});