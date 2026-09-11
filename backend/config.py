import os
from dotenv import load_dotenv

load_dotenv()


# ==========================================
# Embedding Model
# ==========================================

EMBEDDING_MODEL = "all-MiniLM-L6-v2"


# ==========================================
# ChromaDB
# ==========================================

CHROMA_DB_PATH = "database"

COLLECTION_NAME = "documents"


# ==========================================
# Chunking
# ==========================================

CHUNK_SIZE = 500

CHUNK_OVERLAP = 100


# ==========================================
# Search
# ==========================================

TOP_K = 3


# ==========================================
# Local LLM — Ollama
# ==========================================

OLLAMA_MODEL = "qwen3:4b"

OLLAMA_HOST = "http://localhost:11434"