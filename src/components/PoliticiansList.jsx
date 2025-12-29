import { useState, useEffect, useMemo } from 'react';
import PoliticianCard from './PoliticianCard';

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
            );
        });
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
            <div className="cards-flex">
                {filteredPoliticians.map((politician) => (
                    <PoliticianCard 
                        key={politician.id} 
                        politician={politician}
                    />
                ))}
            </div>
        </div>
    );
}

export default PoliticiansList;
