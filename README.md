# MovieHub

**MovieHub** is a React-based web application that allows you to browse movies and TV shows powered by The Movie Database (TMDb) API. Featuring a clean, responsive UI, it supports user authentication, real-time search, and a personalized saved list for your favorite media.

---

## Features

- **Browse Content:** Explore trending, popular, top-rated, and latest movies and TV shows.
- **Search:** Search for movies, TV shows, and people with instant suggestions.
- **User Authentication:** Sign up, log in, and log out using local storage-based authentication.
- **Saved List:** Save movies and TV shows to your personal list (login required).
- **Responsive Design:** Mobile-friendly layout styled with Tailwind CSS.
- **Hero Carousel:** Highlight top trending media with an elegant carousel display.

---

## Tech Stack

- **Frontend:** React, React Router, Tailwind CSS
- **Build Tool:** Vite
- **API:** The Movie Database (TMDb) API
- **State Management:** React Context API
- **Key Dependencies:** Axios, React Icons, React Slick (carousel)

---

## Prerequisites

- Node.js (version 16 or higher)
- TMDb API Key (register at [TMDb](https://www.themoviedb.org))

---

## Setup Instructions

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/movie-hub.git
   cd movie-hub
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Configure environment variables:**

   - Create a `.env` file in the root directory.
   - Add your TMDb API key:
     ```
     VITE_TMDB_API_KEY=your-api-key-here
     ```

4. **Run the development server:**

   ```bash
   npm run dev
   ```

   Open [http://localhost:5173](http://localhost:5173) in your browser.

5. **Build for production:**
   ```bash
   npm run build
   ```

---

## Project Structure

```
src/
 ├── components/      # Reusable UI components (NavBar, PosterCard, etc.)
 ├── pages/           # Page components (Home, Movies, LoginPage, etc.)
 ├── services/        # API and helper functions (tmdb.js, handleAxiosError.js)
 ├── context/         # React Context API for Auth and Media state
 ├── index.css        # Global styles including Tailwind CSS and carousel styles
```

---

## Usage

- **Home Page:** Discover featured and trending movies and TV shows.
- **Movies/TV Shows:** Browse categorized media lists or view detailed info by clicking posters.
- **Search:** Quickly find movies, TV shows, or people with live search suggestions.
- **Authentication:** Sign up or log in to save your favorite media to the "Saved for Later" list.

---

## Contributing

Contributions are welcome! To contribute:

1. Fork the repository.
2. Create a feature branch:
   ```bash
   git checkout -b feature/your-feature
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add your feature"
   ```
4. Push the branch:
   ```bash
   git push origin feature/your-feature
   ```
5. Open a pull request.

---

## License

This project is licensed under the **MIT License**.
