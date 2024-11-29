/*
  "getRotationSpeed": {
      "topic": "zigbee2mqtt/Bedroom Ceiling Fan/get",
      "apply": "return JSON.parse(message).fan_mode"
  },
  "setRotationSpeed": {
      "topic": "zigbee2mqtt/Bedroom Ceiling Fan/set",
      "apply": "return JSON.stringify({fan_state: (message ? \"ON\" : \"OFF\")});"
  }

    "getOn": {
        "topic": "zigbee2mqtt/Bedroom Ceiling Fan/get",
        "apply": "return JSON.parse(message).fan_state === 'ON' ? true : false;"
    },
    "setOn": {
        "topic": "zigbee2mqtt/Bedroom Ceiling Fan/set",
        "apply": "return JSON.stringify({fan_state: (message ? \"ON\" : \"OFF\")});"
    }

  https://github.com/arachnetech/homebridge-mqttthing/blob/master/docs/Codecs.md
  https://github.com/NotBobTheBuilder/mqttthing-tasmota-window-cover/blob/main/cover.mqttthing.js
  https://www.zigbee2mqtt.io/devices/VZM35-SN.html
  
*/

module.exports = {
    init: function (params) {
        return {
            properties: {
                on: {
                    encode: function (message, info) { 
                        /*params.log("Encode Msg: " + message)
                        params.log("Encode Info: " + JSON.stringify(info))*/

                        let msgs = JSON.stringify({fan_state: ""});

                        if (message) {
                            msgs = JSON.stringify({fan_state: "ON"})
                        } else {
                            msgs = JSON.stringify({fan_state: "OFF"})
                        }

                        return msgs
                    },
                    decode: function (message, info) {
                        const msgs = JSON.parse(message.toString());
                        /*params.log("Decode Msg: " + message)
                        params.log("Decode Info: " + JSON.stringify(info))*/

                        if (msgs.fan_state == "ON"){
                            params.notify( "on", true)
                        } else {
                            params.notify( "on", false)
                        }

                        /*return msgs;*/
                    },
                },
                rotationSpeed: {
                    encode: function (message) { return message },
                    decode: function (message) {
                        const msgs = JSON.parse(message.toString());
                    
                        return msgs.fan_mode;
                    }
                }
            },
            encode: function (msg, info) {
                params.log("Default Encode Msg: " + msg)
                params.log("Default Encode Info: " + JSON.stringify(info))
                return msg 
            },
            decode: function (msg, info) { 
                params.log("Default Decode Msg: " + msg)
                params.log("Default Decode Info: " + JSON.stringify(info)) 
                return msg 
            }
        }
    }
}