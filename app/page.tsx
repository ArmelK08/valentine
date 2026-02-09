"use client";
import { useState } from 'react';
import QuestionPhase from '@/components/QuestionPhase';
import PrankReveal from '@/components/PrankReveal';
import LoadingPhase from '@/components/loading';

export default function Home() {
  const [phase, setPhase] = useState<'question' | 'loading' | 'reveal'>('question');

  return (
    <main className="min-h-screen">
      {phase === 'question' && <QuestionPhase onYes={() => setPhase('loading')} />}
      {phase === 'loading' && <LoadingPhase onComplete={() => setPhase('reveal')} />}
      {phase === 'reveal' && <PrankReveal />}
    </main>
  );
}