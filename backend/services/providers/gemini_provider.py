import os
import concurrent.futures
from google import genai
from google.genai.errors import ClientError

client = genai.Client(
    api_key=os.getenv("GEMINI_API_KEY")
)

def _generate_sync(model, prompt):
    """Internal synchronous function to make the API call"""
    response = client.models.generate_content(
        model=model,
        contents=prompt
    )
    return response.text

def generate(model, question, context):
    prompt = f"""
Context

{context}

-------------------------

Question

{question}
"""
    # Enforce a strict 5-second timeout to force fast failover to Ollama
    try:
        with concurrent.futures.ThreadPoolExecutor() as executor:
            future = executor.submit(_generate_sync, model, prompt)
            # If Gemini doesn't answer in 5 seconds, it raises a TimeoutError
            return future.result(timeout=5.0)
    except concurrent.futures.TimeoutError:
        raise Exception("Gemini request timed out after 5 seconds.")
    except Exception as e:
        raise e