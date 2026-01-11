import sys
import json
import pickle
import os
import pandas as pd

current_dir = os.path.dirname(os.path.abspath(__file__))
model_path = os.path.join(current_dir, 'education_pipeline.pkl')

try:
    with open(model_path, 'rb') as f:
        model = pickle.load(f)
except FileNotFoundError:
    print(json.dumps({"error": "Model file not found"}))
    sys.exit(1)

#Read Input from Node.js
try:
    
    input_json = sys.argv[1]
    input_dict = json.loads(input_json)
    
    
    columns = [
        'Age', 
        'Family_Size', 
        'Annual_Household_Income', 
        'Food_Expenditure_Ratio', 
        'Region', 
        'Employment_Sector', 
        'Education_Affordability_Score', 
        'Economic_Burden_Index'
    ]
    
   
    features_df = pd.DataFrame([input_dict], columns=columns)
    
   
    prediction = model.predict(features_df)
    
    result = {"recommendation": prediction[0]}
    print(json.dumps(result))

except Exception as e:
    print(json.dumps({"error": str(e)}))