from fastapi import FastAPI
from app.routers import auth, exams, enseignants  # tes routers à créer

app = FastAPI(title="Exam Service API")

# Inclure les routers
app.include_router(auth.router, prefix="/auth", tags=["auth"])
app.include_router(enseignants.router, prefix="/enseignants", tags=["enseignants"])
app.include_router(exams.router, prefix="/exams", tags=["exams"])

@app.get("/")
def read_root():
    return {"message": "Bienvenue dans le service Exam Service"}

# Tu peux aussi ici lancer la connexion Cassandra par exemple
# Mais en général tu la gères dans un module à part (database.py)
