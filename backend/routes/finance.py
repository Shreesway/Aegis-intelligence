from fastapi import APIRouter
from fastapi.responses import FileResponse

from services.finance import (
    get_company_info,
    dashboard_data,
    analyze_company,
    compare_companies,
    full_company_analysis,
    generate_company_report,
)

from services.charts import generate_stock_chart

router = APIRouter(tags=["Finance"])


# =====================================================
# Company Information
# =====================================================

@router.get("/company")
def company(company: str):

    return get_company_info(company)


# =====================================================
# Dashboard
# =====================================================

@router.get("/dashboard")
def dashboard(company: str):

    return dashboard_data(company)


# =====================================================
# AI Analysis
# =====================================================

@router.get("/analyze")
def analyze(company: str):

    return {
        "analysis": analyze_company(company)
    }


# =====================================================
# Company Comparison
# =====================================================

@router.get("/compare")
def compare(company1: str, company2: str):

    return {
        "comparison": compare_companies(
            company1,
            company2
        )
    }


# =====================================================
# Multi-Agent Analysis
# =====================================================

@router.get("/full-analysis")
def full_analysis(company: str):

    return full_company_analysis(company)


# =====================================================
# Download Report
# =====================================================

@router.get("/download-report")
def download_report(company: str):

    report = generate_company_report(company)

    return FileResponse(
        path=report,
        filename=report.split("/")[-1],
        media_type="application/pdf",
    )


# =====================================================
# Stock Chart
# =====================================================

@router.get("/stock-chart")
def stock_chart(company: str):

    chart = generate_stock_chart(company)

    return FileResponse(
        path=chart,
        media_type="image/png",
        filename=f"{company}.png",
    )