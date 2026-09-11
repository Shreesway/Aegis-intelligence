from concurrent.futures import ThreadPoolExecutor

from agents.research_agent import research_agent
from agents.finance_agent import finance_agent
from agents.risk_agent import risk_agent
from agents.report_agent import report_agent


def run_agents(context):

    with ThreadPoolExecutor(max_workers=3) as executor:

        research_future = executor.submit(research_agent, context)
        finance_future = executor.submit(finance_agent, context)
        risk_future = executor.submit(risk_agent, context)

        research = research_future.result()
        finance = finance_future.result()
        risk = risk_future.result()

    combined = f"""
==============================
RESEARCH ANALYSIS
==============================

{research}

==============================
FINANCIAL ANALYSIS
==============================

{finance}

==============================
RISK ANALYSIS
==============================

{risk}
"""

    final_report = report_agent(combined)

    return {
        "research": research,
        "finance": finance,
        "risk": risk,
        "final_report": final_report,
    }