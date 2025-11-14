import { useState } from "react";
import { Link } from "react-router-dom";
import "./LostItems.css";

export default function LostItems() {
  const [open, setOpen] = useState(false);

  const items = [
    { title: "ID Card", description: "Student id found near libary" },
    { title: "Mobile Phone", description: "White color sansumg" },
    { title: "Bag", description: "Blue color bag" },
  ];

  return (
    <div className="lost-page">

      <h2 className="lost-title">Lost Items</h2>

      <div className="lost-items-container">
        {items.map((item, index) => (
          <div className="lost-card" key={index}>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </div>
        ))}
      </div>

      {/* Dropdown section */}
      <div className="dropdown">
        <button className="dropbtn" onClick={() => setOpen(!open)}>
          New Query ▼
        </button>

        {open && (
          <div className="dropdown-content">
            <Link to="/report-lost">Report Lost Item</Link>
          </div>
        )}
      </div>

    </div>
  );
}
