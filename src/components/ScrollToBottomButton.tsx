interface ScrollToBottomButtonProps {
    onClick: () => void;
  }
  
  const ScrollToBottomButton: React.FC<ScrollToBottomButtonProps> = ({ onClick }) => (
    <button
      className="fixed bottom-20 right-8 rounded-full bg-blue-500 text-white size-12 shadow"
      onClick={onClick}
    >
      ↓
    </button>
  );
  
  export default ScrollToBottomButton;