from services.llm import generate_answer


def report_agent(context):
    prompt = """
You are an Investment Report Writer.

Using all analyses provided, generate a professional report.

Sections:

1. Executive Summary
2. Business Overview
3. Financial Analysis
4. Risk Assessment
5. Investment Recommendation
6. Overall Rating (Strong Buy, Buy, Hold, Sell)

Write in a professional report format.
"""

    return generate_answer(prompt, context)