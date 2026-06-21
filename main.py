def simulate(score, X):
    return {
        "best": round(score + (0.3 * (1-X)), 3),
        "expected": score,
        "worst": round(score - (0.4 * X), 3)
    }
