import { Box, Button, Container, Typography } from '@mui/material';
import { PropsWithChildren, useState } from 'react';
import { useClientContext } from '../../client';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { EditUserModal } from './EditUserModal';
import  UserGroupsTable from './UserGroupsTable';
import { Loading } from '../../components/loading';

interface OwnProps {}

type Props = PropsWithChildren<OwnProps>;

export function UserPage(props: Props) {
  const [modalOpen, setModalOpen] = useState(false);
  const { getUser } = useClientContext();
  const { id = '' } = useParams<'id'>();
  const { data, isLoading } = useQuery({ queryKey: ['user', id], queryFn: () => getUser(id) });
  if (!data) {
    return null;
  }

  if (isLoading) {
    return <Loading />;
  }
  return (
    <Container sx={{ my: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginY: 2 }}>
        <Typography variant="h4">{data?.name}</Typography>
        <Button onClick={() => setModalOpen(true)} variant="contained">
          Edit
        </Button>
      </Box>
      <UserGroupsTable groups={data?.groups ?? []} userId={id} />
      <EditUserModal user={data} open={modalOpen} onModalOpen={setModalOpen} />
    </Container>
  );
}
