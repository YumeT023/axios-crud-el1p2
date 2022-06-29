import React, {useEffect, useState} from "react";
import './style.css';

export const Modal = ({canSave, hide, header, children, footer, onSave}) => {
    let closeTimeOutId;
    const [animate, setAnimate] = useState({
        mode: "open-anim",
        shouldAnimate: true
    });

    useEffect(() => {
        const id = setTimeout(() => {
            setAnimate({shouldAnimate: false, mode: "close-anim"});
        }, 900);

        return () => {
            clearTimeout(closeTimeOutId);
            clearTimeout(id);
        }
    }, [])

    const close = (callback) => {
        setAnimate({...animate, shouldAnimate: true})
        closeTimeOutId = setTimeout(() => {
            setAnimate({...animate, shouldAnimate: false})
            callback();
        }, 900);
    }

    const handleOnClose = () => {
        close(hide);
    }

    const handleOnSave = () => {
        close(onSave);
    }

    return (
        <div className={`Modal open ${animate.shouldAnimate && animate.mode}`}>
            <div className="modal-back" onClick={handleOnClose}></div>

            <main className="absolute-center">
                <section className="header bg-primary">
                    <button onClick={handleOnClose} className="fw-bolder">&times;</button>
                    <h3 className="fw-normal text-white fs-4">{header}</h3>
                </section>

                <section className="content overflow-auto">
                    {children}
                </section>

                <section className="footer">
                    <button className="btn btn-primary me-2" onClick={handleOnSave} disabled={!canSave}>{footer}</button>
                    <button className="btn btn-danger" onClick={handleOnClose}>cancel</button>
                </section>
            </main>
        </div>
    )
}