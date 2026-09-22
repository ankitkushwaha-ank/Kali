import React, { Component } from 'react';
import Draggable from 'react-draggable';
import Settings from '../apps/settings';
import ReactGA from 'react-ga';
import { displayTerminal } from '../apps/terminal';

export class Window extends Component {
  constructor() {
    super();
    this.id = null;
    // react-draggable only reads defaultPosition on the very first render, so
    // the mobile-vs-desktop start position must be decided here (constructor),
    // not in componentDidMount — by the time componentDidMount runs, the first
    // render already happened with whatever startX/startY were set here.
    const isMobileViewport = typeof window !== 'undefined' && window.innerWidth < 640;
    this.startX = isMobileViewport ? 4 : 60;
    this.startY = isMobileViewport ? 4 : 10;
    this.state = {
      cursorType: 'app-cursor-default',
      width: isMobileViewport ? 96 : 60,
      height: isMobileViewport ? 88 : 85,
      closed: false,
      maximized: false,
      parentSize: { height: 100, width: 100 }
    };
  }

  componentDidMount() {
    this.id = this.props.id;
    this.setDefaultWindowDimenstion();
    if (this.id) ReactGA.pageview(`/${this.id}`);
    window.addEventListener('resize', this.resizeBoundries);
  }

  componentWillUnmount() {
    ReactGA.pageview('/desktop');
    window.removeEventListener('resize', this.resizeBoundries);
  }

  setDefaultWindowDimenstion = () => {
    // Re-applies the size preset on viewport resize (e.g. device rotation).
    // startX/startY are intentionally not touched here — see constructor note.
    if (window.innerWidth < 640) this.setState({ height: 88, width: 96 }, this.resizeBoundries);
    else this.setState({ height: 85, width: 60 }, this.resizeBoundries);
  };

  resizeBoundries = () => {
    this.setState({
      parentSize: {
        height: window.innerHeight - (window.innerHeight * (this.state.height / 100.0)) - 28,
        width: window.innerWidth - (window.innerWidth * (this.state.width / 100.0))
      }
    });
  };

  changeCursorToMove = () => {
    this.focusWindow();
    if (this.state.maximized) this.restoreWindow();
    this.setState({ cursorType: 'cursor-move' });
  };

  changeCursorToDefault = () => this.setState({ cursorType: '--app-cursor-default' });

  handleVerticleResize = () => this.setState({ height: this.state.height + 0.1 }, this.resizeBoundries);
  handleHorizontalResize = () => this.setState({ width: this.state.width + 0.1 }, this.resizeBoundries);

