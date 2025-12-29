import { useState, useEffect, useMemo } from 'react';

function PoliticiansList() {
    const [politicians, setPoliticians] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [search, setSearch] = useState('');

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

    const filteredPoliticians = useMemo(() => {
        if (search === '') {
            return politicians;
        }

        return politicians.filter((politician) => {
            const searchLower = search.toLowerCase();
            return (
                politician.name.toLowerCase().includes(searchLower) ||
                politician.biography.toLowerCase().includes(searchLower)
            )
        })
    }, [politicians, search]);

    if (loading) return <p>Caricamento...</p>;
    if (error) return <p>Errore: {error}</p>;

    return (
        <div className="politicians-container">
            <h1>Politici</h1>
            <input
                type="text"
                placeholder="cerca..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="search-input"
            />
            <div className="cards-grid">
                {filteredPoliticians.map((politician) => {
                    console.log(`Rendering card: ${politician.name}`);

                    return (
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
                    );
                })}
            </div>
        </div>
    );
}

export default PoliticiansList;
