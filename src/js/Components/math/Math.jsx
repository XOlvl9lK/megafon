import React, { useState } from 'react';
import View from "./View.jsx";

const Math = () => {
    const [ before, setBefore ] = useState({
        ugw1: '',
        ugw2: '',
        ugw3: '',
        ugw4: ''
    });
    const [ after, setAfter ] = useState({
        ugw1: '',
        ugw2: '',
        ugw3: '',
        ugw4: '',
    });
    const [ result, setResult ] = useState('');
    const [ error, setError ] = useState(false);
    const [ amount, setAmount ] = useState('');

    function handleInputChange(event, typeOfInput) {
        const { name, value } = event.target;

        if (typeOfInput === 'before') {
            setBefore({ ...before, [name]: value });
        } else {
            setAfter({ ...after, [name]: value });
        }
    }

    function calculateResult() {
        let calculatedResult = [];
        let amountResult = [];
        let amountBefore = 0,
            amountAfter = 0,
            amountCalculatedBefore = 0,
            amountCalculatedAfter = 0,
            amountDifferenceG = 0,
            amountDifferenceM = 0,
            amountPercentage;

        for (let key in before) {
            if (before[key] && after[key]) {
                let parsedBefore = parseFloat(before[key].replace(',', '.'));
                let parsedAfter = parseFloat(after[key].replace(',', '.'));

                let calculatedItem = {};
                calculatedItem.calculatedBefore = (((parsedBefore * 8) / 1024) / 1024).toFixed(5);
                calculatedItem.calculatedAfter = (((parsedAfter * 8) / 1024) / 1024).toFixed(5);
                calculatedItem.differenceG = (calculatedItem.calculatedBefore - calculatedItem.calculatedAfter).toFixed(5);
                calculatedItem.differenceM = (calculatedItem.differenceG * 1024).toFixed(5);
                calculatedItem.percentage = (100 - ((calculatedItem.calculatedAfter * 100) / calculatedItem.calculatedBefore)).toFixed(5);

                amountBefore += +parsedBefore;
                amountAfter += +parsedAfter;
                amountCalculatedBefore += +calculatedItem.calculatedBefore;
                amountCalculatedAfter += +calculatedItem.calculatedAfter;
                amountDifferenceG += +calculatedItem.differenceG;
                amountDifferenceM += +calculatedItem.differenceM;

                calculatedResult.push(calculatedItem);
            }
        }

        amountPercentage = (100 - ((amountAfter * 100) / amountBefore)).toFixed(5);

        amountResult.push(amountBefore, amountAfter, amountCalculatedBefore, amountCalculatedAfter, amountDifferenceG, amountDifferenceM, amountPercentage);

        if (calculatedResult.length === 0) {
            setError(true);
            setTimeout(() => {setError(false)}, 2000);
            return;
        }

        setResult(calculatedResult);
        setAmount(amountResult);
    }

    function handleClick() {
        if (result) {
            setResult('');
            setTimeout(calculateResult, 200);
        } else {
            calculateResult();
        }
        console.log(before);
        console.log(after);
        console.log(result);
    }

    function reset() {
        setResult('');
        setBefore({
            ugw1: '',
            ugw2: '',
            ugw3: '',
            ugw4: ''
        });
        setAfter({
            ugw1: '',
            ugw2: '',
            ugw3: '',
            ugw4: ''
        });
        setAmount('');
        if (error) {
            setError(false);
        }
    }

    function handleKeyPress({ key }) {
        if (key === 'Enter') {
            handleClick();
        }
    }

    return (
        <View
            handleInputChange={handleInputChange}
            before={before}
            after={after}
            result={result}
            calculateResult={calculateResult}
            setResult={setResult}
            reset={reset}
            handleClick={handleClick}
            error={error}
            handleKeyPress={handleKeyPress}
            amount={amount}
        />
    );
};

export default Math;