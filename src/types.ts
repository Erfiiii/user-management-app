export interface Group {
  id: string;
  name: string;
  users: User[];
}

export interface User {
  id: string;
  name: string;
  groups: Group[];
}

export interface Membership {
  id: string;
  userId: string;
  groupId: string;
  user: User;
  group: Group;
}

export interface ClientContextType {
  getGroupsWithUsers: () => Promise<Group[]>;
  getGroups: () => Promise<Group[]>;
  getGroup: (id: string) => Promise<Group>;
  addGroup: (name: string) => Promise<void>;
  deleteGroup: (id: string) => Promise<void>;
  removeMembership: (id: string, groupId: string) => Promise<void>;
  getUsers: () => Promise<User[]>;
  getUsersWithGroups: () => Promise<User[]>;
  getUser: (id: string) => Promise<User>;
  addUser: (name: string, groups: string[]) => Promise<void>;
  deleteUser: (id: string) => Promise<void>;
  editUser: (id: string, name: string, groups: string[]) => Promise<void>;
}
