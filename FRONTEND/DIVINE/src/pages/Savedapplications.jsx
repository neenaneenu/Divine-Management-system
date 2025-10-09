import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const SavedApplications = () => {
  const location = useLocation();
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    if (location.state?.savedApps) {
      const updatedGroups = [...groups, location.state.savedApps];
      setGroups(updatedGroups);
      localStorage.setItem("savedGroups", JSON.stringify(updatedGroups));
    } else {
      const stored = localStorage.getItem("savedGroups");
      if (stored) {
        setGroups(JSON.parse(stored));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.state]);

  const allApps = groups.flat();

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-primary">💾 Saved Applications</h2>

      {allApps.length === 0 ? (
        <p className="text-muted">No saved applications found</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered table-hover table-striped align-middle">
            <thead className="table-dark">
              <tr>
                <th>Name</th>
                <th>Application No</th>
                <th>DOB</th>
                <th>Mobile</th>
                <th>Vehicle Class</th>
              </tr>
            </thead>
            <tbody>
              {allApps.map((app) => (
                <tr key={app._id}>
                  <td>{app.name}</td>
                  <td>{app.applicationNumber}</td>
                  <td>{new Date(app.dob).toLocaleDateString()}</td>
                  <td>{app.mobile1}</td>
                  <td>{app.vehicleClass}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default SavedApplications;
