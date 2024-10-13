import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, SmilePlus, Smile, Meh, Frown } from 'lucide-react';

interface RatingData {
  rating: number;
  comment: string;
  timestamp: number;
  dateTime: string;
}

const emojis = [
  { icon: Frown, label: 'Muy Insatisfecho', color: 'text-red-500' },
  { icon: Frown, label: 'Insatisfecho', color: 'text-orange-500' },
  { icon: Meh, label: 'Neutral', color: 'text-yellow-500' },
  { icon: Smile, label: 'Satisfecho', color: 'text-lime-500' },
  { icon: SmilePlus, label: 'Muy Satisfecho', color: 'text-green-500' },
];

function DetailsPage() {
  const navigate = useNavigate();
  const ratings: RatingData[] = JSON.parse(localStorage.getItem('ratings') || '[]');

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => navigate('/')}
          className="bg-blue-300 hover:bg-blue-400 text-gray-800 font-bold py-2 px-4 rounded flex items-center mb-4"
        >
          <ArrowLeft size={24} className="mr-2" />
          Salir
        </button>
        <h1 className="text-3xl font-bold mb-6">Detalles de Feedback</h1>
        {ratings.length === 0 ? (
          <p>No hay feedbacks registrados.</p>
        ) : (
          <ul className="space-y-4">
            {ratings.map((rating, index) => {
              const { icon: Icon, label, color } = emojis[rating.rating - 1];
              return (
                <li key={index} className="bg-white p-4 rounded-lg shadow">
                  <div className="flex items-center mb-2">
                    <span className={`mr-2 ${color}`}>
                      <Icon size={24} />
                    </span>
                    <span className={`font-semibold ${color}`}>
                      Rating: {rating.rating} - {label}
                    </span>
                  </div>
                  <p className="mb-2"><strong>Comentario:</strong> {rating.comment || 'Sin comentario'}</p>
                  <p className="text-sm text-gray-500">Fecha: {rating.dateTime}</p>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}

export default DetailsPage;