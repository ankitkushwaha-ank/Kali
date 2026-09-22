import React, { useState, useEffect } from 'react'
import SideBarApp from '../base/side_bar_app';

let renderApps = (props) => {
    let sideBarAppsJsx = [];
    props.apps.forEach((app, index) => {
        if (props.favourite_apps[app.id] === false) return;
        sideBarAppsJsx.push(
            <SideBarApp key={index} id={app.id} title={app.title} icon={app.icon} isClose={props.closed_windows} isFocus={props.focused_windows} openApp={props.openAppByAppId} isMinimized={props.isMinimized} openFromMinimised={props.openFromMinimised} />
        );
    });
    return sideBarAppsJsx;
}

export default function SideBar(props) {

    const [isTouch, setIsTouch] = useState(false);
    const [isMobileViewport, setIsMobileViewport] = useState(false);
    const [tapRevealed, setTapRevealed] = useState(false);

    useEffect(() => {
        // Detect touch devices once on mount — hover-based reveal doesn't work
        // reliably on touch screens, so those devices get a tap-to-toggle strip instead.
        setIsTouch(typeof window !== 'undefined' && (('ontouchstart' in window) || navigator.maxTouchPoints > 0));

        const checkViewport = () => setIsMobileViewport(window.innerWidth < 640);
        checkViewport();
        window.addEventListener('resize', checkViewport);
        return () => window.removeEventListener('resize', checkViewport);
    }, []);

    function showSideBar() {
        props.hideSideBar(null, false);
    }

    function hideSideBar() {
        setTimeout(() => {
            props.hideSideBar(null, true);
        }, 2000);
    }

    function toggleSideBarTap() {
        const next = !tapRevealed;
        setTapRevealed(next);
        props.hideSideBar(null, !next);
    }

    // Any app window open at all, on a phone-sized viewport, checked against
    // the widths tracked in Desktop.state.closed_windows.
    const hasOpenWindow = Object.values(props.closed_windows || {}).some(closed => closed === false);
    // On mobile the desktop's drag-based overlap detection never fires (windows
    // open near-fullscreen instead of being dragged over the dock), so the dock
    // would otherwise stay visible and sit on top of the open app. Force it
    // hidden on mobile whenever a window is open and the user hasn't tapped to
    // reveal it, instead of relying on that desktop-oriented heuristic.
    const forceHiddenOnMobile = isMobileViewport && hasOpenWindow && !tapRevealed;
    const hidden = props.hide || forceHiddenOnMobile;

    return (
        <>
            <div className={(hidden ? " -translate-x-full " : "") + " absolute transform duration-300 select-none z-40 left-0 top-40 h-full w-auto h-auto flex flex-col justify-start items-center border-black border-opacity-60"}>
                {
                    (
                        Object.keys(props.closed_windows).length !== 0
                            ? renderApps(props)
                            : null
                    )
                }
                <AllApps showApps={props.showAllApps} />
            </div>
            {isTouch ? (
                <div
                    onClick={toggleSideBarTap}
                    aria-label="Toggle app dock"
                    title="Tap to show apps"
                    className="w-3 h-24 absolute top-1/2 -translate-y-1/2 left-0 bg-white bg-opacity-10 rounded-r-md z-50"
                ></div>
            ) : (
                <div onMouseEnter={showSideBar} onMouseLeave={hideSideBar} className={"w-1 h-full absolute top-0 left-0 bg-transparent z-50"}></div>
            )}
        </>
    )
}

export function AllApps(props) {

    const [title, setTitle] = useState(false);

    return (
        <div
            className={`w-10 h-10 rounded m-1 hover:bg-white hover:bg-opacity-10 flex items-center justify-center`}
            onMouseEnter={() => {
                setTitle(true);
            }}
            onMouseLeave={() => {
                setTitle(false);
            }}
            onClick={props.showApps}
        >
            <div className="relative">
                <img width="28px" height="28px" className="w-9" src="./themes/Flat-Remix-Blue-Dark/system/view-app-grid-symbolic.svg" alt="Kali view app" />
                <div
                    className={
                        (title ? " visible " : " invisible ") +
                        " w-max py-0.5 px-1.5 absolute top-1 left-full ml-5 text-ubt-grey text-opacity-90 text-sm bg-ub-grey bg-opacity-70 border-gray-400 border border-opacity-40 rounded-md"
                    }
                >
                    Show Applications
                </div>
            </div>
        </div>
    );
}
