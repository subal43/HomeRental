import React, { useState } from 'react';
import { FaStar, FaHeart, FaCheckCircle } from 'react-icons/fa';

interface Review {
    id: number;
    name: string;
    message: string;
    rating: number;
    photoUrl: string;
    likes: number;
    badge: string;
}

const reviews: Review[] = [
    {
        id: 1,
        name: 'Tinny Sarkar ',
        message: 'This rental flat was in a prime location and the rooms were super clean. Totally satisfied!',
        rating: 4,
        photoUrl: 'https://i.pravatar.cc/150?img=32',
        likes: 10,
        badge: 'Verified Stay',
    },
    {
        id: 2,
        name: 'Priya Verma',
        message: 'Spacious home with great ventilation. The owner was friendly and helpful.',
        rating: 5,
        photoUrl: 'https://i.pravatar.cc/150?img=47',
        likes: 7,
        badge: 'Family Friendly',
    },
    {
        id: 3,
        name: 'Amit Roy',
        message: 'Affordable price for such a peaceful area. Perfect for small families.',
        rating: 4,
        photoUrl: 'https://i.pravatar.cc/150?img=12',
        likes: 5,
        badge: 'Peaceful Area',
    },
];

export default function ReviewShow() {
    const [likes, setLikes] = useState(reviews.map((review) => review.likes));

    const handleLike = (index: number) => {
        const updatedLikes = [...likes];
        updatedLikes[index]++;
        setLikes(updatedLikes);
    };

    return (
        <div className="   w-[46rem] sm:w-[53rem] md:w-[69rem] xl:w-[79rem]      px-4 py-10 bg-gray-50">
            <h2 className="text-3xl font-bold text-center mb-10 text-gray-700">Customer Reviews</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                {reviews.map((review, index) => (
                    <div
                        key={review.id}
                        className="bg-white shadow-md rounded-xl p-4 flex flex-col items-center text-center justify-between h-[20rem] max-w-[18rem] mx-auto hover:shadow-xl transition duration-300"
                    >

                        <img
                            src={review.photoUrl}
                            alt={review.name}
                            className="w-20 h-20 rounded-full object-cover mb-2"
                        />

                        <h3 className="font-semibold text-lg">{review.name}</h3>

                        <div className="mt-1 mb-2 text-sm px-3 py-1 bg-blue-100 text-blue-700 rounded-full flex items-center gap-1">
                            <FaCheckCircle className="text-blue-500" />
                            {review.badge}
                        </div>

                        <p className="text-gray-600 text-sm mt-1">{review.message}</p>

                        <div className="flex justify-center mt-2 text-yellow-500">
                            {Array.from({ length: 5 }).map((_, i) => (
                                <FaStar
                                    key={i}
                                    className={i < review.rating ? 'text-yellow-500' : 'text-gray-300'}
                                />
                            ))}
                        </div>

                        <button
                            onClick={() => handleLike(index)}
                            className="flex items-center text-red-500 mt-3 hover:scale-105 transition-transform"
                        >
                            <FaHeart className="mr-1" />
                            {likes[index]} Likes
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
