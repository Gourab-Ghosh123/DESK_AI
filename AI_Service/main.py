from fastapi import FastAPI, HTTPException

from schemas.ticket_schema import (
    TicketRequest,
    TicketAnalysis,
    ResponseRequest,
    ResponseResult
)

from services.ticket_ai import analyze_ticket
from services.response_ai import generate_response


app = FastAPI(
    title="DeskAI AI Service",
    description="AI service for customer support ticket analysis",
    version="1.0.0"
)


@app.get("/")
def home():
    return {
        "message": "DeskAI AI Service is running..."
    }


@app.post(
    "/analyze-ticket",
    response_model=TicketAnalysis
)
def analyze_ticket_endpoint(ticket: TicketRequest):

    try:

        result = analyze_ticket(
            ticket.title,
            ticket.description
        )

        return result

    except Exception as error:

        raise HTTPException(
            status_code=500,
            detail="Ticket analysis failed"
        )


@app.post(
    "/generate-response",
    response_model=ResponseResult
)
def generate_response_endpoint(request: ResponseRequest):

    try:

        response = generate_response(
            request.title,
            request.description,
            request.category.value,
            request.priority.value,
            request.sentiment.value
        )

        return {
            "response": response
        }

    except Exception as error:

        raise HTTPException(
            status_code=500,
            detail="Response generation failed"
        )