/*！
 * @file pxt-microIoT/microIoT.ts
 * @brief DFRobot's obloq makecode library.
 * @n [Get the module here](等网址)
 * @n micro:bit IoT Kit is a set of modules designed to incorporate IoT in education, supporting multiple popular IoT platforms like easyIoT, Thingspeak, and IFTTT. 
 * It includes 14 external sensors and 15 application tutorials.  
 *
 * @copyright	[DFRobot](http://www.dfrobot.com), 2016
 * @copyright	MIT Lesser General Public License
 *
 * @author [email](jie.tang@dfrobot.com)
 * @date  2019-12-31
 */

const OBLOQ_MQTT_EASY_IOT_SERVER_CHINA = "iot.dfrobot.com.cn"
const OBLOQ_MQTT_EASY_IOT_SERVER_GLOBAL = "mqtt.beebotte.com"
const OBLOQ_MQTT_EASY_IOT_SERVER_EN = "iot.dfrobot.com"
const microIoT_WEBHOOKS_URL = "maker.ifttt.com"
const OBLOQ_MQTT_EASY_IOT_SERVER_TK = "api.thingspeak.com"

enum NeoPixelColors {
    //% block=red
    Red = 0xFF0000,
    //% block=orange
    Orange = 0xFFA500,
    //% block=yellow
    Yellow = 0xFFFF00,
    //% block=green
    Green = 0x00FF00,
    //% block=blue
    Blue = 0x0000FF,
    //% block=indigo
    Indigo = 0x4b0082,
    //% block=violet
    Violet = 0x8a2be2,
    //% block=purple
    Purple = 0xFF00FF,
    //% block=white
    White = 0xFFFFFF,
    //% block=black
    Black = 0x000000
}

enum PIN {
    P0 = 3,
    P1 = 2,
    P2 = 1,
    P8 = 18,
    P12 = 20,
    P13 = 23,
    P14 = 22,
    P16 = 16,
}

enum PIN_1 {
    P0 = 3,
    P1 = 2,
    P2 = 1,
}
//DT11
enum DT11 {
    //% block="temperature(℃)"
    temperature_C = 1,
    //% block="temperature(℉)"
    temperature_F = 2,
    //% block="humidity(%)"
    humidity = 3
}

enum Switch {
    //% block="turn ON"
    ON = 1,
    //% block="turn OFF"
    OFF = 0
}

enum CCS{
    //% block="CO2"
    CO2 = 1,
    //% block="TVOC"
    TVOC = 2
}

//% weight=10 color=#e7660b icon="\uf1eb" block="micro:bit Iot Kit"
//% groups=['IOT', 'Sensor', 'OLED', 'Motor', 'RGB', 'Servo', 'others']
namespace microIoT {
    let IIC_ADDRESS = 0x16;
    let CCS811_I2C_ADDRESS1 = 0x5A;
    let Topic0CallBack: Action = null;
    let Topic1CallBack: Action = null;
    let Topic2CallBack: Action = null;
    let Topic3CallBack: Action = null;
    let Topic4CallBack: Action = null;
    let Wifi_Status = 0x00;

    let microIoT_WEBHOOKS_KEY = ""
    let microIoT_WEBHOOKS_EVENT = ""
    let microIoT_THINGSPEAK_KEY = ""

    let READ_STATUS = 0x00
    let SET_PARA = 0x01
    let RUN_COMMAND = 0x02

    /*set para*/
    let SETWIFI_NAME = 0x01
    let SETWIFI_PASSWORLD = 0x02
    let SETMQTT_SERVER = 0x03
    let SETMQTT_PORT = 0x04
    let SETMQTT_ID = 0x05
    let SETMQTT_PASSWORLD = 0x06
    let SETHTTP_IP = 0x07
    //let SETHTTP_PORT = 0x08

    /*run command*/
    let SEND_PING = 0x01
    let CONNECT_WIFI = 0x02
    let RECONNECT_WIFI = 0x03
    let DISCONECT_WIFI = 0x04
    let CONNECT_MQTT = 0x05
    let SUB_TOPIC0 = 0x06
    let SUB_TOPIC1 = 0x07
    let SUB_TOPIC2 = 0x08
    let SUB_TOPIC3 = 0x09
    let SUB_TOPIC4 = 0x0A
    let PUB_TOPIC0 = 0x0B
    let PUB_TOPIC1 = 0x0C
    let PUB_TOPIC2 = 0x0D
    let PUB_TOPIC3 = 0x0E
    let PUB_TOPIC4 = 0x0F
    let GET_URL = 0x10
    let POST_URL = 0x11
    let PUT_URL = 0x12
    let GET_VERSION = 0x13


    /*read para value*/
    let READ_PING = 0x01
    let READ_WIFISTATUS = 0x02
    let READ_IP = 0x03
    let READ_MQTTSTATUS = 0x04
    let READ_SUBSTATUS = 0x05
    let READ_TOPICDATA = 0x06
    let HTTP_REQUEST = 0x10
    let READ_VERSION = 0x12

    /*para status */
    let PING_OK = 0x01
    let WIFI_DISCONNECT = 0x00
    let WIFI_CONNECTING = 0x02
    let WIFI_CONNECTED = 0x03
    let MQTT_CONNECTED = 0x01
    let MQTT_CONNECTERR = 0x02
    let SUB_TOPIC_OK = 0x01
    let SUB_TOPIC_Ceiling = 0x02


    let microIoTStatus = ""
    let WIFI_NAME = ""
    let WIFI_PASSWORLD = ""
    let MQTT_SERVER = ""
    let MQTT_PORT = ""
    let MQTT_ID = ""
    let MQTT_PASSWORLD = ""
    let Topic_0 = ""
    let Topic_1 = ""
    let Topic_2 = ""
    let Topic_3 = ""
    let Topic_4 = ""
    let RECDATA = ""
    let HTTP_IP = ""
    let HTTP_PORT = ""
    let microIoT_IP = "0.0.0.0"
    let G_city = 0;

    export enum aMotors {
        //% blockId="M1" block="M1"
        M1 = 0,
        //% blockId="M2" block="M2"
        M2 = 1,
        //% blockId="ALL" block="ALL"
        ALL = 2
    }

    export enum aServos {
        //% blockId="S1" block="S1"
        S1 = 0,
        //% blockId="S2" block="S2"
        S2 = 1
    }

    export enum Dir {
        //% blockId="CW" block="CW"
        CW = 0x0,
        //% blockId="CCW" block="CCW"
        CCW = 0x1
    }

    export enum SERVERS {
        //% blockId=SERVERS_China block="EasyIOT_CN"
        China,
        //% blockId=SERVERS_English block="EasyIOT_EN"
        English,
        //% blockId=SERVERS_Global block="Beebotte"
        Global
    }

    export enum TOPIC {
        topic_0 = 0,
        topic_1 = 1,
        topic_2 = 2,
        topic_3 = 3,
        topic_4 = 4
    }

    export class PacketMqtt {
        public message: string;
    }

    /**
     * Set the microIoT servos.
     */

    //% weight=50
    //% group="Servo"
    //% blockId=microIoT_ServoRun block="servo|%index|angle|%angle"
    //% angle.min=0 angle.max=180
    //% index.fieldEditor="gridpicker" index.fieldOptions.columns=2
    export function microIoT_ServoRun(index: aServos, angle: number): void {
        let buf = pins.createBuffer(2);
        if (index == 0) {
            buf[0] = 0x14;
        }
        if (index == 1) {
            buf[0] = 0x15;
        }
        buf[1] = angle;
        pins.i2cWriteBuffer(IIC_ADDRESS, buf);
    }

    /**
     * Set the microIoT motor 
     */

