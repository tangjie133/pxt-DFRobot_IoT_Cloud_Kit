basic.forever(function () {
    serial.writeNumber(microIoT.ultraSonic(PIN.P0, PIN.P1, Sonicunit.Centimeters))
    microIoT.microIoT_MotorRun(microIoT.aMotors.M1, microIoT.Dir.CW, 0)
})
