import { useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import { setFormData } from "../slices/formslice";
import JSZip from "jszip";
import { saveAs } from "file-saver";
export default function FormPreview() {
  
 
  const elements = useSelector((state) => state.form.elements);
  const formData = useSelector((state) => state.form.formData);
  const dispatch = useDispatch();

  const handleChange = (id, value) => {
    dispatch(setFormData({ [id]: value }));
  };

 

  const renderElement = (el) => {
    switch (el.type) {
      case "text":
        return (
          <div key={el.id} className="mb-5">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {el.label}
              {el.isRequired && <span className="text-red-500 ml-1">*</span>}
            </label>
            <input
              type="text"
              placeholder={el.placeholder || ""}
              required={el.isRequired}
              value={formData[el.id] || ""}
              onChange={(e) => handleChange(el.id, e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
            />
          </div>
        );

      case "textarea":
        return (
          <div key={el.id} className="mb-5">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {el.label}
              {el.isRequired && <span className="text-red-500 ml-1">*</span>}
            </label>
            <textarea
              rows="4"
              placeholder={el.placeholder || ""}
              required={el.isRequired}
              value={formData[el.id] || ""}
              onChange={(e) => handleChange(el.id, e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
            />
          </div>
        );

      case "dropdown":
        return (
          <div key={el.id} className="mb-5">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {el.label}
            </label>
            <select
              required={el.isRequired}
              value={formData[el.id] || ""}
              onChange={(e) => handleChange(el.id, e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
            >
              <option value="">Select an option</option>
              {el.options?.map((option, i) => (
                <option key={i} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        );

      case "radio":
        return (
          <div key={el.id} className="mb-5">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {el.label}
            </label>
            {el.options?.map((option, i) => (
              <label key={i} className="flex items-center mb-1">
                <input
                  type="radio"
                  name={`radio-${el.id}`}
                  value={option}
                  checked={formData[el.id] === option}
                  onChange={(e) => handleChange(el.id, e.target.value)}
                  className="mr-2 text-blue-500 focus:ring-blue-400"
                />
                <span className="text-gray-700 text-sm">{option}</span>
              </label>
            ))}
          </div>
        );

      case "checkbox":
        return (
          <div key={el.id} className="mb-5">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {el.label}
            </label>
            {el.options?.map((option, i) => (
              <label key={i} className="flex items-center mb-1">
                <input
                  type="checkbox"
                  value={option}
                  checked={
                    Array.isArray(formData[el.id]) &&
                    formData[el.id].includes(option)
                  }
                  onChange={(e) => {
                    const checked = e.target.checked;
                    const current = Array.isArray(formData[el.id])
                      ? formData[el.id]
                      : [];
                    const updated = checked
                      ? [...current, option]
                      : current.filter((v) => v !== option);
                    handleChange(el.id, updated);
                  }}
                  className="mr-2 text-blue-500 focus:ring-blue-400"
                />
                <span className="text-gray-700 text-sm">{option}</span>
              </label>
            ))}
          </div>
        );
        case "button":
              return(
               <div className="flex justify-center mt-6 relative">
                
                      <button
                        type="submit"
                        onClick={() => handleSelectElement(el.id)}
                        className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-all"
                      >
                        Submit
                      </button>
                    </div>
                
              )
      default:
        return null;
    }
  };

  const generateHTML = () => {
    const formElementsHTML = elements
      .map((el) => {
        switch (el.type) {
          case "text":
            return `<div class="mb-5">
              <label class="${el.style.label}">
                ${el.label}${el.isRequired ? '<span class="text-red-500 ml-1">*</span>' : ''}
              </label>
              <input type="text" placeholder="${el.placeholder || ""}" value="${
              formData[el.id] || ""
            }" class="${el.style.input}" ${
              el.isRequired ? "required" : ""
            } />
            </div>`;
          case "textarea":
            return `<div class="mb-5">
              <label class="${el.style.label}">
                ${el.label}${el.isRequired ? '<span class="text-red-500 ml-1">*</span>' : ''}
              </label>
              <textarea rows="4" placeholder="${el.placeholder || ""}" class="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none" ${
              el.isRequired ? "required" : ""
            }>${formData[el.id] || ""}</textarea>
            </div>`;
          case "dropdown":
            return `<div class="mb-5">
              <label class="${el.style.label}>${el.label}</label>
              <select class="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none" ${
              el.isRequired ? "required" : ""
            }>
                <option value="">Select an option</option>
                ${el.options
                  ?.map(
                    (opt) =>
                      `<option value="${opt}" ${
                        formData[el.id] === opt ? "selected" : ""
                      }>${opt}</option>`
                  )
                  .join("")}
              </select>
            </div>`;
          case "radio":
            return `<div class="mb-5">
              <label class="${el.style.label}>${el.label}</label>
              ${el.options
                ?.map(
                  (opt) =>
                    `<label class="flex items-center mb-1"><input type="radio" name="radio-${el.id}" value="${opt}" ${
                      formData[el.id] === opt ? "checked" : ""
                    } class="mr-2 text-blue-500 focus:ring-blue-400"/><span class="text-gray-700 text-sm">${opt}</span></label>`
                )
                .join("")}
            </div>`;
          case "checkbox":
            return `<div class="mb-5">
              <label class="${el.style.label}>${el.label}</label>
              ${el.options
                ?.map(
                  (opt) =>
                    `<label class="flex items-center mb-1"><input type="checkbox" value="${opt}" ${
                      Array.isArray(formData[el.id]) &&
                      formData[el.id].includes(opt)
                        ? "checked"
                        : ""
                    } class="mr-2 text-blue-500 focus:ring-blue-400"/><span class="text-gray-700 text-sm">${opt}</span></label>`
                )
                .join("")}
            </div>`
             case "button":
                  return
                   `<div class="flex justify-center mt-6 relative">
                    
                          <button
                            type="submit"
                            class="${el.style?.submit_button}"
                          >
                            Submit
                          </button>
                        </div>`;
                    
                  
          default:
            return "";
        }
      })
      .join("");

    const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>Exported Form</title>
<script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
</head>
<body class="p-6">
  <div class="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-md border border-gray-200">
    <h2 class="text-xl font-semibold text-center text-gray-700 mb-6">Form</h2>
    <form id="exportedForm">
      ${formElementsHTML}
     
    </form>
  </div>
  <script>
  document.getElementById("exportedForm").addEventListener("submit", function(e){
  e.preventDefault();
  const data = {};
  Array.from(this.elements).forEach(el => {
    if(el.name){
      if(el.type === "checkbox"){
        data[el.name] = data[el.name] || [];
        if(el.checked) data[el.name].push(el.value);
      } else if(el.type === "radio"){
        if(el.checked) data[el.name] = el.value;
      } else {
        data[el.name] = el.value;
      }
    }
  });
  console.log("Form submitted:", data);
  alert("Form submitted! Check console for data.");
});
  </script>
</body>
</html>`;

    return html;
  };

 
  const handleExport = async () => {
    const zip = new JSZip();
    zip.file("index.html", generateHTML());
    
    const content = await zip.generateAsync({ type: "blob" });
    saveAs(content, `exported${Date.now()}-form.zip`);
  };

  return (
    <>
     <div className="flex justify-end ">
        <button
          onClick={handleExport}
          className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-all m-4"
        >
          Export Form
        </button>
      </div>
     <div className="w-full">
      
     

     
     
        <h2 className="text-xl font-semibold text-center text-gray-700 mb-6">
          Form 
        </h2>

        {elements.length === 0 ? (
          <p className="text-gray-400 italic text-center">
            No elements added yet
          </p>
        ) : (
          <form >
            {elements.map(renderElement)}

            
          </form>
        )}
     

    </div>
    </>
   
  );
}
