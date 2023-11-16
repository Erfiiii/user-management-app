import { Box, Container, Typography } from '@mui/material';
import { PropsWithChildren } from 'react';
import GroupUsersTable from './GroupUsersTable';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { Loading } from '../../components/loading';
import { useClientContext } from '../../client';

interface OwnProps {}

type Props = PropsWithChildren<OwnProps>;

export function GroupPage(props: Props) {
  const { id = '' } = useParams<'id'>();
  const { getGroup } = useClientContext();
  const { data, isLoading } = useQuery({ queryKey: ['group', id], queryFn: () => getGroup(id) });

  if (isLoading) {
    return <Loading />;
  }
  return (
    <Container>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginY: 2 }}>
        <Typography variant="h4">{data?.name}</Typography>
      </Box>
      <GroupUsersTable users={data?.users ?? []} groupId={id} />
    </Container>
  );
}
