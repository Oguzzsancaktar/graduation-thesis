import { EGuestStatus } from "@/constants";

 interface IGuest {
  _id?: string;
  name: string;
  surname: string;
  email: string;
  passwordNo: string;
  phone: string;
  status:EGuestStatus
}

export default IGuest;
