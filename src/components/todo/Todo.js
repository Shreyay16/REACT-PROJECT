import React, { useEffect, useState } from 'react';
import "./style.css";

const Todo = () => {
    const getLocalData=()=>{
        const lists=localStorage.getItem("myTodoList");
        //convert list into array and return it
        if(lists){
            return JSON.parse(lists);
        }
        else{
            return [];
        }
    };
    const[inputData,setInputData]=useState("");//initalize with empty string
    const[items,setInputItems]=useState(getLocalData());//fetch the data from loal storage and initialize the items array
    const[isEditItem,setIsEditItem]=useState("");//this will store the id of the iitem to be edited
    const [toggleButton,setToggleButton]=useState(false);

    //functions
    const addItems=() => {
      if(!inputData){
        alert("Please enter the item!!");
      }
      else if(inputData && toggleButton){
            //toggle button is true whih means we are going to edit
            setInputItems(items.map((curElem)=>{
                if(curElem.id===isEditItem){
                    return {... curElem,name:inputData}
                }
                return curElem;
            }));
            setInputData("");
            setIsEditItem(null);
            setToggleButton(false);
      }
      else{
        //create a object for storing the new input tata item along with unique  id
        const myNewDataItem={
            id:new Date().getTime().toString(),//set time as a unique id
            name:inputData,
        }
        setInputItems([... items,myNewDataItem]);
        setInputData("");
      } 
    };
    const deleteItem=(index)=>{
        const updatedItems=items.filter((curElem)=>{
            return curElem.id !== index;
        });
        setInputItems(updatedItems);
    };
    const removeAll=()=>{
        setInputItems([]);
    };

    //adding to Local Storage
    useEffect(()=>{
        localStorage.setItem("myTodoList",JSON.stringify(items))
    },[items]);
    
    //using useEffect we entered data into localstorage and then using useStae we every time intialed items array from local data
    
    //A function to edit Item in Todo List
    const editItem=(index)=>{
        const item_todo_edit=items.find((curElem)=>{
            return curElem.id===index;
        });
        setInputData(item_todo_edit.name);
        setIsEditItem(index);
        setToggleButton(true);
    };


  return (
    <>
      <div className="main-div">
         <div className="child-div">
            <figure>
               <img src="./images/todo.svg" alt="todo-logo" />
               <figcaption>Add your List Here✌️</figcaption>
            </figure>
            <div className="addItems">
                <input type="text" placeholder='✍️ Add items' className="form-control" value={inputData} onChange={(event)=>setInputData(event.target.value)}/>
                {toggleButton?(<i class="far fa-edit" aria-hidden="true" onClick={addItems}></i>):(<i className="fa fa-plus" aria-hidden="true" onClick={addItems}></i>)}
            </div>
            <div className="showItems">
               { items.map((curElem,index) => {
                   return(
                        <div className="eachItem" key={curElem.id}>
                            <h3>{curElem.name}</h3>
                            <div className="todo-btn">
                            <i class="far fa-edit" aria-hidden="true" onClick={()=>{editItem(curElem.id)}}></i>
                            <i class="far fa-trash-alt" aria-hidden="true" onClick={()=>deleteItem(curElem.id)}></i>
                            </div>
                        </div>
                   );
                })}
            </div>
            <div className="showItems">
                <button className="btn effect04" data-sm-link-text="REMOVE ALL" onClick={removeAll}> <span>CHECK LIST</span></button>
            
            </div>
         </div>
      </div>
    </>
  )
}

export default Todo;