    //% weight=49
    //% group="Motor"
    //% blockId=microIoT_MotorRun block="control motor dir|%Dir|speed|%speed"
    //% speed.min=0 speed.max=255
    //% index.fieldEditor="gridpicker" index.fieldOptions.columns=2
    //% direction.fieldEditor="gridpicker" direction.fieldOptions.columns=2
    export function microIoT_MotorRun(direction: Dir, speed: number): void {
        let buf = pins.createBuffer(3);
            buf[0] = 0x00;
            if (direction == 0x00) {
                buf[1] = 0x01;
            } else {
                buf[1] = 0x00;
            }
        buf[2] = speed;
        pins.i2cWriteBuffer(IIC_ADDRESS, buf);
    }

    /**
     * Set the motor stop
     */

    //% weight=48
    //% group="Motor"
    //% blockId=microIoT_motorStop block="motor stop"
    //% motors.fieldEditor="gridpicker" motors.fieldOptions.columns=2 
    export function microIoT_motorStop(): void {
        let buf = pins.createBuffer(3);
        buf[0] = 0x00;
        buf[1] = 0;
        buf[2] = 0;
        pins.i2cWriteBuffer(IIC_ADDRESS, buf);
    }


    function microIoT_setPara(cmd: number, para: string): void {
        let buf = pins.createBuffer(para.length + 4);
        buf[0] = 0x1E
        buf[1] = SET_PARA
        buf[2] = cmd
        buf[3] = para.length
        for (let i = 0; i < para.length; i++)
            buf[i + 4] = para[i].charCodeAt(0)
        pins.i2cWriteBuffer(IIC_ADDRESS, buf);
    }

    function microIoT_runCommand(cmd: number): void {
        let buf = pins.createBuffer(3);
        buf[0] = 0x1E
        buf[1] = RUN_COMMAND
        buf[2] = cmd
        pins.i2cWriteBuffer(IIC_ADDRESS, buf);
    }

    function microIoT_readStatus(para: number): number {
        let buf = pins.createBuffer(3);
        buf[0] = 0x1E
        buf[1] = READ_STATUS
        buf[2] = para
        pins.i2cWriteBuffer(IIC_ADDRESS, buf);
        let recbuf = pins.createBuffer(2)
        recbuf = pins.i2cReadBuffer(IIC_ADDRESS, 2, false)
        return recbuf[1]
    }

    function microIoT_readValue(para: number): string {
        let buf = pins.createBuffer(3);
        let paraValue = 0x00
        let tempLen = 0x00
        let dataValue = ""
        buf[0] = 0x1E
        buf[1] = READ_STATUS
        buf[2] = para
        pins.i2cWriteBuffer(IIC_ADDRESS, buf);
        microIoT_CheckStatus("READ_IP");
        return RECDATA
    }

    function microIoT_ParaRunCommand(cmd: number, data: string): void {
        let buf = pins.createBuffer(data.length + 4)
        buf[0] = 0x1E
        buf[1] = RUN_COMMAND
        buf[2] = cmd
        buf[3] = data.length
        for (let i = 0; i < data.length; i++)
            buf[i + 4] = data[i].charCodeAt(0)
        pins.i2cWriteBuffer(IIC_ADDRESS, buf);

    }
    function microIoT_CheckStatus(cmd: string): void {
        while (true) {
            if (microIoTStatus == cmd) {
                serial.writeString("OKOK\r\n");
                return;
            }
            basic.pause(50);
        }
    }

    /**
    * WiFi configuration
    * @param SSID to SSID ,eg: "yourSSID"
    * @param PASSWORD to PASSWORD ,eg: "yourPASSWORD"
    */

    //% weight=100
    //% group="IOT"
    //% blockId=microIoT_wifi block="micro:IoT WI-FI configure|name: %SSID| password：%PASSWORD start connection"
    export function microIoT_WIFI(SSID: string, PASSWORD: string): void {
        microIoT_setPara(SETWIFI_NAME, SSID)
        microIoT_setPara(SETWIFI_PASSWORLD, PASSWORD)
        microIoT_runCommand(CONNECT_WIFI)
        microIoT_CheckStatus("WiFiConnected");
        Wifi_Status = WIFI_CONNECTED
    }

    /**
     * Access to EasyIOT_CN, SIOT, EasyIOT_EN by configuring this module
     * @param SSID to SSID ,eg: "yourSSID"
     * @param PASSWORD to PASSWORD ,eg: "yourPASSWORD"
     * @param IOT_ID to IOT_ID ,eg: "yourIotId"
     * @param IOT_PWD to IOT_PWD ,eg: "yourIotPwd"
     * @param IOT_TOPIC to IOT_TOPIC ,eg: "yourIotTopic"
    */

    //% weight=90
    //% group="IOT"
    //% blockExternalInputs=1
    //% blockId=microIoT_MQTT block="micro:IoT MQTT configure|IOT_ID(user): %IOT_ID| IOT_PWD(password):%IOT_PWD|(default topic_0) Topic: %IOT_TOPIC| server: %SERVERS"
    export function microIoT_MQTT(/*SSID: string, PASSWORD: string,*/
        IOT_ID: string, IOT_PWD: string,
        IOT_TOPIC: string, servers: SERVERS):
        void {
        if (servers == SERVERS.China) {
            microIoT_setPara(SETMQTT_SERVER, OBLOQ_MQTT_EASY_IOT_SERVER_CHINA)
        } else if (servers == SERVERS.English) {
            microIoT_setPara(SETMQTT_SERVER, OBLOQ_MQTT_EASY_IOT_SERVER_EN)
        } else { microIoT_setPara(SETMQTT_SERVER, OBLOQ_MQTT_EASY_IOT_SERVER_GLOBAL) }
        microIoT_setPara(SETMQTT_PORT, "1883")
        microIoT_setPara(SETMQTT_ID, IOT_ID)
        microIoT_setPara(SETMQTT_PASSWORLD, IOT_PWD)
        serial.writeString("wifi conneced ok\r\n");
        microIoT_runCommand(CONNECT_MQTT);
        microIoT_CheckStatus("MQTTConnected");
        serial.writeString("mqtt connected\r\n");

        Topic_0 = IOT_TOPIC
        microIoT_ParaRunCommand(SUB_TOPIC0, IOT_TOPIC);
        microIoT_CheckStatus("SubTopicOK");
        serial.writeString("sub topic ok\r\n");

    }

    /**
     * Add an MQTT subscription
     */

    //% weight=70
    //% group="IOT"
    //% blockId=microIoT_add_topic
    //% block="subscribe to additional %top |: %IOT_TOPIC"
    //% top.fieldEditor="gridpicker" top.fieldOptions.columns=2
    export function microIoT_add_topic(top: TOPIC, IOT_TOPIC: string): void {
        microIoT_ParaRunCommand((top + 0x06), IOT_TOPIC);
        microIoT_CheckStatus("SubTopicOK");

    }

    /**
     * MQTT sends information to the corresponding subscription
     * @param Mess to Mess ,eg: "message"
     */

    //% weight=80
    //% group="IOT"
    //% blockId=microIoT_SendMessage block="send message %string| to |%TOPIC"
    export function microIoT_SendMessage(Mess: string, Topic: TOPIC): void {
        let topic = 0

        switch (Topic) {
            case TOPIC.topic_0:
                topic = PUB_TOPIC0
                break;
            case TOPIC.topic_1:
                topic = PUB_TOPIC1
                break;
            case TOPIC.topic_2:
                topic = PUB_TOPIC2
                break;
            case TOPIC.topic_3:
                topic = PUB_TOPIC3
                break;
            case TOPIC.topic_4:
                topic = PUB_TOPIC4
                break;
            default:
                break;

        }
        microIoT_ParaRunCommand(topic, Mess)

    }

