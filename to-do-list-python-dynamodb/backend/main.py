from flask import Flask, request, jsonify
from flask_cors import CORS
import boto3
import uuid

app = Flask(__name__)
CORS(app)

dynamodb = boto3.resource('dynamodb', region_name='us-east-1')
table = dynamodb.Table('TodoList')

@app.route('/tasks', methods=['GET'])
def get_tasks():
    response = table.scan()
    tasks = response.get('Items', [])
    return jsonify(tasks)


@app.route('/tasks/<task_id>', methods=['GET'])
def get_task(task_id):
    try:
        response = table.get_item(Key={'taskId': task_id})
        task = response.get('Item')
        if not task:
            return jsonify({'error': 'Task not found'}), 404
        return jsonify(task)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/tasks', methods=['POST'])
def create_task():
    try:
        data = request.json
        task_id = str(uuid.uuid4())
        new_task = {
            'taskId': task_id,
            'title': data['title'],
            'description': data.get('description', ''),
            'completed': False
        }
        table.put_item(Item=new_task)
        return jsonify(new_task), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/tasks/<task_id>', methods=['PUT'])
def update_task(task_id):
    try:
        data = request.json
        response = table.update_item(
            Key={'taskId': task_id},
            UpdateExpression="SET title = :title, description = :description, completed = :completed",
            ExpressionAttributeValues={
                ':title': data['title'],
                ':description': data.get('description', ''),
                ':completed': data['completed']
            },
            ReturnValues="ALL_NEW"
        )
        return jsonify(response['Attributes'])
    except Exception as e:
        print(str(e))
        return jsonify({'error': str(e)}), 500

@app.route('/tasks/<task_id>', methods=['DELETE'])
def delete_task(task_id):
    try:
        table.delete_item(Key={'taskId': task_id})
        return jsonify({'message': 'Task deleted successfully'})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)