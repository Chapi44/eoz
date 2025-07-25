const express = require("express");
const {
  getAllUsers,
  getUserById,
  deleteuser,
  updateUser,
  followUnFollowUser,
  updateUserPassword,
  getFollowers,
  getFollowing,
  searchUserByUsername,
  showCurrentUser,
  getProfileByToken,
  getAllUserswithoutuserid,
  getAllUsershr
} = require("../controller/usercontroller");
const {
  authMiddleware,
} = require("../middelware/authMiddleware");

const multerMiddleware = require("../middelware/multerSetup");

const router = express.Router();



router.get(
  "/getallusers",
  authMiddleware,
  getAllUsers
);

router.get(
  "/getallusershr",
  authMiddleware,
  getAllUsershr
);
router.get(
  "/all",
  
  getAllUserswithoutuserid
);
router.get(
  "/getuserById/:id",
  getUserById
);
router.post(
  "/delete/:id",
  deleteuser
);
router.patch(
  "/update",
  authMiddleware,
  multerMiddleware("profile", 1),
  updateUser
);
router.post("/follow/:id", authMiddleware, followUnFollowUser);

router.patch(
  "/updateUserPassword",
  authMiddleware,
  updateUserPassword
);

router.get("/followers/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const followers = await getFollowers(userId);
    res.status(200).json({ followers });
  } catch (error) {
    console.error("Error retrieving followers:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/following/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const following = await getFollowing(userId);
    res.status(200).json({ following });
  } catch (error) {
    console.error("Error retrieving following:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/search", authMiddleware, searchUserByUsername);

router.route("/showMe").get(showCurrentUser);

router.get("/profile", getProfileByToken);

module.exports = router;