    function microIoT_callback(top: TOPIC, a: Action): void {
        switch (top) {
            case TOPIC.topic_0:
                Topic0CallBack = a;
                break;
            case TOPIC.topic_1:
                Topic1CallBack = a;
                break;
            case TOPIC.topic_2:
                Topic2CallBack = a;
                break;
            case TOPIC.topic_3:
                Topic3CallBack = a;
                break;
            case TOPIC.topic_4:
                Topic4CallBack = a;
                break;
            default:
                break;
        }
    }
    /**
     * MQTT processes the subscription receiving information
     */
    //% weight=60
    //% group="IOT"
    //% blockId=obloq_mqtt_callback_user_more block="on received %top"
    //% top.fieldEditor="gridpicker" top.fieldOptions.columns=2
    export function microIoT_MQTT_Event(top: TOPIC, cb: (message: string) => void) {
        microIoT_callback(top, () => {
            const packet = new PacketMqtt()
            packet.message = RECDATA
            cb(packet.message)
        });
    }


    /**
     * IFTTT configuration
     * @param EVENT to EVENT ,eg: "yourEvent"
     * @param KEY to KEY ,eg: "yourKey"
     */
    //% weight=50
    //% group="IOT"
    //% receive.fieldEditor="gridpicker" receive.fieldOptions.columns=3
    //% send.fieldEditor="gridpicker" send.fieldOptions.columns=3
    //% blockId=microIoT_http_IFTTT
    //% block="IFTTT configure event: %EVENT key: %KEY"
    export function microIoT_http_IFTTT(EVENT: string, KEY: string): void {
        microIoT_WEBHOOKS_EVENT = EVENT
        microIoT_WEBHOOKS_KEY = KEY
    }


    function microIoT_http_wait_request(time: number): string {
        if (time < 100) {
            time = 100
        }
        let timwout = time / 100
        let _timeout = 0
        while (true) {
            basic.pause(100)
            if (microIoTStatus == "HTTP_REQUEST") {
                microIoTStatus = "";
                return RECDATA
            } else if (microIoTStatus == "HTTP_REQUESTFailed") {
                microIoTStatus = "";
                return "requestFailed"
            }
            _timeout += 1
            if (_timeout > timwout) {
                return "timeOut"
            }
        }
    }

    /**
     * ThingSpeak configuration
     * @param KEY to KEY ,eg: "yourKey"
     */
    //% weight=31
    //% receive.fieldEditor="gridpicker" receive.fieldOptions.columns=3
    //% send.fieldEditor="gridpicker" send.fieldOptions.columns=3
    //% blockId=OBLOQ_microIoT_ThingSpeak_configura
    //% block="ThingSpeak configure key: %KEY"
    export function microIoT_ThingSpeak_configura(KEY: string): void {
        microIoT_THINGSPEAK_KEY = KEY
    }

   /**
     * ThingSpeak configured and sent data
     * @param KEY to KEY ,eg: "your write api key"
     * @param field1 ,eg: 2020
     */

    //% weight=30
    //% group="IOT"
    //% blockId=naturalScience_microIoT_http_TK_GET
    //% expandableArgumentMode="enabled"
    //% inlineInputMode=inline
    //% block="ThingSpeak send value1: %field1 || value2: %field2 value3: %field3 value4: %field4 value5: %field5 value6: %field6 value7: %field7" 
    export function microIoT_http_TK_GET(field1: string, field2?: string, field3?: string, field4?: string, field5?: string, field6?: string, field7?: string): void {
        microIoT_setPara(SETHTTP_IP, OBLOQ_MQTT_EASY_IOT_SERVER_TK)
        let tempStr = ""
        tempStr = "update?api_key=" + microIoT_THINGSPEAK_KEY + "&field1=" + field1 + "&field2=" + field2 + "&field3=" + field3 + "&field4=" + field4 + "&field5=" + field5 + "&field6=" + field6 + "&field7=" + field7 + "\r"
        microIoT_ParaRunCommand(GET_URL, tempStr);
    }

    /**
     * IFTTT send data
     * time(ms): private long maxWait
     * @param value1 ,eg: "Hi"
     * @param value2 ,eg: "DFRobot"
     * @param value3 ,eg: "2020"
     */

    //% weight=40
    //% group="IOT"
    //% blockId=OBLOQ-I2C_http_post
    //% block="IFTTT send value1: %value1 value2: %value2 value3: %value3"
    export function microIoT_http_post(value1: string, value2: string, value3: string): void {
        microIoT_setPara(SETHTTP_IP, microIoT_WEBHOOKS_URL)
        let tempStr = ""
        tempStr = "trigger/" + microIoT_WEBHOOKS_EVENT + "/with/key/" + microIoT_WEBHOOKS_KEY + ",{\"value1\":\"" + value1 + "\",\"value2\":\"" + value2 + "\",\"value3\":\"" + value3 + "\" }" + "\r"
        microIoT_ParaRunCommand(POST_URL, tempStr)
    }

    function microIoT_GetData(len: number): void {
        RECDATA = ""
        let tempbuf = pins.createBuffer(1)
        tempbuf[0] = 0x22
        pins.i2cWriteBuffer(IIC_ADDRESS, tempbuf);
        let tempRecbuf = pins.createBuffer(len)
        tempRecbuf = pins.i2cReadBuffer(IIC_ADDRESS, len, false)
        for (let i = 0; i < len; i++) {
            RECDATA += String.fromCharCode(tempRecbuf[i])
        }
    }

