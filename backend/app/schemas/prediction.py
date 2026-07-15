from pydantic import BaseModel

class URLRequest(BaseModel):
    url: str

class PredictionResponse(BaseModel):
    url: str
    prediction: str
    confidence: float