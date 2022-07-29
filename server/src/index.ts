import * as http from "http";
import {getOpponentMoveBoard} from "./algorithm"
import {checkWinner} from "./algorithm"


const hostname = '127.0.0.1';
const port = 3333;

const server = http.createServer((request, response) =>  {
  
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST',
    'Content-Type': 'text/plain'
  };


  if(request.method == 'POST') {

    request.on('data', (data) => {
      let resData: string = ''
      const board: string = JSON.parse(data).board
      const newBoard: string = getOpponentMoveBoard(board);

      resData = JSON.stringify({board: newBoard, winner: ''})

      let result = checkWinner(newBoard);

      if (result != null) {
        resData = JSON.stringify({board: newBoard, winner: result})
      }

      setTimeout(() => {
        response.writeHead(200, "OK", headers);
        response.write(resData)
        response.end();
      }, 500)

    });


  } else {
      response.writeHead(200, "OK", headers);
      response.end("localhost:3333/GET/");
  }

});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});