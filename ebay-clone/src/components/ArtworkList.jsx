const ArtworkList = ({ artworks }) => {
    return (
      <div className="artwork-list">
        <h2>CURRENT AUCTIONS:</h2>
        {artworks.map(artwork => (
          <div key={artwork.id} className="artwork">
            <div className="artwork-header">
              #{artwork.id}: <strong>{artwork.title}</strong> by {artwork.artist}
            </div>
            <div className="artwork-desc">{artwork.description}</div>
            <div className="artwork-bid">
              CURRENT BID: ${artwork.currentBid} (Ends: {new Date(artwork.endTime).toLocaleString()})
            </div>
            {artwork.bids.length > 0 && (
              <div className="bid-history">
                BID HISTORY: {artwork.bids.slice(-3).map(bid => (
                  <span key={`${bid.user}-${bid.amount}`}>
                    {bid.user}: ${bid.amount}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };
  
  export default ArtworkList;