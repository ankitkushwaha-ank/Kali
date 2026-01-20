import React, { Component } from 'react';
import Clock from '../util components/clock';
import Status from '../util components/status';
import StatusCard from '../util components/status_card';

export default class Navbar extends Component {
  constructor() {
    super();
    this.state = {
      status_card: false,
      cpuBars: Array(18).fill(10),
      cpuValue: 20,
      activeWs: 1,
    };
  }

  componentDidMount() {
    this.cpuTimer = setInterval(() => {
      const value = 10 + Math.floor(Math.random() * 80);
      this.setState({
        cpuValue: value,
        cpuBars: this.state.cpuBars.map(() => 5 + Math.random() * 95),
      });
    }, 800);
  }

  componentWillUnmount() {
    clearInterval(this.cpuTimer);
  }

  open = (id) => {
    this.props.openApp && this.props.openApp(id);
  };

  switchWs = (n) => {
    this.setState({ activeWs: n });
    this.props.switchWorkspace && this.props.switchWorkspace(n);
  };

  render() {
    const pinned = [
      { id: 'home', icon: './themes/Flat-Remix-Blue-Dark/system/user-home.svg' },
      { id: 'chrome', icon: './themes/Flat-Remix-Blue-Dark/apps/chrome.png' },
      { id: 'terminal', icon: './themes/Flat-Remix-Blue-Dark/apps/qterminal.svg' },
      { id: 'spotify', icon: './themes/Flat-Remix-Blue-Dark/apps/spotify.png' },
    ];

    const opened = this.props.openedApps || [];

    return (
      <div
        className="fixed top-0 left-0 w-full z-50 flex items-center justify-between select-none text-sm"
        style={{
          height: '32px',
          background: 'rgba(0,0,0,0.3)',
          color: '#ddd',
          borderBottom: '1px solid #111',
        }}
      >
        {/* LEFT DESKTOP */}
        <div className="hidden md:flex items-center h-full">
          {/* Kali Logo → Show Applications */}
          <div
            className="px-3 h-full flex items-center hover:bg-[#222] cursor-pointer"
            onClick={this.props.showAllApps}
            title="Show Applications"
          >
            <img src="./images/logos/kali-application-logo.webp" className="h-5" />
          </div>

          {/* Pinned Apps */}
          {pinned.map((a) => (
            <div
              key={a.id}
              onClick={() => this.open(a.id)}
              className="px-2 h-full flex items-center hover:bg-[#222] cursor-pointer"
            >
              <img src={a.icon} className="h-5" />
            </div>
          ))}

          <div className="mx-2 text-gray-500">|</div>

          {/* Workspaces */}
          {[1, 2, 3, 4].map((n) => (
            <div
              key={n}
              onClick={() => this.switchWs(n)}
              className="px-2 cursor-pointer"
              style={{
                color: this.state.activeWs === n ? '#4ea1ff' : '#ccc',
                borderBottom:
                  this.state.activeWs === n
                    ? '2px solid #4ea1ff'
                    : '2px solid transparent',
              }}
            >
              {n}
            </div>
          ))}

          <div className="mx-2 text-gray-500">|</div>

          {/* Opened Apps */}
          {opened.map((a) => (
            <div
              key={a.id}
              onClick={() => this.open(a.id)}
              className="px-2 h-full flex items-center hover:bg-[#222] cursor-pointer"
            >
              <img src={a.icon} className="h-5" />
            </div>
          ))}
        </div>

        {/* MOBILE LEFT */}
        <div className="flex md:hidden items-center h-full px-3">
          <img
            src="./images/logos/kali-application-logo.webp"
            className="h-5 cursor-pointer"
            onClick={this.props.showAllApps}
          />
        </div>

        {/* MOBILE CENTER TIME */}
        <div className="flex md:hidden items-center">
          <Clock />
        </div>

        {/* RIGHT */}
        <div className="flex items-center h-full">
          {/* CPU Graph — Desktop Only */}
          <div
            className="hidden md:flex items-end h-4 mx-3 gap-[1px]"
            title={`CPU Usage: ${this.state.cpuValue}%`}
          >
            {this.state.cpuBars.map((h, i) => (
              <div
                key={i}
                style={{
                  width: '2px',
                  height: `${h}%`,
                  background: '#4ea1ff',
                  transition: '0.3s',
                }}
              />
            ))}
          </div>

          {/* Status */}
          <div
            id="status-bar"
            tabIndex="0"
            onFocus={() => this.setState({ status_card: true })}
            className="relative px-2 hover:bg-[#222]"
          >
            <Status />
            <StatusCard
              shutDown={this.props.shutDown}
              lockScreen={this.props.lockScreen}
              visible={this.state.status_card}
              toggleVisible={() => this.setState({ status_card: false })}
            />
          </div>

          {/* Time Desktop */}
          <div className="hidden md:block px-3 hover:bg-[#222]">
            <Clock />
          </div>

          {/* Lock & Power — Desktop Only */}
          <div
            onClick={this.props.lockScreen}
            className="hidden md:block px-3 hover:bg-[#222] cursor-pointer"
          >
            <img src="./themes/Flat-Remix-Blue-Dark/system/lock.png" className="h-4" />
          </div>

          <div
            onClick={this.props.shutDown}
            className="hidden md:block px-3 hover:bg-[#222] cursor-pointer"
          >
            <img src="./themes/Flat-Remix-Blue-Dark/system/power.png" className="h-4" />
          </div>
        </div>
      </div>
    );
  }
}
