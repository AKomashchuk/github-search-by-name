import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { Data, fetchReposetoriesByName } from '../app/api';
import { useAppDispatch } from '../app/hooks';

type Props = {
  count: any,
  query: string,
}

export default function PaginationComponent({ count, query }: Props) {
  const [page, setPage] = React.useState(1);
  const dispatch = useAppDispatch();
  const countPages = Math.ceil(count / 30) | 1;
  const params: Data = {
    name: query,
    page,
  }

  const handleChange = async(event: React.ChangeEvent<unknown>, value: number) => {
    dispatch(fetchReposetoriesByName(params))

    setPage(value);
  }

  return (
    <Stack spacing={2}>
      <Pagination
        count={countPages}
        page={page}
        onChange={handleChange}
      />
    </Stack>
  );
}
