const cron = require("node-cron");
const User = require("../model/user");

// Run this job periodically (e.g., once a day)
const cronJob = () => {
  cron.schedule("0 0 * * *", async () => {
    const currentDate = new Date();

    // Find and update nurses whose `fullStatusRevertDate` has passed
    await User.updateMany(
      {
        avaiableStatus: "full",
        fullStatusRevertDate: { $lte: currentDate },
      },
      {
        avaiableStatus: "available",
        $unset: { fullStatusRevertDate: "" }, // Remove the revert date field
      }
    );

    console.log("Nurse availability statuses have been updated.");
  });
};

// Export the function
module.exports = cronJob;
