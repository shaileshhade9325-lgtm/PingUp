import { Inngest } from "inngest";
import User from "../models/User.js";

// Create a client to send and receive events
export const inngest = new Inngest({ id: "pingup-app" });

// 1. Inngest Function to save user data to a database
const syncUserCreation = inngest.createFunction(
    {
        id: "sync-user-from-clerk",
        triggers: { event: "clerk/user.created" }
    },
    async ({ event }) => {
        const { id, first_name, last_name, email_addresses, image_url } = event.data;
        const firstEmailObj = Array.isArray(email_addresses) ? email_addresses.at(0) : null;
        const email = firstEmailObj?.email_address || `user_${id}@example.com`;
        let username = email.split("@").at(0);

        // Check availability of username
        const user = await User.findOne({ username });

        if (user) {
            username = username + Math.floor(Math.random() * 10000);
        }

        const userData = {
            _id: id,
            email,
            full_name: `${first_name || ""} ${last_name || ""}`.trim() || "New User",
            profile_picture: image_url || "",
            username
        };

        await User.create(userData);
    }
);

// 2. Inngest Function to update user data in database
const syncUserUpdation = inngest.createFunction(
    {
        id: "update-user-from-clerk",
        triggers: { event: "clerk/user.updated" }
    },
    async ({ event }) => {
        const { id, first_name, last_name, email_addresses, image_url } = event.data;
        const firstEmailObj = Array.isArray(email_addresses) ? email_addresses.at(0) : null;
        const email = firstEmailObj?.email_address;

        const updatedUserData = {
            ...(email && { email }),
            full_name: `${first_name || ""} ${last_name || ""}`.trim(),
            profile_picture: image_url || ""
        };

        await User.findByIdAndUpdate(id, updatedUserData);
    }
);

// 3. Inngest Function to delete user from database
const syncUserDeletion = inngest.createFunction(
    {
        id: "delete-user-with-clerk",
        triggers: { event: "clerk/user.deleted" }
    },
    async ({ event }) => {
        const { id } = event.data;
        await User.findByIdAndDelete(id);
    }
);

// Export all functions
export const functions = [
    syncUserCreation,
    syncUserUpdation,
    syncUserDeletion
];
