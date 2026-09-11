from ollama import Client
from config import OLLAMA_HOST
from config import OLLAMA_MODEL

# Force IPv4 to prevent Windows localhost connection issues
safe_host = OLLAMA_HOST.replace("localhost", "127.0.0.1")

client = Client(
    host=safe_host
)

def generate(question, context):
    system_prompt = (
        "You are a concise financial assistant. "
        "Answer directly and concisely."
    )
    
    prompt = f"""
Context:
{context}

----------------------

Question:
{question}
"""

    response = client.chat(
        model=OLLAMA_MODEL,
        messages=[
            {
                "role": "system",
                "content": system_prompt
            },
            {
                "role": "user",
                "content": prompt
            }
        ],
        options={
            "temperature": 0.2
        },
        # Explicitly turn off the reasoning trace so tokens are used for the actual answer
        think=False
    )

    text = response["message"]["content"]
    
    # Failsafe: Clean up tags in case the model ignores the flag
    if "</think>" in text:
        text = text.split("</think>")[-1].strip()
        
    return text.strip() or "No insights could be generated for this company."