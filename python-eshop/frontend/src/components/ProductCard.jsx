import { useState } from 'react';
import { api } from '../api/client';
import { useAuth } from '../context/AuthContext';

export default function ProductCard({ item, onAdded }) {
  const { isAuthenticated, refreshBasket } = useAuth();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [saved, setSaved] = useState(false);

  async function handleAdd() {
    setLoading(true);
    setMessage('');
    try {
      await api.addToBasket(item.id);
      await refreshBasket();
      setMessage('Added!');
      onAdded?.();
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleSave() {
    setMessage('');
    try {
      await api.saveFavourite(item.id);
      setSaved(true);
    } catch (error) {
      setMessage(error.message);
    }
  }

  return (
    <article className="card flex flex-col overflow-hidden p-0 transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="relative aspect-square overflow-hidden bg-slate-100">
        {isAuthenticated && (
          <button
            type="button"
            onClick={handleSave}
            aria-label={saved ? 'Saved to favourites' : 'Save to favourites'}
            aria-pressed={saved}
            className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-rose-500 shadow hover:bg-white"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill={saved ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path strokeLinejoin="round" d="M12 20.5s-7.5-4.6-9.2-9.4C1.6 7.6 4 4.5 7.3 4.5c2 0 3.6 1.1 4.7 2.7 1.1-1.6 2.7-2.7 4.7-2.7 3.3 0 5.7 3.1 4.5 6.6-1.7 4.8-9.2 9.4-9.2 9.4z" />
            </svg>
          </button>
        )}
        <img
          src={item.picture_uri}
          alt={item.name}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="flex-1">
          <p className="text-xs font-medium uppercase tracking-wide text-indigo-600">
            {item.brand_name} · {item.type_name}
          </p>
          <h3 className="mt-1 text-lg font-semibold text-slate-900">{item.name}</h3>
          <p className="mt-2 text-sm text-slate-500 line-clamp-2">{item.description}</p>
        </div>
        <div className="flex items-center justify-between gap-3">
          <p className="text-xl font-bold text-slate-900">${item.price.toFixed(2)}</p>
          <button
            type="button"
            onClick={handleAdd}
            disabled={loading}
            className="btn-primary"
          >
            {loading ? 'Adding...' : 'Add to basket'}
          </button>
        </div>
        {message && <p className="text-xs font-medium text-emerald-600">{message}</p>}
      </div>
    </article>
  );
}
