import React, { Component } from 'react';

export class Github extends Component {
    constructor() {
        super();
        this.state = {
            url: 'https://github.com/ankitkushwaha-ank',
            display_url: "https://github.com/ankitkushwaha-ank",
        }
    }


    render() {
        return (
            <div className="h-full w-full flex flex-col bg-ub-cool-grey">
                <iframe src={this.state.url} className="flex-grow" id="github-screen" frameBorder="0" title="Kali Github Url"></iframe>
            </div>
        )
    }
}

export default Github

export const displayGithub = () => {
    return <Github> </Github>;
}
