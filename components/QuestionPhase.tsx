"use client";

import React, { useState, useRef } from 'react';
import { Frown, Lock, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import Image from 'next/image';
import type { CSSProperties } from 'react'; // Import du type CSS

interface QuestionPhaseProps {
  onYes: () => void;
}

// Typage strict pour éviter le "any"
interface ButtonPosition {
  top: string;
  left: string;
  position: CSSProperties['position']; // Utilise le type officiel de React CSS
}

const NO_TEXTS = [
  "Non", 
  "Tu es sûre ?", 
  "Vraiment ?", 
  "Réfléchis bien...", 
  "Dernière chance !",
  "Tu brises mon cœur 💔",
  "C'est ton dernier mot ?", 
  "Bloqué ! Tu n'as plus le choix 🔒"
];

const QuestionPhase: React.FC<QuestionPhaseProps> = ({ onYes }) => {
  // Initialisation avec le type strict
  const [noBtnPosition, setNoBtnPosition] = useState<ButtonPosition>({ 
    top: 'auto', 
    left: 'auto', 
    position: 'static' 
  });
  
  const [clickCount, setClickCount] = useState(0);
  const noBtnRef = useRef<HTMLButtonElement>(null);

  const isFinalState = clickCount >= NO_TEXTS.length - 1;

  const handleNoInteraction = () => {
    if (isFinalState) return;
    
    setClickCount((prev) => prev + 1);
    
    const btnWidth = noBtnRef.current?.offsetWidth || 150;
    const btnHeight = noBtnRef.current?.offsetHeight || 50;
    
    const maxX = typeof window !== 'undefined' ? window.innerWidth - btnWidth - 20 : 0;
    const maxY = typeof window !== 'undefined' ? window.innerHeight - btnHeight - 20 : 0;
    
    setNoBtnPosition({
      position: 'fixed', // TypeScript accepte maintenant car c'est une valeur valide pour CSSProperties
      top: `${Math.max(20, Math.random() * maxY)}px`,
      left: `${Math.max(20, Math.random() * maxX)}px`,
    });
  };

  const handleYesClick = () => {
    confetti({ 
      particleCount: 150, 
      spread: 70, 
      origin: { y: 0.6 },
      colors: ['#FF69B4', '#FF1493', '#FFFFFF']
    });
    onYes();
  };

  const getNoText = () => {
    return NO_TEXTS[Math.min(clickCount, NO_TEXTS.length - 1)];
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen w-full overflow-hidden bg-[#FFF5F7] p-4 text-center select-none">
      
      <div className="z-10 max-w-md w-full bg-white/80 backdrop-blur-md p-8 rounded-3xl shadow-2xl border border-pink-100">
        
        <div className="flex justify-center mb-6">
          <Image 
            src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExbW5lenZyZHI5OXM2eW95b3h4N2loMW5sM3pnZnZ5cnIwM3plYjJ3ciZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/cLS1cfxvGOPVpf9g3y/giphy.gif" 
            alt="Cute bear"
            width={192} 
            height={192}
            unoptimized
            className="w-48 h-48 object-contain"
          />
        </div>

        <h1 className="text-3xl font-extrabold text-pink-600 mb-8 leading-tight">
          Veux-tu être ma Valentine ? <Sparkles className="inline text-yellow-400" />
        </h1>

        <div className="flex flex-col items-center gap-6 h-40 relative w-full">
          <button
            onClick={handleYesClick}
            style={{ 
              transform: `scale(${1 + clickCount * 0.15})`,
              transition: 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)' 
            }}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-10 rounded-full shadow-lg z-30 flex items-center gap-2 text-xl"
          >
            Oui ! 💖
          </button>

          <button
            ref={noBtnRef}
            disabled={isFinalState}
            onMouseEnter={isFinalState ? undefined : handleNoInteraction}
            onClick={isFinalState ? undefined : handleNoInteraction}
            style={{ 
              position: noBtnPosition.position, // Plus besoin de "as any" !
              top: noBtnPosition.top, 
              left: noBtnPosition.left,
              transition: isFinalState ? 'none' : 'all 0.2s ease-out',
              zIndex: 50,
            }}
            className={`
              ${isFinalState 
                ? 'bg-black text-white cursor-not-allowed border-2 border-gray-700 opacity-100 shadow-none' 
                : 'bg-rose-400/90 hover:bg-rose-500 text-white shadow-lg'} 
              font-semibold py-3 px-6 rounded-full whitespace-nowrap text-sm flex items-center gap-2 transition-colors duration-300
            `}
          >
            {isFinalState ? (
              <Lock size={16} className="text-red-500 animate-pulse" />
            ) : (
              clickCount > 3 ? <Frown size={16} /> : null
            )}
            {getNoText()}
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuestionPhase;