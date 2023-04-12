import mongoose from "mongoose";

// export interface Provider {
//   name: "google";
//   providerId: "google.com";
//   uid: string;
//   info: {
//     photoURL: string;
//     phoneNumber: string;
//   };
// }

const UserSchema = new mongoose.Schema(
  {
    firebaseId: {
      require: true,
      type: String
    },
    displayName: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      trim: true
    },
    phone: String,
    photoUrl: String,
    fcm: String,
    lastLoginAt: String,
    providerUserInfo: {
      type: Object
    },
    device: {
      type: Object
    },
    emailVerified: Boolean,
    phoneVerified: Boolean
  },
  { timestamps: true }
);

export const UserModel = mongoose.model("user", UserSchema);
