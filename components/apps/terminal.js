import React, { Component } from 'react'
import $ from 'jquery';
import ReactGA from 'react-ga';

const CONTACT = {
    name: "Ankit Kumar",
    email: "ankitkushwaha.ank@gmail.com",
    collegeEmail: "ankit_24a12res854@iitp.ac.in",
    linkedin: "https://www.linkedin.com/in/ankitkushwaha-ank/",
    github: "https://github.com/ankitkushwaha-ank/",
    instagram: "https://www.instagram.com/ankitkushwaha.ank/",
    resumePath: "./images/me/Ankit_Kumar_Resume_IITP.pdf"
};

const AVAILABLE_COMMANDS = "help, ls, cd, cat, pwd, echo, whoami, contact, theme, clear, exit, mkdir, sudo hire-me, code, spotify, chrome, home, trash, settings, sendmsg";

export class Terminal extends Component {
    constructor() {
        super();
        this.cursor = "";
        this.terminal_rows = 1;
        this.current_directory = "~";
        this.curr_dir_name = "root";
        this.prev_commands = [];
        this.commands_index = -1;
        this.child_directories = {
            root: [ "projects", "personal-documents", "skills", "languages", "interests", "about.txt", "contact.txt"],
            skills: ["Front-end development","Back-end development", "React.js", "Node.js", "Django", "PostgreSQL", "SQL", "Firebase","PHP", "MONGODB", "Git", "Linux", "Networking", "Cyber Security", "TypeScript"],
            projects: ["netpar.in", "heritage-threads", "iitp-companion", "ikon", "buzzi", "kali-portfolio"],
            interests: ["Full Stack Engineering", "Cyber Security", "System Design", "Cloud Deployment", "AI/ML"],
            languages: ["JavaScript", "TypeScript", "Python", "PHP", "HTML", "CSS"],
        };
        // flat virtual "files" readable with cat, independent of the one-level directory model above
        this.files = {
            "about.txt": "Ankit Kumar — Full Stack Developer & Cyber Security Enthusiast.\nB.Sc. (Hons.) Computer Science & Data Analytics, IIT Patna (CGPA 9.3/10).\nBuilds production MERN/PHP/Django platforms; currently open to full-stack internships.",
            "contact.txt": `Email     : ${CONTACT.email}\nCollege   : ${CONTACT.collegeEmail}\nLinkedIn  : ${CONTACT.linkedin}\nGitHub    : ${CONTACT.github}\nInstagram : ${CONTACT.instagram}`
        };
        this.themes = ["dark", "matrix", "light"];
        this.state = {
            terminal: [],
            theme: "dark",
        }
    }

    componentDidMount() {
        this.reStartTerminal(true);
    }

    componentDidUpdate() {
        clearInterval(this.cursor);
        this.startCursor(this.terminal_rows - 2);
    }

    componentWillUnmount() {
        clearInterval(this.cursor);
    }

    reStartTerminal = (showBanner) => {
        clearInterval(this.cursor);
        $('#terminal-body').empty();
        this.terminal_rows = 1;
        this.setState({ terminal: [] }, () => {
            this.appendTerminalRow();
            if (showBanner) {
                // small delay so the first prompt row mounts before we inject the banner into it
                setTimeout(() => this.printBanner(), 50);
            }
        });
    }

    printBanner = () => {
        const rowId = this.terminal_rows - 2;
        const el = document.getElementById(`row-result-${rowId}`);
        if (!el) return;
        el.innerHTML = `
<pre class="leading-tight text-[13px]">
<span class="text-ubt-blue">       .:'</span>     <span class="font-bold text-white">${CONTACT.name.toLowerCase().replace(' ', '@')}</span>
<span class="text-ubt-blue">   __ :'__</span>     <span class="text-gray-400">-----------------</span>
<span class="text-ubt-blue">.'.  .' .'</span>     <span class="text-ubt-blue font-bold">OS:</span> Kali Linux Portfolio (Web)
<span class="text-ubt-blue">'.'  '.  '</span>     <span class="text-ubt-blue font-bold">Role:</span> Full Stack Developer
<span class="text-ubt-blue"> ' '.  '.'.</span>    <span class="text-ubt-blue font-bold">Institute:</span> IIT Patna (CGPA 9.3/10)
<span class="text-ubt-blue">  '.'.'.'</span>      <span class="text-ubt-blue font-bold">Stack:</span> MERN · PHP · Django
<span class="text-ubt-blue">    '.'</span>        <span class="text-ubt-blue font-bold">Status:</span> Open to internships
                      <span class="text-ubt-blue font-bold">Type:</span> 'help' to see available commands
</pre>`;
        this.appendTerminalRow();
    }

