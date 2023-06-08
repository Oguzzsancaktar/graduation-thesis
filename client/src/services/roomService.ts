import axiosInstance from "@/config/axios.instance";
import { IRoom } from "@/models";


const createRoom = async (user: IRoom) => {
  const response = await axiosInstance.post<IRoom>('/rooms', user);
  return response.data;
}

const getRooms = async () => {
  const response = await axiosInstance.get<IRoom[]>('/rooms');
  return response.data;
}

const updateRoom = async (user: IRoom) => {
  const _id = user._id as string;
  const response = await axiosInstance.put<IRoom>(`/rooms/${_id}`, user);
  return response.data;
}


export  {
  createRoom,
  getRooms,
  updateRoom
}
