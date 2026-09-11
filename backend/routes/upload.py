from fastapi import APIRouter, UploadFile, File
import os
import shutil

from services.document_loader import load_document
from services.chunker import chunk_text
from services.embedding import create_embeddings
from services.vector_db import store_embeddings
from logger import logger

router = APIRouter()

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)


@router.post("/upload")
async def upload_pdf(file: UploadFile = File(...)):
    try:
        file_path = os.path.join(UPLOAD_DIR, file.filename)

        # Save PDF
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        logger.info(f"Uploaded: {file.filename}")

        # Read PDF
        text = load_document(file_path)

        # Create Chunks
        chunks = chunk_text(text)
        logger.info(f"Created {len(chunks)} chunks")

        # Create Embeddings
        embeddings = create_embeddings(chunks)

        # Store in ChromaDB
        store_embeddings(
    chunks,
    embeddings,
    file.filename
)
        logger.info(f"Stored {len(embeddings)} embeddings")

        # Debug Output
        print("\n===== CHROMADB =====")
        print(f"Stored {len(chunks)} chunks successfully.")
        print("====================\n")

        print("\n===== EMBEDDINGS =====")
        print(f"Total Chunks: {len(chunks)}")
        print(f"Embedding Dimension: {len(embeddings[0])}")

        print("\nFirst 10 numbers of first embedding:")
        print(embeddings[0][:10])

        return {
            "message": "Upload successful",
            "filename": file.filename
        }

    except Exception as e:
        logger.error(f"Upload Error: {str(e)}")
        return {
            "error": str(e)
        }