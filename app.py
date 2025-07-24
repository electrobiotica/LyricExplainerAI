from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
import os
import requests

app = Flask(__name__, static_url_path='', static_folder='.')

CORS(app)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/terminos.html")
def terminos():
    return render_template("terminos.html")

@app.route("/privacidad.html")
def privacidad():
    return render_template("privacidad.html")

@app.route("/lyric", methods=["POST"])
def lyric():
    data = request.json
    letra = data.get("letra", "").strip()
    if not letra:
        return jsonify({"success": False, "error": "Letra vacía."}), 400

    prompt = f"""Actuá como un analista lírico y crítico musical profesional. Cuando recibas una letra de canción, realizá un análisis completo, claro y estructurado. Usá etiquetas HTML como <strong> en lugar de Markdown. Quitá los separadores '---'.

Letra:
{letra}"""

    headers = {
        "Authorization": f"Bearer {os.getenv('GROQ_API_KEY')}",
        "Content-Type": "application/json"
    }

    body = {
        "model": "meta-llama/llama-4-scout-17b-16e-instruct",
        "messages": [
            { "role": "user", "content": prompt }
        ]
    }

    try:
        r = requests.post("https://api.groq.com/openai/v1/chat/completions", headers=headers, json=body)
        r.raise_for_status()
        return jsonify({"success": True, "respuesta": r.json()["choices"][0]["message"]["content"]})
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5050))
    app.run(host="0.0.0.0", port=port)
