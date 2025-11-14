import { useState } from "react";
import { Link } from "react-router-dom";
import "./FoundItems.css";

export default function FoundItems() {
  const [open, setOpen] = useState(false);

  const foundItems = [
    { title: "ID Card", description: "Found near main gate" },
    { title: "Water Bottle", description: "Transparent bottle, found in canteen" },
    { title: "Notebook", description: "Blue cover notebook found in classroom" },
  ];

  return (
    <div className="found-page">

      <h2 className="found-title">Found Items</h2>

      <div className="found-items-container">
        {foundItems.map((item, index) => (
          <div className="found-card" key={index}>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </div>
        ))}
      </div>

      {/* Dropdown */}
      <div className="dropdown">
        <button className="dropbtn" onClick={() => setOpen(!open)}>
          New Query ▼
        </button>

        {open && (
          <div className="dropdown-content">
            <Link to="/report-found">Report Found Item</Link>
          </div>
        )}
      </div>

    </div>
  );
}
