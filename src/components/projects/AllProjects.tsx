"use client";
import { Card, Carousel } from "@/components/projects/apple-cards-carousel";
import { data } from "@/components/projects/Data";
import { useState, useCallback, useMemo } from 'react';


export default function AllProjects({ onBack }: { onBack?: () => void }) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  // Get unique categories from data
  const categories = useMemo(() => 
    Array.from(new Set(data.map((card) => card.category))).filter(Boolean),
    []
  );

  // Filter cards by category if one is active
  const filteredCards = useMemo(() => 
    activeCategory
      ? data.filter((card) => card.category === activeCategory)
      : data,
    [activeCategory]
  );

  const cards = useMemo(() => 
    filteredCards.map((card, index) => (
      <Card 
        key={`${card.title}-${card.category}-${index}`} 
        card={card} 
        index={index} 
        layout={true} 
      />
    )),
    [filteredCards]
  );

  const handleCategoryChange = useCallback((category: string) => {
    const newCategory = activeCategory === category ? null : category;
    setActiveCategory(newCategory);
    
    // Force a small delay to ensure state update before carousel re-render
    setTimeout(() => {
      // This will trigger the carousel to reset scroll position
    }, 0);
  }, [activeCategory]);

  return (
    <div className="w-full h-full pt-8">
      {/* Back button */}
      {onBack && (
        <button
          onClick={onBack}
          className="relative z-10 mb-6 ml-2 rounded-lg bg-white/70 px-4 py-2 text-sm font-medium shadow hover:bg-white/90 border border-neutral-200 dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:border-neutral-700"
        >
          ← Back
        </button>
      )}
      <h2 className="max-w-7xl mx-auto text-xl md:text-3xl font-bold text-neutral-800 dark:text-neutral-200 font-sans">
        My Projects
      </h2>
      {/* Category filter buttons */}
      <div className="relative z-10 flex flex-wrap gap-3 justify-center my-6">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => handleCategoryChange(cat)}
            className={`relative z-10 px-4 py-2 rounded-xl border font-medium text-sm shadow transition-all
              ${activeCategory === cat
                ? 'bg-black text-white dark:bg-white dark:text-black border-black dark:border-white'
                : 'bg-white/60 text-black dark:bg-neutral-800 dark:text-white border-neutral-200 dark:border-neutral-700 hover:bg-white/80 dark:hover:bg-neutral-700'}
            `}
          >
            {cat}
          </button>
        ))}
      </div>
      <Carousel items={cards} key={activeCategory || 'all'} />
    </div>
  );
}