    function microIoT_InquireStatus(): void {
        let buf = pins.createBuffer(3)
        let tempId = 0
        let tempStatus = 0
        buf[0] = 0x1E
        buf[1] = READ_STATUS
        buf[2] = 0x06
        pins.i2cWriteBuffer(IIC_ADDRESS, buf);
        let recbuf = pins.createBuffer(2)
        recbuf = pins.i2cReadBuffer(IIC_ADDRESS, 2, false)
        tempId = recbuf[0]
        tempStatus = recbuf[1]
        switch (tempId) {
            case READ_PING:
                if (tempStatus == PING_OK) {
                    microIoTStatus = "PingOK"
                } else {
                    microIoTStatus = "PingERR"
                }
                break;
            case READ_WIFISTATUS:
                if (tempStatus == WIFI_CONNECTING) {
                    microIoTStatus = "WiFiConnecting"
                } else if (tempStatus == WIFI_CONNECTED) {
                    microIoTStatus = "WiFiConnected"
                } else if (tempStatus == WIFI_DISCONNECT) {
                    microIoTStatus = "WiFiDisconnect"
                } else {
                }
                break;
            case READ_MQTTSTATUS:
                if (tempStatus == MQTT_CONNECTED) {
                    microIoTStatus = "MQTTConnected"
                } else if (tempStatus == MQTT_CONNECTERR) {
                    microIoTStatus = "MQTTConnectERR"
                }
                break;
            case READ_SUBSTATUS:
                if (tempStatus == SUB_TOPIC_OK) {
                    microIoTStatus = "SubTopicOK"
                } else if (tempStatus == SUB_TOPIC_Ceiling) {
                    microIoTStatus = "SubTopicCeiling"
                } else {
                    microIoTStatus = "SubTopicERR"
                }
                break;
            case READ_IP:
                microIoTStatus = "READ_IP"
                microIoT_GetData(tempStatus)
                microIoT_IP = RECDATA
                break;
            case SUB_TOPIC0:
                microIoTStatus = "READ_TOPICDATA"
                microIoT_GetData(tempStatus)
                if (Topic0CallBack != null) {
                    Topic0CallBack();
                }
                break;
            case SUB_TOPIC1:
                microIoTStatus = "READ_TOPICDATA"
                microIoT_GetData(tempStatus)
                if (Topic1CallBack != null) {
                    Topic1CallBack();
                }
                break;
            case SUB_TOPIC2:
                microIoTStatus = "READ_TOPICDATA"
                microIoT_GetData(tempStatus)
                if (Topic2CallBack != null) {
                    Topic2CallBack();
                }
                break;
            case SUB_TOPIC3:
                microIoTStatus = "READ_TOPICDATA"
                microIoT_GetData(tempStatus)
                if (Topic3CallBack != null) {
                    Topic3CallBack();
                }
                break;
            case SUB_TOPIC4:
                microIoTStatus = "READ_TOPICDATA"
                microIoT_GetData(tempStatus)
                if (Topic4CallBack != null) {
                    Topic4CallBack();
                }
                break;
            case HTTP_REQUEST:
                microIoTStatus = "HTTP_REQUEST"
                microIoT_GetData(tempStatus)
                break;
            case READ_VERSION:
                microIoTStatus = "READ_VERSION"
                microIoT_GetData(tempStatus)
                break;
            default:
                break;
        }
        basic.pause(200);
    }
    basic.forever(function () {
        microIoT_InquireStatus();
    })
    /**
     * 初始化OLED
     */
    //% weight=100
    //% group="OLED"
    //% block="initDisplay"
    export function microIoT_initDisplay(): void {
        microIoT_cmd(0xAE);  // Set display OFF
        microIoT_cmd(0xD5);  // Set Display Clock Divide Ratio / OSC Frequency 0xD4
        microIoT_cmd(0x80);  // Display Clock Divide Ratio / OSC Frequency 
        microIoT_cmd(0xA8);  // Set Multiplex Ratio
        microIoT_cmd(0x3F);  // Multiplex Ratio for 128x64 (64-1)
        microIoT_cmd(0xD3);  // Set Display Offset
        microIoT_cmd(0x00);  // Display Offset
        microIoT_cmd(0x40);  // Set Display Start Line
        microIoT_cmd(0x8D);  // Set Charge Pump
        microIoT_cmd(0x14);  // Charge Pump (0x10 External, 0x14 Internal DC/DC)
        microIoT_cmd(0xA1);  // Set Segment Re-Map
        microIoT_cmd(0xC8);  // Set Com Output Scan Direction
        microIoT_cmd(0xDA);  // Set COM Hardware Configuration
        microIoT_cmd(0x12);  // COM Hardware Configuration
        microIoT_cmd(0x81);  // Set Contrast
        microIoT_cmd(0xCF);  // Contrast
        microIoT_cmd(0xD9);  // Set Pre-Charge Period
        microIoT_cmd(0xF1);  // Set Pre-Charge Period (0x22 External, 0xF1 Internal)
        microIoT_cmd(0xDB);  // Set VCOMH Deselect Level
        microIoT_cmd(0x40);  // VCOMH Deselect Level
        microIoT_cmd(0xA4);  // Set all pixels OFF
        microIoT_cmd(0xA6);  // Set display not inverted
        microIoT_cmd(0xAF);  // Set display On
        clear();
    }
    /**
     * 清除OLED屏幕
     */
    //% weight=60
    //% group="OLED"
    //% block="OLED clear"
    export function clear() {
        for (let j = 0; j < 8; j++) {
            showUserNumber(j, 0);
            {
                for (let i = 0; i < 16; i++)  //clear all columns
                {
                    microIoT_putChar(' ');
                }
            }
        }
        showUserNumber(0, 0);
    }

    function showUserNumber(row: number, column: number) {
        let r = row;
        let c = column;
        if (row < 0) { r = 0 }
        if (column < 0) { c = 0 }
        if (row > 7) { r = 7 }
        if (column > 15) { c = 15 }

        microIoT_cmd(0xB0 + r);            //set page address
        microIoT_cmd(0x00 + (8 * c & 0x0F));  //set column lower address
        microIoT_cmd(0x10 + ((8 * c >> 4) & 0x0F));   //set column higher address
    }

    function microIoT_putChar(c: string) {
        let c1 = c.charCodeAt(0);
        microIoT_writeCustomChar(basicFont[c1 - 32]);
    }
    /**
     * OLED  display string
     * @param line line num (8 pixels per line), eg: 0
     * @param text value , eg: DFRobot
     */
    //% weight=90
    //% group="OLED"
    //% text.defl="DFRobot"
    //% line.min=0 line.max=7
    //% block="OLED show line %line|text %text"
    export function showUserText(line: number, text: string): void {
        showUserNumber(line, 0);
        for (let c of text) {
            microIoT_putChar(c);
        }

        for (let i = text.length; i < 16; i++) {
            showUserNumber(line, i);
            microIoT_putChar(" ");
        }

    }
	/**
     * OLED  shows the number
     * @param line line num (8 pixels per line), eg: 0
     * @param n value , eg: 2020
     */
    //% weight=80
    //% group="OLED"
    //% line.min=0 line.max=7
    //% block="OLED show line %line|number %n"

    export function showUserNumbers(line: number, n: number): void {
        microIoT.showUserText(line, "" + n)
    }


    function microIoT_writeCustomChar(c: string) {
        for (let i = 0; i < 8; i++) {
            microIoT_writeData(c.charCodeAt(i));
        }
    }


    function microIoT_cmd(c: number) {
        pins.i2cWriteNumber(0x3C, c, NumberFormat.UInt16BE);
    }


    function microIoT_writeData(n: number) {
        let b = n;
        if (n < 0) { n = 0 }
        if (n > 255) { n = 255 }

        pins.i2cWriteNumber(0x3C, 0x4000 + b, NumberFormat.UInt16BE);
    }

