# vue-voice-gpt

## Development Setup

### For AWS 

1. Create an account at [https://aws.amazon.com/](https://aws.amazon.com/).
2. Navigate to your account and search for **Identity and Access Management (IAM)**.
3. Proceed to Users and add a user. Fill in the user details.
4. Add `AmazonPollyFullAccess` as **Permission Policy** and create your user group.
5. Continue clicking next until you have created the IAM user.
6. Since I can't find programmatic access for user there. Open AWS CloudShell and type this command to generate API keys:

```
aws iam create-access-key --user-name YourUser
```

- Replace `YourUser` with the name of the user you created. Then run this command to grant the user full access:

```
aws iam attach-group-policy --group-name MyIamGroup --policy-arn arn:aws:iam::aws:policy/AdministratorAccess
```

- Replace `MyIamGroup` with the name of the user group.

7. Copy and paste the access keys to [awsCreds.json](/backend/awsCreds.json).

```json
{
  "accessKeyId": "YOUR_ACCESS_KEY",
  "secretAccessKey": "YOUR_SECRET_ACCESS_KEY"
}
```

### For OpenAI

1. Create and login to your OpenAI account.
2. Go to [https://platform.openai.com/account/api-keys](https://platform.openai.com/account/api-keys).
3. Create your API keys and copy them to your secure place. 

- Your OpenAi API Key should start with `sk-.....`


## Project Setup 

### For backend and frontend

```sh
npm install
```

### To run backend server  

```sh
npm run watch
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```
