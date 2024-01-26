import * as bcrypt from "bcryptjs";
import * as crypto from "crypto";

class User {
  username: string;
  email: string;
  photo: string;
  password: string;
  role: "user" | "admin";
  isVerify: boolean;
  passwordResetToken: string;
  passwordResetExpires: string;
  constructor(data: Partial<User>) {
    if (!data.username || !data.email) {
      throw new Error("username, email are required.");
    }

    this.username = data.username;
    this.email = data.email;
    this.photo = data.photo || "default.jpg";
    this.password = data.password || "";
    this.role = data.role || "user";
    this.isVerify = data.isVerify || false;
    this.passwordResetToken = data.passwordResetToken || "";
    this.passwordResetExpires = data.passwordResetExpires || "";
  }

  async hashPassword(): Promise<void> {
    this.password = await bcrypt.hash(this.password, 6);
  }

  async correctPassword(candidatePassword: string): Promise<boolean> {
    return await bcrypt.compare(candidatePassword, this.password);
  }

  createPasswordResetToken(): string {
    const resetToken = crypto.randomBytes(32).toString("hex");
    this.passwordResetToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
    this.passwordResetExpires = new Date(
      Date.now() + 10 * 60 * 1000
    ).toISOString();
    return resetToken;
  }
}

export default User;
