import { useState } from "react";
import axios from "axios";

export default function ZoomPanel() {
  const [meetingID, setMeetingID] = useState("");
  const [password, setPassword] = useState("");
  const [numUsers, setNumUsers] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!meetingID || !password || !numUsers) {
      alert("Please fill in all fields");
      return;
    }

    setLoading(true);
    try {
      await axios.post("https://your-ngrok-url.ngrok.io/start", {
        meetingID,
        password,
        numUsers: parseInt(numUsers, 10),
      });
      alert("Users added successfully!");
    } catch (error) {
      alert("Failed to add users");
    }
    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-96 p-6 shadow-lg bg-white rounded-lg">
        <h2 className="text-xl font-bold mb-4 text-center">Zoom Bot Control Panel</h2>
        <input
          type="text"
          placeholder="Meeting ID"
          value={meetingID}
          onChange={(e) => setMeetingID(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded mb-2"
        />
        <input
          type="text"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded mb-2"
        />
        <input
          type="number"
          placeholder="Number of Users"
          value={numUsers}
          onChange={(e) => setNumUsers(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded mb-4"
        />
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          {loading ? "Processing..." : "Start Bots"}
        </button>
      </div>
    </div>
  );
}