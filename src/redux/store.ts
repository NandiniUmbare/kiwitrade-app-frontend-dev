import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from '../redux/slice/category';
import imageReducer from '../redux/slice/images';
import userReducer from '../redux/slice/user';

const store = configureStore({
    reducer: {
        category: categoryReducer,
        image: imageReducer,
        user: userReducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store