const axios = require("axios").default;
const { getUsers, getOneUser, createUser, changeUser, removeUser } = require("../models/userModels")

//get detail of all users
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
            msg: "Unable to retrieve user",
        });
    }
}


//retrieve one user 
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

//register (add) a new user
const addUser = async (req, res) => {
    console.log(req.body)
    const userData = req.body
    try {
        await createUser(userData)
        res.status(201).json({ ok: true })

    } catch (error) {
        console.log(error)
        res.status(500).json({ ok: false, msg: "error adding user" })
    }
}

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
const deleteUser = async (req, res) => {
    const { email } = req.body

    try {
        //call to entries models to check that entry with id exists
        const userExists = await getOneUser(email)
        console.log(userExists)
        if (userExists.length == 0) {
            return res.status(404).json({ ok: false, msg: "User with this email doesn't exist" })
        }
        //call to entriesModels
        await removeUser(email)
        res.status(200).json({ ok: true })
    } catch (error) {
        res.status(500).json({ ok: false, msg: "Error deleting entry, check that associated roles are deleted" })
    }
}



module.exports = { getAllUsers, getUser, addUser, updateUser, deleteUser };