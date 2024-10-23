import React from 'react';
import { Link } from 'react-router-dom'; // Usando Link para navegação
import ThreeScene from '../components/ThreeScene'; // Certifique-se de que o caminho esteja correto
import styled from 'styled-components';

// Estilos para o texto centralizado
const CenteredText = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: white; /* Cor branca */
  z-index: 1; /* Certifique-se de que o texto fique acima do Three.js */
`;

const MainText = styled.h1`
  font-size: 3rem; // Aumenta o tamanho do texto principal
  color: white;    // Texto principal em branco
  margin: 0;
  font-weight: bold; // Negrito para a primeira linha
`;

const SubText = styled.p`
  font-size: 1.5rem; // Tamanho da fonte da segunda linha
  color: gray;    // Branco mais escuro
  margin-top: 10px;
`;

// Estilos para a seta
const ArrowRight = styled(Link)`  /* Usando Link para navegação */
  position: absolute;
  bottom: 20px;
  right: 20px;
  cursor: pointer;
  z-index: 1;
  font-size: 3rem;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  border: 2px solid white;
  border-radius: 50%;
  transition: all 0.3s ease-in-out;

  &:hover {
    transform: scale(1.1);  /* Aumenta o tamanho quando o usuário passa o mouse */
    background-color: white;
    color: black;  /* Inverte as cores ao hover */
  }
`;

const ArrowIcon = styled.span`
  display: inline-block;
  transform: rotate(45deg);
  border: solid white;
  border-width: 0 4px 4px 0;
  padding: 10px;
  transition: all 0.3s ease-in-out;

  ${ArrowRight}:hover & {
    border-color: black;  /* Cor preta ao passar o mouse */
  }
`;

// Componente da página principal
const HomePage = () => {
  return (
    <div style={{ position: 'relative' }}>
      {/* Canvas do Three.js */}
      <ThreeScene />

      {/* Texto centralizado sobre a cena */}
      <CenteredText>
        <MainText>Full Stack Engineer</MainText>
        <SubText>– WELCOME MY PROJECTS – Paulo Silas de Campos Filho –</SubText>
      </CenteredText>

      {/* Seta de navegação com Link */}
      <ArrowRight to="/projects">  {/* Link para navegação */}
        <ArrowIcon />
      </ArrowRight>
    </div>
  );
};

export default HomePage;
