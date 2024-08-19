interface LikeCounterProps {
  likes: number;
  onLikesChange: (newLikes: number) => void;
}

export const LikeCounter = ({ likes, onLikesChange }: LikeCounterProps) => {
  return (
    <button className="secondary" onClick={() => onLikesChange(likes + 1)}>
      <span>👏</span>
      {likes}
    </button>
  );
};
