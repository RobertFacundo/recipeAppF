# Recipe Finder Frontend

Link to backend: [Recipe Finder Backend](https://github.com/tuusuario/recipeappb-backend)

A React-based frontend for searching, viewing, and saving recipes. Users can authenticate, manage favorites, and explore recipe details with ingredients and instructions. Components are fully reusable and hooks handle all API calls using Axios.

---

## 🚀 Technologies Used

- React 19
- Tailwind CSS 4
- Vite
- Axios
- React Context API
- Custom React Hooks

---

## 📦 API Endpoints (via backend)

The frontend communicates with the backend via these endpoints:

```json
[
  { "method": "POST", "endpoint": "/api/v1/auth/signup", "description": "Register a new user" },
  { "method": "POST", "endpoint": "/api/v1/auth/login", "description": "Login user" },
  { "method": "GET", "endpoint": "/api/v1/search?ingredients=<ingredients>", "description": "Search recipes by ingredients" },
  { "method": "GET", "endpoint": "/api/v1/external/:id", "description": "Get details for a specific recipe" },
  { "method": "POST", "endpoint": "/api/v1/recipes", "description": "Save a recipe as favorite" },
  { "method": "GET", "endpoint": "/api/v1/recipes", "description": "Get all saved favorites" },
  { "method": "GET", "endpoint": "/api/v1/recipes/check/:externalId", "description": "Check if a recipe is saved" }
]
```

> All endpoints use JSON and are protected with JWT authentication where applicable.

---

## 💡 Key Features

- **User Authentication**: Login, register, and logout functionality with JWT token handling.
- **Recipe Search**: Search recipes by ingredients using Spoonacular API (via backend).
- **Recipe Details**: View detailed information including summary, ingredients, and instructions.
- **Favorites Management**: Save and view favorite recipes.
- **Reusable Components**: Components and hooks are modular and reusable.
- **Error Handling**: Displays server and API errors to the user in a clear way.
- **Responsive UI**: Fully responsive layout using Tailwind CSS.

---

## 📂 Project Structure

```bash
src/
├─ components/ # Reusable UI components
├─ contexts/ # React Contexts (Auth, Recipes, Navigation)
├─ hooks/ # Custom hooks (useFavorites, useIngredients)
├─ services/ # Axios services for API calls
├─ App.jsx # Main app component
└─ main.jsx # Entry point
```

----

## 📬 Contact

- LinkedIn: [Facundo Robert](https://www.linkedin.com/in/robertfacundodev/)
- Portfolio: [My Portfolio](https://facundorobert.vercel.app/) 
- Email: robertf.coder@gmail.com
