import io from 'socket.io-client';
import React from 'react';
import ReactDOM from 'react-dom';
import { useEffect, useState } from 'react';
import {
  BarChart,
  Bar,
  Line,
  LineChart,
  XAxis,
  YAxis,
  Tooltip
} from 'recharts';

const socket = io('http://localhost:3000', {
  transports: ['websocket', 'polling']
});

const App = ({}) => {
  const [data, setData] = useState([]);
  const [population, setPopulation] = useState([])

  // 1. listen for a cpu event and update the state
  useEffect(() => {
    socket.on('cpu', cpuPercent => {
      setData(currentData => [...currentData, cpuPercent]);
    });

    socket.on('population', data => {
      setPopulation(currentData => [...currentData, data]);
    });
  }, []);

  // 2. render the line chart using the state
  return (
    <div>
      <h1>Real Time CPU Usage</h1>
      <LineChart width={500} height={300} data={population}>
        <XAxis dataKey="name" />
        <YAxis />
        <Line dataKey="population" />
      </LineChart>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
