const { getAllProducts, getProductsByCategory, getProductById, searchProducts, updateProduct, createProduct, removeEntry } = require("../models/entriesModels")



/**
 * retrieve details of all entries (products) from all users.
 * @param {*} req req query carries user (email), limit (results per page) and page (page number)
 * @param {*} res 
 * @returns Object - either results or error
 */
const getAllEntries = async (req, res) => {
    const { user, limit, page } = req.query
    const skip = (page - 1) * limit
    try {
        //call to entriesModels
        const data = await getAllProducts(user, limit, skip)
        if (data.length == 0) {
            return res.status(404).json({ ok: false, msg: "No entries available" })
        } else {
            //find total pages and current page
            const total_results = data[0].total_results
            const total_pages = Math.ceil(total_results / limit)

            //return all data
            return res.status(200).json({
                ok: true,
                data,
                total_pages,
                page,
                total_results
            })
        }
    } catch (error) {
        res.status(500).json({ ok: false, msg: "Error retrieving entries" })
    }
}


/**
 * retrieves all of the entries from one category
 * @param {*} req req query carries category, limit (results per page) and page (page number)
 * @param {*} res 
 * @returns Object - either results or error
 */
const getByCategory = async (req, res) => {

    let { category, limit, page } = req.query
    const skip = (page - 1) * limit
    console.log(skip)
    try {
        //call to entriesModels
        const data = await getProductsByCategory(category, limit, skip)
        if (data.length == 0) {
            return res.status(404).json({ ok: false, msg: `No ${category} available` })
        } else {
            //find total pages and current page
            const total_results = data.length
            const total_pages = Math.ceil(total_results / limit)

            //return all data
            return res.status(200).json({
                ok: true,
                data,
                total_pages,
                page,
                total_results
            })
        }
    } catch (error) {
        res.status(500).json({ ok: false, msg: "Error retrieving entries" })
    }
}



/**
 * retrieves one entry by its unique id 
 * @param {*} req req query contains the id of the product to be retrieved
 * @param {*} res 
 * @returns Object - either with successful results or error 
 */
const getById = async (req, res) => {

    let { id } = req.query
    try {
        //call to entriesModels
        const data = await getProductById(id)
        if (data.length == 0) {
            return res.status(404).json({ ok: false, msg: "No entries available" })
        } else {
            return res.status(200).json({
                ok: true,
                data
            })
        }
    } catch (error) {
        res.status(500).json({ ok: false, msg: "Error retrieving entries" })
    }
}

/**
 * retrieves all entries that contain the search term in title or description. Optionally, retrieves only those search results within a category. 
 * @param {*} req req query carries search (search term), limit (limit) of results per page, page (page number) and optionally, category.
 * @param {*} res 
 * @returns Object - either with successful results or error 
 */
const searchEntries = async (req, res) => {

    const { search, limit, page, category } = req.query
    const skip = (page - 1) * limit
    try {
        //call to entriesModels
        const data = await searchProducts(search, limit, skip, category)
        if (data.length == 0) {
            return res.status(404).json({ ok: false, msg: "No entries available" })
        } else {
            //find total pages and current page
            const total_results = data.length
            const total_pages = Math.ceil(total_results / limit)
            //return all data
            return res.status(200).json({
                ok: true,
                data,
                total_pages,
                page,
                total_results
            })
        }
    } catch (error) {
        res.status(500).json({ ok: false, msg: "Error retrieving entries" })
    }
}

/**
 * Searches for entry by id, and if found, sends necessary data to model to update db entry
 * @param {*} req body contains data with which to update old data: title, desc, image, category, email, claimed, id_entry
 * @param {*} res 
 * @returns Object - either success message or  error 
 */
const updateEntry = async (req, res) => {
    const body = req.body
    //if new image (file) is supplied, replace image property with this 
    if (typeof req.file !== 'undefined') {
        body.image = req.file.path
    }
    try {
        //call to entries models to check that entry with id exists
        const entryExists = await getProductById(body.id_entry)
        if (entryExists.length == 0) {
            return res.status(404).json({ ok: false, msg: "Entry with this ID doesn't exist" })
        }
        //if exists, call to entriesModels
        const entries = await updateProduct(body)

        return res.status(201).json({
            ok: true
        })

    } catch (error) {
        res.status(500).json({ ok: false, msg: "Error updating entry" })
    }
}



/**
 * Collects necessary information and sends to model to create entry in db
 * @param {*} req body contains data with which to create entry in db: title, desc, image, category, email, claimed, id_entry
 * @param {*} res 
 * @returns Object - either success message or with error 
 */
const createEntry = async (req, res) => {

    const body = req.body
    body.image = req.file.path

    //body.image = req.file.filename
    //changed for cloudinary
    try {
        //call to entriesModels
        const entries = await createProduct(body)
        return res.status(201).json({
            ok: true
        })

    } catch (error) {
        res.status(500).json({ ok: false, msg: "Error updating entry" })
    }
}

/**
 * Collects id of entry and sends it to models to delete from db
 * @param {*} req body containes id of db entry to be deleted
 * @param {*} res 
 * @returns Object - ok e¡ther true or false
 */
const deleteEntry = async (req, res) => {
    const { id_entry } = req.body
    try {
        //call to entries models to check that entry with id exists
        const entryExists = await getProductById(id_entry)
        if (entryExists.length == 0) {
            return res.status(404).json({ ok: false, msg: "Entry with this ID doesn't exist" })
        }
        //if exists, call to entriesModels
        await removeEntry(id_entry)
        res.status(200).json({ ok: true })
    } catch (error) {
        return res.status(500).json({ ok: false, msg: "Error deleting entry" })
    }
}



module.exports = { getAllEntries, getByCategory, getById, searchEntries, updateEntry, createEntry, deleteEntry }
