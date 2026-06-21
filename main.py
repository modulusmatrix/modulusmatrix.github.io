import random

def calculate(M, S, E, X, T):
    base = (
        0.3*M +
        0.2*S +
        0.2*E -
        0.2*X +
        0.1*T
    )

    noise = random.uniform(-0.15, 0.15)

    return round(base + noise, 3)
