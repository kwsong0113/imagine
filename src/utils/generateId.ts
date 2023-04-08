import uuid from 'react-native-uuid';

export const generateId = () => {
  return uuid.v4() as string;
};
