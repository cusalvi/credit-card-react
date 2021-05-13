import React, { Component } from 'react'
import { Form, Field } from 'react-final-form'
import Styles from './Styles'
import Card from './Card'
import {
  formatCreditCardNumber,
  formatCVV,
  formatExpirationMonth
} from '../Utils/CardUtils'
import { DEFAULT_CARD_FORMAT } from '../Utils/CardTypes'

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

const onSubmit = async values => {
  await sleep(300)
  window.alert(JSON.stringify(values, 0, 2))
}

export class CreditDetailsForm extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         expirationMonth: '',
    //         expirationYear: '' 
    //     }
    // }
    render() {
        return (
            <Styles>
                <Form
                onSubmit={onSubmit}
                render={({
                    handleSubmit,
                    form,
                    submitting,
                    pristine,
                    values,
                    active
                }) => {
                    return (
                    <form onSubmit={handleSubmit}>
                        <Card
                        number={values.number || ''}
                        name={values.name || ''}
                        // expiry={values.expiry || ''}
                        expirationMonth={values.expirationMonth || ''}
                        expirationYear={values.expirationYear || ''}
                        cvc={values.cvc || ''}
                        focused={active}
                        />
                        <label>Card Number</label>
                        <div>
                        <Field
                            name="number"
                            component="input"
                            type="text"
                            // pattern="[\d| ]{16,22}"
                            pattern={DEFAULT_CARD_FORMAT}
                            placeholder=""
                            format={formatCreditCardNumber}
                        />
                        </div>
                        <label>Card Name</label>
                        <div>
                        <Field
                            name="name"
                            component="input"
                            type="text"
                            placeholder=""
                        />
                        </div>
                        <label>Expiration Date</label>
                        <label style={{'marginLeft':'35%'}}>CVV</label>
                        <div>
                        <Field 
                            name="expirationMonth" 
                            component="select"
                            placeholder="Month">
                            <option />
                            {[...Array(13).keys()].slice(1).map((m, id) => <option key={id} value={formatExpirationMonth(m)}>{formatExpirationMonth(m)}</option>)}
                        </Field>
                        <Field 
                            name="expirationYear" 
                            component="select"
                            placeholder="Year">
                            <option />
                            {[...Array(2031).keys()].slice(2021).map((y, idx) => <option key={idx} value={y}>{y}</option>)}
                        </Field>
                        <Field
                            name="cvc"
                            component="input"
                            type="text"
                            pattern="\d{3,4}"
                            placeholder=""
                            format={formatCVV}
                        />
                        </div>
                        <div className="buttons">
                        <button type="submit" disabled={submitting} className="submit_button">
                            Submit
                        </button>
                        {/* <button
                            type="button"
                            onClick={form.reset}
                            disabled={submitting || pristine}
                        >
                            Reset
                        </button> */}
                        </div>
                        {/* <h2>Values</h2>
                        <pre>{JSON.stringify(values, 0, 2)}</pre> */}
                    </form>
                    )
                }}
                />
            </Styles>
        )
    }
}

export default CreditDetailsForm;