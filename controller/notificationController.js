const Notification = require("../model/notification");
const { StatusCodes } = require("http-status-codes");

const getNotifications = async (req, res) => {
    try {
        const userId = req.userId;

        // Find notifications for the user
        const notifications = await Notification.find({ receiver: userId })
            .populate({
                path: 'sender',
                select: 'name username pictures email', // Include sender details
            })
            .populate({
                path: 'taskId', // Populate the task details
                select: 'patientId nurseId description appointmentDate shift shiftDays price patientsigniturepictures nursesigniturepictures', // Select all necessary fields from Task
                populate: [
                    { path: 'patientId', select: 'name age gender' }, // Example of populating related patient info
                    { path: 'nurseId', select: 'name shift' },        // Example of populating related nurse info
                ],
            })
            .sort({ createdAt: -1 });

        res.status(StatusCodes.OK).json({ notifications });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
};


const markAsRead = async (req, res) => {
    try {
        const { id: notificationId } = req.params;
        const userId = req.userId;

        // Find the notification by ID and ensure it belongs to the user
        const notification = await Notification.findOneAndUpdate(
            { _id: notificationId, receiver: userId },
            { $set: { seen: true } },
            { new: true }
        );

        if (!notification) {
            return res.status(StatusCodes.NOT_FOUND).json({ error: "Notification not found or does not belong to the user" });
        }

        res.status(StatusCodes.OK).json({ message: "Notification marked as read" });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
};

module.exports = {
    getNotifications,
    markAsRead
};
