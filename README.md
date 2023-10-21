# Simple File Upload API

This is a simple API that allows you to upload files to a database as binary data. It uses the Node.js runtime and the following dependencies: `multer` for file uploads, `mongoose` for database interaction, and `mime` for determining file types. Below, we'll explain how this API works in simple terms, provide some examples, and summarize its key components.

## How the API Works

### 1. GET Route - Fetch Image by ID

This route allows you to retrieve an image from the database by its ID. Here's how it works:

- It attempts to find the image document in the database based on the provided ID.
- If the image is found, it sets the response content type to match the image's content type and sends the binary image data as the response.

Example: `GET /api/photos/:id`

### 2. POST Route - Upload a Photo

This route allows you to upload a new photo to the database. It expects a `name`, `description`, and a file to be sent in the request.

- The file data is read directly from the request's buffer, and its content type is determined.
- The photo information is saved in the database.

Example: `POST /api/photos`

### 3. PUT Route - Update a Photo

The PUT route allows you to update an existing photo in the database. Here's how it works:

- It expects a `name`, `description`, and a file to be sent in the request.
- If the request doesn't include a file, it returns a `400 Bad Request` response with an error message.
- The uploaded file is read directly from the request's buffer.
- The content type of the file is determined based on its file extension, and if it can't be determined, a default content type of "application/octet-stream" is used.
- An object is created to store in the database. This object includes the `name`, `description`, and the updated image data with its content type.
- The API locates the existing photo by its ID, updates it with the new information, and ensures the updated document is returned.
- If the photo with the specified ID is not found, it returns a `404 Not Found` response with an error message.
- If the update is successful, it returns a `200 OK` response with a success message and the updated photo document in the response body.

Example: `PUT /api/photos/:id`

### 4. DELETE Route - Delete a Photo

This route allows you to delete a photo from the database by its ID. Here's how it works:

- It attempts to delete the photo based on the provided ID.
- If the photo is successfully deleted, a success message is returned.

Example: `DELETE /api/photos/:id`

## Summary

This simple API provides endpoints for uploading, retrieving, updating, and deleting photos in a database. It uses `multer` to handle file uploads and stores the photos as binary data in the database using `mongoose`. Additionally, the `mime` package is used to determine the content type of uploaded files.

Make sure to set up the necessary environment variables for database credentials, and don't forget to configure your database connection and routes to use this API effectively.

### Author

Created by Sudipta Jana
