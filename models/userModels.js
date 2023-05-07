const { Pool } = require('pg');

//import queries to database
const queries = require('./queries');

const pool = new Pool({
    host: process.env.ELEPHANT_HOST,
    user: process.env.ELEPHANT_USER,
    database: process.env.ELEPHANT_DB,
    password: process.env.ELEPHANT_PASS,
});

//get all users' details
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
        throw error
    } finally { client.release() }
    return result
}

//get one user's details
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
        throw error
    } finally { client.release() }
    return result
}

//create a new user
const createUser = async (body) => {
    const { email, name, id, role } = body


    let client, result;
    try {
        client = await pool.connect();
        await client.query(queries.addUser, [email, name, id]);

        await client.query(queries.addRole, [email, role]);

        result = { ok: true, msg: "user added" }
    } catch (error) {
        console.log(error)
        throw error
    } finally { client.release() }
    return result
}

const changeUser = async (newData) => {
    const { email, name, id } = newData
    let client, result;
    try {
        //connect to db
        client = await pool.connect()
        //make call, using command collected from queries.js 
        const data = await client.query(queries.updateUserDetails, [name, id, email])

        result = data.rows
    } catch (error) {
        console.log(error)
        throw error
    } finally { client.release() }

    return result
}

const removeUser = async (email) => {
    let client, result;
    try {
        //connect to db
        client = await pool.connect()
        //make call, using command collected from queries.js -first delete associated roles
        await client.query(queries.deleteUserRole, [email])
        result = await client.query(queries.deleteUser, [email])
    } catch (error) {
        console.log(error)
        throw error
    } finally { client.release() }
    return result
}


module.exports = { getUsers, getOneUser, createUser, changeUser, removeUser }