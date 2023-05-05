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
const getUsers = async () => {
    let client, result;
    try {
        //connect to db
        client = await pool.connect()
        //collect command from queries.js and call to db
        const data = await client.query(queries.getAllUsers)
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
const createUser = async (body, admin = "") => {
    console.log(body.email, body.firstname, body.lastname, body.whatsapp, body.password)
    let role;
    if (admin) { role = "admin" } else {
        role = "user"
    }

    let client, result;
    try {
        client = await pool.connect();
        await client.query(queries.addUser, [body.email, body.firstname, body.lastname, body.whatsapp, body.password]);

        await client.query(queries.addRole, [body.email, role]);

        result = { ok: true, msg: "user added" }
    } catch (error) {
        console.log(error)
        throw error
    } finally { client.release() }
    return result
}

const changeUser = async (newData) => {
    console.log(newData.firstname, newData.lastname, newData.whatsapp, newData.password, newData.email)
    let client, result;
    try {
        //connect to db
        client = await pool.connect()
        //make call, using command collected from queries.js 
        const data = await client.query(queries.updateUserDetails, [newData.firstname, newData.lastname, newData.whatsapp, newData.password, newData.email])

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
        //make call, using command collected from queries.js 
        result = await client.query(queries.deleteUser, [email])
    } catch (error) {
        console.log(error)
        throw error
    } finally { client.release() }
    return result
}


module.exports = { getUsers, getOneUser, createUser, changeUser, removeUser }