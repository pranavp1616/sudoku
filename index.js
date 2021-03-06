// grid value types - Change to enum later
const EMPTY  = 0;

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
                this.matrix[i][j] = EMPTY;
    }
  
    getHTMLGrid(){  //  html grid to matrix
        for(var i=0; i<this.ROWS; i++){
            for(var j=0; j<this.COLS; j++){
                var nodeType = document.getElementById(i+"-"+j).className;
                if      (nodeType=="empty")
                    this.matrix[i][j] = EMPTY;
                else if (nodeType=="wall")
                    this.matrix[i][j] = WALL;
            }
        }
    }

    renderHTMLGrid() {  //  matrix to html grid
        var grid = "<table>";
        var nodeType;
        for(var i=0; i<this.ROWS; i++){
            grid += "<tr>";
            for(var j=0; j<this.COLS; j++){
                grid += "<td id=" +i+"-"+j+" class='"; 
                if      (this.matrix[i][j]==EMPTY)
                    nodeType = "empty"; 
                else if (this.matrix[i][j]==WALL)
                    nodeType = "wall";
                grid +=  nodeType;
                grid +=  "' onclick='setPoint(id)'> </td>";
            }
            grid += "</tr>";
        }
        grid += "</table>";
        document.getElementById('htmlGrid').innerHTML = grid;
    }

}

let boardObject = new Board();


/* 
        html DOM actions (button and click)
*/

function resetBtnAction(){
    boardObject.resetBoard();
    boardObject.renderHTMLGrid();
}
