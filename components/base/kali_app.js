import React, { Component } from 'react'

export class KaliApp extends Component {

    constructor() {
        super();
        this.lastTap = 0;
    }

    openApp = () => {
        this.props.openApp(this.props.id);
    }

    // Desktop relies on double-click; touch devices don't have a reliable
    // double-click equivalent, so treat two taps within 400ms as one too.
    handleTouchEnd = () => {
        const now = Date.now();
        if (now - this.lastTap < 400) {
            this.openApp();
        }
        this.lastTap = now;
    }

    render() {
        return (
            <div
                className="p-1 m-px z-10 bg-white bg-opacity-0 hover:bg-opacity-20 focus:bg-ub-blue focus:bg-opacity-50 focus:border-blue-700 focus:border-opacity-100 border border-transparent outline-none rounded select-none w-20 h-20 sm:w-24 flex flex-col justify-start items-center text-center text-xs font-normal text-white "
                id={"app-" + this.props.id}
                onDoubleClick={this.openApp}
                onTouchEnd={this.handleTouchEnd}
                tabIndex={0}
            >
                <img width="40px" height="40px" className="mb-1 w-9 sm:w-10" src={this.props.icon} alt={"Kali " + this.props.name} />
                {this.props.name}

            </div>
        )
    }
}

export default KaliApp
