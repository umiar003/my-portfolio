'use client';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { motion, easeOut } from 'framer-motion';
import { Film, PenTool, MonitorPlay, Users, Sparkles } from 'lucide-react';

const Skills = () => {
  const skillsData = [
    {
      category: 'AI Creativity',
      icon: <Sparkles className="h-5 w-5" />,
      skills: ['Claude', 'HeyGen', 'Higgsfield', 'Prompt Engineering', 'AI Video Generation', 'Claude Code', 'AI-Assisted Editing', 'AI UGC Ads'],
      color: 'bg-teal-50 text-teal-700 border border-teal-200',
    },
    {
      category: 'Video Editing & Motion Graphics',
      icon: <Film className="h-5 w-5" />,
      skills: [
        'Adobe Premiere Pro',
        'Adobe After Effects',
        'Motion Graphics',
        'Color Grading',
        'Video Compositing',
        'Cinematic Editing',
        'Sound Design',
        'Storyboarding',
      ],
      color: 'bg-red-50 text-red-600 border border-red-200',
    },
    {
      category: 'Graphic Design & Creative Tools',
      icon: <PenTool className="h-5 w-5" />,
      skills: [
        'Adobe Photoshop',
        'Adobe Illustrator',
        'Adobe InDesign',
        'Canva',
        'Typography Design',
        'Brand Identity Design',
        'Social Media Graphics',
        'Poster & Banner Design',
      ],
      color: 'bg-indigo-50 text-indigo-600 border border-indigo-200',
    },
    {
      category: 'Content Creation & Multimedia',
      icon: <MonitorPlay className="h-5 w-5" />,
      skills: [
        'YouTube Video Production',
        'Short-form Content Editing',
        'Reels/TikTok Editing',
        'Script to Screen',
        'Voice-over Integration',
        'Content Repurposing',
      ],
      color: 'bg-green-50 text-green-600 border border-green-200',
    },
    {
      category: 'Soft Skills',
      icon: <Users className="h-5 w-5" />,
      skills: [
        'Communication',
        'Creativity',
        'Time Management',
        'Storytelling',
        'Problem Solving',
        'Adaptability',
        'Collaboration',
        'Attention to Detail',
      ],
      color: 'bg-amber-50 text-amber-600 border border-amber-200',
    },
    {
      category: 'Special Effects & Animation',
      icon: <Sparkles className="h-5 w-5" />,
      skills: [
        '2D Animation',
        'Logo Animation',
        'Lower Thirds Design',
        'Kinetic Typography',
        'Visual Effects (VFX)',
        'Green Screen Removal',
        'Masking & Tracking',
      ],
      color: 'bg-purple-50 text-purple-600 border border-purple-200',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: easeOut },
    },
  };

  const badgeVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.3, ease: easeOut },
    },
  };

  return (
    <motion.div
      initial={{ scale: 0.98, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.6, ease: easeOut }}
      className="mx-auto w-full max-w-5xl rounded-4xl relative z-10"
    >
      {/* Header */}
      <div className="px-0 pb-1">
        <h1 className="text-primary px-0 text-4xl font-bold">
          Skills & Expertise
        </h1>
      </div>

      {/* Content */}
      <div className="px-0 pb-12">
        <motion.div
          className="space-y-8 px-0"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {skillsData.map((section, index) => (
            <motion.div
              key={index}
              className="space-y-3 px-0"
              variants={itemVariants}
            >
              <div className="flex items-center gap-2">
                {section.icon}
                <h3 className="text-accent-foreground text-lg font-semibold">
                  {section.category}
                </h3>
              </div>

              <motion.div
                className="flex flex-wrap gap-2"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {section.skills.map((skill, idx) => (
                  <motion.div
                    key={idx}
                    variants={badgeVariants}
                    whileHover={{
                      scale: 1.04,
                      transition: { duration: 0.2 },
                    }}
                  >
                    <Badge className={`border px-3 py-1.5 font-normal`}>
                      {skill}
                    </Badge>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Skills;
