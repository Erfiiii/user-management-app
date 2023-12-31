import { User } from '../../client/types';

export const prepareTableData = (data: User[]) => {
  return data.map((item) => ({ ...item, groups: item.groups?.map((group) => group.name).join(', ') }));
};
