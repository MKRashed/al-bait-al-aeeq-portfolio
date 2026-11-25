'use client';

import Image from 'next/image';
import { useState } from 'react';
import { STEPS } from '@/data/content';
import { PHOTOS } from '@/data/photos';

export default function Process() {
  const [step, setStep] = useState(0);
  const next = () => setStep((s) => (s + 1) % STEPS.length);

  return (
    <div className="process">
      <ol className="steps reveal">
        {STEPS.map((s, i) => (
          <li key={s.n}>
            <button type="button" className={`step${i === step ? ' on' : ''}`} onClick={() => setStep(i)} aria-current={i === step ? 'step' : undefined}>
              {/* The CSS progress animation advances to the next step when it ends. */}
              <span className="step-bar"><i key={step} onAnimationEnd={i === step ? next : undefined} /></span>
              <span className="step-head"><span className="step-n">{s.n}</span><span className="step-t">{s.title}</span></span>
              <span className="step-p">{s.text}</span>
            </button>
          </li>
        ))}
      </ol>
      <div className="step-media reveal">
        {STEPS.map((s, i) => (
          <div key={s.n} className={`fade-layer${i === step ? ' on' : ''}`}>
            <Image src={PHOTOS[s.photo]} alt={s.alt} fill sizes="(max-width: 900px) 100vw, 640px" className="cover" placeholder="blur" />
          </div>
        ))}
        <span className="pill">STEP {STEPS[step].n} OF 04</span>
      </div>
    </div>
  );
}
