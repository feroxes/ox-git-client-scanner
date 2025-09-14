import { FC } from 'react';
import { DataStateResolver } from '../../../components/data-state-resolver';
import { useRepositoryList } from '../../../hooks/useRepositoryList';
import { RepositoryListView } from './repository-list-view';

interface RepositoryListProps {
  onRepositorySelect: (repositoryName: string) => void;
}

export const RepositoryList: FC<RepositoryListProps> = ({
  onRepositorySelect
}) => {
  const query = useRepositoryList();

  return (
    <DataStateResolver query={query}>
      {({data}) => (
        <RepositoryListView
          repositoryDataList={data}
          onRepositorySelect={onRepositorySelect}
        />
      )}
    </DataStateResolver>
  );
};