  // ===== Drag-to-resize (corner + edge handles) =====
  startResize = (direction) => (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (this.state.maximized) return; // resizing a maximized window doesn't make sense
    this.focusWindow();

    const pointer = e.touches ? e.touches[0] : e;
    const startClientX = pointer.clientX;
    const startClientY = pointer.clientY;
    const startWidthPx = (this.state.width / 100) * window.innerWidth;
    const startHeightPx = (this.state.height / 100) * window.innerHeight;

    const MIN_WIDTH_PX = 320;
    const MIN_HEIGHT_PX = 200;

    const onMove = (moveEvent) => {
      const movePointer = moveEvent.touches ? moveEvent.touches[0] : moveEvent;
      const dx = movePointer.clientX - startClientX;
      const dy = movePointer.clientY - startClientY;

      let newWidthPx = startWidthPx;
      let newHeightPx = startHeightPx;

      if (direction.includes('right')) newWidthPx = Math.max(MIN_WIDTH_PX, startWidthPx + dx);
      if (direction.includes('bottom')) newHeightPx = Math.max(MIN_HEIGHT_PX, startHeightPx + dy);

      const newWidthPct = Math.min(100, (newWidthPx / window.innerWidth) * 100);
      const newHeightPct = Math.min(96.3, (newHeightPx / window.innerHeight) * 100);

      this.setState({ width: newWidthPct, height: newHeightPct });
    };

    const onEnd = () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onEnd);
      window.removeEventListener('touchmove', onMove);
      window.removeEventListener('touchend', onEnd);
      this.resizeBoundries();
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onEnd);
    window.addEventListener('touchmove', onMove, { passive: false });
    window.addEventListener('touchend', onEnd);
  };

  // Use getElementById instead of querySelector('#'+id) — the latter parses
  // the id as a CSS selector, which silently breaks for ids containing spaces
  // or other CSS-special characters. getElementById always takes it literally.
  getWindowEl = () => document.getElementById(this.id);

  setWinowsPosition = () => {
    const r = this.getWindowEl();
    if (!r) return;
    const rect = r.getBoundingClientRect();
    r.style.setProperty('--window-transform-x', rect.x.toFixed(1) + 'px');
    r.style.setProperty('--window-transform-y', (rect.y.toFixed(1) - 32) + 'px');
  };

  checkOverlap = () => {
    const r = this.getWindowEl();
    if (!r) return;
    const rect = r.getBoundingClientRect();
    if (Number(rect.x.toFixed(1)) < 50) this.props.hideSideBar(this.id, true);
    else this.props.hideSideBar(this.id, false);
  };

  focusWindow = () => this.props.focus(this.id);

  minimizeWindow = () => {
    const posx = this.state.maximized ? -510 : -310;
    this.setWinowsPosition();
    const r = this.getWindowEl();
    if (!r) return;

    // Fly toward the app's sidebar dock icon if it's pinned there; otherwise
    // fall back to a fixed offscreen-bottom-left point so minimize still works
    // for apps that aren't in the favourites dock (e.g. desktop-only shortcuts).
    const sidebarIcon = document.querySelector('#sidebar-' + this.id);
    const targetY = sidebarIcon ? sidebarIcon.getBoundingClientRect().y - 240 : window.innerHeight - 40;

    r.style.transform = `translate(${posx}px,${targetY.toFixed ? targetY.toFixed(1) : targetY}px) scale(0.2)`;
    this.props.hasMinimised(this.id);
  };

  restoreWindow = () => {
    const r = this.getWindowEl();
    if (!r) return;
    this.setDefaultWindowDimenstion();
    const posx = r.style.getPropertyValue('--window-transform-x');
    const posy = r.style.getPropertyValue('--window-transform-y');
    r.style.transform = `translate(${posx},${posy})`;
    setTimeout(() => {
      this.setState({ maximized: false });
      this.checkOverlap();
    }, 300);
  };

  maximizeWindow = () => {
    if (this.state.maximized) this.restoreWindow();
    else {
      this.focusWindow();
      const r = this.getWindowEl();
      if (!r) return;
      this.setWinowsPosition();
      r.style.transform = `translate(-1pt,-2pt)`;
      this.setState({ maximized: true, height: 96.3, width: 100.2 });
      this.props.hideSideBar(this.id, true);
    }
  };

  closeWindow = () => {
    this.setWinowsPosition();
    this.setState({ closed: true }, () => {
      this.props.hideSideBar(this.id, false);
      setTimeout(() => this.props.closed(this.id), 300);
    });
  };

  render() {
    return (
      <Draggable
        axis="both"
        handle=".kali-window-title"
        grid={[1, 1]}
        onStart={this.changeCursorToMove}
        onStop={this.changeCursorToDefault}
        onDrag={this.checkOverlap}
        defaultPosition={{ x: this.startX, y: this.startY }}
        bounds={{ left: 0, top: 0, right: this.state.parentSize.width, bottom: this.state.parentSize.height }}
      >
        <div
          style={{ width: `${this.state.width}%`, height: `${this.state.height}%` }}
          className={
            this.state.cursorType +
            ' ' + (this.state.closed ? ' closed-window ' : '') +
            (this.state.maximized ? ' duration-300 rounded-none' : ' rounded-lg rounded-b-none') +
            (this.props.minimized ? ' opacity-0 invisible duration-200 ' : '') +
            (this.props.onOtherWorkspace ? ' opacity-0 invisible pointer-events-none duration-200 ' : '') +
            (this.props.isFocused ? ' z-30 ' : ' z-20 notFocused') +
            ' opened-window overflow-hidden main-window absolute window-shadow border-black border-opacity-40 border flex flex-col bg-black'
          }
          id={this.props.id}
        >
          <WindowTopBar title={this.props.title} icon={this.props.icon} />
          <WindowEditButtons minimize={this.minimizeWindow} maximize={this.maximizeWindow} close={this.closeWindow} />
          {!this.state.maximized && (
            <WindowResizeHandles
              onResizeRight={this.startResize('right')}
              onResizeBottom={this.startResize('bottom')}
              onResizeCorner={this.startResize('bottom right')}
            />
          )}
          {this.props.id === 'settings' ? (
            <Settings
              changeBackgroundImage={this.props.changeBackgroundImage}
              currBgImgName={this.props.bg_image_name}
              brightness={this.props.brightness}
              changeBrightness={this.props.changeBrightness}
            />
          ) : (
            <WindowMainScreen
              screen={this.props.screen}
              addFolder={this.props.id === 'terminal' ? this.props.addFolder : null}
              openApp={this.props.openApp}
            />
          )}
        </div>
      </Draggable>
    );
  }
}

