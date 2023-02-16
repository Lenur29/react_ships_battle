import { Cell } from "../../types/Cell";

// creates a 10x10 grid
const getField = (fieldSize: number) => {
  const newField = [];
  for (let i = 0; i < fieldSize; i++) {
    const cells = [];

    for (let j = 0; j < fieldSize; j++) {
      cells.push({ x: i, y: j, isShip: false });
    }

    newField.push(cells);
  }

  return newField;
};

// returns a random integer
const getRandomInt = (max: number) => {
  return Math.floor(Math.random() * max);
};

// returns a new direction for a ship, based on current direction
const getNewDirection = (currentDirection: string) => {
  if (currentDirection === 'horizontal') {
    return 'vertical';
  }

  return 'horizontal';
};

// returns a set of valid positions for a ship of a given length(amount of decks, means 1 deck - 1 cell) and direction
const getValidPositions = (shipLength: number, direction: string, field: Cell[][]): { row: number, col: number}[] => {
  const positions = [];
  let row = getRandomInt(10);
  let col = getRandomInt(10);

  for (let i = 0; i < shipLength; i++) {
    if (row >= 10 || col >= 10 || field[row]?.[col]?.isShip || field[row + 1]?.[col]?.isShip || field[row - 1]?.[col]?.isShip || field[row]?.[col + 1]?.isShip || field[row]?.[col - 1]?.isShip || field[row + 1]?.[col - 1]?.isShip || field[row - 1]?.[col + 1]?.isShip || field[row + 1]?.[col + 1]?.isShip || field[row - 1]?.[col - 1]?.isShip) {
      return getValidPositions(shipLength, direction, field);
    }
    positions.push({ row, col });
    if (direction === 'horizontal') {
      col++;
    } else {
      row++;
    }
  }

  return positions;
};

// places all the ships on the grid
const placeShips = (field: Cell[][], shipLengths: number[]) => {
  let direction = 'horizontal';
  shipLengths.forEach((shipLength) => {
    const positions = getValidPositions(shipLength, direction, field);
    positions.forEach((pos: { row: number, col: number }) => {
      field[pos.row][pos.col].isShip = true;
    });
    direction = getNewDirection(direction);
  });

  return field;
};

export {
  getField,
  getValidPositions,
  placeShips,
};
