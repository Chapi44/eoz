const Task = require("../model/Task");

// Middleware to update task status to "completed"
const updateTaskStatus = async (req, res, next) => {
  try {
    const { taskId } = req.body;

    // Validate that taskId is provided
    if (!taskId) {
      console.warn("Task ID is required for the middleware.");
      return next(); // Proceed without blocking the main action
    }

    // Update the task status to "completed"
    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      { status: "completed" }, // Hardcoded to "completed"
      { new: true }
    );

    if (!updatedTask) {
      console.warn(`Task with ID ${taskId} not found.`);
    } else {
      console.log(`Task ${taskId} status updated to "completed".`);
    }

    // Attach updatedTask to the request object for further use if needed
    req.updatedTask = updatedTask;
    next(); // Proceed to the next middleware or controller
  } catch (error) {
    console.error("Error in updateTaskStatus middleware:", error.message);
    next(error); // Pass error to the next middleware or error handler
  }
};

module.exports = updateTaskStatus;
