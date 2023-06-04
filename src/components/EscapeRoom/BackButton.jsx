import React from 'react';
import { Html } from '@react-three/drei'
import "./__room-canvas.scss";

export default function BackButton({ handleBackButton, backButtonVisible }) {
    return (
        <Html>
            <div
              className="forceDisplay"
              style={{
                position: "fixed",
                bottom: -0.5*window.innerHeight,
                right: -0.5*window.innerWidth,
                zIndex: 9999,
                display: 'block'
              }}
            >
              <img
                src="icons8-back-64.png"
                alt="Back Arrow"
                onClick={handleBackButton}
                style={{ 
                  width: '50px', 
                  height: 'auto',
                  transition: 'transform 0.3s',
                  transform: 'scale(1)',
                  visibility: backButtonVisible ? 'visible' : 'hidden',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'scale(1.2)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'scale(1)';
                }}
              />
            </div>
        </Html>
    )
}