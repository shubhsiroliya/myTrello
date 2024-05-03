import { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Main from "./components/Main";
import Sidebar from "./components/Sidebar";
import { BoardContext } from "./context/BoardContext";

export default function App() {
  const boardData ={
    active:0,
    boards:[
      {
        name:'My Trello Board',
        bgcolor:'#069000',
        list:[
          {id:"1",title:"To Do",items:[{id:"cdrfta",title:"Project Description 1"}]},
          {id:"2",title:"In Progress",items:[{id:"cdrftb",title:"Project Description 2"}]},
          {id:"3",title:"Done",items:[{id:"cdrftc",title:"Project Description 3"}]}

        ]
      }
    ]
  }
  const [allBoards, setAllBoards] = useState(boardData);
  return (
    <>
      <Header></Header>
      <BoardContext.Provider value={{allBoards,setAllBoards}}>
        <div className="content flex">
          <Sidebar></Sidebar>
          <Main></Main>
        </div>
      </BoardContext.Provider>
    </>
  );
}
