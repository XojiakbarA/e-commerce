import { createStore, applyMiddleware, compose } from "redux"
import { createWrapper } from "next-redux-wrapper"
import rootReducer from "./reducers/rootReducer"
import thunk from "redux-thunk"

const middleware = [thunk]

const makeStore = () => createStore(rootReducer)

export const wrapper = createWrapper(makeStore)