export default Window;

// ===== Kali Linux–style Window Title Bar (Exact padding + curved bottom) =====
export function WindowTopBar(props) {
  return (
    <div
      className="kali-window-title relative flex items-center border-b border-[#14161a] select-none z-40 "
      style={{ background: '#2b2e34', paddingTop: '0.3rem', paddingBottom: '0.3rem', paddingLeft: '0.3rem', paddingRight: '0.5rem' }}
    >
      <div className="flex items-center gap-2 z-10">
        {props.icon && <img src={props.icon} alt="app" className="h-4 w-4" style={{ paddingTop: '0.1rem' }} />}
      </div>
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <span className="text-sm text-[#e6e6e6]">{props.title}</span>
      </div>
    </div>
  );
}

// ===== Kali Linux Window Buttons =====
// Minimize & Maximize: grey circles with black outline, icon hidden until hover
// Close: blue circle with X icon always visible (as per your last request)
export function WindowEditButtons(props) {
  return (
    <div className="absolute right-2 top-1 flex gap-2.5 sm:gap-2 z-50">
      <button onClick={props.minimize} title="Minimize" className="group h-5 w-5 sm:h-4 sm:w-4 rounded-full bg-[#8a8f96] border border-black hover:bg-black transition flex items-center justify-center">
        <img src="./themes/Flat-Remix-Blue-Dark/window/window-minimize-symbolic.svg" alt="min" className="h-3.5 w-3.5 sm:h-3 sm:w-3 opacity-70 sm:opacity-0 group-hover:opacity-100 transition" />
      </button>
      <button onClick={props.maximize} title="Maximize" className="group h-5 w-5 sm:h-4 sm:w-4 rounded-full bg-[#8a8f96] border border-black hover:bg-black transition flex items-center justify-center">
        <img src="./themes/Flat-Remix-Blue-Dark/window/window-maximize-symbolic.svg" alt="max" className="h-3.5 w-3.5 sm:h-3 sm:w-3 opacity-70 sm:opacity-0 group-hover:opacity-100 transition" />
      </button>
      <button onClick={props.close} title="Close" className="h-5 w-5 sm:h-4 sm:w-4 rounded-full bg-[#1e90ff] border border-black hover:bg-[#187bcd] transition flex items-center justify-center">
        <img src="./themes/Flat-Remix-Blue-Dark/window/window-close-symbolic.svg" alt="close" className="h-3.5 w-3.5 sm:h-3 sm:w-3" />
      </button>
    </div>
  );
}

// ===== Window Resize Handles (edge + corner grips) =====
function WindowResizeHandles(props) {
  return (
    <>
      <div
        onMouseDown={props.onResizeRight}
        onTouchStart={props.onResizeRight}
        className="absolute top-0 right-0 h-full w-1.5 cursor-e-resize z-40"
        title="Resize"
      />
      <div
        onMouseDown={props.onResizeBottom}
        onTouchStart={props.onResizeBottom}
        className="absolute bottom-0 left-0 w-full h-1.5 cursor-s-resize z-40"
        title="Resize"
      />
      <div
        onMouseDown={props.onResizeCorner}
        onTouchStart={props.onResizeCorner}
        className="absolute bottom-0 right-0 h-4 w-4 cursor-se-resize z-40"
        title="Resize"
      />
    </>
  );
}

// ===== Window Main Screen =====
export class WindowMainScreen extends Component {
  constructor() { super(); this.state = { setDarkBg: false }; }
  componentDidMount() { setTimeout(() => this.setState({ setDarkBg: true }), 300); }
  render() {
    return (
      <div className={'w-full flex-grow overflow-y-auto ' + (this.state.setDarkBg ? ' bg-gray-900 ' : '')}>
        {this.props.addFolder ? displayTerminal(this.props.addFolder, this.props.openApp) : this.props.screen()}
      </div>
    );
  }
}
