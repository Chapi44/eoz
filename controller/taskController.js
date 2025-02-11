const Task = require("../model/Task");
const { StatusCodes } = require("http-status-codes");
const Patient = require("../model/patients"); 
const Notification = require("../model/notification");
const User = require("../model/user"); 
// Create a new task
exports.createTask = async (req, res) => {
  try {
    const {
      patientId,
      nurseId,
      description,
      appointmentDate,
      shift,
      shiftDays,
      price,
      patientsigniturepictures,
      nursesigniturepictures,
      taskType, // Added taskType
    } = req.body;

    const userId = req.userId;

    // Fetch the patient's location using patientId
    const patient = await Patient.findById(patientId);
    if (!patient) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: "Patient not found",
      });
    }
    const location = patient.location || [];

    // // Validate taskType
    // const validTaskTypes = [
    //   "Aide Visit",
    //   "AideSupervisory",
    //   "CommunicationNote",
    //   "CoordinationOfCare",
    //   "Doctor Order",
    //   "FaceToFace",
    //   "FoleyCathChange",
    //   "HHA Plan of Care",
    //   "Incident Report",
    //   "Infection Report",
    //   "INFUSION THERAPY",
    //   "LPN Supervisory",
    //   "LPN SupervisoryVisit",
    //   "LVNHourly",
    //   "LVNVisit",
    //   "Midday Insulin Administration",
    //   "OASIS E1 DISCHARGE",
    //   "OASIS TRANSFER",
    //   "OT Telehealth",
    //   "OTReEval",
    //   "OTVisit",
    //   "PRN Nursing Visit",
    //   "Psych Nurse Assessment",
    //   "PT Visit",
    //   "PTEval",
    //   "PTReassessment",
    //   "PTWithINR",
    //   "Recertification E-1",
    //   "Resumption Of Care",
    //   "RNVisit",
    //   "SkilledNurseVisit",
    //   "SN BMP",
    //   "SN CBC",
    //   "SN Diabetic Daily",
    //   "SN IV Insertion",
    //   "SN_Psychiatric_Nurse_Visit",
    //   "SNB12INJECTION",
    //   "SNHaldolInj",
    //   "SNInsulinAM",
    //   "SNInsulinHS",
    //   "SNInsulinPM",
    //   "SNLabs",
    //   "SNPediatric Hourly",
    //   "SNPediatricVisit",
    //   "SNWoundCare Visit",
    //   "Speech Therapy Visit",
    //   "ST ReEval",
    //   "ST TelehealthVisit",
    //   "Telehealth Notes",
    //   "Telehealth PT"
    // ];

    // if (!validTaskTypes.includes(taskType)) {
    //   return res.status(StatusCodes.BAD_REQUEST).json({
    //     message: `Invalid task type. Valid types are: ${validTaskTypes.join(", ")}`,
    //   });
    // }

    // Validate shiftDays if shift is true
    let days = shift ? parseInt(shiftDays, 10) || 7 : 1; // Default to 7 days if shiftDays is not provided

    // Calculate start and end dates for the shift
    let startDate = new Date(appointmentDate);
    let endDate = new Date(appointmentDate);
    endDate.setDate(endDate.getDate() + days - 1);

    // Find if there are any overlapping tasks that make the nurse "full"
    const overlappingTasks = await Task.find({
      nurseId,
      appointmentDate: { $gte: startDate, $lte: endDate },
    });

    // if (overlappingTasks.length >= 1 * days) {
    //   // Update nurse's availability status to "full" if overlapping tasks are found
    //   await User.findOneAndUpdate(
    //     { _id: nurseId },
    //     { avaiableStatus: "full", fullStatusRevertDate: endDate }
    //   );

    //   return res.status(StatusCodes.BAD_REQUEST).json({
    //     message: `Task assignment failed. The nurse has reached the maximum limit for consecutive tasks during the specified period (${startDate.toDateString()} to ${endDate.toDateString()}).`,
    //   });
    // }

    let tasks = [];

    for (let i = 0; i < days; i++) {
      const taskDate = new Date(appointmentDate);
      taskDate.setDate(taskDate.getDate() + i); // Increment the date by i days for each task

      // Count existing tasks for the nurse on the given date
      const existingTasks = await Task.countDocuments({
        nurseId,
        appointmentDate: taskDate,
      });

      if (existingTasks >= 5) {
        // Update nurse's availability status to "full"
        await User.findOneAndUpdate(
          { _id: nurseId },
          { avaiableStatus: "full", fullStatusRevertDate: endDate }
        );

        return res.status(StatusCodes.BAD_REQUEST).json({
          message: `Task assignment failed. The nurse has reached the maximum limit of 5 tasks for ${taskDate.toDateString()}.`,
        });
      }

      // Create a new task
      const newTask = new Task({
        patientId,
        nurseId,
        description,
        appointmentDate: taskDate, // Set appointment date for each task
        location,
        shift,
        price,
        taskType, // Add taskType
        patientsigniturepictures,
        nursesigniturepictures,
        userId,
      });

      tasks.push(newTask);
    }

    // Save all tasks to the database
    const savedTasks = await Task.insertMany(tasks);

    // Update nurse's availability status to "full" with a revert date
    await User.findOneAndUpdate(
      { _id: nurseId },
      { avaiableStatus: "full", fullStatusRevertDate: endDate }
    );

    res.status(StatusCodes.CREATED).json({
      message: "Task(s) created successfully",
      data: savedTasks,
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "An error occurred while creating the task(s)",
      error: error.message,
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
    // Get pagination parameters from query, default to page 1 and limit 10
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);

    // Extract filters from the query
    const { status, taskType, patientName } = req.query;

    // Calculate the number of documents to skip
    const skip = (page - 1) * limit;

    // Build the query object
    let query = {};

    // Filter by status
    if (status) {
      query.status = status;
    }

    // Filter by task type
    if (taskType) {
      query.taskType = taskType;
    }

    // Filter by patient name (first or last)
    if (patientName) {
      const nameRegex = new RegExp(patientName, "i"); // Case-insensitive regex
      const patients = await Patient.find({
        $or: [{ firstName: nameRegex }, { lastName: nameRegex }],
      }).select("_id"); // Get patient IDs matching the name

      query.patientId = { $in: patients.map((patient) => patient._id) }; // Add to query
    }

    // Fetch tasks with pagination, excluding unnecessary fields
    const tasks = await Task.find(query)
      .populate("patientId nurseId") // Populate patient and nurse details
      .sort({ createdAt: -1 }) // Sort by creation date (newest first)
      .skip(skip)
      .limit(limit);

    // Get the total number of tasks that match the query
    const totalTasks = await Task.countDocuments(query);

    // Count tasks for each status (for summary purposes)
    const pendingTasksCount = await Task.countDocuments({ status: "pending" });
    const completedTasksCount = await Task.countDocuments({ status: "completed" });

    res.status(StatusCodes.OK).json({
      tasks,
      currentPage: page,
      totalPages: Math.ceil(totalTasks / limit),
      totalTasks,
      taskSummary: {
        pending: pendingTasksCount,
        completed: completedTasksCount,
      },
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: "An error occurred while fetching tasks",
      details: error.message,
    });
  }
};


