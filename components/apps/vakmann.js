import React, { Component } from 'react';
import { ExternalLink } from 'lucide-react';

// Vakmann — a smart AI assistant app being built in Flutter (in active
// development). Mirrors the ikon.js / buzzi.js "embedded live site" pattern
// used for the other project apps, with an in-development banner since this
// one doesn't have a finished production build yet.
export class Vakmann extends Component {
    constructor() {
        super();
        this.state = {
            url: 'https://vakmann.com/',
            isMaximized: true,
            isLoading: true,
            loadFailed: false,
            isMobile: typeof window !== 'undefined' ? window.innerWidth < 768 : false
        }
    }

    componentDidMount() {
        window.addEventListener('resize', this.handleResize);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize);
    }

    handleResize = () => {
        this.setState({ isMobile: window.innerWidth < 768 });
    };

    render() {
        const { isMaximized, url, isLoading, isMobile } = this.state;

        return (
            <div className={`flex flex-col h-full w-full bg-[#0f1115] text-[#e1e3e6] font-sans overflow-hidden transition-all duration-500 ${!isMaximized ? 'md:rounded-2xl border border-[#30343d] shadow-2xl scale-[0.98]' : ''}`}>

                {/* In-development banner */}
                <div className="bg-cyan-600/10 border-b border-cyan-500/20 px-4 py-2 flex items-center gap-2 flex-shrink-0">
                    <img src="./images/logos/vakmann.png" alt="" className="h-4 w-4 rounded-sm flex-shrink-0" onError={(e) => { e.target.style.display = 'none'; }} />
                    <span className="text-[10px] font-black uppercase tracking-widest text-cyan-400">
                        In Active Development — Smart AI Assistant, built in Flutter
                    </span>
                </div>

                {/* Main Viewport */}
                <div className="flex-1 relative bg-white overflow-hidden">
                    {isLoading && (
                        <div className="absolute inset-0 z-50 bg-[#0f1115] flex flex-col items-center justify-center backdrop-blur-sm transition-opacity duration-300">
                            <div className="relative">
                                <div className="w-16 h-16 border-[3px] border-cyan-500/20 border-t-cyan-500 rounded-full animate-spin" />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <img src="./images/logos/vakmann.png" alt="Vakmann" className="h-6 w-6 rounded animate-pulse" />
                                </div>
                            </div>
                            <span className="mt-6 text-[10px] font-black uppercase tracking-[0.4em] text-cyan-500 animate-pulse">Connecting to Vakmann...</span>
                        </div>
                    )}
                    <iframe
                        src={url}
                        className="w-full h-full border-none shadow-inner"
                        id="vakmann-screen"
                        title="Vakmann Application Frame"
                        onLoad={() => this.setState({ isLoading: false })}
                        onError={() => this.setState({ isLoading: false, loadFailed: true })}
                        sandbox="allow-scripts allow-forms allow-same-origin allow-popups"
                    ></iframe>
                </div>

                {/* Compact Status Bar */}
                <div className="bg-[#181a1f] px-4 py-1.5 border-t border-[#2a2e35] flex justify-between items-center text-[9px] text-gray-600 font-bold uppercase tracking-widest">
                    <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-pulse" /> Build in Progress</span>
                        {!isMobile && <span>Flutter · Dart · AI/ML</span>}
                    </div>
                    <a href={url} target="_blank" rel="noreferrer" className="text-cyan-500/80 hover:text-cyan-400 flex items-center gap-1">
                        Vakmann.com <ExternalLink size={10} />
                    </a>
                </div>
            </div>
        )
    }
}

export default Vakmann;

export const displayVakmann = (props) => {
    return <Vakmann {...props} />;
};
