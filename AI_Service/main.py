from enum import Enum

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field

from services.ticket_ai import analyze_ticket
from services.response_ai import generate_response

app = FastAPI()

class Category(str, Enum):
    PAYMENT = "Payment"
    ACCOUNT = "Account"
    TECHNICAL = "Technical"
    ORDER = "Order"
    SUBSCRIPTION = "Subscription"
    OTHER = "Other"


class Priority(str, Enum):
    LOW = "Low"
    MEDIUM = "Medium"
    HIGH = "High"
    CRITICAL = "Critical"


class Sentiment(str, Enum):
    POSITIVE = "Positive"
    NEUTRAL = "Neutral"
    NEGATIVE = "Negative"


class TicketRequest(BaseModel):
    title: str = Field(min_length=1)
    description: str = Field(min_length=1)

class ResponseRequest(BaseModel):
    title: str = Field(min_length=1)
    description: str = Field(min_length=1)
    category: str
    priority: str
    sentiment: str


class TicketAnalysis(BaseModel):
    category: Category
    priority: Priority
    sentiment: Sentiment
    summary: str


@app.get("/")
def home():
    return {
        "message": "SupportAI AI Service is running..."
    }


@app.post("/analyze-ticket", response_model=TicketAnalysis)
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
            detail=f"AI analysis failed: {str(error)}"
        )

@app.post("/generate-response")
def generate_response_endpoint(request: ResponseRequest):

    try:

        response = generate_response(
            request.title,
            request.description,
            request.category,
            request.priority,
            request.sentiment
        )

        return {
            "response": response
        }

    except Exception as error:

        raise HTTPException(
            status_code=500,
            detail=f"Response generation failed: {str(error)}"
        )