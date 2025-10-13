export default interface IUser {
  name: string;
  email: string;
  password: string;
  phone?: number; // Optional fields
  address?: string;
  role: "Admin" | "Staff" | "User";
}
