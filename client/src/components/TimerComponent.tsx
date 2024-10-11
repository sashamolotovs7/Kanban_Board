import { useEffect, useState } from 'react';
import AuthService from '../utils/auth';
import { useLocation } from 'react-router-dom'; // To check for current route
import monkeyHoldingBanana from '../assets/Monkey_holds_banana.png'; // Default image
import monkeyDroppingBanana from '../assets/Monkey_drops_banana.png'; // Image when timer < 5
import monkeyKnocked from '../assets/Monkey_knocked.png'; // Image when session expires

const TimerComponent = () => {
  const [timeLeft, setTimeLeft] = useState(15); // Start with 15 seconds inactivity
  const location = useLocation(); // To access current URL path
  const [image, setImage] = useState(monkeyHoldingBanana); // Default image state

  useEffect(() => {
    let activityDetected = false;

    // Function to handle user activity
    const resetTimer = () => {
      activityDetected = true; // Mark that activity happened
    };

    // Setting up event listeners for user interaction
    document.addEventListener('click', resetTimer);
    document.addEventListener('keypress', resetTimer);
    document.addEventListener('mousemove', resetTimer); // Reset on mouse movement

    // Setting interval to update the countdown every second
    const intervalId = setInterval(() => {
      setTimeLeft((prev) => {
        // If activity detected, reset timer to 15 seconds
        if (activityDetected) {
          activityDetected = false; // Reset flag
          setImage(monkeyHoldingBanana); // Reset to holding banana
          return 15; // Reset timer to 15 seconds
        }

        const newTimeLeft = prev > 0 ? prev - 1 : 0;

        // Change image when time left is <= 5
        if (newTimeLeft <= 5 && newTimeLeft > 0) {
          setImage(monkeyDroppingBanana); // Change to the dropping banana image
        } else if (newTimeLeft === 0) {
          setImage(monkeyKnocked); // Change to the knocked out image
          AuthService.logout(); // Log the user out
        }

        return newTimeLeft;
      });
    }, 1000);

    // Cleanup function to remove event listeners and interval
    return () => {
      document.removeEventListener('click', resetTimer);
      document.removeEventListener('keypress', resetTimer);
      document.removeEventListener('mousemove', resetTimer);
      clearInterval(intervalId);
    };
  }, []);

  // Don't display on login or signup pages
  if (!AuthService.loggedIn() || location.pathname === '/login' || location.pathname === '/signup') {
    return null;
  }

  return (
    <div className="timer-wrapper">
      <p className={`timer ${timeLeft <= 10 ? 'warning' : ''}`}>
        {timeLeft > 0 ? `Session expires in: ${Math.ceil(timeLeft)} seconds` : 'Session has expired. Logging out...'}
      </p>
      <img src={image} alt="Monkey status" className="monkey-image" />
    </div>
  );
};

export default TimerComponent;
