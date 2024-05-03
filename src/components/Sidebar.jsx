import React, { useContext, useState } from "react";
import { ChevronRight, ChevronLeft, Plus, X } from "react-feather";
import { Popover } from "react-tiny-popover";
import { BoardContext } from "../context/BoardContext";

const Sidebar = () => {
  const blankBoard = {
    name:'',
    bgcolor:'#f60000',
    list:[]
  }
  const [boardData,setBoardData] = useState(blankBoard);
  const addBoard = ()=>{
    let newBoard = {...allBoards};
    newBoard.boards.push(boardData);
    setAllBoards(newBoard);
    setBoardData(blankBoard);
    setIsPopoverOpen(!isPopoverOpen);
  }
  const [collapsed, setCollapsed] = useState(false);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const { allBoards, setAllBoards } = useContext(BoardContext);
  const setActiveBoard = (index)=>{
    let newBoard = {...allBoards};
    newBoard.active = index;
    setAllBoards(newBoard);
  }
  return (
    <div
      className={`bg-[#121417] h-[calc(100vh-3rem)] border-r border-r-[#9fadbc29] transition-all linear duration-500 flex-shrink-0 ${
        collapsed ? "w-[42px]" : "w-[280px]"
      }`}
    >
      {collapsed && (
        <div className="p-2">
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="hover:bg-slate-600 rounder-sm"
          >
            <ChevronRight size={20}></ChevronRight>
          </button>
        </div>
      )}
      <div>
        {!collapsed && (
          <div>
            <div className="workspace p-3 flex justify-between border border-b-[#9fadbc29]">
              <h4>Dev's WorkSpace</h4>
              <button
                onClick={() => setCollapsed(!collapsed)}
                className="hover:bg-slate-600 rounded-sm p-1"
              >
                <ChevronLeft size={18}></ChevronLeft>
              </button>
            </div>

            <div className="boardlist">
              <div className="flex justify-between px-3 py-2">
                <h6>Your Boards</h6>
                <Popover
                  isOpen={isPopoverOpen}
                  positions={["right", "top", "bottom", "left"]}
                  align="start"
                  content={
                    <div className="ml-2 p-2 w-60 flex flex-col justify-center items-center bg-slate-600 text-white rounded">
                      <button
                        onClick={() => setIsPopoverOpen(!isPopoverOpen)}
                        className="absolute right-2 top-2 hover:bg-gray-500 p-1 rounded"
                      >
                        {" "}
                        <X size={16}></X>
                      </button>
                      <h4 className="py-3">Create Borad</h4>
                      <img src="https://placehold.co/200x120/png" alt="" />
                      <div className="mt-3 flex flex-col items-start w-full">
                        <label htmlFor="">
                          Board Title<span>*</span>
                        </label>
                        <input
                          type="text"
                          className=" mb-2 h-8 px-2 w-full bg-gray-700"
                          value={boardData.name}
                          onChange={(e)=>setBoardData({...boardData,name:e.target.value})}
                        />
                        <label htmlFor="">Board Color</label>
                        <input
                          type="color"
                          name=""
                          id=""
                          className="mb-2 h-8 px-2 w-full bg-gray-700"
                          value={boardData.bgcolor}
                          onChange={(e)=>setBoardData({...boardData,bgcolor:e.target.value})}
                        />
                        <button className="w-full rounded h-8 bg-slate-700 mt-2" onClick={()=>addBoard()}>
                          Create
                        </button>
                      </div>
                    </div>
                  }
                >
                  <button
                    onClick={() => setIsPopoverOpen(!isPopoverOpen)}
                    className="hover:bg-slate-600 p-1 rounded-sm"
                  >
                    <Plus size={16}></Plus>
                  </button>
                </Popover>
              </div>
            </div>

            <ul>
              {allBoards.boards &&
                allBoards.boards.map((x,index) => {
                  return (
                    <li key={index}>
                      <button className="px-2 py-2 w-full text-sm flex justify-start" onClick={()=>setActiveBoard(index)}>
                        <span
                          className="w-6 h-max rounded-sm mr-2"
                          style={{ backgroundColor: `${x.bgcolor}` }}
                        >
                          &nbsp;
                        </span>
                        <span>{x.name}</span>
                      </button>
                    </li>
                  );
                })}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
