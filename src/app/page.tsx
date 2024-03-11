'use client';
import Image from "next/image";
import { list } from "postcss";
import React, { useState } from 'react';

function ChangeButton() {
  const changeText = () => {
    document.getElementById("chessWord")!.innerHTML = "CheckMate";
  };
  return (<button onClick={changeText}>Change to Checkmate</button>);
}

interface singlePiece {
  name: string;
  moves: number[];
  url: string;
}
function logPiece(name: string, moves: number[]) {
  console.log(name);
  let move = 0;
  for (move of moves) {
    console.log("we can move to " + (move))
  }
}




let pawn: singlePiece = { name: "Pawn", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Chess_plt45.svg/1920px-Chess_plt45.svg.png", moves: [8, 16] };
let bpawn: singlePiece = { name: "Pawn", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Chess_pdt45.svg/1920px-Chess_pdt45.svg.png", moves: [-8, -16] };
let king: singlePiece = { name: "King", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Chess_klt45.svg/1920px-Chess_klt45.svg.png", moves: [7, 8, 9, 1, -1, -7 - 8, -9] };
let bking: singlePiece = { name: "King", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/Chess_kdt45.svg/1920px-Chess_kdt45.svg.png", moves: [-8, -7, -6, -5, -4, -3, -2, -1, 1, 2, 3, 4, 5, 6, 7, 8] };
let queen: singlePiece = { name: "Queen", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Chess_qlt45.svg/1920px-Chess_qlt45.svg.png", moves: [7, 8, 9, 1, -1, -7 - 8, -9] };
let bqueen: singlePiece = { name: "Queen", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Chess_qdt45.svg/1920px-Chess_qdt45.svg.png", moves: [7, 8, 9, 1, -1, -7 - 8, -9] };
let rook: singlePiece = { name: "Rook", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Chess_rlt45.svg/1920px-Chess_nlt45.svg.png", moves: [8, 16] };
let brook: singlePiece = { name: "Rook", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Chess_rdt45.svg/1920px-Chess_rdt45.svg.png", moves: [8, 16] };
let bishop: singlePiece = { name: "Bishop", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Chess_blt45.svg/1920px-Chess_blt45.svg.png", moves: [8, 16] };
let bbishop: singlePiece = { name: "Bishop", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Chess_bdt45.svg/1920px-Chess_bdt45.svg.png", moves: [8, 16] };
let knight: singlePiece = { name: "Knight", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Chess_nlt45.svg/1920px-Chess_nlt45.svg.png", moves: [8, 16] };
let bknight: singlePiece = { name: "Knight", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Chess_ndt45.svg/1920px-Chess_ndt45.svg.png", moves: [8, 16] };
let empty: singlePiece = { name: "Empty", url: "", moves: [] };


function getPieceType(pieceName: string): singlePiece {
  switch (pieceName) {
    case ('p'): return pawn;
    case ('n'): return knight;
    case ('b'): return bishop;
    case ('r'): return rook;
    case ('q'): return queen;
    case ('k'): return king;
    case ('P'): return bpawn;
    case ('N'): return bknight;
    case ('B'): return bbishop;
    case ('R'): return brook;
    case ('Q'): return bqueen;
    case ('K'): return bking;
    case (''): return empty;
  }
  const x: singlePiece = {
    name: "",
    moves: [],
    url: ""
  };
  return x;
}
function RenderChessPiece(info: singlePiece) {
  return <img src={info.url}  ></img >
}
interface pieceInfo {
  id: number,
  tileColour: string,
  piece: string,
  team: string;
  pieceHtml: React.JSX.Element,
  isClicked: string,
  isMoved: boolean;
}


function getWhitePawnMoves(piece: pieceInfo, board: pieceInfo[]) {
  let availableMoves: number[] = [];
  for (const move of [8]) {
    if (piece.id + move < 64 && piece.id + move > -1)
      if (board[piece.id + move].piece == "") {
        availableMoves.push(move);
        if (!piece.isMoved) {
          for (const move of [16]) {
            if (piece.id + move < 64 && piece.id + move > -1)
              if (board[piece.id + move].piece == "") {
                availableMoves.push(move);
              }
          }
        }
      }
  }
  const downLeft = 7;
  const downRight = 9;
  if (piece.id + downLeft < 64 && piece.id + downLeft > -1 && piece.id % 8 != 0)
    if (board[piece.id + downLeft].piece != "" && board[piece.id + downLeft].team != piece.team) {
      availableMoves.push(downLeft);
    }
  if (piece.id + downRight < 64 && piece.id + downRight > -1 && (piece.id + 1) % 8 != 0)
    if (board[piece.id + downRight].piece != "" && board[piece.id + downRight].team != piece.team) {
      availableMoves.push(downRight);
    }

  return availableMoves;
}
function getBlackPawnMoves(piece: pieceInfo, board: pieceInfo[]) {
  let availableMoves: number[] = [];
  for (const move of [-8]) {
    if (piece.id + move < 64 && piece.id + move > -1)
      if (board[piece.id + move].piece == "") {
        availableMoves.push(move);
        if (!piece.isMoved) {
          for (const move of [-16]) {
            if (piece.id + move < 64 && piece.id + move > -1)
              if (board[piece.id + move].piece == "") {
                availableMoves.push(move);
              }
          }
        }
      }
  }
  const upLeft = -9;
  const upRight = -7;
  if (piece.id + upLeft < 64 && piece.id + upLeft > -1 && piece.id % 8 != 0)
    if (board[piece.id + upLeft].piece != "" && board[piece.id + upLeft].team != piece.team) {
      availableMoves.push(upLeft);
    }
  if (piece.id + upRight < 64 && piece.id + upRight > -1 && (piece.id + 1) % 8 != 0)
    if (board[piece.id + upRight].piece != "" && board[piece.id + upRight].team != piece.team) {
      availableMoves.push(upRight);
    }

  return availableMoves;
}
function getBishopMoves(piece: pieceInfo, board: pieceInfo[]) {
  let availableMoves: number[] = [];
  for (const move of [9, 18, 27, 36, 45, 54, 63]) {
    if ((piece.id + move) % 8 == 0)
      break;
    if (piece.id + move < 64 && piece.id + move > -1) {
      if (board[piece.id + move].team != piece.team) {
        availableMoves.push(move);
      }
      if (board[piece.id + move].piece != "") {
        break;
      }
    }
  }
  for (const move of [-9, -18, -27, -36, -45, -54, -63]) {
    if ((piece.id + move + 1) % 8 == 0)
      break;
    if (piece.id + move < 64 && piece.id + move > -1) {
      if (board[piece.id + move].team != piece.team) {
        availableMoves.push(move);
      }
      if (board[piece.id + move].piece != "") {
        break;
      }
    }
  }

  for (const move of [7, 14, 21, 28, 35, 42, 49, 56, 63]) {
    if ((piece.id + move + 1) % 8 == 0)
      break;
    if (piece.id + move < 64 && piece.id + move > -1) {
      if (board[piece.id + move].team != piece.team) {
        availableMoves.push(move);
      }
      if (board[piece.id + move].piece != "") {
        break;
      }
    }
  }
  for (const move of [-7, -14, -21, -28, -35, -42, -49, -56, -63]) {
    if ((piece.id + move) % 8 == 0)
      break;
    if (piece.id + move < 64 && piece.id + move > -1) {
      if (board[piece.id + move].team != piece.team) {
        availableMoves.push(move);
      }
      if (board[piece.id + move].piece != "") {
        break;
      }
    }
  }
  return availableMoves;
}
function getRookMoves(piece: pieceInfo, board: pieceInfo[]) {
  let availableMoves: number[] = [];
  for (const move of [1, 2, 3, 4, 5, 6, 7]) {
    if ((piece.id + move) % 8 == 0)
      break;
    if (piece.id + move < 64 && piece.id + move > -1) {
      if (board[piece.id + move].team != piece.team) {
        availableMoves.push(move);
      }
      if (board[piece.id + move].piece != "") {
        break;
      }
    }
  }
  for (const move of [-1, -2, -3, -4, -5, -6, -7]) {
    if ((piece.id + move + 1) % 8 == 0)
      break;
    if (piece.id + move < 64 && piece.id + move > -1) {
      if (board[piece.id + move].team != piece.team)
        availableMoves.push(move);
      if (board[piece.id + move].piece != "") {
        break;
      }
    }
  }

  for (const move of [8, 16, 24, 32, 40, 48, 56]) {
    if (piece.id + move < 64 && piece.id + move > -1) {
      if (board[piece.id + move].team != piece.team)
        availableMoves.push(move);
      if (board[piece.id + move].piece != "") {
        break;
      }
    }
  }
  for (const move of [-8, -16, -24, -32, -40, -48, -56]) {
    if (piece.id + move < 64 && piece.id + move > -1) {
      if (board[piece.id + move].team != piece.team)
        availableMoves.push(move);
      if (board[piece.id + move].piece != "") {
        break;
      }
    }
  }
  return availableMoves;
}
function getKnightMoves(piece: pieceInfo, board: pieceInfo[]) {
  let availableMoves: number[] = [];
  for (const move of [-17, 15]) {
    if (piece.id + move < 64 && piece.id + move > -1 && (piece.id + move + 1) % 8 != 0) {
      if (board[piece.id + move].team != piece.team)
        availableMoves.push(move);
    }
  }
  for (const move of [-10, 6]) {
    if (piece.id + move < 64 && piece.id + move > -1 && (piece.id + move + 1) % 8 != 0 && (piece.id + move + 2) % 8 != 0) {
      if (board[piece.id + move].team != piece.team)
        availableMoves.push(move);
    }
  }
  for (const move of [-15, 17]) {
    if (piece.id + move < 64 && piece.id + move > -1 && (piece.id + move) % 8 != 0) {
      if (board[piece.id + move].team != piece.team)
        availableMoves.push(move);
    }
  }
  for (const move of [-6, 10]) {
    if (piece.id + move < 64 && piece.id + move > -1 && (piece.id + move) % 8 != 0 && (piece.id + move - 1) % 8 != 0) {
      if (board[piece.id + move].team != piece.team)
        availableMoves.push(move);
    }
  }

  return availableMoves;
}

function getKingMoves(piece: pieceInfo, board: pieceInfo[]) {
  let availableMoves: number[] = [];
  for (const move of [-9, -8, -7, -1, 1, 7, 8, 9]) {
    if ((piece.id + move) % 8 == 0)
      break;
    if (piece.id + move < 64 && piece.id + move > -1) {
      if (board[piece.id + move].team != piece.team)
        availableMoves.push(move);
    }
  }

  return availableMoves;
}

function getAvailableMoves(piece: pieceInfo, board: pieceInfo[]): number[] {
  //get piece type
  console.log(piece)
  let availableMoves: number[] = [];
  if (piece) {
    if (piece.piece == "p")
      return getWhitePawnMoves(piece, board);
    if (piece.piece == "P")
      return getBlackPawnMoves(piece, board);
    if (piece.piece == "b" || piece.piece == "B")
      return getBishopMoves(piece, board);
    if (piece.piece == "r" || piece.piece == "R")
      return getRookMoves(piece, board);
    if (piece.piece == "q" || piece.piece == "Q")
      return getBishopMoves(piece, board).concat(getRookMoves(piece, board));
    if (piece.piece == "k" || piece.piece == "K")
      return getKingMoves(piece, board)
    if (piece.piece == "n" || piece.piece == "N")
      return getKnightMoves(piece, board);
  }
  return [];
}
function pawnPromotion(piece: pieceInfo) {
  if (piece.piece == "p") {
    piece.pieceHtml = RenderChessPiece(getPieceType("q"))
    piece.piece = "q";
  }
  if (piece.piece == "P") {
    piece.pieceHtml = RenderChessPiece(getPieceType("Q"))
    piece.piece = "Q";
  }
}
function kingCheck(board: pieceInfo[]) {

}
function RenderChessBoard() {


  let isWhite = false;
  const [whoTurn, setWhoTurn] = useState("white");

  let pieceChar = "";

  let i = 0;
  let piecePositionsInput: pieceInfo[] = [];

  for (pieceChar of ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r', 'p', 'p', 'p', 'p', 'p', 'p', 'p', 'p']) {
    piecePositionsInput.push({ id: i, tileColour: isWhite ? "whiteTile" : "blackTile", piece: pieceChar, pieceHtml: RenderChessPiece(getPieceType(pieceChar)), isClicked: "", team: "white" });
    i += 1
    if ((i) % 8 != 0)
      isWhite = !isWhite;
  }
  while (i < 48) {
    piecePositionsInput.push({ id: i, tileColour: isWhite ? "whiteTile" : "blackTile", piece: "", pieceHtml: RenderChessPiece(getPieceType("")), isClicked: "" });
    i += 1
    if ((i) % 8 != 0)
      isWhite = !isWhite;
  }
  i = 48
  for (pieceChar of ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R']) {
    piecePositionsInput.push({ id: i, tileColour: isWhite ? "whiteTile" : "blackTile", piece: pieceChar, pieceHtml: RenderChessPiece(getPieceType(pieceChar)), isClicked: "", team: "black" });
    i += 1
    if ((i) % 8 != 0)
      isWhite = !isWhite;
  }
  for (let i = 1; i < 64; i++) {
    piecePositionsInput.push()
    if ((i) % 8 != 0) isWhite = !isWhite;
  }
  const [piecePositions, setPiecePositions] = useState(piecePositionsInput);
  const nullPiece: pieceInfo = {
    id: -1,
    tileColour: "",
    piece: "",
    pieceHtml: undefined,
    isClicked: ""
  };
  const [selectedPiece, setSelectedPiece] = useState(nullPiece);

  const movePiece = (piece: pieceInfo) => {
    piecePositions.map(p => {
      if (p.id == piece.id) {
        p.piece = String(selectedPiece.piece);
        p.isClicked = "";
        p.pieceHtml = RenderChessPiece(getPieceType(selectedPiece.piece));
        p.team = selectedPiece.team;
        return p;
      }
      else {
        return p;
      }
    });
    piecePositions.map(p => {
      if (p.id == selectedPiece.id) {
        p.pieceHtml = RenderChessPiece(getPieceType(""));
        p.piece = "";
        p.team = "";
        return p;
      }
      else {
        return p;
      }
    });

    setPiecePositions(piecePositions);
    if (piece.piece == "p" && piece.id > 55)
      pawnPromotion(piece);
    if (piece.piece == "P" && piece.id < 8)
      pawnPromotion(piece);
  }
  const deselectPieces = () => {
    setPiecePositions(piecePositions.map(p => {
      if (p.isClicked != "") {
        p.isClicked = ""
        return p;
      } else {
        return p;
      }
    }));
  }
  const selectPiece = (id: number) => {
    let piece: pieceInfo = {
      id: -1,
      tileColour: "",
      piece: "",
      pieceHtml: undefined,
      isClicked: ""
    };
    setPiecePositions(piecePositions.map(p => {
      if (p.id === id) {
        p.isClicked = " clickedTile"
        piece = p;
        return p;
      } else {
        return p;
      }
    }));
    if (piece.team != whoTurn)
      return;

    setSelectedPiece(piece);

    let moves = getAvailableMoves(piece, piecePositions);
    for (const move of moves) {
      const availableid = piece.id + move;
      setPiecePositions(
        piecePositions.map(p => {
          if (p.id === availableid) {
            p.isClicked = " availableTile"
            return p;
          } else {
            return p;
          }
        }));

    }
  }
  const clickPiece = (id: number) => {
    //check if this is a move. If so, move the piece
    for (const piece of piecePositions) {
      if (piece.id == id && piece.isClicked == " availableTile") {
        movePiece(piece);
        piece.isMoved = true;
        deselectPieces();
        if (whoTurn == "white")
          setWhoTurn("black")
        else if (whoTurn == "black")
          setWhoTurn("white")
        return;
      }
    }

    //delelect
    deselectPieces();
    selectPiece(id);
  }


  const listItems = piecePositions.map(piecePosition => <div className={"chessTile " + piecePosition.tileColour + piecePosition.isClicked} onClick={() => clickPiece(piecePosition.id)}> {piecePosition.pieceHtml}</div >);

  return (
    <div className="App">
      <div className="grid grid-cols-8 gap-1 chessGrid">
        {listItems}
      </div>
    </div>

  );
}


export default function Home() {
  return (
    <div>
      <h1 id="chessWord">Chess</h1>
      {ChangeButton()}
      {RenderChessBoard()}
    </div>
  )
}

