import { memo } from 'react';

const PoliticianCard = memo(({ politician }) => {
    console.log(`Rendering card: ${politician.name}`);
    
    return (
        <div className="politician-card">
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
});

export default PoliticianCard;

