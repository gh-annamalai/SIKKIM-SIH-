import React from 'react';

const LanguageSikkim: React.FC = () => {
  const sikkimLanguages = [
    {
      name: 'Nepali',
      description: 'The most widely spoken language in Sikkim, serving as the lingua franca for communication across different communities',
      image: '/src/assets/Languages/Language_Nepali.jpg',
      origin: 'Nepali community',
      speakers: 'Majority population',
      script: 'Devanagari'
    },
    {
      name: 'Bhutia',
      description: 'Traditional language of the Bhutia community, closely related to Tibetan and used in religious ceremonies',
      image: '/src/assets/Languages/Language_Bhutia.jpg',
      origin: 'Tibetan-Bhutia community',
      speakers: 'Bhutia community',
      script: 'Tibetan script'
    },
    {
      name: 'Lepcha',
      description: 'Indigenous language of the Lepcha people, considered one of the oldest languages in the region with unique script',
      image: '/src/assets/Languages/Language_Lepcha.jpg',
      origin: 'Lepcha indigenous community',
      speakers: 'Lepcha community',
      script: 'Lepcha script'
    },
    {
      name: 'Hindi',
      description: 'Official language of India, widely understood and used for administrative and educational purposes',
      image: '/src/assets/Languages/Language_Hindi.jpg',
      origin: 'National language',
      speakers: 'All communities',
      script: 'Devanagari'
    },
    {
      name: 'English',
      description: 'International language used in tourism, education, and official communications throughout Sikkim',
      image: '/src/assets/Languages/Language_English.jpg',
      origin: 'Colonial influence',
      speakers: 'Educated population',
      script: 'Latin script'
    },
    {
      name: 'Limbu',
      description: 'Traditional language of the Limbu community, known for its unique script and cultural significance',
      image: '/src/assets/Languages/Language_Limbu.jpg',
      origin: 'Limbu community',
      speakers: 'Limbu community',
      script: 'Limbu script'
    },
    {
      name: 'Magar',
      description: 'Language of the Magar community, contributing to the linguistic diversity of Sikkim',
      image: '/src/assets/Languages/Language_Magar.jpg',
      origin: 'Magar community',
      speakers: 'Magar community',
      script: 'Devanagari'
    },
    {
      name: 'Gurung',
      description: 'Traditional language of the Gurung community, preserving ancient cultural traditions and oral history',
      image: '/src/assets/Languages/Language_Gurung.jpg',
      origin: 'Gurung community',
      speakers: 'Gurung community',
      script: 'Devanagari'
    },
    {
      name: 'Newari',
      description: 'Language of the Newar community, known for its rich literary tradition and cultural heritage',
      image: '/src/assets/Languages/Language_Newari.jpg',
      origin: 'Newar community',
      speakers: 'Newar community',
      script: 'Newari script'
    },
    {
      name: 'Sherpa',
      description: 'Language of the Sherpa community, closely related to Tibetan and used in high-altitude regions',
      image: '/src/assets/Languages/Language_Sherpa.jpg',
      origin: 'Sherpa community',
      speakers: 'Sherpa community',
      script: 'Tibetan script'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black">
      <div className="pt-20 px-4 py-16">
        <div className="container mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-extrabold text-monastery-gold mb-6">
              Sikkim's Linguistic Heritage
            </h1>
            <p className="max-w-3xl mx-auto text-lg md:text-xl text-slate-200 mb-8">
              Explore the rich tapestry of languages spoken in Sikkim, where diverse communities preserve their unique linguistic traditions. From indigenous languages to widely spoken tongues, discover the voices that shape the cultural identity of the Himalayas.
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-monastery-gold to-transparent mx-auto"></div>
          </div>

          {/* Language Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {sikkimLanguages.map((language, index) => (
              <div
                key={index}
                className="bg-black/60 backdrop-blur-sm rounded-xl overflow-hidden shadow-xl hover:shadow-[0_0_20px_4px_rgba(212,175,55,0.3)] transition-all duration-300 hover:scale-105 border border-white/10"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={language.image}
                    alt={language.name}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                    onError={(e) => {
                      e.currentTarget.src = '/placeholder.svg';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-xl font-bold text-white mb-1">{language.name}</h3>
                    <p className="text-sm text-monastery-gold/80 font-medium">{language.origin}</p>
                  </div>
                </div>
                
                <div className="p-6">
                  <p className="text-slate-300 text-sm leading-relaxed mb-3">
                    {language.description}
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-monastery-gold/60 font-medium">Speakers:</span>
                      <span className="text-xs text-slate-400">{language.speakers}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-monastery-gold/60 font-medium">Script:</span>
                      <span className="text-xs text-slate-400">{language.script}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Cultural Note */}
          <div className="mt-16 bg-gradient-to-r from-monastery-gold/10 to-transparent border border-monastery-gold/20 rounded-xl p-8">
            <h3 className="text-2xl font-bold text-monastery-gold mb-4">
              The Voice of Diversity
            </h3>
            <p className="text-slate-300 leading-relaxed">
              Sikkim's linguistic landscape reflects its remarkable cultural diversity, with over 10 languages spoken across different communities. Each language carries the wisdom of its people, preserving ancient traditions, oral histories, and cultural practices. From the indigenous Lepcha language with its unique script to the widely spoken Nepali, these languages form the foundation of Sikkim's multicultural identity, creating a harmonious blend of voices that celebrate both unity and diversity.
            </p>
          </div>

          {/* Language Categories */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-slate-900/50 to-slate-800/30 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <h4 className="text-lg font-bold text-monastery-gold mb-3">Indigenous Languages</h4>
              <p className="text-slate-300 text-sm">
                Lepcha, Limbu, and other indigenous languages preserve ancient traditions 
                and unique scripts that are integral to Sikkim's cultural heritage.
              </p>
            </div>
            <div className="bg-gradient-to-br from-slate-900/50 to-slate-800/30 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <h4 className="text-lg font-bold text-monastery-gold mb-3">Community Languages</h4>
              <p className="text-slate-300 text-sm">
                Nepali, Bhutia, and other community languages serve as bridges between 
                different cultural groups, fostering understanding and unity.
              </p>
            </div>
            <div className="bg-gradient-to-br from-slate-900/50 to-slate-800/30 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <h4 className="text-lg font-bold text-monastery-gold mb-3">Official Languages</h4>
              <p className="text-slate-300 text-sm">
                Hindi and English facilitate communication across communities and 
                connect Sikkim with the broader national and international context.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LanguageSikkim; 