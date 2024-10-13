import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SmilePlus, Smile, Meh, Frown, Send, BarChart2 } from 'lucide-react';

type Rating = 1 | 2 | 3 | 4 | 5;

interface RatingData {
  rating: Rating;
  comment: string;
  timestamp: number;
  dateTime: string;
}

const emojis = [
  { icon: Frown, label: 'Muy Insatisfecho', size: 56, color: 'text-red-500' },
  { icon: Frown, label: 'Insatisfecho', size: 48, color: 'text-orange-500' },
  { icon: Meh, label: 'Neutral', size: 48, color: 'text-yellow-500' },
  { icon: Smile, label: 'Satisfecho', size: 48, color: 'text-lime-500' },
  { icon: SmilePlus, label: 'Muy Satisfecho', size: 48, color: 'text-green-500' },
];

function FeedbackPage() {
  const [selectedRating, setSelectedRating] = useState<Rating | null>(null);
  const [comment, setComment] = useState('');
  const navigate = useNavigate();

  const saveRating = () => {
    if (selectedRating) {
      const now = new Date();
      const ratingData: RatingData = {
        rating: selectedRating,
        comment,
        timestamp: now.getTime(),
        dateTime: now.toLocaleString()
      };
      const ratings = JSON.parse(localStorage.getItem('ratings') || '[]');
      ratings.push(ratingData);
      localStorage.setItem('ratings', JSON.stringify(ratings));
      setSelectedRating(null);
      setComment('');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-8">¿Cómo le atendimos?</h1>
      <div className="flex space-x-4 mb-8">
        {emojis.map((emoji, index) => {
          const rating = (index + 1) as Rating;
          const Icon = emoji.icon;
          return (
            <button
              key={rating}
              onClick={() => setSelectedRating(rating)}
              className={`p-4 rounded-full transition-all ${
                selectedRating === rating
                  ? `bg-blue-500 ${emoji.color}`
                  : `bg-white hover:bg-blue-100 ${emoji.color}`
              }`}
              title={emoji.label}
            >
              <Icon size={emoji.size} />
            </button>
          );
        })}
      </div>
      <div className="w-full max-w-md mb-8">
        <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-2">
          Comentarios
        </label>
        <textarea
          id="comment"
          rows={5}
          className="shadow-sm focus:ring-blue-500 focus:border-blue-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
          placeholder="Escriba sus comentarios aquí..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        ></textarea>
      </div>
      <div className="flex flex-col items-center mb-8">
        <p className="text-xl mb-4">
          Ud. seleccionó: {selectedRating ? (
            <span className={emojis[selectedRating - 1].color}>
              {emojis[selectedRating - 1].label}
            </span>
          ) : 'Ninguno'}
        </p>
        <button
          onClick={saveRating}
          className={`bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded flex items-center ${
            !selectedRating ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          disabled={!selectedRating}
        >
          <Send size={24} className="mr-2" />
          Enviar
        </button>
      </div>
      <button
        onClick={() => navigate('/results')}
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded flex items-center mt-8"
      >
        <BarChart2 size={24} className="mr-2" />
        Resultados
      </button>
    </div>
  );
}

export default FeedbackPage;