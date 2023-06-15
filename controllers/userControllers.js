const { getUsers, getOneUser, createUser, changeUser, removeUser } = require("../models/userModels")
const { removeEntryByUser } = require("../models/entriesModels")
/**
 * retrieves details of all users of all users
 * @param {*} req query contains limit (limit results per page) and page (page number)
 * @param {*} res 
 * @returns Object -either with result data (inc 'data'- array of products) or with error message
 */

const getAllUsers = async (req, res) => {
    const { limit, page } = req.query
    const skip = (page - 1) * limit
    try {
        //call to userModels
        const data = await getUsers(limit, skip)
        if (data.length == 0) {
            return res.status(404).json({ ok: false, msg: "No users found" })
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
    }
    catch (error) {
        res.status(404).json({
            ok: false,
            msg: "Unable to retrieve users",
        });
    }
}



/**
 * retrieve one user's data 
 * @param {*} req query contains email 
 * @param {*} res 
 * @returns Object - if successful, of results including array with 1 product -if not successful, with error message. 
 */
const getUser = async (req, res) => {

    try {
        const { email } = req.query;
        //call userModels
        const data = await getOneUser(email)

        if (data.length == 0) {
            return res.status(404).json({ ok: false, msg: "User with this email and an associated role doesn't exist" })
        }
        res.status(200).json({
            ok: true,
            data
        });
    }
    catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Unable to retrieve user",
        });
    }
}



/**
 * collects data for entry in user table and entry in roles table and passes to models to create. 
 * @param {*} req body contains data to create entries in db: email, name, id and role
 * @param {*} res 
 */
const addUser = async (req, res) => {
    const userData = req.body
    try {
        await createUser(userData)
        res.status(201).json({ ok: true })

    } catch (error) {
        console.log(error)
        res.status(500).json({ ok: false, msg: "error adding user" })
    }
}

/**
 * collects data with which to update an entry in table 'users' and passes it to model to update.
 * @param {*} req body contains new data: email, name, id and role
 * @param {*} res 
 * @returns Object 
 */
const updateUser = async (req, res) => {
    const newData = req.body
    try {
        //call to entries models to check that entry with id exists
        const userExists = await getOneUser(newData.email)

        if (userExists.length == 0) {
            return res.status(404).json({ ok: false, msg: "User with this email doesn't exist" })
        }
        //call to entriesModels
        await changeUser(newData)

        return res.status(201).json({
            ok: true
        })

    } catch (error) {
        res.status(500).json({ ok: false, msg: "Error updating entry" })
    }
}


/**
 * collets user email and if there is a user asssociated, passes it to model to delete this user 
 * @param {*} req body contains email
 * @param {*} res 
 * @returns Object
 */
const deleteUser = async (req, res) => {
    const { email } = req.body

    try {
        //call to entries models to check that entry with id exists
        const userExists = await getOneUser(email)
        if (userExists.length == 0) {
            return res.status(404).json({ ok: false, msg: "User with this email doesn't exist" })
        }
        //call to entriesModels
        await removeEntryByUser(email)
        await removeUser(email)
        res.status(200).json({ ok: true })
    } catch (error) {
        res.status(500).json({ ok: false, msg: "Error deleting entry, check that associated roles are deleted" })
    }
}



module.exports = { getAllUsers, getUser, addUser, updateUser, deleteUser };