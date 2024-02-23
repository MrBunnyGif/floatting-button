import { Button, Fab, css, keyframes } from '@mui/material';
import './App.css';
import styled from '@emotion/styled';
import { useEffect, useMemo, useState } from 'react';


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
  ${({ isopen }) => isopen === false ? rotateOut : isopen === true ? rotateIn : ""} .3s alternate forwards,
  ${({ isopen }) => isopen ? "" : floatAnimation} 2s infinite ease-in-out,
  ${({ mainbuttonexpanded }) => mainbuttonexpanded ? b : a} .2s alternate forwards;
  height: 56px;
  min-width: 56px;
  border-radius:28px;
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
   /* transform: translateY(18px); */
`

const FabStyled = styled(Fab)`
  margin-top: ${({ index }) => index === 0 ? "88px" : "16px"};
  margin-bottom: ${({ index, numberofitems }) => index === numberofitems - 1 ? "88px" : "0"};
   &:hover{
    opacity: 1!important;
  }; 
  
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
  const numberOfItems = 8

  const renderOptions = (numberOfItems) => {
    let items = [];
    console.log("renderizando");
    for (let index = 0; index < 8; index++) {
      const id = Math.random();
      items.push(
        <FabStyled key={id} onClick={(e) => console.log(e)} index={index} numberofitems={numberOfItems} children="0" />
      );
    }
    return items;
  };

  const options = useMemo(() => renderOptions(numberOfItems), [numberOfItems]);

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

  const containerScroll = (e) => {
    const scrollPosition = e.currentTarget.scrollTop;
    const containerHeight = e.currentTarget.clientHeight;

    e.currentTarget.childNodes.forEach(function (box) {
      const boxOffsetTop = box.offsetTop;
      const boxHeight = box.offsetHeight;

      // Calcular a distância relativa do topo e da parte inferior da div pai
      const distanceToTop = boxOffsetTop - scrollPosition;
      const distanceToBottom = scrollPosition + containerHeight - (boxOffsetTop + boxHeight);

      // Calcular a opacidade com base na distância relativa
      let opacity = 1

      if (distanceToTop < (containerHeight / 2) && distanceToBottom < (containerHeight / 2))
        opacity = 1
      else
        opacity = Math.min(distanceToBottom, distanceToTop) / 100

      // TODO: adicionar o gradiente conforme toca na borda e mouse estiver em cima
      // const isAboveMiddle =

      box.innerHTML = `${distanceToTop}<br/>${distanceToBottom}`
      box.style.opacity = opacity;
      // box.style.background = `linear-gradient(to bottom, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0) 25%)` /* gradiente de branco para transparente */
    });
  }

  return (
    < div className="App" >
      <header className="App-header">
        <div style={{
          zIndex: 2,
          position: "fixed",
          bottom: "1rem",
          right: "1rem",
        }}>
          {/* TODO: Ajustar estado inicial do isOpen */}
          <OptionsContainer onScroll={containerScroll} isOpen={isMenuOpen}>
            {/* TODO: ajustar hover quando for negativo */}
            {/* TODO: ajustar opacidade inicial */}
            {options}
          </OptionsContainer>
          <MainButton onAnimationStart={startMainBtnAnimation} onAnimationEnd={endMainBtnAnimation} mainbuttonexpanded={mainBtnExpanded ? "1" : ""} variant='contained' isopen={isMenuOpen} color="primary" aria-label="add" onClick={() => setMenuState(p => !p)}>
            {/* TODO: animar ao abrir ou fechar */}
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
    </div >

  );
}

export default App;
