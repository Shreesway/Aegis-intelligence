from services.llm import generate_answer


def finance_agent(context):
    prompt = """
You are a Chartered Financial Analyst.

Analyze ONLY the financial performance.

Include:
1. Revenue
2. Market Capitalization
3. Profitability
4. PE Ratio
5. Financial Health
6. Growth Potential

Explain each point clearly.
"""

    return generate_answer(prompt, context)