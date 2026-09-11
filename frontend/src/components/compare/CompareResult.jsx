export default function CompareResult({ result }) {

  if (!result) return null;

  return (

    <div className="bg-slate-800 rounded-2xl p-6">

      <h2 className="text-xl font-bold mb-4">
        AI Recommendation
      </h2>

      <div className="text-slate-300 whitespace-pre-wrap leading-8">
        {result}
      </div>

    </div>

  );

}