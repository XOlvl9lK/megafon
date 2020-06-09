import React, { useState } from 'react';
import ViewMegafon from "../view/ViewMegafon.jsx";
import { useMath } from "../../hooks/math.hook";

const MathMegafon = () => {
    const {
        before,
        after,
        result,
        error,
        amount,
        handleInputChange,
        reset, handleClick,
        handleKeyPress
    } = useMath();

    return (
        <ViewMegafon
            handleInputChange={handleInputChange}
            before={before}
            after={after}
            result={result}
            reset={reset}
            handleClick={handleClick}
            error={error}
            handleKeyPress={handleKeyPress}
            amount={amount}
        />
    );
};

export default MathMegafon;