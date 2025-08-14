'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Mountain, Bike, Compass } from 'lucide-react';
import { Photos, PhotoItem } from './photos';

const Crazy = () => {
  const sportPhotos: PhotoItem[] = [
    {
      src: '/DSRX1.webp',
      alt: 'Mountain biking adventure',
      caption: 'Riding high in the Karakoram Range',
    },
    {
      src: '/bike-3.jpg',
      alt: 'Offroad biking',
      caption: 'Kicking up dust on remote trails',
    },
    {
      src: '/bike-2.jpg',
      alt: 'River crossing',
      caption: 'Crossing wild mountain streams',
    },
  ];

  return (
    <div className="mx-auto w-full relative z-10">
      {/* Hero Banner */}
      <div
        className="relative h-64 md:h-96 w-full bg-cover bg-center rounded-3xl overflow-hidden shadow-xl"
        style={{
          backgroundImage: "url('/banner bike.webp')",
        }}
      >
        <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-white px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-5xl font-bold text-center bg-gradient-to-r from-yellow-400 to-red-500 bg-clip-text text-transparent"
          >
            Fun & Crazy Adventures
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-3 text-lg md:text-xl text-center max-w-2xl"
          >
            Biking through mountains, off-road trails, and untamed landscapes.
          </motion.p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-6 mt-8 text-center">
        <div>
          <Bike className="mx-auto h-10 w-10 text-yellow-500" />
          <h3 className="text-2xl font-bold">12,000+</h3>
          <p className="text-gray-500">Km Ridden</p>
        </div>
        <div>
          <Mountain className="mx-auto h-10 w-10 text-red-500" />
          <h3 className="text-2xl font-bold">48</h3>
          <p className="text-gray-500">Mountains Conquered</p>
        </div>
        <div>
          <Compass className="mx-auto h-10 w-10 text-blue-500" />
          <h3 className="text-2xl font-bold">20+</h3>
          <p className="text-gray-500">Epic Adventures</p>
        </div>
      </div>

      {/* Photo Gallery */}
      <div className="mt-10">
        <Photos photos={sportPhotos} />
      </div>
    </div>
  );
};

export default Crazy;
