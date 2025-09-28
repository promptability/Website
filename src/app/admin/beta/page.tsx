import { getApps, initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

export const dynamic = 'force-dynamic';

function initAdmin() {
  if (getApps().length === 0) {
    initializeApp({
      credential: cert({
        projectId: process.env.FIREBASE_PROJECT_ID!,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL!,
        privateKey: process.env.FIREBASE_PRIVATE_KEY!.replace(/\\n/g, "\n"),
      }),
    });
  }
}

export default async function Page() {
  initAdmin();
  const db = getFirestore();
  
  // Fetch latest responses
  const snap = await db
    .collection("promptabilityBetaResponses")
    .orderBy("meta.receivedAt", "desc")
    .limit(200)
    .get();

  const rows = snap.docs.map((d) => ({ id: d.id, ...d.data() }));

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-7xl">
        <h1 className="text-2xl font-bold mb-6">Promptability Beta Responses</h1>
        <div className="bg-white rounded-xl shadow-sm">
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-4 py-3 text-left font-medium text-gray-700">Time</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-700">Type</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-700">Email</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-700">Tester/Cohort</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-700">Key Responses</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {rows.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-4 py-8 text-center text-gray-500">
                      No responses yet
                    </td>
                  </tr>
                ) : (
                  rows.map((r: any, i: number) => (
                    <tr key={r.id} className={i % 2 ? "bg-gray-50" : "bg-white"}>
                      <td className="px-4 py-3 text-gray-900">
                        {r.meta?.receivedAt ? new Date(r.meta.receivedAt).toLocaleString() : "-"}
                      </td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                          r.surveyType === 'short' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                        }`}>
                          {r.surveyType === 'short' ? 'Short' : 'Full'}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-gray-900">{r.email || "-"}</td>
                      <td className="px-4 py-3 text-gray-600">
                        <div className="text-xs">
                          <div>Tester: {r.meta?.tester || "-"}</div>
                          <div>Cohort: {r.meta?.cohort || "-"}</div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-gray-600">{r.meta?.source || "-"}</td>
                      <td className="px-4 py-3 text-gray-600">
                        <div className="text-xs space-y-1">
                          <div>Clarity: <span className="font-medium">{r.responses?.onb_perm_clarity || "-"}</span></div>
                          <div>Speed: <span className="font-medium">{r.responses?.perf_generation_speed || "-"}</span></div>
                          <div>Continue: <span className="font-medium">{r.responses?.overall_continue_use || "-"}</span></div>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
        
        <div className="mt-6 text-sm text-gray-500">
          Showing latest {rows.length} responses. Total in collection: {rows.length}
        </div>
      </div>
    </div>
  );
}