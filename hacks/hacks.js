const mem = require('memoryjs');

//declare vars here
var localPlayer;
var myTeamNum;
var entityList;
var entityTeamNum;
var glowObjectManager;
var entityGlowIndex;


module.exports = {
    glow : function (handle, client, oLocalPlayer, oTeamNum, oEntityList, oGlowObjectManager, oGlowIndex) {
        for (var i = 0; i < 64; i++) {
            //readMem stuff
            localPlayer = mem.readMemory(handle, client + oLocalPlayer, mem.DWORD);
            myTeamNum = mem.readMemory(handle, localPlayer + oTeamNum, mem.INT);
            entityList = mem.readMemory(handle, client + oEntityList + ((i) * 0x10), mem.DWORD);
            entityTeamNum = mem.readMemory(handle, entityList + oTeamNum, mem.INT);
            glowObjectManager = mem.readMemory(handle, client + oGlowObjectManager, mem.DWORD);
            entityGlowIndex = mem.readMemory(handle, entityList + oGlowIndex, mem.INT);

            //Now write the glow
            if (myTeamNum === entityTeamNum) {
                mem.writeMemory(handle, (glowObjectManager + ((entityGlowIndex * 0x38) + 0x4)), 0, mem.FLOAT); //R
                mem.writeMemory(handle, (glowObjectManager + ((entityGlowIndex * 0x38) + 0x8)), 0, mem.FLOAT); //G
                mem.writeMemory(handle, (glowObjectManager + ((entityGlowIndex * 0x38) + 0xC)), 1, mem.FLOAT); //B
                mem.writeMemory(handle, (glowObjectManager + ((entityGlowIndex * 0x38) + 0x10)), 0.7, mem.FLOAT); //A
                mem.writeMemory(handle, (glowObjectManager + ((entityGlowIndex * 0x38) + 0x24)), true, mem.BOOL); //Health Indicator
                mem.writeMemory(handle, (glowObjectManager + ((entityGlowIndex * 0x38) + 0x25)), false, mem.BOOL); //bloom..? idk
            } else {
                mem.writeMemory(handle, (glowObjectManager + ((entityGlowIndex * 0x38) + 0x4)), 1, mem.FLOAT); //R
                mem.writeMemory(handle, (glowObjectManager + ((entityGlowIndex * 0x38) + 0x8)), 0, mem.FLOAT); //G
                mem.writeMemory(handle, (glowObjectManager + ((entityGlowIndex * 0x38) + 0xC)), 0, mem.FLOAT); //B
                mem.writeMemory(handle, (glowObjectManager + ((entityGlowIndex * 0x38) + 0x10)), 0.7, mem.FLOAT); //A
                mem.writeMemory(handle, (glowObjectManager + ((entityGlowIndex * 0x38) + 0x24)), true, mem.BOOL); //Health Indicator
                mem.writeMemory(handle, (glowObjectManager + ((entityGlowIndex * 0x38) + 0x25)), false, mem.BOOL); //bloom..? idk
            }
        }
    },
    
    radar : function (handle, client, oLocalPlayer, oTeamNum, oEntityList, oSpotted) {
        for (var i = 0; i < 64; i++) {
            localPlayer = mem.readMemory(handle, client + oLocalPlayer, mem.DWORD);
            myTeamNum = mem.readMemory(handle, localPlayer + oTeamNum, mem.INT);
            entityList = mem.readMemory(handle, client + oEntityList + ((i) * 0x10), mem.DWORD);
            entityTeamNum = mem.readMemory(handle, entityList + oTeamNum, mem.INT);

            if (myTeamNum !== entityTeamNum) {
                mem.writeMemory(handle, entityList + oSpotted, true, mem.BOOL);
            }
        }
    }
};