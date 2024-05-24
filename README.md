Sure, here's the README.md in English:

```markdown
# Node.js Flickr Challenge

This project is an application that fetches photos from Flickr using the Flickr API and stores them in a MySQL database. The application allows viewing, filtering by tags, and deleting photos through a web interface.

## Requirements

- Node.js
- npm (Node Package Manager)
- MySQL

## Setup

1. Clone the repository:

```bash
git clone https://github.com/your-username/nodejs-flickr-challenge.git
cd nodejs-flickr-challenge
```

2. Install project dependencies:

```bash
npm install
```

3. Create a MySQL database and a table to store the photos:

```sql
CREATE DATABASE flickr;
USE flickr;

CREATE TABLE photos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    published_date DATETIME NOT NULL,
    image_url VARCHAR(255) NOT NULL,
    tags VARCHAR(255)
);
```

4. Create a `.env` file at the root of the project and configure the environment variables:

```
FLICKR_API_KEY=your_flickr_api_key
MYSQL_USER=your_mysql_user
MYSQL_HOST=localhost
MYSQL_DATABASE=flickr
MYSQL_PASSWORD=your_mysql_password
MYSQL_PORT=3306
```

Replace `your_flickr_api_key`, `your_mysql_user`, and `your_mysql_password` with your actual Flickr API key and MySQL credentials.

## Running the Application

1. Start the server:

```bash
npm start
```

The server will start on `http://localhost:3006`.

2. Open your browser and go to `http://localhost:3006` to view the application.

## Project Structure

- `src/app.js`: The main application file that sets up the server and routes.
- `src/routes/photoRoutes.js`: Routes for photo-related endpoints.
- `src/routes/tagRoutes.js`: Routes for tag-related endpoints.
- `src/controllers/photoController.js`: Controller functions for handling photo requests.
- `src/controllers/tagController.js`: Controller functions for handling tag requests.
- `src/services/fetchPhotos.js`: Service for fetching and storing photos from Flickr.
- `src/services/scheduler.js`: Scheduler for periodically fetching photos.
- `public/`: Static files for the frontend.

## API Endpoints

- `GET /photos`: Fetch paginated photos.
- `DELETE /photos/:id`: Delete a photo by ID.
- `GET /tags`: Fetch tags with photo counts.
- `GET /tags/:tag`: Fetch photos by tag.

## License

This project is licensed under the MIT License.
```

Feel free to modify the instructions and project details according to your needs.
