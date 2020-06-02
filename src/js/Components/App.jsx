import React, { useState } from 'react';
import MathMegafon from "./math/MathMegafon.jsx";
import Header from "./header/Header.jsx";
import MathYota from "./math/MathYota.jsx";
import {CSSTransition, TransitionGroup} from "react-transition-group";
import EasterEgg from "./easterEgg/EasterEgg.jsx";

const App = () => {
    const [ easterEgg, setEasterEgg ] = useState(false);

    function toggleEasterEgg() {
        setEasterEgg(true);
        setTimeout(() => setEasterEgg(false), 2000);
    }

    return (
        <>
            <Header toggleEasterEgg={toggleEasterEgg} />
            <MathMegafon />
            <MathYota />
            <TransitionGroup>
                {easterEgg &&
                    <CSSTransition classNames="egg" timeout={300}>
                        <EasterEgg />
                    </CSSTransition>
                }
            </TransitionGroup>
        </>
    );
};

export default App;

