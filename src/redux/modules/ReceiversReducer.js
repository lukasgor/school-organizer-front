import axios from 'axios'
import { ROOT_URL } from '../ApiConfig'
import {toastr} from 'react-redux-toastr'
import { normalize, Schema, arrayOf } from 'normalizr'
import { camelizeKeys } from 'humps'

// Constants
// export const constants = { }
export const START_STUDENTS_FETCH = 'school-organizer/receivers/START_STUDENTS_FETCH'
export const FINISH_STUDENTS_FETCH = 'school-organizer/receivers/FINISH_STUDENTS_FETCH'

export const START_TEACHERS_FETCH = 'school-organizer/receivers/START_TEACHERS_FETCH'
export const FINISH_TEACHERS_FETCH = 'school-organizer/receivers/FINISH_TEACHERS_FETCH'

export const START_GROUPS_FETCH = 'school-organizer/receivers/START_GROUPS_FETCH'
export const FINISH_GROUPS_FETCH = 'school-organizer/receivers/FINISH_GROUPS_FETCH'

export const CHANGE_ACTIVE_TAB = 'school-organizer/receivers/CHANGE_ACTIVE_TAB'
export const PAGINATED_ENTITIES = 'school-organizer/receivers/PAGINATED_ENTITIES'

// Action Creators
// export const actions = { }
export const getPaginatedStudents = (page = 1) => {
  return function(dispatch) {
    dispatch({type: START_STUDENTS_FETCH})
    axios.get(`${ROOT_URL}/api/v1/students/get_students`, { 
      headers: { authorization: localStorage.getItem('token') },
      params: { page: page }
    })
      .then(function(response) {
        let camelized = camelizeKeys(response.data)
        let normalized = normalize(camelized, { 
          students: arrayOf(student)
        })
        dispatch({type: FINISH_STUDENTS_FETCH, 
                  paginated: true,
                  response: normalized, 
                  count: response.data.count,
                  page: page
                })
      })
      .catch(function(response) {
        toastr.warning('Warning', 'Something bad happened')
      })
  }
}

export const getPaginatedTeachers = (page = 1) => {
  return function(dispatch) {
    dispatch({type: START_TEACHERS_FETCH})
    axios.get(`${ROOT_URL}/api/v1/teachers/get_teachers`, { 
      headers: { authorization: localStorage.getItem('token') },
      params: { page: page }
    })
      .then(function(response) {
        let camelized = camelizeKeys(response.data)
        let normalized = normalize(camelized, { 
          teachers: arrayOf(teacher)
        })
        dispatch({type: FINISH_TEACHERS_FETCH, 
                  paginated: true,
                  response: normalized, 
                  count: response.data.count,
                  page: page
                })
      })
      .catch(function(response) {
        toastr.warning('Warning', 'Something bad happened')
      })
  }
}

export const getPaginatedGroups = (page = 1) => {
  return function(dispatch) {
    dispatch({type: START_GROUPS_FETCH})
    axios.get(`${ROOT_URL}/api/v1/groups/get_groups`, { 
      headers: { authorization: localStorage.getItem('token') },
      params: { page: page }
    })
      .then(function(response) {
        let camelized = camelizeKeys(response.data)
        let normalized = normalize(camelized, { 
          groups: arrayOf(group)
        })
        console.log(response)
        dispatch({type: FINISH_GROUPS_FETCH, 
                  paginated: true,
                  response: normalized, 
                  count: response.data.count,
                  page: page
                })
      })
      .catch(function(response) {
        toastr.warning('Warning', 'Something bad happened')
      })
  }
}

export const getAllLessons = () => {
  return function(dispatch) {
    axios.get(`${ROOT_URL}/api/v1/lessons/get_lessons`, { 
      headers: { authorization: localStorage.getItem('token') }
    })
      .then(function(response) {
        let camelized = camelizeKeys(response.data)
        let normalized = normalize(camelized, { 
          lessons: arrayOf(lesson)
        })
        dispatch({ response: normalized })
      })
      .catch(function(response) {
        toastr.warning('Warning', 'Something bad happened')
      })
  }
}

export const changeActiveTab = (activeTab = 'students') => {
  return function(dispatch) {
    dispatch({type: CHANGE_ACTIVE_TAB, activeTab: activeTab})
  }
}

// Reducer
export const initialState = { activeTab: 'students', activePage: 1,
                              students: { loaded: false, count: 0 },
                              teachers: { loaded: false, count: 0 },
                              groups: { loaded: false, count: 0 },
                              lessons: { loaded: false, count: 0 }
                            }
export default function (state = initialState, action) {
  switch (action.type) {
    case START_STUDENTS_FETCH:
      return {...state}
    case FINISH_STUDENTS_FETCH:
      return {...state, activePage: action.page, students: {loaded: true, count: action.count}}
    case START_TEACHERS_FETCH:
      return {...state}
    case FINISH_TEACHERS_FETCH:
      return {...state, activePage: action.page, teachers: {loaded: true, count: action.count}}
    case START_GROUPS_FETCH:
      return {...state}
    case FINISH_GROUPS_FETCH:
      return {...state, activePage: action.page, groups: {loaded: true, count: action.count}}
    case CHANGE_ACTIVE_TAB:
      return {...state, activeTab: action.activeTab}
    default:
      return state
  }
}

// Schemas
const group = new Schema('groups')
const lesson = new Schema('lessons')
const student = new Schema('students')
const teacher = new Schema('teachers')

group.define({
})

lesson.define({
})

student.define({
})

teacher.define({
})
