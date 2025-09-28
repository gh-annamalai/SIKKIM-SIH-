import React from 'react';

const AboutSikkim: React.FC = () => {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-8 py-16">
      <h1 className="text-4xl md:text-6xl font-extrabold text-monastery-gold mb-6">About Sikkim</h1>
      <p className="max-w-2xl text-lg md:text-xl mb-8 text-slate-200 text-center">
        Sikkim, nestled in the Himalayas, is renowned for its breathtaking landscapes, ancient monasteries, vibrant culture, and spiritual heritage. Explore the history, traditions, and natural wonders that make Sikkim a truly mystical destination.
      </p>
      <img src="/src/assets/monastery-hero.jpg" alt="Sikkim Monastery" className="rounded-xl shadow-lg w-full max-w-lg mb-8" />
      <div className="max-w-2xl text-base text-slate-300">
        <ul className="list-disc pl-6 space-y-2">
          <li>Home to iconic monasteries like Rumtek, Pemayangtse, and Tashiding</li>
          <li>Rich traditions of Buddhism and indigenous cultures</li>
          <li>Stunning mountain vistas and lush valleys</li>
          <li>Unique festivals, rituals, and art forms</li>
          <li>Gateway to adventure, wellness, and spiritual journeys</li>
        </ul>
      </div>
    </div>
  );
};

export default AboutSikkim;
