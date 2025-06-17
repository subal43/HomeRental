import React from 'react';

interface AdItem {
    id: number;
    title: string;
    description: string;
    imageUrl: string;
    link: string;
}

const ads: AdItem[] = [
    {
        id: 1,
        title: 'Premium Furniture Store',
        description: 'Modern and budget-friendly furniture for your home.',
        imageUrl: 'furniture1.jpg',
        link: 'https://furniture-store.com',
    },
    {
        id: 2,
        title: 'Healthy Food Corner',
        description: 'Fresh meals and snacks delivered to your doorstep.',
        imageUrl: 'food.png',
        link: 'https://food-delivery.com',
    },
    {
        id: 3,
        title: 'Smart Electronics Hub',
        description: 'Top-notch gadgets, phones, and appliances at unbeatable prices.',
        imageUrl: 'electronics1.jpg',
        link: 'https://www.flipkart.com/',
    },
];

const Advertisement: React.FC = () => (
    <div className="w-[44rem] sm:w-[53rem] md:w-[69rem]    mt-10 px-4 sm:px-6 xl:pl-[4.5rem] ">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-700 mb-6 text-center sm:text-left ">
            Recommended Nearby Services
        </h2>
        <div className='w-[44rem] sm:w-[53rem] md:w-[69rem]   flex justify-center items-center  '>


            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {ads.map((ad) => (
                    <div
                        key={ad.id}
                        className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-xl transition duration-300"
                    >
                        {/* Image wrapper with reduced height */}
                        <div className="p-3 bg-gray-50">
                            <img
                                src={ad.imageUrl}
                                alt={ad.title}
                                className="w-full h-28 sm:h-32 md:h-36 object-contain rounded-md"
                            />
                        </div>
                        <div className="p-3">
                            <h3 className="text-sm sm:text-base font-semibold text-gray-800">
                                {ad.title}
                            </h3>
                            <p className="text-xs sm:text-sm text-gray-600 mt-1">
                                {ad.description}
                            </p>
                            <a
                                href={ad.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block mt-3 px-4 py-1.5 bg-red-500 text-white text-sm rounded-lg hover:bg-red-600 transition"
                            >
                                Visit Now
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </div>

    </div>
);

export default Advertisement;
