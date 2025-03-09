const User = require("../model/user");
const CustomError = require("../errors");
const { StatusCodes } = require("http-status-codes");
const Product = require("../model/post");
const jwt = require("jsonwebtoken");
const { io, getRecipientSocketId } = require("../socket/socket");

require("dotenv").config();

const getAllUsers = async (req, res) => {
  try {
    const { role, type, employeetype, availableStatus, page , limit } = req.query;
    const adminId = req.userId; // Get adminId from token

    if (!adminId) {
      return res.status(403).json({
        success: false,
        message: "Admin ID is missing in token",
      });
    }

    // Convert page and limit to integers
    const pageNumber = parseInt(page);
    const pageSize = parseInt(limit);
    const skip = (pageNumber - 1) * pageSize;

    // Build query based on filters and adminId
    let query = { adminId };

    if (role) {
      query.role = role;
    }
    if (type) {
      query.type = type;
    }
    if (employeetype !== undefined) {
      query.employeetype = employeetype === 'true'; // Convert string to boolean
    }
    if (availableStatus) {
      query.availableStatus = availableStatus; // Add availableStatus to query
    }

    // Find users with pagination and exclude password
    const users = await User.find(query, { password: 0 })
      .sort({ createdAt: -1 }) // Sort by creation date (latest first)
      .skip(skip)              // Skip documents for pagination
      .limit(pageSize);        // Limit the number of documents per page

    // Count total number of users matching the query
    const totalUsers = await User.countDocuments(query);

    // Count total number of nurses for this admin
    const totalNurses = await User.countDocuments({
      adminId,
      role: "nurse",
    });

    res.status(200).json({
      success: true,
      message: "Users retrieved successfully",
      users,
      totalNurses, // Total nurses registered by this admin
      pagination: {
        currentPage: pageNumber,
        totalPages: Math.ceil(totalUsers / pageSize),
        totalItems: totalUsers,
        pageSize,
      },
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};





const getUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId)
      
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Fetch posts created by the user
    const userPosts = await Product.find({ user: userId });

    // Attach the posts to the user object
    user.posts = userPosts;

    res.status(200).json(user);
  } catch (error) {
    console.error("Error getting user by ID:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
};


const deleteuser = async (req, res) => {
  try {
    const { id } = req.params;
    const finduser = await User.findByIdAndDelete({ _id: id });
    if (!finduser) {
      return res.status(400).json({ error: "no such user found" });
    }
    return res.status(200).json({ message: "deleted sucessfully" });
  } catch (error) {
    res.status(500).json({ error: "something went wrong" });
  }
};


const updateUser = async (req, res) => {
  try {
    const userId = req.userId;
    let updatedUser = await User.findById(userId);

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    // Update fields if provided in request body
    if (req.body.name) updatedUser.name = req.body.name;  
    if (req.body.bio) updatedUser.bio = req.body.bio;
    if (req.body.username) updatedUser.username = req.body.username;
    if (req.body.profession) updatedUser.profession = req.body.profession;
    if (req.body.role) updatedUser.role = req.body.role;
    if (req.body.type) updatedUser.type = req.body.type;
    if (req.body.phoneNumber) updatedUser.phoneNumber = req.body.phoneNumber;
    if (req.body.employeetype) updatedUser.employeetype = req.body.employeetype;
    if (req.body.pictures) updatedUser.pictures = req.body.pictures; // Update pictures if provided

    // Update email if provided and validate uniqueness
    if (req.body.email) {
      const emailAlreadyExists = await User.findOne({ email: req.body.email });
      if (emailAlreadyExists && emailAlreadyExists._id.toString() !== userId) {
        return res.status(400).json({ error: "Email already exists" });
      }
      updatedUser.email = req.body.email;
    }

    // Update organization number if provided and validate uniqueness
    if (req.body.organazationnumber) {
      const organizationNumberExists = await User.findOne({ organazationnumber: req.body.organazationnumber });
      if (organizationNumberExists && organizationNumberExists._id.toString() !== userId) {
        return res.status(400).json({ error: "Organization number already exists" });
      }
      updatedUser.organazationnumber = req.body.organazationnumber;
    }

    // Update password if provided
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      updatedUser.password = await bcrypt.hash(req.body.password, salt);
    }

    await updatedUser.save();

    // Respond with updated user data (excluding password)
    res.status(200).json({
      message: "User updated successfully",
      user: {
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        username: updatedUser.username,
        bio: updatedUser.bio,
        pictures: updatedUser.pictures,
        profession: updatedUser.profession,
        role: updatedUser.role,
        type: updatedUser.type,
        phoneNumber: updatedUser.phoneNumber,
        organazationnumber: updatedUser.organazationnumber,
        employeetype: updatedUser.employeetype
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


const updateUserPassword = async (req, res) => {
  const userId = req.userId;
  const { oldPassword, newPassword } = req.body;
  if (!oldPassword || !newPassword) {
    throw new CustomError.BadRequestError("Please provide both values");
  }
  const user = await User.findById(userId);

  const isPasswordCorrect = await user.comparePassword(oldPassword);
  if (!isPasswordCorrect) {
    throw new CustomError.UnauthenticatedError("Invalid Credentials");
  }
  user.password = newPassword;

  await user.save();
  res.status(StatusCodes.OK).json({ msg: "Success! Password Updated." });
};

const Notification = require("../model/notification");

const followUnFollowUser = async (req, res) => {
  try {
    const { id } = req.params;
    const userToModify = await User.findById(id);
    const currentUser = await User.findById(req.userId);

    if (id === req.userId.toString())
      return res.status(400).json({ error: "You cannot follow/unfollow yourself" });

    if (!userToModify || !currentUser) return res.status(400).json({ error: "User not found" });

    const isFollowing = currentUser.following.includes(id);

    let followerCount = userToModify.followers.length;
    if (isFollowing) {
      // Unfollow user
      await User.findByIdAndUpdate(id, { $pull: { followers: req.userId } });
      await User.findByIdAndUpdate(req.userId, { $pull: { following: id } });
      followerCount--; // Decrement follower count

      // Create and send unfollow notification
      const notification = await Notification.create({
        sender: req.userId,
        receiver: id,
        type: "unfollow",
        message: `${currentUser.username} unfollowed you`
      });
      const recipientSocketId = getRecipientSocketId(id);
      if (recipientSocketId) {
        io.to(recipientSocketId).emit("newNotification", notification);
      }

      await Notification.deleteOne({ sender: req.userId, receiver: id, type: "follow" }); // Delete follow notification
      res.status(200).json({ message: "User unfollowed successfully", followerCount });
    } else {
      // Follow user
      await User.findByIdAndUpdate(id, { $push: { followers: req.userId } });
      await User.findByIdAndUpdate(req.userId, { $push: { following: id } });
      followerCount++; // Increment follower count

      // Create and send follow notification
      const notification = await Notification.create({
        sender: req.userId,
        receiver: id,
        type: "follow",
        message: `${currentUser.username} followed you`
      });
      const recipientSocketId = getRecipientSocketId(id);
      if (recipientSocketId) {
        io.to(recipientSocketId).emit("newNotification", notification);
      }

      res.status(200).json({ message: "User followed successfully", followerCount });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log("Error in followUnFollowUser: ", err.message);
  }
};

const showCurrentUser = async (req, res) => {
  res.status(StatusCodes.OK).json({ user: req.user });
};


const getFollowers = async (userId) => {
  try {
    // Find the user by their ID and populate followers with all details
    const user = await User.findById(userId)
      .populate({
        path: "followers",
        select: "username pictures, name", // Exclude password field
      });

    if (!user) {
      throw new Error("User not found");
    }

    // Retrieve the followers of the user
    const followers = user.followers;
    const followerCount = followers.length; // Count the number of followers

    return { followers: followers, followerCount: followerCount }; // Return followers and count
  } catch (error) {
    console.error("Error retrieving followers:", error);
    throw error;
  }
};


const getFollowing = async (userId) => {
  try {
    // Find the user by their ID
    const user = await User.findById(userId)
      .populate({
        path: "following",
        select: "username, pictures, name",
      });

    if (!user) {
      // If user is not found, return a 404 Not Found status code
      return { error: "User not found" };
    }

    // Retrieve the users the user is following
    const following = user.following;
    const followingCount = following.length; // Count the number of users the user is following

    // Return following and count with a 200 OK status code
    return { following: following, followingCount: followingCount };
  } catch (error) {
    // If there's an error, return a 500 Internal Server Error status code
    return { error: "Internal server error" };
  }
};


const searchUserByUsername = async (req, res) => {
  try {
    let { username, fullname } = req.query;

    if (!username && !fullname) {
      return res.status(StatusCodes.BAD_REQUEST).json({ error: "Username or fullname parameter is required" });
    }

    let query = {};

    if (username) {
      query.username = { $regex: new RegExp(username, "i") }; // Search by username
    }

    if (fullname) {
      query.name = { $regex: new RegExp(fullname, "i") }; // Search by fullname
    }

    // Search users by username or fullname using case-insensitive regex
    const users = await User.find(query)
      .select("name username bio profession pictures email role");

    res.status(StatusCodes.OK).json(users);
  } catch (error) {
    console.error("Error searching user by username or fullname:", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Internal server error" });
  }
};


const getProfileByToken = async (req, res) => {
  const bearerToken = req.headers.authorization;

  if (!bearerToken) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ error: "Bearer Token not provided" });
  }

  const token = bearerToken.split(" ")[1]; // Extract token from "Bearer <token>" format

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(StatusCodes.NOT_FOUND).json({ error: "User not found" });
    }

    // Return only public profile information, excluding sensitive fields
    const userProfile = {
      name: user.name,
      email: user.email,
      role: user.role,
      username: user.username,
      bio: user.bio,
      pictures: user.pictures,
      profession: user.profession
    };

    return res.status(StatusCodes.OK).json({ userProfile });
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(StatusCodes.UNAUTHORIZED).json({ error: "Token expired" });
    }
    return res.status(StatusCodes.UNAUTHORIZED).json({ error: "Invalid token" });
  }
};


module.exports = {
  getAllUsers,
  getUserById,
  deleteuser,
  updateUser,
  getFollowers,
  searchUserByUsername,
  getFollowing,
  updateUserPassword,
  followUnFollowUser, 
  showCurrentUser,
  getProfileByToken
};
