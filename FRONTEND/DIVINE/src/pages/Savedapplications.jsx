import { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const SavedApplications = () => {
  const [savedApps, setSavedApps] = useState([]);
  const [groupedApps, setGroupedApps] = useState({});
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  // ✅ Fetch all saved applications from backend
  useEffect(() => {
    const fetchSavedApps = async () => {
      try {
        const response = await axios.get("http://localhost:3000/saved/getSave");
        const apps = response.data;

        setSavedApps(apps);
        setGroupedApps(groupByTestDate(apps)); // group by testDate
      } catch (error) {
        console.error("❌ Error fetching saved applications:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSavedApps();
  }, []);

  // ✅ Group applications by `testDate`
  const groupByTestDate = (apps) => {
    const grouped = {};
    apps.forEach((app) => {
      const dateKey = app.testDate
        ? new Date(app.testDate).toLocaleDateString()
        : "No Test Date"; // handle missing testDate
      if (!grouped[dateKey]) grouped[dateKey] = [];
      grouped[dateKey].push(app);
    });
    return grouped;
  };

  // ✅ Handle search
const handleSearch = () => {
  const filtered = savedApps.filter((app) => {
    // Safety checks + lowercase conversion
    const name = (app.name || "").toLowerCase();
    const appNo = (app.applicationNumber || "").toLowerCase();
    const testDate = app.testDate
      ? new Date(app.testDate).toLocaleDateString().toLowerCase()
      : "";

    const term = searchTerm.toLowerCase();

    return (
      name.includes(term) ||
      appNo.includes(term) ||
      testDate.includes(term)
    );
  });

  setGroupedApps(groupByTestDate(filtered));
};

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-primary">💾 Saved Applications</h2>

      {/* 🔍 Search Section */}
      <div className="d-flex mb-3 gap-2">
        <input
          type="text"
          className="form-control"
          placeholder="Search by Name or Application No..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="btn btn-primary" onClick={handleSearch}>
          Search
        </button>
      </div>

      {loading ? (
        <p className="text-muted">Loading applications...</p>
      ) : Object.keys(groupedApps).length === 0 ? (
        <p className="text-muted">No matching applications found</p>
      ) : (
        Object.entries(groupedApps)
          .sort((a, b) => new Date(b[0]) - new Date(a[0])) // sort newest testDate first
          .map(([date, apps]) => (
            <div key={date} className="mb-5">
              <h5 className="bg-success text-white p-2 rounded">
                📅 Test Date: {date}
              </h5>
              <div className="table-responsive">
                <table className="table table-bordered table-hover table-striped align-middle">
                  <thead className="table-dark">
                    <tr>
                      <th>Name</th>
                      <th>Application No</th>
                      <th>DOB</th>
                      <th>Mobile</th>
                      <th>Vehicle Class</th>
                      <th>Test Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {apps.map((app) => (
                      <tr key={app._id}>
                        <td>{app.name}</td>
                        <td>{app.applicationNumber}</td>
                        <td>{new Date(app.dob).toLocaleDateString()}</td>
                        <td>{app.mobile1}</td>
                        <td>{app.vehicleClass}</td>
                        <td>
                          {app.testDate
                            ? new Date(app.testDate).toLocaleDateString()
                            : "Not Assigned"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))
      )}
    </div>
  );
};

export default SavedApplications;
