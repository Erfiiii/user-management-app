import { Group, User, Membership } from './types';
import { BASE_URL } from './constans';

const getGroupsWithUsers = async () => {
  const groupsRes = await fetch(`${BASE_URL}/groups`);
  const groups = (await groupsRes.json()) as Group[];
  const membershipsRes = await fetch(`${BASE_URL}/memberships?_expand=user`);
  const memberships = (await membershipsRes.json()) as Membership[];

  return groups.map((group) => {
    const users: User[] = [];
    memberships.forEach((item) => {
      if (item.groupId === group.id) {
        users.push(item.user);
      }
    });
    return { ...group, users };
  });
};

const getGroups = async () => {
  const groupsRes = await fetch(`${BASE_URL}/groups`);
  return (await groupsRes.json()) as Group[];
};

const getGroup = async (id: string) => {
  const groupRes = await fetch(`${BASE_URL}/groups/${id}`);
  const group = await groupRes.json();
  const membershipsRes = await fetch(`${BASE_URL}/memberships?groupId=${id}&_expand=user`);
  const memberships = (await membershipsRes.json()) as Membership[];

  const users = memberships.map((item) => item.user);

  return { ...group, users };
};

const addGroup = async (name: string) => {
  await fetch(`${BASE_URL}/groups`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name }),
  });
};

const deleteGroup = async (id: string) => {
  await fetch(`${BASE_URL}/groups/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

const removeMembership = async (userId: string, groupId: string) => {
  const membershipRes = await fetch(`${BASE_URL}/memberships?groupId=${groupId}&&userId=${userId}`);
  const membership = await membershipRes.json();
  await fetch(`${BASE_URL}/memberships/${membership[0].id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

const getUsersWithGroups = async () => {
  const usersRes = await fetch(`${BASE_URL}/users`);
  const users = (await usersRes.json()) as User[];
  const membershipsRes = await fetch(`${BASE_URL}/memberships?_expand=group`);
  const memberships = (await membershipsRes.json()) as Membership[];

  return users.map((user) => {
    const groups: Group[] = [];
    memberships.forEach((item) => {
      if (item.userId === user.id) {
        {
          groups.push(item.group as Group);
        }
      }
    });
    return { ...user, groups };
  });
};

const getUsers = async () => {
  const usersRes = await fetch(`${BASE_URL}/users`);
  return (await usersRes.json()) as User[];
};

const getUser = async (id: string) => {
  const userRes = await fetch(`${BASE_URL}/users/${id}`);
  const user = await userRes.json();
  const membershipsRes = await fetch(`${BASE_URL}/memberships?userId=${id}&_expand=group`);
  const memberships = (await membershipsRes.json()) as Membership[];
  const groups = memberships.map((item) => item.group);

  return { ...user, groups };
};

const addUser = async (name: string, groups: string[]) => {
  const userRes = await fetch(`${BASE_URL}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name }),
  });
  const user = await userRes.json();
  const memberships = groups.map((group) => ({
    groupId: group,
    userId: user.id,
  }));

  memberships.forEach(async (item) => {
    await fetch(`${BASE_URL}/memberships`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(item),
    });
  });
};

const editUser = async (id: string, name: string, groups: string[]) => {
  const userRes = await fetch(`${BASE_URL}/users/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name }),
  });
  const user = await userRes.json();
  const memberships = groups.map((group) => ({
    groupId: group,
    userId: user.id,
  }));

  const updateMemberships = memberships.map(async (item) => {
    await fetch(`${BASE_URL}/memberships`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(item),
    });
  });

  await Promise.all(updateMemberships);
};

const deleteUser = async (id: string) => {
  await fetch(`${BASE_URL}/users/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const client = {
  getGroupsWithUsers,
  getGroups,
  getGroup,
  addGroup,
  deleteGroup,
  removeMembership,
  getUsersWithGroups,
  getUsers,
  getUser,
  addUser,
  deleteUser,
  editUser,
};
