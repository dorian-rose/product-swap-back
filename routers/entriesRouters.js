const express = require("express")
const router = express.Router()

const { getAllEntries, getByCategory, getById, searchEntries, updateEntry, createEntry, deleteEntry } = require("../controllers/entriesControllers")

router.get("/entries", getAllEntries)//all entries 
router.get("/category", getByCategory)// all entries of one category
router.get("/entry", getById)// one entry by its id 
router.get("/search", searchEntries)
router.put("/update", updateEntry)
router.post("/create", createEntry)
router.delete("/delete", deleteEntry)


module.exports = router