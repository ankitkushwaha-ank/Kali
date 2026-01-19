import React, { Component } from 'react';
import { 
  X, 
  Minus, 
  Square, 
  ChevronDown,
  Menu,
  History,
  Delete,
  Equal
} from 'lucide-react';

class CalcApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expression: "",
      result: "0",
      isMaximized: true,
      mode: "Advanced",
    };
  }

  handleInput = (val) => {
    this.setState((prev) => {
      if (prev.expression === prev.result && !isNaN(val)) {
        return { expression: val, result: "0" };
      }
      return { expression: prev.expression + val };
    });
  };

  clear = () => {
    this.setState({ expression: "", result: "0" });
  };

  backspace = () => {
    this.setState((prev) => ({
      expression: prev.expression.length > 0 ? prev.expression.slice(0, -1) : ""
    }));
  };

  calculate = () => {
    try {
      let sanitizedExpr = this.state.expression
        .replace(/×/g, "*")
        .replace(/÷/g, "/")
        .replace(/π/g, "Math.PI")
        .replace(/e/g, "Math.E")
        .replace(/sqrt\(/g, "Math.sqrt(")
        .replace(/sin\(/g, "Math.sin(")
        .replace(/cos\(/g, "Math.cos(")
        .replace(/tan\(/g, "Math.tan(")
        .replace(/log\(/g, "Math.log10(")
        .replace(/ln\(/g, "Math.log(");

      sanitizedExpr = sanitizedExpr.replace(/(\d+)!/g, (match, num) => {
        let r = 1;
        for (let i = 2; i <= num; i++) r *= i;
        return r;
      });

      // eslint-disable-next-line no-new-func
      const evalResult = new Function(`"use strict"; return (${sanitizedExpr || '0'})`)();
      
      const formattedResult = Number.isInteger(evalResult) 
        ? evalResult.toString() 
        : parseFloat(evalResult.toFixed(10)).toString();

      this.setState({
        result: formattedResult,
        expression: formattedResult 
      });
    } catch (err) {
      this.setState({ result: "Error" });
    }
  };

  renderBtn = (label, action, extraClass = "") => (
    <button
      onClick={() => (typeof action === 'function' ? action() : this.handleInput(action))}
      className={`flex items-center justify-center h-10 rounded text-[13px] font-medium transition-all active:scale-95 border border-black/20 ${extraClass || "bg-[#454c54] text-gray-200 hover:bg-[#505861]"}`}
    >
      {label}
    </button>
  );

  render() {
    const { expression, result, isMaximized, mode } = this.state;

    return (
      <div className={`flex flex-col h-full w-full bg-[#383c4a] text-[#eeeeee] font-sans select-none overflow-hidden transition-all duration-300 ${!isMaximized ? 'rounded-lg border border-[#1e2127] shadow-2xl' : ''}`}>
        
        {/* Refined Display Area */}
        <div className="mx-3 mt-3 mb-2 p-3 bg-[#1e2127] rounded-md border border-black/20 shadow-inner flex flex-col justify-end min-h-[80px]">
          <div className="flex justify-between items-center opacity-40 mb-1">
             <History size={11} />
             <div className="text-[10px] font-mono tracking-wider truncate ml-4">
               {expression || "0"}
             </div>
          </div>
          <div className="w-full text-right text-3xl font-bold font-mono text-white tracking-tighter overflow-hidden">
            {result === "0" ? (expression || "0") : result}
          </div>
        </div>

        {/* Dense Function Row */}
        <div className="grid grid-cols-6 gap-1 px-3 mb-2">
           {this.renderBtn("sin", "sin(", "bg-[#3e444e] text-[10px] uppercase font-bold text-blue-400/80")}
           {this.renderBtn("cos", "cos(", "bg-[#3e444e] text-[10px] uppercase font-bold text-blue-400/80")}
           {this.renderBtn("tan", "tan(", "bg-[#3e444e] text-[10px] uppercase font-bold text-blue-400/80")}
           {this.renderBtn("√", "sqrt(", "bg-[#3e444e] text-[10px] font-bold text-blue-400/80")}
           {this.renderBtn("π", "π", "bg-[#3e444e] text-[10px] font-bold text-blue-400/80")}
           {this.renderBtn("e", "e", "bg-[#3e444e] text-[10px] font-bold text-blue-400/80")}
        </div>

        {/* Main Pad Area */}
        <div className="flex-1 px-3 pb-3 grid grid-cols-4 gap-1.5">
          {/* Scientific Controls */}
          {this.renderBtn("log", "log(", "bg-[#4b515d] text-[11px] font-bold")}
          {this.renderBtn("ln", "ln(", "bg-[#4b515d] text-[11px] font-bold")}
          {this.renderBtn("(", "(", "bg-[#4b515d] text-[11px] font-bold")}
          {this.renderBtn(")", ")", "bg-[#4b515d] text-[11px] font-bold")}

          {/* Core Operations */}
          {this.renderBtn("AC", this.clear, "bg-[#5c6370] text-[#ff6b6b] font-black uppercase text-[10px] tracking-widest")}
          {this.renderBtn("±", "*-1", "bg-[#4b515d] text-lg")}
          {this.renderBtn("%", "/100", "bg-[#4b515d] text-lg")}
          {this.renderBtn("÷", "÷", "bg-[#5294e2] text-white text-xl font-light")}

          {/* Numbers */}
          {this.renderBtn("7", "7", "bg-[#454c54] text-lg")}
          {this.renderBtn("8", "8", "bg-[#454c54] text-lg")}
          {this.renderBtn("9", "9", "bg-[#454c54] text-lg")}
          {this.renderBtn("×", "×", "bg-[#5294e2] text-white text-xl font-light")}

          {this.renderBtn("4", "4", "bg-[#454c54] text-lg")}
          {this.renderBtn("5", "5", "bg-[#454c54] text-lg")}
          {this.renderBtn("6", "6", "bg-[#454c54] text-lg")}
          {this.renderBtn("−", "-", "bg-[#5294e2] text-white text-xl font-light")}

          {this.renderBtn("1", "1", "bg-[#454c54] text-lg")}
          {this.renderBtn("2", "2", "bg-[#454c54] text-lg")}
          {this.renderBtn("3", "3", "bg-[#454c54] text-lg")}
          {this.renderBtn("+", "+", "bg-[#5294e2] text-white text-xl font-light")}

          {this.renderBtn("0", "0", "bg-[#454c54] text-lg")}
          {this.renderBtn(".", ".", "bg-[#454c54] text-lg")}
          {this.renderBtn("⌫", this.backspace, "bg-[#4b515d] text-[#ffae42]")}
          {this.renderBtn("=", this.calculate, "bg-[#5294e2] text-white text-xl shadow-[0_2px_10px_rgba(82,148,226,0.3)] border-blue-400/20")}
        </div>

        {/* Status Bar */}
        <div className="px-4 py-1.5 bg-[#2f343f] border-t border-black/20 flex justify-between items-center">
           <div className="flex gap-4">
              <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest">Degrees</span>
              <span className="text-[9px] font-black text-blue-500 uppercase tracking-widest">Ready</span>
           </div>
           <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_5px_rgba(34,197,94,0.5)]"></div>
        </div>

        <style dangerouslySetInnerHTML={{ __html: `
          .custom-scrollbar::-webkit-scrollbar { width: 4px; }
          .custom-scrollbar::-webkit-scrollbar-thumb { background: #21242b; border-radius: 2px; }
        `}} />
      </div>
    );
  }
}

export const Calc = (props) => {
  return <CalcApp {...props} />;
};

export default Calc;

export const displayTerminalCalc = (addFolder, openApp) => {
  return <Calc addFolder={addFolder} openApp={openApp} />;
};