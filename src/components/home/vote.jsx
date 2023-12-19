import React, { useState, useEffect } from 'react';

const Vote = () => {
  const [count, setCount] = useState(0);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    const savedCount = localStorage.getItem('voteCount');
    const savedLiked = localStorage.getItem('voteLiked');

    if (savedCount) {
      setCount(Number(savedCount));
    }

    if (savedLiked) {
      setLiked(savedLiked === 'true');
    }
  }, []);

  const like = () => {
    setCount((newCount) => {
      const updatedCount = liked ? newCount - 1 : newCount + 1;
      localStorage.setItem('voteCount', updatedCount);
      localStorage.setItem('voteLiked', !liked);

      return updatedCount;
    });

    setLiked((newLiked) => !newLiked);
  };

  return (
    <div>
      <button onClick={like}>{liked ? '👎' : '👍'}</button>
      <span>{count}</span>
    </div>
  );
};

export default Vote;


