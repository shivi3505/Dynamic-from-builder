import { useState } from "react";

export default function LeftSidebar(){
    return (
        <>
        <div className="flex items-start max-h-full max-w-xs bg-lime-200"> 
            <div>
                    <div draggable='true'>
                        <label htmlFor="text"  className="">Name</label>
                        <input type="text" className="element" />
                    </div>
                    <div draggable='true'>
                        <label htmlFor="address" >Address</label>
                        <textarea className="element"></textarea>
                    </div>
                     <div draggable='true' >
                        <label htmlFor="selectmenu">select</label>
                        <select className="element">
                            <option value="">value</option>
                            <option value="">value</option>
                        </select>
                     </div>
                   
            </div>
               
        </div>
        
        </>
    )
}