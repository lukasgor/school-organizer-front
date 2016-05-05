import React, { Component } from 'react'
import LessonStudentListItem from './LessonStudentListItem'

class LessonStudentList extends Component {
  constructor(props) {
    super(props)
    this.renderLessonStudentListItem = this.renderLessonStudentListItem.bind(this)
  }
  renderLessonStudentListItem() {
    const students = this.props.students
    let studentList = []
    if(students.length > 0) {
      students.map((el, index) => {
        studentList.push(<LessonStudentListItem 
                            student={el}
                            key={index}
                            display={this.props.display}/>)
      })
      return studentList
    } else {
      return (
        <li className="list-group-item">No students found</li>
      )
    }
  }
  render() {
    return (
      <div>
        {this.renderLessonStudentListItem()}
        <br />
        {this.props.display == 'addGrades' ? <button className="btn btn-lg btn-success">Confirm all</button> : '' }
      </div>
    )
  }
}

export default LessonStudentList