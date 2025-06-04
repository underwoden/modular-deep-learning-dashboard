# ./backend/main.py
from fastapi import FastAPI
from routes import project, data, model, training, validation, hardware, logging, system_metrics
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# CORS setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # frontend origin
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(project.router, prefix="/project-setup")
app.include_router(data.router, prefix="/data")
app.include_router(model.router, prefix="/model")
app.include_router(training.router, prefix="/training")
app.include_router(validation.router, prefix="/validation")
app.include_router(hardware.router, prefix="/hardware")
app.include_router(logging.router, prefix="/logging")
app.include_router(system_metrics.router, prefix="/system")
@app.get("/")
async def root():
    return {"message": "Backend is running."}

@app.get("/favicon.ico")
async def favicon():
    return {"detail": "No favicon here"}
