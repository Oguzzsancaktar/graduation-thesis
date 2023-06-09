import { IGuest, IRoom } from "..";

 interface IReservation {
  _id: string;
  room:IRoom;
  guest: IGuest;
  startDate: Date;
  endDate: Date;
  price: number;
  checkIn: boolean;
}

export default IReservation;