    const DISPLAY_OFF = 0xAE;
    const DISPLAY_ON = 0xAF;
    const basicFont: string[] = [
        "\x00\x00\x00\x00\x00\x00\x00\x00", // " "
        "\x00\x00\x5F\x00\x00\x00\x00\x00", // "!"
        "\x00\x00\x07\x00\x07\x00\x00\x00", // """
        "\x00\x14\x7F\x14\x7F\x14\x00\x00", // "#"
        "\x00\x24\x2A\x7F\x2A\x12\x00\x00", // "$"
        "\x00\x23\x13\x08\x64\x62\x00\x00", // "%"
        "\x00\x36\x49\x55\x22\x50\x00\x00", // "&"
        "\x00\x00\x05\x03\x00\x00\x00\x00", // "'"
        "\x00\x1C\x22\x41\x00\x00\x00\x00", // "("
        "\x00\x41\x22\x1C\x00\x00\x00\x00", // ")"
        "\x00\x08\x2A\x1C\x2A\x08\x00\x00", // "*"
        "\x00\x08\x08\x3E\x08\x08\x00\x00", // "+"
        "\x00\xA0\x60\x00\x00\x00\x00\x00", // ","
        "\x00\x08\x08\x08\x08\x08\x00\x00", // "-"
        "\x00\x60\x60\x00\x00\x00\x00\x00", // "."
        "\x00\x20\x10\x08\x04\x02\x00\x00", // "/"
        "\x00\x3E\x51\x49\x45\x3E\x00\x00", // "0"
        "\x00\x00\x42\x7F\x40\x00\x00\x00", // "1"
        "\x00\x62\x51\x49\x49\x46\x00\x00", // "2"
        "\x00\x22\x41\x49\x49\x36\x00\x00", // "3"
        "\x00\x18\x14\x12\x7F\x10\x00\x00", // "4"
        "\x00\x27\x45\x45\x45\x39\x00\x00", // "5"
        "\x00\x3C\x4A\x49\x49\x30\x00\x00", // "6"
        "\x00\x01\x71\x09\x05\x03\x00\x00", // "7"
        "\x00\x36\x49\x49\x49\x36\x00\x00", // "8"
        "\x00\x06\x49\x49\x29\x1E\x00\x00", // "9"
        "\x00\x00\x36\x36\x00\x00\x00\x00", // ":"
        "\x00\x00\xAC\x6C\x00\x00\x00\x00", // ";"
        "\x00\x08\x14\x22\x41\x00\x00\x00", // "<"
        "\x00\x14\x14\x14\x14\x14\x00\x00", // "="
        "\x00\x41\x22\x14\x08\x00\x00\x00", // ">"
        "\x00\x02\x01\x51\x09\x06\x00\x00", // "?"
        "\x00\x32\x49\x79\x41\x3E\x00\x00", // "@"
        "\x00\x7E\x09\x09\x09\x7E\x00\x00", // "A"
        "\x00\x7F\x49\x49\x49\x36\x00\x00", // "B"
        "\x00\x3E\x41\x41\x41\x22\x00\x00", // "C"
        "\x00\x7F\x41\x41\x22\x1C\x00\x00", // "D"
        "\x00\x7F\x49\x49\x49\x41\x00\x00", // "E"
        "\x00\x7F\x09\x09\x09\x01\x00\x00", // "F"
        "\x00\x3E\x41\x41\x51\x72\x00\x00", // "G"
        "\x00\x7F\x08\x08\x08\x7F\x00\x00", // "H"
        "\x00\x41\x7F\x41\x00\x00\x00\x00", // "I"
        "\x00\x20\x40\x41\x3F\x01\x00\x00", // "J"
        "\x00\x7F\x08\x14\x22\x41\x00\x00", // "K"
        "\x00\x7F\x40\x40\x40\x40\x00\x00", // "L"
        "\x00\x7F\x02\x0C\x02\x7F\x00\x00", // "M"
        "\x00\x7F\x04\x08\x10\x7F\x00\x00", // "N"
        "\x00\x3E\x41\x41\x41\x3E\x00\x00", // "O"
        "\x00\x7F\x09\x09\x09\x06\x00\x00", // "P"
        "\x00\x3E\x41\x51\x21\x5E\x00\x00", // "Q"
        "\x00\x7F\x09\x19\x29\x46\x00\x00", // "R"
        "\x00\x26\x49\x49\x49\x32\x00\x00", // "S"
        "\x00\x01\x01\x7F\x01\x01\x00\x00", // "T"
        "\x00\x3F\x40\x40\x40\x3F\x00\x00", // "U"
        "\x00\x1F\x20\x40\x20\x1F\x00\x00", // "V"
        "\x00\x3F\x40\x38\x40\x3F\x00\x00", // "W"
        "\x00\x63\x14\x08\x14\x63\x00\x00", // "X"
        "\x00\x03\x04\x78\x04\x03\x00\x00", // "Y"
        "\x00\x61\x51\x49\x45\x43\x00\x00", // "Z"
        "\x00\x7F\x41\x41\x00\x00\x00\x00", // """
        "\x00\x02\x04\x08\x10\x20\x00\x00", // "\"
        "\x00\x41\x41\x7F\x00\x00\x00\x00", // """
        "\x00\x04\x02\x01\x02\x04\x00\x00", // "^"
        "\x00\x80\x80\x80\x80\x80\x00\x00", // "_"
        "\x00\x01\x02\x04\x00\x00\x00\x00", // "`"
        "\x00\x20\x54\x54\x54\x78\x00\x00", // "a"
        "\x00\x7F\x48\x44\x44\x38\x00\x00", // "b"
        "\x00\x38\x44\x44\x28\x00\x00\x00", // "c"
        "\x00\x38\x44\x44\x48\x7F\x00\x00", // "d"
        "\x00\x38\x54\x54\x54\x18\x00\x00", // "e"
        "\x00\x08\x7E\x09\x02\x00\x00\x00", // "f"
        "\x00\x18\xA4\xA4\xA4\x7C\x00\x00", // "g"
        "\x00\x7F\x08\x04\x04\x78\x00\x00", // "h"
        "\x00\x00\x7D\x00\x00\x00\x00\x00", // "i"
        "\x00\x80\x84\x7D\x00\x00\x00\x00", // "j"
        "\x00\x7F\x10\x28\x44\x00\x00\x00", // "k"
        "\x00\x41\x7F\x40\x00\x00\x00\x00", // "l"
        "\x00\x7C\x04\x18\x04\x78\x00\x00", // "m"
        "\x00\x7C\x08\x04\x7C\x00\x00\x00", // "n"
        "\x00\x38\x44\x44\x38\x00\x00\x00", // "o"
        "\x00\xFC\x24\x24\x18\x00\x00\x00", // "p"
        "\x00\x18\x24\x24\xFC\x00\x00\x00", // "q"
        "\x00\x00\x7C\x08\x04\x00\x00\x00", // "r"
        "\x00\x48\x54\x54\x24\x00\x00\x00", // "s"
        "\x00\x04\x7F\x44\x00\x00\x00\x00", // "t"
        "\x00\x3C\x40\x40\x7C\x00\x00\x00", // "u"
        "\x00\x1C\x20\x40\x20\x1C\x00\x00", // "v"
        "\x00\x3C\x40\x30\x40\x3C\x00\x00", // "w"
        "\x00\x44\x28\x10\x28\x44\x00\x00", // "x"
        "\x00\x1C\xA0\xA0\x7C\x00\x00\x00", // "y"
        "\x00\x44\x64\x54\x4C\x44\x00\x00", // "z"
        "\x00\x08\x36\x41\x00\x00\x00\x00", // "{"
        "\x00\x00\x7F\x00\x00\x00\x00\x00", // "|"
        "\x00\x41\x36\x08\x00\x00\x00\x00", // "}"
        "\x00\x02\x01\x01\x02\x01\x00\x00"  // "~"
    ];



    let _brightness = 255
    let neopixel_buf = pins.createBuffer(16 * 3);
    for (let i = 0; i < 16 * 3; i++) {
        neopixel_buf[i] = 0
    }

    /** 
     * Set the three primary color:red, green, and blue
     * @param r  , eg: 100
     * @param g  , eg: 100
     * @param b  , eg: 100
     */

    //% weight=60
    //% group="RGB"
    //% r.min=0 r.max=255
    //% g.min=0 g.max=255
    //% b.min=0 b.max=255
    //% block="red|%r green|%g blue|%b"
    export function microIoT_rgb(r: number, g: number, b: number): number {
        return (r << 16) + (g << 8) + (b);
    }

    /**
     * RGB LEDs light up from A to B
     * @param from  , eg: 1
     * @param to  , eg: 4
     */

    //% weight=60
    //% group="RGB"
    //% from.min=1 from.max=4
    //% to.min=1 to.max=4
    //% block="range from |%from with|%to leds"
    export function microIoT_ledRange(from: number, to: number): number {
        return ((from-1) << 16) + (2 << 8) + (to);
    }

    /**
     * Set the color of the specified LEDs
     * @param index  , eg: 1
     */

    //% weight=60
    //% group="RGB"
    //% index.min=1 index.max=4
    //% rgb.shadow="colorNumberPicker"
    //% block="RGB light |%index show color|%rgb"
    export function microIoT_setIndexColor(index: number, rgb: number) {
        let f = index-1;
        let t = index-1;
        let r = (rgb >> 16) * (_brightness / 255);
        let g = ((rgb >> 8) & 0xFF) * (_brightness / 255);
        let b = ((rgb) & 0xFF) * (_brightness / 255);

        if ((index-1) > 15) {
            if ((((index-1) >> 8) & 0xFF) == 0x02) {
                f = (index-1) >> 16;
                t = (index-1) & 0xff;
            } else {
                f = 0;
                t = -1;
            }
        }
        for (let i = f; i <= t; i++) {
            neopixel_buf[i * 3 + 0] = Math.round(g)
            neopixel_buf[i * 3 + 1] = Math.round(r)
            neopixel_buf[i * 3 + 2] = Math.round(b)
        }
        ws2812b.sendBuffer(neopixel_buf, DigitalPin.P15)

    }

