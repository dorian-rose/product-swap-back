const { Pool } = require('pg');

//import queries to database
const queries = require('./queries');

const pool = new Pool({
    host: process.env.ELEPHANT_HOST,
    user: process.env.ELEPHANT_USER,
    database: process.env.ELEPHANT_DB,
    password: process.env.ELEPHANT_PASS,
});

const getAllProducts = async (user, limit, skip) => {

    let client, result, data;
    try {
        //connect to db
        client = await pool.connect()
        //make call, using command collected from queries.js 
        if (!user) {
            data = await client.query(queries.getAllEntries, [limit, skip])
        } else {
            data = await client.query(queries.getAllByUser, [user, limit, skip])
        }
        result = data.rows

    } catch (error) {
        console.log(error)
        throw error
    } finally { client.release() }

    return result
}

const getProductsByCategory = async (category, limit, skip) => {

    let client, result;
    try {
        //connect to db
        client = await pool.connect()
        //make call, using command collected from queries.js 
        const data = await client.query(queries.getByCategory, [category, limit, skip])
        result = data.rows
    } catch (error) {
        console.log(error)
        throw error
    } finally { client.release() }

    return result
}

const getProductById = async (id) => {

    let client, result;
    try {
        //connect to db
        client = await pool.connect()
        //make call, using command collected from queries.js 
        const data = await client.query(queries.getById, [id])
        result = data.rows
    } catch (error) {
        console.log(error)
        throw error
    } finally { client.release() }

    return result
}


const searchProducts = async (search, limit, skip, category) => {

    let client, result, data;
    try {
        //connect to db
        client = await pool.connect()
        //make call, using command collected from queries.js 
        if (!category) {

            data = await client.query(queries.searchEntries, [`%${search}%`, limit, skip])
        } else {

            data = await client.query(queries.searchEntriesCategory, [`%${search}%`, category, limit, skip])
        }

        result = data.rows
    } catch (error) {
        console.log(error)
        throw error
    } finally { client.release() }

    return result
}

const updateProduct = async (body) => {

    let client, result;
    try {
        //connect to db
        client = await pool.connect()
        //make call, using command collected from queries.js 
        const data = await client.query(queries.updateEntry, [body.title, body.description, body.image, body.category, body.email, body.claimed, body.id_entry])

        result = data.rows
    } catch (error) {
        console.log(error)
        throw error
    } finally { client.release() }

    return result
}

const createProduct = async (body) => {


    let client, result;
    try {
        //connect to db
        client = await pool.connect()
        //make call, using command collected from queries.js 
        const data = await client.query(queries.createEntry, [body.title, body.description, body.image, body.email, body.category, body.claimed])

        result = data.rows
    } catch (error) {
        console.log(error)
        throw error
    } finally { client.release() }

    return result
}

const removeEntry = async (id_entry) => {
    let client, result;
    try {
        //connect to db
        client = await pool.connect()
        //make call, using command collected from queries.js 
        result = await client.query(queries.deleteEntry, [id_entry])
    } catch (error) {
        console.log(error)
        throw error
    } finally { client.release() }
    return result
}



module.exports = { getAllProducts, getProductsByCategory, getProductById, searchProducts, updateProduct, createProduct, removeEntry }