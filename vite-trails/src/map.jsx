const MapArray = () => {
  const numbers = [1, 2, 3, 4, 5];
  
  const doubledNumbers = numbers.map(num => num * 2);
  
  return (
    <div className="app-container">
      <h2>Array Mapping Example</h2>
      <div>
        <h3>Original Array:</h3>
        <p>{numbers.join(', ')}</p>
        <h3>Doubled Array:</h3>
        <p>{doubledNumbers.join(', ')}</p>
        <h3>Filtered Array:</h3>
        <p>{numbers.filter(num => num % 2 === 0).join(', ')}</p>
      </div>
    </div>
  );
};

export default MapArray;
