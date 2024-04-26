import { useEffect, useState } from "react";
import * as API from "../api";

function AppStatus() {
  const [status, setStatus] = useState<string | null>(null);
  useEffect(() => {
    fetchAppStatus();

    async function fetchAppStatus() {
      const { msg } = await API.getAppStatus();
      if (msg) {
        setStatus(msg);
      }
    }
  }, []);

  if (!status) {
    return null;
  }
  return (
    <div role="status" className="w-full text-center bg-red-500">
      {status}
    </div>
  );
}

export default AppStatus;
