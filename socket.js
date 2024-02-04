import { io } from "socket.io-client";
const URL = process.env.server_domain 
export const socket = io(URL);