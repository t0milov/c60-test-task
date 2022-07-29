import axios from "axios";

class CanvasGame{

    private canvas!: HTMLCanvasElement;
    private context!: CanvasRenderingContext2D;
    private board: any = [[ '', '', '' ], [ '', '', '' ],[ '', '', '' ]];
    private loading: boolean = false;

    constructor(){
        const canvas = document.getElementById('game') as HTMLCanvasElement;
        canvas.setAttribute("tabindex", "0");
        canvas.width = 400;
        canvas.height = 400;
        const context = canvas.getContext("2d");

        if (context == null) return

        context.strokeStyle= "white"
        this.canvas = canvas;
        this.context = context;

        this.createUserEvents();

        this.render();
  
    }

    private render(): void{
        const canvas = this.canvas
        const ctx = this.context

        ctx.clearRect(0, 0, canvas.width, canvas.height)
        this.drawGrid()
        this.drawBoard(this.board)

        return 
    }

    private drawGrid(): void{

        const canvas = this.canvas
        const ctx = this.context

        if (ctx == null) return

        for(let i = 0; i < 4; i++){
            ctx.beginPath();
            ctx.moveTo( canvas.width * (i/ 3), 0 );
            ctx.lineTo( canvas.width * (i/ 3), canvas.height );
            ctx.stroke();         }

        for(let i = 0; i < 4; i++){
            ctx.beginPath();
            ctx.moveTo( 0, canvas.height * (i/ 3));
            ctx.lineTo( canvas.width, canvas.height * (i/ 3));
            ctx.stroke();         
        }

    }

    private drawZero(cell_x: number, cell_y: number): void{
        const cellWidth = this.canvas.width / 3;
        const cellHeight = this.canvas.height / 3;
        const ctx = this.context

        const x = cellWidth / 2 + cell_x * cellWidth
        const y = cellHeight / 2 + cell_y * cellHeight
        const radius = cellHeight * 2/5

        ctx.beginPath();
        ctx.arc(x, y, radius, 0,Math.PI*2,true);
        ctx.stroke();

    }

    private drawCross(cell_x: number, cell_y: number): void{
        const cellWidth = this.canvas.width / 3;
        const cellHeight = this.canvas.height / 3;
        const ctx = this.context

        const right = cellWidth / 5 + cell_x * cellWidth;
        const left = cellWidth * 4/ 5 + cell_x * cellWidth

        const top = cellHeight / 5 + cell_y * cellHeight;
        const bot = cellHeight * 4/ 5 + cell_y * cellHeight;

        ctx.beginPath();
        ctx.moveTo(left, top);
        ctx.lineTo(right, bot)
        ctx.moveTo(right, top);
        ctx.lineTo(left, bot)
        ctx.stroke();
    }

    private drawBoard(board: any): void{
        for (let i = 0; i < 3; i++ ){
            for (let j = 0; j < 3; j++){
                if(board[i][j] === "X"){
                    this.drawCross(j, i)
                } else if (board[i][j] === "O"){
                    this.drawZero(j, i)
                }
            }
        }
    }

    private getMouseCoverCell(mouseX: number, mouseY:number): number[]{

        const cellWidth = this.canvas.width / 3;
        const cellHeight = this.canvas.height / 3;

        let cell_x: number;
        let cell_y: number;

        cell_x = Math.ceil(mouseX / cellWidth) - 1;
        cell_y = Math.ceil(mouseY / cellHeight) - 1;

        return [cell_x, cell_y]
    }

    private showResult(text: string): void{
        const parent = document.getElementById('parent')
        const child = document.getElementById('child')
        const message = document.getElementById('message')

        if(parent != null && child != null && message != null){
            parent.setAttribute('class', "modal active" )
            child.setAttribute('class', "modal__content active" )
            message.innerText = `${text}`;
            
        }
    }

    private createUserEvents() {
        const canvas = this.canvas;
        canvas.addEventListener("mousedown", this.pressEventHandler);
    }

    private pressEventHandler = (e: MouseEvent) => {
        e.preventDefault()

        if(this.loading){
            return
        }

        const mouseX = (e as MouseEvent).offsetX
        const mouseY = (e as MouseEvent).offsetY

        const [cell_x, cell_y] = this.getMouseCoverCell(mouseX, mouseY)

        if(this.board[cell_y][cell_x] !== ''){
            return
        }

        this.board[cell_y][cell_x] = 'O'
        this.render();

        const body = JSON.stringify({"board": this.board})

        this.loading = true;

        axios.post('http://127.0.0.1:3333/', body)

          .then((response) => response.data)

          .then((data) => {
            this.board = data.board;
            this.loading = false;
            this.render();

            if(data.winner !== ''){
                setTimeout(() => {

                    if(data.winner === 'tie'){
                        this.showResult('Ничья!')
                    }else{
                        this.showResult(`${data.winner} победили!`)
                    }

                    this.board = [[ '', '', '' ], [ '', '', '' ],[ '', '', '' ]];
                    this.render();
                    
                }, 200)
            }
        })

          .catch(function (error) {
            console.log(error);
          });

    }
}

export {CanvasGame}