const express = require("express")
const router = express.Router()
const { uploadMiddleware } = require("../middleware/multer")

const { getAllEntries, getByCategory, getById, searchEntries, updateEntry, createEntry, deleteEntry } = require("../controllers/entriesControllers")

router.get("/entries", getAllEntries)//all entries 
router.get("/category", getByCategory)// all entries of one category
router.get("/entry", getById)// one entry by its id 
router.get("/search", searchEntries)
router.put("/update", uploadMiddleware.single("file"), updateEntry)
router.post("/create", uploadMiddleware.single("file"), createEntry)
router.delete("/delete", deleteEntry)


module.exports = router