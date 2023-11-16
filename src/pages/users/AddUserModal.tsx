import { ChangeEvent, PropsWithChildren, SyntheticEvent, useCallback, useState } from 'react';
import {
  Autocomplete,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';
import { useClientContext } from '../../client/ClientContext';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Group } from '../../types';

interface OwnProps {
  open: boolean;
  onModalOpen: (open: boolean) => void;
}

type Props = PropsWithChildren<OwnProps>;

export function AddUserModal(props: Props) {
  const { open, onModalOpen } = props;
  const [groups, setGroups] = useState<Group[]>([]);
  const [name, setName] = useState('');

  const queryClient = useQueryClient();
  const { addUser, getGroups } = useClientContext();
  const { data, isLoading } = useQuery({ queryKey: ['groups'], queryFn: getGroups });
  const { mutate } = useMutation({
    mutationFn: ({ name, groups }: { name: string; groups: string[] }) => addUser(name, groups),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });

  const closeModal = useCallback(() => {
    onModalOpen(false);
  }, [onModalOpen]);

  const onChangeName = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  }, []);

  const onChangeGroup = useCallback((e: SyntheticEvent, value: Group[]) => {
    setGroups(value);
  }, []);

  const createUser = useCallback(() => {
    const groupIds = groups.map((group) => group.id);
    mutate({ name, groups: groupIds });
    onModalOpen(false);
  }, [mutate, name, onModalOpen, groups]);

  return (
    <Dialog fullWidth={true} open={open} onClose={closeModal}>
      <DialogTitle>Add Group</DialogTitle>
      <DialogContent>
        <TextField
          sx={{ my: 1 }}
          autoFocus
          fullWidth
          margin="dense"
          id="name"
          label="Name"
          type="text"
          variant="outlined"
          value={name}
          onChange={onChangeName}
        />
        {isLoading ? (
          <CircularProgress disableShrink />
        ) : (
          <Autocomplete
            multiple
            options={data ?? []}
            onChange={onChangeGroup}
            getOptionLabel={(option) => option?.name}
            renderInput={(params) => <TextField {...params} variant="outlined" label="Group" />}
          />
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={closeModal}>Cancel</Button>
        <Button variant="contained" onClick={createUser} disabled={!name || !groups.length}>
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
}
