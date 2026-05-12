import os
from sqlalchemy import create_engine, inspect
from urllib.parse import quote_plus
from dotenv import load_dotenv

load_dotenv(r"c:\Bachelor_Life_Backend\.env")

DB_USERNAME = os.getenv("DB_USERNAME")
DB_PASSWORD = os.getenv("DB_PASSWORD")
DB_HOSTNAME = os.getenv("DB_HOSTNAME")
DATABASE = os.getenv("DATABASE")
DB_PORT = os.getenv("DB_PORT")

DB_URL = f"postgresql+psycopg2://{quote_plus(DB_USERNAME)}:{quote_plus(DB_PASSWORD)}@{DB_HOSTNAME}:{DB_PORT}/{DATABASE}"

try:
    engine = create_engine(DB_URL)
    inspector = inspect(engine)
    tables = inspector.get_table_names()
    print(f"Tables in database: {tables}")
except Exception as e:
    print(f"Error: {e}")
