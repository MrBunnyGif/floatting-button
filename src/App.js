import { Fab, css, keyframes } from '@mui/material';
import './App.css';
import styled from '@emotion/styled';
import { useState } from 'react';


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

const rotateIn = keyframes`
  from{
    rotate:0deg
  }
  to{
    rotate:45deg
  }
`
const rotateOut = keyframes`
  from{
    rotate:45deg
  }
  to{
    rotate:0deg
  }
`

const floatAnimation = keyframes`
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-8px);
  }
  100% {
    transform: translateY(0);
  }
`;

const MainButton = styled(Fab)`
  animation: ${({ isOpen }) => isOpen === false ? rotateOut : isOpen === true ? rotateIn : ""} .3s alternate forwards, ${({ isOpen }) => isOpen ? "" : floatAnimation} 2s infinite ease-in-out;
  `

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
  margin-top: 1rem;
`

const FabStyled = styled(Fab)`
  margin-bottom: 16px;
`

function App() {
  const [isOpen, setOpenState] = useState(undefined)

  return (
    <div className="App">
      <header className="App-header">
        {/* TODO: create style const and fix rotate to really be at the bottom */}
        <div style={{
          zIndex: 2,
          position: "fixed",
          bottom: "1rem",
          right: "1rem",
          rotate: "180deg"
        }}>
          <MainButton isOpen={isOpen} color="primary" aria-label="add" onClick={() => setOpenState(p => !p)}>
            +
          </MainButton>
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
        </div>
        {
          isOpen ?
            <div onClick={() => setOpenState(p => !p)}
              style={{
                position: "fixed",
                inset: 0,
                zIndex: 1
              }}></div>
            :
            <></>
        }
      </header>
    </div>

  );
}

export default App;
