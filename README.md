# Building GuruNimbus


### Installation for local development:
1. Download [**Miniconda**](https://docs.anaconda.com/miniconda/) of your system.
```bash
# Install Next.js package dependencies
npm install

# Create a new Conda environment named 'rag' with Python 3.10.4
conda create --name rag python=3.10.4

# Activate the 'rag' environment
conda activate rag

# Deactivate the current Conda environment
conda deactivate

# To install all package/dependencies in one signle commands:
pip install -r requirements.txt

# Install the python-dotenv package for managing environment variables
pip install python-dotenv

# Install the Pinecone client library with gRPC support
pip install "pinecone-client[grpc]"

```


---
### Setting up .env secrets:
```bash
# After coping add your API keys
cp .env.example .env
```