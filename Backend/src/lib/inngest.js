import { Inngest } from "inngest";
import { connectDB } from "./db.js";
import User from "../../src/models/User.js"; 
import { deleteStreamUser, upsertStreamUser } from "./stream.js";

export const inngest = new Inngest({
  id: "interviewer",
});

const syncUser = inngest.createFunction(
  { id: "sync-user" },
  { event: "clerk/user.created" },
  async ({ event }) => {
    try {
      await connectDB();

      const { id, email_addresses, first_name, last_name, image_url } =
        event.data;

      const newUser = {
        clerkId: id,
        email: email_addresses?.[0]?.email_address,
        name: `${first_name || ""} ${last_name || ""}`.trim(),
        profileImage: image_url || "",
      };

      // Prevent duplicate insertion
      await User.findOneAndUpdate(
        { clerkId: id },
        newUser,
        { upsert: true, new: true }
      );

      await User.create(newUser)

      await upsertStreamUser({
        id: newUser.clerkId.toString(),
        name: newUser.name,
        image: newUser.profileImage,
      })

      console.log("✅ User synced successfully:", id);
    } catch (error) {
      console.error("❌ Error syncing user:", error.message);
      throw error; // Let Inngest handle retries properly
    }
  }
);

const deleteUserFromDB = inngest.createFunction(
  { id: "delete-user-from-db" },
  { event: "clerk/user.deleted" },
  async ({ event }) => {
    try {
      await connectDB();

      const { id } = event.data;
      await User.deleteOne({ clerkId: id });

      await deleteStreamUser(id.toString())

      console.log("🗑️ User deleted successfully:", id);
    } catch (error) {
      console.error("❌ Error deleting user:", error.message);
      throw error;
    }
  }
);

export const functions = [syncUser, deleteUserFromDB];