// src/hooks/useSession.js
import { useState, useEffect } from 'react';

const useSession = () => {
  const [stateUser, setStateUser] = useState(null);

  useEffect(() => {
    const user = localStorage.getItem("LoggedUser");
    if (user) {
      setStateUser(JSON.parse(user));
    }
  }, []);

  return stateUser; // Retorna el estado del usuario
};

export default useSession;
