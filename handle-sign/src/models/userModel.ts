import * as bcrypt from "bcryptjs";
// import crypto from "crypto";

class User {
  username: string;
  email: string;
  photo: string;
  password: string;
  role: "user" | "admin";
  isVerify: boolean;

  constructor(data: Partial<User>) {
    if (!data.username || !data.email || !data.password) {
      throw new Error(
        "username, email, password, and passwordConfirm are required."
      );
    }

    this.username = data.username;
    this.email = data.email;
    this.photo = data.photo || "default.jpg";
    this.password = data.password;
    this.role = data.role || "user";
    this.isVerify = data.isVerify || false;
  }

  async hashPassword(): Promise<void> {
    this.password = await bcrypt.hash(this.password, 6);
  }

  async correctPassword(candidatePassword: string): Promise<boolean> {
    return await bcrypt.compare(candidatePassword, this.password);
  }

  // createPasswordResetToken(): string {
  //   const resetToken = crypto.randomBytes(32).toString("hex");
  //   this.passwordResetToken = crypto
  //     .createHash("sha256")
  //     .update(resetToken)
  //     .digest("hex");
  //   this.passwordResetExpires = new Date(Date.now() + 10 * 60 * 1000);
  //   return resetToken;
  // }
}

export default User;
