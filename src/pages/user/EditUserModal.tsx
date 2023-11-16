import { ChangeEvent, PropsWithChildren, SyntheticEvent, useCallback, useMemo, useState } from 'react';
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
import { useClientContext, Group, User } from '../../client';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { filterUnAssignedGroups } from './utils';

interface OwnProps {
  open: boolean;
  onModalOpen: (open: boolean) => void;
  user: User;
}

type Props = PropsWithChildren<OwnProps>;

export function EditUserModal(props: Props) {
  const { open, onModalOpen, user } = props;
  const [name, setName] = useState(user.name);
  const [groups, setGroups] = useState<Group[]>([]);

  const queryClient = useQueryClient();
  const { editUser, getGroups } = useClientContext();
  const { data, isLoading } = useQuery({ queryKey: ['groups'], queryFn: getGroups });
  const { mutate } = useMutation({
    mutationFn: ({ name, groups }: { name: string; groups: string[] }) => editUser(user.id, name, groups),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user', user.id] });
    },
  });

  const unAssignedGroups = useMemo(() => filterUnAssignedGroups(data ?? [], user.groups), [data, user.groups]);

  const closeModal = useCallback(() => {
    onModalOpen(false);
  }, [onModalOpen]);

  const onChangeName = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  }, []);

  const onChangeGroup = useCallback((e: SyntheticEvent, value: Group[]) => {
    setGroups(value);
  }, []);

  const onEditUser = useCallback(() => {
    mutate({ name, groups: groups.map((item) => item.id) });
    onModalOpen(false);
  }, [mutate, name, onModalOpen, groups]);

  if (!data) {
    return null;
  }

  return (
    <Dialog fullWidth={true} open={open} onClose={closeModal}>
      <DialogTitle>Edit Group</DialogTitle>
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
            options={unAssignedGroups}
            onChange={onChangeGroup}
            getOptionLabel={(option) => option?.name}
            renderInput={(params) => <TextField {...params} variant="outlined" label="Group" />}
          />
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={closeModal}>Cancel</Button>
        <Button variant="contained" onClick={onEditUser} disabled={!name || !groups.length}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
