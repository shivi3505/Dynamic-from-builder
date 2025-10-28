import { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import FormPreview from "./formPreview";
import RightSideBar from "./rightsidebar";
const Canvas = () => {
  const [elements, setElements] = useState([]);
  const [rightSidebar, setRightSidebar]= useState(false);
  const [elementID, setElementId]= useState(0);
   const [displayDelete,setDisplayDelete]=useState(true);
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const togglSideBar=(id)=>{
    setRightSidebar(!rightSidebar);
    setElementId(id)
  }
  
  const handleChange=(e,id)=>{
    const newValue= e.target.value;
  setElements(element=>
      element.map((ele)=>{
        if(ele.id==id){
          return {...ele,value:newValue}
        }
        return ele;
      })
       )

  }
console.log(elements);
 
   const updateChange = (updatedItem) => {
  setElements((prev) =>
    prev.map((el) => (el.id === updatedItem.id ? updatedItem : el))
  );
};

  
  const handleDrop = (e) => {
    e.preventDefault();
    const { type, label,value ,options,isRequired} = JSON.parse(e.dataTransfer.getData("text/plain"));
    const rect = e.currentTarget.getBoundingClientRect();
    console.log(Array.isArray(options));
    const newElement = {
      id: Date.now(),
      type,
      label,
      options,
      value,
      isRequired,
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
    setElements((prev) => [...prev, newElement]);
  };
   const handleDelete= (id)=>{
   
    setElements(ele=>
       ele.filter((ele)=>ele.id!==id)

    
    )
   }
  const renderElement = (el) => {
    

    switch (el.type) {
      case "text":
        return (
          <div key={el.id} className="flex flex-col gap-1 relative">
           <button className="absolute block left-64 text-sm text-red-500" onClick={()=>handleDelete(el.id)}> <RxCross1/></button>
            
            <label htmlFor={el.type} className="text-gray-700 text-sm font-medium">
              {el.label}
            </label>
            <input
              type="text"
              name={el.type}
              className="border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
              onChange={(e)=>handleChange(e,el.id)}
              onClick={()=>togglSideBar(el.id)}
            />
          </div>
        );

      case "textarea":
        return (
          <div key={el.id}  className="flex flex-col relative gap-1 object-cover">
             <button className="absolute block left-64 text-sm text-red-500" onClick={()=>handleDelete(el.id)}> <RxCross1/></button>
            <label htmlFor={el.type} className="text-gray-700 text-sm font-medium">
              {el.label}
            </label>
            <textarea
              name={el.type}
              rows="4"
              className="border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
              onChange={(e)=>handleChange(e,el.id)}
              onClick={()=>togglSideBar(el.id)}
            />
          </div>
        );

      case "dropdown":
        return (
             <div key={el.id}  className="flex flex-col relative gap-1 object-cover">
               <button className="absolute block left-64 text-sm text-red-500" onClick={()=>handleDelete(el.id)}> <RxCross1/></button>
            <label htmlFor={el.type} className="text-gray-700 text-sm font-medium">
              {el.label}
            </label>
          <select
            key={el.id}
            className="font-medium  text-gray-800 border border-gray-300 rounded-md px-3 py-2 shadow-sm "
            name={el.label}
             onChange={(e)=>handleChange(e,el.id)}
              onClick={()=>togglSideBar(el.id)}
          >
    
           {el.options.map((option)=>(
        
            <option value={option} className="focus:ring-2 focus:ring-blue-400 focus:outline-none">{option}</option>
           ))}
          </select>
          </div>
        );
       case "radio":
        return (
          // <div key={el.id} className="flex flex-row gap-1 object-cover">
          <>
           <button className="absolute block left-20 text-sm text-red-500" onClick={()=>handleDelete(el.id)}> <RxCross1/></button>
            <label htmlFor={el.type} className="text-gray-700 text-sm font-medium">
              {el.label}
            </label>
            <input
              type={el.type}
              name={el.type}
              className="border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
               onChange={(e)=>handleChange(e,el.id)}
              onClick={()=>togglSideBar(el.id)}
            />
            </>
          // </div>
        );
         case "checkbox":
        return (
          <div key={el.id} className="flex flex-row gap-1 m-4 object-cover">
            <label htmlFor={el.type} className="text-gray-700 text-sm font-medium m-5">
              {el.label}
            </label>
            <input
              type={el.type}
              name={el.type}
              className="border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
               onChange={(e)=>handleChange(e,el.id)}
              onClick={()=>togglSideBar(el.id)}
            />
          </div>
        );
        case "navbar":
         return (
        <nav className="flex justify-between w-98 bg-gray-400">
          <p>{el.value}</p>
          <div className="flex gap-3 sticky">
            {el.options?.map((opt, i) => <a href="#" key={i}>{opt}</a>)}
            </div>
        </nav>
      );
        
      default:
        return null;
    }
  };

  return (
    <div className="flex max-w-full overflow-hidden">
    <div
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      className="relative object-contain flex mt-10  mr-10 w-300 md:max-w-100 max-h-full ml-10 bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg shadow-inner "
    >
      <div className="absolute  max-w-100 ">{elements.map(renderElement)}</div>
      {elements.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center text-gray-400 italic overflow-hidden m-10">
          
        </div>
        
      )}
     
      
    </div>
     <div className="relative object-contain flex mt-10 items-center justify-center mr-10 w-200 md:max-w-100 max-h-full ml-10 bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg shadow-inner ">
        <FormPreview elements={elements} />
      </div  >
      {rightSidebar&&<RightSideBar elements={elements} elementID={elementID} handleUpdate={updateChange}/>}
      </div>

  );
};

export default Canvas;
