import {ERoomStatus} from "@/constants";

 interface IRoom {
  _id?: string;
  name: string;
  status: ERoomStatus;
}

export default IRoom;
