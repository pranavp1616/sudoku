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

        this.row = 0;
        this.col = 0; // global variables for solving (for recursion) 
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

    // solve algorithm
    solveSudoku(){
        if(!this.findUnassignedLocation()) 
            return true; // Sudoku is already solved
        for(var num=1; num<=9; num++){
            if(this.isSafe(num, this.row,this.col)){
                this.matrix[this.row][this.col] = num;
                if(this.solveSudoku() )
                    return true;
                this.matrix[this.row][this.col] = 0; // couldnot assign num, so reset backto 0
            }
        }
        return false; 
    }

    findUnassignedLocation(){
        console.log(this.row + " " + this.col);
        for(this.row=0; this.row<9; this.row++)
            for(this.col=0; this.col<9;this.col++)
                if(this.matrix[this.row][this.col]==0){
                    return true;
                }
        return false;
    }


    isSafe(num) {
        return          !this.UsedInRow(num)
                    && !this.UsedInCol(num)
                    && !this.UsedInBox(this.row-this.row%3,  this.col-this.col%3,  num)
                    && this.matrix[this.row][this.col] == 0;
    }

    UsedInRow(num){
        for(var col=0; col<9; col++)
            if(this.matrix[this.row][col] == num)
                return true;
        return false;
    }
    
    UsedInCol(num){
        for(var row=0; row<9; row++)
            if (this.matrix[row][this.col] == num)
                return true;
        return false;
    }    
    
    UsedInBox(boxStartRow,boxStartCol,num){
        for(var row = 0; row < 3; row++)
            for(var col = 0; col < 3; col++)
                if (this.matrix[row + boxStartRow][col + boxStartCol] == num)
                    return true;
        return false;
    }
    // end of solve algorithm

}

let boardObject = new Board();


/* 
        html DOM actions (button and click)
*/

function solveBtnAction(){
    boardObject.getHTMLGrid();
    var ret = boardObject.solveSudoku();
    console.log("Final result " + ret);
    boardObject.renderHTMLGrid();
}

function resetBtnAction(){
    boardObject.resetBoard();
    boardObject.renderHTMLGrid();
}