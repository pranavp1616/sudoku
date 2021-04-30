class Board {
    constructor() {
        this.ROWS = 9;
        this.COLS = 9;
        this.matrix = new Array(this.ROWS);
        for(var i=0;i<this.ROWS;i++) 
            this.matrix[i] = new Array(this.COLS);
        this.resetBoard();                  // init 
        this.renderHTMLGrid();
    }

    resetBoard(){
        for(var i=0; i<this.ROWS; i++)
            for(var j=0; j<this.COLS; j++)
                this.matrix[i][j] = 0;
    }
  
    getHTMLGrid(){                          //  html grid to matrix
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

    renderHTMLGrid() {                      //  matrix to html grid
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


    /* Valid Check algorithm */
    isValid(){ 
        return ( this.isAllRowsValid() && 
                 this.isAllColsValid() &&
                 this.isAllBoxValid()   );
    }

    isAllRowsValid(){
        var mp = new Array(this.ROWS+1);            // 10 elements including 0..9
        for(var j=0; j<mp.length; j++)  mp[j] = 0;  // init mp
        for(var i=0; i<this.ROWS; i++){
            for(var j=0; j<this.COLS; j++)  mp[ this.matrix[i][j] ] += 1;    // map current (ith) row 
            for(var j=1; j<mp.length; j++)  if(mp[j]>1) return false;       // check duplicates in mp (except 0) 
            for(var j=0; j<mp.length; j++)  mp[j] = 0;                      // reset mp
        }
        return true;
    }

    isAllColsValid(){
        var mp = new Array(this.COLS+1);            // 10 elements including 0..9
        for(var i=0; i<mp.length; i++)  mp[i] = 0;  // init mp
        for(var j=0; j<this.COLS; j++){
            for(var i=0; i<this.ROWS; i++)  mp[ this.matrix[i][j] ] += 1;    // map current (ith) col 
            for(var i=1; i<mp.length; i++)  if(mp[i]>1) return false;       // check duplicates in mp (except 0) 
            for(var i=0; i<mp.length; i++)  mp[i] = 0;                      // reset mp
        }
        return true;
    }

    isAllBoxValid(){
        var mp = new Array(this.ROWS+1);            // 10 elements including 0..9
        for(var i=0; i<mp.length; i++)  mp[i] = 0;  // init mp
        for(var box_row_start=0; box_row_start<3; box_row_start++){
            for(var box_col_start=0; box_col_start<3; box_col_start++){
                for(var i=0; i<3; i++)
                    for(var j=0; j<3; j++)
                        mp[ this.matrix[box_row_start*3 + i][box_col_start*3 + j] ] += 1;   // add to map
                for(var i=1; i<mp.length; i++)  if(mp[i]>1) return false;       // check duplicates in mp (except 0) 
                for(var i=0; i<mp.length; i++)  mp[i] = 0;                      // reset mp
            }
        }
        return true;
    }
    /* END of Valid check algorithm */

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
    if( boardObject.isValid() == true)
        boardObject.solveSudoku();
    else
        alert('NOT a valid Sudoku !!!');
    boardObject.renderHTMLGrid();
}

function resetBtnAction(){
    boardObject.resetBoard();
    boardObject.renderHTMLGrid();
}

function randomizeBtnAction() {
    alert("todo");
}