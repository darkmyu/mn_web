import AnimalCard from './AnimalCard';

function AnimalGrid() {
  return (
    <div className="grid grid-cols-4 gap-0.5">
      {Array.from({ length: 30 }, (_, index) => index).map((item) => (
        <AnimalCard key={item} />
      ))}
    </div>
  );
}

export default AnimalGrid;
