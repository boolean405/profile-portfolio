// src/lib/db.ts
import mongoose from "mongoose";

declare global {
  // eslint-disable-next-line no-var
  var __mongooseConn: Promise<typeof mongoose> | undefined;
}

const MONGODB_URI = process.env.MONGODB_URI!;
if (!MONGODB_URI) throw new Error("MONGODB_URI is not set");

export function connectDB() {
  if (!global.__mongooseConn) {
    global.__mongooseConn = mongoose.connect(MONGODB_URI, {
      // You can add options if needed; Mongoose 8 sets good defaults
    });
  }
  return global.__mongooseConn;
}