    /**
     * Set the color of all RGB LEDs
     */

    //% weight=60
    //% group="RGB"
    //% rgb.shadow="colorNumberPicker"
    //% block=" RGB show color |%rgb"
    export function microIoT_showColor(rgb: number) {
        let r = (rgb >> 16) * (_brightness / 255);
        let g = ((rgb >> 8) & 0xFF) * (_brightness / 255);
        let b = ((rgb) & 0xFF) * (_brightness / 255);
        for (let i = 0; i < 16 * 3; i++) {
            if ((i % 3) == 0)
                neopixel_buf[i] = Math.round(g)
            if ((i % 3) == 1)
                neopixel_buf[i] = Math.round(r)
            if ((i % 3) == 2)
                neopixel_buf[i] = Math.round(b)
        }
        ws2812b.sendBuffer(neopixel_buf, DigitalPin.P15)
    }

    /**
     * Set the brightness of RGB LED
     * @param brightness  , eg: 100
     */

    //% weight=70
    //% group="RGB"
    //% brightness.min=0 brightness.max=255
    //% block="set RGB brightness to |%brightness"
    export function microIoT_setBrightness(brightness: number) {
        _brightness = brightness;
    }

    /**
     * Turn off all RGB LEDs
     */

    //% weight=40
    //% group="RGB"
    //% block="clear all RGB"
    export function microIoT_ledBlank() {
        microIoT_showColor(0)
    }

    /**
     * RGB LEDs display rainbow colors 
     */

    //% weight=50
    //% group="RGB"
    //% startHue.defl=1
    //% endHue.defl=360
    //% startHue.min=0 startHue.max=360
    //% endHue.min=0 endHue.max=360
    //% blockId=led_rainbow block="set RGB show rainbow color from|%startHue to|%endHue"
    export function ledRainbow(startHue: number, endHue: number) {
        startHue = startHue >> 0;
        endHue = endHue >> 0;
        const saturation = 100;
        const luminance = 50;
        let steps = 3 + 1;
        const direction = HueInterpolationDirection.Clockwise;

        //hue
        const h1 = startHue;
        const h2 = endHue;
        const hDistCW = ((h2 + 360) - h1) % 360;
        const hStepCW = Math.idiv((hDistCW * 100), steps);
        const hDistCCW = ((h1 + 360) - h2) % 360;
        const hStepCCW = Math.idiv(-(hDistCCW * 100), steps);
        let hStep: number;
        if (direction === HueInterpolationDirection.Clockwise) {
            hStep = hStepCW;
        } else if (direction === HueInterpolationDirection.CounterClockwise) {
            hStep = hStepCCW;
        } else {
            hStep = hDistCW < hDistCCW ? hStepCW : hStepCCW;
        }
        const h1_100 = h1 * 100; //we multiply by 100 so we keep more accurate results while doing interpolation

        //sat
        const s1 = saturation;
        const s2 = saturation;
        const sDist = s2 - s1;
        const sStep = Math.idiv(sDist, steps);
        const s1_100 = s1 * 100;

        //lum
        const l1 = luminance;
        const l2 = luminance;
        const lDist = l2 - l1;
        const lStep = Math.idiv(lDist, steps);
        const l1_100 = l1 * 100

        //interpolate
        if (steps === 1) {
            writeBuff(0, hsl(h1 + hStep, s1 + sStep, l1 + lStep))
        } else {
            writeBuff(0, hsl(startHue, saturation, luminance));
            for (let i = 1; i < steps - 1; i++) {
                const h = Math.idiv((h1_100 + i * hStep), 100) + 360;
                const s = Math.idiv((s1_100 + i * sStep), 100);
                const l = Math.idiv((l1_100 + i * lStep), 100);
                writeBuff(0 + i, hsl(h, s, l));
            }
            writeBuff(3, hsl(endHue, saturation, luminance));
        }
        ws2812b.sendBuffer(neopixel_buf, DigitalPin.P15)
    }

    export enum HueInterpolationDirection {
        Clockwise,
        CounterClockwise,
        Shortest
    }

    function writeBuff(index: number, rgb: number) {
        let r = (rgb >> 16) * (_brightness / 255);
        let g = ((rgb >> 8) & 0xFF) * (_brightness / 255);
        let b = ((rgb) & 0xFF) * (_brightness / 255);
        neopixel_buf[index * 3 + 0] = Math.round(g)
        neopixel_buf[index * 3 + 1] = Math.round(r)
        neopixel_buf[index * 3 + 2] = Math.round(b)
    }

    function hsl(h: number, s: number, l: number): number {
        h = Math.round(h);
        s = Math.round(s);
        l = Math.round(l);

        h = h % 360;
        s = Math.clamp(0, 99, s);
        l = Math.clamp(0, 99, l);
        let c = Math.idiv((((100 - Math.abs(2 * l - 100)) * s) << 8), 10000); //chroma, [0,255]
        let h1 = Math.idiv(h, 60);//[0,6]
        let h2 = Math.idiv((h - h1 * 60) * 256, 60);//[0,255]
        let temp = Math.abs((((h1 % 2) << 8) + h2) - 256);
        let x = (c * (256 - (temp))) >> 8;//[0,255], second largest component of this color
        let r$: number;
        let g$: number;
        let b$: number;
        if (h1 == 0) {
            r$ = c; g$ = x; b$ = 0;
        } else if (h1 == 1) {
            r$ = x; g$ = c; b$ = 0;
        } else if (h1 == 2) {
            r$ = 0; g$ = c; b$ = x;
        } else if (h1 == 3) {
            r$ = 0; g$ = x; b$ = c;
        } else if (h1 == 4) {
            r$ = x; g$ = 0; b$ = c;
        } else if (h1 == 5) {
            r$ = c; g$ = 0; b$ = x;
        }
        let m = Math.idiv((Math.idiv((l * 2 << 8), 100) - c), 2);
        let r = r$ + m;
        let g = g$ + m;
        let b = b$ + m;

        return (r << 16) + (g << 8) + b;
    }

