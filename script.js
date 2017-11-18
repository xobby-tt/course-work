function Robot() {
    this._colors = ['white', 'palegreen', 'darkgrey'];
    this.FIELD = [
        [0, 0, 0, 0, 0],
        [1, 0, 2, 0, 0],
        [1, 0, 0, 2, 0],
        [0, 2, 0, 0, 0],
        [1, 1, 0, 1, 1]
    ];
    this.DIRECTION = 0;
    this.X = 0;
    this.Y = 0;
    this.COUNTER = 0;
    this.RAM = [];
    this.IP = -1;
    this._div = document.getElementById('cse-container');
    this.CELL_WIDTH = 60;

    this.draw = function() {
        var r;
        switch(this.DIRECTION) {
            case 0: r = '▶'; break;
            case 1: r = '▼'; break;
            case 2: r = '◀'; break;
            case 3: r = '▲'; break;
        }

        var table = document.createElement("div");
        table.classList.add("main-table");

        var topDiv = document.createElement("div");
        topDiv.classList.add("topDiv");


        var xDiv = document.createElement("div");
        xDiv.classList.add("header-line-X");
        xDiv.innerHTML = "X";

        topDiv.appendChild(xDiv);

        var xNum = document.createElement("div");
        xNum.classList.add("header-line-X");
        

        for (var i = 1; i <= this.FIELD[0].length; i++) {
            var numDiv = document.createElement("div");
            numDiv.classList.add("num-cell-x");
            numDiv.innerHTML = i;
            
            xNum.appendChild(numDiv);
        }

        topDiv.appendChild(xNum);
        table.appendChild(topDiv);

        
        var yDiv = document.createElement("div");
        yDiv.classList.add("header-line-Y");
        yDiv.innerHTML = "Y";

        table.appendChild(yDiv);

        var yNum = document.createElement("div");
        yNum.classList.add("header-line-Y");

        for (i = 1; i <= this.FIELD[0].length; i++) {

            numDiv = document.createElement("div");
            numDiv.classList.add("num-cell-y");
            numDiv.innerHTML = i;

            yNum.appendChild(numDiv);
        }


        table.appendChild(yNum);

        var fieldContainer = document.createElement("div");
        fieldContainer.classList.add("content");


        for (i = 0; i < this.FIELD[0].length; i++) {

            var fieldLine = document.createElement("div");

            for(var j = 0;  j < this.FIELD[0].length; j++) {
                var div = document.createElement("div");
                div.classList.add("cell");
                
                switch(this.FIELD[i][j]) {
                    case 1: {
                        div.style.background = "green";
                        break;
                    }
                    case 2: {
                        div.style.background = "lightgrey";
                        break;
                    }
                }
                fieldLine.appendChild(div)
            }

            fieldContainer.appendChild(fieldLine);
    
        }

        table.appendChild(fieldContainer);

        var stateTable = document.createElement("table");
        stateTable.classList.add("stateTable");
        var bodyStateTable = document.createElement("tbody");
        var arrStateTable = ["DIRECTION", "X", "Y", "COUNTER"];
        
        for(var i = 0; i < arrStateTable.length; i++) {
            var tr = document.createElement("tr");
            var tdTitle = document.createElement("td"); //==============  css
            var tdValue = document.createElement("td");
        
            tdTitle.innerHTML = arrStateTable[i];  
            tdValue.innerHTML = this[arrStateTable[i]];  
            tr.appendChild(tdTitle);
            tr.appendChild(tdValue);
            bodyStateTable.appendChild(tr);
        }
        stateTable.appendChild(bodyStateTable);

        this._div.appendChild(table);
        this._div.appendChild(stateTable);
    }
}


var TIMEOUT;
var R;

reset();

function reset() {
    R = new Robot();
    R.draw();
}