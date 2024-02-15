import { Fab } from '@mui/material';
import './App.css';
import styled from '@emotion/styled';

const OptionsContainer = styled.div`
  height: 200px;
  overflow: auto;
  width: min-content;
  ::-webkit-scrollbar {
    width: 4px;
    border-radius: 8px;
  }
  ::-webkit-scrollbar-thumb {
      background-color: #3498db;
  }
`

const FabStyled = styled(Fab)`
  margin-top: 16px;
`

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Fab color="primary" aria-label="add">
          +
        </Fab>
        <OptionsContainer>
          <FabStyled>
            +
          </FabStyled>
          <FabStyled>
            +
          </FabStyled>
          <FabStyled>
            +
          </FabStyled>
          <FabStyled>
            +
          </FabStyled>
          <FabStyled>
            +
          </FabStyled>
        </OptionsContainer>
      </header>
    </div>

  );
}

export default App;
