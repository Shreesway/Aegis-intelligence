import { useState } from "react";

import UploadArea from "../components/upload/UploadArea";
import UploadProgress from "../components/upload/UploadProgress";
import FileList from "../components/upload/FileList";

import { uploadDocument } from "../services/api";

const STORAGE_KEY =
  "aegis_uploaded_files";

export default function Upload() {

  const [file, setFile] =
    useState(null);

  const [progress, setProgress] =
    useState(0);

  const [files, setFiles] = useState(() => {
    try {
      const saved =
        localStorage.getItem(STORAGE_KEY);

      return saved
        ? JSON.parse(saved)
        : [];
    } catch {
      return [];
    }
  });

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  async function handleUpload() {

    if (!file || loading) {
      return;
    }

    setLoading(true);
    setError("");
    setProgress(0);

    const formData =
      new FormData();

    formData.append(
      "file",
      file
    );

    try {

      await uploadDocument(
        formData,
        (event) => {

          if (event.total) {

            const percent =
              Math.round(
                (event.loaded /
                  event.total) *
                  100
              );

            setProgress(percent);
          }

        }
      );

      const updatedFiles = [
        ...files,
        file.name,
      ];

      setFiles(updatedFiles);

      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(updatedFiles)
      );

      setProgress(100);

      setFile(null);

      alert(
        "Document uploaded successfully."
      );

    } catch (err) {

      console.error(
        "Upload error:",
        err
      );

      setError(
        err?.response?.data?.detail ||
        "Upload failed. Please try again."
      );

      setProgress(0);

    } finally {

      setLoading(false);

    }
  }

  return (

    <div className="space-y-8">

      <div>
        <h1 className="text-4xl font-bold">
          Upload Center
        </h1>

        <p className="text-slate-400 mt-2">
          Upload financial documents for AI-powered
          research and RAG analysis.
        </p>
      </div>

      <UploadArea
        file={file}
        onFileChange={setFile}
        onUpload={handleUpload}
      />

      <UploadProgress
        progress={progress}
      />

      {loading && (
        <p className="text-slate-400">
          Processing document...
        </p>
      )}

      {error && (
        <div className="bg-red-500/20 border border-red-500 text-red-300 rounded-xl p-4">
          {error}
        </div>
      )}

      <FileList
        files={files}
      />

    </div>

  );
}