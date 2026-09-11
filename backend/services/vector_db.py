import uuid
import chromadb
from config import CHROMA_DB_PATH, COLLECTION_NAME

client = chromadb.PersistentClient(path=CHROMA_DB_PATH)

collection = client.get_or_create_collection(
    name=COLLECTION_NAME
)


def store_embeddings(chunks, embeddings, source):

    ids = [str(uuid.uuid4()) for _ in chunks]

    metadatas = [
        {
            "source": source,
            "chunk": i + 1
        }
        for i in range(len(chunks))
    ]

    collection.add(
        ids=ids,
        documents=chunks,
        embeddings=embeddings.tolist(),
        metadatas=metadatas
    )


def search_documents(query_embedding, n_results=5):

    return collection.query(
        query_embeddings=[query_embedding.tolist()],
        n_results=n_results
    )