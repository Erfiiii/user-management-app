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
import { Group } from '../../types';

interface OwnProps {
  userId: string;
  groups: Group[];
}

type Props = PropsWithChildren<OwnProps>;

function UserGroupsTable(props: Props) {
  const { userId, groups } = props;

  const { removeMembership } = useClientContext();
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: (groupId: string) => removeMembership(userId, groupId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user', userId] });
    },
  });

  const onDeleteGroup = useCallback((groupId: string) => mutate(groupId), [mutate]);

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Group</TableCell>
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
              <TableCell>
                <Box>
                  <IconButton
                    disabled={groups.length <= 1}
                    color="error"
                    size="small"
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

export default memo(UserGroupsTable)
