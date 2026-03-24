# Frontend Agents Guide

## Project Overview

React SPA with Redux Toolkit. Trello-like board management interface.

## Tech Stack

- **Framework**: React 18
- **State Management**: Redux Toolkit + redux-persist
- **UI Library**: Material UI (MUI) v5
- **Routing**: React Router v6
- **HTTP Client**: Axios with interceptors
- **Forms**: React Hook Form
- **Drag & Drop**: @dnd-kit
- **Notifications**: react-toastify
- **Real-time**: Socket.io-client

## Directory Structure

```
src/
├── apis/            # API call wrappers
├── assets/          # Static assets
├── components/      # Reusable UI components
│   ├── ActiveCardModal/
│   ├── AppBar/
│   ├── EditableTitle/
│   ├── Form/
│   ├── Loading/
│   └── ModeSelect/
├── customHooks/     # Custom React hooks
├── pages/           # Route-level components
│   ├── Auth/
│   ├── Boards/
│   ├── NotFound/
│   ├── Settings/
│   └── Users/
├── redux/           # Redux slices & store
│   ├── user/
│   ├── activeBoard/
│   ├── activeCard/
│   ├── activeNotifications/
│   └── shareState/
├── socket/          # Socket.io handlers
├── theme.js         # MUI theme configuration
└── utils/           # Helpers, constants, axios instance
```

## Key Patterns

### Import Alias
Use `~` to reference `src/` directory:
```javascript
import { Account } from '~/pages/Settings/Account'
import { selectCurrentUser } from '~/redux/user/userSlice'
```

### Component Organization (Pages)
```
pages/Feature/
├── Feature.jsx         # Main layout (optional)
├── FeatureOne.jsx       # Sub-component
└── FeatureTwo.jsx      # Sub-component
```

### Redux Pattern
```javascript
// 1. Slice (src/redux/feature/featureSlice.js)
export const featureSlice = createSlice({
  name: 'feature',
  initialState: { data: null },
  extraReducers: (builder) => {
    builder.addCase(fetchDataAPI.fulfilled, (state, action) => {
      state.data = action.payload
    })
  }
})

// 2. API (src/apis/index.js)
export const fetchDataAPI = async (params) => {
  const response = await authorizedAxiosInstance.get('/endpoint', { params })
  return response.data
}

// 3. Component usage
const dispatch = useDispatch()
dispatch(fetchDataAPI(params))
```

### Route Protection Pattern
```javascript
// ProtectedRoute checks if user exists
<ProtectedRoute user={currentUser}>
  <Route path='/boards' element={<Boards />} />
</ProtectedRoute>

// Current user selector
const currentUser = useSelector(selectCurrentUser)
```

### Settings Page Pattern (Sidebar Tabs)
```jsx
<Grid container>
  <Grid item xs={12} md={1.5}>
    <Tabs orientation="vertical">
      <Tab component={Link} to="/setting/section" />
    </Tabs>
  </Grid>
  <Grid item xs={12} md={9}>
    {isSection && <SectionComponent />}
  </Grid>
</Grid>
```

### MUI Theme Usage
```jsx
const theme = useTheme()
// Access: theme.palette.mode, theme.palette.primary.main, etc.
```

## API Layer

### Authorized Axios Instance (`src/utils/authorizeAxios.js`)

Pre-configured axios instance with:
- Base URL: `http://localhost:8017/v1`
- Automatic cookie attachment
- Request/response interceptors
- Token refresh on 410 status
- Auto-logout on 401 status
- Loading state management
- Toast notifications for errors

### API Pattern
```javascript
// In src/apis/index.js
export const createItemAPI = async (data) => {
  const response = await authorizedAxiosInstance.post('/items', data)
  return response.data
}

export const updateItemAPI = async (id, data) => {
  const response = await authorizedAxiosInstance.put(`/items/${id}`, data)
  return response.data
}

export const deleteItemAPI = async (id) => {
  const response = await authorizedAxiosInstance.delete(`/items/${id}`)
  return response.data
}
```

## Auth State

User data stored in Redux (`state.user.currentUser`):
```javascript
{
  _id: string,
  username: string,
  email: string,
  role: 'client' | 'admin',
  avatar: string | null,
  isActive: boolean,
  createdAt: timestamp
}
```

Persisted to localStorage via redux-persist.

## Running the Project

```bash
# Development
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint
npm run lint
```

## Important Files

- `src/main.jsx` - React entry point, Redux provider injection
- `src/App.jsx` - Route definitions
- `src/redux/store.js` - Redux store configuration
- `src/utils/authorizeAxios.js` - Configured axios instance
- `src/utils/constants.js` - API endpoints, constants
- `src/theme.js` - MUI theme (light/dark mode support)

## Common Tasks

### Add New API Endpoint
1. Add function to `src/apis/index.js`
2. Use `authorizedAxiosInstance` methods

### Add New Redux Slice
1. Create `src/redux/feature/featureSlice.js`
2. Add reducer to `src/redux/store.js`
3. Use in components via `useSelector` / `useDispatch`

### Add New Page
1. Create component in `src/pages/Feature/`
2. Add route to `src/App.jsx`
3. Wrap with `<ProtectedRoute>` if auth required

### Add New Component
1. Create folder in `src/components/Feature/`
2. Use MUI components with theme
3. Export from `src/components/` index if needed
