import {EUserRole,EUserStatus} from "@/constants";

 interface IUser {
  _id?: string;
  name: string;
  surname: string;
  email: string;
  password: string;
  role: EUserRole;
  status: EUserStatus;
}

export default IUser;
