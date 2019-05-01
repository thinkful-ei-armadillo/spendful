import React, { Component } from 'react'
import Picker from 'react-month-picker'
import MonthBox from './MonthBox'
import './MonthPicker.css'

export default class MonthPicker extends Component {
    constructor(props, context){
        super(props, context)
        this.state = {
            mvalue: {year: new Date().getFullYear(), month: new Date().getMonth()},
        }
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            value: nextProps.value || 'N/A',
        })
    }

    handleClickMonthBox = (e) => {
        this.refs.pickAMonth.show()
    }

    handleAMonthChange = (year, month) => {
        console.log('2', year, month)
        this.setState({
            mvalue: {year: year, month: month},
        })
    }

    handleAMonthDissmis = (value) => {
        this.setState( {mvalue: value} )
    }

    render(){
        let pickerLang = {
            months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'], 
            from: 'From', 
            to: 'To'
        }
    
        let mvalue = this.state.mvalue
        let makeText = m => {
            if (m && m.year && m.month) return (pickerLang.months[m.month-1] + '. ' + m.year + '  ▼' )
            return '?'
        }

        return (
            <>
                <div className="edit">
                    <Picker
                        ref="pickAMonth"
                        years={[2019, 2020, 2021, 2022]}
                        value={mvalue}
                        lang={pickerLang.months}
                        onChange={this.handleAMonthChange}
                        onDismiss={this.handleAMonthDissmis}
                        >
                        <MonthBox value={makeText(mvalue)} onClick={this.handleClickMonthBox} />
                    </Picker>
                </div>
            </>
        )
    }
}