    appendTerminalRow = () => {
        let terminal = this.state.terminal;
        terminal.push(this.terminalRow(this.terminal_rows));
        this.setState({ terminal });
        this.terminal_rows += 2;
    }

    terminalRow = (id) => {
        return (
            <React.Fragment key={id}>
                <div className="flex w-full h-5">
                    <div className=" text-ubt-blue">┌──(kali㉿kali)-[{this.current_directory}] </div>                                                        
                     </div>
                    <div className="flex">
                    <div className=" text-ubt-blue">└─$ </div>
                    <div id="cmd" onClick={this.focusCursor} className=" bg-transperent relative flex-1 overflow-hidden ">         
                        <span id={`show-${id}`} className=" float-left whitespace-pre pb-1 opacity-100 font-normal tracking-wider"></span>
                        <div id={`cursor-${id}`} className=" float-left mt-1 w-1.5 h-3.5 bg-white"></div>
                        <input id={`terminal-input-${id}`} data-row-id={id} onKeyDown={this.checkKey} onBlur={this.unFocusCursor} className=" absolute top-0 left-0 w-full opacity-0 outline-none bg-transparent" spellCheck={false} autoFocus={true} autoComplete="off" type="text" />
                    </div>
                    </div>
                <div id={`row-result-${id}`} className={"my-2 font-normal"}></div>
            </React.Fragment>
        );

    }

    focusCursor = (e) => {
        clearInterval(this.cursor);
        this.startCursor($(e.target).data("row-id"));
    }

    unFocusCursor = (e) => {
        this.stopCursor($(e.target).data("row-id"));
    }

    startCursor = (id) => {
        clearInterval(this.cursor);
        $(`input#terminal-input-${id}`).trigger("focus");
        // On input change, set current text in span
        $(`input#terminal-input-${id}`).on("input", function () {
            $(`#cmd span#show-${id}`).text($(this).val());
        });
        this.cursor = window.setInterval(function () {
            if ($(`#cursor-${id}`).css('visibility') === 'visible') {
                $(`#cursor-${id}`).css({ visibility: 'hidden' });
            } else {
                $(`#cursor-${id}`).css({ visibility: 'visible' });
            }
        }, 500);
    }

    stopCursor = (id) => {
        clearInterval(this.cursor);
        $(`#cursor-${id}`).css({ visibility: 'visible' });
    }

    removeCursor = (id) => {
        this.stopCursor(id);
        $(`#cursor-${id}`).css({ display: 'none' });
    }

    clearInput = (id) => {
        $(`input#terminal-input-${id}`).trigger("blur");
    }

    checkKey = (e) => {
        if (e.key === "Enter") {
            let terminal_row_id = $(e.target).data("row-id");
            let command = $(`input#terminal-input-${terminal_row_id}`).val().trim();
            if (command.length !== 0) {
                this.removeCursor(terminal_row_id);
                this.handleCommands(command, terminal_row_id);
            }
            else return;
            // push to history
            this.prev_commands.push(command);
            this.commands_index = this.prev_commands.length - 1;

            this.clearInput(terminal_row_id);
        }
        else if (e.key === "ArrowUp") {
            let prev_command;

            if (this.commands_index <= -1) prev_command = "";
            else prev_command = this.prev_commands[this.commands_index];

            let terminal_row_id = $(e.target).data("row-id");

            $(`input#terminal-input-${terminal_row_id}`).val(prev_command);
            $(`#show-${terminal_row_id}`).text(prev_command);

            this.commands_index--;
        }
        else if (e.key === "ArrowDown") {
            let prev_command;

            if (this.commands_index >= this.prev_commands.length) return;
            if (this.commands_index <= -1) this.commands_index = 0;

            if (this.commands_index === this.prev_commands.length) prev_command = "";
            else prev_command = this.prev_commands[this.commands_index];

            let terminal_row_id = $(e.target).data("row-id");

            $(`input#terminal-input-${terminal_row_id}`).val(prev_command);
            $(`#show-${terminal_row_id}`).text(prev_command);

            this.commands_index++;
        }
    }

    childDirectories = (parent) => {
        let files = [];
        files.push(`<div class="flex justify-start flex-wrap">`)
        this.child_directories[parent].forEach(file => {
            files.push(
                `<span class="font-bold mr-2 text-white">'${file}'</span>`
            )
        });
        files.push(`</div>`)
        return files;
    }

    closeTerminal = () => {
        $("#close-terminal").trigger('click');
    }

