const { Pool } = require('pg');

//import queries to be made to database
const queries = require('./queries');

const pool = new Pool({
    host: process.env.ELEPHANT_HOST,
    user: process.env.ELEPHANT_USER,
    database: process.env.ELEPHANT_DB,
    password: process.env.ELEPHANT_PASS,
    port: 5432,
    ssl: { rejectUnauthorized: false },
});


/**
 * connects to db and retrieves all users' details
 * @param {Number} limit limit of rows to include in result
 * @param {Number} skip number or rows to skip before returning results
 * @returns returns array of rows (users) if successful
 */
const getUsers = async (limit, skip) => {
    let client, result;
    try {
        //connect to db
        client = await pool.connect()
        //collect command from queries.js and call to db
        const data = await client.query(queries.getAllUsers, [limit, skip])
        result = data.rows
    } catch (error) {
        console.log(error)
    } finally { client.release() }
    return result
}


/**
 * connects to db and retrieves details of user associated with provided email      
 * @param {String} email 
 * @returns returns array with one item if successful
 */
const getOneUser = async (email) => {

    let client, result;
    try {
        //connect to db
        client = await pool.connect()
        //collect command from queries.js and call to db
        const data = await client.query(queries.getUser, [email])
        result = data.rows
    } catch (error) {
        console.log(error)
    } finally { client.release() }
    return result
}


/**
 * inserts new entry into table "users" and associated entry into table "roles"
 * @param {Object} body must have properties: email, name, id and role (to be sent to table 'roles')
* @returns returns object with outcome if successful
*/
const createUser = async (body) => {
    const { email, name, id, role } = body
    console.log("in create", email, name, id, role)
    let client, result;
    try {
        //connect
        client = await pool.connect();
        //create row in table "users"
        await client.query(queries.addUser, [email, name, id]);
        //create row in table "roles"
        await client.query(queries.addRole, [email, role]);
        result = { ok: true, msg: "user added" }
    } catch (error) {
        console.log(error)
        throw error
    } finally { client.release() }
    return result
}

/**
 * Connects to db and commands update with provided data of row associated with email 
 * @param {Object} newData contains properties email, name and id
 * @returns Object with outcome if successful 
 */
const changeUser = async (newData) => {
    const { email, name, id } = newData
    let client, result;
    try {
        //connect to db
        client = await pool.connect()
        //make call, using command collected from queries.js 
        await client.query(queries.updateUserDetails, [name, id, email])
        result = { ok: true, msg: "user added" }
    } catch (error) {
        console.log(error)
        throw error
    } finally { client.release() }

    return result
}

/**
 * Connects to db and commands deletion of user associated with email
 * @param {String} email 
 * @returns outcome 
 */
const removeUser = async (email) => {
    let client, result;
    try {
        //connect to db
        client = await pool.connect()
        //make call, using command collected from queries.js -first delete associated roles
        await client.query(queries.deleteUserRole, [email])
        await client.query(queries.deleteUser, [email])
        result = { ok: true, msg: "user added" }
    } catch (error) {
        console.log(error)
        throw error
    } finally { client.release() }
    return result
}


module.exports = { getUsers, getOneUser, createUser, changeUser, removeUser }