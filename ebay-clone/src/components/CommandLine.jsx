import { useState } from 'react';

const CommandLine = ({ onCommand }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      onCommand(input.trim());
      setInput('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="command-line">
      <span>$</span>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        autoFocus
      />
    </form>
  );
};

export default CommandLine;