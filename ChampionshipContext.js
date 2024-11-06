import React, { createContext, useContext, useState } from 'react';

// Criação do contexto para o Campeonato
const ChampionshipContext = createContext();

// Hook para acessar o contexto do campeonato
export const useChampionship = () => {
  return useContext(ChampionshipContext);
};

// Provider que gerencia o estado do campeonato
export const ChampionshipProvider = ({ children }) => {
  const [championships, setChampionships] = useState([]);

  const addChampionship = (championship) => {
    setChampionships((prevChampionships) => [...prevChampionships, championship]);
  };

  return (
    <ChampionshipContext.Provider value={{ championships, addChampionship }}>
      {children}
    </ChampionshipContext.Provider>
  );
};

