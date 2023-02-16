import React from 'react';

import classnames from 'classnames';

import { Cell } from '../../../../types/Cell';
import './TableCell.css';

interface Props {
  cell: Cell;
  onClick: () => void;
  isHitted: boolean;
}

export const TableCell: React.FC<Props> = ({ cell, onClick, isHitted }) => {
  return (
    <td
      className={classnames('field__cell', { 'field__cell-hit': isHitted && cell.isShip}, { 'field__cell-ship': cell.isShip})}
      onClick={onClick}
    />
  );
};
