import os
from reportlab.platypus import SimpleDocTemplate, Paragraph
from reportlab.lib.styles import getSampleStyleSheet

REPORTS_DIR = "reports"
os.makedirs(REPORTS_DIR, exist_ok=True)


def create_report(company_name, report_text):

    filename = os.path.join(
        REPORTS_DIR,
        f"{company_name}_Analysis_Report.pdf"
    )

    doc = SimpleDocTemplate(filename)
    styles = getSampleStyleSheet()

    story = []

    story.append(Paragraph("Aegis Intelligence", styles["Title"]))
    story.append(Paragraph("<b>Financial Research Report</b>", styles["Heading1"]))
    story.append(Paragraph(f"<b>Company:</b> {company_name}", styles["Heading2"]))
    story.append(Paragraph(report_text.replace("\n", "<br/>"), styles["BodyText"]))

    doc.build(story)

    return filename