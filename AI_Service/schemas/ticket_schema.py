from enum import Enum

from pydantic import BaseModel, Field


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
    title: str = Field(min_length=1, max_length=200)
    description: str = Field(min_length=1, max_length=5000)


class TicketAnalysis(BaseModel):
    category: Category
    priority: Priority
    sentiment: Sentiment
    summary: str = Field(min_length=1, max_length=500)


class ResponseRequest(BaseModel):
    title: str = Field(min_length=1, max_length=200)
    description: str = Field(min_length=1, max_length=5000)
    category: Category
    priority: Priority
    sentiment: Sentiment


class ResponseResult(BaseModel):
    response: str = Field(min_length=1, max_length=2000)