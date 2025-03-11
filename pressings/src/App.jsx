import { Outlet } from 'react-router-dom';

function App() {
  console.log('App component is rendering');
  return (
    <div className="app">
      {/* Debug message to verify content is rendering */}
      <h2>App Container is Working</h2>
      <Outlet /> {/* This is where the child routes will render */}
    </div>
  );
}

export default App;