

import { useState, useEffect } from "react";
import { RxCross1 } from "react-icons/rx";

const RightSideBar = ({ elements, elementID,handleUpdate }) => {
  const targetedElement = elements.find((ele) => ele.id === elementID);
  const [config, setConfig] = useState(targetedElement || {});

 
  useEffect(() => {
    setConfig(targetedElement || {});
  }, [elementID, elements]);

  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newConfig = {
      ...config,
      [name]: type === "checkbox" ? checked : value,
    };
    setConfig(newConfig);
     handleUpdate(newConfig); 
  };

  if (!config.id) return null; 

  return (
    <aside className="h-full p-4 border-l border-gray-300 object-contain">
      <div key={config.id} className="flex flex-col gap-4 relative">
       

        <div>
          <label className="text-gray-700 text-sm font-medium">Label</label>
          <input
            type="text"
            name="label"
            value={config.label || ""}
            className="border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="text-gray-700 text-sm font-medium">value</label>
          <input
            type="text"
            name="value"
            value={config.value || ""}
            className="border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
            onChange={handleChange}
          />
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="isRequired"
            checked={!!config.isRequired}
            onChange={handleChange}
          />
          <label className="text-gray-700 text-sm font-medium">
            Required Field
          </label>
        </div>
      </div>
    </aside>
  );
};

export default RightSideBar;
