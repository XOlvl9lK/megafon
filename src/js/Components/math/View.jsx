import React from 'react';
import Input from "./Input.jsx";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import ErrorModal from "./ErrorModal.jsx";

const View = ({
                  handleInputChange,
                  before,
                  after,
                  result,
                  handleClick,
                  reset,
                  error,
                  handleKeyPress,
                  amount
              }) => {

    let amountCrouch;

    if (amount) {
        amountCrouch = amount.map(amountItem => (
            <p key={amountItem}>{amountItem}</p>
        ));
    }

    function log() {
        console.log(result);
    }


    return (
        <div className="view container">
            <h2>Damage By Branch M2000 | UGW-Megafon</h2>
            <div className="table-wrap">

                <div className="table-head">
                    <p>UGW</p>
                    <p className="before">Before (kb/s)</p>
                    <p className="after">After (kb/s)</p>
                    <p>Before (Gb/s)</p>
                    <p>After (Gb/s)</p>
                    <p>Difference (Gb/s)</p>
                    <p>Difference (Mb/s)</p>
                    <p>Percentage (%)</p>
                </div>

                <div className="table-body">
                    <div className="table-body-static">
                        <p>UGW 1</p>
                        <Input handleInputChange={handleInputChange} before={before.ugw1} name="ugw1" handleKeyPress={handleKeyPress} />
                        <Input hasClass handleInputChange={handleInputChange} after={after.ugw1} name="ugw1" handleKeyPress={handleKeyPress} />

                        <p>UGW 2</p>
                        <Input handleInputChange={handleInputChange} before={before.ugw2} name="ugw2" handleKeyPress={handleKeyPress} />
                        <Input hasClass handleInputChange={handleInputChange} after={after.ugw2} name="ugw2" handleKeyPress={handleKeyPress} />

                        <p>UGW 3</p>
                        <Input handleInputChange={handleInputChange} before={before.ugw3} name="ugw3" handleKeyPress={handleKeyPress} />
                        <Input hasClass handleInputChange={handleInputChange} after={after.ugw3} name="ugw3" handleKeyPress={handleKeyPress} />

                        <p>UGW 4</p>
                        <Input handleInputChange={handleInputChange} before={before.ugw4} name="ugw4" handleKeyPress={handleKeyPress} />
                        <Input hasClass handleInputChange={handleInputChange} after={after.ugw4} name="ugw4" handleKeyPress={handleKeyPress} />
                    </div>

                    <TransitionGroup>
                        {result && (
                            result.map((resultItem) => {
                                return (
                                    <CSSTransition key={resultItem.calculatedBefore} classNames="options" timeout={200}>
                                        <div onClick={log} className="table-body-calculate">
                                            <p>{resultItem.calculatedBefore}</p>
                                            <p>{resultItem.calculatedAfter}</p>
                                            <p>{resultItem.differenceG}</p>
                                            <p>{resultItem.differenceM}</p>
                                            <p>{resultItem.percentage}</p>
                                        </div>
                                    </CSSTransition>
                                );
                            })
                        )}
                    </TransitionGroup>
                </div>

                <div className="amount">
                    <div className="amount-static">
                        <p>Sum</p>
                    </div>

                    {/*<TransitionGroup>*/}
                    {/*    {amount && (*/}
                    {/*        <CSSTransition classNames="options" timeout={200}>*/}
                    {/*            <div className="amount-calculate">*/}
                    {/*                {amountCrouch}*/}
                    {/*            </div>*/}
                    {/*        </CSSTransition>*/}
                    {/*    )}*/}
                    {/*</TransitionGroup>*/}

                </div>

            </div>

            <button onClick={handleClick} className="calculate-btn">Calculate</button>
            <button onClick={reset} className="reset-btn">Reset</button>

            <TransitionGroup>
                {error && (
                    <CSSTransition classNames="error" timeout={200}>
                        <ErrorModal />
                    </CSSTransition>
                )}
            </TransitionGroup>
        </div>
    );
};

export default View;