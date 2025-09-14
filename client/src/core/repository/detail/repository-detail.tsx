import { FC } from 'react';
import { DataStateResolver } from '../../../components/data-state-resolver';
import { useRepositoryDetail } from '../../../hooks/useRepositoryDetail';
import { RepositoryDetailView } from './repository-detail-view';

interface RepositoryDetailsProps {
  repositoryName: string;
  onBackToList: () => void;
  setSelectedRepository: (repositoryName: string | null) => void;
}

export const RepositoryDetail: FC<RepositoryDetailsProps> = ({
  repositoryName,
  onBackToList,
  setSelectedRepository
}) => {
  const query = useRepositoryDetail(repositoryName);

  return (
    <DataStateResolver query={query}>
      {({ data, error }) => {
        return (
          <RepositoryDetailView
            setSelectedRepository={setSelectedRepository}
            repositoryDataObject={data}
            onBackToList={onBackToList}
            error={error}
          />
        );
      }}
    </DataStateResolver>
  );
};
