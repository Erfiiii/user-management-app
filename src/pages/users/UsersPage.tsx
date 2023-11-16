import { PropsWithChildren, useCallback, useState } from 'react';
import  UsersTable from './UsersTable';
import { AddUserModal } from './AddUserModal';
import { Box, Button, Container, Typography } from '@mui/material';

interface OwnProps {}

type Props = PropsWithChildren<OwnProps>;

export function UsersPage(props: Props) {
  const [modalOpen, setModalOpen] = useState(false);
  const onOpenModal = useCallback((open: boolean) => {
    setModalOpen(open);
  }, []);

  return (
    <Container>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginY: 2 }}>
        <Typography variant="h4">Users List</Typography>
        <Button onClick={() => onOpenModal(true)} variant="contained">
          Add User
        </Button>
      </Box>
      <UsersTable />
      <AddUserModal open={modalOpen} onModalOpen={setModalOpen} />
    </Container>
  );
}
