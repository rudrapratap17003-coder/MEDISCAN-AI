import os
import sys
import logging
from typing import List, Optional
from pathlib import Path

from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from dotenv import load_dotenv

# Load environment variables from backend/.env or parent directory
BASE_DIR = Path(__file__).resolve().parent

def reload_env():
    load_dotenv(BASE_DIR / ".env", override=True)
    load_dotenv(BASE_DIR.parent / ".env", override=True)

reload_env()

from knowledge import BIOLOGICAL_KNOWLEDGE_CONTEXT

# Initialize logger
logging.basicConfig(level=logging.INFO, format="%(asctime)s [%(levelname)s] %(message)s")
logger = logging.getLogger("mediscan-assistant")

# Environment settings
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY", "").strip()
GEMINI_MODEL = os.getenv("GEMINI_MODEL", "gemini-2.5-flash").strip()

app = FastAPI(
    title="MEDISCAN AI — Biology Assistant API",
    description="Backend microservice providing secure Gemini API integration and biological knowledge grounding.",
    version="1.0.0",
)

# CORS configuration
origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Permits all for development / proxy
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# System prompt defining role, capabilities, and strict clinical guardrails
SYSTEM_INSTRUCTION = f"""
You are the MEDISCAN AI Biology Assistant, an intelligent biomedical education tutor embedded inside the MEDISCAN AI healthcare platform.

YOUR PRIMARY PURPOSE:
Help students, researchers, and users understand human anatomy, physiology, cellular biology, and the underlying mechanisms of human disease through clear, structured, and scientifically grounded explanations.

KNOWLEDGE BASE GROUNDING:
You are equipped with the MEDISCAN AI biological knowledge base detailed below. When users ask about organs, physiological systems, biological processes, or disease mechanisms, use this verified reference data to anchor your response:

{BIOLOGICAL_KNOWLEDGE_CONTEXT}

COMMUNICATION & PEDAGOGICAL GUIDELINES:
1. Explain complex biological and physiological concepts in clear, intuitive, and accessible language while preserving scientific accuracy.
2. Structure answers effectively using clear markdown headings (##, ###), bullet points, and numbered steps.
3. Define complex or unfamiliar medical and Latin terminology when first introduced (e.g., "hematopoiesis: the production of blood cells in the bone marrow").
4. Directly connect physiological concepts to the human body's organs and systems (e.g., link blood pressure to both cardiac output and renal fluid filtration).
5. Highlight relevant anatomical structures and processes when answering user inquiries.

CRITICAL MEDICAL & SAFETY GUARDRAILS (STRICT COMPLIANCE REQUIRED):
1. NO INDIVIDUAL DIAGNOSIS: NEVER diagnose an individual user's medical condition or attempt to evaluate personal clinical symptoms.
2. NO PRESCRIPTIONS OR TREATMENT: NEVER prescribe medications, calculate drug dosages, or recommend personal clinical treatment protocols.
3. NO FABRICATED METRICS: NEVER generate synthetic diagnostic confidence scores (e.g., "94% certainty") or claim clinical laboratory verification.
4. EDUCATIONAL BOUNDARY: If a user asks for personal medical advice, remind them:
   "As an educational AI biology assistant, I can explain biological and disease mechanisms, but I cannot provide medical diagnoses or clinical advice. Please consult a qualified healthcare professional for personal medical evaluation."
5. MEDICAL EMERGENCIES: If the user mentions acute, life-threatening symptoms (e.g., severe acute chest pain, sudden numbness, difficulty breathing, profuse bleeding), explicitly advise immediate emergency medical care:
   "⚠️ This could indicate a serious medical emergency. Please seek immediate medical attention or call emergency services (such as 911 or local emergency numbers) right away rather than continuing an online chat."
"""

# Request / Response Schemas
class MessageItem(BaseModel):
    role: str = Field(..., description="'user' or 'assistant'")
    content: str = Field(..., max_length=4000, description="Message text")

class ChatRequest(BaseModel):
    message: str = Field(..., min_length=1, max_length=4000, description="Current user question")
    history: Optional[List[MessageItem]] = Field(default=[], description="Preceding conversation history")
    conversation_id: Optional[str] = None

