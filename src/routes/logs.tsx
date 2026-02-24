import { readLogs } from "~/lib/blob-log";
import type { Route } from "../../.react-router/types/src/routes/+types.logs";
import { Navbar } from "~/components/Navbar";
import { Footer } from "~/components/Footer";

export async function loader() {
  const logs = await readLogs();
  return { logs };
}

export default function Logs({ loaderData }: Route.ComponentProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-6xl mx-auto px-6 py-12 w-full">
        <h1 className="text-4xl font-bold mb-8">Logs</h1>

        {loaderData.logs.length === 0 ? (
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-gray-600">
            No logs yet.
          </div>
        ) : (
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 w-48">
                    Timestamp
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                    Message
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {loaderData.logs.map((log, idx) => (
                  <tr key={idx} className="hover:bg-gray-50">
                    <td className="px-6 py-3 text-sm text-gray-700 font-mono">
                      {log.timestamp}
                    </td>
                    <td className="px-6 py-3 text-sm text-gray-900 font-mono break-words">
                      {log.message}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
