import {
  Box,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Link,
} from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Link as RouterLink } from 'react-router-dom';
import { PropsWithChildren, memo, useCallback } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { useClientContext } from '../../client/ClientContext';
import { User } from '../../client';

interface OwnProps {
  groupId: string;
  users: User[];
}

type Props = PropsWithChildren<OwnProps>;

function GroupUsersTable(props: Props) {
  const { groupId, users } = props;

  const { removeMembership } = useClientContext();
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: (userId: string) => removeMembership(userId, groupId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['group', groupId] });
    },
  });

  const onDeleteUser = useCallback(
    (userId: string) => {
      mutate(userId);
    },
    [mutate],
  );

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>User</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell>
                <Link component={RouterLink} to={`/users/${user.id}`}>
                  {user.name}
                </Link>
              </TableCell>
              <TableCell>
                <Box>
                  <IconButton color="error" size="small" onClick={() => onDeleteUser(user.id)}>
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default memo(GroupUsersTable)
