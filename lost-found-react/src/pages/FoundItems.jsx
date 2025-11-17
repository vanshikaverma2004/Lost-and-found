import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./FoundItems.css";

export default function FoundItems() {
  const [open, setOpen] = useState(false);
  const [foundItems, setFoundItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch found items from backend
  useEffect(() => {
    async function fetchItems() {
      try {
        const response = await fetch("http://localhost:5000/api/found-items");
        if (!response.ok) {
          throw new Error("Failed to fetch items.");
        }

        const data = await response.json();
        setFoundItems(data); // Set real fetched data
      } catch (err) {
        setError("Failed to load found items.");
      } finally {
        setLoading(false);
      }
    }

    fetchItems();
  }, []);

  return (
    <div className="found-page">

      <h2 className="found-title">Found Items</h2>

      {/* Loading State */}
      {loading && <p style={{ textAlign: "center" }}>Loading...</p>}

      {/* Error State */}
      {error && <p style={{ textAlign: "center", color: "red" }}>{error}</p>}

      <div className="found-items-container">
  {foundItems.map((item) => (
    <Link
      to={`/found/${item.id}`}
      key={item.id}
      className="found-card-link"
    >
      <div className="found-card">
        <h3>{item.title}</h3>
        <p>{item.description}</p>
        <p><b>Location:</b> {item.location}</p>
        <p><b>Finder:</b> {item.name}</p>
        <p><b>Date:</b> {item.date_found}</p>
      </div>
    </Link>
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
