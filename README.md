# M0NKC0DER Backend
## Crafted with ❤️ by CRYP73R

This is the backend server of our SIH-2022 Project designed for Team M0NKC0DER. It is purely made using [NodeJS](https://nodejs.org/). We're using [MongoDB](https://www.mongodb.com/) as our main Database because the Project is still in prototyping stage.

We are a Team of 6 members:-
1. [Utkarsh Gupta (Team Leader)](https://github.com/utkarshguptaa)
2. [Priya Agarwal](https://github.com/Priya2501)
3. [Priyanshu Singh](https://github.com/cryp73r)
4. [Shivang Agarwal](https://github.com/Shivang-Agarwal11)
5. [Vaibhav Kumar](https://github.com/vaibhav6900)
6. Vaibhav Chandra

## API Documentation

### 1. User

| Method | Endpoint | Description | Parameter |
| ------ | -------- | ----------- | --------- |
| POST | `/user/create` | Creates New User | `name`, `email` & `password` are required fields<br />To be sent as a JSON request body |
| POST | `/user` | Login User | `email` and `password` are required fields<br />To be sent as a JSON request body |
| GET | `/user` | Get User Details | `Authorization` header field required |
| POST | `/user/logout` | Logout User | `Authorization` header field required |
| POST | `/user/logoutall` | Logout All User | `Authorization` header field required |
| PATCH | `/user` | Update User Details | `Authorization` header field required<br />`name`, `email` & `password` are allowed update<br />To be sent as a JSON request body |
| DELETE | `/user` | Delete User | `Authorization` header field required |