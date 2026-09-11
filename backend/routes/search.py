from fastapi import APIRouter

from logger import logger

from services.embedding import model
from services.vector_db import search_documents
from services.llm import generate_answer

router = APIRouter()


@router.get("/search")
def search(query: str):

    try:

        logger.info(f"Query: {query}")

        query_embedding = model.encode(query)

        results = search_documents(query_embedding)

        documents = results.get("documents", [])

        if not documents or len(documents[0]) == 0:

            return {

                "question": query,

                "answer": "No relevant documents found. Please upload a document first."

            }

        context = "\n\n".join(documents[0])

        answer = generate_answer(query, context)

        return {

            "question": query,

            "answer": answer

        }

    except Exception as e:

        logger.error(str(e))

        return {

            "question": query,

            "answer": f"Search failed: {str(e)}"

        }