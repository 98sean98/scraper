from time import sleep
import RPi.GPIO as GPIO

from motor import Motor

pulse_per_revolution = 70

class StepperMotor(Motor):
    '''A stepper motor instance connected to the device'''

    # parameters (order of the dictionary keys is important)
    parameters = {
        'pulse_interval': 300, # in micro seconds
        'revolution': 200, # number of revolutions
        'pulse_per_revolution': 70,
        'direction': 0, # 0 is LOW, 1 is HIGH
        'enable': 1 # 0 is LOW, 1 is HIGH
    }

    initial_tracked_parameters = {
        'revolution': 0
    }

    def __init__(self, motor_name, pulse_pin, direction_pin, enable_pin, multiprocessing_manager=None):
        # pins
        # note that these pins are based on BCM, see https://pinout.xyz/ and look for GPIO pins
        self.pulse_pin = pulse_pin
        self.direction_pin = direction_pin
        self.enable_pin = enable_pin

        # initialise GPIO
        GPIO.setup(self.pulse_pin, GPIO.OUT)
        GPIO.setup(self.direction_pin, GPIO.OUT)
        GPIO.setup(self.enable_pin, GPIO.OUT)

        super().__init__(motor_name, multiprocessing_manager, self.initial_tracked_parameters)

    def get_pins(self):
        pins = {'pulse_pin': self.pulse_pin, 'direction_pin': self.direction_pin, 'enable_pin': self.enable_pin}
        return pins

    def set_parameters(self, parameters):
        self.parameters = parameters

    def get_parameters(self):
        return self.parameters

    def run(self, is_running, tracked_parameters):
        sleep(0.1) # pause due to a possible change in direction

        # determine total pulse, and delay per pulse
        total_pulse = round(self.parameters['revolution'] * self.parameters['pulse_per_revolution'])
        delay = self.parameters['pulse_interval'] * 10 ** (-6)
        print(f"{self.motor_name}.total_pulse = {total_pulse}, delay = {delay}")
        # determine gpio values for direction and enable
        direction_value = GPIO.LOW if self.parameters['direction'] == 0 else GPIO.HIGH
        enable_value = GPIO.LOW if self.parameters['enable'] == 0 else GPIO.HIGH

        GPIO.output(self.enable_pin, enable_value)
        print(f"{self.motor_name}.enable = {enable_value}")

        GPIO.output(self.direction_pin, direction_value)
        print(f"{self.motor_name}.direction = {direction_value}")

        for i in range(total_pulse):
            GPIO.output(self.pulse_pin, GPIO.HIGH)
            sleep(delay)
            GPIO.output(self.pulse_pin, GPIO.LOW)
            sleep(delay)
            # track current revolution
            if i % 100 is 0:
                tracked_parameters['revolution'] = round(i / self.parameters['pulse_per_revolution'], 2)

        # finish running the required total pulse
        GPIO.output(self.enable_pin, GPIO.LOW)

        sleep(0.5) # pause for possible change direction

        # call parent method to finish running
        super().run(is_running, tracked_parameters)

    def stop_running(self):
        # disable the motor by setting enable to LOW
        GPIO.output(self.enable_pin, GPIO.LOW)
        sleep(0.5) # pause for a while
