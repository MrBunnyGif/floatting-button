import { Button, Fab, css, keyframes } from '@mui/material';
import './App.css';
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';


const expand = keyframes`
  from {
    height: 0px;
  }

  to {
    height: 248px;
  }
`;

const shrink = keyframes`
  from {
    height: 248px;
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
const a = keyframes`
  from{
    width: auto;
    border-radius: auto;
  }
  to{
    width: 56px;
    border-radius: 28px;
  }
`
const b = keyframes`
  from{
    width: 56px;
    border-radius: 28px;
  }
  to{
    width: auto;
    border-radius: auto;
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

const MainButton = styled(Button)`
  animation: 
  /* ${({ isOpen }) => isOpen === false ? rotateOut : isOpen === true ? rotateIn : ""} .3s alternate forwards,
  ${({ isOpen }) => isOpen ? "" : floatAnimation} 2s infinite ease-in-out, */
  ${({ mainBtnExpanded }) => mainBtnExpanded ? b : a} .2s alternate forwards;
  height: 56px;
  min-width: 56px;
  `

const OptionsContainer = styled.div`
  height: ${p => p.isOpen ? css`248px` : css`0`};
  overflow: auto;
  width: min-content;
  ::-webkit-scrollbar {
    width: 0px;
    border-radius: 8px;
  }
  ::-webkit-scrollbar-thumb {
      background-color: #3498db;
  }
  animation: ${({ isOpen }) => isOpen === false ? shrink : isOpen === true ? expand : ""} 0.3s alternate;
  border-radius: 2rem 2rem 0 0;
  transform: translateY(2rem);
`

const FabStyled = styled(Fab)`
  margin-top: 16px;
`

const Spacer = styled.section`
  height: 75vh;
  border: 2px solid tomato;
  border-radius: 2rem;
`

function App() {
  const [isMenuOpen, setMenuState] = useState(undefined)
  const [mainBtnExpanded, setMainBtnState] = useState(true)
  const [displayText, setTextState] = useState(true)

  const a = (e) => {
    if (window.scrollY === 0)
      setMainBtnState(true)
    else if (mainBtnExpanded)
      setMainBtnState(false)
  }

  useEffect(() => {
    window.addEventListener("scroll", a)
  })

  useEffect(() => {
    if (isMenuOpen && mainBtnExpanded)
      setMainBtnState(false)
    else if (window.scrollY === 0 && !isMenuOpen && !mainBtnExpanded)
      setMainBtnState(true)
  }, [isMenuOpen, mainBtnExpanded])

  const endMainBtnAnimation = e => {
    if (e.animationName.includes("1r"))
      setTextState(true)
  }
  // 1d = encolhe
  // 1r = cresce

  const startMainBtnAnimation = e => {
    if (e.animationName.includes("1d"))
      setTextState(false)
  }

  return (
    <div className="App">
      <header className="App-header">
        <div style={{
          zIndex: 2,
          position: "fixed",
          bottom: "1rem",
          right: "1rem",
        }}>
          <OptionsContainer isOpen={isMenuOpen}>
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
            <FabStyled style={{ marginBottom: "3rem" }}>
              +
            </FabStyled>
          </OptionsContainer>
          <MainButton onAnimationStart={startMainBtnAnimation} onAnimationEnd={endMainBtnAnimation} mainBtnExpanded={mainBtnExpanded} variant='contained' isOpen={isMenuOpen} color="primary" aria-label="add" onClick={() => setMenuState(p => !p)}>
            {displayText ? "Teste " : ""}
            +
          </MainButton>
        </div>
        {
          isMenuOpen ?
            <div onClick={() => setMenuState(p => !p)}
              style={{
                position: "fixed",
                inset: 0,
                zIndex: 1
              }}></div>
            :
            <></>
        }
        <Spacer />
        <Spacer />
        <Spacer />
      </header>
    </div>

  );
}

export default App;
