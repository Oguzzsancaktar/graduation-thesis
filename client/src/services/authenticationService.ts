import axiosInstance from "@/config/axios.instance";
import { IUser } from "@/models";

export const signIn = async (credentials:Pick<IUser,"email"|"password">) => {
 const response = await axiosInstance.post<IUser>("/auth/signIn", credentials);
  return response.data;
}
