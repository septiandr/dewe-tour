const express = require("express");
const { addUser,getUser, getUsers,updateUser,deleteUser  } = require("../controllers/user");

const router = express.Router();
const { register, login,checkAuth } = require('../controllers/auth');
const { addCountry, getCountries,getCountry, updateCountry,deleteCountry } = require("../controllers/country");
const { addTrip, getTrips,getTrip, updateTrip,deleteTrip } = require("../controllers/trip");
const { addTransaction,getTransactions,updateTransaction,getTransaction,deleteTransaction,updateTransactionn } = require("../controllers/transactions");
const { uploadFile } = require("../middlewares/uploadFile");
// Controller
const { auth,adminOnly } = require('../middlewares/auth')
const {upload} = require("../middlewares/upload")
// Route
router.post("/users",uploadFile("photo"), addUser);
router.get("/users", getUsers);
router.get("/user/:id", getUser);
router.put("/user/:id",auth, updateUser);
router.delete("/users/:id",auth, deleteUser);

router.post("/country",auth,adminOnly, addCountry);
router.get("/countries", getCountries);
router.get("/country/:id", getCountry);
router.put("/country/:id",auth,adminOnly, updateCountry);
router.delete("/country/:id",auth,adminOnly, deleteCountry);


router.post("/trip",auth,adminOnly, uploadFile("image"), addTrip);
router.get("/trips", getTrips);
router.get("/trip/:id", getTrip);
router.put("/trip/:id",auth,adminOnly, uploadFile("image"), updateTrip);
router.delete("/trip/:id",auth,adminOnly, deleteTrip);

router.post("/transaction",auth, addTransaction);
router.get("/transactions",auth, getTransactions);
router.get("/transaction/:id",auth, getTransaction);
router.put("/transaction/:id",auth, upload("attachment"), updateTransaction);
router.put("/transactionn/:id",auth, updateTransactionn);
router.delete("/transaction/:id",auth, deleteTransaction);


router.post("/register", register)
router.post("/login", login)
router.get("/check-auth", auth, checkAuth);

module.exports = router;
