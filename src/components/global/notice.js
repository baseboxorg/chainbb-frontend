import React, { Component } from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import TimeAgo from 'react-timeago'
import { I18n, Interpolate } from 'react-i18next';

import { Grid, Segment, Container, Icon, Message } from 'semantic-ui-react'

import * as statusActions from '../../actions/statusActions'

class GlobalNotice extends Component {
  render() {
    const { height, height_processed } = this.props.status.network
    let warning = false
    if ( height > height_processed + 10) {
      const blocksBehind = (height - height_processed).toString()
      const timeBehind = new Date() - blocksBehind * 3 * 1000
      const timeago = <TimeAgo date={timeBehind} />
      warning = (
        <I18n>
          {
            (t, { i18n }) => {
              return (
                <Container style={{margin: '0.5em 0 1em'}}>
                  <Message warning>
                    <Message.Content>
                      <Interpolate i18nKey="connection_issue" blocksBehind={blocksBehind} timeBehind={timeago} />
                    </Message.Content>
                  </Message>
                </Container>
              )
            }
          }
        </I18n>
      )
    }

    return warning
  }
}

function mapStateToProps(state, ownProps) {
  return {
    status: state.status
  }
}

function mapDispatchToProps(dispatch) {
  return {actions: bindActionCreators({
    ...statusActions
  }, dispatch)}
}

export default connect(mapStateToProps, mapDispatchToProps)(GlobalNotice);
