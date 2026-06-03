import { configureStore } from "@reduxjs/toolkit"

import authReducer from "./features/auth/authSlice"
import todoReducer from "./features/todos/todoSlice"
import analyticsReducer from "./features/analytics/analyticsSlice"
import aiReducer from "./features/ai/aiSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    todos: todoReducer,
    analytics: analyticsReducer,
    ai: aiReducer,
  },
});