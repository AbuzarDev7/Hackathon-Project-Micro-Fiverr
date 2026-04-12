import { io } from 'socket.io-client';

const isDevelopment = window.location.hostname === 'localhost';
const BACKEND_URL = isDevelopment 
  ? 'http://localhost:5000' 
  : 'https://hackathon-project-micro-fiverr-backend.onrender.app'; // Replace with your actual Render URL

const socket = io(isDevelopment ? undefined : BACKEND_URL, {
  autoConnect: true,
});

export default socket;
