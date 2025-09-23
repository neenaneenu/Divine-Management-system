import { useLocation } from "react-router-dom";

const SavedApplications = () => {
  const location = useLocation();
  const savedApps = location.state?.savedApps || [];
  
  return (
    <div>
      <h2>💾 Saved Applications</h2>
      {savedApps.length === 0 ? (
        <p>No saved applications found</p>
      ) : (
        <ul>
          {savedApps.map((app) => (
            <li key={app._id}>{app.applicationNumber} - {app.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SavedApplications;
