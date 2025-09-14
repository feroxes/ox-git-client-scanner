import { FC } from 'react';
import { TopBar } from '../components/top-bar';
import { TokenForm } from './token/token-form';
import { Repository } from './repository/repository';
import { useTokenContext } from '../contexts/token-context';
import { DataStateResolver } from '../components/data-state-resolver';

const App: FC = () => {
  const { token, isLoading } = useTokenContext();

  const tokenQuery = {
    data: token,
    loading: isLoading,
    error: null,
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <TopBar />
      <DataStateResolver query={tokenQuery}>
        {({ data }) => (!data ? <TokenForm /> : <Repository />)}
      </DataStateResolver>
    </div>
  );
};

export default App;
