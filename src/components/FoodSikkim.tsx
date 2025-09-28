import React from 'react';

const FoodSikkim: React.FC = () => {
  const sikkimFoods = [
    {
      name: 'Momo',
      description: 'Steamed dumplings filled with meat or vegetables, served with spicy sauce',
      image: '/src/assets/food/food_momo..jpg',
      origin: 'Tibetan influence'
    },
    {
      name: 'Thukpa',
      description: 'Noodle soup with vegetables and meat, perfect for cold mountain weather',
      image: '/src/assets/food/food_thukpa.jpg',
      origin: 'Tibetan cuisine'
    },
    {
      name: 'Dhindo',
      description: 'Traditional millet porridge, a staple food of Sikkim',
      image: '/src/assets/food/food_dhindo.jpg',
      origin: 'Nepali tradition'
    },
    {
      name: 'Sel Roti',
      description: 'Sweet rice bread, often served during festivals and celebrations',
      image: '/src/assets/food/food_sel_roti.jpg',
      origin: 'Nepali festival food'
    },
    {
      name: 'Sha Phaley',
      description: 'Deep-fried bread stuffed with meat and vegetables',
      image: '/src/assets/food/food_sha_phaley.jpg',
      origin: 'Tibetan street food'
    },
    {
      name: 'Gundruk',
      description: 'Fermented leafy green vegetable, a traditional side dish',
      image: '/src/assets/food/food_gundruk.jpg',
      origin: 'Nepali preservation method'
    },
    {
      name: 'Kinema',
      description: 'Fermented soybean product, rich in protein and flavor',
      image: '/src/assets/food/food_kinema.jpg',
      origin: 'Indigenous Sikkimese'
    },
    {
      name: 'Chhurpi',
      description: 'Hard cheese made from yak milk, often used in soups and curries',
      image: '/src/assets/food/food_chhurpi.jpg',
      origin: 'Himalayan tradition'
    },
    {
      name: 'Bamboo Shoot Curry',
      description: 'Tender bamboo shoots cooked in aromatic spices and coconut milk',
      image: '/src/assets/food/food_bamboo_shoot_curry.jpg',
      origin: 'Local forest produce'
    },
    {
      name: 'Laping',
      description: 'Cold noodle dish with spicy sauce, perfect for summer',
      image: '/src/assets/food/food_laping.jpg',
      origin: 'Tibetan cold dish'
    },
    {
      name: 'Phagshapa',
      description: 'Pork dish with radish and dried chilies, a festive specialty',
      image: '/src/assets/food/food_phagshapa.jpg',
      origin: 'Bhutanese influence'
    },
    {
      name: 'Sinki',
      description: 'Fermented radish, a tangy and nutritious side dish',
      image: '/src/assets/food/food_sinki.jpg',
      origin: 'Nepali fermentation technique'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black">
      <div className="pt-20 px-4 py-16">
        <div className="container mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-extrabold text-monastery-gold mb-6">
              Sikkim's Culinary Heritage
            </h1>
            <p className="max-w-3xl mx-auto text-lg md:text-xl text-slate-200 mb-8">
              Discover the rich and diverse flavors of Sikkim, where Tibetan, Nepali, and indigenous cuisines blend together to create unique culinary experiences that reflect the region's cultural diversity.
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-monastery-gold to-transparent mx-auto"></div>
          </div>

          {/* Food Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {sikkimFoods.map((food, index) => (
              <div
                key={index}
                className="bg-black/60 backdrop-blur-sm rounded-xl overflow-hidden shadow-xl hover:shadow-[0_0_20px_4px_rgba(212,175,55,0.3)] transition-all duration-300 hover:scale-105 border border-white/10"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={food.image}
                    alt={food.name}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                    onError={(e) => {
                      e.currentTarget.src = '/placeholder.svg';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-xl font-bold text-white mb-1">{food.name}</h3>
                    <p className="text-sm text-monastery-gold/80 font-medium">{food.origin}</p>
                  </div>
                </div>
                
                <div className="p-6">
                  <p className="text-slate-300 text-sm leading-relaxed">
                    {food.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Cultural Note */}
          <div className="mt-16 bg-gradient-to-r from-monastery-gold/10 to-transparent border border-monastery-gold/20 rounded-xl p-8">
            <h3 className="text-2xl font-bold text-monastery-gold mb-4">
              A Taste of Tradition
            </h3>
            <p className="text-slate-300 leading-relaxed">
              Sikkim's cuisine is a beautiful reflection of its multicultural heritage. Each dish tells a story of migration, adaptation, and the harmonious blending of different cultures. From the hearty Tibetan momos to the fermented delicacies of the indigenous communities, every bite offers a glimpse into the rich tapestry of Sikkim's cultural identity.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodSikkim; 