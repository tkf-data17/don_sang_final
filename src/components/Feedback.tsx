import { useState } from 'react';
import { MessageSquare, Star, Send, ThumbsUp, X } from 'lucide-react';

interface FeedbackProps {
  onClose: () => void;
}

export function Feedback({ onClose }: FeedbackProps) {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [category, setCategory] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const categories = [
    { id: 'feature', label: '✨ Nouvelle fonctionnalité', emoji: '✨' },
    { id: 'bug', label: '🐛 Signaler un bug', emoji: '🐛' },
    { id: 'improvement', label: '💡 Amélioration', emoji: '💡' },
    { id: 'praise', label: '❤️ Compliment', emoji: '❤️' },
    { id: 'other', label: '💬 Autre', emoji: '💬' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // En production, envoyer à Supabase ou service de feedback
    console.log('Feedback soumis:', { rating, category, message });
    
    setSubmitted(true);
    setTimeout(() => {
      onClose();
    }, 2000);
  };

  if (submitted) {
    return (
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl max-w-md w-full p-8 text-center shadow-2xl">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <ThumbsUp className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-2xl text-gray-900 mb-2">Merci beaucoup !</h2>
          <p className="text-gray-600">
            Votre avis nous aide à améliorer l'application pour tous les donneurs.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-t-2xl">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-2xl">Votre Avis Compte !</h2>
            <button
              onClick={onClose}
              className="w-8 h-8 bg-white/20 rounded-full hover:bg-white/30 transition flex items-center justify-center"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <p className="text-blue-100 text-sm">
            Aidez-nous à améliorer Don de Sang Togo
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Rating */}
          <div>
            <label className="block text-sm text-gray-700 mb-3">
              Comment évalueriez-vous votre expérience ?
            </label>
            <div className="flex justify-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  className="transition-transform hover:scale-110"
                >
                  <Star
                    className={`w-10 h-10 ${
                      star <= (hoveredRating || rating)
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                </button>
              ))}
            </div>
            {rating > 0 && (
              <p className="text-center text-sm text-gray-600 mt-2">
                {rating === 1 && '😞 Très insatisfait'}
                {rating === 2 && '😕 Insatisfait'}
                {rating === 3 && '😐 Neutre'}
                {rating === 4 && '😊 Satisfait'}
                {rating === 5 && '🤩 Excellent'}
              </p>
            )}
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm text-gray-700 mb-3">
              De quoi s'agit-il ?
            </label>
            <div className="grid grid-cols-2 gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setCategory(cat.id)}
                  className={`p-3 rounded-xl border-2 text-sm transition ${
                    category === cat.id
                      ? 'bg-blue-50 border-blue-500 text-blue-900'
                      : 'bg-white border-gray-200 text-gray-700 hover:border-blue-300'
                  }`}
                >
                  <span className="text-xl mb-1 block">{cat.emoji}</span>
                  <span className="text-xs">{cat.label.split(' ').slice(1).join(' ')}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Message */}
          <div>
            <label className="block text-sm text-gray-700 mb-2">
              Partagez vos pensées (optionnel)
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Que pouvons-nous améliorer ? Qu'aimez-vous ?"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              rows={4}
            />
            <p className="text-xs text-gray-500 mt-1">
              {message.length} / 500 caractères
            </p>
          </div>

          {/* Contact */}
          <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="w-4 h-4 rounded border-gray-300" />
              <span className="text-sm text-gray-700">
                Je souhaite être contacté pour discuter de mon feedback
              </span>
            </label>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={rating === 0}
            className={`w-full py-4 rounded-xl font-medium transition flex items-center justify-center gap-2 ${
              rating === 0
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg'
            }`}
          >
            <Send className="w-5 h-5" />
            Envoyer mon avis
          </button>

          <p className="text-xs text-center text-gray-500">
            Vos données sont confidentielles et utilisées uniquement pour améliorer l'application
          </p>
        </form>
      </div>
    </div>
  );
}

// Bouton flottant pour ouvrir le feedback
export function FeedbackButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-24 right-4 w-14 h-14 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-110 flex items-center justify-center z-40"
      title="Donner mon avis"
    >
      <MessageSquare className="w-6 h-6" />
    </button>
  );
}
