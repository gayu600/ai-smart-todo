import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API = `${process.env.NEXT_PUBLIC_API_URL}/api/ai`;

const getToken = (thunkAPI) => {
  return thunkAPI.getState().auth.token || localStorage.getItem("token");
};

const getStoredAI = () => {
  if (typeof window === "undefined") return null;

  const data = localStorage.getItem("aiData");
  return data ? JSON.parse(data) : null;
};

const saveAIToStorage = (state) => {
  if (typeof window === "undefined") return;

  localStorage.setItem(
    "aiData",
    JSON.stringify({
      plan: state.plan,
      suggestions: state.suggestions,
      breakResult: state.breakResult,
    })
  );
};

const storedAI = getStoredAI();

export const planDay = createAsyncThunk(
  "ai/planDay",
  async (_, thunkAPI) => {
    try {
      const token = getToken(thunkAPI);

      const response = await axios.post(
        `${API}/plan-day`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      console.log("PLAN DAY ERROR:", error.response?.data || error.message);

      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to generate plan"
      );
    }
  }
);

export const suggestMood = createAsyncThunk(
  "ai/suggestMood",
  async (mood, thunkAPI) => {
    try {
      const token = getToken(thunkAPI);

      const response = await axios.post(
        `${API}/suggest-by-mood`,
        { mood },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      console.log("MOOD ERROR:", error.response?.data || error.message);

      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to get suggestions"
      );
    }
  }
);

export const breakTask = createAsyncThunk(
  "ai/breakTask",
  async (task, thunkAPI) => {
    try {
      const token = getToken(thunkAPI);

      const response = await axios.post(
        `${API}/break-task`,
        { task },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      console.log("BREAK TASK ERROR:", error.response?.data || error.message);

      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to break task"
      );
    }
  }
);

const aiSlice = createSlice({
  name: "ai",

  initialState: {
    plan: storedAI?.plan || null,
    suggestions: storedAI?.suggestions || [],
    breakResult: storedAI?.breakResult || null,
    loading: false,
    error: null,
  },

  reducers: {
    clearAIResult: (state) => {
      state.plan = null;
      state.suggestions = [];
      state.breakResult = null;
      state.error = null;

      localStorage.removeItem("aiData");
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(planDay.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(planDay.fulfilled, (state, action) => {
        state.loading = false;
        state.plan = action.payload;
        saveAIToStorage(state);
      })

      .addCase(planDay.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(suggestMood.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(suggestMood.fulfilled, (state, action) => {
        state.loading = false;
        state.suggestions = action.payload.suggestions || [];
        saveAIToStorage(state);
      })

      .addCase(suggestMood.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(breakTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(breakTask.fulfilled, (state, action) => {
        state.loading = false;
        state.breakResult = action.payload;
        saveAIToStorage(state);
      })

      .addCase(breakTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearAIResult } = aiSlice.actions;

export default aiSlice.reducer;