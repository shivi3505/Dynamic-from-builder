export default function LeftSidebar({ toolboxItems }) {
const handleDragStart = (e, item) => {
e.dataTransfer.setData("text/plain", JSON.stringify(item));
};
return (
<div className="flex items-center justify-center h-full max-w-100 bg-gray-200">
<div className="items-center">
<h3 className="text-center font-bold mb-3">Toolbox</h3>
{toolboxItems.map((item) => (
<div key={item.type} className="m-3 border-1 p-3" draggable onDragStart={(e) => handleDragStart(e, item)} >
{item.label}
</div>
))}
</div>

</div>
);
}