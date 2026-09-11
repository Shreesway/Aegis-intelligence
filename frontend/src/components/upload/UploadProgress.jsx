export default function UploadProgress({
  progress,
}) {

  return (
    <div className="bg-slate-800 rounded-xl p-5">

      <p className="mb-3">
        Upload Progress
      </p>

      <div className="w-full bg-slate-700 rounded-full h-4">

        <div
          className="bg-blue-500 h-4 rounded-full transition-all"
          style={{
            width: `${progress}%`
          }}
        />

      </div>

      <p className="mt-2">
        {progress}%
      </p>

    </div>
  );

}