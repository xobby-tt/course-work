function Robot() {
    //this._colors = ['white', 'palegreen', 'darkgrey'];
   
    var x = 0;
    var y = 0;
    var marks = 0; 
    var direction = 0;

    this.getX = function() {
        return x;
    }

    this.getY = function() {
        return y;
    }

    this.setX = function(positionX) {
        x = positionX;
    }

    this.setY = function(positionY) {
        y = positionY;
    }

    this.setMark = function() {
        if (marks) {
            marks--;
            return true;
        }

        return false;
    }

    this.getMark = function() {
        marks++;
    }

    this.getMarks = function() {
        return marks;
    }

    this.getDirection = function() {
        return direction;
    }
    
    this.setDirection = function(newDir) {
        direction = newDir;
    }

    this.getParameters = function() {
        return [direction, x, y, marks];
    }
}

function Memory() {
    var RAM = [];
    var instructionNumber = -1;

    this.fill = function(instructions) {
        for(var i = 0; i < instructions.length; i++) {
            RAM[i] = parseInt(instructions[i]);
        }
    }

    this.getInstructions = function() {
        return RAM;
    }

    this.getInstructionNumber = function() {
        return instructionNumber;
    }

    this.setInstructionNumber = function(num) {
        instructionNumber = num;
    }
}

function Map() {
    var field = [
        [0, 0, 0, 0, 0],
        [1, 0, 2, 0, 0],
        [1, 0, 0, 2, 0],
        [0, 2, 0, 0, 0],
        [1, 1, 0, 1, 1]
    ];

    this.getWidth = function() {
        return field[0].length;
    }

    this.get = function(x, y) {
        return field[x][y];
    }

    this.set = function(x, y, value) {
        field[x][y] = value;
    }
}

var TIMEOUT;
var robot, map, memory;

reset();

