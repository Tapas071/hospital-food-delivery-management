import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI || "default-mongo-uri";

if (!MONGO_URI) {
  throw new Error("Please define the MONGO_URI environment variable");
}

declare const global: {
  mongoose: { conn: any; promise: any };
};

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    console.log("Connected to MongoDB2 from cache");
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGO_URI, opts).then((mongoose) => {
      console.log("Connected to MongoDB from promise");
      return mongoose;
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;