    handleCommands = (command, rowId) => {
        let words = command.split(' ').filter(Boolean);
        let main = words[0];
        words.shift()
        let result = "";
        let rest = words.join(" ");
        rest = rest.trim();
        switch (main) {
            case "cd":
                if (words.length === 0 || rest === "") {
                    this.current_directory = "~";
                    this.curr_dir_name = "root"
                    break;
                }
                if (words.length > 1) {
                    result = "too many arguments, arguments must me <1.";
                    break;
                }

                if (rest === "personal-documents") {
                    result = `bash /${this.curr_dir_name} : Permission denied 😏`;
                    break;
                }

                if (this.child_directories[this.curr_dir_name].includes(rest)) {
                    this.current_directory += "/" + rest;
                    this.curr_dir_name = rest;
                }
                else if (rest === ".." || rest === "../") {
                    result = "Type 'cd' to go back 😅";
                    break;
                }
                else {
                    result = `bash: cd: ${words}: No such file or directory`;
                }
                break;
            case "ls":
                let target = words[0];
                if (target === "" || target === undefined || target === null) target = this.curr_dir_name;

                if (words.length > 1) {
                    result = "too many arguments, arguments must me <1.";
                    break;
                }
                if (target in this.child_directories) {
                    result = this.childDirectories(target).join("");
                }
                else if (target === "personal-documents") {
                    result = "Nope! 🙃";
                    break;
                }
                else {
                    result = `ls: cannot access '${words}': No such file or directory                    `;
                }
                break;
            case "mkdir":
                if (words[0] !== undefined && words[0] !== "") {
                    this.props.addFolder(words[0]);
                    result = "";
                } else {
                    result = "mkdir: missing operand";
                }
                break;
            case "pwd":
                let str = this.current_directory;
                result = str.replace("~", "[/home/kali/")
                break;
            case "cat":
                if (words.length === 0) {
                    result = "cat: missing operand";
                    break;
                }
                if (this.files[words[0]]) {
                    result = `<pre class="whitespace-pre-wrap">${this.xss(this.files[words[0]])}</pre>`;
                } else {
                    result = `cat: ${words[0]}: No such file or directory`;
                }
                break;
            case "help":
                result = `
<div class="leading-relaxed">
<span class="font-bold text-white">Available commands:</span><br/>
<span class="text-ubt-blue">help</span> — show this list<br/>
<span class="text-ubt-blue">ls / cd / cat / pwd / mkdir</span> — navigate the virtual filesystem (try: ls projects, cat about.txt, cat contact.txt)<br/>
<span class="text-ubt-blue">whoami</span> — who is running this shell<br/>
<span class="text-ubt-blue">contact</span> — print contact details<br/>
<span class="text-ubt-blue">theme [dark|matrix|light]</span> — change terminal color theme<br/>
<span class="text-ubt-blue">sudo hire-me</span> — the pitch, plus a link to get in touch<br/>
<span class="text-ubt-blue">clear / exit</span> — clear screen / close terminal<br/>
<span class="text-ubt-blue">echo, code, spotify, chrome, home, trash, settings, sendmsg</span> — utility & app-launcher commands
</div>`;
                break;
            case "whoami":
                result = "kali :: Ankit Kumar — Full Stack Developer, IIT Patna. Type 'contact' or 'sudo hire-me' to get in touch.";
                break;
            case "contact":
                result = `<pre class="whitespace-pre-wrap">${this.xss(this.files["contact.txt"])}</pre>`;
                break;
            case "theme":
                if (words.length === 0) {
                    result = `current theme: ${this.state.theme}. usage: theme [${this.themes.join("|")}]`;
                } else if (this.themes.includes(words[0])) {
                    this.setState({ theme: words[0] });
                    result = `theme switched to '${words[0]}'`;
                } else {
                    result = `theme: unknown theme '${words[0]}'. available: ${this.themes.join(", ")}`;
                }
                break;
            case "code":
                if (words[0] === "." || words.length === 0) {
                    this.props.openApp("vscode");
                } else {
                    result = "Command '" + main + "' not found, or not yet implemented.<br>Available Commands: [ " + AVAILABLE_COMMANDS + " ]";
                }
                break;
            case "echo":
                result = this.xss(words.join(" "));
                break;
            case "spotify":
                if (words[0] === "." || words.length === 0) {
                    this.props.openApp("spotify");
                } else {
                    result = "Command '" + main + "' not found, or not yet implemented.<br>Available Commands: [ " + AVAILABLE_COMMANDS + " ]";
                }
                break;
            case "chrome":
                if (words[0] === "." || words.length === 0) {
                    this.props.openApp("chrome");
                } else {
                    result = "Command '" + main + "' not found, or not yet implemented.<br>Available Commands: [ " + AVAILABLE_COMMANDS + " ]";
                }
                break;
            case "trash":
                if (words[0] === "." || words.length === 0) {
                    this.props.openApp("trash");
                } else {
                    result = "Command '" + main + "' not found, or not yet implemented.<br>Available Commands: [ " + AVAILABLE_COMMANDS + " ]";
                }
                break;
            case "home":
                if (words[0] === "." || words.length === 0) {
                    this.props.openApp("home");
                } else {
                    result = "Command '" + main + "' not found, or not yet implemented.<br>Available Commands: [ " + AVAILABLE_COMMANDS + " ]";
                }
                break;
            case "terminal":
                if (words[0] === "." || words.length === 0) {
                    this.props.openApp("terminal");
                } else {
                    result = "Command '" + main + "' not found, or not yet implemented.<br>Available Commands: [ " + AVAILABLE_COMMANDS + " ]";
                }
                break;
            case "settings":
                if (words[0] === "." || words.length === 0) {
                    this.props.openApp("settings");
                } else {
                    result = "Command '" + main + "' not found, or not yet implemented.<br>Available Commands: [ " + AVAILABLE_COMMANDS + " ]";
                }
                break;
            case "sendmsg":
                if (words[0] === "." || words.length === 0) {
                    this.props.openApp("gedit");
                } else {
                    result = "Command '" + main + "' not found, or not yet implemented.<br>Available Commands: [ " + AVAILABLE_COMMANDS + " ]";
                }
                break;
            case "clear":
                this.reStartTerminal();
                return;
            case "exit":
                this.closeTerminal();
                return;
            case "sudo":
                if (rest === "hire-me" || rest === "hire me") {
                    ReactGA.event({
                        category: "Sudo Access",
                        action: "hire-me",
                    });
                    result = `
<div class="leading-relaxed">
[sudo] password for kali: <span class="text-gray-500">********</span> ✅ access granted<br/><br/>
<span class="font-bold text-white">Ankit Kumar</span> — Full Stack Developer, IIT Patna (CGPA 9.3/10)<br/>
Shipped two live production platforms (Netpar.in, Heritage Threads) serving 1,000+ real users end-to-end —
architecture, APIs, databases, deployment, client comms. Comfortable across MERN, PHP, and Django.
🚀 Just received an internship offer from <span class="font-bold text-white">ISRO</span> — joining October 2026.
Still open to freelance builds and collaborations in the meantime.<br/><br/>
📩 <a class="text-ubt-blue underline" href="mailto:${CONTACT.email}">${CONTACT.email}</a> ·
<a class="text-ubt-blue underline" href="${CONTACT.linkedin}" target="_blank" rel="noreferrer">LinkedIn</a> ·
<a class="text-ubt-blue underline" href="${CONTACT.resumePath}" download>Download Resume</a>
</div>`;
                    break;
                }

                ReactGA.event({
                    category: "Sudo Access",
                    action: "lol",
                });

                result = "<img class=' w-2/5' src='./images/memes/used-sudo-command.webp' />";
                break;
            default:
                result = "Command '" + main + "' not found, or not yet implemented.<br>Available Commands: [ " + AVAILABLE_COMMANDS + " ]";
        }
        document.getElementById(`row-result-${rowId}`).innerHTML = result;
        this.appendTerminalRow();
    }

    xss(str) {
        if (!str) return;
        return str.split('').map(char => {
            switch (char) {
                case '&':
                    return '&amp';
                case '<':
                    return '&lt';
                case '>':
                    return '&gt';
                case '"':
                    return '&quot';
                case "'":
                    return '&#x27';
                case '/':
                    return '&#x2F';
                default:
                    return char;
            }
        }).join('');
    }

    themeClasses = () => {
        switch (this.state.theme) {
            case "matrix":
                return "bg-black text-green-400";
            case "light":
                return "bg-gray-100 text-gray-900";
            default:
                return "bg-ub-grey-500 text-white";
        }
    }

    render() {
        return (
            <div className={`h-full w-full text-sm font-bold transition-colors duration-300 ${this.themeClasses()}`} id="terminal-body">
                {
                    this.state.terminal
                }
            </div>
        )
    }
}

export default Terminal

export const displayTerminal = (addFolder, openApp) => {
    return <Terminal addFolder={addFolder} openApp={openApp}> </Terminal>;
}
