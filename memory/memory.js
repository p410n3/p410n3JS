const mem = require('memoryjs');

module.exports =  {
    openProcess : function () {
        return mem.openProcess('csgo.exe');
    },

    getClientDll : function (PID) {
       return mem.findModule('client_panorama.dll', PID);
    },

    getEngineDll : function (PID) {
        return mem.findModule('engine.dll', PID);
    },

    getLocalPlayer : function (handle, moduleName) {
        this.signature = '8D 34 85 ? ? ? ? 89 15 ? ? ? ? 8B 41 08 8B 48 04 83 F9 FF'; //pattern
        this.signatureTypes = mem.READ | mem.SUBTRACT; //relative
        this.patternOffset = 0x3; //offsets
        this.addressOffset = 0x04; //extra
        
        
        return mem.findPattern(handle, moduleName, this.signature, this.signatureTypes, this.patternOffset, this.addressOffset);
    },

    getEntityList : function (handle, moduleName) {
        this.signature = 'BB ? ? ? ? 83 FF 01 0F 8C ? ? ? ? 3B F8'; //pattern
        this.signatureTypes = mem.READ | mem.SUBTRACT; //relative
        this.patternOffset = 0x1; //offsets
        this.addressOffset = 0x0; //extra

        return mem.findPattern(handle, moduleName, this.signature, this.signatureTypes, this.patternOffset, this.addressOffset);
    },

    getGlowObjectManager : function (handle, moduleName) {
        this.signature = 'A1 ? ? ? ? A8 01 75 4B'; //pattern
        this.signatureTypes = mem.READ | mem.SUBTRACT; //relative
        this.patternOffset = 0x1; //offsets
        this.addressOffset = 0x4; //extra

        return mem.findPattern(handle, moduleName, this.signature, this.signatureTypes, this.patternOffset, this.addressOffset);
    }
};