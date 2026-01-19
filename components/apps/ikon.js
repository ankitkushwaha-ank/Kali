import React, { Component } from 'react';
import { 
  X, 
  Minus, 
  Square, 
  Globe, 
  ShieldCheck, 
  RefreshCw, 
  ExternalLink,
  Lock,
  MoreVertical
} from 'lucide-react';

export class Ikon extends Component {
    constructor() {
        super();
        this.state = {
            url: 'https://ikon.org.in/',
            isMaximized: true,
            isLoading: true,
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


                {/* Main Viewport */}
                <div className="flex-1 relative bg-white overflow-hidden">
                    {isLoading && (
                        <div className="absolute inset-0 z-50 bg-[#0f1115] flex flex-col items-center justify-center backdrop-blur-sm transition-opacity duration-300">
                            <div className="relative">
                                <div className="w-16 h-16 border-[3px] border-blue-500/20 border-t-blue-500 rounded-full animate-spin" />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <Globe size={20} className="text-blue-500 animate-pulse" />
                                </div>
                            </div>
                            <span className="mt-6 text-[10px] font-black uppercase tracking-[0.4em] text-blue-500 animate-pulse">Initializing Secure Ikon Connection...</span>
                        </div>
                    )}
                    <iframe 
                        src={url} 
                        className="w-full h-full border-none shadow-inner" 
                        id="ikon-screen" 
                        title="Ikon Application Frame"
                        onLoad={() => this.setState({ isLoading: false })}
                        sandbox="allow-scripts allow-forms allow-same-origin allow-popups"
                    ></iframe>
                </div>

                {/* Compact Status Bar */}
                <div className="bg-[#181a1f] px-4 py-1.5 border-t border-[#2a2e35] flex justify-between items-center text-[9px] text-gray-600 font-bold uppercase tracking-widest">
                    <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 bg-green-500 rounded-full" /> Encrypted Connection</span>
                        {!isMobile && <span>Standard Gateway v2.5</span>}
                    </div>
                    <span className="text-blue-500/80">Ikon.org.in</span>
                </div>
            </div>
        )
    }
}

export default Ikon;

/**
 * Optimized export for system component usage
 */
export const displayikon = (props) => {
    return <Ikon {...props} />;
};
