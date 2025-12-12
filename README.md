# Frontend Test - Chat Dashboard

A modern React chat dashboard application with live API integration, built with TypeScript, Vite, and Styled Components.

## Setup Instructions

### Prerequisites

- **Node.js** (v18 or higher recommended)
- **npm** or **yarn** package manager

### Installation

1. **Clone the repository** (if applicable) or navigate to the project directory:
   ```bash
   cd frontend-test
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser** and navigate to the URL shown in the terminal (typically `http://localhost:5173`)

### Available Scripts

- `npm run dev` - Start the development server with hot module replacement (HMR)
- `npm run build` - Build the application for production
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint to check for code issues

### Build for Production

```bash
npm run build
```

The production-ready files will be generated in the `dist` directory.

## APIs Used

This application integrates with **JSONPlaceholder**, a free fake REST API for testing and prototyping.

### Base URL
```
https://jsonplaceholder.typicode.com
```

### Endpoints Used

1. **GET `/users`**
   - **Purpose**: Fetch all users to populate the chat list and sidebar
   - **Used in**: `ChatList`, `Sidebar`
   - **Response**: Array of user objects with id, name, email, phone, address, company, etc.

2. **GET `/users/:id`**
   - **Purpose**: Fetch detailed information for a specific user
   - **Used in**: `DetailsPanel`, `ChatWindow`
   - **Response**: Single user object with complete details

3. **GET `/posts`**
   - **Purpose**: Fetch all posts (optionally filtered by userId)
   - **Used in**: `ChatList`, `ChatWindow`, `Sidebar`
   - **Response**: Array of post objects with id, userId, title, body

4. **GET `/comments`**
   - **Purpose**: Fetch comments (optionally filtered by postId)
   - **Used in**: `ChatWindow`
   - **Response**: Array of comment objects with id, postId, name, email, body

### API Service Location

All API functions are centralized in `src/services/api.ts`:
- `fetchUsers()` - Fetch all users
- `fetchUser(id)` - Fetch a single user by ID
- `fetchPosts(userId?)` - Fetch posts, optionally filtered by userId
- `fetchComments(postId?)` - Fetch comments, optionally filtered by postId
- `fetchPostsWithComments(userId)` - Fetch posts with their associated comments

## Assumptions Made

### Data Mapping

1. **Chat List**
   - Users from the API are displayed as chat contacts
   - Latest post body is used as the message snippet
   - Timestamps are generated dynamically (not from API) since JSONPlaceholder doesn't provide timestamp data
   - Color coding is assigned sequentially from a predefined palette

2. **Chat Messages**
   - User posts are converted to incoming messages (from user)
   - Comments on posts are converted to outgoing messages (from support)
   - Message timestamps are simulated (JSONPlaceholder doesn't provide real-time data)
   - Only the first 5 posts are displayed to avoid overwhelming the UI

3. **User Details**
   - User data from the API directly populates the details panel
   - Company name is used as the team name
   - Company catch phrase is displayed in the notes section
   - City from address is used in contact labels
   - Post titles are truncated and displayed as "Other Chats"

4. **Sidebar Users**
   - Badge counts represent the number of posts each user has created
   - The second user (index 1) is marked as active by default
   - Only the first 9 users are displayed

### Component Interactions

1. **State Management**
   - The Dashboard component manages the selected user ID
   - When a user is clicked in ChatList, it updates the shared state
   - ChatWindow and DetailsPanel react to the selected user ID change

2. **Loading States**
   - All API calls show loading indicators during fetch operations
   - Error states are displayed if API calls fail
   - Components gracefully handle missing or incomplete data

3. **Default Selection**
   - The first user (ID: 1) is selected by default when the app loads
   - This ensures there's always content visible in ChatWindow and DetailsPanel

### UI/UX Assumptions

1. **Real-time Updates**
   - Since JSONPlaceholder is a static API, data doesn't update in real-time
   - Component re-renders occur on user selection, not on data changes

2. **Data Formatting**
   - Phone numbers are displayed as-is from the API
   - Names are split into first and last name for the details panel
   - Dates are formatted in a readable format (e.g., "28 August 2025")

3. **Error Handling**
   - Network errors are caught and displayed as user-friendly error messages
   - Components continue to function even if some API calls fail
   - Console errors are logged for debugging purposes

### Technical Assumptions

1. **Browser Support**
   - Modern browsers with ES6+ support
   - Fetch API support (available in all modern browsers)

2. **Network**
   - Internet connection required to fetch data from JSONPlaceholder
   - CORS is handled by JSONPlaceholder (no additional configuration needed)

3. **Type Safety**
   - All API responses are typed with TypeScript interfaces
   - Type checking ensures data consistency throughout the application

## Project Structure

```
src/
├── components/         # React components
│   ├── ChatList.tsx   # Displays list of chat contacts
│   ├── ChatWindow.tsx # Main chat conversation view
│   ├── DetailsPanel.tsx # User details and information
│   ├── Sidebar.tsx    # Navigation sidebar with users/teams
│   └── Topbar.tsx     # Top navigation bar
├── pages/             # Page components
│   ├── Dashboard.tsx  # Main dashboard layout
│   └── Home.tsx       # Home page
├── services/          # API and service functions
│   └── api.ts         # JSONPlaceholder API integration
└── assets/            # Images, icons, and other static assets
```

## Technologies Used

- **React 19.2.0** - UI library
- **TypeScript 5.9.3** - Type safety
- **Vite 7.2.4** - Build tool and dev server
- **Styled Components 6.1.19** - CSS-in-JS styling
- **JSONPlaceholder API** - Fake REST API for data

## Notes

- This is a demonstration project showcasing API integration skills
- JSONPlaceholder returns the same data for each request (it's a static API)
- All timestamps and real-time features are simulated
- The application is fully responsive and works on mobile, tablet, and desktop devices
