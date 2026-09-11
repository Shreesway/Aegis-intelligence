export default function FileList({
  files,
}) {

  return (

    <div className="bg-slate-800 rounded-xl p-5">

      <h2 className="text-xl font-bold mb-5">
        Uploaded Files
      </h2>

      {files.length===0 && (
        <p className="text-slate-400">
          No uploads yet.
        </p>
      )}

      {files.map((file,index)=>(
        <div
          key={index}
          className="border-b border-slate-700 py-3"
        >
          {file}
        </div>
      ))}

    </div>

  );

}