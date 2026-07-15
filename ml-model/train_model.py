import pandas as pd
import joblib
import os

from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression

# Load dataset
df = pd.read_csv("phishing_dataset.csv")

X = df["url"]
y = df["label"]

# Convert URLs to TF-IDF vectors
vectorizer = TfidfVectorizer()
X_vectorized = vectorizer.fit_transform(X)

# Train model
model = LogisticRegression()
model.fit(X_vectorized, y)

# Save model and vectorizer
joblib.dump(model, "model.pkl")
joblib.dump(vectorizer, "vectorizer.pkl")

print("Current Folder:", os.getcwd())
print("Model Exists:", os.path.exists("model.pkl"))
print("Vectorizer Exists:", os.path.exists("vectorizer.pkl"))
print("✅ Training completed!")