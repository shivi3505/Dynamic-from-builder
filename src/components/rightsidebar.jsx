import { useState, useEffect } from "react";
import { RxCross1 } from "react-icons/rx";

export default function RightSideBar({ elements, elementID, handleUpdate, onClose }) {
  const targetedElement = elements.find((ele) => ele.id === elementID);
  const [config, setConfig] = useState(targetedElement || {});

  useEffect(() => {
    setConfig(targetedElement || {});
  }, [elementID, elements]);

  if (!config?.id) return null;

  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const updated = {
      ...config,
      [name]: type === "checkbox" ? checked : value,
    };
    setConfig(updated);
    handleUpdate(updated);
  };

  
  const handleStyleChange = (key, value) => {
    const updated = {
      ...config,
      style: {
        ...config.style,
        [key]: value,
      },
    };
    setConfig(updated);
    handleUpdate(updated);
  };

  const handleOptionChange = (index, newValue) => {
    const updatedOptions = config.options.map((opt, i) =>
      i === index ? newValue : opt
    );
    const updated = { ...config, options: updatedOptions };
    setConfig(updated);
    handleUpdate(updated);
  };

  const handleAddOption = () => {
    const updated = {
      ...config,
      options: [...(config.options || []), `Option ${config.options?.length + 1 || 1}`],
    };
    setConfig(updated);
    handleUpdate(updated);
  };

  const handleDeleteOption = (index) => {
    const updatedOptions = config.options.filter((_, i) => i !== index);
    const updated = { ...config, options: updatedOptions };
    setConfig(updated);
    handleUpdate(updated);
  };

  return (
    <aside className="h-full w-80 bg-gray-50 border-l border-gray-300 p-4 overflow-y-auto">
     
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-700">Field Configure</h3>
        <button onClick={onClose} className="text-gray-500 hover:text-red-500">
          <RxCross1 />
        </button>
      </div>

      
      <div key={config.id} className="flex flex-col gap-5">
        
        <div>
          <label className="text-gray-700 text-sm font-medium block mb-1">
            Label
          </label>
          <input
            type="text"
            name="label"
            value={config.label || ""}
            placeholder="Enter field label"
            className="w-full border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
            onChange={handleChange}
          />
        </div>

        {/* Placeholder (for text/textarea types only) */}
        {(config.type === "text" || config.type === "textarea") && (
          <div>
            <label className="text-gray-700 text-sm font-medium block mb-1">
              Placeholder
            </label>
            <input
              type="text"
              name="placeholder"
              value={config.placeholder || ""}
              placeholder="Enter placeholder text"
              className="w-full border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
              onChange={handleChange}
            />
          </div>
        )}

        
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="isRequired"
            checked={!!config.isRequired}
            onChange={handleChange}
            className="w-4 h-4 text-blue-500"
          />
          <label className="text-gray-700 text-sm font-medium">
            Required Field
          </label>
        </div>

       
        {(config.type === "dropdown" ||
          config.type === "radio" ||
          config.type === "checkbox") && (
          <div>
            <label className="text-gray-700 text-sm font-medium block mb-2">
              Options
            </label>

            {config.options?.length > 0 ? (
              <div className="flex flex-col gap-2">
                {config.options.map((opt, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 bg-white border border-gray-200 rounded-md px-2 py-1"
                  >
                    <input
                      type="text"
                      value={opt}
                      className="flex-1 border-none focus:ring-0 text-gray-800 text-sm"
                      onChange={(e) => handleOptionChange(index, e.target.value)}
                    />
                    <button
                      className="text-red-500 hover:text-red-700"
                      onClick={() => handleDeleteOption(index)}
                      title="Delete Option"
                    >
                      <RxCross1 />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-400 text-sm italic mb-2">
                No options added yet
              </p>
            )}

            <button
              className="mt-2 text-sm bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
              onClick={handleAddOption}
            >
              Add Option
            </button>
          </div>
        )}

       
        <div className="mt-4 border-t border-gray-300 pt-3">
          <h4 className="text-gray-700 text-sm font-semibold mb-2">Styles</h4>
          {config.style?.label !== undefined && (
            <>
              <label className="text-xs text-gray-600 block mb-1">Label Classes</label>
              <input
                type="text"
                value={config.style?.label || ""}
                onChange={(e) => handleStyleChange("label", e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 mb-2"
                placeholder="Tailwind classes for label"
              />
            </>
          )}
          
          {config.style?.input !== undefined && (
            <>
             <label className="text-xs text-gray-600 block mb-1">Input / Field Classes</label>
          <input
            type="text"
            value={config.style?.input || ""}
            onChange={(e) => handleStyleChange("input", e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 mb-2"
            placeholder="Tailwind classes for input or textarea"
          />
            </>
          )}
         
           {config.style?.option_label !== undefined && (
            <>
             <label className="text-xs text-gray-600 block mb-1">option label style</label>
          <input
            type="text"
            value={config.style?.option_label || ""}
            onChange={(e) => handleStyleChange("option_label", e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 mb-2"
            placeholder="Tailwind classes  textarea"
          />
            </>
          )}
            {config.style?.button!==undefined&& (
              <>
              <label className="text-xs text-gray-600 block mb-1">button Classes</label>
          <input
            type="text"
            value={config.style?.button || ""}
            onChange={(e) => handleStyleChange("button", e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2"
            placeholder="Tailwind classes for button"
          />
              </>
            )}

            {config.style?.submit_button!==undefined&& (
              <>
              <label className="text-xs text-gray-600 block mb-1">submit button Classes</label>
          <input
            type="text"
            value={config.style?.submit_button || ""}
            onChange={(e) => handleStyleChange("submit_button", e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2"
            placeholder="Tailwind classes for button"
          />
              </>
            )}
          
        </div>
      </div>
    </aside>
  );
}
