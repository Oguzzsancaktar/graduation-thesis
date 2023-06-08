import { IUser } from '@/models';
const getFirstLetters = (str: string) => {
  const words = str.split(' ');
  const firstLetters = words.map((word) => word[0]);
  return firstLetters.join('');
}

const getFullName = (user:IUser) => {
  return `${user.name} ${user.surname}`;
}

export {
  getFirstLetters,
  getFullName
}