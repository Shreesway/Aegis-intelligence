from services.llm import generate_answer


def research_agent(context):
    question = (
        "Summarize the company's business, industry, "
        "products, and competitive position."
    )

    return generate_answer(question, context)

