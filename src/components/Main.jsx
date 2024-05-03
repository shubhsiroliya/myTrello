import React, { useContext } from "react";
import { Edit2, MoreHorizontal, UserPlus } from "react-feather";
import CardAdd from "./CardAdd";
import { BoardContext } from "../context/BoardContext";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import AddList from "./AddList";
import utils from "../utils/utils";

const Main = () => {
  const { allBoards, setAllBoards } = useContext(BoardContext);
  const bdata = allBoards.boards[allBoards.active];

  function onDragEnd(result){
    if(!result.destination) return;
    const newList = [...bdata.list];
    const s_id = parseInt(result.source.droppableId);
    const d_id = parseInt(result.destination.droppableId);
    const [removed] = newList[s_id - 1].items.splice(result.source.index,1);
    newList[d_id - 1].items.splice(result.destination.index,0,removed);
    
    let board = {...allBoards};
    board.boards[board.active].list = newList;
    setAllBoards(board);


  }
  const cardData = (e,index) => {
    let newList = [...bdata.list];
    newList[index].items.push({id:utils.makeid(5),title:e});

    let board = {...allBoards};
    board.boards[board.active].list = newList;
    setAllBoards(board);
  };

  const listData = (e) => {
    let newList = [...bdata.list];
    newList.push({id:newList.length + 1 + '',title:e,items:[]});

    let board = {...allBoards};
    board.boards[board.active].list = newList;
    setAllBoards(board);
  };

  return (
    <div className="flex flex-col  w-full" style={{backgroundColor:`${bdata.bgcolor}`}}>
      <div className="p-3 bg-black justify-between flex w-full bg-opacity-50">
        <h2 className="text-lg">{bdata.name}</h2>
        <div className="flex items-center justify-center">
          <button className="bg-gray-200 text-gray-500 px-2 py-1 mr-2 rounded flex justify-center h8">
            <UserPlus size={16} className="mr-2"></UserPlus>
            Share
          </button>
          <button className="hover:bg-gray-500 px-2 py-1 h-8 rounded">
            <MoreHorizontal size={16}></MoreHorizontal>
          </button>
        </div>
      </div>
      <div className="flex flex-col w-full flex-grow relative">
        <div className="absolute mb-1 pb-2 left-0 right-0 top-0 bottom-0 p-3 overflow-x-auto overflow-y-hidden flex">
          <DragDropContext onDragEnd={onDragEnd}>
            {bdata.list &&
              bdata.list.map((x, index) => {
                return (
                  <div
                    key={index}
                    className="mr-3 w-60 h-fit rounded-md p-2 bg-black flex-shrink-0"
                  >
                    <div className="list-body">
                      <div className="flex justify-between p-1">
                        <span>{x.title}</span>
                        <button className="hover:bg-gray-500 p-1 rounded-sm">
                          <MoreHorizontal size={16}></MoreHorizontal>
                        </button>
                      </div>
                      <Droppable droppableId={x.id} >
                        {(provided, snapshot) => (
                          <div
                          className="py-1"
                            ref={provided.innerRef}
                            style={{
                              backgroundColor: snapshot.isDraggingOver
                                ? "#222"
                                : "transparent",
                            }}
                            {...provided.droppableProps}
                          >
                            {x.items &&
                              x.items.map((y, index) => {
                                return (
                                  <Draggable
                                    key={y.id}
                                    draggableId={y.id}
                                    index={index}
                                  >
                                    {(provided, snapshot) => (
                                      <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                      >
                                        <div className="item flex justify-between items-center bg-zinc-700 cursor-pointer rounded-md border-2 border-zinc-900 hover:border-gray-500">
                                          <span>{y.title}</span>
                                          <span className="flex justify-start items-start">
                                            <button className="hover:bg-gray-500 p-1 rounded-sm">
                                              <Edit2 size={16}></Edit2>
                                            </button>
                                          </span>
                                        </div>
                                      </div>
                                    )}
                                  </Draggable>
                                );
                              })}
                            {provided.placeholder}
                          </div>
                        )}
                      </Droppable>

                      <CardAdd getCard={(e) => cardData(e,index)}></CardAdd>
                    </div>
                  </div>
                );
              })}
          </DragDropContext>
          <AddList getList={(e)=>listData(e)} ></AddList>
        </div>
      </div>
    </div>
  );
};

export default Main;
