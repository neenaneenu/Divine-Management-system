import { createSlice} from "@reduxjs/toolkit"

const userSlice = createSlice({
    name: "User ",
    initialState: {
        name: "",
        email: "",
        password: ""
    },
    reducers:{
        createUser: (state, action)=>{
            state.name = action.payload.name
            state.email = action.payload.email
            state.password = action.payload.password
        }
    }
})
export const {createUser} =userSlice.actions
export const{ reducers: userReducer} = userSlice