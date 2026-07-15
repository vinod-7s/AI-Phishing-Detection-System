from urllib.parse import urlparse


def predict_url(url: str):
    """
    Temporary prediction logic.
    Later this will be replaced by an ML model.
    """

    parsed = urlparse(url)

    score = 0

    if parsed.scheme != "https":
        score += 1

    if "@" in url:
        score += 1

    if "-" in parsed.netloc:
        score += 1

    if len(url) > 75:
        score += 1

    if score >= 2:
        return {
            "prediction": "Phishing",
            "confidence": 0.91
        }

    return {
        "prediction": "Safe",
        "confidence": 0.96
    }