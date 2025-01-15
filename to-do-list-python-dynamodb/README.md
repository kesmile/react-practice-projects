# TODO list with React + python + dynamoDB

This is a simple project of a task list using React, Python, and DynamoDB. I have divided the project into two parts, separating it into backend and frontend. Below are the instructions to install and run each of them.

## Backend
Ensure you have the AWS SDK installed.

- **Set up AWS credentials:** Configure your AWS credentials to allow your application to connect to DynamoDB. You can do this by setting environment variables or using the AWS credentials file.
    
    ```sh
    export AWS_ACCESS_KEY_ID=your_access_key_id
    export AWS_SECRET_ACCESS_KEY=your_secret_access_key
    export AWS_DEFAULT_REGION=your_region
    ```

- **Using AWS credentials file:** Create a file at `~/.aws/credentials` with the following content:

    ```sh
    [default]
    aws_access_key_id = your_access_key_id
    aws_secret_access_key = your_secret_access_key
    ```

- **Install dependencies:** Install the required dependencies using the `requirements.txt` file:

- **Run the backend:** Start your backend server to connect to DynamoDB and handle API requests.

    ```sh
    python app.py
    ```


## Frontend

### Instructions to run the frontend

1. **Navigate to the frontend directory**:
    ```sh
    cd frontend
    ```

2. **Install dependencies**:
    ```sh
    pnpm install
    ```

3. **Start the development server**:
    ```sh
    pnpm dev
    ```

4. **Build the project for production**:
    ```sh
    pnpm build
    ```

5. **Preview the production build**:
    ```sh
    pnpm preview
    ```
Run unit tests
    ```sh
    pnpm test
    ```

Follow these steps to set up and run the frontend of your project.