// Get tasks by patient ID
exports.getTasksByPatientId = async (req, res) => {
  try {
    const { patientId } = req.params;
    const { status, taskType, page = 1, limit = 10 } = req.query;

    // Calculate pagination parameters
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Build the query object
    const query = { patientId };

    // Filter by status if provided
    if (status) {
      query.status = status;
    }

    // Filter by task type if provided
    if (taskType) {
      query.taskType = taskType;
    }

    // Fetch tasks with filtering and pagination
    const tasks = await Task.find(query)
      .populate("patientId nurseId")
      .sort({ appointmentDate: 1 }) // Sort by appointment date (earliest first)
      .skip(skip)
      .limit(parseInt(limit));

    // If no tasks are found
    if (!tasks || tasks.length === 0) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: "No tasks found for the given patient ID",
      });
    }

    // Get the total number of tasks matching the query
    const totalTasks = await Task.countDocuments(query);

    // Count tasks based on their status (for summary purposes)
    const pendingTasksCount = await Task.countDocuments({
      patientId,
      status: "pending",
    });
    const completedTasksCount = await Task.countDocuments({
      patientId,
      status: "completed",
    });
    const pastdueTasksCount = await Task.countDocuments({
      patientId,
      status: "pastdue",
    });

    res.status(StatusCodes.OK).json({
      tasks,
      currentPage: parseInt(page),
      totalPages: Math.ceil(totalTasks / limit),
      totalTasks,
      taskSummary: {
        pending: pendingTasksCount,
        completed: completedTasksCount,
        pastdue: pastdueTasksCount,
      },
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "An error occurred while fetching tasks by patient ID",
      error: error.message,
    });
  }
};


