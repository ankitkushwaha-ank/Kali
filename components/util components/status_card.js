import React, { Component } from 'react';
import SmallArrow from './small_arrow';
import onClickOutside from 'react-onclickoutside';

class Slider extends Component {
	render() {
		return (
			<input
				type="range"
				onChange={this.props.onChange}
				className={this.props.className}
				name={this.props.name}
				min="0"
				max="100"
				value={this.props.value}
				step="1"
			/>
		);
	}
}

export class StatusCard extends Component {
	constructor() {
		super();
		this.wrapperRef = React.createRef();
		this.state = {
			sound_level: 75, // better of setting default values from localStorage
		};
	}
	handleClickOutside = () => {
		this.props.toggleVisible();
	};
	componentDidMount() {
		this.setState({
			sound_level: localStorage.getItem('sound-level') || 75,
		})
	}

	// Brightness is a single source of truth owned by Kali (components/kali.js),
	// persisted under the 'brightness' localStorage key and applied once as a
	// CSS filter on #monitor-screen. This slider is just another control surface
	// for that same shared state — it no longer manipulates the DOM directly or
	// keeps its own separate 'brightness-level' key (that was a second,
	// competing brightness mechanism that fought with the Settings app's slider).
	handleBrightness = (e) => {
		// Clamp to a 20% floor so the screen never goes fully black/unusable.
		const value = Math.max(20, Number(e.target.value));
		if (this.props.changeBrightness) this.props.changeBrightness(value);
	};

	handleSound = (e) => {
		this.setState({ sound_level: e.target.value });
		localStorage.setItem('sound-level', e.target.value);
	};

	render() {
		return (
			<div
				ref={this.wrapperRef}
				className={
					'absolute bg-ub-cool-grey rounded-md py-4 top-9 right-3 shadow border-black border border-opacity-20 status-card' +
					(this.props.visible ? ' visible animateShow' : ' invisible')
				}
			>
				{' '}
				{/* Status Card */}
				<div className="absolute w-0 h-0 -top-1 right-6 top-arrow-up" />
				<div className="w-64 py-1.5 flex items-center justify-center bg-ub-cool-grey hover:bg-ub-warm-grey hover:bg-opacity-20">
					<div className="w-8">
						<img width="16px" height="16px" src="./themes/Flat-Remix-Blue-Dark/status/audio-headphones-symbolic.svg" alt="kali headphone" />
					</div>
					<Slider
						onChange={this.handleSound}
						className="kali-slider w-2/3"
						value={this.state.sound_level}
						name="headphone_range"
					/>
				</div>
				<div className="w-64 py-1.5 flex items-center justify-center bg-ub-cool-grey hover:bg-ub-warm-grey hover:bg-opacity-20">
					<div className="w-8">
						<img width="16px" height="16px" src="./themes/Flat-Remix-Blue-Dark/status/display-brightness-symbolic.svg" alt="kali brightness" />
					</div>
					<Slider
						onChange={this.handleBrightness}
						className="kali-slider w-2/3"
						name="brightness_range"
						value={this.props.brightness !== undefined ? this.props.brightness : 100}
					/>
				</div>
				<div className="w-64 flex content-center justify-center">
					<div className="w-2/4 border-black border-opacity-50 border-b my-2 border-solid" />
				</div>
				<div className="w-64 py-1.5 flex items-center justify-center bg-ub-cool-grey hover:bg-ub-warm-grey hover:bg-opacity-20">
					<div className="w-8">
						<img width="16px" height="16px" src="./themes/Flat-Remix-Blue-Dark/status/network-wired.svg" alt="kali network" />
					</div>
					<div className="w-2/3 flex items-center justify-between text-gray-400">
						<span>CISCO</span>
						<SmallArrow angle="right" />
					</div>
				</div>
				<div className="w-64 py-1.5 flex items-center justify-center bg-ub-cool-grey hover:bg-ub-warm-grey hover:bg-opacity-20">
					<div className="w-8">
						<img width="16px" height="16px" src="./themes/Flat-Remix-Blue-Dark/status/bluetooth-symbolic.svg" alt="kali bluetooth" />
					</div>
					<div className="w-2/3 flex items-center justify-between text-gray-400">
						<span>Off</span>
						<SmallArrow angle="right" />
					</div>
				</div>
				<div className="w-64 py-1.5 flex items-center justify-center bg-ub-cool-grey hover:bg-ub-warm-grey hover:bg-opacity-20">
					<div className="w-8">
						<img width="16px" height="16px" src="./themes/Flat-Remix-Blue-Dark/status/battery-good-symbolic.svg" alt="kali battery" />
					</div>
					<div className="w-2/3 flex items-center justify-between text-gray-400">
						<span>2:50 Remaining (75%)</span>
						<SmallArrow angle="right" />
					</div>
				</div>
				<div className="w-64 flex content-center justify-center">
					<div className="w-2/4 border-black border-opacity-50 border-b my-2 border-solid" />
				</div>
				<div
					id="open-settings"
					className="w-64 py-1.5 flex items-center justify-center bg-ub-cool-grey hover:bg-ub-warm-grey hover:bg-opacity-20"
				>
					<div className="w-8">
						<img width="16px" height="16px" src="./themes/Flat-Remix-Blue-Dark/status/emblem-system-symbolic.svg" alt="kali settings" />
					</div>
					<div className="w-2/3 flex items-center justify-between">
						<span>Settings</span>
					</div>
				</div>
				<div
					onClick={this.props.lockScreen}
					className="w-64 py-1.5 flex items-center justify-center bg-ub-cool-grey hover:bg-ub-warm-grey hover:bg-opacity-20"
				>
					<div className="w-8">
						<img width="16px" height="16px" src="./themes/Flat-Remix-Blue-Dark/status/changes-prevent-symbolic.svg" alt="kali lock" />
					</div>
					<div className="w-2/3 flex items-center justify-between">
						<span>Lock</span>
					</div>
				</div>
				<div
					onClick={this.props.shutDown}
					className="w-64 py-1.5 flex items-center justify-center bg-ub-cool-grey hover:bg-ub-warm-grey hover:bg-opacity-20"
				>
					<div className="w-8">
						<img width="16px" height="16px" src="./themes/Flat-Remix-Blue-Dark/status/system-shutdown-symbolic.svg" alt="kali power" />
					</div>
					<div className="w-2/3 flex items-center justify-between">
						<span>Power Off / Log Out</span>
						<SmallArrow angle="right" />
					</div>
				</div>
			</div>
		);
	}
}

export default onClickOutside(StatusCard);
