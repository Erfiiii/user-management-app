import { PropsWithChildren } from 'react';
import { Navigate } from 'react-router-dom';

interface OwnProps {}

type Props = PropsWithChildren<OwnProps>;

export function DashboardPage(props: Props) {
  return <Navigate to="/groups" />;
}
