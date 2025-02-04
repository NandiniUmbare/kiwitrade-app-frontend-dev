import React from 'react';

const AutosAndBoats: React.FC = () => {
  const groups = [
    {
      name: 'Autos',
      imageUrl: 'https://www.vz.ae/wp-content/uploads/2022/11/real-estate-licence-in-Dubai.jpg',
      size: 'col-span-2 row-span-2',
    },
    {
      name: 'Trailers',
      imageUrl: 'https://www.vz.ae/wp-content/uploads/2022/11/real-estate-licence-in-Dubai.jpg',
      size: 'col-span-2',
    },
    {
      name: 'Boats',
      imageUrl: 'https://www.vz.ae/wp-content/uploads/2022/11/real-estate-licence-in-Dubai.jpg',
      size: '',
    },
    {
      name: 'Motorcycles',
      imageUrl: 'https://www.vz.ae/wp-content/uploads/2022/11/real-estate-licence-in-Dubai.jpg',
      size: '',
    },
    {
      name: 'Wanted',
      imageUrl: 'https://www.vz.ae/wp-content/uploads/2022/11/real-estate-licence-in-Dubai.jpg',
      size: '',
    },
  ];
  return (
    <>
      <div className="container mx-auto px-6 py-8">
        <h2 className="text-3xl font-bold text-gray-800">Autos & Boats</h2>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
          {groups.map((group, index) => (
            <div key={index} className={`relative ${group.size} cursor-pointer`}>
              <img
                src={group.imageUrl}
                alt={group.name}
                className="w-full h-full object-cover rounded-lg shadow-md"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                <h1 className="text-lg font-semibold text-white">{group.name}</h1>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AutosAndBoats;
