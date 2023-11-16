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
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Link as RouterLink } from 'react-router-dom';
import { PropsWithChildren, memo, useCallback, useMemo } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { useClientContext } from '../../client';
import { prepareTableData } from './utils';
import { Loading } from '../../components/loading';

interface OwnProps {}

type Props = PropsWithChildren<OwnProps>;

function GroupsTable(props: Props) {
  const queryClient = useQueryClient();
  const { getGroupsWithUsers, deleteGroup } = useClientContext();
  const { data, isLoading } = useQuery({ queryKey: ['groups'], queryFn: getGroupsWithUsers });
  const { mutate } = useMutation({
    mutationFn: deleteGroup,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['groups'] });
    },
  });

  const groups = useMemo(() => prepareTableData(data ?? []), [data]);

  const onDeleteGroup = useCallback((id: string) => mutate(id), [mutate]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Users</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {groups.map((group) => (
            <TableRow key={group.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell>
                <Link component={RouterLink} to={`/groups/${group.id}`}>
                  {group.name}
                </Link>
              </TableCell>
              <TableCell>{group.users}</TableCell>
              <TableCell>
                <Box>
                  <IconButton
                    color="error"
                    size="small"
                    disabled={!!group.users?.length}
                    onClick={() => onDeleteGroup(group.id)}
                  >
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

export default memo(GroupsTable);
