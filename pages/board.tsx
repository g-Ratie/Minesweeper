import type { NextPage } from 'next'
import React, { useEffect } from 'react'
import styled from 'styled-components'
import { Cell } from './cells'

const bombCount = 8

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
} as const
export type BoardState = typeof boardState[keyof typeof boardState]

//TODO Ishideenにflagを追加する

//表示、非表示を管理する
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

//for文で回して16*16の配列を作る
const InitialIsHiddenData = () => {
  const isHiddenData: boolean[][] = []
  for (let i = 0; i < 16; i++) {
    const row: boolean[] = []
    for (let j = 0; j < 16; j++) {
      row.push(true)
    }
    isHiddenData.push(row)
  }
  return isHiddenData
}

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
  //爆弾の配置
  for (let i = 0; i < bombCount; i++) {
    const x = Math.floor(Math.random() * 16)
    const y = Math.floor(Math.random() * 16)
    //CellのHasBombをtrueにする(配列上の値を9にする)
    board[x][y] = boardState.Mine
    console.log(i, x, y)
  }
  return board
}

const openAround = (
  board: number[][],
  isHiddenboard: boolean[][],
  i: number,
  j: number
) => {
  const around = [
    [i - 1, j - 1],
    [i - 1, j],
    [i - 1, j + 1],
    [i, j - 1],
    [i, j + 1],
    [i + 1, j - 1],
    [i + 1, j],
    [i + 1, j + 1],
  ]
  const visited: number[][] = [[]]
  around.forEach((pos) => {
    const x = pos[0]
    const y = pos[1]
    //もし配列の範囲内だったら
    if (x >= 0 && x < 16 && y >= 0 && y < 16) {
      //もしHiddenだったら
      if (isHiddenboard[x][y] === true) {
        //もし0だったら
        if (board[x][y] === 0) {
          //もしまだ訪れていなかったら
          if (visited.indexOf(pos) === -1) {
            //訪れたことにする
            visited.push(pos)
            //そのマスを開く
            isHiddenboard[x][y] = false
            //そのマスの周りのマスを開く
            openAround(board, isHiddenboard, x, y)
          }
        } else {
          //もし0じゃなかったら
          //そのマスを開く
          isHiddenboard[x][y] = false
        }
      }
    }
  })
}

//左クリックした時の処理
const leftClick = (
  board: number[][],
  isHiddenboard: boolean[][],
  i: number,
  j: number
) => {
  console.log('leftClick')
  //もしHiddenだったら
  if (isHiddenboard[i][j] === true) {
    //switch文でboardの値によって処理を分ける
    switch (board[i][j]) {
      //もし0だったら
      case 0:
        //周りのマスを開く
        openAround(board, isHiddenboard, i, j)
        break
      //もし1以上だったら
      default:
        //そのマスを開く
        isHiddenboard[i][j] = false
        break
    }
  }
}

// const rightClick = (
//   board: number[][],
//   isHiddenboard: boolean[][],
//   i: number,
//   j: number
// ) => {
//   console.log('rightClick')
//   //もしHiddenだったら
// }

//勝敗判定
const judge = (
  board: number[][],
  isHiddenboard: boolean[][],
  i: number,
  j: number
) => {
  //もしクリックされていないマスが爆弾の数と同じだったら
  if (
    isHiddenboard.flat().filter((cell) => cell === true).length === bombCount
  ) {
    //勝利
    alert('勝利')
  }
  //もし爆弾がクリックされたら
  if (board[i][j] === boardState.Mine) {
    //敗北
    alert('敗北')
  }
}

export const Board: NextPage = () => {
  const [board, setBoard] = React.useState(InitialBoardData)
  const [isHiddenboard, setIsHiddenboard] = React.useState(InitialIsHiddenData)
  useEffect(() => {
    const Bombboard: number[][] = initBoard(board)
    const Countedboard = countBomb(Bombboard)
    setBoard(Countedboard)
  }, [])
  return (
    <Container>
      {board.map((row: number[], i: number) => {
        return row.map((cell: number, j: number) => {
          return (
            <Grid key={`${i}-${j}`}>
              <Cell
                Ishidden={isHiddenboard[i][j]}
                Boardstate={board[i][j]}
                onClick={() => {
                  leftClick(board, isHiddenboard, i, j)
                  judge(board, isHiddenboard, i, j)
                  setIsHiddenboard(isHiddenboard.slice(0, board.length))
                }}
              />
            </Grid>
          )
        })
      })}
    </Container>
  )
}
