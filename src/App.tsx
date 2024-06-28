import { FC } from 'react';
import { BrowserRouter } from 'react-router-dom';
import RoutingPage from './pages/Routing-page/Routing.page';
import { observer } from 'mobx-react-lite';
import './App.css';

const App: FC = observer(() => {

  return (
    <BrowserRouter>
      <RoutingPage />
    </BrowserRouter>
  );
});

export default App;
