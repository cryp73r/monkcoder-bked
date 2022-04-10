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

Handles user's SignUp, SignIn, Update, etc.

| Method | Endpoint | Description | Parameter |
| ------ | -------- | ----------- | --------- |
| POST | `/user/create` | Creates New User | `name`, `email` & `password` are required fields<br />To be sent as a JSON request body |
| POST | `/user` | Login User | `email` and `password` are required fields<br />To be sent as a JSON request body |
| GET | `/user` | Get User Details | `Authorization` header field required |
| POST | `/user/logout` | Logout User | `Authorization` header field required |
| POST | `/user/logoutall` | Logout All User | `Authorization` header field required |
| PATCH | `/user` | Update User Details | `Authorization` header field required<br />`name`, `email` & `password` are allowed updates<br />To be sent as a JSON request body |
| DELETE | `/user` | Delete User | `Authorization` header field required |

### 2. Resume

Handles user's resume like: Creation, Updation, etc.

| Method | Endpoint | Description | Parameter |
| ------ | -------- | ----------- | --------- |
| POST | `/resume/create` | Creates Resume | `Authorization` header field required<br />`name`, `email`, `contactNo`, `address`, `pincode`, `city`, `state` & `country` are required fields<br />`summary`, `alternateNo`, `educations [Array of Map]`, `skills [Array of String]`, `certificates [Array of Map]`, `languages [Array of String]`, `workExperiences [Array of Map]`, `achievements [Array of Map]` & `interests [Array of String]` are optional fields<br />To be sent as a JSON request body |
| GET | `/resume` | Get Resume of respective user | `Authorization` header field required |
| PATCH | `/resume` | Update Selected Resume fields | `Authorization` header field required<br />`name`, `email`, `summary`, `contactNo`, `alternateNo`, `address`, `state`, `country`, `educations`, `skills`, `certificates`, `languages`, `workExperiences` & `interests` are allowed updates<br />To be sent as a JSON request body |
| DELETE | `/resume` | Delete Resume | `Authorization` header field required |

### 3. Institute

Handles institute's SignUp, SignIn, etc.

| Method | Endpoint | Description | Parameter |
| ------ | -------- | ----------- | --------- |
| POST | `/institute/create` | Create New Institute | `regId`, `name`, `contactNo`, `address`, `pincode`, `city`, `state`, `country`, `email` & `password` are required fields<br />`summary` & `alternateNo` are optional fields<br />To be sent as a JSON request body |
| POST | `/institute` | Login Institute | `email` and `password` are required fields<br />To be sent as a JSON request body |
| GET | `/institute` | Get Institute Details | `Authorization` header field required |
| POST | `/institute/logout` | Logout Institute | `Authorization` header field required |
| POST | `/institute/logoutall` | Logout All Institute | `Authorization` header field required |
| PATCH | `/institute` | Update Institute Details | `Authorization` header field required<br />`email`, `password`, `summary`, `contactNo`, `alternateNo`, `address`, `pincode`, `city`, `state` & `country` are allowed updates<br />To be sent as a JSON request body |
| DELETE | `/institute` | Delete Institute | `Authorization` header field required |

### 4. Pincode

Get details from pincode like: state, city, country, etc.

Use Official API provided by **India Post** [Documentation Here](http://www.postalpincode.in/Api-Details)