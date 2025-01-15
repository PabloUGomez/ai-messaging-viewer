interface ScrollToBottomButtonProps {
    onClick: () => void;
  }
  
  const ScrollToBottomButton: React.FC<ScrollToBottomButtonProps> = ({ onClick }) => (
    <button
      className="fixed bottom-4 right-4 bg-blue-500 text-white p-3 rounded-full shadow"
      onClick={onClick}
    >
      ↓
    </button>
  );
  
  export default ScrollToBottomButton;