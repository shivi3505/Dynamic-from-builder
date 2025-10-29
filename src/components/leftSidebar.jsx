export default function LeftSidebar({ toolboxItems = [] }) {
  const handleDragStart = (e, item) => {
    
    e.dataTransfer.setData("application/json", JSON.stringify(item));
    e.dataTransfer.effectAllowed = "copy";
  };

  return (
    <aside className="flex flex-col h-full w-64 bg-gray-100 border-r border-gray-300 p-4">
      <h3 className="text-lg font-semibold text-center mb-4">Toolbox</h3>

      <div className="flex flex-col gap-3 overflow-y-auto">
        {toolboxItems.map((item) => (
          <div
            key={item.id || item.type}
            draggable
            onDragStart={(e) => handleDragStart(e, item)}  
            title={`Drag to add a ${item.label}`}
            className="flex items-center justify-center cursor-move bg-white border border-gray-200 rounded-md p-3 hover:bg-blue-50 hover:border-blue-300 transition-all"
          >
            <p className="text-gray-700 font-medium">{item.label}</p>
          </div>
        ))}
      </div>
    </aside>
  );
}
