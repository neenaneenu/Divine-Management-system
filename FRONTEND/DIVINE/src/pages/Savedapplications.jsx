import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const SavedApplications = () => {
  const location = useLocation();
  const [groups, setGroups] = useState([]); // 👈 array of groups

  useEffect(() => {
    // If we receive new savedApps, add them as a new group
    if (location.state?.savedApps) {
      const updatedGroups = [...groups, location.state.savedApps];
      setGroups(updatedGroups);
      localStorage.setItem("savedGroups", JSON.stringify(updatedGroups));
    } else {
      // Load all groups from storage
      const stored = localStorage.getItem("savedGroups");
      if (stored) {
        setGroups(JSON.parse(stored));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.state]); // run when new savedApps come in

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-primary">💾 Saved Applications</h2>

      {groups.length === 0 ? (
        <p className="text-muted">No saved applications found</p>
      ) : (
        groups.map((apps, index) => (
          <div key={index} className="mb-5">
            <h4 className="text-success">📂 Group {index + 1}</h4>
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
                  {apps.map((app) => (
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
          </div>
        ))
      )}
    </div>
  );
};

export default SavedApplications;
