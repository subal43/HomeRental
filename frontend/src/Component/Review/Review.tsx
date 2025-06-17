import React, { useState, FormEvent } from "react";
import { FaXmark } from "react-icons/fa6";
import { Link } from "react-router-dom"; // ✅ Corrected import

// Define a type for each review
interface ReviewItem {
  name: string;
  review: string;
  rating: number;
  photo: string;
}

const Review: React.FC = () => {
  // State to hold reviews
 const [reviews, setReviews] = useState<ReviewItem[]>([
  {
    name: "Tamal Sarkar",
    review: "The rental process was smooth, and the apartment matched the photos perfectly. Highly recommended!",
    rating: 5,
    photo: "https://i.pravatar.cc/150?img=12",
  },
  {
    name: "Subal Kundu",
    review: "The house was decent, but the neighborhood was a bit noisy. Good for short stays.",
    rating: 3,
    photo: "https://i.pravatar.cc/150?img=11",
  },
  {
    name: "Ananya Sarkar",
    review: "Absolutely loved the apartment! Clean, spacious, and the landlord was very helpful.",
    rating: 5,
    photo: "https://i.pravatar.cc/150?img=47",
  },
]);


  // State to manage form inputs
  const [name, setName] = useState<string>("");
  const [reviewText, setReviewText] = useState<string>("");
  const [rating, setRating] = useState<number>(5);
  const [photo, setPhoto] = useState<string>("");

  // Handle form submission
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (name.trim() && reviewText.trim()) {
      const newReview: ReviewItem = {
        name,
        review: reviewText,
        rating,
        photo: photo || "https://i.pravatar.cc/150",
      };

      setReviews([...reviews, newReview]);

      // Reset form fields
      setName("");
      setReviewText("");
      setRating(5);
      setPhoto("");
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen w-[46rem] sm:w-[57rem] md:w-[70rem] lg:w-[63rem] xl:w-full">
      {/* Header */}
      <header className="bg-gradient-to-r from-red-500 to-orange-400 text-white text-center py-4">
        <h1 className="text-3xl font-bold">Customer Reviews</h1>
      </header>

      {/* Reviews Section */}
      <main className="mt-8">
        <section className="grid gap-6 sm:grid-cols-2 place-items-center lg:grid-cols-3">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-lg p-6 text-center border border-gray-200 transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
            >
              <img
                src={review.photo}
                alt={`${review.name}'s avatar`}
                className="w-20 h-20 mx-auto rounded-full mb-4"
              />
              <h3 className="text-xl font-semibold text-gray-800">{review.name}</h3>
              <p className="italic text-gray-600">"{review.review}"</p>
              <div className="text-yellow-500 mt-2">
                {"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}
              </div>
            </div>
          ))}
        </section>

        {/* Add Review Form */}
        <section className="bg-white p-6 shadow-lg rounded-lg mt-8 relative">
          <Link to="/" className="absolute right-4 top-6 hover:text-lg">
            <FaXmark />
          </Link>
          <h2 className="text-2xl font-semibold mb-4">Add a Review</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:ring-2 focus:ring-yellow-500"
              required
            />
            <textarea
              placeholder="Write your review..."
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:ring-2 focus:ring-yellow-500"
              required
            ></textarea>
            <div className="flex items-center mb-4">
              <span className="mr-2">Rating:</span>
              <select
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
                className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500"
              >
                <option value={5}>5 Stars</option>
                <option value={4}>4 Stars</option>
                <option value={3}>3 Stars</option>
                <option value={2}>2 Stars</option>
                <option value={1}>1 Star</option>
              </select>
            </div>
            <input
              type="url"
              placeholder="Photo URL (Optional)"
              value={photo}
              onChange={(e) => setPhoto(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:ring-2 focus:ring-yellow-500"
            />
            <button
              type="submit"
              className=" text-white px-6 py-3 rounded-lg bg-indigo-600 hover:bg-indigo-700 font-semibold transition duration-300"
            >
              Submit Review
            </button>
          </form>
        </section>
      </main>
    </div>
  );
};

export default Review;
