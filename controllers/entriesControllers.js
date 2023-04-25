const { getAllProducts, getProductsByCategory, getProductById, searchProducts, updateProduct, createProduct, removeEntry } = require("../models/entriesModels")



//retrieve details of all entries from all authors.
const getAllEntries = async (req, res) => {

    try {
        //call to entriesModels
        const entries = await getAllProducts(req.query)
        if (entries.length == 0) {
            return res.status(404).json({ ok: false, msg: "No entries available" })
        } else {
            return res.status(200).json({
                ok: true,
                entries
            })
        }
    } catch (error) {
        res.status(500).json({ ok: false, msg: "Error retrieving entries" })
    }
}

//get all entries of one category
const getByCategory = async (req, res) => {

    let { category, limit, skip } = req.query
    //console.log(req.query)
    try {
        //call to entriesModels
        const entries = await getProductsByCategory(category, limit, skip)
        if (entries.length == 0) {
            return res.status(404).json({ ok: false, msg: "No entries available" })
        } else {
            return res.status(200).json({
                ok: true,
                entries
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
        const entries = await getProductById(id)
        if (entries.length == 0) {
            return res.status(404).json({ ok: false, msg: "No entries available" })
        } else {
            return res.status(200).json({
                ok: true,
                entries
            })
        }
    } catch (error) {
        res.status(500).json({ ok: false, msg: "Error retrieving entries" })
    }
}

const searchEntries = async (req, res) => {

    const { search, limit, skip } = req.query

    try {
        //call to entriesModels
        const entries = await searchProducts(search, limit, skip)
        if (entries.length == 0) {
            return res.status(404).json({ ok: false, msg: "No entries available" })
        } else {
            return res.status(200).json({
                ok: true,
                entries
            })
        }
    } catch (error) {
        res.status(500).json({ ok: false, msg: "Error retrieving entries" })
    }
}

const updateEntry = async (req, res) => {

    const body = req.body
    try {
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
