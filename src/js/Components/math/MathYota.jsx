import React, { useState } from 'react';
import ViewYota from "../view/ViewYota.jsx";
import { useMath } from "../../hooks/math.hook";

const MathYota = () => {
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
        <ViewYota
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

export default MathYota;