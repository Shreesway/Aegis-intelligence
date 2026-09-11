import os
import yfinance as yf
import matplotlib.pyplot as plt

from services.company_resolver import resolve_company

CHARTS_DIR = "charts"
os.makedirs(CHARTS_DIR, exist_ok=True)


def generate_stock_chart(company_name: str):

    # Convert company name -> ticker
    ticker = resolve_company(company_name)

    stock = yf.Ticker(ticker)

    history = stock.history(period="6mo")

    if history.empty:
        raise Exception(
            f"No stock history found for {company_name}"
        )

    filename = os.path.join(
        CHARTS_DIR,
        f"{ticker}_stock.png"
    )

    plt.figure(figsize=(10, 5))

    plt.plot(
        history.index,
        history["Close"],
        linewidth=2
    )

    plt.title(f"{company_name} ({ticker})")

    plt.xlabel("Date")

    plt.ylabel("Closing Price")

    plt.grid(True)

    plt.tight_layout()

    plt.savefig(filename)

    plt.close()

    return filename