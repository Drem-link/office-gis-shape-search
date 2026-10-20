import { useEffect, useState } from 'react';

const API_URL = (import.meta.env.VITE_API_URL || 'http://backend:8000').replace(/\/$/, '');

type GeoItem = {
  id: string;
  name: string;
  category: string;
  region: string;
  mineral: string;
  code: string;
  latitude?: number | null;
  longitude?: number | null;
};

export default function App() {
  const [results, setResults] = useState<GeoItem[]>([]);
  const [query, setQuery] = useState('');
  const [region, setRegion] = useState('');
  const [mineral, setMineral] = useState('');
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchResults = async () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (query) params.set('q', query);
    if (region) params.set('region', region);
    if (mineral) params.set('mineral', mineral);
    if (category) params.set('category', category);
    params.set('limit', '20');

    try {
      const response = await fetch(`${API_URL}/api/search?${params.toString()}`);
      const data = await response.json();
      setResults(data.items || []);
    } catch (error) {
      console.error(error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResults();
  }, []);

  return (
    <div style={{ padding: 24, color: '#fff', background: '#0a1220', minHeight: '100vh' }}>
      <h1>Office GIS Search</h1>

      <div style={{ display: 'grid', gap: 12, gridTemplateColumns: '2fr 1fr 1fr 1fr', marginBottom: 20 }}>
        <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Поиск" />
        <input value={region} onChange={(e) => setRegion(e.target.value)} placeholder="Регион" />
        <input value={mineral} onChange={(e) => setMineral(e.target.value)} placeholder="Минерал" />
        <input value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Категория" />
      </div>

      <button onClick={fetchResults} style={{ marginBottom: 20 }}>
        {loading ? 'Поиск...' : 'Найти'}
      </button>

      <div style={{ display: 'grid', gap: 12 }}>
        {results.map((item) => (
          <div key={item.id} style={{ border: '1px solid #2e3e5e', borderRadius: 10, padding: 16 }}>
            <div><strong>{item.name}</strong></div>
            <div>Регион: {item.region}</div>
            <div>Категория: {item.category}</div>
            <div>Минерал: {item.mineral}</div>
            <div>Код: {item.code}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
