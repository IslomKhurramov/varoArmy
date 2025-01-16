// export const serverApi = "https://119.65.247.158:9077/";

const serverProtocol = window.location.protocol; // 'http:' yoki 'https:'
const serverHost = window.location.hostname; // '192.111.111.111'
const serverPort = window.location.port; // '9000'

// Server API uchun URL yaratish
export const serverApi = `${serverProtocol}${serverHost}:${serverPort}`;