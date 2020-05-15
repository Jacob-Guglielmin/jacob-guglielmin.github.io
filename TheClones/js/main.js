/**
 * The Clones 
 * 
 * Jacob Guglielmin
 */

//Declare variables

var actionTracker

/**
 * Resets all variables. **THIS IS A HARD RESET**
 */
function resetVariables() {
    //Initialize Variables
    actionTracker = {
        counter:0,
        required:25,
        actioning:0,
        wait: {
            time:0,
            counter:0
        }
    }
}
resetVariables();

//These variables dont need to be reset on game reset
var STORY = [
    /* 0 */"You awaken in a dark room. You aren't quite sure exactly who you are, or what you were doing.",
    /* 1 */"You start searching the room you are in for any hint as to what might have happened, but it's a difficult task with no lights.",
    /* 2 */"Everything in the room seems to be damaged in some way or another. Most of what you find looks very complex. You start to wonder what could have caused the damage. An explosion, maybe?",
    /* 3 */"In the center of the room, you find a large, cylindrical machine. It looks like it mostly survived whatever happened, but you can't really tell what it's for.",
    /* 4 */"It looks like there are some buttons on the side of the machine. You push one of them, and a screen starts up, flashes a little, and fades again. The power to wherever you are must be down.",
    /* 5 */"You found what looks like a big battery. It might have enough power left to turn on the lights for a while, if you could find out where to put it.",
    /* 6 */"There is a slot near the tube that looks like it might hold the battery.",
    /* 7 */"The battery fits perfectly inside the slot. A button on the machine starts to glow. When you push it, the lights in the room come on. Now that you can actually see, maybe you can look for a clue as to where you are.",
    /* 8 */"No luck. Looks like most of the stuff in the room was completely destroyed by whatever happened in here. However, it looks like there is some sort of door on the front of the machine.",
    /* 9 */"You press a couple buttons on the panel. Eventually, the door hisses and pops open a little bit. Inside, there appears to be what looks like space for a person. You're really tired after whatever happened to you, and the inside of the machine looks really comfortable. You step inside, and take a nap.",
    /* 10 */"You wake up. The door has closed since you fell asleep. You push on the door, and it opens with a hiss."
    //* 11 */""
],
storyDisplayed = "",

autoSaveCounter = 0

/**
 * Initializes the game
 */
function init() {
    addStory(0);
    load("localStorage");
    setInterval(() => {
        tick();
    }, 100);
    setTimeout(() => {
        addStory(1);
        document.getElementById("actionTable").classList.remove("hidden");
    }, 3000);
}


/**
 * Main game loop - gets run every tenth of a second
 */
function tick() {

    //If we are waiting for something, wait for it
    if (actionTracker.wait.time != 0) {
        actionTracker.wait.counter++;
        document.getElementById("actionProgressBar").style.width = (actionTracker.wait.counter/(actionTracker.wait.time*10)*100) + "%";
        if (actionTracker.wait.counter >= (actionTracker.wait.time*10)) {
            actionTracker.wait.time = 0;
            actionTracker.wait.counter = 0;
            action(1);
        }
    }
    
    updateTooltip();

    autoSaveCounter++;
    if (autoSaveCounter >= 600) {
        save("localStorage");
        autoSaveCounter = 0;
    }
}

/**
 * Increments the progress bar and handles events from actioning the room and objects
 * 
 * @param waitComplete whether this action call should complete a wait, if there is one in progress
 */
function action(waitComplete) {
    if (actionTracker.counter < actionTracker.required && actionTracker.wait.time == 0) {
        actionTracker.counter++;
        document.getElementById("actionProgressBar").style.width = (Math.floor(actionTracker.counter/actionTracker.required*100))+"%";
    } else {

        switch (actionTracker.actioning) {
            case 0:
                addStory(2);
                actionTracker.actioning = 1;
                break;

            case 1:
                addStory(3);
                document.getElementById("actionButton").innerHTML = "Search the Machine";
                actionTracker.actioning = 2;
                break;

            case 2:
                addStory(4);
                document.getElementById("actionButton").innerHTML = "Search the Room";
                actionTracker.actioning = 3;
                break;

            case 3:
                addStory(5);
                actionTracker.actioning = 4;
                break;

            case 4:
                addStory(6);
                document.getElementById("actionButton").innerHTML = "Install the Battery";
                actionTracker.actioning = 5;
                break;

            case 5:
                addStory(7);
                document.getElementById("actionButton").innerHTML = "Search the Room";
                actionTracker.actioning = 6;
                break;
            
            case 6:
                addStory(8);
                document.getElementById("actionButton").innerHTML = "Open the Machine";
                actionTracker.actioning = 7;
                break;

            case 7:
                addStory(9);
                document.getElementById("actionButton").innerHTML = "Sleeping";
                document.getElementById("actionButton").disabled = true;
                actionTracker.actioning = 8;
                actionTracker.wait.time = 10;
                break;

            case 8:
                if (waitComplete == 1) {
                    addStory(10);
                    document.getElementById("actionButton").innerHTML = "Search the Room";
                    document.getElementById("actionButton").disabled = false;
                    actionTracker.actioning = 9;
                }
                break;

            case 9:
                break;

            default:
                break;
        }

        if (actionTracker.wait.time == 0) {
            actionTracker.counter = 0;
            document.getElementById("actionProgressBar").style.width = (Math.floor(actionTracker.counter/actionTracker.required*100))+"%";
        }
    }
}

/**
 * Returns a random number between min and max inclusive
 * 
 * @param min lower bound for number
 * @param max upper bound for number
 */
function random(min, max) {
    return Math.floor(
        Math.random() * (max - min + 1) + min
    );
}

/**
 * Adds a chunk of the story to storyDisplayed and updates the story container
 * 
 * @param storyChunk the story to display
 */
function addStory(storyChunk) {
    if (storyChunk != 0 && storyDisplayed != "") {
        storyDisplayed += "<br><br>"
    }
    storyDisplayed += STORY[storyChunk];
    document.getElementById("story").innerHTML = storyDisplayed;
    updateScroll();
}

/**
 * Scrolls to the bottom of the story
 */
function updateScroll() {
	var storyContainer = document.getElementById('story');
	storyContainer.scrollTop = storyContainer.scrollHeight;
}

//Starts the game
init();