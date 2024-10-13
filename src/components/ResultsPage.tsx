import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SmilePlus, Smile, Meh, Frown, ArrowLeft, List, Trash2 } from 'lucide-react';

type Rating = 1 | 2 | 3 | 4 | 5;

interface RatingData {
  rating: Rating;
  comment: string;
  timestamp: number;
}

const emojis = [
  { icon: Frown, label: 'Muy Insatisfecho', value: 1, color: 'text-red-500' },
  { icon: Frown, label: 'Insatisfecho', value: 2, color: 'text-orange-500' },
  { icon: Meh, label: 'Neutral', value: 3, color: 'text-yellow-500' },
  { icon: Smile, label: 'Satisfecho', value: 4, color: 'text-lime-500' },
  { icon: SmilePlus, label: 'Muy Satisfecho', value: 5, color: 'text-green-500' },
];

function ResultsPage() {
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showSummary, setShowSummary] = useState(false);
  const [summary, setSummary] = useState<Record<Rating, number>>({
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
  });
  const [showClearConfirmation, setShowClearConfirmation] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    updateSummary();
  }, []);

  const updateSummary = () => {
    const ratings = JSON.parse(localStorage.getItem('ratings') || '[]');
    const newSummary = ratings.reduce((acc: Record<Rating, number>, curr: RatingData) => {
      acc[curr.rating] = (acc[curr.rating] || 0) + 1;
      return acc;
    }, {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
    });
    setSummary(newSummary);
  };

  const handleShowSummary = () => {
    if (password === 'Show123') {
      setShowSummary(true);
      setPasswordError('');
      setPassword('');
    } else {
      setPasswordError('Incorrect password. Please try again.');
    }
  };

  const handleClearData = () => {
    setShowClearConfirmation(true);
    setShowSummary(false);
    setPassword('');
  };

  const confirmClearData = () => {
    if (password === 'Show123') {
      localStorage.removeItem('ratings');
      updateSummary();
      setShowClearConfirmation(false);
      setShowSummary(false);
      setPasswordError('');
      setPassword('');
    } else {
      setPasswordError('Incorrect password. Please try again.');
    }
  };

  const calculateScore = () => {
    const score = Object.entries(summary).reduce((acc, [rating, count]) => {
      return acc + Number(rating) * count;
    }, 0);
    const totalResponses = Object.values(summary).reduce((acc, curr) => acc + curr, 0);
    const maxPossibleScore = totalResponses * 5;
    return { score, maxScore: maxPossibleScore };
  };

  const { score, maxScore } = calculateScore();

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
        
        {!showSummary && !showClearConfirmation ? (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Indique contraseña</h2>
            <div className="flex items-center space-x-2 mb-2">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Contraseña"
                className="border rounded px-2 py-1"
              />
              <button
                onClick={handleShowSummary}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
              >
                Submit
              </button>
            </div>
            {passwordError && <p className="text-red-500">{passwordError}</p>}
          </div>
        ) : showClearConfirmation ? (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Confirmar borrado de datos</h2>
            <p className="mb-4">Por favor, ingrese la contraseña para confirmar el borrado de todos los datos de feedback.</p>
            <div className="flex items-center space-x-2 mb-2">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Contraseña"
                className="border rounded px-2 py-1"
              />
              <button
                onClick={confirmClearData}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
              >
                Confirmar
              </button>
            </div>
            {passwordError && <p className="text-red-500">{passwordError}</p>}
          </div>
        ) : (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Reporte de Satisfacción</h2>
            <ul className="mb-4">
              {emojis.map(({ icon: Icon, label, value, color }) => (
                <li key={value} className="mb-2 flex items-center">
                  <span className={`mr-2 ${color}`}>
                    <Icon size={24} />
                  </span>
                  <span className={color}>{label}: {summary[value as Rating]} ({value})</span>
                </li>
              ))}
            </ul>
            <p className="text-xl font-semibold mb-4">
              Puntaje Total Acumulado: {score} / {maxScore}
            </p>
            <div className="flex space-x-4">
              <button
                onClick={() => navigate('/details')}
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded flex items-center"
              >
                <List size={24} className="mr-2" />
                Detalles
              </button>
              <button
                onClick={handleClearData}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded flex items-center"
              >
                <Trash2 size={24} className="mr-2" />
                Limpiar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ResultsPage;