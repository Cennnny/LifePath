import sys
import json
import pickle
import os
import pandas as pd
import numpy as np
import tensorflow as tf
from tensorflow.keras.models import load_model

current_dir = os.path.dirname(os.path.abspath(__file__))
model_path = os.path.join(current_dir, 'education_ann.h5')
preprocessor_path = os.path.join(current_dir, 'preprocessing.pkl')

try:
    model = load_model(model_path)
    with open(preprocessor_path, 'rb') as f:
        artifacts = pickle.load(f)
        
        if 'preprocessor' in artifacts:
            preprocessor = artifacts['preprocessor']
        elif 'scaler' in artifacts:
            preprocessor = artifacts['scaler']
        else:
            raise ValueError("Could not find preprocessor in pickle file")
        
        target_encoder = artifacts.get('label_encoder', None)
        
    sys.stderr.write("Model and preprocessor loaded successfully\n")
        
except Exception as e:
    print(json.dumps({"error": f"Failed to load model files: {str(e)}"}))
    sys.exit(1)

try:
    input_json = sys.argv[1]
    input_dict = json.loads(input_json)
    
    sys.stderr.write(f"Received input: {input_dict}\n")
    
    regions = [
        "NCR", "Region I", "Region II", "Region III", "Region IV-A", "Region IV-B",
        "Region V", "Region VI", "Region VII", "Region VIII", "Region IX", "Region X",
        "Region XI", "Region XII", "Region XIII", "CAR", "BARMM"
    ]
    
    sectors = [
        "Government", "Private", "Self-employed", "Agriculture", "Education", 
        "Healthcare", "IT", "Manufacturing", "Retail", "Construction", 
        "Transportation", "Unemployed", "Student", "Retired", "Other"
    ]
    
    region_val = input_dict.get('Region', 0)
    emp_val = input_dict.get('Employment_Sector', 0)
    
    if isinstance(region_val, int):
        region_str = regions[region_val] if 0 <= region_val < len(regions) else regions[0]
    else:
        region_str = str(region_val)
        
    if isinstance(emp_val, int):
        employment_str = sectors[emp_val] if 0 <= emp_val < len(sectors) else sectors[0]
    else:
        employment_str = str(emp_val)
    
    sys.stderr.write(f"Mapped Region: {region_str}, Employment: {employment_str}\n")
    
    data = {
        'Age': [float(input_dict.get('Age', 0))],
        'Family_Size': [float(input_dict.get('Family_Size', 0))],
        'Annual_Household_Income': [float(input_dict.get('Annual_Household_Income', 0))],
        'Food_Expenditure_Ratio': [float(input_dict.get('Food_Expenditure_Ratio', 0))],
        'Region': [region_str],
        'Employment_Sector': [employment_str],
        'Education_Affordability_Score': [float(input_dict.get('Education_Affordability_Score', 0))],
        'Economic_Burden_Index': [float(input_dict.get('Economic_Burden_Index', 0))]
    }
    
    df = pd.DataFrame(data)
    
    sys.stderr.write(f"DataFrame created:\n{df.to_string()}\n")
    
    X_processed = preprocessor.transform(df)
    
    sys.stderr.write(f"Data preprocessed, shape: {X_processed.shape}\n")
    
    predictions = model.predict(X_processed, verbose=0)
    predicted_class_index = np.argmax(predictions, axis=1)[0]
    
    sys.stderr.write(f"Raw predictions: {predictions}\n")
    sys.stderr.write(f"Predicted class index: {predicted_class_index}\n")
    
    if target_encoder:
        result_text = target_encoder.inverse_transform([predicted_class_index])[0]
    else:
        fallback_map = {
            0: "College",
            1: "Elementary",
            2: "High School",
            3: "No Formal Education",
            4: "Post-Graduate",
            5: "Vocational/TVET"
        }
        result_text = fallback_map.get(predicted_class_index, "Unknown")
    
    print(json.dumps({
        "recommendation": result_text,
        "confidence": float(np.max(predictions))
    }))
    
except Exception as e:
    import traceback
    error_details = traceback.format_exc()
    sys.stderr.write(f"Error occurred:\n{error_details}\n")
    print(json.dumps({"error": str(e), "details": error_details}))
    sys.exit(1)