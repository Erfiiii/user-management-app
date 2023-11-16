import { Group } from '../../types';

export const prepareTableData = (data: Group[]) => {
  return data?.map((item) => ({ ...item, users: item.users?.map((user) => user.name).join(', ') }));
};
