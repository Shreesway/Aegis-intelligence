from services.llm import generate_answer


def research_agent(context):
    prompt = """
You are a Senior Equity Research Analyst.

Analyze ONLY the business aspects.

Include:
1. Company Overview
2. Products & Services
3. Industry
4. Competitive Advantages
5. Business Strengths
6. Weaknesses

Keep the analysis concise and professional.
"""

    return generate_answer(prompt, context)