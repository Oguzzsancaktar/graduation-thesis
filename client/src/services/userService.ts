import axiosInstance from "@/config/axios.instance";
import { IUser } from "@/models";


const createUser = async (user: IUser) => {
  const response = await axiosInstance.post<IUser>('/users', user);
  return response.data;
}

const getUsers = async () => {
  const response = await axiosInstance.get<IUser[]>('/users');
  return response.data;
}

const updateUser = async (user: IUser) => {
  const _id = user._id as string;
  const response = await axiosInstance.put<IUser>(`/users/${_id}`, user);
  return response.data;
}


export  {
  createUser,
  getUsers,
  updateUser
}
