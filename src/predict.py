import sys
from google.cloud import automl_v1beta1 as automl
try: 
  import simplejson as json
except:
  import json

project_id = 'capstone-222521'
compute_region = 'us-east1'
model_id = 'ICN1899342430012195100'
try: 
	file_path = sys.argv[1]
except IOError:
	print("no file")
score_threshold = "0.01"

automl_client = automl.AutoMlClient()

# Get the full path of the model.
"""
model_full_id = automl_client.model_path(
    project_id, compute_region, model_id
)
"""
model_full_id = 'projects/{}/locations/us-central1/models/{}'.format(project_id, model_id)
# Create client for prediction service.
prediction_client = automl.PredictionServiceClient()

# Read the image and assign to payload.
with open(file_path, "rb") as image_file:
    content = image_file.read()
payload = {"image": {"image_bytes": content}}

# params is additional domain-specific parameters.
# score_threshold is used to filter the result
# Initialize params
params = {}
if score_threshold:
    params = {"score_threshold": score_threshold}

response = prediction_client.predict(model_full_id, payload, params)
result = {}
for res in response.payload:
    result[res.display_name] = res.classification.score

print(json.dumps(result))
sys.stdout.flush()