
import { configureStore} from "@reduxjs/toolkit";
import prodReducer from "./prodRoute";
import authReducer from "./authRoute"

  
const store = configureStore({
	reducer: {
	prod: prodReducer,
	auth: authReducer,
	},
})

export default store;