    /**
     * 获取超声波返回的距离信息
     */
    //% weight=40
    //% group="Sensor"
    //% block="reade ultrasonic sensor unit(cm), trig|%T echo|%E (cm)"
    export function ultraSonic(T: PIN, E: PIN, ): number {
        let maxCmDistance = 500;
        let ultraSonic_T;
        let ultraSonic_E;
        switch (T) {
            case PIN.P0: ultraSonic_T = DigitalPin.P0; break;
            case PIN.P1: ultraSonic_T = DigitalPin.P1; break;
            case PIN.P2: ultraSonic_T = DigitalPin.P2; break;
            case PIN.P8: ultraSonic_T = DigitalPin.P8; break;
            case PIN.P12: ultraSonic_T = DigitalPin.P12; break;
            case PIN.P13: ultraSonic_T = DigitalPin.P13; break;
            case PIN.P14: ultraSonic_T = DigitalPin.P14; break;
            case PIN.P16: ultraSonic_T = DigitalPin.P16; break;
            default: ultraSonic_T = DigitalPin.P0; break;
        }

        switch (E) {
            case PIN.P0: ultraSonic_E = DigitalPin.P0; break;
            case PIN.P1: ultraSonic_E = DigitalPin.P1; break;
            case PIN.P2: ultraSonic_E = DigitalPin.P2; break;
            case PIN.P8: ultraSonic_E = DigitalPin.P8; break;
            case PIN.P12: ultraSonic_E = DigitalPin.P12; break;
            case PIN.P13: ultraSonic_E = DigitalPin.P13; break;
            case PIN.P14: ultraSonic_E = DigitalPin.P14; break;
            case PIN.P16: ultraSonic_E = DigitalPin.P16; break;
            default: ultraSonic_E = DigitalPin.P0; break;
        }

        let ultraSonic_d;
        pins.digitalWritePin(ultraSonic_T, 0);
        if (pins.digitalReadPin(ultraSonic_E) == 0) {
            pins.digitalWritePin(ultraSonic_T, 1);
            pins.digitalWritePin(ultraSonic_T, 0);
            ultraSonic_d = pins.pulseIn(ultraSonic_E, PulseValue.High, maxCmDistance * 58);
        } else {
            pins.digitalWritePin(ultraSonic_T, 0);
            pins.digitalWritePin(ultraSonic_T, 1);
            ultraSonic_d = pins.pulseIn(ultraSonic_E, PulseValue.Low, maxCmDistance * 58);
        }
        let ultraSonic_x = ultraSonic_d / 39;
        if (ultraSonic_x <= 0 || ultraSonic_x > 500) {
            return 0;
        }
        return Math.round(ultraSonic_x);

    }
    /**
     * 设置光线传感器引脚获取光线强度
     */
    //% weight=40
    //% group="Sensor"
    //% block="read pin %pin ambient light"
    export function intenskity(pin: PIN_1): number {
        let intenskity_T;
        switch (pin) {
            case PIN_1.P0: intenskity_T = AnalogPin.P0; break;
            case PIN_1.P1: intenskity_T = AnalogPin.P1; break;
            case PIN_1.P2: intenskity_T = AnalogPin.P2; break;
            default: intenskity_T = AnalogPin.P0; break;
        }
        return pins.analogReadPin(intenskity_T);
    }

    /**
     * 设置运动传感器引脚获取运动传感器状态
     */
    //% weight=40
    //% group="Sensor"
    //% block="read pin|%pin digital infrared motion sensor"
    export function motinSensor(pin: PIN_1): number {
        let motinSensor_T;
        switch (pin) {
            case PIN_1.P0: motinSensor_T = AnalogPin.P0; break;
            case PIN_1.P1: motinSensor_T = AnalogPin.P1; break;
            case PIN_1.P2: motinSensor_T = AnalogPin.P2; break;
            default: motinSensor_T = AnalogPin.P0; break;
        }
        let motinSensor_x = pins.analogReadPin(motinSensor_T);
        if (motinSensor_x == 1) { return 0 }
        else { return 1 }
    }

    /**
     * 设置声音传感器引脚获取声音强度
     */
    //% weight=40
    //% group="Sensor"
    //% block="read pin|%pin loudness"
    export function soundIntensity(pin: PIN_1): number {
        let soundIntensity_T;
        switch (pin) {
            case PIN_1.P0: soundIntensity_T = AnalogPin.P0; break;
            case PIN_1.P1: soundIntensity_T = AnalogPin.P1; break;
            case PIN_1.P2: soundIntensity_T = AnalogPin.P2; break;
            default: soundIntensity_T = AnalogPin.P0; break;
        }
        return pins.analogReadPin(soundIntensity_T);
    }

    /**
     * 设置火焰传感器引脚获取火焰传感器值
     */
    //% weight=40
    //% group="Sensor"
    //% block="read pin|%pin flame sensor "
    export function flame(pin: PIN_1): number {
        let flame_T;
        switch (pin) {
            case PIN_1.P0: flame_T = AnalogPin.P0; break;
            case PIN_1.P1: flame_T = AnalogPin.P1; break;
            case PIN_1.P2: flame_T = AnalogPin.P2; break;
            default: flame_T = AnalogPin.P0; break;
        }
        return pins.analogReadPin(flame_T);
    }

    /**
     * 设置水份传感器引脚获取水份值
     */
    //% weight=40
    //% group="Sensor"
    //% block="read pin|%pin steam sensor"
    export function moisture(pin: PIN_1): number {
        let moisture_T;
        switch (pin) {
            case PIN_1.P0: moisture_T = AnalogPin.P0; break;
            case PIN_1.P1: moisture_T = AnalogPin.P1; break;
            case PIN_1.P2: moisture_T = AnalogPin.P2; break;
            default: moisture_T = AnalogPin.P0; break;
        }
        return Math.round(pins.analogReadPin(moisture_T));
    }
    /**
     * 设置土壤湿度传感器引脚获取土壤湿度
     */
    //% weight=40
    //% group="Sensor"
    //% block="read pin|%pin soil moisture sensor"
    export function soilMoisture(pin: PIN_1): number {
        let soilMoisture_T;
        switch (pin) {
            case PIN_1.P0: soilMoisture_T = AnalogPin.P0; break;
            case PIN_1.P1: soilMoisture_T = AnalogPin.P1; break;
            case PIN_1.P2: soilMoisture_T = AnalogPin.P2; break;
            default: soilMoisture_T = AnalogPin.P0; break;
        }
        return Math.round(pins.analogReadPin(soilMoisture_T));
    }
    /**
     * 设置紫外线传感器引脚获取紫外线值
     */
    //% weight=40
    //% group="Sensor"
    //% block="read pin|%pin UV intensity"
    export function readeUV(pin: PIN_1): number {
        let readeUV_T;
        let readeUV_x;
        let readeUV_y;
        switch (pin) {
            case PIN_1.P0: readeUV_T = AnalogPin.P0; break;
            case PIN_1.P1: readeUV_T = AnalogPin.P1; break;
            case PIN_1.P2: readeUV_T = AnalogPin.P2; break;
            default: readeUV_T = AnalogPin.P0;
        }
        readeUV_x = pins.analogReadPin(readeUV_T);
        switch (readeUV_x) {
            case 0: readeUV_y = 5; break;
            case 1: readeUV_y = 46; break;
            case 2: readeUV_y = 65; break;
            case 3: readeUV_y = 83; break;
            case 4: readeUV_y = 103; break;
            case 5: readeUV_y = 124; break;
            case 6: readeUV_y = 142; break;
            case 7: readeUV_y = 162; break;
            case 8: readeUV_y = 180; break;
            case 9: readeUV_y = 200; break;
            case 10: readeUV_y = 221; break;
            default: readeUV_y = 240;
        }
        return readeUV_y;
    }
    /**
     * 设置温湿度传感器引脚获取温湿度值
     */
    //% weight=40
    //% group="Sensor"
    //% block="read pin|%pin|%index"
    export function index(pin: PIN, index: DT11): number {

        let index_T;
        switch (pin) {
            case PIN.P0: index_T = DigitalPin.P0; break;
            case PIN.P1: index_T = DigitalPin.P1; break;
            case PIN.P2: index_T = DigitalPin.P2; break;
            case PIN.P8: index_T = DigitalPin.P8; break;
            case PIN.P12: index_T = DigitalPin.P12; break;
            case PIN.P13: index_T = DigitalPin.P13; break;
            case PIN.P14: index_T = DigitalPin.P14; break;
            case PIN.P16: index_T = DigitalPin.P16; break;
            default: index_T = DigitalPin.P0; break;
        }
        pins.digitalWritePin(index_T, 0);
        basic.pause(20);
        let i = pins.digitalReadPin(index_T);
        pins.setPull(index_T, PinPullMode.PullUp);
        switch (index) {
            case 1:
                let dhtvalue1 = 0;
                let dhtcounter1 = 0;
                while (pins.digitalReadPin(index_T) == 1);
                while (pins.digitalReadPin(index_T) == 0);
                while (pins.digitalReadPin(index_T) == 1);
                for (let i = 0; i <= 32 - 1; i++) {
                    while (pins.digitalReadPin(index_T) == 0);
                    dhtcounter1 = 0
                    while (pins.digitalReadPin(index_T) == 1) {
                        dhtcounter1 += 1;
                    }
                    if (i > 15) {
                        if (dhtcounter1 > 2) {
                            dhtvalue1 = dhtvalue1 + (1 << (31 - i));
                        }
                    }
                }
                basic.pause(1500);
                return ((dhtvalue1 & 0x0000ff00) >> 8);
                break;
            case 2:
                while (pins.digitalReadPin(index_T) == 1);
                while (pins.digitalReadPin(index_T) == 0);
                while (pins.digitalReadPin(index_T) == 1);
                let dhtvalue = 0;
                let dhtcounter = 0;
                for (let i = 0; i <= 32 - 1; i++) {
                    while (pins.digitalReadPin(index_T) == 0);
                    dhtcounter = 0
                    while (pins.digitalReadPin(index_T) == 1) {
                        dhtcounter += 1;
                    }
                    if (i > 15) {
                        if (dhtcounter > 2) {
                            dhtvalue = dhtvalue + (1 << (31 - i));
                        }
                    }
                }
                basic.pause(1500);
                return Math.round((((dhtvalue & 0x0000ff00) >> 8) * 9 / 5) + 32);
                break;
            case 3:
                while (pins.digitalReadPin(index_T) == 1);
                while (pins.digitalReadPin(index_T) == 0);
                while (pins.digitalReadPin(index_T) == 1);
                let index_value = 0;
                let index_counter = 0;
                for (let i = 0; i <= 8 - 1; i++) {
                    while (pins.digitalReadPin(index_T) == 0);
                    index_counter = 0
                    while (pins.digitalReadPin(index_T) == 1) {
                        index_counter += 1;
                    }
                    if (index_counter > 3) {
                        index_value = index_value + (1 << (7 - i));
                    }
                }
                basic.pause(1500);
                return index_value;
                break;
            default: return 0
        }

    }

