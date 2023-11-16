import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Link,
  IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Link as RouterLink } from 'react-router-dom';
import { PropsWithChildren, memo, useCallback, useMemo } from 'react';
import { useClientContext } from '../../client';
import { Loading } from '../../components/loading';
import { prepareTableData } from './utils';

interface OwnProps {}

type Props = PropsWithChildren<OwnProps>;

function UsersTable(props: Props) {
  const { getUsersWithGroups, deleteUser } = useClientContext();
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery({ queryKey: ['users'], queryFn: getUsersWithGroups });
  const { mutate } = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });

  const users = useMemo(() => prepareTableData(data ?? []), [data]);

  const onDeleteUser = useCallback((id: string) => mutate(id), [mutate]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Groups</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users?.map((user) => (
            <TableRow key={user.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell>
                <Link component={RouterLink} to={`/users/${user.id}`}>
                  {user.name}
                </Link>
              </TableCell>
              <TableCell>{user.groups}</TableCell>
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

export default memo(UsersTable);
