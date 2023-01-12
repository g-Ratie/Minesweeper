import React from 'react'
import styled from 'styled-components'

// export const CellsType = {
//     None: 0,
//     nearone: 1,
//     neartwo: 2,
//     nearthree: 3,
//     bomb: 9
// }
// type CellsType = typeof CellsType[keyof typeof CellsType]

//TODO 変数名の変更およびenum型直す
enum CellType {
  None = 0,
  nearone = 1,
  neartwo = 2,
  nearthree = 3,
  nearfour = 4,
  nearfive = 5,
  nearsix = 6,
  nearseven = 7,
  neareight = 8,
  nearnine = 9,
  bomb = 10,
  flag = 11,
  Opened = 12,
}

// TODO 立体感を出す
const CloseCell = styled.button`
  width: 30px;
  height: 30px;
  background-color: silver;
  border: 1px solid black;
`
// TODO レイアウトを元ネタに寄せる
const OpenCell = styled(CloseCell)`
  background-color: gray;
  border: 1px solid black;
`

const FlagCell = styled(CloseCell)`
  background: url(/minesweeper.png) no-repeat 69% 50%;
`

const BombCell = styled(CloseCell)`
  background: url(/minesweeper.png) no-repeat 16% 50%;
`
// セルの情報を定義
interface Cellinfo {
  CellType: CellType
}

export const Cell = (props: Cellinfo) => {
  return (
    <div>
      {props.CellType === CellType.None && <CloseCell />}
      {props.CellType === CellType.bomb && <BombCell />}
      {props.CellType === CellType.flag && <FlagCell />}
    </div>
  )
}
