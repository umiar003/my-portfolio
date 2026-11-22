'use client';

import { motion, easeOut } from 'framer-motion';
import Image from 'next/image';
import React, { useState } from 'react';

export function Presentation() {
  const [showVideo, setShowVideo] = useState(false);
  
  // Personal information
  const profile = {
    name: 'Muhammad Umair',
    age: '23 years old',
    location: 'Islamabad, Pakistan',
    // Add a newline character after the emoji
    description:
      `👋Hi, I’m Umair! A creative storyteller with strong technical skills in:
🎬 Adobe After Effects | Adobe Premiere Pro
🤖 Claude AI + Heygen | Prompt Engineering
🎨 Photoshop | Illustrator

💡 What I do best:
- Craft videos that engage & inspire
- Use my AI prompt engineering expertise to bring creative ideas to life
- Design visuals that leave a lasting impact
- Collaborate openly to bring ideas to life

I’m really into branding, storytelling, and pushing the limits of creative media. Before diving deep into editing, I experimented with graphic designing and marketing, but now my heart belongs to the editing suite, turning raw footage into something that connects and inspires.✂️✨ I’ve worked on everything from short films and brand videos to social media content, always aiming to make each frame count.😊

🚀 Let’s create something visually unforgettable together!`,
    src: '/profil-raph.png',
    fallbackSrc:
      'https://images.unsplash.com/photo-1610216705422-caa3fcb6d158?q=80&w=3560&auto=format&fit=crop&ixlib=rb-4.0.3',
  };

  // Animation variants for text elements
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: easeOut },
    },
  };

  // Animation for the entire paragraph rather than word-by-word
  const paragraphAnimation = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: easeOut,
        delay: 0.2,
      },
    },
  };

  return (
    <div className="mx-auto w-full max-w-5xl py-6 font-sans relative z-20">
      <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2">
        {/* Image section */}
        <div className="relative mx-auto w-full max-w-sm z-20">
          <div className="relative aspect-square w-full overflow-hidden rounded-2xl">
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
              className="h-full w-full"
            >
              <Image
                src={profile.src}
                alt={profile.name}
                width={434}
                height={421}
                unoptimized
                className="h-full w-full object-cover object-center"
                onError={(e) => {
                  // Fallback to placeholder if image fails to load
                  const target = e.target as HTMLImageElement;
                  target.src = profile.fallbackSrc;
                }}
              />
            </motion.div>
          </div>
          
          {/* See me in action button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: easeOut, delay: 0.4 }}
            className="mt-6 text-center relative z-20"
          >
            <button
              onClick={() => setShowVideo(true)}
              className="bg-white/20 backdrop-blur-lg border border-white/30 text-black font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:bg-white/30 border-white/50"
            >
              🎬 See me in action
            </button>
          </motion.div>
        </div>

        {/* Text content section */}
        <div className="flex flex-col space-y relative z-20">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={textVariants}
          >
            <h1 className="from-foreground to-muted-foreground bg-gradient-to-r bg-clip-text text-xl font-semibold text-transparent md:text-3xl">
              {profile.name}
            </h1>
            <div className="mt-1 flex flex-col gap-1 md:flex-row md:items-center md:gap-4">
              <p className="text-muted-foreground">{profile.age}</p>
              <div className="bg-border hidden h-1.5 w-1.5 rounded-full md:block" />
              <p className="text-muted-foreground">{profile.location}</p>
            </div>
          </motion.div>

          <motion.p
            initial="hidden"
            animate="visible"
            variants={paragraphAnimation}
            className="text-foreground mt-6 leading-relaxed whitespace-pre-line"
          >
            {profile.description}
          </motion.p>

          {/* Tags/Keywords */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="mt-4 flex flex-wrap gap-2"
          >
            {['Motion Graphics', 'Video Editing', 'Graphic Designing', 'Visual Storytelling'].map(
              (tag) => (
                <span
                  key={tag}
                  className="bg-secondary text-secondary-foreground rounded-full px-3 py-1 text-sm"
                >
                  {tag}
                </span>
              )
            )}
          </motion.div>
        </div>
      </div>
      
      {/* Video Popup Modal */}
      {showVideo && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setShowVideo(false)}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3, ease: easeOut }}
            className="relative bg-white dark:bg-neutral-900 rounded-2xl overflow-hidden shadow-2xl max-w-4xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setShowVideo(false)}
              className="absolute top-4 right-4 z-10 bg-black/70 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-black/90 transition-colors"
              title="Close video"
            >
              ×
            </button>
            
            {/* YouTube Video */}
            <div className="relative aspect-video w-full">
              <iframe
                src="https://www.youtube-nocookie.com/embed/LZyGWpDKNCE?autoplay=1"
                referrerPolicy="strict-origin-when-cross-origin"
                title="See me in action"
                className="w-full h-full"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
export default Presentation;

