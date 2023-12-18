import React, { useState } from 'react';

const Vote = () => {
  const [count, setCount] = useState(0);
  const [liked, setLiked] = useState(false);

  const like = () => {
    if (liked == true) {
      setCount(newCount => newCount - 1);
    } else {
      setCount(newCount => newCount + 1);
    }
    setLiked(newLiked => !newLiked);
  };

  return (
    <div>
      <button onClick={like}>
        {liked ? '👎' : '👍'}
      </button>
      <span>{count}</span>
    </div>
  );
};

export default Vote;


