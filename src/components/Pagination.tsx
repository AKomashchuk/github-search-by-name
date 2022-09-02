import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { RootState } from '../app/store';
import { useSelector } from 'react-redux';

type Props = {
  page: number,
  onSubmit: (event: React.ChangeEvent<unknown>, value?: number) => void,
}

export default function PaginationComponent({ page, onSubmit }: Props) {
  const count = useSelector((state: RootState) => state.reposetories.totalCount);
  const countPages = Math.ceil(count / 30) || 1;

  return (
    <div className="container">
      <Stack spacing={2} className='pagination'>
        <Pagination
          count={countPages}
          page={page}
          onChange={onSubmit}
        />
      </Stack>
    </div>
  );
}
