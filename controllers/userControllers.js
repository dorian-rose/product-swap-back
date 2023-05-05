const axios = require("axios").default;
const { getUsers, getOneUser, createUser, changeUser, removeUser } = require("../models/userModels")

//get detail of all users
const getAllUsers = async (req, res) => {
    try {
        //call to userModels
        const users = await getUsers()

        res.status(200).json({
            ok: true,
            users
        });
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
        const user = await getOneUser(email)

        res.status(200).json({
            ok: true,
            user
        });
    }
    catch (error) {
        res.status(404).json({
            ok: false,
            msg: "Unable to verify user",
        });
    }
}

//register (add) a new user
const addUser = async (req, res) => {
    const userData = req.body
    try {
        await createUser(userData)
        res.status(201).json({ ok: true })

    } catch (error) {
        console.log(error)
        res.status(500).json({ ok: false, msg: "error adding favourite" })
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

    // var options = {
    //     method: 'DELETE',
    //     url: 'https://{yourDomain}/api/v2/organizations/ORG_ID/members',
    //     headers: { authorization: 'Bearer MGMT_API_ACCESS_TOKEN', 'cache-control': 'no-cache' },
    //     data: { members: ['USER_ID', 'USER_ID', 'USER_ID'] }
    // };

    // axios.request(options).then(function (response) {
    //     console.log(response.data);
    // }).catch(function (error) {
    //     console.error(error);
    // });
    try {
        //call to entriesModels
        await removeUser(email)
        res.status(200).json({ ok: true })
    } catch (error) {
        res.status(500).json({ ok: false, msg: "Error deleting entry" })
    }
}



module.exports = { getAllUsers, getUser, addUser, updateUser, deleteUser };