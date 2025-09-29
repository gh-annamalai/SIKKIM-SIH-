import React, { useEffect, useRef } from 'react';
import { X, RotateCcw, Volume2, Info } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';

interface VirtualTour360Props {
  isOpen: boolean;
  onClose: () => void;
  tourData: {
    id: number;
    name: string;
    description: string;
    image: string;
    highlights: string[];
    languages: string[];
  };
}

const VirtualTour360: React.FC<VirtualTour360Props> = ({ isOpen, onClose, tourData }) => {
  const sceneRef = useRef<HTMLDivElement>(null);
  const isInitialized = useRef(false);

  useEffect(() => {
    if (isOpen && !isInitialized.current) {
      // Dynamically load A-Frame script
      const script = document.createElement('script');
      script.src = 'https://aframe.io/releases/1.4.2/aframe.min.js';
      script.async = true;
      script.onload = () => {
        initializeScene();
        isInitialized.current = true;
      };
      document.head.appendChild(script);

      return () => {
        if (document.head.contains(script)) {
          document.head.removeChild(script);
        }
      };
    } else if (isOpen && isInitialized.current) {
      initializeScene();
    }
  }, [isOpen]);

  const initializeScene = () => {
    if (!sceneRef.current) return;

    // Clear previous scene content
    sceneRef.current.innerHTML = '';

    // Create A-Frame scene
    const aframeScene = `
      <a-scene 
        vr-mode-ui="enabled: false" 
        cursor="rayOrigin: mouse"
        style="width: 100%; height: 100vh;"
        background="color: #000000"
      >
        <!-- 360° Monastery Image -->
        <a-sky 
          src="${tourData.image}" 
          rotation="0 -90 0"
        ></a-sky>
        
        <!-- Welcome Text -->
        <a-text 
          value="Welcome to ${tourData.name}" 
          position="-2.5 2.5 -4" 
          color="#FFD700" 
          width="8"
          font="dejavu"
          align="center"
          animation="property: position; to: -2.5 2.3 -4; dir: alternate; dur: 2000; loop: true; easing: easeInOutSine"
        ></a-text>

        <!-- Description Text -->
        <a-text 
          value="${tourData.description}" 
          position="-1.5 1.8 -4" 
          color="#FFFFFF" 
          width="6"
          font="dejavu"
          align="center"
        ></a-text>

        <!-- Interactive Hotspots -->
        ${createHotspots(tourData.highlights)}

        <!-- Camera -->
        <a-camera 
          look-controls="enabled: true" 
          wasd-controls="enabled: false"
          position="0 0 0"
        >
          <a-cursor
            geometry="primitive: ring; radiusInner: 0.02; radiusOuter: 0.03"
            material="color: #FFD700; shader: flat"
            animation__click="property: scale; startEvents: click; from: 1 1 1; to: 1.3 1.3 1; dur: 150; dir: alternate"
            animation__mouseenter="property: scale; startEvents: mouseenter; to: 1.2 1.2 1; dur: 300"
            animation__mouseleave="property: scale; startEvents: mouseleave; to: 1 1 1; dur: 300"
          ></a-cursor>
        </a-camera>

        <!-- Ambient Light -->
        <a-light type="ambient" color="#404040"></a-light>
        <a-light type="point" position="2 4 4"></a-light>
      </a-scene>
    `;

    sceneRef.current.innerHTML = aframeScene;

    // Add event listeners for hotspots
    setTimeout(() => {
      addHotspotEventListeners(tourData.highlights);
    }, 1000);
  };

  const createHotspots = (highlights: string[]) => {
    const hotspotPositions = [
      { x: 2, y: 1, z: -3 },
      { x: -2.5, y: 0.5, z: -2 },
      { x: 1.5, y: -0.5, z: -2.5 }
    ];

    return highlights.map((highlight, index) => {
      const pos = hotspotPositions[index] || { x: 0, y: 1, z: -3 };
      return `
        <a-entity 
          id="hotspot-${index}"
          geometry="primitive: sphere; radius: 0.15" 
          material="color: #FF6B35; opacity: 0.8; transparent: true" 
          position="${pos.x} ${pos.y} ${pos.z}"
          animation__hover="property: scale; to: 1.3 1.3 1.3; startEvents: mouseenter; dur: 200"
          animation__unhover="property: scale; to: 1 1 1; startEvents: mouseleave; dur: 200"
          animation__pulse="property: material.opacity; to: 0.4; dir: alternate; dur: 1500; loop: true"
          class="hotspot"
          data-info="${highlight}"
        >
          <!-- Info text that appears on hover -->
          <a-text
            value="${highlight}"
            position="0 0.4 0"
            color="#FFFFFF"
            width="4"
            align="center"
            visible="false"
            id="info-${index}"
            geometry="primitive: plane; width: auto; height: auto"
            material="color: #000000; opacity: 0.7"
          ></a-text>
        </a-entity>
      `;
    }).join('');
  };

  const addHotspotEventListeners = (highlights: string[]) => {
    highlights.forEach((highlight, index) => {
      const hotspot = document.querySelector(`#hotspot-${index}`);
      const infoText = document.querySelector(`#info-${index}`);
      
      if (hotspot && infoText) {
        hotspot.addEventListener('mouseenter', () => {
          infoText.setAttribute('visible', 'true');
        });
        
        hotspot.addEventListener('mouseleave', () => {
          infoText.setAttribute('visible', 'false');
        });
        
        hotspot.addEventListener('click', () => {
          alert(`${highlight}: Explore this sacred area of the monastery. Here you can learn about the rich history and spiritual significance of this location.`);
        });
      }
    });
  };

  const handleClose = () => {
    // Clean up A-Frame scene
    if (sceneRef.current) {
      sceneRef.current.innerHTML = '';
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-95 flex items-center justify-center">
      {/* Control Panel */}
      <div className="absolute top-4 left-4 right-4 z-60 flex justify-between items-center">
        <Card className="bg-black/70 backdrop-blur-md border-monastery-gold/30 p-3">
          <div className="flex items-center space-x-3">
            <RotateCcw className="h-5 w-5 text-monastery-gold" />
            <div>
              <h3 className="text-monastery-gold font-semibold text-sm">{tourData.name}</h3>
              <p className="text-gray-300 text-xs">360° Virtual Experience</p>
            </div>
          </div>
        </Card>

        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            className="bg-black/70 backdrop-blur-md border-monastery-gold/30 text-white hover:bg-monastery-gold/20"
          >
            <Volume2 className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="bg-black/70 backdrop-blur-md border-monastery-gold/30 text-white hover:bg-monastery-gold/20"
          >
            <Info className="h-4 w-4" />
          </Button>
          <Button
            onClick={handleClose}
            variant="destructive"
            size="sm"
            className="bg-red-600/70 backdrop-blur-md border-red-500/30 text-white hover:bg-red-600/90"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Instructions */}
      <div className="absolute bottom-4 left-4 right-4 z-60">
        <Card className="bg-black/70 backdrop-blur-md border-monastery-gold/30 p-4">
          <div className="text-center text-white">
            <p className="text-sm mb-2">
              <strong>Click and drag</strong> to look around • <strong>Click hotspots</strong> to learn more
            </p>
            <div className="flex justify-center space-x-4 text-xs text-gray-300">
              <span>🔴 Ancient Artifacts</span>
              <span>🔴 Wall Murals</span>
              <span>🔴 Prayer Wheels</span>
            </div>
          </div>
        </Card>
      </div>

      {/* A-Frame Scene Container */}
      <div ref={sceneRef} className="w-full h-full" />
    </div>
  );
};

export default VirtualTour360;