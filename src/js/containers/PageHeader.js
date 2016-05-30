import { connect } from 'react-redux'
import MainHeader from 'js/components/MainHeader'

// Inbound data
const mapStateToProps = (state) => {
  return {
    npm: Object.assign({}, state.npm)
  }
}

// Bind redux store to react component.
const PageHeader = connect(
  mapStateToProps
)(MainHeader)

export default PageHeader
