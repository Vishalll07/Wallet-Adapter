import { useState, useEffect } from 'react';


export const TypeWriter = () => {
  
    const [text, setText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const [wordIndex, setWordIndex] = useState(0);
    const [typingSpeed, setTypingSpeed] = useState(150);
  
    const words = ['Wallets', 'Crypto', 'WEB3', 'Payments', 'Hashing','NFTs'];
  
    useEffect(() => {
      const handleTyping = () => {
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
          setText(currentWord.substring(0, text.length - 1)); // Remove letters
          setTypingSpeed(30);
        } else {
          setText(currentWord.substring(0, text.length + 1)); // Add letters
          setTypingSpeed(150);
        }
  
        if (!isDeleting && text === currentWord) {
          setTimeout(() => setIsDeleting(true), 500); // Pause before deleting
        } else if (isDeleting && text === '') {
          setIsDeleting(false);
          setWordIndex((prev) => (prev + 1) % words.length); // Move to the next word
        }
      };
  
      const timer = setTimeout(handleTyping, typingSpeed);
  
      return () => clearTimeout(timer);
    }, [text, isDeleting, typingSpeed, wordIndex, words]);
  
    return (
      <span style={{ color: '#dd7732' }}>
        {text}
        <span className="cursor" style={{ opacity: '0.8' }}>|</span>
      </span>
  );
};


