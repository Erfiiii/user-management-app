import { PropsWithChildren, useCallback, useState } from 'react';
import { AddGroupModal } from './AddGroupModal';
import  GroupsTable  from './GroupsTable';
import { Box, Button, Container, Typography } from '@mui/material';

interface OwnProps {}

type Props = PropsWithChildren<OwnProps>;

export function GroupsPage(props: Props) {
  const [modalOpen, setModalOpen] = useState(false);
  const onOpenModal = useCallback((open: boolean) => {
    setModalOpen(open);
  }, []);

  return (
    <Container>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginY: 2 }}>
        <Typography variant="h4">Groups List</Typography>
        <Button onClick={() => onOpenModal(true)} variant="contained">
          Add Group
        </Button>
      </Box>
      <GroupsTable />
      <AddGroupModal open={modalOpen} onModalOpen={onOpenModal} />
    </Container>
  );
}
