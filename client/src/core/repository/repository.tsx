import { FC, useState } from 'react';
import Container from '@mui/material/Container';
import { RepositoryList } from './list/repository-list';
import { RepositoryDetail } from './detail/repository-detail';

export const Repository: FC = () => {
  const [selectedRepository, setSelectedRepository] = useState<string | null>(null);

  const handleRepositorySelect = (repositoryName: string) => {
    setSelectedRepository(repositoryName);
  };


  return (
    <Container component="main" maxWidth="lg" sx={{ mt: 4, mb: 4, flex: 1 }}>
      {selectedRepository ? (
        <RepositoryDetail
          repositoryName={selectedRepository}
          onBackToList={() => setSelectedRepository(null)}
          setSelectedRepository={setSelectedRepository}
        />
      ) : (
        <RepositoryList
          onRepositorySelect={handleRepositorySelect}
        />
      )}
    </Container>
  );
};
