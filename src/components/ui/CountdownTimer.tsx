import React, { useState, useEffect } from "react";

interface Props {
  expirationDate: string;
}

const CountdownTimer: React.FC<Props> = ({ expirationDate }) => {
  const [remainingTime, setRemainingTime] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      // Calcule le temps restant en millisecondes
      const now = new Date();
      const endTime = new Date(Date.parse(expirationDate)); // Convertit la date en timestamp
      const timeDiff = endTime.getTime() - now.getTime();
      console.log("setRemainingTime : ", timeDiff);

      // Met à jour l'état local avec le temps restant en secondes
      setRemainingTime(Math.max(Math.floor(timeDiff / 1000), 0));

      // Si le temps restant est inférieur ou égal à 0, arrête le compteur
      if (timeDiff <= 0) {
        clearInterval(interval);
      }
    }, 1000);

    // Nettoie l'intervalle lorsque le composant est démonté
    return () => clearInterval(interval);
  }, [expirationDate]); // Déclenche l'effet lorsque la date d'expiration change

  // Fonction d'aide pour formater les chiffres avec un zéro devant si nécessaire
  const formatNumber = (num: number): string => {
    return num < 10 ? `0${num}` : num.toString();
  };

  // Convertit le temps restant en heures, minutes et secondes
  const hours = Math.floor(remainingTime / 3600);
  const minutes = Math.floor((remainingTime % 3600) / 60);
  const seconds = remainingTime % 60;

  return (
    <div>
      <div className="flex space-x-1">
        <div className="p-1 w-8 h-8 text-xs flex justify-center items-center bg-red-500 text-white">
          {formatNumber(hours)}h
        </div>

        <div className="p-1 w-8 h-8 text-xs flex justify-center items-center bg-red-500 text-white">
          {formatNumber(minutes)}m
        </div>

        <div className="p-1 w-8 h-8 text-xs flex justify-center items-center bg-red-500 text-white">
          {formatNumber(seconds)}s
        </div>
      </div>
    </div>
  );
};

export default CountdownTimer;
