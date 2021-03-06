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

                if((j+1)%3==0)
                    grid += "&nbsp &nbsp &nbsp";

            }
            grid += "<br/>";
            if((i+1)%3==0)
                grid += "<br/>";
        }


        grid += "</div>";
        document.getElementById('htmlGrid').innerHTML = grid;
    }

    /*  ALGORITHM */
    solveSudoku(){
        var emptySpot = this.nextEmptySpot();
        var row = emptySpot[0];
        var col = emptySpot[1];    
        if(row==-1) // there are no more empty spots
            return; // sudoku solved

        for(var num=1; num<=9; num++){
            if(this.checkValue(row,col,num)){
                this.matrix[row][col] = num;
                this.solveSudoku();
            }
        }

        emptySpot = this.nextEmptySpot();
        if(emptySpot[0] != -1)
            this.matrix[row][col] = 0; // we cannot set num, so set it back to 0
        return;
    }
    
    nextEmptySpot(){    // find next spot, to fill
        for(var i=0; i<9; i++)
            for(var j=0; j<9; j++)
                if(this.matrix[i][j]==0)
                    return [i,j];
        return [-1,-1]; // sudoky is already solved
    }

    checkValue(row, col, num) {
        if(this.checkThisRow(row, num) &&
          this.checkThisColumn(col, num) &&
          this.check3x3Box(row, col, num))
                return true;        
        return false; 
    }

    checkThisRow(row,num){
        for(var i=0; i<this.matrix[row].length; i++)
            if(this.matrix[row][i] == num)
                return false;
        return true;
    }    
    
    checkThisColumn(col,num){
        for(var i=0; i<this.matrix.length; i++) 
            if(this.matrix[i][col] == num) 
                return false;
        return true;
    }
    
    check3x3Box(row,col,num){
        var box_row_start = Math.floor(row/3)*3;
        var box_col_start = Math.floor(col/3)*3;        
        for(var i=0; i<3; i++)
            for(var j=0; j<3; j++)
                if(this.matrix[box_row_start + i][box_col_start + j] == num)
                    return false;    
        return true;
    }

    /* END of ALGORITHM */

    isValid(){
        for(var i=0; i<this.ROWS; i++){
            for(var j=0; j<this.COLS; j++){
                //todo
            }
        }
        return true;
    }

    randomizeMatrix(){
        // todo
    }
};
let boardObject = new Board();




/* 
        html DOM actions (button and click)
*/

function solveBtnAction(){
    boardObject.getHTMLGrid();
    
    // first check whether sudoku is valid with given numbers (no repeating numbers in a row or col or box)
    // if( boardObject.isValid() )
        var ret = boardObject.solveSudoku();
    //else
        // alert('sudoku not valid);

    console.log("solved");
    boardObject.renderHTMLGrid();
}

function resetBtnAction(){
    boardObject.resetBoard();
    boardObject.renderHTMLGrid();
}

function randomizeBtnAction() {
    alert("todo");
}