class ChatResponse(BaseModel):
    response: str
    model: str
    status: str = "success"

@app.get("/api/health")
def health_check():
    """
    Health check endpoint returning service status, active model, and configuration readiness.
    """
    reload_env()
    api_key_set = bool(os.getenv("GEMINI_API_KEY", "").strip())
    model_name = os.getenv("GEMINI_MODEL", "gemini-2.5-flash").strip()
    return {
        "status": "ok",
        "service": "MEDISCAN AI Biology Assistant API",
        "model": model_name,
        "configured": api_key_set,
        "message": "Service is healthy and ready." if api_key_set else "API key not configured.",
    }

@app.post("/api/chat", response_model=ChatResponse)
async def chat_endpoint(payload: ChatRequest):
    """
    Conversational assistant endpoint using Google's Gemini API with server-side security.
    """
    reload_env()
    api_key = os.getenv("GEMINI_API_KEY", "").strip()

    # Rule 5: If API key is missing, return clear pending configuration message
    if not api_key:
        logger.warning("Chat endpoint invoked but GEMINI_API_KEY is not configured.")
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="AI assistant configuration is pending. Please configure the backend API key.",
        )

    user_query = payload.message.strip()
    if not user_query:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="User message cannot be empty.",
        )

    # Initialize Gemini Client using official google-genai SDK
    try:
        from google import genai
        from google.genai import types

        client = genai.Client(api_key=api_key)

        # Build conversation contents including history
        contents = []
        for hist in payload.history[-10:]:  # Keep recent turns for context window
            role = "user" if hist.role == "user" else "model"
            contents.append(
                types.Content(
                    role=role,
                    parts=[types.Part.from_text(text=hist.content)]
                )
            )

        # Append current user prompt
        contents.append(
            types.Content(
                role="user",
                parts=[types.Part.from_text(text=user_query)]
            )
        )

        model_name = os.getenv("GEMINI_MODEL", "gemini-2.5-flash").strip()
        used_model = model_name

        # Generate response with grounded system instruction
        try:
            response = client.models.generate_content(
                model=model_name,
                contents=contents,
                config=types.GenerateContentConfig(
                    system_instruction=SYSTEM_INSTRUCTION,
                    temperature=0.3,
                    max_output_tokens=2048,
                ),
            )
        except Exception as model_err:
            err_msg = str(model_err)
            # If Google API indicates this model is retired/unavailable to new users, fallback to gemini-3.5-flash
            if "no longer available" in err_msg or "404" in err_msg or "NOT_FOUND" in err_msg:
                logger.warning(f"Model '{model_name}' unavailable ({err_msg[:80]}). Falling back to 'gemini-3.5-flash'.")
                used_model = "gemini-3.5-flash"
                response = client.models.generate_content(
                    model=used_model,
                    contents=contents,
                    config=types.GenerateContentConfig(
                        system_instruction=SYSTEM_INSTRUCTION,
                        temperature=0.3,
                        max_output_tokens=2048,
                    ),
                )
            else:
                raise

        reply_text = response.text or "I apologize, but I could not formulate an educational response at this time."

        return ChatResponse(
            response=reply_text,
            model=used_model,
            status="success",
        )

    except HTTPException:
        raise
    except Exception as exc:
        err_str = str(exc)
        logger.error(f"Gemini API invocation error: {err_str}")

        # Distinguish common error scenarios
        if "RESOURCE_EXHAUSTED" in err_str or "429" in err_str:
            raise HTTPException(
                status_code=status.HTTP_429_TOO_MANY_REQUESTS,
                detail="The AI assistant is currently experiencing high demand. Please wait a moment and try again.",
            )
        elif "API_KEY_INVALID" in err_str or "unregistered" in err_str or "PERMISSION_DENIED" in err_str or "API key not valid" in err_str:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="The configured Gemini API key is invalid or unauthorized. Please verify your backend configuration.",
            )
        else:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Unable to process assistant request: {err_str[:120]}",
            )

if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("PORT", "8000"))
    uvicorn.run("main:app", host="127.0.0.1", port=port, reload=True)
