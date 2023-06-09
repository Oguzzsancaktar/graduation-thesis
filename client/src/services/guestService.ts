import axiosInstance from "@/config/axios.instance";
import { IGuest } from "@/models";


const createGuest = async (reservation: IGuest) => {
  const response = await axiosInstance.post<IGuest>('/guests', reservation);
  return response.data;
}

const getGuests = async () => {
  const response = await axiosInstance.get<IGuest[]>('/guests');
  return response.data;
}

const updateGuest = async (reservation: IGuest) => {
  const _id = reservation._id as string;
  const response = await axiosInstance.put<IGuest>(`/guests/${_id}`, reservation);
  return response.data;
}


export  {
  createGuest,
  getGuests,
  updateGuest
}
