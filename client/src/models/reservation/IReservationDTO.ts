import {  IGuest, IReservation, IRoom } from "..";

 interface IReservationDTO extends Omit<IReservation, '_id' | "room"|"guest"> {
  room:IRoom['_id'];
  guest: IGuest['_id'];
}

export default IReservationDTO;

