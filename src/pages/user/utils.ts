import { Group } from '../../client';

export const filterUnAssignedGroups = (groups: Group[], userGroups: Group[]) => {
  return groups.filter((item) => !userGroups.map((item) => item.id).includes(item.id));
};
