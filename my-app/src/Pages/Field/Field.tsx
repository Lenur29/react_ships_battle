import React, { useState, useLayoutEffect } from 'react';

import './Field.css';
import { Cell } from '../../types/Cell';
import { TableCell } from './components/TableCell';
import { Button } from '../../components/Button/Button';
import { getField, placeShips } from './services';

const FIELD_SIZE = 10;
const SHIP_LENGTHS = [4, 3, 3, 2, 2, 2, 1, 1, 1, 1];

export const Field = () => {
  const [field, setField] = useState<Cell[][]>([]);
  const [hittedCells, setHittedCells] = useState<number[][]>([]);

  const createFieldWithShips = () => {
    return placeShips(getField(FIELD_SIZE), SHIP_LENGTHS);
  };

  const isCellHitted = (coords: number[]) => {
    const hittedCell = hittedCells.find(cell => (
      cell[0] === coords[0] && cell[1] === coords[1]
    ));

    return !!hittedCell;
  };

  useLayoutEffect(() => {
    setField(createFieldWithShips());
  }, []);

  const renderField = () => {
    return (
      <>
        {field.map((row, i) => (
          <tr key={i} className='field__row'>
            {row.map((cell, j) => {
              const isHitted = isCellHitted([i, j]);
              return (
                <TableCell
                  key={`${i}${j}`}
                  cell={cell}
                  onClick={() => {
                    setHittedCells([...hittedCells, [i, j]])
                  }}
                  isHitted={isHitted}
                />
              )})}
          </tr>
        ))}
      </>
    );
  };

  return (
    <div className='field'>
      <h1>Battleship</h1>
      <table className='field__table'>
        <tbody>
          {renderField()}
        </tbody>
      </table>
      <Button
        buttonText='Reload'
        onClick={() => window.location.reload()}
      />
    </div>
  );
}
