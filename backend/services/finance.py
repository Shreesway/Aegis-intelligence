import yfinance as yf

from services.company_resolver import resolve_company
from services.llm import generate_answer
from services.report_generator import create_report
from agents.orchestrator import run_agents


# ==========================================
# Internal Helper
# ==========================================

def _get_stock(company_name: str):
    """
    Resolve company name into ticker
    then return yfinance object.
    """

    ticker = resolve_company(company_name)

    stock = yf.Ticker(ticker)

    return ticker, stock


# ==========================================
# Company Information
# ==========================================

def get_company_info(company_name: str):

    ticker, stock = _get_stock(company_name)

    info = stock.info

    return {
        "Ticker": ticker,
        "Company": info.get("longName"),
        "Sector": info.get("sector"),
        "Industry": info.get("industry"),
        "Country": info.get("country"),
        "Website": info.get("website"),
        "Market Cap": info.get("marketCap"),
        "Revenue": info.get("totalRevenue"),
        "Net Income": info.get("netIncomeToCommon"),
        "PE Ratio": info.get("trailingPE"),
        "Current Price": info.get("currentPrice"),
        "52 Week High": info.get("fiftyTwoWeekHigh"),
        "52 Week Low": info.get("fiftyTwoWeekLow"),
    }


# ==========================================
# Dashboard
# ==========================================

def dashboard_data(company_name: str):

    ticker, stock = _get_stock(company_name)

    info = stock.info

    return {
        "ticker": ticker,
        "company": info.get("longName"),
        "sector": info.get("sector"),
        "industry": info.get("industry"),
        "market_cap": info.get("marketCap"),
        "pe_ratio": info.get("trailingPE"),
        "dividend_yield": info.get("dividendYield"),
        "fifty_two_week_high": info.get("fiftyTwoWeekHigh"),
        "fifty_two_week_low": info.get("fiftyTwoWeekLow"),
        "current_price": info.get("currentPrice"),
    }


# ==========================================
# AI Analysis
# ==========================================

def analyze_company(company_name: str):

    data = get_company_info(company_name)

    context = "\n".join(

        f"{key}: {value}"

        for key, value in data.items()

    )

    question = """
Analyze this company.

Explain:

• Business Overview
• Financial Health
• Strengths
• Weaknesses
• Risks
• Long-term Investment Outlook
"""

    return generate_answer(question, context)


# ==========================================
# Company Comparison
# ==========================================

def compare_companies(company1: str, company2: str):

    info1 = get_company_info(company1)

    info2 = get_company_info(company2)

    context = f"""
Company 1

{info1}

Company 2

{info2}
"""

    question = """
Compare these companies.

Compare:

- Business
- Revenue
- Profitability
- Market Cap
- PE Ratio
- Financial Health
- Investment Potential

Finally recommend the stronger company.
"""

    return generate_answer(question, context)


# ==========================================
# Multi-Agent Analysis
# ==========================================

def full_company_analysis(company_name: str):

    data = get_company_info(company_name)

    context = "\n".join(

        f"{k}: {v}"

        for k, v in data.items()

    )

    return run_agents(context)


# ==========================================
# PDF Report
# ==========================================

def generate_company_report(company_name: str):

    result = full_company_analysis(company_name)

    filename = create_report(

        company_name,

        result["final_report"]

    )

    return filename