import os
import json

from dotenv import load_dotenv
from groq import Groq

from schemas.ticket_schema import TicketAnalysis


load_dotenv()

client = Groq(
    api_key=os.getenv("GROQ_API_KEY")
)


def analyze_ticket(title, description):

    prompt = f"""
You are an AI customer support ticket analyzer.

Your job is to analyze a customer support ticket.

TICKET TITLE:
{title}

TICKET DESCRIPTION:
{description}

Choose exactly ONE category:

Payment
Account
Technical
Order
Subscription
Other

Choose exactly ONE priority:

Low
Medium
High
Critical

Choose exactly ONE sentiment:

Positive
Neutral
Negative

Create a short, clear summary of the customer's problem.

PRIORITY GUIDELINES:

Low:
General questions or minor issues.

Medium:
Normal customer problems that require support.

High:
Payment problems, failed transactions, blocked accounts,
important order problems, or issues preventing the customer
from using an important service.

Critical:
Extremely urgent situations involving major service disruption,
serious security concerns, or situations requiring immediate
human attention.

SENTIMENT GUIDELINES:

Positive:
Customer expresses satisfaction or appreciation.

Neutral:
Customer describes a problem without strong emotional language.

Negative:
Customer expresses frustration, anger, disappointment,
or dissatisfaction.

IMPORTANT:

Return ONLY valid JSON.

Do NOT use markdown.

Do NOT include ```json.

Do NOT include explanations.

Use exactly these keys:

category
priority
sentiment
summary

Example:

{{
    "category": "Payment",
    "priority": "High",
    "sentiment": "Negative",
    "summary": "Customer was charged for an unsuccessful order and is awaiting a refund."
}}
"""



    response = client.chat.completions.create(
        model="openai/gpt-oss-20b",
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ],
        temperature=0.2
    )


    content = response.choices[0].message.content

    try:

        data = json.loads(content)

    except json.JSONDecodeError:

        raise ValueError(
            "LLM returned invalid JSON"
        )

    validated = TicketAnalysis.model_validate(data)

    return validated