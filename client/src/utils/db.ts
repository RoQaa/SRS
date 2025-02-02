import mongoose from "mongoose";

// Add a type definition to extend the global type with the mongoose cache
declare global {
  // eslint-disable-next-line no-var
  var mongoose: {
    conn: mongoose.Connection | null;
    promise: Promise<mongoose.Connection> | null;
  };
}

// Check if a global mongoose object exists or initialize it
const cached = global.mongoose || { conn: null, promise: null };

export const connectToDb = async () => {
  // Return cached connection if it exists
  if (cached.conn) return cached.conn;

  // Check the environment variable early
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error("MONGODB_URI environment variable is not defined.");
  }

  // Initialize the promise only once
  if (!cached.promise) {
    cached.promise = mongoose
      .connect(uri, { bufferCommands: false })
      .then((mongoose) => mongoose.connection)
      .catch((error) => {
        console.error("MongoDB connection error:", error);
        throw error;
      });
  }

  // Wait for the promise to resolve and cache the connection
  cached.conn = await cached.promise;
  return cached.conn;
};

// Ensure the cached connection object persists across HMR in development
if (process.env.NODE_ENV !== "production") global.mongoose = cached;
