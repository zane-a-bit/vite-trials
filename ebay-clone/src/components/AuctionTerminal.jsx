import { useState } from 'react';
import ArtworkList from './ArtworkList';
import CommandLine from './CommandLine';
import UserStatus from './UserStatus';
import useAuctionStore from '../store/auctionStore.js';

const AuctionTerminal = () => {
  const [output, setOutput] = useState([]);
  const { artworks, currentUser } = useAuctionStore();

  const commands = {
    help: () => [
      "ART AUCTION TERMINAL - COMMANDS:",
      "list      - Show all artworks",
      "bid [id] [amount] - Place a bid",
      "login [username] - Set your bidder identity",
      "status    - View your bids",
      "clear     - Clear terminal"
    ],
    list: () => <ArtworkList artworks={artworks} />,
    bid: (id, amount) => {
      if (!currentUser) return "Please login first (command: login [username])";
      if (isNaN(amount)) return "Bid amount must be a number";
      useAuctionStore.getState().placeBid(Number(id), Number(amount));
      return `Bid of $${amount} placed on artwork ${id}`;
    },
    login: (username) => {
      useAuctionStore.getState().setUser(username);
      return `Logged in as ${username}`;
    },
    status: () => {
      if (!currentUser) return "Not logged in";
      const userBids = artworks.flatMap(artwork => 
        artwork.bids.filter(bid => bid.user === currentUser)
      );
      return [
        `BIDDER: ${currentUser}`,
        ...userBids.map(bid => `- Artwork ${bid.artworkId}: $${bid.amount}`)
      ];
    },
    clear: () => setOutput([])
  };

  const handleCommand = (input) => {
    const [cmd, ...args] = input.split(' ');
    const response = commands[cmd] 
      ? commands[cmd](...args) 
      : `Unknown command: ${cmd}. Type 'help' for commands.`;
    
    setOutput(prev => [
      ...prev,
      { type: 'input', content: `> ${input}` },
      { type: 'response', content: response }
    ]);
  };

  return (
    <div className="terminal">
      <div className="header">
        <h1>DIGITAL ART AUCTION TERMINAL</h1>
        <UserStatus />
      </div>
      <div className="output">
        {output.map((item, i) => (
          <div key={i} className={item.type}>
            {Array.isArray(item.content) 
              ? item.content.map((line, j) => <div key={j}>{line}</div>)
              : item.content}
          </div>
        ))}
      </div>
      <CommandLine onCommand={handleCommand} />
    </div>
  );
};

export default AuctionTerminal;