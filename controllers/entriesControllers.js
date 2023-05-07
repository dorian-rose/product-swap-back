const { getAllProducts, getProductsByCategory, getProductById, searchProducts, updateProduct, createProduct, removeEntry } = require("../models/entriesModels")



//retrieve details of all entries from all authors.
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

//get all entries of one category
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


//get one id by its id.
const getById = async (req, res) => {

    let { id } = req.query
    //console.log(req.query)
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

const updateEntry = async (req, res) => {
    const body = req.body
    console.log("file", typeof req.file)
    if (typeof req.file !== 'undefined') {
        body.image = req.file.filename
    } else {
        console.log(body.image)
    }

    console.log("body", body)

    try {
        //call to entries models to check that entry with id exists
        const entryExists = await getProductById(body.id_entry)
        if (entryExists.length == 0) {
            return res.status(404).json({ ok: false, msg: "Entry with this ID doesn't exist" })
        }
        //call to entriesModels
        const entries = await updateProduct(body)

        return res.status(201).json({
            ok: true
        })

    } catch (error) {
        res.status(500).json({ ok: false, msg: "Error updating entry" })
    }
}




const createEntry = async (req, res) => {

    const body = req.body
    body.image = req.file.filename

    //body.image = req.file.filename
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

const deleteEntry = async (req, res) => {
    const { id_entry } = req.body
    try {
        //call to entriesModels
        await removeEntry(id_entry)
        res.status(200).json({ ok: true })
    } catch (error) {
        res.status(500).json({ ok: false, msg: "Error deleting entry" })
    }
}



module.exports = { getAllEntries, getByCategory, getById, searchEntries, updateEntry, createEntry, deleteEntry }
