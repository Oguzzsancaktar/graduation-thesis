import axiosInstance from "@/config/axios.instance";
import { IReservation, IReservationDTO } from "@/models";


const createReservation = async (reservation: IReservationDTO) => {
  const response = await axiosInstance.post<IReservation>('/reservations', reservation);
  return response.data;
}

const getReservation = async (reservationId: IReservation["_id"]) => {
  const response = await axiosInstance.get<IReservation>(`/reservations/${reservationId}`);
  return response.data;
}

const getReservations = async () => {
  const response = await axiosInstance.get<IReservation[]>('/reservations');
  return response.data;
}

const updateReservation = async (reservation: IReservation) => {
  const _id = reservation._id as string;
  const response = await axiosInstance.put<IReservation>(`/reservations/${_id}`, reservation);
  return response.data;
}


export  {
  createReservation,
  getReservation,
  getReservations,
  updateReservation
}
