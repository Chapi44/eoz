const Task = require("../model/Task");
const { StatusCodes } = require("http-status-codes");
const Patient = require("../model/patients"); 
// Create a new task
exports.createTask = async (req, res) => {
  try {
    const { patientId, nurseId, description, appointmentDate } = req.body;

    // Fetch the patient's location using patientId
    const patient = await Patient.findById(patientId);
    
    if (!patient) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: "Patient not found",
      });
    }

    const location = patient.location || []; // Retrieve the location from the patient's data

    const newTask = new Task({
      patientId,
      nurseId,
      description,
      appointmentDate,
      location // Save the patient's location in the task
    });

    const savedTask = await newTask.save();

    res.status(StatusCodes.CREATED).json({
      message: "Task created successfully",
      data: savedTask
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "An error occurred while creating the task",
      error: error.message
    });
  }
};


exports.getTaskById = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findById(id).populate("patientId nurseId");

    if (!task) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: "Task not found"
      });
    }

    res.status(StatusCodes.OK).json(task);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "An error occurred while fetching the task",
      error: error.message
    });
  }
};

// Get all tasks
exports.getAllTasks = async (req, res) => {
  try {
    const { status } = req.query; // Get the status from query parameters

    // Build the query object
    const query = {};
    if (status) {
      query.status = status;
    }

    const tasks = await Task.find(query).populate("patientId nurseId");

    // Count tasks based on their status
    const counts = await Task.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 }
        }
      }
    ]);

    // Transform the counts array to an object with status as keys
    const statusCounts = counts.reduce((acc, curr) => {
      acc[curr._id] = curr.count;
      return acc;
    }, {});

    res.status(StatusCodes.OK).json({
      tasks,
      counts: {
        totalPending: statusCounts.pending || 0,
        totalCompleted: statusCounts.completed || 0,
        totalPastdue: statusCounts.pastdue || 0,
        totalOngoing: statusCounts.ongoing || 0
      }
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "An error occurred while fetching tasks",
      error: error.message
    });
  }
};

// Get tasks by patient ID
exports.getTasksByPatientId = async (req, res) => {
  try {
    const { patientId } = req.params;
    const tasks = await Task.find({ patientId }).populate("patientId nurseId");

    if (!tasks || tasks.length === 0) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: "No tasks found for the given patient ID"
      });
    }

    res.status(StatusCodes.OK).json(tasks);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "An error occurred while fetching tasks by patient ID",
      error: error.message
    });
  }
};

// Get tasks by nurse ID
exports.getTasksByNurseId = async (req, res) => {
  try {
    const { nurseId } = req.params;
    const { currentDate } = req.query;

    // Check if currentDate is provided
    if (!currentDate) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "Current date is required"
      });
    }

    const now = new Date(currentDate);

    // Find all tasks for the given nurse ID
    const tasks = await Task.find({ nurseId }).populate("patientId nurseId");

    if (!tasks || tasks.length === 0) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: "No tasks found for the given nurse ID"
      });
    }

    // Update tasks' status to pastdue if their appointmentDate is in the past and status is pending
    const updatedTasks = await Promise.all(
      tasks.map(async (task) => {
        if (task.status === "pending" && new Date(task.appointmentDate) < now) {
          task.status = "pastdue";
          await task.save();
        }
        return task;
      })
    );

    // If the request is to fetch pastdue tasks
    const { pastdue } = req.query;
    if (pastdue === 'true') {
      const pastdueTasks = updatedTasks.filter(task => task.status === "pastdue");
      return res.status(StatusCodes.OK).json(pastdueTasks);
    }

    // Count tasks based on their status
    const counts = updatedTasks.reduce((acc, task) => {
      acc[task.status] = (acc[task.status] || 0) + 1;
      return acc;
    }, {});

    res.status(StatusCodes.OK).json({
      tasks: updatedTasks,
      counts: {
        totalPending: counts.pending || 0,
        totalCompleted: counts.completed || 0,
        totalPastdue: counts.pastdue || 0,
        totalOngoing: counts.ongoing || 0
      }
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "An error occurred while fetching tasks by nurse ID",
      error: error.message
    });
  }
};


// Update task status
exports.updateTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    const { status, comment, personalNote } = req.body;

    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      { status, comment, personalNote },
      { new: true }
    );

    if (!updatedTask) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: "Task not found"
      });
    }

    res.status(StatusCodes.OK).json({
      message: "Task updated successfully",
      data: updatedTask
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "An error occurred while updating the task",
      error: error.message
    });
  }
};


// Delete task by ID
exports.deleteTaskById = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTask = await Task.findByIdAndDelete(id);

    if (!deletedTask) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: "Task not found"
      });
    }

    res.status(StatusCodes.OK).json({
      message: "Task deleted successfully",
      data: deletedTask
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "An error occurred while deleting the task",
      error: error.message
    });
  }
};


// Get tasks by nurse ID with optional status filter
exports.getTasksstatusByNurseId = async (req, res) => {
  try {
    const { nurseId } = req.params;
    const { status } = req.query;

    // Find all tasks for the given nurse ID
    const query = { nurseId };
    if (status) {
      // Validate if status is provided and valid
      if (!["pending", "completed", "pastdue", "ongoing"].includes(status)) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          message: "Invalid status filter"
        });
      }
      query.status = status;
    }

    const tasks = await Task.find(query).populate("patientId nurseId");

    if (!tasks || tasks.length === 0) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: "No tasks found for the given nurse ID"
      });
    }

    // Count tasks based on their status
    const counts = tasks.reduce((acc, task) => {
      acc[task.status] = (acc[task.status] || 0) + 1;
      return acc;
    }, {});

    res.status(StatusCodes.OK).json({
      tasks,
      counts: {
        totalPending: counts.pending || 0,
        totalCompleted: counts.completed || 0,
        totalPastdue: counts.pastdue || 0,
        totalOngoing: counts.ongoing || 0
      }
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "An error occurred while fetching tasks by nurse ID",
      error: error.message
    });
  }
};
