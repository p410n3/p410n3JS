//csgo external MultiHack in JS
//_palonE was here

//`0x${var.toString(16)}` to log in hex

//define stuff
const mem = require('./memory/memory.js');
const hax = require('./hacks/hacks.js');
const key = require("asynckeystate");


const csgo = mem.openProcess();
const client = mem.getClientDll(csgo.th32ProcessID);
const engine = mem.getEngineDll(csgo.th32ProcessID);

//pattern scanning & netvars
console.log('Sanning offsets for Panorama:');

const oLocalPlayer = mem.getLocalPlayer(csgo.handle, client.szModule);
console.log(`0x${oLocalPlayer.toString(16)}`); //DBG

const oTeamNum = 0xF4; //netvar

const oEntityList = mem.getEntityList(csgo.handle, client.szModule);
console.log(`0x${oEntityList.toString(16)}`); //DBG

const oGlowObjectManager = mem.getGlowObjectManager(csgo.handle, client.szModule);
console.log(`0x${oGlowObjectManager.toString(16)}`); //DBG

const oGlowIndex = 0xA3F8; //netvar

const oSpotted = 0x93D; //netvar


//"main"
setInterval( function () {
    //o key vkeycode = 0x4F
    
    //flag to dis and enable the glow ESP
    let glowOn = true;

    let toggleKey = 0x4F; // O key

    while (1) {

        if(key.getAsyncKeyState(toggleKey)) {
            glowOn = !glowOn;
            while(key.getAsyncKeyState(toggleKey)) {} //basically wait untill the key gets released
        }
        
        if(glowOn) {
            hax.glow(csgo.handle, client.modBaseAddr, oLocalPlayer, oTeamNum, oEntityList, oGlowObjectManager, oGlowIndex);
        }
        
        //hax.radar(csgo.handle, client.modBaseAddr, oLocalPlayer, oTeamNum, oEntityList, oSpotted);
    }
}, 33);