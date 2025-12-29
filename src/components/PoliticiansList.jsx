import { useState, useEffect } from 'react';

function PoliticiansList() {
  const [politicians, setPoliticians] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPoliticians = async () => {
      try {
        const response = await fetch('http://localhost:3333/politicians');
        if (!response.ok) {
          throw new Error('Errore nel caricamento dei dati');
        }
        const data = await response.json();
        setPoliticians(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPoliticians();
  }, []);

  if (loading) return <p>Caricamento...</p>;
  if (error) return <p>Errore: {error}</p>;

  return (
    <div className="politicians-container">
      <h1>Politici</h1>
      <input type="text" placeholder="cerca..."></input>
      <div className="cards-grid">
        {politicians.map((politician) => (
          <div key={politician.id} className="politician-card">
            <img 
              src={politician.image} 
              alt={politician.name}
              className="politician-image"
            />
            <div className="politician-info">
              <h2>{politician.name}</h2>
              <h3>{politician.position}</h3>
              <p>{politician.biography}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PoliticiansList;
