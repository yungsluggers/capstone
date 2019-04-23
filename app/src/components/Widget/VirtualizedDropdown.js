import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Select from 'react-select'
import Typography from '@material-ui/core/Typography'
import NoSsr from '@material-ui/core/NoSsr'
import TextField from '@material-ui/core/TextField'
import Paper from '@material-ui/core/Paper'
import MenuItem from '@material-ui/core/MenuItem'
import { AutoSizer, List } from 'react-virtualized'

const styles = {
  input: {
    display: 'flex',
    height: 28
  },
  valueContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    flex: 1,
    alignItems: 'center'
  },
  singleValue: {
    fontSize: 24
  },
  paper: {
    position: 'absolute',
    zIndex: 2,
    left: 0,
    right: 0,
    height: 300
  }
}

const NoOptionsMessage = props => {
  return (
    <Typography color="textSecondary" {...props.innerProps}>
      {props.children}
    </Typography>
  )
}

const inputComponent = ({ inputRef, ...props }) => {
  return <div ref={inputRef} {...props} />
}

const Control = props => {
  return (
    <TextField
      fullWidth
      id="value"
      name="value"
      InputProps={{
        inputComponent,
        inputProps: {
          style: styles.input,
          inputRef: props.innerRef,
          children: props.children,
          ...props.innerProps
        }
      }}
      InputLabelProps={{
        shrink: true
      }}
      {...props.selectProps.textFieldProps}
    />
  )
}

const Option = props => {
  return (
    <MenuItem
      buttonRef={props.innerRef}
      selected={props.isFocused}
      component="div"
      style={{
        fontWeight: props.isSelected ? 500 : 400
      }}
      {...props.innerProps}
    >
      {props.children}
    </MenuItem>
  )
}

const Placeholder = props => {
  return (
    <Typography color="textSecondary" {...props.innerProps}>
      {props.children}
    </Typography>
  )
}

const SingleValue = props => {
  return (
    <Typography style={styles.singleValue} {...props.innerProps}>
      {props.children}
    </Typography>
  )
}

const ValueContainer = props => {
  return <div style={styles.valueContainer}>{props.children}</div>
}

const Menu = props => {
  return (
    <Paper square style={styles.paper} {...props.innerProps}>
      {props.children}
    </Paper>
  )
}

const MenuList = props => {
  const rows = props.children
  const rowRenderer = ({ key, index, isScrolling, isVisible, style }) => (
    <div key={key} style={style}>
      {rows[index]}
    </div>
  )
  return (
    <AutoSizer disableHeight>
      {({ width }) => (
        <List
          width={width}
          height={300}
          rowCount={rows.length ? rows.length : 0}
          rowHeight={50}
          rowRenderer={rowRenderer}
        />
      )}
    </AutoSizer>
  )
}

const components = {
  Control,
  Menu,
  MenuList,
  NoOptionsMessage,
  Option,
  Placeholder,
  SingleValue,
  ValueContainer
}

class VirtualizedDropdown extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: null
    }
  }

  handleChange = name => value => {
    this.setState({
      [name]: value
    })
    this.props.handleChange(value)
  }

  render() {
    return (
      <div style={{ width: '100%' }} id="YBV-react-virtualized-dropdown">
        <NoSsr>
          <Select
            components={components}
            value={this.state.value}
            options={this.props.options}
            onChange={this.handleChange('value')}
            placeholder=""
            isClearable
            styles={{
              indicatorSeparator: base => ({
                ...base,
                height: 16,
                marginTop: 2
              })
            }}
          />
        </NoSsr>
      </div>
    )
  }
}

export default VirtualizedDropdown
