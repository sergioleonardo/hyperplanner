import React, { useState } from 'react'
import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core/styles'
import { Typography, Button } from '@material-ui/core'
import Collapse from '@material-ui/core/Collapse'
import { useQuery } from '@apollo/react-hooks'
import ReactLoading from 'react-loading'
import { GET_COURSES_QUERY } from '../utils/gqlQueries'
import Course from './Course'
import { Courses } from '../generated/graphql'
import CourseModal from './CourseModal'

interface yearProps {
  yearNumber: number
}

const useStyles = makeStyles((theme) => ({
  mainCard: {
    background: '#23252e',
    margin: theme.spacing(2),
    width: theme.spacing(25),
    height: theme.spacing(70),
    flexGrow: 1,
    overflowY: 'scroll',
    overflowX: 'hidden',
    scrollbarWidth: 'thin',
    scrollbarColor: '#282c34 #3a3f55',
    [theme.breakpoints.down('xs')]: {
      marginTop: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: '88%',
    },
    [theme.breakpoints.down('sm')]: {
      marginTop: theme.spacing(1),
      width: '97%',
    },
  },
  semesterHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  courseContainer: {
    background: '#23252e',
  },
  yearText: {
    color: '#fff',
    fontSize: '22px',
  },

  paper: {
    background: '#23252e',
    margin: theme.spacing(1),
    marginRight: theme.spacing(0),
  },
  semesterButton: {
    color: '#white',
    textAlign: 'left',
    alignItems: 'flex-start',
  },
  loadingStyle: {
    display: 'flex',
    justifyContent: 'center',
  },
}))

function Year({ yearNumber }: yearProps): JSX.Element {
  const classes = useStyles()

  const [checkedFall, setCheckedFall] = useState(true)
  const handleChangeFall = () => {
    setCheckedFall((prev) => !prev)
  }

  const [checkedSpring, setCheckedSpring] = useState(true)
  const handleChangeSpring = () => {
    setCheckedSpring((prev) => !prev)
  }

  const [checkedSummer, setCheckedSummer] = useState(true)
  const handleChangeSummer = () => {
    setCheckedSummer((prev) => !prev)
  }

  const { loading, error, data } = useQuery(GET_COURSES_QUERY)

  if (loading) {
    return (
      <div className={classes.loadingStyle}>
        <ReactLoading type="cylon" color="#f50057" height="2%" width="2%" />
      </div>
    )
  }

  if (error) {
    return (
      <Paper elevation={12} className={classes.mainCard}>
        <Typography className={classes.yearText}>Year {yearNumber}</Typography>
        <div className={classes.semesterHeader}>
          <Button
            color="secondary"
            onClick={handleChangeFall}
            className={classes.semesterButton}>
            Fall: 0
          </Button>
        </div>
        <div className={classes.courseContainer}>
          <Collapse in={checkedFall}>
            <Paper elevation={0} className={classes.paper} />
          </Collapse>
        </div>
        <div className={classes.semesterHeader}>
          <Button
            color="secondary"
            onClick={handleChangeSpring}
            className={classes.semesterButton}>
            Spring: 0
          </Button>
        </div>
        <div className={classes.courseContainer}>
          <Collapse in={checkedSpring}>
            <Paper elevation={0} className={classes.paper} />
          </Collapse>
        </div>
        <div className={classes.semesterHeader}>
          <Button
            color="secondary"
            onClick={handleChangeSummer}
            className={classes.semesterButton}>
            Summer: 0
          </Button>
        </div>
        <div className={classes.courseContainer}>
          <Collapse in={checkedSummer}>
            <Paper elevation={0} className={classes.paper} />
          </Collapse>
        </div>
      </Paper>
    )
  }

  const { courses } = data

  return (
    <Paper elevation={12} className={classes.mainCard}>
      <Typography className={classes.yearText}>Year {yearNumber}</Typography>
      <div className={classes.semesterHeader}>
        <Button
          color="secondary"
          onClick={handleChangeFall}
          className={classes.semesterButton}>
          Fall:{' '}
          {courses
            .filter((course: Courses) => course.term === `fall${yearNumber}`)
            .reduce(
              (count: number, course: Courses) => count + course.credits,
              0,
            )}
        </Button>
        <CourseModal year={String(yearNumber)} term="Fall" />
      </div>
      <div className={classes.courseContainer}>
        <Collapse in={checkedFall}>
          <Paper elevation={0} className={classes.paper}>
            {courses
              .filter((course: Courses) => course.term === `fall${yearNumber}`)
              .map((course: Courses) => (
                <Course
                  key={course.term + course.code}
                  code={course.code}
                  title={course.title}
                  credits={course.credits}
                  type={course.type}
                  campus={course.campus}
                  writInten={course.writ_inten}
                  term={course.term}
                />
              ))}
          </Paper>
        </Collapse>
      </div>
      <div className={classes.semesterHeader}>
        <Button
          color="secondary"
          onClick={handleChangeSpring}
          className={classes.semesterButton}>
          Spring:{' '}
          {courses
            .filter((course: Courses) => course.term === `spring${yearNumber}`)
            .reduce(
              (count: number, course: Courses) => count + course.credits,
              0,
            )}
        </Button>
        <CourseModal year={String(yearNumber)} term="Spring" />
      </div>
      <div className={classes.courseContainer}>
        <Collapse in={checkedSpring}>
          <Paper elevation={0} className={classes.paper}>
            {courses
              .filter(
                (course: Courses) => course.term === `spring${yearNumber}`,
              )
              .map((course: Courses) => (
                <Course
                  key={course.term + course.code}
                  code={course.code}
                  title={course.title}
                  credits={course.credits}
                  type={course.type}
                  campus={course.campus}
                  writInten={course.writ_inten}
                  term={course.term}
                />
              ))}
          </Paper>
        </Collapse>
      </div>
      <div className={classes.semesterHeader}>
        <Button
          color="secondary"
          onClick={handleChangeSummer}
          className={classes.semesterButton}>
          Summer:{' '}
          {courses
            .filter((course: Courses) => course.term === `summer${yearNumber}`)
            .reduce(
              (count: number, course: Courses) => count + course.credits,
              0,
            )}
        </Button>
        <CourseModal year={String(yearNumber)} term="Summer" />
      </div>
      <div className={classes.courseContainer}>
        <Collapse in={checkedSummer}>
          <Paper elevation={0} className={classes.paper}>
            {courses
              .filter(
                (course: Courses) => course.term === `summer${yearNumber}`,
              )
              .map((course: Courses) => (
                <Course
                  key={course.term + course.code}
                  code={course.code}
                  title={course.title}
                  credits={course.credits}
                  type={course.type}
                  campus={course.campus}
                  writInten={course.writ_inten}
                  term={course.term}
                />
              ))}
          </Paper>
        </Collapse>
      </div>
    </Paper>
  )
}

export default Year
