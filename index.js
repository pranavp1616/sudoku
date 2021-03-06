class Board {
    constructor() {
        this.ROWS = 9;
        this.COLS = 9;
        this.matrix = new Array(this.ROWS);
        for(var i=0;i<this.ROWS;i++) 
            this.matrix[i] = new Array(this.COLS);
        
        // init 
        this.resetBoard();
        this.renderHTMLGrid();
    }
    resetBoard(){
        for(var i=0; i<this.ROWS; i++)
            for(var j=0; j<this.COLS; j++)
                this.matrix[i][j] = 0;
    }
  
    getHTMLGrid(){  //  html grid to matrix
        for(var i=0; i<this.ROWS; i++){
            for(var j=0; j<this.COLS; j++){
                var num =  document.getElementById(i+"-"+j).value;
                num = parseInt(num);
                if(1 <=num && num <=9)
                    this.matrix[i][j] = num;
                else 
                    this.matrix[i][j] = 0;
            }
        }
    }

    renderHTMLGrid() {  //  matrix to html grid
        var num;
        var grid = "<div>";
        for(var i=0; i<this.ROWS; i++){
            for(var j=0; j<this.COLS; j++){
                grid += "<input id=" +i+"-"+j+ " class='sudokuBox' ";
                num = this.matrix[i][j];
                if(num!=0)  grid += " value="+num+" ";
                else        grid += " value='' ";
                grid += "></input>";
            }
            grid += "<br>";
        }
        grid += "</div>";
        document.getElementById('htmlGrid').innerHTML = grid;
    }

}

let boardObject = new Board();


/* 
        html DOM actions (button and click)
*/

function solveBtnAction(){
    boardObject.getHTMLGrid();
    // solve logic
    boardObject.renderHTMLGrid();
}
function randomizeBtnAction(){
    alert('Todo');
}
function resetBtnAction(){
    boardObject.resetBoard();
    boardObject.renderHTMLGrid();
}