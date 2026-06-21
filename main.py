from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

def calc(M,S,E,X,T):
    return round((0.3*M + 0.2*S + 0.2*E - 0.2*X + 0.1*T), 3)

@app.post("/analyze")
def analyze(data: dict):
    score = calc(
        data["M"],
        data["S"],
        data["E"],
        data["X"],
        data["T"]
    )

    return {
        "score": score,
        "confidence": round(1 - data["X"], 3)
    }
