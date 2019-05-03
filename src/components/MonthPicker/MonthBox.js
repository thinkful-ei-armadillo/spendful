import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class MonthBox extends Component {
    constructor(props, context) {
        super(props, context)

        this.state = {
            value: this.props.value || 'N/A',
        }
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            value: nextProps.value || 'N/A',
        })
    }

    _handleClick = (e) => {
        this.props.onClick && this.props.onClick(e)
    }

    render(){
        return (
            <div className="box" onClick={this._handleClick}>
                <label>{this.state.value}</label>
            </div>
        )
    }
}

MonthBox.propTypes = {
    value: PropTypes.string,
    onClick: PropTypes.func,
}