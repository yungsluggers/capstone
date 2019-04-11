import * as React from 'react'
import Select from 'react-select'
import { withStyles, Theme, createStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import NoSsr from '@material-ui/core/NoSsr'
import TextField from '@material-ui/core/TextField'
import Paper from '@material-ui/core/Paper'
import MenuItem from '@material-ui/core/MenuItem'
import { emphasize } from '@material-ui/core/styles/colorManipulator'

const styles = theme =>
  createStyles({
    root: {
      flexGrow: 1
    },
    input: {
      display: 'flex',
      padding: '6px 0 7px'
    },
    valueContainer: {
      display: 'flex',
      flexWrap: 'wrap',
      flex: 1,
      alignItems: 'flex-end',
      overflow: 'hidden'
    },
    chip: {
      margin: `${theme.spacing.unit / 2}px ${theme.spacing.unit / 4}px`
    },
    chipFocused: {
      backgroundColor: emphasize(
        theme.palette.type === 'light'
          ? theme.palette.grey[300]
          : theme.palette.grey[700],
        0.08
      )
    },
    noOptionsMessage: {
      padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`
    },
    singleValue: {
      fontSize: 16
    },
    paper: {
      position: 'absolute',
      zIndex: 1,
      marginTop: theme.spacing.unit,
      left: 0,
      right: 0
    },
    divider: {
      height: theme.spacing.unit * 2
    }
  })

function inputComponent({ inputRef, ...props }) {
  return <div ref={inputRef} {...props} />
}

function Control(props) {
  return (
    <TextField
      InputProps={{
        inputComponent,
        inputProps: {
          className: props.selectProps.classes.input,
          inputRef: props.innerRef,
          children: props.children,
          ...props.innerProps
        }
      }}
      fullWidth={true}
      {...props.selectProps.textFieldProps}
    />
  )
}

function Option(props) {
  // Fix https://github.com/JedWatson/react-select/issues/3128#issuecomment-439207355
  const { onMouseMove, onMouseOver, ...newInnerProps } = props.innerProps

  return (
    <MenuItem
      buttonRef={props.innerRef}
      selected={props.isFocused}
      component="div"
      style={{
        fontWeight: props.isSelected ? 500 : 400
      }}
      {...newInnerProps}
    >
      {props.children}
    </MenuItem>
  )
}

function SingleValue(props) {
  return (
    <Typography
      className={props.selectProps.classes.singleValue}
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  )
}

function ValueContainer(props) {
  return (
    <div className={props.selectProps.classes.valueContainer}>
      {props.children}
    </div>
  )
}

function Menu(props) {
  return (
    <Paper
      square={true}
      className={props.selectProps.classes.paper}
      {...props.innerProps}
    >
      {props.children}
    </Paper>
  )
}

const components = {
  Control,
  Menu,
  Option,
  SingleValue,
  ValueContainer
}

class ReactSelect extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      value: null
    }

    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    const defaultValue = this.props.defaultValue

    if (
      defaultValue !== undefined &&
      defaultValue !== null &&
      defaultValue !== ''
    ) {
      this.setState(
        {
          value: defaultValue
        },
        () => {
          this.props.onChange(this.state.value)
        }
      )
    }
  }

  render() {
    const { classes, theme, data } = this.props

    const selectStyles = {
      input: base => ({
        ...base,
        color: theme.palette.text.primary,
        '& input': {
          font: 'inherit'
        }
      })
    }

    return (
      <div className={classes.root}>
        <NoSsr>
          <Select
            classes={classes}
            styles={selectStyles}
            options={data}
            components={components}
            value={this.state.value}
            isClearable={true}
            onChange={this.handleChange}
          />
        </NoSsr>
      </div>
    )
  }

  handleChange(value) {
    if (value === null) {
      value = ''
    }

    this.setState({
      value: value
    })

    this.props.onChange(value)
  }
}

export default withStyles(styles, { withTheme: true })(ReactSelect)
