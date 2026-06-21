import random

STATE = {
    "stress": 0.5,
    "confidence": 0.5,
    "risk_appetite": 0.5
}

def update_state(M,S,E,X,T):
    STATE["stress"] = min(1, STATE["stress"] + X - S)
    STATE["confidence"] = min(1, STATE["confidence"] + T - X)
    STATE["risk_appetite"] = min(1, STATE["risk_appetite"] + M - E)

def policy():
    if STATE["stress"] > 0.6:
        return "risk_averse"
    elif STATE["confidence"] > 0.6:
        return "aggressive"
    return "balanced"

def run(M,S,E,X,T):
    update_state(M,S,E,X,T)

    mode = policy()

    if mode == "risk_averse":
        return {"decision": "safe path", "state": STATE}
    elif mode == "aggressive":
        return {"decision": "high risk path", "state": STATE}
    else:
        return {"decision": "balanced path", "state": STATE}

# test
print(run(0.4,0.7,0.6,0.3,0.8))
print(run(0.9,0.2,0.8,0.1,0.7))
