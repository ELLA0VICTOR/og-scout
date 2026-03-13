from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers.scout import router
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(title="OG Scout API", version="1.0.0")

# CORS
frontend_url = os.environ.get("FRONTEND_URL", "http://localhost:5173")
app.add_middleware(
    CORSMiddleware,
    allow_origins=[frontend_url, "http://localhost:5173", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router)

if __name__ == "__main__":
    import uvicorn

    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
