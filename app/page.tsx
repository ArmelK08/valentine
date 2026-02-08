"use client"; // TRÈS IMPORTANT

import { useState } from 'react';
import QuestionPhase from '@/components/QuestionPhase';
import PrankReveal from '@/components/PrankReveal';

export default function Home() {
  const [phase, setPhase] = useState<'question' | 'reveal'>('question');

  return (
    <main className="min-h-screen">
      {phase === 'question' && <QuestionPhase onYes={() => setPhase('reveal')} />}
      {phase === 'reveal' && <PrankReveal />}
    </main>
  );
}