// Get tasks by nurse ID
exports.getTasksByNurseId = async (req, res) => {
  try {
    const { nurseId } = req.params;
    const { currentDate, status, taskType, page, limit, pastdue } = req.query;

    // Check if currentDate is provided
    if (!currentDate) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "Current date is required",
      });
    }

    const now = new Date(currentDate);

    // Build the query object
    const query = { nurseId };

    // Filter by status if provided
    if (status) {
      query.status = status;
    }

    // Filter by task type if provided
    if (taskType) {
      query.taskType = taskType;
    }

    // Pagination parameters
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Fetch tasks with filtering and pagination
    const tasks = await Task.find(query)
      .populate("patientId nurseId")
      .sort({ appointmentDate: 1 }) // Sort by appointmentDate (earliest first)
      .skip(skip)
      .limit(parseInt(limit));

    // If no tasks are found
    if (!tasks || tasks.length === 0) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: "No tasks found for the given nurse ID",
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

    // If the request is to fetch only pastdue tasks
    if (pastdue === "true") {
      const pastdueTasks = updatedTasks.filter((task) => task.status === "pastdue");
      return res.status(StatusCodes.OK).json({
        tasks: pastdueTasks,
        currentPage: parseInt(page),
        totalPages: Math.ceil(pastdueTasks.length / limit),
        totalTasks: pastdueTasks.length,
      });
    }

    // Count tasks based on their status
    const counts = updatedTasks.reduce((acc, task) => {
      acc[task.status] = (acc[task.status] || 0) + 1;
      return acc;
    }, {});

    // Get the total number of tasks matching the query (for pagination metadata)
    const totalTasks = await Task.countDocuments(query);

    res.status(StatusCodes.OK).json({
      tasks: updatedTasks,
      currentPage: parseInt(page),
      totalPages: Math.ceil(totalTasks / limit),
      totalTasks,
      counts: {
        totalPending: counts.pending || 0,
        totalCompleted: counts.completed || 0,
        totalPastdue: counts.pastdue || 0,
        totalOngoing: counts.ongoing || 0,
      },
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "An error occurred while fetching tasks by nurse ID",
      error: error.message,
    });
  }
};



// Update task status
// exports.updateTask = async (req, res) => {
//   try {
//     const taskId = req.params.id;
//     const { status, comment, personalNote,appointmentDate,description } = req.body;

//     const updatedTask = await Task.findByIdAndUpdate(
//       taskId,
//       { status, comment, personalNote,appointmentDate,description },
//       { new: true }
//     );

//     if (!updatedTask) {
//       return res.status(StatusCodes.NOT_FOUND).json({
//         message: "Task not found"
//       });
//     }

//     res.status(StatusCodes.OK).json({
//       message: "Task updated successfully",
//       data: updatedTask
//     });
//   } catch (error) {
//     res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
//       message: "An error occurred while updating the task",
//       error: error.message
//     });
//   }
// };


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




// Update only the appointmentDate of a task
// exports.updateAppointmentDate = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { appointmentDate } = req.body;
//     const nurseId = req.userId; // Assuming req.userId is the nurse's ID

//     // Find the task by ID and populate the userId field
//     const task = await Task.findById(id).populate("userId");

//     if (!task) {
//       return res.status(StatusCodes.NOT_FOUND).json({
//         message: "Task not found",
//       });
//     }

//     // Update the appointment date
//     task.appointmentDate = appointmentDate;
//     await task.save();

//     // Ensure task.userId exists before creating the notification
//     if (task.userId && task.userId._id) {
//       const notification = new Notification({
//         sender: nurseId,
//         receiver: task.userId._id, // Use task.userId._id for the receiver
//         type: "appointmentDate",
//         message: `The appointment date for task ${task._id} has been updated to ${appointmentDate}`,
//         taskId: task._id,
//       });

//       // Save the notification
//       await notification.save();
//     } else {
//       console.warn("No userId found for task, notification will not be sent.");
//     }

//     res.status(StatusCodes.OK).json({
//       message: "Appointment date updated and notification sent successfully",
//       data: task,
//     });
//   } catch (error) {
//     res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
//       message: "An error occurred while updating the appointment date",
//       error: error.message,
//     });
//   }
// };


// Update task
exports.updateTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    const  status  = "completed" ;



    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      { status },
      { new: true }
    );

    if (!updatedTask) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: "Task not found",
      });
    }

    res.status(StatusCodes.OK).json({
      message: "Task updated successfully",
      data: updatedTask,
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "An error occurred while updating the task",
      error: error.message,
    });
  }
};

// Update appointment date
exports.updateAppointmentDate = async (req, res) => {
  try {
    const { id } = req.params;
    const { appointmentDate, taskType } = req.body;

    const nurseId = req.userId;

    // Find the task by ID and validate its existence
    const task = await Task.findById(id).populate("userId");

    if (!task) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: "Task not found",
      });
    }

    if (taskType && task.taskType !== taskType) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "Task type mismatch.",
      });
    }

    task.appointmentDate = appointmentDate;
    await task.save();

    if (task.userId) {
      const notification = new Notification({
        sender: nurseId,
        receiver: task.userId._id,
        type: "appointmentDate",
        message: `The appointment date for task ${task._id} has been updated to ${appointmentDate}`,
        taskId: task._id,
      });

      await notification.save();
    }

    res.status(StatusCodes.OK).json({
      message: "Appointment date updated successfully",
      data: task,
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "An error occurred while updating the appointment date",
      error: error.message,
    });
  }
};