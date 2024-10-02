from flask import Flask, jsonify, Response
import requests
from Bio.PDB import PDBParser
from flask_cors import CORS
import logging

app = Flask(__name__)
CORS(app)

logging.basicConfig(level=logging.DEBUG)

def fetch_protein_structure(protein_id):
    url = f'https://alphafold.ebi.ac.uk/files/AF-{protein_id}-F1-model_v4.pdb'
    logging.debug(f'Fetching URL: {url}')
    response = requests.get(url)
    if response.status_code == 200:
        logging.debug('Protein data fetched successfully.')
        return response.text
    else:
        logging.error(f'Failed to fetch protein data. Status code: {response.status_code}')
        return None

def calculate_plddt(pdb_data):
    plddt_scores = [float(line[60:66].strip()) for line in pdb_data.splitlines() if line.startswith('ATOM')]
    return sum(plddt_scores) / len(plddt_scores) if plddt_scores else 0

@app.route('/api/predict/<protein_id>', methods=['GET'])
def predict(protein_id):
    logging.debug(f'Received request for Protein ID: {protein_id}')
    pdb_data = fetch_protein_structure(protein_id)
    if not pdb_data:
        return jsonify({'error': 'Protein not found'}), 404
    
    plddt = calculate_plddt(pdb_data)
    return jsonify({'pdb': pdb_data, 'plddt': round(plddt, 2)})

@app.route('/api/download/<protein_id>', methods=['GET'])
def download(protein_id):
    logging.debug(f'Received request to download PDB for Protein ID: {protein_id}')
    pdb_data = fetch_protein_structure(protein_id)
    if not pdb_data:
        return jsonify({'error': 'Protein not found'}), 404
    
    response = Response(pdb_data, mimetype='chemical/x-pdb')
    response.headers.set("Content-Disposition", "attachment", filename=f"{protein_id}.pdb")
    return response

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
