// Core UI and interaction logic for BackupStrats.com

// State variable
let isAwake = false;

// Accent color
const ACCENT_COLOR = '#00FFFF'; // Cyan

// Sleep timer
let sleepTimeout;

// DOM Elements
let mainContent;
let rpgTextBox;
let activityIndicator;
let optionsContainer;
let lightModeOption;
let downloadOption;
let downloadLinkContainer;

// Activity Indicator Blinking
let blinkInterval;

function initElements() {
    mainContent = document.getElementById('mainContent');
    rpgTextBox = document.getElementById('rpgTextBox');
    activityIndicator = document.getElementById('activityIndicator');
    optionsContainer = document.getElementById('optionsContainer');
    lightModeOption = document.getElementById('lightModeOption');
    downloadOption = document.getElementById('downloadOption');
    downloadLinkContainer = document.getElementById('downloadLinkContainer');
}

function startActivityIndicator() {
    stopActivityIndicator(); // Clear any existing interval
    activityIndicator.style.opacity = '1';
    activityIndicator.textContent = '_'; // Or a block character like '▋'
    blinkInterval = setInterval(() => {
        activityIndicator.style.opacity = activityIndicator.style.opacity === '1' ? '0' : '1';
    }, 500);
}

function stopActivityIndicator() {
    clearInterval(blinkInterval);
    activityIndicator.style.opacity = '1'; // Ensure it's visible when stopping
}

function bounceActivityIndicator() {
    stopActivityIndicator();
    activityIndicator.style.opacity = '1';
    // Simple bounce: quick visible -> invisible -> visible
    setTimeout(() => activityIndicator.style.opacity = '0', 100);
    setTimeout(() => activityIndicator.style.opacity = '1', 200);
    setTimeout(() => activityIndicator.style.opacity = '0', 300);
    setTimeout(() => {
        activityIndicator.style.opacity = '1';
        if (!isAwake) { // If site goes to sleep before bounce ends
            startActivityIndicator();
        } else {
            activityIndicator.style.display = 'none'; // Hide after wake up bounce
        }
    }, 400);
}


function wakeUpSite() {
    if (isAwake) {
        resetSleepTimer(); // If already awake, just reset timer on interaction
        return;
    }
    isAwake = true;
    // TODO: Play sound: site_wake_up_confirm
    console.log("Waking up site...");

    // TODO: Play sound: activity_indicator_bounce_blip (triggered by bounceActivityIndicator itself)
    bounceActivityIndicator();

    document.body.style.transition = 'background-color 1s ease-in-out';
    document.body.style.backgroundColor = ACCENT_COLOR;

    // Ensure mainContent is visible before showing options
    if (mainContent) {
        mainContent.style.display = 'flex'; // Assuming flex is used for centering rpgTextBox
        mainContent.style.opacity = '1';
    }
    
    if (rpgTextBox) { // rpgTextBox should already be visible as per initial state
        rpgTextBox.style.borderColor = ACCENT_COLOR;
    }

    if (optionsContainer) {
        optionsContainer.style.display = 'flex'; // Or 'block', depending on layout
        setTimeout(() => optionsContainer.style.opacity = '1', 100); // Fade in
        // TODO: Consider adding mouseenter listeners to options for hover_tick sound
    }
    
    // activityIndicator will be hidden by bounceActivityIndicator logic if site is awake

    resetSleepTimer();
}

function resetSleepTimer() {
    clearTimeout(sleepTimeout);
    sleepTimeout = setTimeout(goToSleep, 15000); // 15 seconds to sleep
    console.log("Sleep timer reset.");
}

function goToSleep() {
    if (!isAwake) return;
    isAwake = false;
    // TODO: Play sound: site_go_to_sleep_power_down
    console.log("Going to sleep...");

    document.body.style.transition = 'background-color 1s ease-in-out';
    document.body.style.backgroundColor = '#000000';

    if (rpgTextBox) {
        rpgTextBox.style.borderColor = '#444'; // Reset border color
    }
    
    if (optionsContainer) {
        optionsContainer.style.opacity = '0';
        setTimeout(() => optionsContainer.style.display = 'none', 500); // Hide after fade
    }

    if (downloadLinkContainer) {
        downloadLinkContainer.style.opacity = '0';
        setTimeout(() => downloadLinkContainer.style.display = 'none', 500); // Hide after fade
    }
    
    activityIndicator.style.display = 'inline'; // Or 'block'
    startActivityIndicator(); // Restart blinking

    // Optionally hide mainContent if rpgTextBox is the only thing visible when asleep
    // if (mainContent) {
    //    mainContent.style.opacity = '0';
    //    setTimeout(() => mainContent.style.display = 'none', 1000);
    // }
}

function handleLightMode() {
    console.log("Light mode selected.");
    document.body.style.backgroundColor = '#FFFFFF';
    document.body.style.color = '#000000';
    if (rpgTextBox) {
        rpgTextBox.style.borderColor = '#000000';
        rpgTextBox.style.color = '#000000'; // Text inside textbox
    }
    if (activityIndicator && isAwake) { // Keep activity indicator consistent if shown
         activityIndicator.style.color = '#000000';
    }
    // Update other elements like options text color if needed
    if (lightModeOption) lightModeOption.style.color = '#000000';
    if (downloadOption) downloadOption.style.color = '#000000';
    
    resetSleepTimer();
    // TODO: Play sound: light_mode_selected
}

function handleDownload() {
    console.log("Download option selected.");
    if (optionsContainer) {
        optionsContainer.style.display = 'none';
        optionsContainer.style.opacity = '0';
    }
    if (downloadLinkContainer) {
        downloadLinkContainer.style.display = 'block';
        downloadLinkContainer.innerHTML = `<a href="#DOWNLOAD_LINK_HERE" style="color: ${document.body.style.color === 'rgb(0, 0, 0)' ? '#000000' : ACCENT_COLOR};">Download Launcher</a>`;
        setTimeout(() => downloadLinkContainer.style.opacity = '1', 100);
    }
    resetSleepTimer();
    // TODO: Play sound: download_option_selected
}

document.addEventListener('DOMContentLoaded', () => {
    initElements();

    if (!mainContent || !rpgTextBox || !activityIndicator || !optionsContainer || !lightModeOption || !downloadOption || !downloadLinkContainer) {
        console.error("One or more critical UI elements are missing. Script cannot run.");
        return;
    }
    
    // Initial setup
    document.body.style.backgroundColor = '#000000'; // Ensure black background
    mainContent.style.display = 'flex'; // Make mainContent flex to center rpgTextBox
    mainContent.style.opacity = '1';    // Make mainContent itself visible

    rpgTextBox.style.display = 'block'; // Ensure rpgTextBox is visible
    rpgTextBox.style.opacity = '1';

    optionsContainer.style.display = 'none';
    optionsContainer.style.opacity = '0';
    downloadLinkContainer.style.display = 'none';
    downloadLinkContainer.style.opacity = '0';

    startActivityIndicator();

    document.addEventListener('click', wakeUpSite);
    document.addEventListener('keydown', wakeUpSite);

    lightModeOption.addEventListener('click', (event) => {
        event.stopPropagation(); // Prevent body click from re-triggering wakeUpSite unnecessarily
        handleLightMode();
    });

    downloadOption.addEventListener('click', (event) => {
        event.stopPropagation(); // Prevent body click from re-triggering wakeUpSite unnecessarily
        handleDownload();
    });

    console.log("BackupStrats UI Initialized");
});
