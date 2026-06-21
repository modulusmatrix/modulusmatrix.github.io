def calculate(M, S, E, X, T):
    Wm, Ws, We, Wx, Wt = 0.25, 0.2, 0.2, 0.2, 0.15

    score = (
        Wm * M +
        Ws * S +
        We * E -
        Wx * X +
        Wt * T
    )

    return round(score, 3)

event = "test event"
M, S, E, X, T = 0.4, 0.7, 0.6, 0.3, 0.8

score = calculate(M,S,E,X,T)

print("EVENT:", event)
print("SCORE:", score)
print("CONFIDENCE:", round(1-X,3))
M, S, E, X, T = 0.9, 0.2, 0.8, 0.1, 0.7
