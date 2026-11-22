'use client';

import { socialLinks } from '@/lib/social-links';
import { Button } from '@/components/ui/button';
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
import { useState } from 'react';
import { SearchEntry } from '@/components/portfolio/search-entry';
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

      <div className="absolute top-4 right-2 z-20 flex gap-0.5 sm:top-5 sm:right-6 sm:gap-2">
        <a
          href={socialLinks.linkedin}
          title="LinkedIn"
          className="grid size-11 place-items-center rounded-full hover:bg-neutral-100"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="/linkedin.png"
            alt="LinkedIn"
            style={{ width: '32px', height: '32px' }}
          />
        </a>
        <a
          href={socialLinks.whatsapp}
          title="WhatsApp"
          className="grid size-11 place-items-center rounded-full hover:bg-neutral-100"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="/whatsapp.png"
            alt="WhatsApp"
            style={{ width: '32px', height: '32px' }}
          />
        </a>
        <a
          href={socialLinks.upwork}
          title="Upwork"
          className="grid size-11 place-items-center rounded-full hover:bg-neutral-100"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image src="/upworkicon.png" alt="Upwork" width={32} height={32} />
        </a>
      </div>

      <div className="absolute top-6 left-2 z-20 sm:left-6">
        <button className="relative flex cursor-pointer items-center gap-2 rounded-full border bg-white/30 px-4 py-1.5 text-sm font-medium text-black shadow-md backdrop-blur-lg transition hover:bg-white/60 dark:border-white dark:text-white dark:hover:bg-neutral-800">
          {/* Green pulse dot */}
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
          </span>
          Looking for a talent?
        </button>
      </div>

      {showPresentation ? (
        <div className="mx-auto mt-24 w-full max-w-5xl">
          <div className="relative">
            <button
              onClick={() => setShowPresentation(false)}
              className="relative z-10 mb-6 ml-2 rounded-lg border border-neutral-200 bg-white/70 px-4 py-2 text-sm font-medium shadow hover:bg-white/90 dark:border-neutral-700 dark:bg-neutral-900 dark:hover:bg-neutral-800"
            >
              ← Back
            </button>
            <Presentation />
          </div>
        </div>
      ) : showSkills ? (
        <div className="mx-auto mt-24 w-full max-w-5xl">
          <div className="relative">
            <button
              onClick={() => setShowSkills(false)}
              className="relative z-10 mb-6 ml-2 rounded-lg border border-neutral-200 bg-white/70 px-4 py-2 text-sm font-medium shadow hover:bg-white/90 dark:border-neutral-700 dark:bg-neutral-900 dark:hover:bg-neutral-800"
            >
              ← Back
            </button>
            <Skills />
          </div>
        </div>
      ) : showFun ? (
        <div className="mx-auto mt-24 w-full max-w-5xl">
          <div className="relative">
            <button
              onClick={() => setShowFun(false)}
              className="relative z-10 mb-6 ml-2 rounded-lg border border-neutral-200 bg-white/70 px-4 py-2 text-sm font-medium shadow hover:bg-white/90 dark:border-neutral-700 dark:bg-neutral-900 dark:hover:bg-neutral-800"
            >
              ← Back
            </button>
            <Crazy />
          </div>
        </div>
      ) : showContact ? (
        <div className="mx-auto mt-24 w-full max-w-5xl">
          <div className="relative">
            <button
              onClick={() => setShowContact(false)}
              className="relative z-10 mb-6 ml-2 rounded-lg border border-neutral-200 bg-white/70 px-4 py-2 text-sm font-medium shadow hover:bg-white/90 dark:border-neutral-700 dark:bg-neutral-800"
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
            className="z-1 mt-20 mb-3 flex w-full flex-col items-center text-center sm:mt-24 sm:mb-6"
            variants={topElementVariants}
            initial="hidden"
            animate="visible"
          >
            {/* <div className="z-100">
              <WelcomeModal />
            </div> */}

            <h2 className="text-secondary-foreground mt-1 text-xl font-semibold md:text-2xl">
              Hey, I&apos;m Umair 👋
            </h2>
            <h1
              className="mt-3 font-bold tracking-tight"
              aria-label="AI Specialist | Video Editor | Graphic & Motion Designer"
            >
              <span className="block text-[clamp(1.45rem,5.7vw,4rem)] leading-[1.08]">
                AI Specialist{' '}
                <span className="align-[0.05em] font-light text-teal-600">
                  |
                </span>{' '}
                Video Editor
              </span>
              <span className="sr-only"> | </span>
              <span className="mt-1 block text-[clamp(1.2rem,4.3vw,3rem)] leading-tight text-neutral-600 dark:text-neutral-300">
                Graphic &amp; Motion Designer
              </span>
            </h1>
          </motion.div>

          {/* Homepage avatar */}
          <div className="relative z-10 h-52 w-48 overflow-hidden sm:h-72 sm:w-72">
            <Image
              src="/avatar-landing.png"
              alt="Umair’s illustrated avatar with headphones"
              width={500}
              height={500}
              priority
              unoptimized
              className="h-full w-full object-contain"
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
            <div className="mt-4 grid w-full max-w-2xl grid-cols-5 gap-2 sm:gap-3">
              {questionConfig.map(({ key, color, icon: Icon }) => (
                <Button
                  key={key}
                  onClick={() => {
                    if (key === 'Projects') router.push('/projects');
                    if (key === 'Me') setShowPresentation(true);
                    if (key === 'Skills') setShowSkills(true);
                    if (key === 'Fun') setShowFun(true);
                    if (key === 'Contact') setShowContact(true);
                  }}
                  variant="outline"
                  className="border-border hover:bg-border/30 aspect-auto min-h-14 w-full cursor-pointer rounded-2xl border bg-white/30 px-1 py-4 shadow-none backdrop-blur-lg active:scale-95 sm:aspect-square sm:py-8 md:p-10"
                >
                  <div className="flex h-full flex-col items-center justify-center gap-1 text-gray-700">
                    <Icon size={22} strokeWidth={2} color={color} />
                    <span className="text-[10px] font-medium sm:text-sm">
                      {key}
                    </span>
                  </div>
                </Button>
              ))}
            </div>
          </motion.div>
          <SearchEntry />
        </>
      )}
    </div>
  );
}
