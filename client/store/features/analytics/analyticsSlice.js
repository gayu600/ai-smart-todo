import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API = `${process.env.NEXT_PUBLIC_API_URL}/api/todos`;

const getToken = (thunkAPI) => {
  return thunkAPI.getState().auth.token || localStorage.getItem("token");
};

export const fetchAnalytics = createAsyncThunk(
  "analytics/fetchAnalytics",
  async (_, thunkAPI) => {
    try {
      const token = getToken(thunkAPI);

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const analytics = await axios.get(`${API}/analytics`, config);

      const productiveDay = await axios.get(
        `${API}/productivity-day`,
        config
      );

      const weeklyTrend = await axios.get(
        `${API}/weekly-trend`,
        config
      );

      const completionTrend = await axios.get(
        `${API}/completion-trend`,
        config
      );

      return {
        ...analytics.data,
        ...productiveDay.data,
        weeklyTrend: weeklyTrend.data,
        completionTrend: completionTrend.data,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Analytics fetch failed"
      );
    }
  }
);

const analyticsSlice = createSlice({
  name: "analytics",

  initialState: {
    stats: null,
    loading: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchAnalytics.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchAnalytics.fulfilled, (state, action) => {
        state.loading = false;
        state.stats = action.payload;
      })

      .addCase(fetchAnalytics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default analyticsSlice.reducer;