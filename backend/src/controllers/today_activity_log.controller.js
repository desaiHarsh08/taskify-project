// import { TodaysActivityLog } from "../models/todayActivityLog.model.js";
// import { asyncHandler } from "../utils/asyncHandler.js";

// // Controller to create a new activity log
// export const createActivityLog = async (obj) => {
//     try {
//         const { todaysDate, logDescription, logUserId } = obj;
//         const newActivityLog = new TodaysActivityLog({
//             todaysDate,
//             logDescription,
//             logUserId
//         });
//         const savedActivityLog = await newActivityLog.save();
//     } catch (error) {
//         console.log(error);
//     }
// };

// // Controller to get all activity logs by today's date
// export const getActivityLogsByToday = asyncHandler(async (req, res) => {
//     try {
//         // Get today's date in the format YYYY-MM-DD
//         const todayDate = moment().startOf("day").toDate();
//         const activityLogs = await TodaysActivityLog.find({
//             todaysDate: {
//                 $gte: todayDate, // Greater than or equal to today's date
//                 $lt: moment(todayDate).endOf("day").toDate() // Less than today's date end of day
//             }
//         });
//         res.status(200).json(activityLogs);
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ message: "Failed to retrieve activity logs" });
//     }
// });