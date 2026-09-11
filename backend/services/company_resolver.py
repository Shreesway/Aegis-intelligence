from functools import lru_cache
import requests

YAHOO_SEARCH_URL = "https://query2.finance.yahoo.com/v1/finance/search"

HEADERS = {
    "User-Agent": (
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
        "AppleWebKit/537.36 (KHTML, like Gecko) "
        "Chrome/138.0 Safari/537.36"
    )
}


class CompanyNotFound(Exception):
    pass


@lru_cache(maxsize=500)
def resolve_company(company_name: str) -> str:
    """
    Resolve company name into Yahoo Finance ticker.

    Examples
    --------
    Apple -> AAPL
    Microsoft -> MSFT
    NVIDIA -> NVDA
    Reliance Industries -> RELIANCE.NS
    Toyota -> 7203.T
    """

    company_name = company_name.strip()

    if not company_name:
        raise CompanyNotFound("Company name cannot be empty.")

    params = {
        "q": company_name,
        "quotesCount": 10,
        "newsCount": 0
    }

    response = requests.get(
        YAHOO_SEARCH_URL,
        params=params,
        headers=HEADERS,
        timeout=10
    )

    response.raise_for_status()

    data = response.json()

    quotes = data.get("quotes", [])

    if not quotes:
        raise CompanyNotFound(
            f"No company found for '{company_name}'."
        )

    # Prefer real stocks
    for quote in quotes:

        if quote.get("quoteType") == "EQUITY":
            return quote["symbol"]

    return quotes[0]["symbol"]