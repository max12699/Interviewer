import { chatClient } from "../lib/stream.js";

export async function getStreamToken(req, res) {
  try {
    if (!req.user) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const userId = req.user.clerkId;

    // Create Stream token
    const token = chatClient.createToken(userId);

    res.status(200).json({
      token,
      userId,
      username: req.user.name,
      userImage: req.user.profileImage,
    });
  } catch (error) {
    console.error("Error in getStreamToken controller:", error.message);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
}