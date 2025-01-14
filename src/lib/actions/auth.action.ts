import Users from "@/models/Users";
import dbConnect from "../dbConnect";
interface IUserLoginCredentials {
    email: string;
    password: string;
    }

export const loginUser = async (user: IUserLoginCredentials) => {
  try {
    await dbConnect();

    const foundUser = await Users.findOne({ email: user.email });

    if (!foundUser) {
      return { statusCode: 401, message: "User not found" };
    }

    // const isPasswordMatch = await bcrypt.compare(user.password, foundUser.password);
    const isPasswordMatch = user.password === foundUser.password;
    console.log(isPasswordMatch);

    if (!isPasswordMatch) {
      return { statusCode: 401, message: "Invalid credentials" };
    }
    console.log("foundUser", foundUser);
    return {
      statusCode: 200,
      user: JSON.parse(JSON.stringify(foundUser)),
    };
  } catch (error) {
    console.error("Error logging in user:", error);
    return { statusCode: 500, message: "Internal server error" };
  }
};
