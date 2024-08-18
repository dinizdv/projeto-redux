import { createSlice } from '@reduxjs/toolkit'

// state
const initialState = {
    user: null,
    users: [{}],
    loading: false
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        createUser: (state, action) => {
            console.log(action.payload) // payload = infos
            return {
                ...state,
                user: {
                    name: action.payload.name,
                    email: action.payload.email,
                    address: null
                }
            }    
        },

        logoutUser: (state) => {
            return {
                ...state,
                user: null
            }
        },

        addAddress: (state, action) => {
            if (action.payload.location === '' || action.payload.number === ''){
                alert('fill in the blank fields')
                return {...state}
            }

            if(state.user === null){
                alert('Sign in for to register')
                return {...state}
            }

            alert('updated data')

            return {
                ...state,
                user: {
                    ...state.user,
                    address: {
                        location: action.payload.location,
                        number: action.payload.number
                    }
                }
            }

        },

        deleteAddress: (state) => {
            return {
                ...state,
                user: {
                    ...state.user,
                    address: null
                }
            }
        },

        fetchUsers: (state) => {
            console.log('fetch users...')
            state.loading = true
        },

        fetchUsersSuccess: (state, action) => {
            console.log('success...')
            console.log(action.payload)
            state.users = [...action.payload]
            console.log('users: ', state.users)
            state.loading = false
        },

        fetchUsersFailure: (state, action) => {
            console.log('failure...')
            console.log(action.payload)
            state.loading = false
        },

        fetchUserById: (state) => {
            console.log('slide id')
        },

        fetchUserByIdSuccess: (state, action) => {
            console.log('id user success')
            console.log(action.payload)
        },
        fetchUserByIdFailure: (state, action) => {
            console.log('id user failure')
            console.log(action.payload)
        }
    } // actions to update
})

export const { createUser, logoutUser, addAddress, deleteAddress, fetchUsers, fetchUsersSuccess, fetchUsersFailure, fetchUserById, fetchUserByIdSuccess, fetchUserByIdFailure } = userSlice.actions
export default userSlice.reducer

// each feature