function draw() {
    var container = document.getElementById('cse-container'); // _div
    container.innerHTML = null;
    this.CELL_WIDTH = 60;
    
    var directionSymbols = ['▶', '▼', '◀', '▲'];
    var robotDirection = directionSymbols[robot.getDirection()];

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
    

    for (var i = 1; i <= map.getWidth(); i++) {
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

    for (i = 1; i <= map.getWidth(); i++) {

        numDiv = document.createElement("div");
        numDiv.classList.add("num-cell-y");
        numDiv.innerHTML = i;

        yNum.appendChild(numDiv);
    }


    table.appendChild(yNum);

    var fieldContainer = document.createElement("div");
    fieldContainer.classList.add("content");


    for (i = 0; i < map.getWidth(); i++) {

        var fieldLine = document.createElement("div");

        for(var j = 0;  j < map.getWidth(); j++) {
            var div = document.createElement("div");
            div.classList.add("cell");
            
            switch(map.get(i, j)) {
                case 1: {
                    div.style.background = "green";
                    break;
                }
                case 2: {
                    div.style.background = "lightgrey";
                    break;
                }
            }

            if(i == robot.getY() && j == robot.getX()) {
                div.textContent = robotDirection;
            }

            fieldLine.appendChild(div)
        }

        fieldContainer.appendChild(fieldLine);

    }

    table.appendChild(fieldContainer);

    var stateTable = document.createElement("table");
    stateTable.classList.add("stateTable");
    var bodyStateTable = document.createElement("tbody");
    var arrStateTable = ["DIRECTION", "X", "Y", "MARKS"];
    
    for(var i = 0; i < arrStateTable.length; i++) {
        var tr = document.createElement("tr");
        var tdTitle = document.createElement("td");
        var tdValue = document.createElement("td");
    
        tdTitle.innerHTML = arrStateTable[i] + ": ";  
        tdValue.innerHTML = robot.getParameters()[i];  
        tr.appendChild(tdTitle);
        tr.appendChild(tdValue);
        bodyStateTable.appendChild(tr);
    }
    stateTable.appendChild(bodyStateTable);

    container.appendChild(table);
    container.appendChild(stateTable);

    if (memory.getInstructions().length) {
        container.appendChild(drawTableRAM());
    }
}

function drawTableRAM() { // ============  to do (table borders)
    var tableRAM = document.createElement("table");
    tableRAM.classList.add("tableRAM");
    var headerTr = document.createElement("tr");
    var headerTd = document.createElement("td"); 
    headerTd.setAttribute("colspan", 2); 
    headerTd.textContent = "RAM:";
    headerTr.appendChild(headerTd);  
    tableRAM.appendChild(headerTr);

    for (var i = 0; i < memory.getInstructions().length; i++) {

        var instructionRow = document.createElement("tr");
        instructionRow.classList.add("body-row");
        var instructionIndex = document.createElement("td");
        var instruction = document.createElement("td");
        
        instructionIndex.textContent = i;

        if (i == memory.getInstructionNumber()) {
            instruction.classList.add("active");
        }

        instruction.textContent = memory.getInstructions()[i];

        instructionRow.appendChild(instructionIndex);
        instructionRow.appendChild(instruction);
        tableRAM.appendChild(instructionRow);
    }
    return tableRAM;
}

function reset() {
    robot = new Robot();
    map = new Map();
    memory = new Memory();

    draw();
    changeButtonState([0,1,1,1]);
}

function loadProgram() {
    var instructions = document.getElementById('program-container').value.split(/\s+/);
    memory.fill(instructions);
    
    draw();
    changeButtonState([0,0,0,0]);   
}

function changeButtonState(states) {
    document.getElementById('loadButton').disabled = !!states[0];
    document.getElementById('slowButton').disabled = !!states[1];
    document.getElementById('quickButton').disabled = !!states[2];
    document.getElementById('resetButton').disabled = !!states[3];
}


function readInstruction() {
    memory.setInstructionNumber(memory.getInstructionNumber() + 1);
    if(memory.getInstructionNumber() < memory.getInstructions().length) {
        draw();
        return true;
    } else {
        memory.setInstructionNumber(-1);
    }
    return false;
}

function runSlow() {
    TIMEOUT = 1000;
    //document.getElementById('cse').scrollIntoView();
    changeButtonState([1,1,1,1]);
    readInstructionCalling();
}
function runQuick() {
    document.getElementById('cse').scrollIntoView();
    while(readInstruction()) {
        if(!execInstruction()) {
            break;
        }
    }
    endProgram();
}
function readInstructionCalling() {
    if(readInstruction()) {
        setTimeout(execInstructionCalling, TIMEOUT);
    } else {
        endProgram();
    }
}
function execInstructionCalling() {
    if(execInstruction()) {
        setTimeout(readInstructionCalling, TIMEOUT);
    } else {
        endProgram();
    }
}
function execInstruction() {
    if (instructionsHandlers.hasOwnProperty(memory.getInstructions()[memory.getInstructionNumber()])) {
        instructionsHandlers[memory.getInstructions()[memory.getInstructionNumber()]]();
        return true;
    }

    draw();
}
function endProgram() {
    changeButtonState([1,1,1,0]);
}

var instructionsHandlers =  {
    1: function() {
        if(robot.getDirection() > 0) {
            robot.setDirection(robot.getDirection() - 1);
        } else {
            robot.setDirection(3);
        }
    },

    2: function() {
        if(robot.getDirection() < 3) {
            robot.setDirection(robot.getDirection() + 1);
        } else {
            robot.setDirection(0);
        }
    },

    3: function() {
        var newX = robot.getX();
        var newY = robot.getY();
        
        switch (robot.getDirection()) {
            case 0: newX++; break;
            case 1: newY++; break;
            case 2: newX--; break;
            case 3: newY--; break;
        }

        if (newX >= 0 && newX < 5 && newY >= 0 && newY < 5 && map.get(newY, newX) != 2) {
            robot.setX(newX);
            robot.setY(newY);
        }
    },

    4: function() {
        if (map.get(newY, newX) == 0 && robot.getMarks() > 0) {
            map.set(map.get(robot.getY(), robot.getX()) + 1);
            robot.setMark();
        }
    },

    5: function() {
        if (map.get(robot.getY(), robot.getX()) == 1) {
            map.set(map.get(robot.getY(), robot.getX()) - 1);
            robot.getMark();
        }
    }
}
