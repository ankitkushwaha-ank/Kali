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
  MoreVertical,
  Zap
} from 'lucide-react';

// Main Logic Component
class BuzziApp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            url: 'https://buzzi.co.in/',
            isMaximized: true,
            isLoading: true,
            isMobile: typeof window !== 'undefined' ? window.innerWidth < 768 : false
        };
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
                                <div className="w-16 h-16 border-[3px] border-purple-500/20 border-t-purple-500 rounded-full animate-spin" />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <Zap size={20} className="text-purple-500 animate-pulse" />
                                </div>
                            </div>
                            <span className="mt-6 text-[10px] font-black uppercase tracking-[0.4em] text-purple-500 animate-pulse text-center px-4">Establishing Secure Buzzi Gateway...</span>
                        </div>
                    )}
                    <iframe 
                        src={url} 
                        className="w-full h-full border-none shadow-inner" 
                        id="buzzi-screen" 
                        title="Buzzi Application Frame"
                        onLoad={() => this.setState({ isLoading: false })}
                        sandbox="allow-scripts allow-forms allow-same-origin allow-popups"
                    ></iframe>
                </div>

                {/* Compact Status Bar */}
                <div className="bg-[#181a1f] px-4 py-1.5 border-t border-[#2a2e35] flex justify-between items-center text-[9px] text-gray-600 font-bold uppercase tracking-widest">
                    <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 bg-green-500 rounded-full" /> Verified SSL</span>
                        {!isMobile && <span>Encrypted Tunnel v4.2</span>}
                    </div>
                    <span className="text-purple-500/80">Buzzi.co.in</span>
                </div>
            </div>
        );
    }
}

/**
 * FIXED EXPORT:
 * Returns a functional component to prevent "this.props.screen is not a function" errors.
 */
export const Buzzi = (props) => <BuzziApp {...props} />;
export default Buzzi;

export const displaybuzzi = (props) => <Buzzi {...props} />;