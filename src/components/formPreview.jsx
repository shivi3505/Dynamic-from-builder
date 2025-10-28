import Canvas from "./canvas";
import { RxCross1 } from "react-icons/rx";
export default function FormPreview({elements}){
 
    const renderElement = (el) => {
        
    
        switch (el.type) {
          case "text":
            return (
              <div key={el.id} className="flex flex-col gap-1 relative">
 
                <label htmlFor={el.type} className="text-gray-700 text-sm font-medium">
                  {el.label}
                </label>
                <input
                  type="text"
                  name={el.type}
                  className="border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
                  value={el.value}
                />
              </div>
            );
    
          case "textarea":
            return (
              <div key={el.id}  className="flex flex-col relative gap-1">
               
                <label htmlFor={el.type} className="text-gray-700 text-sm font-medium">
                  {el.label}
                </label>
                <textarea
                  name={el.type}
                  rows="4"
                  className="border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
                  value={el.value}
                />
              </div>
            );
    
          case "dropdown":
            return (
                 <div key={el.id}  className="flex flex-col relative gap-1">
                   
                <label htmlFor={el.type} className="text-gray-700 text-sm font-medium">
                  {el.label}
                </label>
              <select
                key={el.id}
                className="font-medium  text-gray-800 border border-gray-300 rounded-md px-3 py-2 shadow-sm "
                name={el.label}
                value={el.value}
              >
        
               {el.options.map((option)=>(
            
                <option value={option} className="focus:ring-2 focus:ring-blue-400 focus:outline-none">{option}</option>
               ))}
              </select>
              </div>
            );
           case "radio":
            return (
              <>
              
                <label htmlFor={el.type} className="text-gray-700 text-sm font-medium">
                  {el.label}
                </label>
                <input
                  type={el.type}
                  name={el.type}
                  className="border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
                  value={el.value}
                />
              </>
            );
             case "checkbox":
            return (
              <div key={el.id} className="flex flex-row gap-1 m-4">
                <label htmlFor={el.type} className="text-gray-700 text-sm font-medium m-5">
                  {el.label}
                </label>
                <input
                  type={el.type}
                  name={el.type}
                  className="border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
                  value={el.value}
                />
              </div>
            );
          default:
            return null;
        }
      };
    return (
        <>
        
        <div className="absolute  max-w-100 ">{elements.map(renderElement)}</div>
        </>
        
    
        
    )
        
}