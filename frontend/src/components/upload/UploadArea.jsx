import { Upload } from "lucide-react";

export default function UploadArea({
  onFileChange,
  onUpload,
  file,
}) {
  return (
    <div className="bg-slate-800 border-2 border-dashed border-slate-600 rounded-2xl p-10 text-center">

      <Upload
        size={60}
        className="mx-auto text-blue-500"
      />

      <h2 className="text-2xl font-bold mt-4">
        Upload Documents
      </h2>

      <p className="text-slate-400 mt-2">
        PDF • DOCX • CSV • XLSX • TXT • PPTX
      </p>

      <input
        type="file"
        className="mt-6"
        onChange={(e)=>onFileChange(e.target.files[0])}
      />

      {file && (
        <p className="mt-4 text-green-400">
          Selected: {file.name}
        </p>
      )}

      <button
        onClick={onUpload}
        className="mt-6 bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl"
      >
        Upload
      </button>

    </div>
  );
}