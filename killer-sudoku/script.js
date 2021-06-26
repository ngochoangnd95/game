const STATUS = {
  OPEN: 1,
  CLOSE: 2,
  EXPECTED: 3,
}
const SIZE = {
  WIDTH: 450,
  HEIGHT: 450,
}


class Cell {
  x;
  y;
  value = 0;
  predictedValues = [];
  status = STATUS.CLOSE;
  isHighlighted = false;

  constructor(x, y, value) {
    this.x = x;
    this.y = y;
    this.value = value;
  }

  render() {
    const cellElement = document.createElement('td');
    cellElement.classList.add('board__cell');
    cellElement.innerText = this.value;
    return cellElement;
  }
}


class Board {
  matrix = [];
  templateArray = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  constructor() {
    for (let i = 0; i < 9; i++) {
      const row = this.shuffle(this.templateArray);
      this.matrix.push(row);
    }
  }

  shuffle(array) {
    const shallowCopiedArray = [...array];
    return shallowCopiedArray.sort(() => Math.random() - 0.5);
  }

  render() {
    const boardNode = document.createElement('table');
    boardNode.classList.add('board');
    for (let i = 0; i < 9; i++) {
      const rowNode = document.createElement('tr');
      rowNode.classList.add('board__row');
      for (let j = 0; j < 9; j++) {
        const cell = new Cell(i, j, this.matrix[i][j]);
        rowNode.appendChild(cell.render());
      }
      boardNode.appendChild(rowNode);
    }
    return boardNode;
  }

  renderMask(width, height) {
    const svgElement = document.createElement('svg');
    svgElement.classList.add('board__mask');
    svgElement.setAttribute('width', width);
    svgElement.setAttribute('height', height);
    return svgElement;
  }
}


function main() {
  board = new Board();
  const boardContainer = document.getElementById('board-container');
  boardContainer.style.width = `${SIZE.WIDTH}px`;
  boardContainer.style.height = `${SIZE.HEIGHT}px`;
  const boardNode = board.render();
  const boardMask = board.renderMask(SIZE.WIDTH, SIZE.HEIGHT);
  boardContainer.appendChild(boardNode);
  boardContainer.appendChild(boardMask);
}

main();