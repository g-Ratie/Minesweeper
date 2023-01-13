import type { NextPage } from 'next'
import React from 'react'
import styled from 'styled-components'
import { Cell } from 'pages/cells'

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

//初期化関数



export const Board: NextPage = () => {
  const [board, setBoard] = React.useState(InitialBoardData)
  return (
    <Container>
      {board.map((row: number[], i: number) => {
        return row.map((cell: number, j: number) => {
          return (
            <Grid key={`${i}-${j}`}>
              <Cell
                IsOpened={false}
                HasBomb={false}
                HasFlag={false}
                NearBombCount={0}
              />
            </Grid>
          )
        })
      })}
    </Container>
  )
}