    /**
     * 设置电扇控制引脚控制电扇
     */
    //% weight=40
    //% group="Motor"
    //% block="small fanset %fan at %pin"
    export function fan(pin: PIN, fan: Switch): void {
        let fan_T;
        switch (pin) {
            case PIN.P0: fan_T = DigitalPin.P0; break;
            case PIN.P1: fan_T = DigitalPin.P1; break;
            case PIN.P2: fan_T = DigitalPin.P2; break;
            case PIN.P8: fan_T = DigitalPin.P8; break;
            case PIN.P12: fan_T = DigitalPin.P12; break;
            case PIN.P13: fan_T = DigitalPin.P13; break;
            case PIN.P14: fan_T = DigitalPin.P14; break;
            case PIN.P16: fan_T = DigitalPin.P16; break;
            default: fan_T = DigitalPin.P0; break;
        }
        pins.digitalWritePin(fan_T, fan)
    }

    /**
    *设置TDS引脚获取TDS值
    */

    //% weight=40
    //% group="Sensor"
    //% block="read pin|%pin TDS sensor(ppm)"
    export function getTds(pin: PIN_1, t: number=25): number {
        let getTds_T;
        switch (pin) {
            case PIN_1.P0: getTds_T = AnalogPin.P0; break;
            case PIN_1.P1: getTds_T = AnalogPin.P1; break;
            case PIN_1.P2: getTds_T = AnalogPin.P2; break;
            default: getTds_T = AnalogPin.P0; break;
        }

        let coeff = 1 + 0.02 * (t - 25)
        let analogValue: number[] = []
        for (let k = 0; k < 30; k++) {
            analogValue[k] = pins.analogReadPin(getTds_T)
            basic.pause(40)
        }
        let voltage = getMedian(analogValue) * 5 / 1024
        let compensationVolatge = voltage / coeff
        let tdsValue = (133.42 * compensationVolatge * compensationVolatge * compensationVolatge - 255.86 * compensationVolatge * compensationVolatge + 857.39 * compensationVolatge) * 0.5
        return Math.round(tdsValue / 2)
    }

    function getMedian(bArray: number[]): number {
        let bTab: number[] = []
        let iFilterLen = bArray.length
        let bTemp = 0
        for (let i = 0; i < iFilterLen; i++) {
            bTab[i] = bArray[i]
        }
        for (let i = 0; i < iFilterLen - 1; i++) {
            for (let j = 0; j < iFilterLen - i - 1; j++) {
                if (bTab[j] > bTab[j + 1]) {
                    bTemp = bTab[j]
                    bTab[j] = bTab[j + 1]
                    bTab[j + 1] = bTemp
                }
            }
        }
        if ((iFilterLen & 1) > 0)
            bTemp = bTab[(iFilterLen - 1) / 2]
        else
            bTemp = (bTab[iFilterLen / 2] + bTab[iFilterLen / 2 - 1]) / 2
        return bTemp
    }

    /**
     * 获取CO2或TVOC值
     */
    //% weight=40
    //% group="Sensor"
    //% block="read air quality sensor|%deta"
    export function ccsSensor(deta:CCS):number{
        let make
        if(checkDataReady() == true){ 
            switch(deta){
                case 1: make= getCO2PPM();break;
                default:make = getTVOCPPB();
            }
        }
        basic.pause(500)
        return make;
    }
    /**
     * 初始化空气质量传感器
     */
    //% weight=40
    //% group="Sensor"
    //% block="init air quality sensor "
    export function ss():void{
        softReset();
        pins.i2cWriteNumber(CCS811_I2C_ADDRESS1, 0xF4, NumberFormat.Int8LE)
        pins.i2cWriteNumber(CCS811_I2C_ADDRESS1, null, NumberFormat.Int8LE)
        setMeasCycle();
    }

    function checkDataReady():boolean{
        pins.i2cWriteNumber(CCS811_I2C_ADDRESS1, 0, NumberFormat.Int8LE)
        pins.i2cWriteNumber(CCS811_I2C_ADDRESS1, 0, NumberFormat.Int8LE)
        let status = pins.i2cReadBuffer(CCS811_I2C_ADDRESS1,1)
        if(!((status[0] >> 3) & 0x01))
            return false;
        else 
            return true;
    }
    function setMeasCycle():void{
        let buffer:number[] = [0x01,0x40] 
        let Buffer = pins.createBufferFromArray(buffer);
        pins.i2cWriteBuffer(CCS811_I2C_ADDRESS1, Buffer)
    }
    function getCO2PPM():number{
        pins.i2cWriteNumber(CCS811_I2C_ADDRESS1, 0x02, NumberFormat.Int8LE)
        let BUF = pins.i2cReadBuffer(CCS811_I2C_ADDRESS1, 8)
        return (BUF[0]<<8)|BUF[1];
    }
    function getTVOCPPB():number{
        pins.i2cWriteNumber(CCS811_I2C_ADDRESS1, 0x02, NumberFormat.Int8LE)
        let BUF = pins.i2cReadBuffer(CCS811_I2C_ADDRESS1, 8)
        return (BUF[2]<<8)|BUF[3];
    }
    function softReset():void{
        pins.i2cWriteNumber(CCS811_I2C_ADDRESS1, 0xFF, NumberFormat.Int8LE)
        let buffer:number[] = [0x11, 0xE5, 0x72, 0x8A] 
        let Buffer = pins.createBufferFromArray(buffer);
        pins.i2cWriteBuffer(CCS811_I2C_ADDRESS1, Buffer)
    }
}
