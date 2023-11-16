import { ChangeEvent, PropsWithChildren, useCallback, useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { useClientContext } from '../../client';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface OwnProps {
  open: boolean;
  onModalOpen: (open: boolean) => void;
}

type Props = PropsWithChildren<OwnProps>;

export function AddGroupModal(props: Props) {
  const { open, onModalOpen } = props;
  const [name, setName] = useState('');

  const queryClient = useQueryClient();
  const { addGroup } = useClientContext();
  const { mutate } = useMutation({
    mutationFn: addGroup,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['groups'] });
    },
  });


  const closeModal = useCallback(() => {
    onModalOpen(false);
  }, [onModalOpen]);

  const onChangeName = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  }, []);

  const createGroup = useCallback(() => {
    mutate(name);
    onModalOpen(false);
  }, [mutate, name, onModalOpen]);

  return (
    <Dialog fullWidth={true} open={open} onClose={closeModal}>
      <DialogTitle>Add Group</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          fullWidth
          margin="dense"
          label="Name"
          type="text"
          variant="outlined"
          value={name}
          onChange={onChangeName}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={closeModal}>Cancel</Button>
        <Button variant="contained" onClick={createGroup}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
