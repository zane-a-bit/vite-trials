import { create } from 'zustand';

const useAuctionStore = create((set) => ({
  artworks: [
    {
      id: 1,
      title: "Starry Algorithm",
      artist: "AI Van Gogh",
      description: "Neural network recreation of Starry Night",
      currentBid: 4200,
      bids: [
        { user: "collector1", amount: 4000 },
        { user: "artlover42", amount: 4200 }
      ],
      endTime: "2023-12-15T23:59:00"
    },
    {
      id: 2,
      title: "The Screaming API",
      artist: "Edward Munch.js",
      description: "Digital expressionist piece about debugging",
      currentBid: 3800,
      bids: [],
      endTime: "2023-12-20T18:00:00"
    }
  ],
  currentUser: null,
  setUser: (user) => set({ currentUser: user }),
  placeBid: (artworkId, amount) => set(state => ({
    artworks: state.artworks.map(artwork => 
      artwork.id === artworkId ? { 
        ...artwork, 
        currentBid: amount,
        bids: [...artwork.bids, { user: state.currentUser, amount }]
      } : artwork
    )
  }))
}));

export default useAuctionStore;