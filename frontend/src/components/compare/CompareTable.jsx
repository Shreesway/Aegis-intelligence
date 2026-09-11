export default function CompareTable({ data }) {

  if (!data) return null;

  return (
    <div className="bg-slate-800 rounded-2xl p-6 overflow-auto">

      <h2 className="text-2xl font-bold mb-5">
        AI Comparison
      </h2>

      <pre className="whitespace-pre-wrap text-slate-300 leading-8">
        {data}
      </pre>

    </div>
  );

}