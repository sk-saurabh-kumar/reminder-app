import PropTypes from 'prop-types'
import Button from './Button'

const Header = ({title, onAdd, showAdd}) => {
   
    return (
        <header className = 'header'>
          <h1>{title}</h1>
          <Button
          color = {showAdd ? 'red' : 'black'}
          text = {showAdd ? 'Close' : 'Add'} 
          onClick = {onAdd}/>  
        </header>
    )
} 

Header.defaultProps = {
   title: 'Task Tracker',  //If nothing is passed in props this title will show up and otherwise props title will overwrite this
}

Header.propTypes = {
   title: PropTypes.string.isRequired,
}

export default Header
