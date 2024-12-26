import {createSlice} from "@reduxjs/toolkit"

const initialState ={
    name : '',
    email : "",
    currentWeight : 0 ,
    DOB : 0,
    id: 0 ,
    isLoggedIn : false,
    accessToken : '',
    profileImage : ''
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
            state.accessToken = action.payload.accessToken
            state.isLoggedIn = true
        },
        profileImage(state , action){
            state.profileImage = action.payload
        },
        logout(state){
            state.name = 'adfghiufdsbiuydswfgipubdfgisuabdfghi;sugdsfibhu'
            state.email = ''
            state.currentWeight = 0
            state.DOB = 0
            state.id = 0 
            state.isLoggedIn = false
        }
    }
})

export const {login , logout , profileImage }= userSlice.actions

export default userSlice.reducer