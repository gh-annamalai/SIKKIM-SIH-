import React from 'react';

const InstrumentSikkim: React.FC = () => {
  const sikkimInstruments = [
    {
      name: 'Sarangi',
      description: 'Traditional bowed string instrument with a rich, melancholic sound, often used in classical and folk music',
      image: '/src/assets/Instruments/Instruments_Sarangi.jpg',
      origin: 'Nepali classical tradition',
      category: 'String instrument',
      usage: 'Classical music and folk songs'
    },
    {
      name: 'Pung',
      description: 'Traditional drum used in Manipuri dance and music, creating rhythmic beats for cultural performances',
      image: '/src/assets/Instruments/Instruments_Pung.jpg',
      origin: 'Manipuri tradition',
      category: 'Percussion instrument',
      usage: 'Dance accompaniment and festivals'
    },
    {
      name: 'Madal',
      description: 'Double-headed drum with a distinctive sound, commonly used in Nepali folk music and celebrations',
      image: '/src/assets/Instruments/Instruments_Madal.jpg',
      origin: 'Nepali folk tradition',
      category: 'Percussion instrument',
      usage: 'Folk songs and cultural events'
    },
    {
      name: 'Kartal',
      description: 'Small cymbals or clappers used to keep rhythm, often played during religious ceremonies and folk dances',
      image: '/src/assets/Instruments/Instruments_kartal.jpg',
      origin: 'Religious and folk tradition',
      category: 'Percussion instrument',
      usage: 'Religious ceremonies and folk dances'
    },
    {
      name: 'Dampu',
      description: 'Traditional wind instrument made from bamboo, producing melodious sounds for mountain music',
      image: '/src/assets/Instruments/Instruments_Dampu.jpg',
      origin: 'Indigenous mountain tradition',
      category: 'Wind instrument',
      usage: 'Mountain folk music and celebrations'
    },
    {
      name: 'Bansuri',
      description: 'Bamboo flute with a sweet, melodious tone, used in both classical and folk music traditions',
      image: '/src/assets/Instruments/Instruments_Bansuri.jpg',
      origin: 'Classical Indian tradition',
      category: 'Wind instrument',
      usage: 'Classical and devotional music'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black border-transparent">
      <div className="pt-20 px-4 py-16">
        <div className="container mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-extrabold text-monastery-gold mb-6">
              Sikkim's Musical Heritage
            </h1>
            <p className="max-w-3xl mx-auto text-lg md:text-xl text-slate-200 mb-8">
              Discover the enchanting world of Sikkim's traditional musical instruments, where every sound tells a story of culture, spirituality, and artistic expression. From ancient drums to melodious flutes, explore the instruments that create the soulful music of the Himalayas.
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-monastery-gold to-transparent mx-auto"></div>
          </div>

          {/* Instrument Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {sikkimInstruments.map((instrument, index) => (
              <div
                key={index}
                className="bg-black/60 backdrop-blur-sm rounded-xl overflow-hidden shadow-xl hover:shadow-[0_0_20px_4px_rgba(212,175,55,0.3)] transition-all duration-300 hover:scale-105 border border-white/10"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={instrument.image}
                    alt={instrument.name}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                    onError={(e) => {
                      e.currentTarget.src = '/placeholder.svg';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-xl font-bold text-white mb-1">{instrument.name}</h3>
                    <p className="text-sm text-monastery-gold/80 font-medium">{instrument.origin}</p>
                  </div>
                </div>
                
                <div className="p-6">
                  <p className="text-slate-300 text-sm leading-relaxed mb-3">
                    {instrument.description}
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-monastery-gold/60 font-medium">Category:</span>
                      <span className="text-xs text-slate-400">{instrument.category}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-monastery-gold/60 font-medium">Usage:</span>
                      <span className="text-xs text-slate-400">{instrument.usage}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Cultural Note */}
          <div className="mt-16 bg-gradient-to-r from-monastery-gold/10 to-transparent border border-monastery-gold/20 rounded-xl p-8">
            <h3 className="text-2xl font-bold text-monastery-gold mb-4">
              The Sound of Tradition
            </h3>
            <p className="text-slate-300 leading-relaxed">
              Music in Sikkim is deeply intertwined with cultural identity and spiritual expression. Each instrument carries the soul of its community, from the haunting melodies of the Sarangi to the rhythmic beats of traditional drums. These instruments are not just tools for making music—they are sacred objects that connect people to their ancestors, their land, and their beliefs, creating a harmonious symphony that celebrates the rich cultural diversity of the Himalayas.
            </p>
          </div>

          {/* Instrument Categories */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-black/60 backdrop-blur-sm rounded-xl p-6 border-transparent">
              <h4 className="text-lg font-bold text-monastery-gold mb-3">String Instruments</h4>
              <p className="text-slate-300 text-sm">
                Instruments like Sarangi create melodious sounds that express deep emotions 
                and are central to classical and folk music traditions.
              </p>
            </div>
            <div className="bg-black/60 backdrop-blur-sm rounded-xl p-6 border-transparent">
              <h4 className="text-lg font-bold text-monastery-gold mb-3">Percussion Instruments</h4>
              <p className="text-slate-300 text-sm">
                Drums like Pung and Madal provide the rhythmic foundation for dances, 
                ceremonies, and cultural celebrations across communities.
              </p>
            </div>
            <div className="bg-black/60 backdrop-blur-sm rounded-xl p-6 border-transparent">
              <h4 className="text-lg font-bold text-monastery-gold mb-3">Wind Instruments</h4>
              <p className="text-slate-300 text-sm">
                Flutes like Bansuri and Dampu produce sweet, melodious tones that 
                echo through the mountains and valleys of Sikkim.
              </p>
            </div>
          </div>
          {/* Performance Context */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-black/60 backdrop-blur-sm rounded-xl p-6 border-transparent">
              <h4 className="text-lg font-bold text-monastery-gold mb-3">Festival Performances</h4>
              <p className="text-slate-300 text-sm">
                During festivals like Losar, Dashain, and Tihar, these instruments come alive, 
                creating an atmosphere of joy and celebration that brings communities together.
              </p>
            </div>
            <div className="bg-black/60 backdrop-blur-sm rounded-xl p-6 border-transparent">
              <h4 className="text-lg font-bold text-monastery-gold mb-3">Modern Adaptations</h4>
              <p className="text-slate-300 text-sm">
                Contemporary musicians blend traditional instruments with modern sounds, 
                ensuring these cultural treasures remain relevant for future generations.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstrumentSikkim; 