import os

from dotenv import load_dotenv
from groq import Groq


load_dotenv()

client = Groq(
    api_key=os.getenv("GROQ_API_KEY")
)


def generate_response(title, description, category, priority, sentiment):

    prompt = f"""
You are an AI assistant helping a customer support agent.

Generate a professional response to the customer's support ticket.

TICKET TITLE:
{title}

CUSTOMER MESSAGE:
{description}

CATEGORY:
{category}

PRIORITY:
{priority}

SENTIMENT:
{sentiment}

Requirements:

1. Be polite and professional.
2. Acknowledge the customer's issue.
3. Show appropriate empathy when the customer is frustrated.
4. Clearly explain that the support team will assist with the issue.
5. Do not invent refunds, discounts, order numbers, timelines,
   policies, or actions that were not provided.
6. Do not claim that the issue has already been fixed.
7. Keep the response concise.
8. Do not mention that you are an AI.
9. Do not use markdown.
10. Return only the response that should be sent to the customer.

Write the response now.
"""

    response = client.chat.completions.create(
        model="openai/gpt-oss-20b",

        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ],

        temperature=0.4
    )

    return response.choices[0].message.content.strip()