'use client';

import FluidCursor from '@/components/FluidCursor';
import { Button } from '@/components/ui/button';
import { GithubButton } from '@/components/ui/github-button';
import WelcomeModal from '@/components/welcome-modal';
import { motion } from 'framer-motion';
import {
  BriefcaseBusiness,
  Laugh,
  Layers,
  PartyPopper,
  UserRoundSearch,
} from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import AllProjects from '@/components/projects/AllProjects';
import { Presentation } from '@/components/presentation';
import Skills from '@/components/skills';
import Crazy from '@/components/crazy';
import { Contact } from '@/components/contact';

const questionConfig = [
  { key: 'Me', color: '#329696', icon: Laugh },
  { key: 'Projects', color: '#3E9858', icon: BriefcaseBusiness },
  { key: 'Skills', color: '#856ED9', icon: Layers },
  { key: 'Fun', color: '#B95F9D', icon: PartyPopper },
  { key: 'Contact', color: '#C19433', icon: UserRoundSearch },
] as const;

/* ---------- component ---------- */
export default function Home() {
  const router = useRouter();
  const [showProjects, setShowProjects] = useState(false);
  const [showPresentation, setShowPresentation] = useState(false);
  const [showSkills, setShowSkills] = useState(false);
  const [showFun, setShowFun] = useState(false);
  const [showContact, setShowContact] = useState(false);



  /* hero animations (unchanged) */
  const topElementVariants = {
    hidden: { opacity: 0, y: -60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 },
    },
  };
  const bottomElementVariants = {
    hidden: { opacity: 0, y: 80 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, delay: 0.2 },
    },
  };

  useEffect(() => {
    // Preload the hero image
    const img = new window.Image();
    img.src = '/landing-memojis.png';
  }, []);

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 pb-10 md:pb-20">
      {/* big blurred footer word */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-center overflow-hidden">
        <div
          className="hidden bg-gradient-to-b from-neutral-500/10 to-neutral-500/0 bg-clip-text text-[10rem] leading-none font-black text-transparent select-none sm:block lg:text-[16rem]"
          style={{ marginBottom: '-2.5rem' }}
        >
          Umair
        </div>
      </div>

      {/* GitHub button (now social icons) */}
      <div className="absolute top-6 right-8 z-20 flex gap-4">
        <a href="https://www.linkedin.com/in/iamumair003/" title="LinkedIn" className="hover:opacity-80" target="_blank" rel="noopener noreferrer">
          <img src="/linkedin.png" alt="LinkedIn" style={{ width: '32px', height: '32px' }} />
        </a>
        <a href="https://api.whatsapp.com/send?phone=923245421874" title="WhatsApp" className="hover:opacity-80" target="_blank" rel="noopener noreferrer">
          <img src="/whatsapp.png" alt="WhatsApp" style={{ width: '32px', height: '32px' }} />
        </a>
      </div>

      <div className="absolute top-6 left-6 z-20">
        <button
          className="relative flex cursor-pointer items-center gap-2 rounded-full border bg-white/30 px-4 py-1.5 text-sm font-medium text-black shadow-md backdrop-blur-lg transition hover:bg-white/60 dark:border-white dark:text-white dark:hover:bg-neutral-800"
        >
          {/* Green pulse dot */}
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
          </span>
          Looking for a talent?
        </button>
      </div>

      {showProjects ? (
        <div className="w-full max-w-5xl mx-auto mt-24">
          <AllProjects onBack={() => setShowProjects(false)} />
        </div>
      ) : showPresentation ? (
        <div className="w-full max-w-5xl mx-auto mt-24">
          <div className="relative">
            <button
              onClick={() => setShowPresentation(false)}
              className="relative z-10 mb-6 ml-2 rounded-lg bg-white/70 px-4 py-2 text-sm font-medium shadow hover:bg-white/90 border border-neutral-200 dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:border-neutral-700"
            >
              ← Back
            </button>
            <Presentation />
          </div>
        </div>
      ) : showSkills ? (
        <div className="w-full max-w-5xl mx-auto mt-24">
          <div className="relative">
            <button
              onClick={() => setShowSkills(false)}
              className="relative z-10 mb-6 ml-2 rounded-lg bg-white/70 px-4 py-2 text-sm font-medium shadow hover:bg-white/90 border border-neutral-200 dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:border-neutral-700"
            >
              ← Back
            </button>
            <Skills />
          </div>
        </div>
      ) : showFun ? (
        <div className="w-full max-w-5xl mx-auto mt-24">
          <div className="relative">
            <button
              onClick={() => setShowFun(false)}
              className="relative z-10 mb-6 ml-2 rounded-lg bg-white/70 px-4 py-2 text-sm font-medium shadow hover:bg-white/90 border border-neutral-200 dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:border-neutral-700"
            >
              ← Back
            </button>
            <Crazy />
          </div>
        </div>
      ) : showContact ? (
        <div className="w-full max-w-5xl mx-auto mt-24">
          <div className="relative">
            <button
              onClick={() => setShowContact(false)}
              className="relative z-10 mb-6 ml-2 rounded-lg bg-white/70 px-4 py-2 text-sm font-medium shadow hover:bg-white/90 border border-neutral-200 dark:bg-neutral-800 dark:border-neutral-700"
            >
              ← Back
            </button>
            <Contact />
          </div>
        </div>
      ) : (
        <>
          {/* header */}
          <motion.div
            className="z-1 mt-24 mb-8 flex flex-col items-center text-center md:mt-4 md:mb-12"
            variants={topElementVariants}
            initial="hidden"
            animate="visible"
          >
            {/* <div className="z-100">
              <WelcomeModal />
            </div> */}

            <h2 className="text-secondary-foreground mt-1 text-xl font-semibold md:text-2xl">
              Hey, I'm Umair 👋
            </h2>
            <h1 className="text-4xl font-bold sm:text-5xl md:text-6xl lg:text-7xl">
              Motion & Graphic Designer
            </h1>
          </motion.div>

          {/* centre memoji */}
          <div className="relative z-10 h-52 w-48 overflow-hidden sm:h-72 sm:w-72">
            <Image
              src="/landing-memojis.png"
              alt="Hero memoji"
              width={2000}
              height={2000}
              priority
              className="translate-y-14 scale-[2] object-cover"
            />
          </div>

          {/* input + quick buttons */}
          <motion.div
            variants={bottomElementVariants}
            initial="hidden"
            animate="visible"
            className="z-10 mt-4 flex w-full flex-col items-center justify-center md:px-0"
          >
            {/* quick-question grid */}
            <div className="mt-4 grid w-full max-w-2xl grid-cols-1 gap-3 sm:grid-cols-3 md:grid-cols-5">
              {questionConfig.map(({ key, color, icon: Icon }) => (
                <Button
                  key={key}
                  onClick={() => {
                    if (key === 'Projects') setShowProjects(true);
                    if (key === 'Me') setShowPresentation(true);
                    if (key === 'Skills') setShowSkills(true);
                    if (key === 'Fun') setShowFun(true);
                    if (key === 'Contact') setShowContact(true);
                  }}
                  variant="outline"
                  className="border-border hover:bg-border/30 aspect-square w-full cursor-pointer rounded-2xl border bg-white/30 py-8 shadow-none backdrop-blur-lg active:scale-95 md:p-10"
                >
                  <div className="flex h-full flex-col items-center justify-center gap-1 text-gray-700">
                    <Icon size={22} strokeWidth={2} color={color} />
                    <span className="text-xs font-medium sm:text-sm">{key}</span>
                  </div>
                </Button>
              ))}
            </div>
          </motion.div>
        </>
      )}
      <FluidCursor />
    </div>
  );
}
