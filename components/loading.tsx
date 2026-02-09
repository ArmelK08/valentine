"use client";
import React, { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';

export default function LoadingPhase({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + 1;
      });
    }, 50); 
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-rose-50 p-6">
      <h2 className="text-2xl font-bold text-pink-600 mb-8 animate-pulse">
        Préparation de ta surprise... {progress}%
      </h2>
      
      <div className="w-full max-w-md bg-white rounded-full h-8 shadow-inner relative overflow-hidden border-2 border-pink-200">
        <div 
          className="h-full bg-pink-400 transition-all duration-100 ease-linear"
          style={{ width: `${progress}%` }}
        />
        
        <div 
          className="absolute top-1/2 -translate-y-1/2 transition-all duration-100 ease-linear"
          style={{ left: `calc(${progress}% - 20px)` }}
        >
          <Heart fill="#db2777" className="text-pink-600" size={30} />
        </div>
      </div>
    </div>
  );
}