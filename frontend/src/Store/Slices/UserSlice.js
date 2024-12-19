import {createSlice} from "@reduxjs/toolkit"

const initialState ={
    name : '',
    email : "",
    currentWeight : 0 ,
    DOB : 0,
    id: 0 ,
    isLoggedIn : false
}

const userSlice = createSlice({
    name :'user',
    initialState,
    reducers:{
        login(state , action){
            state.name = action.payload.name
            state.email = action.payload.email
            state.currentWeight = action.payload.currentWeight
            state.DOB = action.payload.DOB
            state.id = action.payload.id
            state.isLoggedIn = true
        },
        logout(state){
            state.name = ''
            state.email = ''
            state.currentWeight = 0
            state.DOB = 0
            state.id = 0 
            state.isLoggedIn = false
        }
    }
})

export const {login , logout }= userSlice.actions

export default userSlice.reducer