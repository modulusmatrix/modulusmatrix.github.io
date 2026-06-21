import random

# -------------------------
# DİNAMİK AĞIRLIKLAR
# -------------------------
def get_weights(X):
    return {
        "M": max(0.1, 0.3 - X * 0.2),
        "S": 0.2,
        "E": 0.2,
        "X": 0.2 + X * 0.3,
        "T": 0.1
    }

# -------------------------
# ANA SKOR MOTORU
# -------------------------
def calculate(M, S, E, X, T):
    W = get_weights(X)

    raw = (
        W["M"] * M +
        W["S"] * S +
        W["E"] * E -
        W["X"] * X +
        W["T"] * T
    )

    # sigmoid benzeri normalizasyon
    score = 1 / (1 + pow(2.718, -raw))

    return round(score, 3)

# -------------------------
# DAĞILIM MODELİ
# -------------------------
def distribution(score, X):
    noise = X * 0.3

    return {
        "low": round(max(0, score - noise - random.uniform(0, 0.1)), 3),
        "mid": score,
        "high": round(min(1, score + noise + random.uniform(0, 0.1)), 3)
    }

# -------------------------
# SENARYO MOTORU
# -------------------------
def scenarios(score, X):
    return [
        {
            "path": "stable",
            "value": round(score, 3)
        },
        {
            "path": "growth",
            "value": round(min(1, score + (0.2 * (1 - X))), 3)
        },
        {
            "path": "decline",
            "value": round(max(0, score - (0.3 * X)), 3)
        },
        {
            "path": "chaos",
            "value": round(random.uniform(0, 1), 3)
        }
    ]

# -------------------------
# TEST INPUT
# -------------------------
event = "iş değişimi"

M = 0.4
S = 0.7
E = 0.6
X = 0.3
T = 0.8

# -------------------------
# RUN ENGINE
# -------------------------
score = calculate(M, S, E, X, T)
dist = distribution(score, X)
scn = scenarios(score, X)

# -------------------------
# OUTPUT
# -------------------------
print("\nEVENT:", event)
print("SCORE:", score)
print("DISTRIBUTION:", dist)
print("SCENARIOS:")

for s in scn:
    print("-", s)
