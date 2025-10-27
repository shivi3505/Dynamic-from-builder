export default function LeftSidebar({ toolboxItems }) {
const handleDragStart = (e, item) => {
e.dataTransfer.setData("component", JSON.stringify(item));
};
return (
<div className="flex items-start max-h-full max-w-300">
<div>
<h3>Toolbox</h3>
{toolboxItems.map((item) => (
<div key={item.type} draggable onDragStart={(e) => handleDragStart(e, item)} style={{ padding: 8, margin: "5px 0", border: "1px solid #ccc", cursor: "grab" }}>
{item.label}
</div>
))}
</div>

</div>
);
}