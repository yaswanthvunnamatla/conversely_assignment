import React, { useState } from 'react';
import "./Matrix.css";

const Matrix = () => {
  const [matrix, setMatrix] = useState(Array(9).fill(null));
  const [clickBox, setClickBox] = useState([]);

  const handleClick = (value) => {
    if (matrix[value] === null) {
      const newMatrix = [...matrix];
      newMatrix[value] = "green";
      setMatrix(newMatrix);
      setClickBox([...clickBox, value]);

      if (clickBox.length === 8) {
        setTimeout(() => {
          const updatedMatrix = [...newMatrix]; 
          clickBox.forEach((boxIndex, i) => {
            setTimeout(() => {
              updatedMatrix[boxIndex] = "orange"; 
              setMatrix([...updatedMatrix]);
            }, i * 200);
          });

          setTimeout(() => {
            const allOrangeMatrix = Array(9).fill("orange");
            setMatrix(allOrangeMatrix);
          }, clickBox.length * 200);
        }, 10);
      }
    }
  };

  return (
    <div className='matrix'>
      {matrix.map((color, value) => (
        <div 
          key={value} 
          className='box' 
          style={{ backgroundColor: color }} 
          onClick={() => handleClick(value)} 
        />
      ))}
    </div>
  );
};

export default Matrix;
