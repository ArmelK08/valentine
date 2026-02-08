"use client";

import React from 'react';

const PrankReveal: React.FC = () => {
  return (
    <div className="min-h-screen bg-rose-50 flex flex-col items-center justify-start pt-10 px-4 text-center overflow-y-auto pb-10">
      <h1 className="text-4xl md:text-6xl font-black text-pink-600 mb-6 uppercase tracking-tighter animate-bounce">
        DEMAIN VIENT ENCORE !!!
      </h1>

      <div className="w-full max-w-3xl aspect-video bg-black rounded-2xl shadow-2xl overflow-hidden mb-10 ring-8 ring-pink-300 relative">
        <video 
            src="/jonny.mp4" 
            autoPlay 
            loop 
            muted={false}
            playsInline
            className="w-full h-full object-cover pointer-events-none"
            disablePictureInPicture
            controls={false}
        >
          Ton navigateur ne supporte pas la vidéo.
        </video>
        {/* Protection pour empêcher la pause */}
        <div className="absolute inset-0 z-10 bg-transparent"></div>
      </div>
      
    </div>
  );
};

export default PrankReveal;