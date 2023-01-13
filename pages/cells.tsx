import React from 'react'
import styled from 'styled-components'
import type { BoardState, CellType } from './board'

// TODO 立体感を出す
export const CloseCell = styled.button`
  width: 30px;
  height: 30px;
  background-color: silver;
  border: 1px solid black;
`
// TODO レイアウトを元ネタに寄せる
export const OpenCell = styled(CloseCell)`
  background-color: gray;
  border: 1px solid black;
`

export const FlagCell = styled(CloseCell)`
  background: url(/minesweeper.png) no-repeat 69% 50%;
`

export const MineCell = styled(CloseCell)`
  background: url(/minesweeper.png) no-repeat 77% 50%;
`

export const NearOneCell = styled(OpenCell)`
  background: url(/minesweeper.png) no-repeat 0% 50%;
`

export const NearTwoCell = styled(OpenCell)`
  background: url(/minesweeper.png) no-repeat 8% 50%;
`

export const NearThreeCell = styled(OpenCell)`
  background: url(/minesweeper.png) no-repeat 16% 50%;
`

export const NearFourCell = styled(OpenCell)`
  background: url(/minesweeper.png) no-repeat 23% 50%;
`

export const NearFiveCell = styled(OpenCell)`
  background: url(/minesweeper.png) no-repeat 31% 50%;
`

export const NearSixCell = styled(OpenCell)`
  background: url(/minesweeper.png) no-repeat 38.5% 50%;
`

export const NearSevenCell = styled(OpenCell)`
  background: url(/minesweeper.png) no-repeat 46% 50%;
`

export const NearEightCell = styled(OpenCell)`
  background: url(/minesweeper.png) no-repeat 54% 50%;
`

export const QuesttionCell = styled(OpenCell)`
  background: url(/minesweeper.png) no-repeat 62% 50%;
`

// セルの情報を定義
export interface Cellinfo {
  Celltype: number
  Boardstate: number
}

export const Cell = (props: Cellinfo) => {
  //閉じているセルはCloseCellorFlagCellを表示
  if (props.Celltype === 0) {
    if (props.Boardstate === 10) {
      return <FlagCell />
    }
  }
  if (props.Celltype === 1) {
    switch (props.Boardstate) {
      case 0:
        return <OpenCell />
      case 1:
        return <NearOneCell />
      case 2:
        return <NearTwoCell />
      case 3:
        return <NearThreeCell />
      case 4:
        return <NearFourCell />
      case 5:
        return <NearFiveCell />
      case 6:
        return <NearSixCell />
      case 7:
        return <NearSevenCell />
      case 8:
        return <NearEightCell />
    }
  }
  return <CloseCell />
}
