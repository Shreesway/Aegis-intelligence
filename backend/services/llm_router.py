from services.providers import ollama_provider


def generate_answer(question, context):
    """
    Generate an AI response using the local Ollama model.

    Ollama provider is the primary and only provider for now.
    """

    try:
        print("Using Ollama / Qwen3 4B")

        return ollama_provider.generate(
            question,
            context
        )

    except Exception as e:
        print("Ollama generation failed:")
        print(e)

        raise