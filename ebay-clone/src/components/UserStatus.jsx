import useAuctionStore from '../store/auctionStore';

const UserStatus = () => {
  const { currentUser, artworks } = useAuctionStore();
  
  // Calculate user's active bids
  const userBids = currentUser 
    ? artworks.flatMap(artwork => 
        artwork.bids
          .filter(bid => bid.user === currentUser)
          .map(bid => ({
            artworkId: artwork.id,
            title: artwork.title,
            amount: bid.amount,
            isLeading: artwork.currentBid === bid.amount
          }))
      )
    : [];

  return (
    <div className="user-status">
      {currentUser ? (
        <div className="logged-in">
          <span className="username">USER: {currentUser}</span>
          {userBids.length > 0 && (
            <div className="bid-summary">
              <span className="bid-count">
                ACTIVE BIDS: {userBids.length}
              </span>
              <span className="leading-bids">
                LEADING: {userBids.filter(bid => bid.isLeading).length}
              </span>
              <span className="highest-bid">
                MAX BID: ${Math.max(...userBids.map(bid => bid.amount), 0)}
              </span>
            </div>
          )}
        </div>
      ) : (
        <div className="logged-out">
          (Not logged in - use 'login [username]' to bid)
        </div>
      )}
    </div>
  );
};

export default UserStatus;