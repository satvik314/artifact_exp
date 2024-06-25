"use client";
import React, { useState, useEffect } from "react";
import { ArrowUp, ArrowRight } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

export default function ProjectileMotion() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [time, setTime] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [angle, setAngle] = useState(45);
  const [velocity, setVelocity] = useState(50);
  const [trajectory, setTrajectory] = useState<
    { x: number; y: number; t: number }[]
  >([]);

  // Constants
  const g = 9.8; // Acceleration due to gravity (m/s^2)

  // Convert angle to radians
  const angleRad = (angle * Math.PI) / 180;

  // Initial velocity components
  const v0x = velocity * Math.cos(angleRad);
  const v0y = velocity * Math.sin(angleRad);

  useEffect(() => {
    let animationFrame: number;

    const animate = () => {
      if (isAnimating) {
        setTime((prevTime) => {
          const newTime = prevTime + 0.05;
          const x = v0x * newTime;
          const y = v0y * newTime - 0.5 * g * newTime * newTime;

          setPosition({ x, y });
          // setTrajectory((prev: any) => [...prev, { x, y, t: newTime }]);
          setTrajectory((prev) => [...prev, { x, y, t: newTime }]);

          if (y < 0) {
            setIsAnimating(false);
            return prevTime;
          }

          return newTime;
        });

        animationFrame = requestAnimationFrame(animate);
      }
    };

    animate();

    return () => cancelAnimationFrame(animationFrame);
  }, [isAnimating, v0x, v0y]);

  const handleStart = () => {
    setTime(0);
    setPosition({ x: 0, y: 0 });
    setTrajectory([]);
    setIsAnimating(true);
  };

  const scale = 3; // Scale factor for visualization

  const maxHeight = (v0y * v0y) / (2 * g);
  const totalRange = (v0x * 2 * v0y) / g;
  const flightTime = (2 * v0y) / g;

  return (
    <div className="w-full p-4 bg-gray-100">
      <div className="mb-4">
        <label className="mr-2">Angle (degrees): </label>
        <input
          type="range"
          min="0"
          max="90"
          value={angle}
          onChange={(e) => setAngle(Number(e.target.value))}
          className="mr-2"
        />
        <span>{angle}°</span>
      </div>
      <div className="mb-4">
        <label className="mr-2">Initial Velocity (m/s): </label>
        <input
          type="range"
          min="10"
          max="100"
          value={velocity}
          onChange={(e) => setVelocity(Number(e.target.value))}
          className="mr-2"
        />
        <span>{velocity} m/s</span>
      </div>
      <div className="relative w-full h-96 bg-blue-100 mb-4 overflow-hidden">
        <div
          className="absolute w-4 h-4 bg-red-500 rounded-full"
          style={{
            bottom: `${position.y * scale}px`,
            left: `${position.x * scale}px`,
          }}
        />
        {trajectory.map((point, index) => (
          <div
            key={index}
            className="absolute w-1 h-1 bg-gray-500 rounded-full"
            style={{
              bottom: `${point.y * scale}px`,
              left: `${point.x * scale}px`,
            }}
          />
        ))}
        <div className="absolute bottom-0 left-0">
          <ArrowUp className="text-green-500" size={24} />
          <ArrowRight className="text-blue-500" size={24} />
        </div>
      </div>
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded mb-4"
        onClick={handleStart}
      >
        Launch
      </button>
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-bold">Max Height</h3>
          <p>{maxHeight.toFixed(2)} m</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-bold">Total Range</h3>
          <p>{totalRange.toFixed(2)} m</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-bold">Flight Time</h3>
          <p>{flightTime.toFixed(2)} s</p>
        </div>
      </div>
      <LineChart width={600} height={300} data={trajectory}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="x"
          label={{ value: "Distance (m)", position: "bottom" }}
        />
        <YAxis label={{ value: "Height (m)", angle: -90, position: "left" }} />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="y" stroke="#8884d8" name="Height" />
      </LineChart>
    </div>
  );
}
