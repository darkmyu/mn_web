import AnimalCard from './AnimalCard';

function AnimalGrid() {
  return (
    <div className="grid grid-cols-5 gap-4">
      {Array.from({ length: 30 }, (_, index) => index).map((item) => (
        <AnimalCard key={item} />
      ))}
    </div>
  );
}

export default AnimalGrid;
