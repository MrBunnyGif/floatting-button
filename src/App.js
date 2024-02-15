import { Fab, css, keyframes } from '@mui/material';
import './App.css';
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';


const expand = keyframes`
  from {
    height: 0px;
  }

  to {
  height: 200px;
  }
`;

const shrink = keyframes`
  from {
    height: 200px;
  }

  to {
  height: 0px;
  }
`;

const OptionsContainer = styled.div`
  height: ${p => p.isOpen ? css`200px` : css`0`};
  overflow: auto;
  width: min-content;
  ::-webkit-scrollbar {
    width: 4px;
    border-radius: 8px;
  }
  ::-webkit-scrollbar-thumb {
      background-color: #3498db;
  }
  animation: ${({ isOpen }) => isOpen === false ? shrink : isOpen === true ? expand : ""} 0.3s alternate;
`

const FabStyled = styled(Fab)`
  margin-top: 16px;
`

function App() {
  const [isOpen, setOpenState] = useState(undefined)

  return (
    <div className="App">
      <header className="App-header">
        <Fab color="primary" aria-label="add" onClick={() => setOpenState(p => !p)}>
          +
        </Fab>
        <OptionsContainer isOpen={isOpen}>
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
