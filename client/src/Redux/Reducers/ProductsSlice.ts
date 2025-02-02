import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { IProduct } from "@/interfaces/Products.interface";
import axios, { AxiosError } from "axios";
import Cookies from "js-cookie";

// Define the state structure
interface ProductsState {
  productsData: IProduct[];
  currentProduct: IProduct | null;
  loading: boolean;
  error: string | null;
  activeTab: string;
  formValues: unknown;
}

const API_URI = `${process.env.NEXT_PUBLIC_API_URL}/edit-website/products`;

// Thunk to fetch all products
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(API_URI, {
        headers: {
          Authorization: `Bearer ${Cookies.get("auth_token")}`,
        },
      });

      if (response.status !== 200) {
        throw new Error(`Failed to fetch products. Status: ${response.status}`);
      }

      return response.data.data as IProduct[];
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(
          error?.response?.data || "Failed to fetch products"
        );
      }
    }
  }
);

// Thunk to fetch a single product by Slug
export const fetchProductById = createAsyncThunk(
  "products/fetchProductBySlug",
  async (productSlug: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URI}/${productSlug}`, {
        headers: {
          Authorization: `Bearer ${Cookies.get("auth_token")}`,
        },
      });

      if (response.status !== 200) {
        return rejectWithValue(
          response.data.message || "Failed to fetch product."
        );
      }

      return response.data.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(
          error?.response?.data || "An unexpected error occurred."
        );
      }
    }
  }
);

// Thunk to create a new product
export const createProduct = createAsyncThunk(
  "products/createProduct",
  async (newProduct: FormData, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.post(API_URI, newProduct, {
        headers: {
          Authorization: `Bearer ${Cookies.get("auth_token")}`,
        },
      });

      if (response.status !== 201) {
        return rejectWithValue(
          response.data.message || "Failed to create product."
        );
      }

      const createdProduct = response.data;
      dispatch(addProduct(createdProduct)); // add product to the store
      return createdProduct;
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(
          error?.response?.data || "An unexpected error occurred."
        );
      }
    }
  }
);

// Thunk to update an existing product
export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async (
    { formData, slug }: { formData: FormData; slug: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.patch(`${API_URI}/${slug}`, formData, {
        headers: {
          Authorization: `Bearer ${Cookies.get("auth_token")}`,
        },
      });

      if (response.status !== 200) {
        return rejectWithValue(
          response.data.message || "Failed to update product."
        );
      }

      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(
          error?.response?.data || "An unexpected error occurred."
        );
      }
    }
  }
);

// Thunk to delete a product
export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (productId: string, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.delete(`${API_URI}/${productId}`, {
        headers: {
          Authorization: `Bearer ${Cookies.get("auth_token")}`,
        },
      });

      if (response.status !== 200) {
        return rejectWithValue(
          response.data.message || "Failed to delete product."
        );
      }

      dispatch(removeProduct(productId)); // Remove product from store
      return productId;
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(
          error?.response?.data || "An unexpected error occurred."
        );
      }
    }
  }
);

// Initial state
const initialState: ProductsState = {
  productsData: [],
  currentProduct: null,
  loading: false,
  error: null,
  activeTab: "1", // Default active tab
  formValues: {
    name: "",
    name_ar: "",
    description: "",
    description_ar: "",
    parentProductId: null,
    thumbnail: "",
    images: [],
    published: false,
  },
};

// Products slice
const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setCurrentProduct: (state, action) => {
      state.currentProduct = action.payload;
    },
    clearCurrentProduct: (state) => {
      state.currentProduct = null;
    },
    addProduct: (state, action) => {
      state.productsData.push(action.payload); // Add new product to the list
    },
    removeProduct: (state, action: PayloadAction<string>) => {
      state.productsData = state.productsData.filter(
        (product) => product._id !== action.payload
      );
    },
    setActiveTab: (state, action: PayloadAction<string>) => {
      state.activeTab = action.payload; // Set active tab (All, published, unpublished)
    },
    // New action to update the form values
    setFormValues: (state, action: PayloadAction<unknown>) => {
      state.formValues = action.payload;
    },
    clearFormValues: (state) => {
      state.formValues = initialState.formValues;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        state.productsData = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to load products data.";
      })
      .addCase(fetchProductById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentProduct = action.payload;
        // Set form values based on the fetched product data
        state.formValues = {
          name: action.payload.name,
          name_ar: action.payload.name_ar,
          description: action.payload.description,
          description_ar: action.payload.description_ar,
          parentProductId: action.payload.parentProductId,
          thumbnail: action.payload.thumbnail,
          images: action.payload.images,
          published: action.payload.published,
        };
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch product.";
      })
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.productsData.findIndex(
          (product) => product._id === action.payload._id
        );
        if (index !== -1) {
          state.productsData[index] = action.payload; // Update product
        }
        state.currentProduct = action.payload;
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to update product.";
      });
  },
});

// Export actions and reducer
export const {
  setCurrentProduct,
  clearCurrentProduct,
  addProduct,
  removeProduct,
  setActiveTab,
  setFormValues,
  clearFormValues,
} = productsSlice.actions;

export default productsSlice.reducer;
