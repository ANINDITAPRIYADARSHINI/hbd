// App.jsx
import React, { useState, useEffect } from "react";
import "./index.css"; // Import Tailwind CSS here

const MatrixEffect = () => {
  useEffect(() => {
    const canvas = document.getElementById("matrixCanvas");
    const ctx = canvas.getContext("2d");

    // Set canvas dimensions
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const fontSize = 10; // Size of each character
    const columns = Math.floor(canvas.width / fontSize);
    const drops = Array(columns).fill(1);

    const draw = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#fdb2fd"; 
      ctx.font = `${fontSize}px 'Courier New'`;

      drops.forEach((y, i) => {
        const text = Math.random() > 0.5 ? "1" : "0";
        const x = i * fontSize;

        ctx.fillText(text, x, y * fontSize);

        if (y * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      });
    };

    const interval = setInterval(draw, 50);

    return () => clearInterval(interval); // Cleanup
  }, []);

  return (
    <canvas
      id="matrixCanvas"
      className="absolute top-0 left-0 w-full h-full"
    ></canvas>
  );
};

const App = () => {
  const [reveal, setReveal] = useState(false);

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      {/* Twinkling Stars */}
      {Array(50)
        .fill(0)
        .map((_, i) => (
          <div
            key={i}
            className="absolute twinkling-stars rounded-full bg-white"
            style={{
              width: "3px",
              height: "3px",
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
          ></div>
        ))}

      {/* Matrix Effect */}
      <MatrixEffect />

      {/* Reveal Button */}
      {!reveal && (
        <button
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 bg-pink-500 text-white font-bold py-2 px-4 rounded"
          onClick={() => setReveal(true)}
        >
          Surprise Reveal
        </button>
      )}

      {/* Picture + Neon Text */}
      {reveal && (
        <>
          {/* Picture inside the balloon */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 rounded-full overflow-hidden border-4 border-green-500">
            <img
              src="your-image-url.jpg" // Replace with your sister's picture
              alt="Happy Birthday"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Neon Text */}
          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-4xl font-bold neon-text">
            Happy Birthday Dona
          </div>
        </>
      )}
    </div>
  );
};

export default App;
