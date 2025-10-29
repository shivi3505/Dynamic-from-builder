import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addElement,
  updateElement,
  deleteElement,
  setElements
} from "../slices/formslice";
import FormPreview from "./formPreview";
import RightSideBar from "./rightsidebar";
import { RxCross1 } from "react-icons/rx";

export default function Canvas() {
  const dispatch = useDispatch();
  const elements = useSelector(state => state.form.elements);
  const [selectedId, setSelectedId] = useState(null);
  const [showSidebar, setShowSidebar] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("formBuilderData");
    if (saved) dispatch(setElements(JSON.parse(saved)));
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem("formBuilderData", JSON.stringify(elements));
  }, [elements]);

  const handleDragOver = e => e.preventDefault();

  const handleDrop = e => {
    e.preventDefault();
    const dropped = JSON.parse(e.dataTransfer.getData("application/json"));

    const newElement = {
      id: Date.now(),
      type: dropped.type,
      style:dropped.style||{},
      label: dropped.fieldLabel || dropped.label,
      placeholder: dropped.placeholder || "",
      options: dropped.options || [],
      value: dropped.value || "",
      isRequired: dropped.isRequired || false
    };

    dispatch(addElement(newElement));
  };

  const handleDelete = id => dispatch(deleteElement(id));

  const handleSelectElement = id => {
    setSelectedId(id);
    setShowSidebar(true);
  };

  const updateElementHandler = updatedItem => dispatch(updateElement(updatedItem));

  const renderElement = el => {
    switch (el.type) {
      case "text":
        return (
          <div key={el.id} className="relative mb-4">
            <button
              className={el.style?.button}
              onClick={() => handleDelete(el.id)}
            >
              <RxCross1 />
            </button>
            <label className={el.style?.label}>
              {el.label}
              {el.isRequired && <span className="text-red-500 ml-1">*</span>}
            </label>
            <input
              type="text"
              placeholder={el.placeholder}
              className={el.style?.input}
              value={el.value}
              onChange={(e) => handleValueChange(el.id, e.target.value)}
              onClick={() => handleSelectElement(el.id)}
            />
          </div>
        );

      case "textarea":
        return (
          <div key={el.id} className="relative mb-4">
            <button
              className={el.style?.button}
              onClick={() => handleDelete(el.id)}
            >
              <RxCross1 />
            </button>
            <label className={el.style?.label}>
              {el.label}
            </label>
            <textarea
              placeholder={el.placeholder}
              rows="3"
              className={el.style.input}
              value={el.value}
              onChange={(e) => handleValueChange(el.id, e.target.value)}
              onClick={() => handleSelectElement(el.id)}
            />
          </div>
        );

      case "dropdown":
        return (
          <div key={el.id} className="relative mb-4">
            <button
              className={el.style.button}
              onClick={() => handleDelete(el.id)}
            >
              <RxCross1 />
            </button>
            <label className={el.style.label}>
              {el.label}
            </label>
            <select
              className={el.style.input}
              value={el.value}
              onChange={(e) => handleValueChange(el.id, e.target.value)}
              onClick={() => handleSelectElement(el.id)}
            >
              <option value="">Select an option</option>
              {el.options.map((opt, i) => (
                <option key={i} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
        );

     case "radio":
  return (
    <div key={el.id} className="relative mb-4">
      <button
        className={el.style.button}
        onClick={() => handleDelete(el.id)}
      >
        <RxCross1 />
      </button>
      <label className={el.style.label}>
        {el.label}
      </label>

      <div className="flex flex-row gap-2">
        {el.options.map((opt, i) => (
          <label key={i} className={el.style?.option_label}>
            <input
              type="radio"
              name={`radio-${el.id}`}
              value={opt}
              checked={el.value === opt}
              onClick={() => handleSelectElement(el.id)}
              onChange={(e) => handleValueChange(el.id, e.target.value)}
              className={el.style.input}
            />
            <span className={el.style?.span}>{opt}</span>
          </label>
        ))}
      </div>
    </div>
  );

      case "checkbox":
        return (
          <div key={el.id} className="relative mb-4">
            <button
              className={el.style?.button}
              onClick={() => handleDelete(el.id)}
            >
              <RxCross1 />
            </button>
            <label className={el.style?.label}>
              {el.label}
            </label>
            {el.options.map((opt, i) => (
              <label key={i} className={el.style?.option_label}>
                <input
                  type="checkbox"
                  value={opt}
                  checked={Array.isArray(el.value) && el.value.includes(opt)}
                  onChange={(e) => {
                    const newVals = Array.isArray(el.value)
                      ? el.value.includes(opt)
                        ? el.value.filter((v) => v !== opt)
                        : [...el.value, opt]
                      : [opt];
                    handleValueChange(el.id, newVals);
                  }}
                  onClick={() => handleSelectElement(el.id)}
                />
                <span className={el.style?.span}>{opt}</span>
              </label>
            ))}
          </div>
        );
     case "button":
      return(
       <div className="flex justify-center mt-6 relative">
        <button
              className={el.style?.button}
              onClick={() => handleDelete(el.id)}
            >
              <RxCross1 />
            </button>
              <button
                type="submit"
                onClick={() => handleSelectElement(el.id)}
                className={el.style?.submit_button}
              >
                Submit
              </button>
            </div>
        
      )
      default:
        return null;
    }
  };

  return (
    <div className="flex w-full gap-6 p-6">
      <div
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className="flex-1 bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-6 min-h-[80vh] overflow-y-auto shadow-inner"
      >
        {elements.length === 0 ? (
          <div className="text-gray-400 text-center italic mt-20">
            Drag and drop elements from the Toolbox
          </div>
        ) : (
          elements.map(renderElement)
        )}
      </div>

      <div className="w-1/3 bg-gray-100 rounded-lg border border-gray-300 p-4">
        <FormPreview />
      </div>

      {showSidebar && selectedId && (
        <RightSideBar
          elements={elements}
          elementID={selectedId}
          handleUpdate={updateElementHandler}
          onClose={() => setShowSidebar(false)}
        />
      )}
    </div>
  );
}
