import { PropsWithChildren } from 'react';
import { Route, Routes } from 'react-router-dom';
import { DashboardPage } from '../../pages/dashboard';
import { GroupsPage } from '../../pages/groups';
import { UsersPage } from '../../pages/users';
import { GroupPage } from '../../pages/group';
import { UserPage } from '../../pages/user';

interface OwnProps {}

type Props = PropsWithChildren<OwnProps>;

export function MainRoutes(props: Props) {
  return (
    <Routes>
      <Route path="/" element={<DashboardPage />} />
      <Route path="/groups" element={<GroupsPage />} />
      <Route path="/groups/:id" element={<GroupPage />} />
      <Route path="/users" element={<UsersPage />} />
      <Route path="/users/:id" element={<UserPage />} />
    </Routes>
  );
}
