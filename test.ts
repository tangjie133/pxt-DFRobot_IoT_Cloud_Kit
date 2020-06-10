input.onButtonPressed(Button.A, function () {
    microIoT.microIoT_SendMessage("message", microIoT.TOPIC.topic_0)
})
input.onButtonPressed(Button.AB, function () {
    microIoT.microIoT_http_TK_GET("your write api key", "2020")
})
input.onButtonPressed(Button.B, function () {
    microIoT.microIoT_http_post("Hi", "DFRobot", "2020")
})
microIoT.microIoT_WIFI("yourSSID", "yourPASSWORD")
microIoT.microIoT_MQTT(
    "yourIotId",
    "yourIotPwd",
    "yourIotTopic",
    microIoT.SERVERS.China
)
microIoT.microIoT_http_IFTTT("yourEvent", "yourKey")
microIoT.ledRainbow(1, 360)
basic.forever(function () {
    serial.writeValue("1", microIoT.intenskity(PIN_1.P0))
    serial.writeValue("2", microIoT.motinSensor(PIN_1.P1))
    serial.writeValue("3", microIoT.soundIntensity(PIN_1.P2))
    serial.writeValue("4", microIoT.index(PIN.P8, DT11.temperature_C))
})
