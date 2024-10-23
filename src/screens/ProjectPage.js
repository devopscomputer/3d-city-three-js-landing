import React, { useEffect } from 'react';
import styled from 'styled-components';

// Link para carregar a fonte do Google Fonts
const FontLink = () => {
  return (
    <link href="https://fonts.googleapis.com/css2?family=Kalam:wght@400&display=swap" rel="stylesheet" />
  );
};

// Estilização do body com fundo e tamanho mínimo
const BodyStyle = styled.div`
  min-height: 100vh;
  background-image: url("https://images.unsplash.com/photo-1531685250784-7569952593d2?crop=entropy&cs=srgb&fm=jpg&ixid=M3wzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2OTMyOTE2OTh8&ixlib=rb-4.0.3&q=100&w=3000");
  background-size: cover;
  overflow-x: hidden;
  font-family: 'Kalam', sans-serif;
`;

// Estilização da galeria
const GalleryContainer = styled.div`
  position: relative;
  left: 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 20px;
  max-width: 100vw;
  padding: 20px;
`;

// Estilização para os itens da galeria
const Figure = styled.figure`
  position: relative;
  margin: 0;
  padding: 0.5rem;
  border-radius: 5px;
  box-shadow: 0 7px 8px rgba(0, 0, 0, 0.4);
  background-color: ghostwhite;
  overflow: hidden;
  outline: 1px solid transparent;
  will-change: transform;
  transition: all 1s ease-in-out;
  transform-origin: center 0.22rem;

  &:nth-child(odd) {
    animation-duration: 1s;
    animation-timing-function: ease-in-out;
    animation-name: sway;
  }

  &:nth-child(even) {
    animation-duration: 1.5s;
    animation-timing-function: ease-in-out;
    animation-name: sway;
  }

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.5);
  }

  &::after {
    content: "";
    position: absolute;
    top: 0.22rem;
    left: 50%;
    width: 0.7rem;
    height: 0.7rem;
    background: var(--pin-color);
    border-radius: 50%;
    box-shadow: -0.1rem -0.1rem 0.3rem 0.02rem rgba(0, 0, 0, 0.5) inset;
    transform: translateX(-50%);
    z-index: 2;
  }

  &:nth-child(7n)::after {
    --pin-color: crimson;
  }

  &:nth-child(7n + 1)::after {
    --pin-color: hotpink;
  }

  &:nth-child(7n + 2)::after {
    --pin-color: magenta;
  }

  &:nth-child(7n + 3)::after {
    --pin-color: orangered;
  }

  &:nth-child(7n + 4)::after {
    --pin-color: darkorchid;
  }

  &:nth-child(7n + 5)::after {
    --pin-color: deeppink;
  }

  &:nth-child(7n + 6)::after {
    --pin-color: mediumvioletred;
  }
`;

const FigureImage = styled.img`
  aspect-ratio: 1 / 1;
  width: 100%;
  object-fit: cover;
  display: block;
  border-radius: 5px;
  margin-bottom: 10px;
`;

const FigCaption = styled.figcaption`
  font-size: 14px;
  font-weight: 400;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

// Efeito de animação para scroll
const scrollAnimation = () => {
  const gallery = document.querySelector('#gallery');
  const time = 10000;

  const animStart = () => {
    if (!gallery.classList.contains('active')) {
      gallery.classList.add('active');
      setTimeout(() => {
        animEnd();
      }, time);
    }
  };

  const animEnd = () => {
    gallery.classList.remove('active');
    void gallery.offsetWidth; // Força o recálculo do layout
  };

  document.addEventListener('scroll', animStart);
  window.addEventListener('resize', animStart);
  animStart();
};

const ProjectPage = () => {
  useEffect(() => {
    scrollAnimation();
  }, []);

  return (
    <BodyStyle>
      {/* Link para a fonte */}
      <FontLink />
      <main>
        <GalleryContainer id="gallery">
        <Figure>
  <video width="100%" height="auto" controls>
    <source src="/images/soc.mp4" type="video/mp4" />
    Seu navegador não suporta vídeos HTML5.
  </video>
  <FigCaption>Central Operations Security SOC - Video</FigCaption>
</Figure>

          <Figure>
          <video width="100%" height="auto" controls>
    <source src="/images/soc.mp4" type="video/mp4" />
    Seu navegador não suporta vídeos HTML5.
  </video>
   <FigCaption>Central IA + Learning para Teste Software </FigCaption>
          </Figure>
          <Figure>
            <FigureImage src="https://images.unsplash.com/photo-1525920980995-f8a382bf42c5?crop=entropy&cs=srgb&fm=jpg&ixid=M3wzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2OTMxODc0ODZ8&ixlib=rb-4.0.3&q=100&w=500" alt="Heavy gray clouds in the sky" />
            <FigCaption>10 AM, Summer Storm</FigCaption>
          </Figure>
          <Figure>
            <FigureImage src="https://images.unsplash.com/photo-1509114397022-ed747cca3f65?crop=entropy&cs=srgb&fm=jpg&ixid=M3wzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2OTMxODc1Mjl8&ixlib=rb-4.0.3&q=100&w=500" alt="Deep orange clouds at sunset" />
            <FigCaption>5 PM, Autumn</FigCaption>
          </Figure>
          <Figure>
            <FigureImage src="https://images.unsplash.com/photo-1583506140156-6e343f045b81?crop=entropy&cs=srgb&fm=jpg&ixid=M3wzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2OTMxODc1OTV8&ixlib=rb-4.0.3&q=100&w=500" alt="Clouds in shades of dark blue and magenta at sunset" />
            <FigCaption>7 PM, Spring</FigCaption>
          </Figure>
          <Figure>
            <FigureImage src="https://images.unsplash.com/photo-1493130952181-47e36589f64d?crop=entropy&cs=srgb&fm=jpg&ixid=M3wzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2OTMxODc2NTJ8&ixlib=rb-4.0.3&q=100&w=500" alt="Clouds in shades of blue and gold at sunrise" />
            <FigCaption>6:30 AM, Summer</FigCaption>
          </Figure>
          <Figure>
            <FigureImage src="https://images.unsplash.com/photo-1533762385849-5aa14c83dbaf?crop=entropy&cs=srgb&fm=jpg&ixid=M3wzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2OTMxODc5MDV8&ixlib=rb-4.0.3&q=100&w=500" alt="rainbow during daytime" />
            <FigCaption>2 PM, Spring Rainbow</FigCaption>
          </Figure>
        </GalleryContainer>
      </main>
    </BodyStyle>
  );
};

export default ProjectPage;
