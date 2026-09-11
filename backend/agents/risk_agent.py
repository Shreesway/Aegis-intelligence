from services.llm import generate_answer


def risk_agent(context):
    prompt = """
You are a Financial Risk Consultant.

Identify:

1. Business Risks
2. Financial Risks
3. Market Risks
4. Long-Term Risks
5. Industry Risks

Provide a professional risk assessment.
"""

    return generate_answer(prompt, context)