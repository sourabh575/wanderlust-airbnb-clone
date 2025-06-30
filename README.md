# Wanderlust - Travel Stay Booking Platform

Wanderlust is a full-stack web application that allows users to discover, list, and book unique stays around the world. Built with Node.js, Express, MongoDB, and EJS, it provides a seamless experience for both travelers and property owners.

## Features

- 🏠 Property Listings with detailed information and images
- 👤 User Authentication and Authorization
- 💬 Review and Rating System
- 📍 Location-based search
- 📱 Responsive Design
- 🔒 Secure user data handling
- 💳 (Optional) Payment Integration

## Tech Stack

- **Frontend**: HTML, CSS, JavaScript, Bootstrap 5
- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: Passport.js
- **Image Storage**: Cloudinary
- **Maps**: Mapbox
- **Other Tools**: EJS templating, Express Session

## Screenshots

Add the following screenshots to showcase your application (create a `screenshots` folder in your project root):

1. `homepage.png` - Landing page with featured listings
2. `listings.png` - All listings page with search functionality
3. `listing-detail.png` - Individual listing page with details and reviews
4. `user-profile.png` - User dashboard/profile page
5. `add-listing.png` - Form to create new listing
6. `responsive.png` - Mobile responsive views

## Setup and Installation

1. Clone the repository:
   ```bash
   git clone <your-repo-url>
   cd wanderlust
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with the following variables:
   ```
   MONGODB_URL=your_mongodb_connection_string
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   MAPBOX_TOKEN=your_mapbox_token
   SECRET=your_session_secret
   ```

4. Initialize the database:
   ```bash
   node init/index.js
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

## Project Structure

```
wanderlust/
├── controllers/      # Route controllers
├── models/          # Database models
├── routes/          # Route definitions
├── views/           # EJS templates
├── public/          # Static files
│   ├── css/        # Stylesheets
│   ├── js/         # Client-side JavaScript
│   └── images/     # Static images
├── middleware/      # Custom middleware
├── utils/          # Utility functions
└── init/           # Database initialization
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Bootstrap](https://getbootstrap.com/)
- [Mapbox](https://www.mapbox.com/)
- [Cloudinary](https://cloudinary.com/)

## Contact

Your Name - [your-email@example.com](mailto:your-email@example.com)

Project Link: [https://github.com/yourusername/wanderlust](https://github.com/yourusername/wanderlust)
