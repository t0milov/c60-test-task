"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const http = __importStar(require("http"));
const algorithm_1 = require("./algorithm");
const algorithm_2 = require("./algorithm");
const hostname = '127.0.0.1';
const port = 3333;
const server = http.createServer((request, response) => {
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST',
        'Content-Type': 'text/plain'
    };
    if (request.method == 'POST') {
        request.on('data', (data) => {
            let resData = '';
            const board = JSON.parse(data).board;
            const newBoard = (0, algorithm_1.getOpponentMoveBoard)(board);
            resData = JSON.stringify({ board: newBoard, winner: '' });
            let result = (0, algorithm_2.checkWinner)(newBoard);
            if (result != null) {
                resData = JSON.stringify({ board: newBoard, winner: result });
            }
            setTimeout(() => {
                response.writeHead(200, "OK", headers);
                response.write(resData);
                response.end();
            }, 500);
        });
    }
    else {
        response.writeHead(200, "OK", headers);
        response.end("localhost:3333/GET/");
    }
});
server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
//# sourceMappingURL=index.js.map