const { Pool } = require('pg');

//import queries (commands) to be made to database
const queries = require('./queries');

//data to connect to db
const pool = new Pool({
    host: process.env.ELEPHANT_HOST,
    user: process.env.ELEPHANT_USER,
    database: process.env.ELEPHANT_DB,
    password: process.env.ELEPHANT_PASS,
    port: 5432,
    ssl: { rejectUnauthorized: false },
});


/**
 * connects to db and returns all products from table "entries"
 * @param {String} user user email
 * @param {Number} limit limit per page
 * @param {Number} skip how many entries to skip before first entry returned
 * @returns Array (results) or error
 */
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

    } finally { client.release() }

    return result
}


/** 
 * Connects to db and returns all rows from table "entries" that specified category
 * @param {String} category category from which to retrieve results
 * @param {Number} limit 
 * @param {Number} skip 
 * @returns Array if successful 
 */
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
    } finally { client.release() }

    return result
}


/**
 * connects to db and returns row from table "entries" that coincides with the id
 * @param {Number} id product id (id_entry)
 * @returns Array if successful
 */
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

    } finally { client.release() }

    return result
}

/**
 * 
 * @param {String} search search word or phrase 
 * @param {Number} limit 
 * @param {Number} skip 
 * @param {String} [category] 
 * @returns returns array of results if successful
 */
const searchProducts = async (search, limit, skip, category) => {

    let client, result, data;
    try {
        //connect to db
        client = await pool.connect()
        //make call, using command collected from queries.js 
        //if category was sent in params, search only in that category
        if (!category) {
            data = await client.query(queries.searchEntries, [`%${search}%`, limit, skip])
        } else { //else, search in all categories -in whole table
            data = await client.query(queries.searchEntriesCategory, [`%${search}%`, category, limit, skip])
        }

        result = data.rows
    } catch (error) {
        console.log(error)
    } finally { client.release() }

    return result
}


/**
 * connects to db sending new data and commanding replacement of data for entry with associated id
 * @param {Object} body has properties title, description, image, category, email, claimed, id_entry
 * @returns 
 */
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


/**
 * connects to db, sending data and commanding creation of new entry with data
 * @param {Object} body has properties title, description, image, category, email, claimed, id_entry
 */
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


/**
 * sends id to db and commands associated row to be delted
 * @param {Number} id_entry 
 * @returns 
 */
const removeEntry = async (id_entry) => {
    let client, result;
    try {
        //connect to db
        client = await pool.connect()
        //make call, using command collected from queries.js 
        result = await client.query(queries.deleteEntry, [id_entry])
    } catch (error) {
        console.log(error)

    } finally { client.release() }
    return result
}

const removeEntryByUser = async (email) => {
    let client, result;
    try {
        //connect to db
        client = await pool.connect()
        //make call, using command collected from queries.js 
        result = await client.query(queries.deleteEntryByUser, [email])
    } catch (error) {
        console.log(error)

    } finally { client.release() }
    return result
}



module.exports = { getAllProducts, getProductsByCategory, getProductById, searchProducts, updateProduct, createProduct, removeEntry, removeEntryByUser }