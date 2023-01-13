import type { NextPage } from 'next'
import React, { useEffect } from 'react'
import styled from 'styled-components'
import { Cell } from './cells'

//ボム数、マスの状態を管理する
export const boardState = {
  None: 0,
  Near1: 1,
  Near2: 2,
  Near3: 3,
  Near4: 4,
  Near5: 5,
  Near6: 6,
  Near7: 7,
  Near8: 8,
  Mine: 9,
  Flag: 10,
} as const
export type BoardState = typeof boardState[keyof typeof boardState]

//表示、非表示を管理する
export const CellType = {
  Close: 0,
  Open: 1,
} as const
export type CellType = typeof CellType[keyof typeof CellType]

const Container = styled.div`
  display: grid;
  width: 420px;
  height: 420px;
  grid-template-columns: repeat(16, 1fr);
  grid-template-rows: repeat(16, 1fr);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  position: absolute;
  background: rgb(18, 255, 39);
`

const Grid = styled.div`
  width: 30px;
  height: 30px;
  border: 1px solid black;
  background-color: gray;
`

// マインスイーパーの初期配列
const InitialBoardData = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
]

//爆弾の数を数えた配列を返す関数
const countBomb = (board: number[][]) => {
  const countBoard = board.map((row: number[], i: number) => {
    return row.map((cell: number, j: number) => {
      //爆弾の数を数える
      let count = 0
      //もし爆弾があったらそのままの値にしておく
      if (board[i][j] === boardState.Mine) {
        return boardState.Mine
      }
      //上
      if (board[i - 1] && board[i - 1][j] === boardState.Mine) {
        count++
      }
      //下
      if (board[i + 1] && board[i + 1][j] === boardState.Mine) {
        count++
      }
      //左
      if (board[i][j - 1] === boardState.Mine) {
        count++
      }
      //右
      if (board[i][j + 1] === boardState.Mine) {
        count++
      }
      //左上
      if (board[i - 1] && board[i - 1][j - 1] === boardState.Mine) {
        count++
      }
      //右上
      if (board[i - 1] && board[i - 1][j + 1] === boardState.Mine) {
        count++
      }
      //左下
      if (board[i + 1] && board[i + 1][j - 1] === boardState.Mine) {
        count++
      }
      //右下
      if (board[i + 1] && board[i + 1][j + 1] === boardState.Mine) {
        count++
      }
      return count
    })
  })
  return countBoard
}

//初期化関数
const initBoard = (board: number[][]) => {
  //爆弾の数
  const bombCount = 8
  //爆弾の配置
  for (let i = 0; i < bombCount; i++) {
    const x = Math.floor(Math.random() * 16)
    const y = Math.floor(Math.random() * 16)
    //CellのHasBombをtrueにする(配列上の値を9にする)
    board[x][y] = boardState.Mine
  }
  return board
}

export const Board: NextPage = () => {
  const [board, setBoard] = React.useState(InitialBoardData)
  useEffect(() => {
    const Bombboard: number[][] = initBoard(board)
    setBoard(Bombboard)
    console.log(Bombboard)
    //近くの爆弾の数を数える
    console.log(countBomb(Bombboard))
    setBoard(countBomb(Bombboard))
  }, [])
  return (
    <Container>
      {board.map((row: number[], i: number) => {
        return row.map((cell: number, j: number) => {
          return (
            <Grid key={`${i}-${j}`}>
              <Cell
                Celltype={0}
                Boardstate={board[i][j]}
              />
            </Grid>
          )
        })
      })}
    </Container>
  )
}
