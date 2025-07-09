import { useEffect, useState } from "react";
import { apiPost } from "../../utils/api";

export default function MatrixStatus({
  wallet,
}: {
  wallet: string;
}) {
  const [matrix, setMatrix] = useState<any>(null);

  useEffect(() => {
    apiPost("/api/matrix", { wallet }).then(setMatrix);
  }, [wallet]);

  return (
    <div className="card">
      <h3 className="text-lg font-semibold mb-2">
        Matrix Status
      </h3>
      {matrix ? (
        <div>
          <div>Stage: {matrix.stage || "—"}</div>
          <div>
            Joined:{" "}
            {matrix.joinedAt
              ? new Date(matrix.joinedAt).toLocaleString()
              : "—"}
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}
