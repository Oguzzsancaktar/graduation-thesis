import { EReservationStatus } from "@/constants";
import { IGuest, IRoom } from "..";

 interface IReservation {
  _id: string;
  room:IRoom;
  guest: IGuest;
  startDate: Date;
  endDate: Date;
  price: number;
  status:EReservationStatus
  checkIn: boolean;
}

export default IReservation;

