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
  background: url(/minesweeper.png) no-repeat 77% 50%;
`

const NearOneCell = styled(OpenCell)`
  background: url(/minesweeper.png) no-repeat 0% 50%;
`

const NearTwoCell = styled(OpenCell)`
  background: url(/minesweeper.png) no-repeat 8% 50%;
`

const NearThreeCell = styled(OpenCell)`
  background: url(/minesweeper.png) no-repeat 16% 50%;
`

const NearFourCell = styled(OpenCell)`
  background: url(/minesweeper.png) no-repeat 23% 50%;
`

const NearFiveCell = styled(OpenCell)`
  background: url(/minesweeper.png) no-repeat 31% 50%;
`

const NearSixCell = styled(OpenCell)`
  background: url(/minesweeper.png) no-repeat 38.5% 50%;
`

const NearSevenCell = styled(OpenCell)`
  background: url(/minesweeper.png) no-repeat 46% 50%;
`

const NearEightCell = styled(OpenCell)`
  background: url(/minesweeper.png) no-repeat 54% 50%;
`

const QuesttionCell = styled(OpenCell)`
  background: url(/minesweeper.png) no-repeat 62% 50%;
`

// セルの情報を定義
interface Cellinfo {
  IsOpened: boolean
  HasBomb: boolean
  HasFlag: boolean
  NearBombCount: number
}

const checkcelltype = (props: Cellinfo) => {
  if (props.IsOpened === true) {
    //開かれているかつ爆弾がある場合
    if (props.HasBomb === true) {
      return <BombCell />
    }
    //開かれているかつ爆弾がない場合
    else {
      switch (props.NearBombCount) {
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
        default:
          return <CloseCell />
      }
    }
  } else {
    //開かれていないかつ旗がある場合
    if (props.HasFlag === true) {
      return <FlagCell />
    }
    //開かれていないかつ旗がない場合
    else {
      return <CloseCell />
    }
  }
}
export const Cell = (props: Cellinfo) => {
  return checkcelltype(props)
}
