import sys
import json
import pickle
import os
import pandas as pd
import numpy as np

current_dir = os.path.dirname(os.path.abspath(__file__))
model_path = os.path.join(current_dir, 'education_pipeline.pkl')

try:
    with open(model_path, 'rb') as f:
        model = pickle.load(f)
except FileNotFoundError:
    print(json.dumps({"error": "Model file not found"}))
    sys.exit(1)

try:
    input_json = sys.argv[1]
    input_dict = json.loads(input_json)
    
    columns = [
        'Age', 'Family_Size', 'Annual_Household_Income', 'Food_Expenditure_Ratio', 
        'Region', 'Employment_Sector', 'Education_Affordability_Score', 'Economic_Burden_Index'
    ]
    
    
    sys.stderr.write(f"Model type: {type(model)}\n")
    if hasattr(model, 'named_steps'):
        sys.stderr.write(f"Pipeline steps: {list(model.named_steps.keys())}\n")
        
        
        for step_name, step in model.named_steps.items():
            sys.stderr.write(f"\nStep: {step_name} - {type(step)}\n")
            if hasattr(step, 'transformers_'):
                for name, transformer, cols in step.transformers_:
                    sys.stderr.write(f"  Transformer: {name}, Columns: {cols}\n")
                    if hasattr(transformer, 'categories_'):
                        sys.stderr.write(f"    Categories: {transformer.categories_}\n")
    
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
    
    region_code = int(input_dict.get('Region', 0))
    employment_code = int(input_dict.get('Employment_Sector', 0))
    
    region_str = regions[region_code] if 0 <= region_code < len(regions) else regions[0]
    employment_str = sectors[employment_code] if 0 <= employment_code < len(sectors) else sectors[0]
    
    features_dict = {
        'Age': float(input_dict.get('Age', 30)),
        'Family_Size': float(input_dict.get('Family_Size', 3.5)),
        'Annual_Household_Income': float(input_dict.get('Annual_Household_Income', 100000)),
        'Food_Expenditure_Ratio': float(input_dict.get('Food_Expenditure_Ratio', 0.4)),
        'Region': region_str,  
        'Employment_Sector': employment_str,  
        'Education_Affordability_Score': float(input_dict.get('Education_Affordability_Score', 0)),
        'Economic_Burden_Index': float(input_dict.get('Economic_Burden_Index', 1))
    }
    
    features_df = pd.DataFrame([features_dict], columns=columns)
    
    numeric_cols = ['Age', 'Family_Size', 'Annual_Household_Income', 
                    'Food_Expenditure_Ratio', 'Education_Affordability_Score', 
                    'Economic_Burden_Index']
    
    for col in numeric_cols:
        features_df[col] = features_df[col].replace([np.inf, -np.inf], 0.0)
    
    sys.stderr.write(f"\nSending DataFrame to Model:\n{features_df.to_string()}\n")
    sys.stderr.write(f"\nDataFrame dtypes:\n{features_df.dtypes}\n")
    sys.stderr.write(f"\nDataFrame values:\n{features_df.values}\n")
    
    prediction = model.predict(features_df)
    
    result_value = prediction[0]
    if hasattr(result_value, 'item'):
        result_value = result_value.item()
    
    if isinstance(result_value, (np.integer, np.floating)):
        result_value = result_value.item()
 
    result_map = {
        0: "Not Recommended - Consider Other Options",
        1: "Partially Suitable - Proceed with Caution",
        2: "Good Match - Recommended",
        3: "Excellent Match - Highly Recommended"
    }

    try:
        result_key = int(result_value)
        result_text = result_map.get(result_key, f"Result: {result_value}")
    except:
        result_text = str(result_value)
        
    print(json.dumps({"recommendation": result_text, "raw_value": str(result_value)}))
    
except Exception as e:
    import traceback
    error_details = traceback.format_exc()
    sys.stderr.write(f"\nError occurred: {error_details}\n")
    print(json.dumps({"error": str(e), "details": error_details}))
    sys.exit(1)