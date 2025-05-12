import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  f_name: { type: String, default: "" },
  m_name: { type: String, default: "" },
  l_name: { type: String, default: "" },
  dob: { type: String, default: "" },
  age: { type: String, default: "" },
  mobile_no: {
    type: String,

    sparse: true,
    default: null,
  },
  email_id: {
    type: String,

    sparse: true,
    default: null,
  },

  password: { type: String, default: "" },
  confirm_password: { type: String, default: "" },
  location: {
    lat: { type: String, default: "" },
    lan: { type: String, default: "" },
  },

  address: {
    line1: { type: String, default: "" },
    line2: { type: String, default: "" },
    pincode: { type: String, default: "" },
    state: { type: String, default: "" },
    dist: { type: String, default: "" },
    landmark: { type: String },
  },

  is_verified: { type: Boolean, default: false },

  info: {
    current_education: { type: String, default: "" },
    education: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "StudentEducation",
    },
  },

  profile_image: { type: String, default: "" },
  role: {
    type: String,
    enum: ["GUEST", "USER"],
    default: "USER",
  },
  subrole: { type: String, default: null },
});
UserSchema.pre("save", function (next) {
  if (this.dob) {
    const birthDate = new Date(this.dob);

    console.log(birthDate);
    const formattedDOB = birthDate.toISOString().split("T")[0];
    this.dob = formattedDOB;

    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    this.age = age;
  }
  next();
});

const User = mongoose.model("SignUp", UserSchema);
export default User;
