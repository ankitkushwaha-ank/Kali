import React, { Component } from 'react';
import Clock from '../util components/clock';
import Status from '../util components/status';
import StatusCard from '../util components/status_card';
import ApplicationsMenu from './applications_menu';
import { Briefcase } from 'lucide-react';

export default class Navbar extends Component {
  constructor() {
    super();
    this.state = {
      status_card: false,
      cpuBars: Array(18).fill(10),
      cpuValue: 20,
      appsMenuOpen: false,
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
    this.props.switchWorkspace && this.props.switchWorkspace(n);
  };

  openRecruiterMode = () => {
    window.dispatchEvent(new Event('open-recruiter-mode'));
  };

  toggleAppsMenu = () => {
    this.setState({ appsMenuOpen: !this.state.appsMenuOpen });
  };

  closeAppsMenu = () => {
    this.setState({ appsMenuOpen: false });
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
        <div className="hidden md:flex items-center h-full relative">
          {/* Kali Logo → Applications Menu (categorized dropdown) */}
          <div
            className="px-3 h-full flex items-center hover:bg-[#222] cursor-pointer"
            onClick={this.toggleAppsMenu}
            title="Applications"
          >
            <img src="./images/logos/application.png" className="h-5" />
          </div>
          {this.state.appsMenuOpen && (
            <ApplicationsMenu
              apps={this.props.apps || []}
              openApp={this.open}
              onClose={this.closeAppsMenu}
              onOpenSearch={this.props.showAllApps}
            />
          )}
		<div className="mx-2 text-gray-500">|</div>
          {/* Pinned Apps */}
          {pinned.map((a) => {
            const appInfo = (this.props.apps || []).find(app => app.id === a.id);
            return (
              <div
                key={a.id}
                onClick={() => this.open(a.id)}
                title={appInfo ? appInfo.title : a.id}
                className="px-2 h-full flex items-center hover:bg-[#222] cursor-pointer"
              >
                <img src={a.icon} className="h-5" alt={appInfo ? appInfo.title : a.id} />
              </div>
            );
          })}

          <div className="mx-2 text-gray-500">|</div>

          {/* Workspaces */}
          {[1, 2, 3, 4].map((n) => (
            <div
              key={n}
              onClick={() => this.switchWs(n)}
              title={`Workspace ${n}`}
              className="px-2 cursor-pointer"
              style={{
                color: this.props.activeWorkspace === n ? '#4ea1ff' : '#ccc',
                borderBottom:
                  this.props.activeWorkspace === n
                    ? '2px solid #4ea1ff'
                    : '2px solid transparent',
              }}
            >
              {n}
            </div>
          ))}

          <div className="mx-2 text-gray-500">|</div>

          {/* Opened Apps */}
			{this.props.openedApps &&
				this.props.openedApps.map((id, index) => {
				const app = this.props.apps?.find(a => a.id === id);
				if (!app) return null;

				return (
					<div
					key={index}
					onClick={() => this.props.openApp(id)}
					className="px-2 h-full flex items-center hover:bg-[#222] cursor-pointer"
					title={app.title}
					>
					<img src={app.icon} alt={app.title} className="h-5 w-5" />
					</div>
				);
				})}
        </div>

        {/* MOBILE LEFT */}
        <div className="flex md:hidden items-center h-full px-3">
          <img
            src="./images/logos/application.png"
            className="h-5 cursor-pointer"
            title="Applications"
            onClick={this.props.showAllApps}
          />
        </div>

        {/* MOBILE CENTER TIME */}
        <div className="flex md:hidden items-center">
          <Clock />
        </div>

        {/* RIGHT — DESKTOP */}
        <div className="hidden md:flex items-center h-full flex-shrink-0">
          {/* Recruiter Mode / Quick Resume toggle */}
          <div
            onClick={this.openRecruiterMode}
            title="Open Recruiter Mode — quick resume view"
            className="flex items-center gap-1.5 mx-2 px-3 py-1 h-6 rounded-full bg-blue-600 hover:bg-blue-500 text-white cursor-pointer transition-colors shadow-[0_0_10px_rgba(37,99,235,0.5)]"
          >
            <Briefcase size={13} />
            <span className="text-[11px] font-bold whitespace-nowrap">Recruiter Mode</span>
          </div>

          {/* CPU Graph */}
          <div
            className="flex items-end h-4 mx-3 gap-[1px]"
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
						brightness={this.props.brightness}
						changeBrightness={this.props.changeBrightness}
						visible={this.state.status_card}
						toggleVisible={() => {
							// this prop is used in statusCard component in handleClickOutside callback using react-onclickoutside
							this.setState({ status_card: false });
						}}
					/>
          </div>

          {/* Time */}
          <div className="px-3 hover:bg-[#222]">
            <Clock />
          </div>
          <div className="mx-2 text-gray-500">|</div>
          {/* Lock & Power */}
          <div
            onClick={this.props.lockScreen}
            title="Lock Screen"
            className="px-3 hover:bg-[#222] cursor-pointer"
          >
            <img src="./themes/Flat-Remix-Blue-Dark/system/lock.png" className="h-4" alt="Lock screen" />
          </div>

          <div
            onClick={this.props.shutDown}
            title="Shut Down"
            className="px-3 hover:bg-[#222] cursor-pointer"
          >
            <img src="./themes/Flat-Remix-Blue-Dark/system/power.png" className="h-4" alt="Shut down" />
          </div>
        </div>

        {/* RIGHT — MOBILE (compact: recruiter icon, status/lock/power dropdown, clock already shown center) */}
        <div className="flex md:hidden items-center h-full flex-shrink-0 pr-1">
          <div
            onClick={this.openRecruiterMode}
            title="Recruiter Mode"
            className="flex items-center justify-center h-6 w-6 rounded-full bg-blue-600 text-white cursor-pointer flex-shrink-0"
          >
            <Briefcase size={12} />
          </div>

          <div
            id="status-bar-mobile"
            tabIndex="0"
            onFocus={() => this.setState({ status_card: true })}
            className="relative px-2 h-full flex items-center flex-shrink-0"
          >
            <Status />
            <StatusCard
						shutDown={this.props.shutDown}
						lockScreen={this.props.lockScreen}
						brightness={this.props.brightness}
						changeBrightness={this.props.changeBrightness}
						visible={this.state.status_card}
						toggleVisible={() => {
							this.setState({ status_card: false });
						}}
					/>
          </div>
        </div>
      </div>
    );
  }
}
